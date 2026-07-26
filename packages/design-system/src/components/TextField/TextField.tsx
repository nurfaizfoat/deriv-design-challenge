import { useId } from "react";
import { Input } from "../../primitives/input";
import { cn } from "../../utilities/cn";
export type { TextFieldProps } from "./TextField.types";
import type { TextFieldProps } from "./TextField.types";

export function TextField({
  label,
  error,
  disabled = false,
  className,
  id: idProp,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={id}
        className="body-sm text-content-primary"
      >
        {label}
      </label>
      <Input
        id={id}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          error &&
            "border-status-negative focus-visible:border-status-negative focus-visible:ring-status-negative/30"
        )}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="caption text-status-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
}

TextField.displayName = "TextField";
