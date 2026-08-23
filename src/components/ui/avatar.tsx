import { cn } from "@/lib/utils";

interface AvatarProps {
  /** Full name of the person; initials are derived from it. */
  name: string;
  /** Diameter in px. */
  size?: number;
  className?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Circular avatar. Renders initials until a real image source exists. */
export function Avatar({ name, size = 48, className }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-canvas-line bg-neutral-100 font-sans font-semibold text-neutral-700",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.34, lineHeight: 1 }}
    >
      {initials(name)}
    </span>
  );
}
