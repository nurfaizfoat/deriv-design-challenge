import { cn } from "../../utilities/cn";
import type { BadgeTone } from "./Badge.types";

const toneStyles: Record<BadgeTone, string> = {
  neutral:
    "bg-surface-subtle text-content-secondary border-border-default",
  positive:
    "bg-[color-mix(in_srgb,var(--status-positive)_15%,white)] text-status-positive border-status-positive/30",
  warning:
    "bg-[color-mix(in_srgb,var(--status-warning)_15%,white)] text-status-warning border-status-warning/30",
  negative:
    "bg-[color-mix(in_srgb,var(--status-negative)_15%,white)] text-status-negative border-status-negative/30",
};

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  tone = "neutral",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      data-tone={tone}
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
