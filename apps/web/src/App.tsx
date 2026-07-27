import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SearchField,
  Tabs,
} from "@assessment/design-system";
import type { TabItem } from "@assessment/design-system";
import { PairDetails } from "@/features/trading/components/PairDetails";
import { WatchlistTable } from "@/features/trading/components/WatchlistTable";
import { OrderBookTable } from "@/features/trading/components/OrderBookTable";
import { TradingChart } from "@/features/trading/components/TradingChart";
import {
  BuySellToggle,
  type TradeSide,
} from "@/features/trading/components/BuySellToggle";
import { ArrowLeftRight, Menu, X } from "lucide-react";
import {
  MOCK_WATCHLIST_ITEMS,
  MOCK_ORDER_BOOK,
  MOCK_CHART_DATA,
} from "@/features/trading/data/mock-data";

const WATCHLIST_TABS: TabItem[] = [
  { id: "watchlist", label: "Watchlist" },
  { id: "holdings", label: "Holdings" },
  { id: "market-movers", label: "Market Movers" },
];

const ORDER_FORM_TABS: TabItem[] = [
  { id: "spot", label: "Spot" },
  { id: "grid", label: "Grid" },
];

const ORDER_BOOK_TABS: TabItem[] = [
  { id: "order-book", label: "Order Book" },
  { id: "market-trades", label: "Market Trades" },
];

function App() {
  const [activeWatchlistTab, setActiveWatchlistTab] = useState("watchlist");
  const [activeOrderFormTab, setActiveOrderFormTab] = useState("spot");
  const [activeOrderBookTab, setActiveOrderBookTab] = useState("order-book");
  const [tradeSide, setTradeSide] = useState<TradeSide>("buy");
  const [depositModalState, setDepositModalState] = useState<
    "deposit" | "wallet-error" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const isBuyOrder = tradeSide === "buy";
  const availableBalance = isBuyOrder ? "9.89USDT" : "0.0245BTC";
  const submitButtonLabel = isBuyOrder ? "Deposit" : "Sell BTC";
  const submitButtonVariant = isBuyOrder ? "primary" : "negative";
  const modalOverlayClassName = `fixed inset-0 z-50 flex items-center justify-center bg-[var(--deriv-primary-black)]/70 px-4 ${
    isModalClosing ? "animate-out fade-out duration-150" : "animate-in fade-in duration-200"
  }`;
  const modalCardClassName = `w-full max-w-md border-[var(--deriv-input-dark)] bg-[var(--deriv-bg-dark)] ${
    isModalClosing
      ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-2 duration-150"
      : "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
  }`;

  function closeDepositModal() {
    setIsModalClosing(true);
    window.setTimeout(() => {
      setDepositModalState(null);
      setIsModalClosing(false);
    }, 150);
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page" data-theme="dark">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--deriv-primary-black)]/95 backdrop-blur-sm">
        <nav className="relative flex min-h-18 items-center justify-between px-4 py-3 md:px-6 md:py-0">
          <div className="flex items-center gap-8">
            <img
              src="/img-deriv-logo.svg"
              alt="Deriv"
              className="h-6 w-auto"
            />
            <div className="hidden items-center gap-6 label-md text-content-primary md:flex">
              <span className="cursor-pointer transition-opacity hover:opacity-80">
                Market
              </span>
              <span className="cursor-pointer transition-opacity hover:opacity-80">
                Spot
              </span>
              <span className="cursor-pointer transition-opacity hover:opacity-80">
                Futures
              </span>
              <span className="cursor-pointer transition-opacity hover:opacity-80">
                Help
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="secondary">Log In</Button>
            <Button variant="primary">Sign Up</Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-content-primary transition-colors hover:bg-[var(--deriv-input-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>

          <div
            id="mobile-navigation-menu"
            className={`absolute left-0 right-0 top-full border-t border-[var(--deriv-input-dark)] bg-[var(--deriv-primary-black)] px-4 py-4 shadow-lg md:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-1 label-md text-content-primary">
              {(["Market", "Spot", "Futures", "Help"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-sm px-3 py-3 text-left transition-colors hover:bg-[var(--deriv-input-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Price Ticker Bar */}
      <div className="border-y border-[var(--deriv-primary-black)] bg-surface-page">
        <div className="flex min-h-12 flex-col gap-4 px-4 py-3 text-sm lg:flex-row lg:items-center lg:gap-10 lg:px-6 lg:py-2">
          <div className="flex items-center gap-4 lg:gap-10">
            <PairDetails pair="BTC/USDT" assetName="Bitcoin" logoSrc="/bitcoin-btc-logo.svg" />
            <div className="w-px self-stretch bg-[var(--deriv-icon-grey)]" aria-hidden="true" />
            <div className="flex flex-col gap-0.5">
              <span className="flex items-baseline gap-2">
                <span className="heading-md tabular-nums text-content-primary">
                  67,432.50
                </span>
                <span className="label-sm text-[var(--deriv-positive-green)]">+2.34%</span>
              </span>
              <span className="label-sm text-content-secondary">
                $ 67,360.00
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-3 lg:flex lg:gap-10">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate label-sm text-content-primary">24h High</span>
              <span className="truncate label-sm text-content-secondary">64,429.26</span>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate label-sm text-content-primary">24h Low</span>
              <span className="truncate label-sm text-content-secondary">62,150.80</span>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate label-sm text-content-primary">24h Volume (BTC)</span>
              <span className="truncate label-sm text-content-secondary">14,832.45</span>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate label-sm text-content-primary">24h Volume (USDT)</span>
              <span className="truncate label-sm text-content-secondary">984.2M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — 3-column grid: 5/24 | 15/24 | 4/24 */}
      <main className="flex flex-1 flex-col gap-px bg-[var(--deriv-primary-black)] lg:grid lg:grid-cols-[repeat(24,minmax(0,1fr))] lg:gap-0">
        {/* Left Panel — Watchlist */}
        <section className="order-2 lg:order-none lg:col-span-5">
          <Card className="h-full border-l-0 border-r-0 lg:border-l lg:border-r">
            <CardContent>
              <SearchField />
              <Tabs
                tabs={WATCHLIST_TABS}
                activeTab={activeWatchlistTab}
                onChange={setActiveWatchlistTab}
                className="mt-4"
              />
              <WatchlistTable items={MOCK_WATCHLIST_ITEMS} />
            </CardContent>
          </Card>
        </section>

        {/* Center Panel — Chart */}
        <section className="hidden lg:col-span-15 lg:block">
          <TradingChart
            pair="BTC/USDT"
            data={MOCK_CHART_DATA}
            currentPrice={67432.50}
            change24h={2.34}
          />
        </section>

        {/* Right Panel — Order Form + Order Book stacked */}
        <section className="order-1 flex min-h-0 flex-col gap-px lg:order-none lg:col-span-4 lg:gap-0">
          <Card className="shrink-0 border-l-0 border-r-0 lg:border-l lg:border-r">
            <CardContent>
              <Tabs
                tabs={ORDER_FORM_TABS}
                activeTab={activeOrderFormTab}
                onChange={setActiveOrderFormTab}
              />
              <BuySellToggle
                side={tradeSide}
                onChange={setTradeSide}
                className="mt-4"
              />
              <div className="mt-4 flex items-center gap-1">
                <span className="caption text-content-secondary">
                  Available
                </span>
                <span className="caption text-content-primary">
                  {availableBalance}
                </span>
                <ArrowLeftRight className="size-3 text-content-secondary" />
              </div>
              <div className="mt-4">
                <label htmlFor="order-price" className="caption text-content-primary">
                  Price (USDT)
                </label>
                <input
                  id="order-price"
                  type="number"
                  placeholder="0.00"
                  className="mt-1 flex h-[35px] w-full rounded-sm bg-[var(--deriv-input-dark)] px-3 label-sm text-content-secondary outline-none placeholder:text-content-secondary"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="order-amount" className="caption text-content-primary">
                  Amount (BTC)
                </label>
                <input
                  id="order-amount"
                  type="number"
                  placeholder="0.00"
                  className="mt-1 flex h-[35px] w-full rounded-sm bg-[var(--deriv-input-dark)] px-3 label-sm text-content-secondary outline-none placeholder:text-content-secondary"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="order-total" className="caption text-content-primary">
                  Total (USDT)
                </label>
                <input
                  id="order-total"
                  type="number"
                  placeholder="0.00"
                  className="mt-1 flex h-[35px] w-full rounded-sm bg-[var(--deriv-input-dark)] px-3 label-sm text-content-secondary outline-none placeholder:text-content-secondary"
                />
              </div>
              <hr className="mt-4 border-t border-surface-card" />
              <Button
                variant={submitButtonVariant}
                className="mt-4 w-full"
                onClick={() => {
                  if (isBuyOrder) {
                    setIsModalClosing(false);
                    setDepositModalState("deposit");
                  } else {
                    setIsModalClosing(false);
                    setDepositModalState("wallet-error");
                  }
                }}
              >
                {submitButtonLabel}
              </Button>
              <div className="mt-4 flex h-[35px] w-full items-center justify-between rounded-sm bg-[var(--deriv-input-dark)] px-3 label-sm">
                <span className="text-content-secondary">
                  Maker 0.00% / Taker 0.05%
                </span>
                <span className="text-content-primary">Fees</span>
              </div>
            </CardContent>
          </Card>

          <Card className="min-h-0 flex-1 border-l-0 border-r-0 lg:border-l lg:border-r">
            <CardContent className="min-h-0 flex-1 overflow-y-auto">
              <Tabs
                tabs={ORDER_BOOK_TABS}
                activeTab={activeOrderBookTab}
                onChange={setActiveOrderBookTab}
              />
              <OrderBookTable items={MOCK_ORDER_BOOK} />
            </CardContent>
          </Card>
        </section>
      </main>

      {depositModalState === "deposit" && (
        <div
          className={modalOverlayClassName}
          role="presentation"
        >
          <Card
            className={modalCardClassName}
            role="dialog"
            aria-modal="true"
            aria-labelledby="deposit-dialog-title"
          >
            <CardHeader>
              <CardTitle id="deposit-dialog-title">
                Deposit USDT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">
                Add funds to your spot wallet before placing a BTC buy order.
              </p>
              <div className="mt-4 rounded-sm bg-[var(--deriv-input-dark)] px-3 py-3">
                <div className="flex justify-between gap-4 label-sm">
                  <span className="text-content-secondary">Asset</span>
                  <span className="text-content-primary">USDT</span>
                </div>
                <div className="mt-2 flex justify-between gap-4 label-sm">
                  <span className="text-content-secondary">Network</span>
                  <span className="text-content-primary">TRC20</span>
                </div>
                <div className="mt-2 flex justify-between gap-4 label-sm">
                  <span className="text-content-secondary">Available</span>
                  <span className="text-content-primary">{availableBalance}</span>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={closeDepositModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setIsModalClosing(false);
                    setDepositModalState("wallet-error");
                  }}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {depositModalState === "wallet-error" && (
        <div
          className={modalOverlayClassName}
          role="presentation"
        >
          <Card
            className={modalCardClassName}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-error-dialog-title"
          >
            <CardContent className="pt-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--deriv-negative-red)]/15 text-[var(--deriv-negative-red)]">
                <X size={26} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <CardTitle id="wallet-error-dialog-title" className="mt-4">
                Wallet not connected
              </CardTitle>
              <p className="mt-2 body-sm text-content-secondary">
                Connect your wallet before continuing with this deposit.
              </p>
              <Button
                variant="negative"
                className="mt-5 w-full"
                onClick={closeDepositModal}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
