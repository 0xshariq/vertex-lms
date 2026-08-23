import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "xl" | "lg" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium whitespace-nowrap " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed";

const sizes: Record<ButtonSize, string> = {
  /** Hero call to action. */
  xl: "h-16 gap-4 px-7 text-[17px]",
  lg: "h-11 px-4 text-[16px]",
  md: "h-11 px-3 text-[14px]",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "border border-primary-500 bg-transparent text-primary-500",
  tertiary: "border border-neutral-200 bg-surface text-neutral-900 shadow-sm",
  text: "px-0 text-primary-500",
};

const hoverVariants: Record<ButtonVariant, string> = {
  primary: "hover:bg-primary-600",
  secondary: "hover:bg-primary-100",
  tertiary: "hover:bg-neutral-50",
  text: "hover:text-primary-600",
};

/** Applied statically so the design system sheet can show the hover row. */
const hoverStatic: Record<ButtonVariant, string> = {
  primary: "bg-primary-600",
  secondary: "bg-primary-100",
  tertiary: "bg-neutral-50",
  text: "text-primary-600",
};

const disabledVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-100 text-primary-300",
  secondary: "border-primary-200 text-primary-300",
  tertiary: "border-neutral-200 bg-neutral-50 text-neutral-300",
  text: "text-primary-300",
};

/**
 * Button appearance as a class string, for elements that cannot be a `Button`/`ButtonLink` —
 * chiefly `next/link`, which must render its own anchor to keep prefetching.
 */
export function buttonClasses({
  variant = "primary",
  size = "lg",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, sizes[size], variants[variant], hoverVariants[variant], className);
}

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered after the label. */
  icon?: ReactNode;
  /** Renders the hover appearance without a pointer, for documentation. */
  hovered?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function Button({
  variant = "primary",
  size = "lg",
  icon,
  hovered = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        disabled ? disabledVariants[variant] : hoverVariants[variant],
        hovered && !disabled && hoverStatic[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className">;

export function ButtonLink({
  variant = "primary",
  size = "lg",
  icon,
  hovered = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        base,
        sizes[size],
        variants[variant],
        hoverVariants[variant],
        hovered && hoverStatic[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}
