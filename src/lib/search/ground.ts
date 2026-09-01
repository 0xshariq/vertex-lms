import "server-only";

import { lessonLabel } from "@/lib/format";
import { lessonHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { LESSONS_BY_IDS_QUERY } from "@/sanity/lib/queries";
import { MAX_RESULTS, type ModelHit, type SearchResult, type SearchSort } from "./types";

type GroundedLesson = {
  _id: string;
  _createdAt: string;
  title?: string | null;
  slug?: string | null;
  duration?: number | null;
  freePreview?: boolean | null;
  keyPoints?: string[] | null;
  thumbnailRef?: string | null;
  video?: {
    url?: string | null;
    chapters?: Array<{ startSeconds?: number | null; label?: string | null }> | null;
    chunks?: Array<{ startSeconds?: number | null; text?: string | null }> | null;
  } | null;
  course?: {
    title?: string | null;
    slug?: string | null;
    iconRef?: string | null;
    modules?: Array<{ title?: string | null; lessonIds?: string[] | null }> | null;
  } | null;
};

/** Turns model-authored ids into cards built only from verified Sanity data. */
export async function groundHits(hits: ModelHit[], sort: SearchSort): Promise<SearchResult[]> {
  const ranked = [...hits].sort((a, b) => a.rank - b.rank).slice(0, MAX_RESULTS);
  const byLesson = new Map<string, ModelHit>();
  for (const hit of ranked) if (!byLesson.has(hit.lessonId)) byLesson.set(hit.lessonId, hit);

  const ids = [...byLesson.keys()];
  if (!ids.length) return [];

  const lessons = (await sanityFetch({
    query: LESSONS_BY_IDS_QUERY,
    params: { ids },
    tags: [CACHE_TAGS.lesson, CACHE_TAGS.course],
  })) as GroundedLesson[];
  const lessonsById = new Map(lessons.map((lesson) => [lesson._id, lesson]));
  const results: SearchResult[] = [];

  for (const hit of byLesson.values()) {
    const lesson = lessonsById.get(hit.lessonId);
    const course = lesson?.course;
    const modules = course?.modules ?? [];
    if (!lesson?.slug || !lesson.title || !course?.title || !course.slug) continue;

    const moduleIndex = modules.findIndex((module) => module.lessonIds?.includes(lesson._id));
    const lessonIndex = moduleIndex < 0 ? -1 : (modules[moduleIndex].lessonIds?.indexOf(lesson._id) ?? -1);
    if (lessonIndex < 0) continue;

    const base = {
      lessonId: lesson._id,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      label: lessonLabel(moduleIndex, lessonIndex),
      moduleTitle: modules[moduleIndex].title ?? null,
      courseTitle: course.title,
      courseSlug: course.slug,
      courseIconRef: course.iconRef ?? null,
      durationSeconds: lesson.duration ?? null,
      freePreview: lesson.freePreview ?? false,
      keyPoints: lesson.keyPoints ?? [],
      thumbnailRef: lesson.thumbnailRef ?? null,
      reason: hit.reason,
      rank: hit.rank,
    };

    const moment = resolveVideoMoment(lesson, hit);
    results.push(
      moment
        ? { ...base, kind: "video", startSeconds: moment.startSeconds, momentLabel: moment.momentLabel, href: lessonHref(lesson.slug, moment.startSeconds) }
        : { ...base, kind: "lesson", href: lessonHref(lesson.slug) },
    );
  }

  return sortResults(results, lessonsById, sort);
}

/** Chapters are authoritative. Transcript chunks are used only when no chapter matches. */
function resolveVideoMoment(lesson: GroundedLesson, hit: ModelHit) {
  if (hit.kind !== "video" || hit.startSeconds === null || hit.startSeconds < 0) return null;
  const second = hit.startSeconds;
  const chapter = lesson.video?.chapters?.find((item) => item.startSeconds === second);
  if (chapter) return { startSeconds: second, momentLabel: chapter.label ?? hit.momentLabel ?? null };
  const chunk = lesson.video?.chunks?.find((item) => item.startSeconds === second);
  return chunk ? { startSeconds: second, momentLabel: null } : null;
}

function sortResults(results: SearchResult[], lessons: Map<string, GroundedLesson>, sort: SearchSort) {
  if (sort === "relevance") return results.sort((a, b) => a.rank - b.rank);
  if (sort === "duration") {
    return results.sort((a, b) => (a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity) || a.rank - b.rank);
  }
  return results.sort((a, b) => (lessons.get(b.lessonId)?._createdAt ?? "").localeCompare(lessons.get(a.lessonId)?._createdAt ?? "") || a.rank - b.rank);
}
