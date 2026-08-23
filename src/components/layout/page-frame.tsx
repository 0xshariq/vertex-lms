import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * The framed page column: a fixed-width canvas centred in the viewport, with hairline rules on
 * both edges and faint diagonal stripes filling the gutters beyond them.
 */
export function PageFrame({ children, className }: PageFrameProps) {
  return (
    <div
      className={cn("flex flex-1 justify-center bg-canvas", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--color-canvas-line) 0 1px, transparent 1px 14px)",
      }}
    >
      <div className="flex w-full max-w-360 flex-col bg-canvas min-[1441px]:border-x min-[1441px]:border-canvas-line">
        {children}
      </div>
    </div>
  );
}
