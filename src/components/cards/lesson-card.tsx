import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  title: string;
  description: string;
  /** Module label derived from order, e.g. "Module 5". */
  moduleLabel: string;
  href: string;
  className?: string;
}

export function LessonCard({ title, description, moduleLabel, href, className }: LessonCardProps) {
  return (
    <Card className={cn("gap-3", className)}>
      <Badge variant="lesson">Lesson</Badge>
      <h3 className="text-heading-3 text-neutral-900">{title}</h3>
      <p className="text-body text-neutral-500">{description}</p>
      <CardFooter>
        <span className="text-small text-neutral-500">{moduleLabel}</span>
        <a
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-xs text-small font-medium text-primary-500 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          View lesson
          <ExternalLink className="size-4" strokeWidth={2} aria-hidden />
        </a>
      </CardFooter>
    </Card>
  );
}
