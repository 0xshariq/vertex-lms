import type { ComponentPropsWithoutRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<"select">, "className" | "children"> {
  options: SelectOption[];
  /** Accessible label; visually hidden by default. */
  label?: string;
  className?: string;
}

export function Select({ id = "select", label = "Sort by", options, className, ...props }: SelectProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        className="h-11 w-full appearance-none rounded-md border border-neutral-200 bg-surface px-4 pr-10 text-body text-neutral-900 focus:border-primary-400 focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-neutral-900"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}
