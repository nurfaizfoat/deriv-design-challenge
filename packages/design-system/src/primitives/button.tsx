import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utilities/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center",
    "rounded-lg",
    "px-[30px] py-[10px]",
    "label-sm",
    "border border-transparent",
    "font-medium whitespace-nowrap",
    "transition-all outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-offset-1",
    "focus-visible:ring-[var(--focus-ring)]",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--action-primary)] text-[var(--deriv-white)]",
          "hover:bg-[var(--action-primary-hover)]",
          "focus-visible:ring-[var(--action-primary)]",
        ],
        secondary: [
          "bg-[var(--surface-subtle)] text-[var(--deriv-white)]",
          "hover:bg-[color-mix(in_srgb,var(--surface-subtle)_85%,black)]",
          "border-[var(--border-default)]",
          "focus-visible:ring-[var(--border-default)]",
        ],
        positive: [
          "bg-[var(--action-positive)] text-[var(--deriv-white)]",
          "hover:bg-[var(--action-positive-hover)]",
          "focus-visible:ring-[var(--action-positive)]",
        ],
        negative: [
          "bg-[var(--action-negative)] text-[var(--deriv-white)]",
          "hover:bg-[var(--action-negative-hover)]",
          "focus-visible:ring-[var(--action-negative)]",
        ],
        warning: [
          "bg-[var(--status-warning)] text-[var(--deriv-white)]",
          "hover:bg-[color-mix(in_srgb,var(--status-warning)_90%,black)]",
          "focus-visible:ring-[var(--status-warning)]",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

function Button({
  className,
  variant = "primary",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

export { Button, buttonVariants, type ButtonProps };
