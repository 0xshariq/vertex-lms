# Vertex LMS

Vertex is an AI-powered learning platform for courses authored in Sanity. Learners browse a public catalog, open lessons with embedded video and notes, and search naturally for the exact lesson or video moment where a topic is taught.

## Architecture

This repository contains two independent workspaces:

- **Web** — the Next.js 16 App Router application in `src/`. It renders the catalog, course, instructor, lesson, and search pages. Sanity reads, Context MCP calls, model calls, grounding, and progress writes stay server-side.
- **Studio** — the standalone Sanity Studio in `studio/`. It owns schemas and content authoring; it is not embedded in Next.js.

Search uses Sanity Context MCP plus the Vercel AI SDK. The model returns only verified lesson ids and match metadata. The server reads lesson metadata back from Sanity before returning cards, so titles, courses, durations, thumbnails, and timestamps are never invented.

## Search and timestamp playback

Every search runs a lesson-topic lookup and a video-moment lookup. Video matching resolves chapters first because chapter labels are authoritative; transcript chunks are the fallback when no chapter matches. A moment is discarded unless its exact second exists in the returned chapter or transcript data.

Video result cards link to `/lessons/<slug>?t=<seconds>`. The lesson page awaits the `t` search parameter, clamps it to the stored duration, and passes it to the provider embed. YouTube, Vimeo, and Bunny playback remains on Vertex through the provider's own iframe player; no custom player or external navigation is used.

## Local setup

Install dependencies from the repository root:

```bash
pnpm install
pnpm dev
```

The web app runs at the Next.js preview URL. Configure the server-only Sanity, Context MCP, Clerk, and AI provider variables in the project environment; never expose read/write tokens to browser code. The Studio has its own configuration and deploy target.

Useful checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Sanity content

Courses contain ordered modules and lesson references. Lessons contain Portable Text notes, key points, resources, and an embed URL. Video documents hold one URL, chapter markers, and short timestamped transcript chunks. The search Context document is imported from `studio/scripts/context/vertex-search.ndjson`; its filter excludes drafts and limits the agent to course, lesson, instructor, category, and internal video content.

Transcript and chapter ingestion is offline tooling under `studio/scripts/ingest/`. It supports the same providers as playback only when both caption/chapter ingestion and provider embed seeking are implemented. Whole transcripts are never returned in the request path.

## Deploying

Deploy the Studio application separately, then deploy the web application. Context MCP requires a deployed Studio application, not only a schema deployment. After changing the Context document, verify the production Context endpoint and test both a chapter term and a transcript-only term.

## Manual verification

1. Search for a topic that appears in a chapter and confirm the card shows a timestamp.
2. Search for a transcript-only topic and confirm the fallback moment opens on the lesson page.
3. Open a video result and verify the URL contains `?t=` and the embedded player starts at that second.
4. Open a lesson without `t`, with `t=0`, and with an invalid or oversized value.
5. Confirm playback stays embedded on Vertex and invalid or orphaned model hits do not become cards.
