import type { ReactNode } from "react";
import { cn } from "../../utilities/cn";

export type AlertTone = "info" | "success" | "warning" | "error";

const toneStyles: Record<AlertTone, string> = {
  info: "border-action-primary/30 bg-[color-mix(in_srgb,var(--action-primary)_10%,white)]",
  success:
    "border-status-positive/30 bg-[color-mix(in_srgb,var(--status-positive)_10%,white)]",
  warning:
    "border-status-warning/30 bg-[color-mix(in_srgb,var(--status-warning)_10%,white)]",
  error:
    "border-status-negative/30 bg-[color-mix(in_srgb,var(--status-negative)_10%,white)]",
};

const iconColorMap: Record<AlertTone, string> = {
  info: "text-action-primary",
  success: "text-status-positive",
  warning: "text-status-warning",
  error: "text-status-negative",
};

export interface AlertProps {
  tone?: AlertTone;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function Alert({
  tone = "info",
  icon,
  title,
  description,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      data-tone={tone}
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        toneStyles[tone],
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            "mt-0.5 shrink-0",
            iconColorMap[tone]
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1">
        <p className="body-md font-medium text-content-primary">{title}</p>
        {description && (
          <p className="body-sm text-content-secondary">{description}</p>
        )}
      </div>
    </div>
  );
}

Alert.displayName = "Alert";
