# Search timestamp playback implementation

Implement the approved Vertex search upgrade: chapter-first and transcript-fallback timestamp resolution, grounded timestamp validation, lesson deep links using `?t=`, provider-specific on-site playback for YouTube/Vimeo/Bunny, tuned Sanity Context scope/instructions, shaped search system prompt, and an accessible README. Preserve private server-only Sanity/MCP access, structured model output, no custom player, no whole transcript projection, and standalone web/Studio workspaces.

Acceptance criteria:
- Chapter timestamps win over transcript timestamps and are validated against Sanity.
- Video cards open `/lessons/[slug]?t=<second>` and the embedded provider starts there.
- Invalid/orphaned model hits are dropped; lesson metadata is grounded server-side.
- Context filter excludes drafts and scopes content types; instructions contain concise data/query deltas.
- README explains architecture, setup, commands, ingestion, context import, deployment, and checks.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass.

Manual checks: search a chapter term, search a transcript-only term, open each result, test no/invalid `t`, and confirm playback remains on Vertex.
