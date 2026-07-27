export interface PairDetailsProps {
  /** The trading pair symbol, e.g. "BTC/USDT" */
  pair: string;
  /** The underlying asset name, e.g. "Bitcoin" */
  assetName: string;
  /** Optional logo image source. Falls back to a letter placeholder circle when omitted. */
  logoSrc?: string;
}

export interface WatchlistItem {
  id: string;
  pair: string;
  assetName: string;
  price: number;
  change: number; // percentage, e.g. 2.34 means +2.34%
  marketCap: number; // raw value, e.g. 1_320_000_000_000
  volume24h: number; // 24h trading volume in USDT, raw value
  logoSrc?: string;
}

export type WatchlistSortField = "pair" | "price" | "change";

export type SortDirection = "asc" | "desc";

export interface WatchlistTableProps {
  items: WatchlistItem[];
}

export interface OrderBookEntry {
  id: string;
  price: number;
  amount: number; // in BTC
  total: number; // in USDT
  side: "bid" | "ask";
}

export interface OrderBookTableProps {
  items: OrderBookEntry[];
}

/** A single price point on the chart. */
export interface ChartCandle {
  /** Unix timestamp in milliseconds */
  time: number;
  /** Price in USDT */
  price: number;
}

export interface TradingChartProps {
  /** The trading pair label, e.g. "BTC/USDT" */
  pair: string;
  /** Array of price points to plot */
  data: ChartCandle[];
  /** Current (latest) price for the marker line */
  currentPrice: number;
  /** 24h price change as a percentage, e.g. 2.34 */
  change24h: number;
}
