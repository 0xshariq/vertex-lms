import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  /** Omit on the current page. */
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-xs text-body text-neutral-700 transition-colors hover:text-primary-500",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-body text-neutral-500">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-4 text-neutral-300" strokeWidth={2} aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
