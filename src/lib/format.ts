/** Display formatting for values Sanity stores raw (seconds, counts, enum slugs). */

/** `66240` → `18h 24m`, `2700` → `45m`. Returns null when there is nothing to show. */
export function formatDuration(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) return null;

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) return `${minutes}m`;
  if (!minutes) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/** `765` → `12:45`, `5280` → `1:28:00`. Used for matched video moments. */
export function formatTimestamp(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  const pad = (value: number) => `${value}`.padStart(2, "0");

  return hours ? `${hours}:${pad(minutes)}:${pad(secs)}` : `${minutes}:${pad(secs)}`;
}

/** `2100` → `2.1k`, `950` → `950`. */
export function formatCount(value: number | null | undefined) {
  if (value === null || value === undefined) return null;
  if (value < 1000) return `${value}`;

  const thousands = value / 1000;
  const rounded = thousands >= 10 ? Math.round(thousands) : Math.round(thousands * 10) / 10;
  return `${rounded}k`;
}

/** `intermediate` → `Intermediate`. */
export function formatLevel(level: string | null | undefined) {
  if (!level) return null;
  return level.charAt(0).toUpperCase() + level.slice(1);
}

/** `n` → `n items` / `1 item`. */
export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/**
 * The "5.1" label. Both indexes are zero-based array positions — numbering is derived from order,
 * never stored (AGENTS.md §7).
 */
export function lessonLabel(moduleIndex: number, lessonIndex: number) {
  return `${moduleIndex + 1}.${lessonIndex + 1}`;
}
