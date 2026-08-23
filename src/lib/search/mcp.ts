import "server-only";

import { createMCPClient, type MCPClient } from "@ai-sdk/mcp";

/**
 * The connection to the Sanity Context MCP. Server-only: the read token authenticates every call,
 * and the browser never learns the endpoint (AGENTS.md §5, §12).
 *
 * The MCP only serves a dataset that has a deployed Studio application. A schema-only deploy is not
 * enough — see `studio/scripts/context/README.md`.
 */

function assertEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

/**
 * HTTPS only: every call carries the read token in an Authorization header, so a plaintext endpoint
 * would leak it. Validated here rather than at each call site — both the client and the
 * initial-context fetch resolve the URL through this.
 */
export function searchMcpUrl() {
  const value = assertEnv("SANITY_CONTEXT_MCP_URL");

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SANITY_CONTEXT_MCP_URL is not a valid URL");
  }

  if (url.protocol !== "https:") {
    throw new Error("SANITY_CONTEXT_MCP_URL must use https");
  }

  return url.toString();
}

function authHeaders() {
  return { Authorization: `Bearer ${assertEnv("SANITY_API_READ_TOKEN")}` };
}

export function createSearchMcpClient(): Promise<MCPClient> {
  return createMCPClient({
    transport: { type: "http", url: searchMcpUrl(), headers: authHeaders() },
  });
}

/** `/initial-context` hangs off the MCP path, before any query params. */
function initialContextUrl(mcpUrl: string) {
  const url = new URL(mcpUrl);
  url.pathname = `${url.pathname.replace(/\/$/, "")}/initial-context`;
  return url.toString();
}

let cachedInitialContext: string | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * The dataset's schema overview, injected into the system prompt so the model does not spend a tool
 * call rediscovering it on every search. Cached at module scope with a short TTL, which is why a
 * schema or instructions change needs a server restart to be picked up promptly (§12).
 *
 * Returns null when the endpoint is unreachable: search still works, the model just has to call
 * `schema_explorer` itself.
 */
export async function fetchInitialContext(): Promise<string | null> {
  const isFresh = cachedInitialContext && Date.now() - cachedAt < CACHE_TTL_MS;
  if (isFresh) return cachedInitialContext;

  try {
    const response = await fetch(initialContextUrl(searchMcpUrl()), { headers: authHeaders() });
    if (!response.ok) return cachedInitialContext;

    cachedInitialContext = await response.text();
    cachedAt = Date.now();
  } catch {
    // Fall back to whatever is cached, or to null on a cold start.
  }

  return cachedInitialContext;
}
