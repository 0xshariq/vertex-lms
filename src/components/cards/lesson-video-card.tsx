import { CirclePlay } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LessonVideoCardProps {
  title: string;
  description: string;
  /** Lesson label derived from module/lesson order, e.g. "Lesson 5.1". */
  lessonLabel: string;
  /** Formatted timestamp of the matched moment, e.g. "12:45". */
  timestamp: string;
  href: string;
  className?: string;
}

export function LessonVideoCard({
  title,
  description,
  lessonLabel,
  timestamp,
  href,
  className,
}: LessonVideoCardProps) {
  return (
    <Card className={cn("gap-3", className)}>
      <Badge variant="video">Video</Badge>
      <h3 className="text-heading-3 text-neutral-900">{title}</h3>
      <p className="text-body text-neutral-500">{description}</p>
      <CardFooter>
        <span className="text-small text-neutral-500">
          {lessonLabel} <span className="px-1">·</span> {timestamp}
        </span>
        <a
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-xs text-small font-medium text-primary-500 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <CirclePlay className="size-4" strokeWidth={2} aria-hidden />
          Watch from {timestamp}
        </a>
      </CardFooter>
    </Card>
  );
}
