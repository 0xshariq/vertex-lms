import { BarChart3, Clock, FileText, type LucideIcon, Users } from "lucide-react";
import Image from "next/image";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { Badge } from "@/components/ui/badge";
import { CourseHeroActions } from "@/components/course/course-hero-actions";
import { urlFor } from "@/sanity/lib/image";
import { formatCount, formatDuration, formatLevel, pluralize } from "@/lib/format";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

interface CourseHeroProps {
  course: Course;
  /** First lesson of the course, or null when the curriculum is empty. */
  continueHref: string | null;
}

/** Cover art, marketing copy, the derived meta row, and the two calls to action. */
export function CourseHero({ course, continueHref }: CourseHeroProps) {
  const level = formatLevel(course.level);
  const duration = formatDuration(course.durationSeconds);
  const modules = course.moduleCount ? pluralize(course.moduleCount, "module") : null;
  const students = formatCount(course.studentCount);

  const meta: { icon: LucideIcon; label: string }[] = [];
  if (level) meta.push({ icon: BarChart3, label: level });
  if (duration) meta.push({ icon: Clock, label: duration });
  if (modules) meta.push({ icon: FileText, label: modules });
  if (students) meta.push({ icon: Users, label: `${students} students` });

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-15">
      {course.coverImage?.asset && (
        <Image
          src={urlFor(course.coverImage).width(560).height(656).fit("crop").url()}
          alt={course.coverImage.alt ?? ""}
          width={280}
          height={328}
          priority
          className="h-[328px] w-full max-w-[280px] shrink-0 rounded-lg object-cover"
        />
      )}

      <div className="min-w-0 flex-1">
        {course.popular && <Badge variant="popular">Popular</Badge>}

        <h1 className="mt-8 font-display text-[38px] leading-[46px] font-bold text-neutral-900 sm:text-[52px] sm:leading-[60px]">
          {course.title}
        </h1>

        {course.summary && (
          <p className="mt-6 max-w-[420px] text-[17px] leading-[31px] text-neutral-500">
            {course.summary}
          </p>
        )}

        {meta.length > 0 && (
          <ul className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-3">
            {meta.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 text-[14px] leading-5 whitespace-nowrap text-neutral-500"
              >
                <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        )}

        <CourseHeroActions
          continueHref={continueHref}
          courseSlug={course.slug ?? ""}
        />
      </div>
    </div>
  );
}
