import { cn } from "@/lib/utils";

/** Relative bar heights, in the two clusters the reference shows either side of a gap. */
const clusters = [
  [58, 76, 92, 70, 50],
  [62, 78, 96, 66, 84],
];

interface ChartDecorationProps {
  className?: string;
}

/** Soft orange bars fading upward, cropped by the bottom of the page. Purely decorative. */
export function ChartDecoration({ className }: ChartDecorationProps) {
  return (
    <div
      aria-hidden
      className={cn("relative h-40 overflow-hidden sm:h-50", className)}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end px-6 blur-[6px] sm:px-10">
        {clusters.map((bars, cluster) => (
          <div
            key={cluster}
            className={cn("flex h-full flex-1 items-end gap-2", cluster === 1 && "ml-[18%]")}
          >
            {bars.map((height, index) => (
              <div
                key={index}
                style={{ height: `${height}%` }}
                className="flex-1 bg-linear-to-t from-primary-400/80 via-primary-300/40 to-transparent"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
