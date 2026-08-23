/**
 * Expands the authored content spec plus the resolved video cache into an NDJSON file the Sanity
 * CLI can import.
 *
 *   node scripts/seed/build-ndjson.mjs
 *   npx sanity dataset import scripts/seed/seed.ndjson production --replace
 *
 * Two things this file is strict about:
 *
 * 1. Document ids are deterministic (`course.<slug>`, `lesson.<slug>`, ...), so importing with
 *    --replace is idempotent instead of duplicating the whole catalog.
 * 2. Nothing is written until every self-check passes. The Studio's validation rules do not run
 *    on import, so they are re-implemented here — a bad seed should fail at build time, not show
 *    up as a red badge in the Studio three days later.
 */

import {createHash} from 'node:crypto'
import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import {categories, courses, instructors} from './content.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = join(HERE, 'videos.json')
const OUT_PATH = join(HERE, 'seed.ndjson')

if (!existsSync(CACHE_PATH)) {
  console.error('videos.json is missing. Run: node scripts/seed/resolve-videos.mjs')
  process.exit(1)
}

const videos = JSON.parse(readFileSync(CACHE_PATH, 'utf8'))

const problems = []
const check = (condition, message) => {
  if (!condition) problems.push(message)
}

/* ---------------------------------------------------------------- helpers */

const KEY_MAX_LENGTH = 60

const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Stable `_key`s: same input, same output, so a re-import produces no diff noise.
 *
 * Over-long keys keep a digest of the full input instead of a bare truncation — the distinguishing
 * part of these keys is the tail (`-point-0`, `-h2`), so plain truncation collided every block
 * inside a lesson with a long slug.
 */
const keyOf = (...parts) => {
  const full = parts.map(slugify).filter(Boolean).join('-')
  if (full.length <= KEY_MAX_LENGTH) return full

  const digest = createHash('sha1').update(full).digest('hex').slice(0, 8)
  return `${full.slice(0, KEY_MAX_LENGTH - digest.length - 1).replace(/-$/, '')}-${digest}`
}

/** A Portable Text paragraph or heading. */
const block = (text, style = 'normal', keyBase) => ({
  _type: 'block',
  _key: keyOf(keyBase),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: keyOf(keyBase, 'span'), text, marks: []}],
})

/** A bulleted list item. */
const bullet = (text, keyBase) => ({
  ...block(text, 'normal', keyBase),
  listItem: 'bullet',
  level: 1,
})

/**
 * Image fields use `_sanityAsset`, which tells the import CLI to download the URL and upload it
 * as a real Sanity asset. Nothing hotlinks at runtime.
 */
const image = (url, alt) => ({_type: 'image', _sanityAsset: `image@${url}`, alt})

const coverImageUrl = (slug) => `https://picsum.photos/seed/vertex-${slug}/1600/900`
const posterUrl = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
const portraitUrl = ({gender, id}) => `https://randomuser.me/api/portraits/${gender}/${id}.jpg`

/* ------------------------------------------------------------- documents */

const documents = []

for (const category of categories) {
  check(category.description.length <= 200, `category ${category.slug}: description over 200 chars`)
  documents.push({
    _id: `category.${category.slug}`,
    _type: 'category',
    title: category.title,
    slug: {_type: 'slug', current: category.slug},
    description: category.description,
  })
}

for (const instructor of instructors) {
  check(
    instructor.expertise.length >= 1 && instructor.expertise.length <= 8,
    `instructor ${instructor.slug}: expertise must hold 1-8 tags`,
  )
  documents.push({
    _id: `instructor.${instructor.slug}`,
    _type: 'instructor',
    name: instructor.name,
    slug: {_type: 'slug', current: instructor.slug},
    photo: image(portraitUrl(instructor.portrait), `Portrait of ${instructor.name}`),
    expertise: instructor.expertise,
    bio: instructor.bio.map((paragraph, index) =>
      block(paragraph, 'normal', `${instructor.slug}-bio-${index}`),
    ),
  })
}

const categorySlugs = new Set(categories.map((c) => c.slug))
const instructorSlugs = new Set(instructors.map((i) => i.slug))
const lessonIds = new Set()
const referencedLessonIds = new Set()
const usedVideoIds = new Map()

for (const course of courses) {
  check(categorySlugs.has(course.category), `course ${course.slug}: unknown category`)
  check(instructorSlugs.has(course.instructor), `course ${course.slug}: unknown instructor`)
  check(course.summary.length <= 200, `course ${course.slug}: summary over 200 chars`)
  check(course.outcomes.length <= 6, `course ${course.slug}: more than 6 learning outcomes`)
  check(course.modules.length >= 1, `course ${course.slug}: needs at least one module`)

  /**
   * Student counts decay through the curriculum, and the course count is the first lesson's, so
   * no lesson ever claims more students than the course that contains it.
   */
  let lessonPosition = 0
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  const modules = course.modules.map((module, moduleIndex) => {
    check(
      !module.summary || module.summary.length <= 240,
      `course ${course.slug} / module ${moduleIndex + 1}: summary over 240 chars`,
    )
    check(
      module.lessons.length >= 1,
      `course ${course.slug} / module ${moduleIndex + 1}: needs at least one lesson`,
    )

    const lessonRefs = module.lessons.map((lesson) => {
      // Lesson slugs must be globally unique: LESSON_BY_SLUG_QUERY matches on the slug alone.
      const slug = `${course.slug}-${lesson.slug}`
      const id = `lesson.${slug}`
      const cacheKey = `${course.slug}-${lesson.slug}`
      const video = videos[cacheKey]

      check(Boolean(video), `lesson ${slug}: no resolved video. Re-run resolve-videos.mjs`)
      check(!lessonIds.has(id), `lesson ${slug}: duplicate lesson slug`)
      lessonIds.add(id)

      if (video) {
        const owner = usedVideoIds.get(video.id)
        check(!owner, `lesson ${slug}: video ${video.id} already used by ${owner}`)
        usedVideoIds.set(video.id, slug)
      }

      check(lesson.points.length <= 6, `lesson ${slug}: more than 6 key points`)
      check(!lesson.proTip || lesson.proTip.length <= 280, `lesson ${slug}: pro tip over 280 chars`)

      // 0-based position of this lesson within the whole course.
      const position = lessonPosition
      lessonPosition += 1

      const studentCount = Math.round(
        course.studentCount * (1 - (position / Math.max(totalLessons, 1)) * 0.62),
      )

      const resources = [
        {
          _type: 'resource',
          _key: keyOf(slug, 'docs'),
          type: 'link',
          title: course.docs.title,
          description: 'The official reference for the tools used in this lesson.',
          url: course.docs.url,
        },
      ]
      if (lesson.resource) {
        check(
          !lesson.resource.description || lesson.resource.description.length <= 160,
          `lesson ${slug}: resource description over 160 chars`,
        )
        resources.push({_type: 'resource', _key: keyOf(slug, 'extra'), ...lesson.resource})
      }

      documents.push({
        _id: id,
        _type: 'lesson',
        title: lesson.title,
        slug: {_type: 'slug', current: slug},
        videoUrl: `https://www.youtube.com/watch?v=${video?.id ?? 'missing'}`,
        thumbnail: image(posterUrl(video?.id ?? 'missing'), `Video thumbnail for ${lesson.title}`),
        duration: video?.duration ?? 0,
        // One free preview per course: the opening lesson.
        freePreview: position === 0,
        studentCount,
        notes: [
          block(lesson.summary, 'normal', `${slug}-intro`),
          block('What this lesson covers', 'h2', `${slug}-h2`),
          ...lesson.points.map((point, i) => bullet(point, `${slug}-point-${i}`)),
          block(
            `This lesson sits in ${module.title}, part of ${course.title}. It assumes what came before it and leads directly into the next lesson in the module.`,
            'normal',
            `${slug}-outro`,
          ),
        ],
        keyPoints: lesson.points,
        ...(lesson.proTip ? {proTip: lesson.proTip} : {}),
        resources,
      })

      referencedLessonIds.add(id)
      return {_type: 'reference', _key: keyOf(slug, 'ref'), _ref: id}
    })

    return {
      _type: 'module',
      _key: keyOf(course.slug, 'module', String(moduleIndex + 1)),
      title: module.title,
      summary: module.summary,
      lessons: lessonRefs,
    }
  })

  documents.push({
    _id: `course.${course.slug}`,
    _type: 'course',
    title: course.title,
    slug: {_type: 'slug', current: course.slug},
    summary: course.summary,
    coverImage: image(coverImageUrl(course.slug), `Cover image for ${course.title}`),
    instructor: {_type: 'reference', _ref: `instructor.${course.instructor}`},
    category: {_type: 'reference', _ref: `category.${course.category}`},
    level: course.level,
    price: course.price,
    popular: course.popular,
    studentCount: course.studentCount,
    learningOutcomes: course.outcomes.map((outcome, index) => {
      check(outcome.title.length <= 60, `course ${course.slug}: outcome title over 60 chars`)
      check(
        outcome.description.length <= 160,
        `course ${course.slug}: outcome description over 160 chars`,
      )
      return {_type: 'learningOutcome', _key: keyOf(course.slug, 'outcome', String(index)), ...outcome}
    }),
    modules,
  })
}

/* ---------------------------------------------------------- final checks */

for (const id of lessonIds) {
  check(referencedLessonIds.has(id), `lesson ${id} is orphaned: no course references it`)
}

const ids = documents.map((doc) => doc._id)
check(new Set(ids).size === ids.length, 'duplicate document _id in the seed')

if (problems.length) {
  console.error(`Refusing to write ${OUT_PATH}. ${problems.length} problem(s):\n`)
  problems.forEach((problem) => console.error(`  - ${problem}`))
  process.exit(1)
}

writeFileSync(OUT_PATH, `${documents.map((doc) => JSON.stringify(doc)).join('\n')}\n`)

const count = (type) => documents.filter((doc) => doc._type === type).length
console.log(`Wrote ${documents.length} documents to ${OUT_PATH}`)
console.log(
  `  categories: ${count('category')}\n` +
    `  instructors: ${count('instructor')}\n` +
    `  courses: ${count('course')}\n` +
    `  lessons: ${count('lesson')}`,
)
