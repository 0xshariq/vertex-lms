import { CheckCircle2, CirclePlay, LoaderCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type Status = "in-progress" | "completed" | "now-playing" | "locked";

const config: Record<Status, { label: string; className: string }> = {
  "in-progress": { label: "In Progress", className: "text-primary-500" },
  completed: { label: "Completed", className: "text-success" },
  "now-playing": { label: "Now Playing", className: "text-primary-500" },
  locked: { label: "Locked", className: "text-neutral-700" },
};

interface StatusIndicatorProps {
  status: Status;
  /** Override the default label. */
  label?: string;
  className?: string;
}

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const { label: defaultLabel, className: tone } = config[status];

  return (
    <span className={cn("inline-flex items-center gap-2 text-body text-neutral-900", className)}>
      {status === "in-progress" && (
        <LoaderCircle className={cn("size-5", tone)} strokeWidth={2} aria-hidden />
      )}
      {status === "completed" && (
        <CheckCircle2 className={cn("size-5", tone)} strokeWidth={2} aria-hidden />
      )}
      {status === "now-playing" && (
        <CirclePlay
          className={cn("size-5", tone)}
          strokeWidth={2}
          fill="currentColor"
          stroke="var(--color-surface)"
          aria-hidden
        />
      )}
      {status === "locked" && <Lock className={cn("size-5", tone)} strokeWidth={2} aria-hidden />}
      {label ?? defaultLabel}
    </span>
  );
}
