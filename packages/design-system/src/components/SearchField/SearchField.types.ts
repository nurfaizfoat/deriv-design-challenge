import type { ComponentProps } from "react";

export interface SearchFieldProps
  extends Omit<ComponentProps<"input">, "type"> {
  /** Override the default placeholder. */
  placeholder?: string;
}
