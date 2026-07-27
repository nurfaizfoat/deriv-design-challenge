import { Search } from "lucide-react";
import { cn } from "../../utilities/cn";
import type { SearchFieldProps } from "./SearchField.types";

export function SearchField({
  placeholder = "Enter token name...",
  className,
  ...props
}: SearchFieldProps) {
  return (
    <div
      className={cn(
        "flex h-[35px] items-center gap-2 rounded-sm bg-[var(--deriv-input-dark)] px-3",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-content-secondary" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent label-sm text-content-secondary outline-none placeholder:text-content-secondary"
        {...props}
      />
    </div>
  );
}

SearchField.displayName = "SearchField";
