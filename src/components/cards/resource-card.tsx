import { ExternalLink, FileText } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  title: string;
  description: string;
  /** Resource type shown in the footer, e.g. "PDF". */
  type: string;
  /** Human readable size, e.g. "1.2 MB". */
  size: string;
  href: string;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  type,
  size,
  href,
  className,
}: ResourceCardProps) {
  return (
    <Card className={cn("gap-5", className)}>
      <div className="flex items-start gap-4">
        <FileText className="size-6 shrink-0 text-neutral-900" strokeWidth={2} aria-hidden />
        <div className="min-w-0">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="mt-1 text-body text-neutral-500">{description}</p>
        </div>
      </div>
      <CardFooter>
        <span className="text-small text-neutral-500">
          {type} <span className="px-1">·</span> {size}
        </span>
        <a
          href={href}
          aria-label={`Open ${title}`}
          className="rounded-xs text-primary-500 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <ExternalLink className="size-5" strokeWidth={2} aria-hidden />
        </a>
      </CardFooter>
    </Card>
  );
}
