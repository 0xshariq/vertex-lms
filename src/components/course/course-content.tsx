"use client";

import { useId, useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { formatDuration, lessonLabel, pluralize } from "@/lib/format";
import { lessonHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;
type Module = NonNullable<Course["modules"]>[number];

/** How many modules are listed before the "Show all" toggle takes over. */
const COLLAPSED_MODULE_COUNT = 6;

interface CourseContentProps {
  modules: Module[];
  /** Total course runtime in seconds, summed by GROQ. */
  durationSeconds: number | null;
}

/**
 * The curriculum accordion. Module and lesson numbers come from array order (AGENTS.md §7), so
 * nothing here reads a stored number.
 */
export function CourseContent({ modules, durationSeconds }: CourseContentProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const panelId = useId();

  const isTruncated = modules.length > COLLAPSED_MODULE_COUNT;
  const visible = isTruncated && !showAll ? modules.slice(0, COLLAPSED_MODULE_COUNT) : modules;
  const duration = formatDuration(durationSeconds);

  const toggle = (key: string, moduleTitle: string | null, moduleIndex: number) => {
    const isCurrentlyOpen = openKeys.includes(key);
    setOpenKeys((keys) =>
      isCurrentlyOpen ? keys.filter((open) => open !== key) : [...keys, key],
    );
    posthog.capture(isCurrentlyOpen ? "module_collapsed" : "module_expanded", {
      module_index: moduleIndex + 1,
      module_title: moduleTitle,
    });
  };

  return (
    <section aria-labelledby="course-content">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2
          id="course-content"
          className="font-display text-[24px] leading-8 font-bold text-neutral-900"
        >
          Course Content
        </h2>
        <p className="text-[13px] leading-5 text-neutral-500">
          {pluralize(modules.length, "module")}
          {duration && <span aria-hidden> &nbsp;•&nbsp; </span>}
          {duration}
        </p>
      </div>

      {/* The toggle straddles the panel's bottom border, so the panel keeps clearance for it. */}
      <ul className={cn("mt-6 rounded-lg border border-canvas-line", isTruncated && "pb-4")}>
        {visible.map((module, moduleIndex) => {
          const key = module._key;
          const isOpen = openKeys.includes(key);
          const lessons = module.lessons ?? [];
          const moduleDuration = formatDuration(module.durationSeconds);
          const contentId = `${panelId}-${key}`;

          return (
            <li key={key} className="border-b border-canvas-line last:border-b-0">
              <button
                type="button"
                onClick={() => toggle(key, module.title ?? null, moduleIndex)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="flex w-full items-center gap-5 px-5 py-3.5 text-left transition-colors hover:bg-canvas-line/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset sm:px-7"
              >
                <span className="relative flex shrink-0 justify-center" aria-hidden>
                  <span className="flex size-7.25 items-center justify-center rounded-full border border-canvas-line bg-canvas text-[13px] leading-none text-neutral-700">
                    {moduleIndex + 1}
                  </span>
                  {moduleIndex < visible.length - 1 && !isOpen && (
                    <span className="absolute top-full left-1/2 h-8 w-px -translate-x-1/2 bg-canvas-line" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] leading-5 font-medium text-neutral-900">
                    {module.title}
                  </span>
                  {module.summary && (
                    <span className="mt-1 block text-[13px] leading-5 text-neutral-500">
                      {module.summary}
                    </span>
                  )}
                </span>

                {moduleDuration && (
                  <span className="shrink-0 text-[13px] leading-5 whitespace-nowrap text-neutral-500">
                    {moduleDuration}
                  </span>
                )}

                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-neutral-500 transition-transform",
                    isOpen && "rotate-180",
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <ul id={contentId} className="pb-3 pl-15 sm:pl-17">
                  {lessons.map((lesson, lessonIndex) => (
                    <li key={lesson._id}>
                      {lesson.slug ? (
                        <Link
                          href={lessonHref(lesson.slug)}
                          className="flex items-center gap-4 rounded-sm py-2 pr-14 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:pr-16"
                          onClick={() =>
                            posthog.capture("lesson_clicked", {
                              lesson_label: lessonLabel(moduleIndex, lessonIndex),
                              module_index: moduleIndex + 1,
                            })
                          }
                        >
                          <LessonRow
                            label={lessonLabel(moduleIndex, lessonIndex)}
                            title={lesson.title}
                            duration={lesson.duration}
                            freePreview={lesson.freePreview}
                          />
                        </Link>
                      ) : (
                        <div className="flex items-center gap-4 py-2 pr-14 sm:pr-16">
                          <LessonRow
                            label={lessonLabel(moduleIndex, lessonIndex)}
                            title={lesson.title}
                            duration={lesson.duration}
                            freePreview={lesson.freePreview}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {isTruncated && (
        <div className="-mt-5.5 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const next = !showAll;
              setShowAll(next);
              posthog.capture("course_content_show_all_toggled", {
                expanded: next,
                total_modules: modules.length,
              });
            }}
            aria-expanded={showAll}
            className="inline-flex items-center gap-3 rounded-md border border-canvas-line bg-canvas px-6 py-2.5 text-[15px] leading-6 text-neutral-900 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {showAll ? "Show fewer modules" : `Show all ${modules.length} modules`}
            <ChevronDown
              className={cn("size-4 transition-transform", showAll && "rotate-180")}
              strokeWidth={2}
              aria-hidden
            />
          </button>
        </div>
      )}
    </section>
  );
}

interface LessonRowProps {
  label: string;
  title: string | null;
  duration: number | null;
  freePreview: boolean | null;
}

function LessonRow({ label, title, duration, freePreview }: LessonRowProps) {
  const formatted = formatDuration(duration);

  return (
    <>
      <PlayCircle className="size-4 shrink-0 text-neutral-300" strokeWidth={2} aria-hidden />
      <span className="shrink-0 text-[13px] leading-5 text-neutral-500">{label}</span>
      <span className="min-w-0 flex-1 text-[14px] leading-5 text-neutral-700">{title}</span>
      {freePreview && (
        <Badge variant="lesson" className="shrink-0 whitespace-nowrap">
          Free preview
        </Badge>
      )}
      {formatted && (
        <span className="shrink-0 text-[13px] leading-5 whitespace-nowrap text-neutral-500">
          {formatted}
        </span>
      )}
    </>
  );
}
