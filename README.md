# Vertex LMS

Vertex is an AI-powered learning platform built for discovering exactly where a concept is taught. Course authors manage structured content in Sanity, learners browse courses and lessons in a Next.js application, and natural-language search returns grounded lesson cards plus timestamped video moments.

## Repository layout

This repository contains two independent applications:

- `src/` — the public web application built with Next.js 16 App Router and TypeScript.
- `studio/` — the standalone Sanity Studio. It owns schemas, authoring, seed content, Context configuration, and offline video ingestion. It is intentionally not embedded in the web app.

The web app reads published Sanity content on the server. The browser never receives Sanity tokens, calls the Context MCP, or calls the language model directly. Per-learner progress writes also go through server routes and are scoped to the authenticated Clerk user.

## How search works

Search is a full results experience rather than a chat box. The server sends the learner's query to the Sanity Context MCP and the Vercel AI SDK, then validates and grounds the returned lesson identifiers against Sanity before rendering cards.

There are two complementary search paths:

1. **Lesson search** matches a lesson's title, key points, and plain-text projection of its Portable Text notes.
2. **Video-moment search** finds a precise moment in the internal `video` document linked to a lesson.

Video moments use strict two-stage timestamp resolution:

1. Search `chapters[].label` first. Chapters are authored markers and take precedence.
2. Only when no chapter matches, search `chunks[].text`, where each chunk is a short transcript segment.

Every returned timestamp is copied from Sanity data. The internal `video` document is never displayed as a result; it is resolved back to the lesson that uses its URL. A video card links to `/lessons/<slug>?t=<seconds>`, and the lesson page passes that second to the provider embed so playback stays on Vertex.

## Video ingestion

Video ingestion is offline and lives in `studio/scripts/ingest/`. It currently fetches YouTube captions and chapter markers, chunks caption cues into searchable segments, and writes one Sanity `video` document per unique URL. Chunks are bounded by approximately 45 seconds or 350 characters and never split a caption cue, so every `startSeconds` is a real seekable point.

The ingestion runner reads lesson URLs from the dataset rather than from a local fixture. It deduplicates shared videos, caches successful results in `studio/scripts/ingest/.cache/`, and refuses to cache incomplete transcripts. YouTube playback and ingestion are supported today; Vimeo and Bunny playback adapters exist in the web app, but their ingestion adapters remain intentionally disabled until authenticated caption/chapter sources are added.

Run the workflow from `studio/`:

```bash
npm run ingest:videos       # fetch captions and chapters into .cache/
npm run ingest:build        # convert the cache to videos.ndjson
npm run ingest:import       # import video documents into production
```

Useful runner options:

```bash
npm run ingest:videos -- --limit=3
npm run ingest:videos -- --force
```

Do not hand-edit `.cache/` or `videos.ndjson`; regenerate them from the dataset. The generated NDJSON import is idempotent because video document ids and array keys are deterministic.

## Seed content

Seed fixtures live in `studio/scripts/seed/`. `content.mjs` is the hand-authored course specification, `videos.json` caches resolved YouTube URLs, and `seed.ndjson` is generated import output. The normal flow is:

```bash
cd studio
npm run seed:videos
npm run seed:build
npm run seed:import
```

After importing lessons, run video ingestion against the dataset so captions reflect the actual lesson URLs:

```bash
npm run ingest:videos
npm run ingest:build
npm run ingest:import
```

## Sanity Context configuration

`studio/scripts/context/vertex-search.ndjson` contains the search Context document. Its GROQ scope keeps the agent focused on published `course`, `lesson`, `instructor`, `category`, and internal `video` documents while excluding drafts and irrelevant system documents. Its instructions capture only non-obvious search behavior: reverse lesson-to-course relationships, Portable Text matching, tokenized keyword matching, and chapter-first transcript fallback.

Import it after deploying the Studio application:

```bash
cd studio
npm run context:import
```

The Context MCP requires a deployed Studio application, not only a schema deploy. Changes to the inline search system prompt require restarting the web server; Context document changes are picked up by the next MCP request after import.

## Local development

Install dependencies using the lockfile from the repository root, then start the web app:

```bash
pnpm install
pnpm dev
```

Run the Studio separately when authoring or importing content:

```bash
cd studio
npm install
npm run dev
```

Configure environment variables through the project environment or local `.env.development.local`. Keep Sanity read/write tokens, Clerk secret keys, Context MCP credentials, and server-side analytics credentials private. Only browser-safe public keys should be exposed through `NEXT_PUBLIC_*` variables. Never commit `.env` files or credentials.

## Production deployment

Deploy the Studio and web application independently:

1. Deploy the Sanity Studio application.
2. Deploy the schema and import seed content if needed.
3. Import the Context document and verify its scope/instructions.
4. Ingest and import video documents after lesson URLs are final.
5. Deploy the Next.js web app.
6. Test both a chapter match and a transcript-only match in production.

The web application includes public catalog, course, instructor, lesson, and search surfaces. Clerk protects private learner features, while Sanity remains the source of truth for course content and video intelligence.

## Validation checklist

From the web workspace or repository root, run the checks defined by the workspace:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

For Studio changes:

```bash
cd studio
npm run typegen
npm run build
```

Manually verify:

1. Search for a term present in a YouTube chapter and confirm the chapter timestamp wins.
2. Search for a term present only in captions and confirm the transcript chunk timestamp is used.
3. Open the result and confirm the lesson URL contains an integer `t` parameter.
4. Confirm the embedded player starts at that timestamp without navigating to YouTube.
5. Open a lesson without `t`, with `t=0`, and with an invalid or oversized value.
6. Confirm fabricated, orphaned, draft, and off-topic results are not rendered.

## Key directories

```text
src/app/                     Next.js routes and server boundaries
src/components/              Learner-facing UI
src/lib/search/              MCP search, grounding, types, and system prompt
src/lib/video.ts             Provider embed URL and timestamp handling
src/sanity/                  Server-only Sanity client and GROQ queries
studio/schemaTypes/          Sanity document and object schemas
studio/scripts/seed/         Course fixtures and generated seed import
studio/scripts/ingest/       YouTube caption/chapter ingestion pipeline
studio/scripts/context/      Sanity Context document import
```

Vertex is deliberately kept small: Sanity owns structured content, offline tooling owns transcript ingestion, the server owns search and grounding, and the browser owns presentation and on-site playback.
