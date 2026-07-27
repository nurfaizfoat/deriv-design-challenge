import type { WatchlistItem } from "../types/trading";

/**
 * Mock watchlist data covering a realistic range of values:
 * - Small and large prices
 * - Positive and negative changes
 * - Varying asset name lengths
 * - Pairs with and without logos
 */
export const MOCK_WATCHLIST_ITEMS: WatchlistItem[] = [
  {
    id: "btc-usdt",
    pair: "BTC/USDT",
    assetName: "Bitcoin",
    price: 67432.5,
    change: 2.34,
    marketCap: 1_320_000_000_000,
    volume24h: 28_400_000_000,
  },
  {
    id: "eth-usdt",
    pair: "ETH/USDT",
    assetName: "Ethereum",
    price: 3490.75,
    change: -1.22,
    marketCap: 420_500_000_000,
    volume24h: 15_700_000_000,
  },
  {
    id: "bnb-usdt",
    pair: "BNB/USDT",
    assetName: "BNB",
    price: 602.15,
    change: 0.87,
    marketCap: 92_300_000_000,
    volume24h: 1_840_000_000,
  },
  {
    id: "sol-usdt",
    pair: "SOL/USDT",
    assetName: "Solana",
    price: 178.42,
    change: 5.63,
    marketCap: 78_150_000_000,
    volume24h: 3_210_000_000,
  },
  {
    id: "xrp-usdt",
    pair: "XRP/USDT",
    assetName: "Ripple",
    price: 0.6234,
    change: -0.45,
    marketCap: 34_200_000_000,
    volume24h: 2_450_000_000,
  },
  {
    id: "ada-usdt",
    pair: "ADA/USDT",
    assetName: "Cardano",
    price: 0.4512,
    change: 1.89,
    marketCap: 16_100_000_000,
    volume24h: 890_000_000,
  },
  {
    id: "dot-usdt",
    pair: "DOT/USDT",
    assetName: "Polkadot",
    price: 7.89,
    change: -3.12,
    marketCap: 11_450_000_000,
    volume24h: 620_000_000,
  },
  {
    id: "doge-usdt",
    pair: "DOGE/USDT",
    assetName: "Dogecoin",
    price: 0.1245,
    change: 12.47,
    marketCap: 18_200_000_000,
    volume24h: 1_520_000_000,
  },
  {
    id: "matic-usdt",
    pair: "MATIC/USDT",
    assetName: "Polygon",
    price: 0.7231,
    change: -0.08,
    marketCap: 7_150_000_000,
    volume24h: 340_000_000,
  },
  {
    id: "avax-usdt",
    pair: "AVAX/USDT",
    assetName: "Avalanche",
    price: 35.67,
    change: 1.55,
    marketCap: 13_800_000_000,
    volume24h: 780_000_000,
  },
];
