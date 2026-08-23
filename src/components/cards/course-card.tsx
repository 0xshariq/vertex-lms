import type { ReactNode } from "react";
import { BarChart3, Clock, FolderClosed } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CourseCardLayout = "row" | "stacked";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  /** Square brand tile shown with the title. */
  logo?: ReactNode;
  /** `row` puts the logo beside the title; `stacked` puts it above, with a divided meta row. */
  layout?: CourseCardLayout;
  className?: string;
}

type MetaProps = Pick<CourseCardProps, "level" | "duration" | "modules"> & {
  /** The stacked card spreads the row across a narrow column, so it runs tighter. */
  tight?: boolean;
};

function Meta({ level, duration, modules, tight = false }: MetaProps) {
  // Not cn(): tailwind-merge reads the custom `text-small` utility as a colour class and would
  // drop it in favour of `text-neutral-500`.
  const item = `inline-flex items-center whitespace-nowrap font-sans text-neutral-500 ${
    tight ? "gap-1 text-[11px] leading-4" : "text-small gap-2"
  }`;
  const icon = `text-neutral-500 ${tight ? "size-3.5" : "size-4"}`;

  return (
    <>
      <span className={item}>
        <BarChart3 className={icon} strokeWidth={2} aria-hidden />
        {level}
      </span>
      <span className={item}>
        <Clock className={icon} strokeWidth={2} aria-hidden />
        {duration}
      </span>
      <span className={item}>
        <FolderClosed className={icon} strokeWidth={2} aria-hidden />
        {modules}
      </span>
    </>
  );
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  logo,
  layout = "row",
  className,
}: CourseCardProps) {
  const fallbackLogo = (size: string) => (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md bg-neutral-900 font-display leading-none font-bold text-white",
        size,
      )}
    >
      {title.charAt(0)}
    </span>
  );

  if (layout === "stacked") {
    return (
      <Card className={cn("gap-7 p-4.5 xl:p-6", className)}>
        {logo ?? fallbackLogo("size-18 rounded-lg text-[32px]")}
        <div className="min-w-0">
          <h3 className="font-display text-[22px] leading-7 font-bold text-neutral-900">{title}</h3>
          <p className="mt-4 text-[15px] leading-6.25 text-neutral-500">{description}</p>
        </div>
        <CardFooter className="flex-wrap gap-x-1 gap-y-2 border-t border-canvas-line pt-6">
          <Meta level={level} duration={duration} modules={modules} tight />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cn("gap-5", className)}>
      <div className="flex items-start gap-4">
        {logo ?? fallbackLogo("size-12 rounded-md text-[22px]")}
        <div className="min-w-0">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="mt-1 text-body text-neutral-500">{description}</p>
        </div>
      </div>
      <CardFooter className="justify-start gap-5 pt-0">
        <Meta level={level} duration={duration} modules={modules} />
      </CardFooter>
    </Card>
  );
}
