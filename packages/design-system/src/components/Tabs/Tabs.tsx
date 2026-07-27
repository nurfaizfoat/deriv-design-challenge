import { cn } from "../../utilities/cn";
import type { TabsProps } from "./Tabs.types";

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn("flex border-b border-border-default", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "label-md relative px-4 pb-3 pt-2 transition-colors",
              isActive
                ? "text-content-primary"
                : "text-[var(--surface-subtle)] hover:text-content-secondary",
            )}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-content-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}

Tabs.displayName = "Tabs";
