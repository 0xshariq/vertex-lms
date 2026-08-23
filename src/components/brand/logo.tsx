import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Size of the mark in px. The wordmark scales with it. */
  size?: number;
  showWordmark?: boolean;
}

export function LogoMark({ size = 28, className }: Omit<LogoProps, "showWordmark">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label="Vertex"
      className={cn("shrink-0", className)}
    >
      {/* Outer downward triangle */}
      <path d="M2.5 4.5h23L14 25.5 2.5 4.5Z" fill="#F97316" />
      {/* Notched inner V, cut out of the triangle */}
      <path d="M9.2 4.5h9.6L14 13.2 9.2 4.5Z" fill="#FAFAFC" />
      <path d="M11.1 10.3h5.8L14 15.6l-2.9-5.3Z" fill="#EA5A0B" />
    </svg>
  );
}

export function Logo({ size = 28, showWordmark = true, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className="font-sans font-bold tracking-tight text-neutral-900"
          style={{ fontSize: size * 0.8, lineHeight: 1 }}
        >
          Vertex
        </span>
      )}
    </span>
  );
}
