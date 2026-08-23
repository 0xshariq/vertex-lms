# Sanity Context document

`vertex-search.ndjson` is the search configuration the Context MCP serves: the content scope filter
and the search agent's query instructions (AGENTS.md §10).

## Why it is imported instead of authored in the Studio

The `@sanity/context` Studio plugin — the thing that registers the `sanity.agentContext` type in the
Studio UI — peers on `sanity@^6`, and this Studio is on `sanity@^5`. AGENTS.md §12 says not to
install the plugin while it lags the Studio's major, so the document is imported directly. The MCP
reads it from the dataset either way; only in-Studio editing and Conversation Insights are missing
until the plugin catches up.

## Editing it

Edit the `instructions` or `groqFilter` value in the NDJSON, then re-import:

```bash
npm run context:import
```

The MCP picks up the change on the next request. The inline system prompt in
`lib/search/system-prompt.ts` and the cached initial context do **not** — those need a server
restart.

## The MCP URL

The document's slug is `vertex-search`, so the web app's `SANITY_CONTEXT_MCP_URL` ends with it:

```
https://api.sanity.io/v2026-03-03/context/mcp/<projectId>/<dataset>/vertex-search
```

The MCP only serves a dataset with a deployed Studio application (`npm run deploy`). A schema-only
deploy is not enough.
