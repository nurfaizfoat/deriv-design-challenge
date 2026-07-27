import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@assessment/design-system";
import type { OrderBookTableProps, OrderBookEntry } from "../types/trading";

function formatBTC(amount: number): string {
  return amount.toFixed(4);
}

function formatTotal(total: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);
}

function formatTrendPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatApproxPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function OrderBookTable({ items }: OrderBookTableProps) {
  const bids = items.filter((e) => e.side === "bid");
  const asks = items.filter((e) => e.side === "ask");

  if (bids.length === 0 || asks.length === 0) {
    return (
      <div className="mt-4" role="table" aria-label="Order book">
        <div role="rowgroup">
          <div role="row" className="flex px-2 pb-2">
            <div role="columnheader" className="flex-1">
              <span className="label-sm text-content-secondary">Price</span>
            </div>
            <div role="columnheader" className="flex-1 text-center">
              <span className="label-sm text-content-secondary">Amount (BTC)</span>
            </div>
            <div role="columnheader" className="flex-1 text-right">
              <span className="label-sm text-content-secondary">Total (USDT)</span>
            </div>
          </div>
        </div>
        <div role="rowgroup">
          <div role="row" className="px-2 py-6 text-center">
            <span role="cell" className="body-sm text-content-secondary">
              Order book data is unavailable.
            </span>
          </div>
        </div>
      </div>
    );
  }

  const lowestAsk = asks[asks.length - 1];
  const highestBid = bids[0];
  const midPrice = (lowestAsk.price + highestBid.price) / 2;

  const bidVolume = bids.reduce((sum, e) => sum + e.amount, 0);
  const askVolume = asks.reduce((sum, e) => sum + e.amount, 0);
  const isTrendUp = bidVolume >= askVolume;

  return (
    <div className="mt-4" role="table" aria-label="Order book">
      {/* Header */}
      <div role="rowgroup">
        <div
          role="row"
          className="flex px-2 pb-2"
        >
          <div role="columnheader" className="flex-1">
            <span className="label-sm text-content-secondary">
              Price
            </span>
          </div>
          <div role="columnheader" className="flex-1 text-center">
            <span className="label-sm text-content-secondary">
              Amount (BTC)
            </span>
          </div>
          <div role="columnheader" className="flex-1 text-right">
            <span className="label-sm text-content-secondary">
              Total (USDT)
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div role="rowgroup">
        {asks.reverse().map((entry) => (
          <OrderBookRow key={entry.id} entry={entry} />
        ))}

        {/* Trend indicator */}
        <div className="flex items-center gap-1.5 px-2 py-2">
          {isTrendUp ? (
            <ArrowUp size={20} strokeWidth={2.5} className="shrink-0 text-status-positive" />
          ) : (
            <ArrowDown size={20} strokeWidth={2.5} className="shrink-0 text-status-negative" />
          )}
          <span
            className={cn(
              "label-lg tabular-nums",
              isTrendUp ? "text-status-positive" : "text-status-negative",
            )}
          >
            {formatTrendPrice(midPrice)}
          </span>
          <span className="label-sm ml-auto text-content-primary">
            ≈ {formatApproxPrice(midPrice)}
          </span>
        </div>

        {bids.map((entry) => (
          <OrderBookRow key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function OrderBookRow({ entry }: { entry: OrderBookEntry }) {
  const isBid = entry.side === "bid";

  return (
    <div
      role="row"
      className="flex px-2 py-[7px] transition-colors hover:bg-surface-subtle"
    >
      <div role="cell" className="flex flex-1 items-center">
        <span
          className={cn(
            "label-sm tabular-nums",
            isBid ? "text-status-positive" : "text-status-negative",
          )}
        >
          {entry.price.toFixed(2)}
        </span>
      </div>
      <div role="cell" className="flex flex-1 items-center justify-center">
        <span className="label-sm tabular-nums text-content-primary">
          {formatBTC(entry.amount)}
        </span>
      </div>
      <div role="cell" className="flex flex-1 items-center justify-end">
        <span className="label-sm tabular-nums text-content-secondary">
          {formatTotal(entry.total)}
        </span>
      </div>
    </div>
  );
}

OrderBookTable.displayName = "OrderBookTable";
