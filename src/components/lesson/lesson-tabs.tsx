"use client";

import { type ReactNode, useId, useRef, useState } from "react";
import { NotebookPen } from "lucide-react";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";

type TabId = "content" | "notes";

const TABS: { id: TabId; label: string }[] = [
  { id: "content", label: "Lesson Content" },
  { id: "notes", label: "Notes" },
];

interface LessonTabsProps {
  /** Server-rendered lesson body. */
  children: ReactNode;
  lessonSlug: string;
}

/**
 * Lesson Content / Notes. The Notes tab is presentational (AGENTS.md §7) — there is no note store
 * and nothing here writes.
 */
export function LessonTabs({ children, lessonSlug }: LessonTabsProps) {
  const [active, setActive] = useState<TabId>("content");
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ content: null, notes: null });

  const select = (id: TabId) => {
    setActive(id);
    posthog.capture("lesson_tab_changed", { lesson_slug: lessonSlug, tab: id });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const index = TABS.findIndex((tab) => tab.id === active);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(index + offset + TABS.length) % TABS.length];

    select(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Lesson" onKeyDown={onKeyDown} className="flex gap-8 border-b border-canvas-line">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              className={cn(
                "-mb-px border-b-2 px-1 pb-3 text-[15px] leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                isActive
                  ? "border-primary-500 font-medium text-primary-500"
                  : "border-transparent text-neutral-500 hover:text-neutral-900",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-content-panel`}
        aria-labelledby={`${baseId}-content-tab`}
        hidden={active !== "content"}
        className="pt-8"
      >
        {children}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-notes-panel`}
        aria-labelledby={`${baseId}-notes-tab`}
        hidden={active !== "notes"}
        tabIndex={0}
        className="pt-8"
      >
        <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-canvas-line px-6 py-14 text-center">
          <NotebookPen className="size-6 text-neutral-300" strokeWidth={2} aria-hidden />
          <p className="text-[15px] leading-6 font-medium text-neutral-900">
            Your notes will live here
          </p>
          <p className="max-w-80 text-[14px] leading-6 text-neutral-500">
            Note taking is not available yet. Nothing you type would be saved, so the tab stays
            read-only for now.
          </p>
        </div>
      </div>
    </div>
  );
}
