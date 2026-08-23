"use client";

import { useId, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import type { CurriculumModule } from "@/components/lesson/lesson-curriculum";
import { formatDuration } from "@/lib/format";
import { courseHref, lessonHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LessonSidebarProps {
  courseTitle: string | null;
  courseSlug: string | null;
  /** Pre-sized course tile URL, or null when the course has no cover image. */
  courseImageUrl: string | null;
  courseImageAlt: string;
  modules: CurriculumModule[];
  /**
   * 0–100. Presentational for now: learner progress is not tracked yet (AGENTS.md §7), so it
   * renders 0 and `completedModuleKeys` arrives empty.
   */
  percentComplete: number;
  /** Modules the learner has finished, shown with a check instead of a chevron. */
  completedModuleKeys?: string[];
  className?: string;
}

/**
 * The curriculum rail beside the video. The module holding the current lesson starts expanded and
 * its rows carry the "Now playing" treatment, which is derived from the URL, not from progress.
 */
export function LessonSidebar({
  courseTitle,
  courseSlug,
  courseImageUrl,
  courseImageAlt,
  modules,
  percentComplete,
  completedModuleKeys = [],
  className,
}: LessonSidebarProps) {
  const currentModuleKey = modules.find((module) => module.containsCurrentLesson)?._key;
  const [openKeys, setOpenKeys] = useState<string[]>(currentModuleKey ? [currentModuleKey] : []);
  const panelId = useId();
  const value = Math.min(100, Math.max(0, Math.round(percentComplete)));

  const toggle = (module: CurriculumModule) => {
    const isOpen = openKeys.includes(module._key);
    setOpenKeys((keys) =>
      isOpen ? keys.filter((key) => key !== module._key) : [...keys, module._key],
    );
    posthog.capture(isOpen ? "module_collapsed" : "module_expanded", {
      module_index: module.index + 1,
      module_title: module.title,
      surface: "lesson_sidebar",
    });
  };

  const currentModuleNumber = modules.find((module) => module.containsCurrentLesson)?.index;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Below lg the rail collapses to a disclosure so the video leads the page (AGENTS.md §3). */}
      <button
        type="button"
        onClick={() => setIsMobileOpen((open) => !open)}
        aria-expanded={isMobileOpen}
        aria-controls={`${panelId}-rail`}
        className="flex items-center justify-between gap-3 border-b border-canvas-line px-5 py-4 text-[15px] leading-6 font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset lg:hidden"
      >
        Course content
        <ChevronDown
          className={cn("size-4 text-neutral-500 transition-transform", isMobileOpen && "rotate-180")}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <div
        id={`${panelId}-rail`}
        className={cn("flex-col", isMobileOpen ? "flex" : "hidden lg:flex")}
      >
      {courseSlug && (
        <Link
          href={courseHref(courseSlug)}
          className="inline-flex w-fit items-center gap-3 rounded-xs px-5 pt-8 text-[15px] leading-6 font-medium text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
          Back to course
        </Link>
      )}

      <div className="flex items-center gap-4 border-b border-canvas-line px-5 py-6">
        {courseImageUrl && (
          <Image
            src={courseImageUrl}
            alt={courseImageAlt}
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-md object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[15px] leading-5 font-medium text-neutral-900">
            {courseTitle}
          </p>
          <p className="mt-1.5 text-[13px] leading-4 text-neutral-500">{value}% complete</p>
          <div
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course progress"
            className="mt-1.5 h-0.75 w-full max-w-38 overflow-hidden rounded-full bg-neutral-200"
          >
            <div className="h-full rounded-full bg-primary-500" style={{ width: `${value}%` }} />
          </div>
        </div>
      </div>

      {modules.length > 0 && (
        <>
          <p className="flex items-center justify-between gap-3 border-b border-canvas-line px-5 py-4 text-[14px] leading-5 text-neutral-900">
            Module {(currentModuleNumber ?? 0) + 1} of {modules.length}
            <ChevronDown className="size-4 text-neutral-500" strokeWidth={2} aria-hidden />
          </p>

          <ul>
            {modules.map((module) => {
              const isOpen = openKeys.includes(module._key);
              const isCurrent = module.containsCurrentLesson;
              const duration = formatDuration(module.durationSeconds);
              const contentId = `${panelId}-${module._key}`;

              return (
                <li
                  key={module._key}
                  className={cn(
                    "border-b border-canvas-line",
                    isCurrent && "border-l-2 border-l-primary-500 bg-primary-100/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(module)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-canvas-line/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                  >
                    <span className="relative flex shrink-0 justify-center" aria-hidden>
                      <span
                        className={cn(
                          "flex size-7.25 items-center justify-center rounded-full border text-[13px] leading-none",
                          isCurrent
                            ? "border-primary-500 bg-primary-500 text-white"
                            : "border-canvas-line bg-canvas text-neutral-700",
                        )}
                      >
                        {module.index + 1}
                      </span>
                      {!isOpen && (
                        <span className="absolute top-full left-1/2 h-6 w-px -translate-x-1/2 bg-canvas-line" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] leading-5 font-medium text-neutral-900">
                        {module.title}
                      </span>
                      {duration && (
                        <span className="mt-1 block text-[13px] leading-5 text-neutral-500">
                          {duration}
                        </span>
                      )}
                    </span>

                    {completedModuleKeys.includes(module._key) && !isCurrent ? (
                      <CompletedMark className="mt-0.5 shrink-0" />
                    ) : (
                      <ChevronDown
                        className={cn(
                          "mt-1 size-4 shrink-0 text-neutral-500 transition-transform",
                          isOpen && "rotate-180",
                        )}
                        strokeWidth={2}
                        aria-hidden
                      />
                    )}
                  </button>

                  {isOpen && (
                    <ul id={contentId} className="pb-3">
                      {module.lessons.map((lesson) => {
                        const lessonDuration = formatDuration(lesson.duration);

                        const row = (
                          <>
                            <span className="relative flex w-7.25 shrink-0 justify-center" aria-hidden>
                              <span
                                className={cn(
                                  "mt-1.5 size-2 rounded-full border",
                                  lesson.isCurrent
                                    ? "border-primary-500 bg-primary-500"
                                    : "border-neutral-300 bg-canvas",
                                )}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block text-[14px] leading-5",
                                  lesson.isCurrent
                                    ? "font-medium text-neutral-900"
                                    : "text-neutral-700",
                                )}
                              >
                                {lesson.title}
                              </span>
                              <span
                                className={cn(
                                  "mt-1 block text-[13px] leading-5",
                                  lesson.isCurrent ? "text-primary-500" : "text-neutral-500",
                                )}
                              >
                                {lesson.isCurrent ? "Now playing" : lessonDuration}
                              </span>
                            </span>
                            {lesson.isCurrent && (
                              <span
                                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white"
                                aria-hidden
                              >
                                <Play className="size-3.5 fill-current" strokeWidth={2} />
                              </span>
                            )}
                          </>
                        );

                        return (
                          <li key={lesson._id}>
                            {lesson.slug && !lesson.isCurrent ? (
                              <Link
                                href={lessonHref(lesson.slug)}
                                className="flex items-start gap-4 px-5 py-2.5 transition-colors hover:bg-canvas-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                                onClick={() =>
                                  posthog.capture("lesson_clicked", {
                                    lesson_label: lesson.label,
                                    module_index: module.index + 1,
                                    surface: "lesson_sidebar",
                                  })
                                }
                              >
                                {row}
                              </Link>
                            ) : (
                              <div
                                aria-current={lesson.isCurrent ? "page" : undefined}
                                className="flex items-start gap-4 px-5 py-2.5"
                              >
                                {row}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
      </div>
    </div>
  );
}

/** Rendered only once progress exists; kept here so the sidebar's completed state has one home. */
export function CompletedMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full border border-primary-500 text-primary-500",
        className,
      )}
      aria-label="Completed"
    >
      <Check className="size-3" strokeWidth={2.5} aria-hidden />
    </span>
  );
}
