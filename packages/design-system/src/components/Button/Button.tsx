import {
  Button as ButtonPrimitive,
  type ButtonProps as PrimitiveButtonProps,
} from "../../primitives/button";
import { cn } from "../../utilities/cn";
import type { ButtonVariant, ButtonSize } from "./Button.types";

export interface ButtonProps
  extends Omit<PrimitiveButtonProps, "variant" | "size"> {
  /** Visual variant — maps directly to the primitive. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      variant={variant}
      className={cn(className)}
      {...props}
    >
      {loading ? "Loading…" : children}
    </ButtonPrimitive>
  );
}
