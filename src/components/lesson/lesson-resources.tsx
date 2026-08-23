"use client";

import {
  Code2,
  ExternalLink,
  FileText,
  FolderGit2,
  type LucideIcon,
  Presentation,
} from "lucide-react";
import posthog from "posthog-js";

type ResourceType = "code" | "link" | "pdf" | "repo" | "slides";

interface Resource {
  _key: string;
  type: ResourceType | null;
  title: string | null;
  description: string | null;
  url: string | null;
}

interface LessonResourcesProps {
  resources: Resource[];
  lessonSlug: string;
}

const icons: Record<ResourceType, LucideIcon> = {
  code: Code2,
  link: FileText,
  pdf: FileText,
  repo: FolderGit2,
  slides: Presentation,
};

/**
 * The resources grid. A separate card from `components/cards/resource-card.tsx`, which is the
 * search-result composition (type + size footer) and carries data a lesson resource does not have.
 */
export function LessonResources({ resources, lessonSlug }: LessonResourcesProps) {
  // Only https links are rendered — the URL comes from content.
  const linkable = resources.filter((resource) => resource.url?.startsWith("https://"));
  if (linkable.length === 0) return null;

  return (
    <section aria-labelledby="lesson-resources">
      <h2
        id="lesson-resources"
        className="font-display text-[20px] leading-7 font-bold text-neutral-900"
      >
        Resources
      </h2>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {linkable.map((resource) => {
          const Icon = icons[resource.type ?? "link"] ?? FileText;

          return (
            <li key={resource._key}>
              <a
                href={resource.url as string}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture("lesson_resource_clicked", {
                    lesson_slug: lessonSlug,
                    resource_type: resource.type,
                    resource_title: resource.title,
                  })
                }
                className="flex h-full flex-col gap-3 rounded-md border border-canvas-line bg-canvas p-5 transition-colors hover:border-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <span className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary-100 text-primary-500">
                    <Icon className="size-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="min-w-0 text-[14px] leading-5 font-medium text-neutral-900">
                    {resource.title}
                  </span>
                </span>

                <span className="flex items-end justify-between gap-3">
                  <span className="min-w-0 text-[13px] leading-5 text-neutral-500">
                    {resource.description}
                  </span>
                  <ExternalLink
                    className="size-4 shrink-0 text-neutral-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
