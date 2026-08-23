import { BarChart3, Clock, type LucideIcon, Users } from "lucide-react";
import { LessonBookmarkButton } from "@/components/lesson/lesson-bookmark-button";
import { Badge } from "@/components/ui/badge";
import { formatCount, formatDuration, formatLevel } from "@/lib/format";

interface LessonHeaderProps {
  /** "5.1", derived from curriculum order. */
  label: string | null;
  title: string | null;
  /** First paragraph of the lesson notes; the schema has no summary field. */
  summary: string | null;
  durationSeconds: number | null;
  /** Level is a course-level field, surfaced here as the design shows it. */
  level: string | null;
  studentCount: number | null;
  lessonSlug: string;
}

export function LessonHeader({
  label,
  title,
  summary,
  durationSeconds,
  level,
  studentCount,
  lessonSlug,
}: LessonHeaderProps) {
  const duration = formatDuration(durationSeconds);
  const levelLabel = formatLevel(level);
  const students = formatCount(studentCount);

  const meta: { icon: LucideIcon; label: string }[] = [];
  if (duration) meta.push({ icon: Clock, label: duration });
  if (levelLabel) meta.push({ icon: BarChart3, label: levelLabel });
  if (students) meta.push({ icon: Users, label: `${students} students` });

  return (
    <header>
      {label && <Badge variant="video">Lesson {label}</Badge>}

      <div className="mt-5 flex items-start justify-between gap-6">
        <h1 className="font-display text-[34px] leading-[42px] font-bold text-neutral-900 sm:text-[44px] sm:leading-[54px]">
          {title}
        </h1>
        <LessonBookmarkButton lessonSlug={lessonSlug} />
      </div>

      {summary && (
        <p className="mt-4 max-w-[520px] text-[17px] leading-[30px] text-neutral-500">{summary}</p>
      )}

      {meta.length > 0 && (
        <ul className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          {meta.map(({ icon: Icon, label: item }) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 text-[14px] leading-5 whitespace-nowrap text-neutral-500"
            >
              <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
