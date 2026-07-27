import * as React from "react";
import { cn } from "../../utilities/cn";
import type { CardProps } from "./Card.types";

/**
 * Card — semantic wrapper using design tokens.
 * Uses bg-surface-card, border-border-default, rounded-lg via Tailwind utilities
 * backed by the semantic tokens exposed in the app's @theme inline block.
 */
function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col overflow-hidden border border-[var(--deriv-primary-black)] bg-surface-page",
        className
      )}
      {...props}
    />
  );
}

Card.displayName = "Card";

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 px-4 pt-4", className)}
      {...props}
    />
  );
}

CardHeader.displayName = "CardHeader";

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("heading-sm text-content-primary", className)}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("body-sm text-content-secondary", className)}
      {...props}
    />
  );
}

CardDescription.displayName = "CardDescription";

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-4", className)}
      {...props}
    />
  );
}

CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
