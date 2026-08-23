/**
 * Video URLs stored on a lesson resolve to a provider embed, so playback stays on our own lesson
 * page (AGENTS.md §7). The embed src is built from a parsed provider id — the stored URL is never
 * interpolated into an iframe as-is.
 *
 * Supported providers match the lesson schema's allowed hosts: YouTube, Vimeo, and Bunny Stream.
 */

export type VideoProvider = "youtube" | "vimeo" | "bunny";

export interface ParsedVideo {
  provider: VideoProvider;
  /** Provider-side id. For Bunny this is `<libraryId>/<videoId>`. */
  id: string;
}

const ID_PATTERN = /^[\w-]+$/;

/** Returns null when the URL is not a supported, embeddable provider URL. */
export function parseVideoUrl(url: string | null | undefined): ParsedVideo | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:") return null;

  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = parsed.searchParams.get("v") ?? (segments[0] === "embed" ? segments[1] : null);
    return id && ID_PATTERN.test(id) ? { provider: "youtube", id } : null;
  }

  if (host === "youtu.be") {
    const id = segments[0];
    return id && ID_PATTERN.test(id) ? { provider: "youtube", id } : null;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = segments[0] === "video" ? segments[1] : segments[0];
    return id && /^\d+$/.test(id) ? { provider: "vimeo", id } : null;
  }

  if (host === "iframe.mediadelivery.net" || host === "video.bunnycdn.com") {
    const [library, id] = segments[0] === "embed" || segments[0] === "play" ? segments.slice(1) : segments;
    return library && id && ID_PATTERN.test(library) && ID_PATTERN.test(id)
      ? { provider: "bunny", id: `${library}/${id}` }
      : null;
  }

  return null;
}

interface EmbedOptions {
  /** Second to start playback at, from the `?t=` param on the lesson URL. */
  startSeconds?: number;
  autoplay?: boolean;
}

/** Builds the provider's own embed URL, using its own start and autoplay parameters. */
export function videoEmbedUrl(
  { provider, id }: ParsedVideo,
  { startSeconds = 0, autoplay = false }: EmbedOptions = {},
) {
  const start = Math.max(0, Math.floor(startSeconds));

  if (provider === "youtube") {
    const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
    if (start) params.set("start", `${start}`);
    if (autoplay) params.set("autoplay", "1");
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  }

  if (provider === "vimeo") {
    const params = new URLSearchParams({ dnt: "1" });
    if (autoplay) params.set("autoplay", "1");
    // Vimeo takes the start offset as a media fragment, not a query parameter.
    return `https://player.vimeo.com/video/${id}?${params}${start ? `#t=${start}s` : ""}`;
  }

  const params = new URLSearchParams({ preload: "false", responsive: "true" });
  if (start) params.set("t", `${start}`);
  if (autoplay) params.set("autoplay", "true");
  return `https://iframe.mediadelivery.net/embed/${id}?${params}`;
}

const PROVIDER_LABELS: Record<VideoProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  bunny: "Bunny Stream",
};

export function videoProviderLabel(provider: VideoProvider) {
  return PROVIDER_LABELS[provider];
}
