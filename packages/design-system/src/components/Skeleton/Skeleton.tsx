import { cn } from "../../utilities/cn";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-surface-subtle",
        "motion-reduce:animate-none",
        className
      )}
    />
  );
}

Skeleton.displayName = "Skeleton";
