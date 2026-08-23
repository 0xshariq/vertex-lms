/**
 * Resolves one real, unique YouTube video per seeded lesson.
 *
 * There is no YouTube Data API key in this project, so this reads the public search results page,
 * parses the `ytInitialData` blob out of it, and picks the best candidate for each lesson's
 * authored search phrase. Every pick is then confirmed against the public oEmbed endpoint, so no
 * unverified video id ever reaches the dataset.
 *
 * Results are cached in videos.json, which is committed. A re-run resolves only what is missing,
 * so building the seed a second time does zero network traffic.
 *
 *   node scripts/seed/resolve-videos.mjs           # fill in whatever is missing
 *   node scripts/seed/resolve-videos.mjs --force   # re-resolve everything from scratch
 */

import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {courses} from './content.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = join(HERE, 'videos.json')

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/** Drops Shorts and multi-hour streams: a lesson is a lesson. */
const MIN_SECONDS = 3 * 60
const MAX_SECONDS = 90 * 60

/** Be a polite scraper. */
const THROTTLE_MS = 1200

const force = process.argv.includes('--force')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** "12:34" or "1:02:03" -> seconds. Returns null for anything else (live badges, etc). */
function parseDuration(text) {
  if (typeof text !== 'string') return null
  const parts = text.trim().split(':').map(Number)
  if (parts.some((n) => !Number.isFinite(n))) return null
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  return null
}

/** Walks the search-results blob and pulls out every {videoId, title, duration} it can find. */
function extractCandidates(html) {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)
  if (!match) return []

  let data
  try {
    data = JSON.parse(match[1])
  } catch {
    return []
  }

  const found = new Map()

  const walk = (node) => {
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (!node || typeof node !== 'object') return

    if (typeof node.videoId === 'string' && node.title) {
      const title = node.title.runs?.[0]?.text ?? node.title.simpleText
      const duration = parseDuration(node.lengthText?.simpleText)
      if (title && duration && !found.has(node.videoId)) {
        found.set(node.videoId, {id: node.videoId, title, duration})
      }
    }

    Object.values(node).forEach(walk)
  }

  walk(data)
  return [...found.values()]
}

async function search(phrase) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(phrase)}`
  const response = await fetch(url, {headers: {'user-agent': USER_AGENT, 'accept-language': 'en-US,en'}})
  if (!response.ok) throw new Error(`Search failed (${response.status}) for "${phrase}"`)
  return extractCandidates(await response.text())
}

/** The video must genuinely exist and be embeddable, or it is not a candidate. */
async function verify(id) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`,
  )}&format=json`
  try {
    const response = await fetch(url, {headers: {'user-agent': USER_AGENT}})
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

const cache = !force && existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {}

/** Every id already spoken for, so no two lessons ever share a video. */
const usedIds = new Set(Object.values(cache).map((entry) => entry.id))

const lessons = courses.flatMap((course) =>
  course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      key: `${course.slug}-${lesson.slug}`,
      title: lesson.title,
      search: lesson.search,
    })),
  ),
)

const pending = lessons.filter((lesson) => !cache[lesson.key])

console.log(`${lessons.length} lessons, ${pending.length} to resolve.`)

let resolved = 0
const failures = []

for (const [index, lesson] of pending.entries()) {
  const label = `[${index + 1}/${pending.length}] ${lesson.key}`

  let candidates = []
  try {
    candidates = await search(lesson.search)
  } catch (error) {
    console.warn(`${label} — search error: ${error.message}`)
  }

  const usable = candidates.filter(
    (candidate) =>
      !usedIds.has(candidate.id) &&
      candidate.duration >= MIN_SECONDS &&
      candidate.duration <= MAX_SECONDS &&
      !/#shorts/i.test(candidate.title),
  )

  let chosen = null
  for (const candidate of usable.slice(0, 5)) {
    const meta = await verify(candidate.id)
    if (meta) {
      chosen = {...candidate, title: meta.title ?? candidate.title, channel: meta.author_name}
      break
    }
    await sleep(200)
  }

  if (chosen) {
    cache[lesson.key] = {
      id: chosen.id,
      title: chosen.title,
      channel: chosen.channel,
      duration: chosen.duration,
      query: lesson.search,
    }
    usedIds.add(chosen.id)
    resolved += 1
    console.log(`${label} — ${chosen.id} (${chosen.duration}s) ${chosen.title}`)
    // Persist as we go, so an interrupted run loses nothing.
    writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`)
  } else {
    failures.push(lesson.key)
    console.warn(`${label} — no usable candidate for "${lesson.search}"`)
  }

  await sleep(THROTTLE_MS)
}

writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`)

console.log(`\nResolved ${resolved} new video(s). Cache holds ${Object.keys(cache).length}.`)
if (failures.length) {
  console.warn(`Unresolved (${failures.length}): ${failures.join(', ')}`)
  console.warn('Re-run to retry them, or adjust the search phrase in content.mjs.')
  process.exitCode = 1
}
