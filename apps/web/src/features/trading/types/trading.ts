export interface PairDetailsProps {
  /** The trading pair symbol, e.g. "BTC/USDT" */
  pair: string;
  /** The underlying asset name, e.g. "Bitcoin" */
  assetName: string;
  /** Optional logo image source. Falls back to a letter placeholder circle when omitted. */
  logoSrc?: string;
}
