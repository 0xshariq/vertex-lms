import Image from "next/image";
import Link from "next/link";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";
import { CourseCard } from "@/components/cards/course-card";
import { formatDuration, formatLevel, pluralize } from "@/lib/format";
import { courseHref } from "@/lib/routes";
import { urlFor } from "@/sanity/lib/image";

type Course = COURSES_LIST_QUERY_RESULT[number];

interface CourseGridProps {
  courses: Course[];
  /** Show only the first n courses — the home page previews a single row. */
  limit?: number;
}

/** The catalog card grid, shared by the home page preview and the full catalog. */
export function CourseGrid({ courses, limit }: CourseGridProps) {
  const visible = courses.filter((course) => course.slug !== null).slice(0, limit);

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((course) => (
        <li key={course._id} className="flex min-w-0">
          <Link
            href={courseHref(course.slug as string)}
            className="flex min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <CourseCard
              layout="stacked"
              title={course.title ?? ""}
              description={course.summary ?? ""}
              level={formatLevel(course.level) ?? ""}
              duration={formatDuration(course.durationSeconds) ?? ""}
              modules={course.moduleCount ? pluralize(course.moduleCount, "module") : ""}
              logo={
                course.coverImage?.asset ? (
                  <Image
                    src={urlFor(course.coverImage).width(144).height(144).fit("crop").url()}
                    alt={course.coverImage.alt ?? ""}
                    width={72}
                    height={72}
                    className="size-18 shrink-0 rounded-lg object-cover"
                  />
                ) : undefined
              }
              className="min-w-0 flex-1 border-canvas-line shadow-none transition-shadow hover:shadow-md"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
