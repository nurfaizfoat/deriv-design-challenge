import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@assessment/design-system";
import type {
  WatchlistTableProps,
  WatchlistSortField,
  SortDirection,
  WatchlistItem,
} from "../types/trading";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

function sortItems(
  items: WatchlistItem[],
  field: WatchlistSortField,
  direction: SortDirection,
): WatchlistItem[] {
  return [...items].sort((a, b) => {
    let cmp = 0;
    if (field === "pair") {
      cmp = a.pair.localeCompare(b.pair);
    } else {
      cmp = a[field] - b[field];
    }
    return direction === "asc" ? cmp : -cmp;
  });
}

interface SortHeaderProps {
  field: WatchlistSortField;
  label: string;
  activeField: WatchlistSortField | null;
  direction: SortDirection;
  onSort: (field: WatchlistSortField) => void;
  align?: "start" | "end";
}

function SortHeader({
  field,
  label,
  activeField,
  direction,
  onSort,
  align = "start",
}: SortHeaderProps) {
  const isActive = activeField === field;

  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={cn(
        "label-sm flex w-full items-center gap-1 text-content-secondary transition-colors hover:text-content-primary",
        align === "end" && "justify-end text-right",
      )}
    >
      {label}
      <span className="flex flex-col -space-y-1" aria-hidden="true">
        <ChevronUp
          size={12}
          strokeWidth={2}
          className={cn(
            isActive && direction === "asc"
              ? "text-content-primary"
              : "text-content-secondary/60",
          )}
        />
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={cn(
            isActive && direction === "desc"
              ? "text-content-primary"
              : "text-content-secondary/60",
          )}
        />
      </span>
    </button>
  );
}

export function WatchlistTable({ items }: WatchlistTableProps) {
  const [sortField, setSortField] = useState<WatchlistSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedItems = useMemo(
    () =>
      sortField
        ? sortItems(items, sortField, sortDirection)
        : items,
    [items, sortField, sortDirection],
  );

  function handleSort(field: WatchlistSortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  return (
    <div className="mt-4" role="table" aria-label="Watchlist">
      {/* Header */}
      <div role="rowgroup">
        <div
          role="row"
          className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(4.5rem,0.8fr)] gap-3 px-2 pb-2"
        >
          <div role="columnheader" className="min-w-0">
            <SortHeader
              field="pair"
              label="Pair"
              activeField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div role="columnheader" className="min-w-0">
            <SortHeader
              field="price"
              label="Price"
              activeField={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </div>
          <div role="columnheader" className="min-w-0">
            <SortHeader
              field="change"
              label="Change"
              activeField={sortField}
              direction={sortDirection}
              onSort={handleSort}
              align="end"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div role="rowgroup">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            role="row"
            className="grid cursor-pointer grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(4.5rem,0.8fr)] gap-3 px-2 py-3 transition-colors hover:bg-surface-subtle"
          >
            <div
              role="cell"
              className="flex min-w-0 items-center gap-3"
            >
              {/* Logo circle */}
              {item.logoSrc ? (
                <img
                  src={item.logoSrc}
                  alt={item.assetName}
                  className="h-9 w-9 shrink-0 rounded-full bg-surface-card object-contain p-1"
                />
              ) : (
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-card label-sm text-content-secondary"
                  aria-hidden="true"
                >
                  {item.assetName.charAt(0)}
                </span>
              )}

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate label-sm tabular-nums text-content-primary">
                  {item.pair}
                </span>
                <span className="truncate label-sm text-content-secondary">
                  {item.assetName}
                </span>
              </div>
            </div>
            <div role="cell" className="flex min-w-0 items-center">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate label-sm tabular-nums text-content-primary">
                  {formatPrice(item.price)}
                </span>
                <span className="truncate label-sm tabular-nums text-content-secondary">
                  {formatMarketCap(item.volume24h)}
                </span>
              </div>
            </div>
            <div role="cell" className="flex min-w-0 items-center justify-end text-right">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span
                  className={cn(
                    "truncate label-sm tabular-nums",
                    item.change > 0
                      ? "text-status-positive"
                      : item.change < 0
                        ? "text-status-negative"
                        : "text-content-secondary",
                  )}
                >
                  {formatChange(item.change)}
                </span>
                <span className="truncate label-sm tabular-nums text-content-secondary">
                  {formatMarketCap(item.marketCap)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
