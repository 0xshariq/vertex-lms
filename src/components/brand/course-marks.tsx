import { cn } from "@/lib/utils";

interface MarkProps {
  /** Size of the tile in px. */
  size?: number;
  className?: string;
}

/** Black tile with the Next.js "N". */
export function NextjsMark({ size = 72, className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      role="img"
      aria-label="Next.js"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="vertex-nextjs-stem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="72" height="72" rx="16" fill="#0A0A0A" />
      <path d="M21 19h6v34h-6V19Z" fill="#FFFFFF" />
      <path d="M21 19h7l23 34h-7L21 19Z" fill="#FFFFFF" />
      <path d="M45 19h6v26h-6V19Z" fill="url(#vertex-nextjs-stem)" />
    </svg>
  );
}

/** The Docker whale, simplified: container stack on a whale body. */
export function DockerMark({ size = 72, className }: MarkProps) {
  const box = (x: number, y: number) => (
    <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" rx="1" fill="#2496ED" />
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      role="img"
      aria-label="Docker"
      className={cn("shrink-0", className)}
    >
      {[
        [21, 32],
        [31, 32],
        [41, 32],
        [31, 22],
        [41, 22],
        [41, 12],
      ].map(([x, y]) => box(x, y))}
      <path
        d="M8 43h51c0-3 .6-5.6 1.8-7.7 2.7 1.4 4.6 3.6 5.7 6.7 3-.6 5.6-.5 7.7.3-.6 4.3-2.6 7.6-6 9.9-3.4 2.3-8 3.5-13.8 3.5H24.6c-5.4 0-9.9-1.6-13.3-4.7C7.8 47.8 6.9 45.4 8 43Z"
        fill="#2496ED"
      />
      <path
        d="M14 55.5c1.6 2 4 3.4 7.2 4.2 4.7 1.2 9.5 1 14.3-.7"
        stroke="#2496ED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Blue tile with the TypeScript wordmark. */
export function TypeScriptMark({ size = 72, className }: MarkProps) {
  return (
    <span
      role="img"
      aria-label="TypeScript"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-[#3178C6] font-sans font-bold text-white",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42, lineHeight: 1 }}
    >
      TS
    </span>
  );
}
