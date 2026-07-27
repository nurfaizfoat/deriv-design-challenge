import type { PairDetailsProps } from "../types/trading";

/**
 * PairDetails — displays the trading pair symbol and underlying asset name
 * with an optional logo. Falls back to a letter placeholder circle when no `logoSrc`
 * is provided.
 *
 * - Pair symbol uses heading-md for prominence
 * - Asset name uses label-sm in content-secondary for supporting context
 */
export function PairDetails({ pair, assetName, logoSrc }: PairDetailsProps) {
  return (
    <div className="flex items-center gap-3">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${assetName} logo`}
          className="h-9 w-9 rounded-full object-cover"
        />
      ) : (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-card label-md text-content-secondary"
          aria-hidden="true"
        >
          {assetName.charAt(0)}
        </span>
      )}

      <div className="flex flex-col gap-0.5">
        <h2 className="heading-md text-content-primary">{pair}</h2>
        <p className="label-sm text-content-secondary">{assetName}</p>
      </div>
    </div>
  );
}
