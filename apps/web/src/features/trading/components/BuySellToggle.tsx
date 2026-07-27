import { Button, cn } from "@assessment/design-system";

export type TradeSide = "buy" | "sell";

export interface BuySellToggleProps {
  side: TradeSide;
  onChange: (side: TradeSide) => void;
  className?: string;
}

export function BuySellToggle({ side, onChange, className }: BuySellToggleProps) {
  const isBuy = side === "buy";

  return (
    <div className={cn("flex gap-1 rounded-xl bg-surface-card p-1", className)}>
      <Button
        variant="positive"
        className={cn(
          "flex-1",
          !isBuy &&
            "bg-transparent text-content-primary hover:bg-transparent",
        )}
        onClick={() => onChange("buy")}
      >
        Buy
      </Button>
      <Button
        variant="negative"
        className={cn(
          "flex-1",
          isBuy &&
            "bg-transparent text-content-primary hover:bg-transparent",
        )}
        onClick={() => onChange("sell")}
      >
        Sell
      </Button>
    </div>
  );
}
