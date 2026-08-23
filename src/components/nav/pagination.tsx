import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a page number. */
  buildHref: (page: number) => string;
  className?: string;
}

/** Pages around the current one, with "…" standing in for skipped ranges. */
function pageItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [];
  const end = Math.min(totalPages, Math.max(currentPage + 1, 3));
  const start = Math.max(1, end - 2);

  if (start > 1) {
    items.push(1);
    if (start > 2) items.push("ellipsis");
  }
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages) {
    if (end < totalPages - 1) items.push("ellipsis");
    items.push(totalPages);
  }

  return items;
}

const cell =
  "inline-flex size-9 items-center justify-center rounded-sm text-body transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

export function Pagination({ currentPage, totalPages, buildHref, className }: PaginationProps) {
  const items = pageItems(currentPage, totalPages);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-2", className)}>
      {hasPrevious ? (
        <Link
          href={buildHref(currentPage - 1)}
          aria-label="Previous page"
          className={cn(cell, "text-neutral-700 hover:bg-neutral-100")}
        >
          <ChevronLeft className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className={cn(cell, "text-neutral-300")}>
          <ChevronLeft className="size-4" strokeWidth={2} />
        </span>
      )}

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className={cn(cell, "text-neutral-500")}>
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              cell,
              item === currentPage
                ? "border border-primary-500 font-medium text-primary-500"
                : "text-neutral-700 hover:bg-neutral-100",
            )}
          >
            {item}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          aria-label="Next page"
          className={cn(cell, "text-neutral-700 hover:bg-neutral-100")}
        >
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className={cn(cell, "text-neutral-300")}>
          <ChevronRight className="size-4" strokeWidth={2} />
        </span>
      )}
    </nav>
  );
}
