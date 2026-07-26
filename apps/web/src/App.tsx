import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@assessment/design-system";
import { PairDetails } from "@/features/trading/components/PairDetails";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-page" data-theme="dark">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border-default bg-[var(--deriv-primary-black)]/95 backdrop-blur-sm">
        <nav className="flex h-18 items-center justify-between px-6">
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
          <div className="flex items-center gap-3">
            <Button variant="secondary">Log In</Button>
            <Button variant="primary">Sign Up</Button>
          </div>
        </nav>
      </header>

      {/* Price Ticker Bar */}
      <div className="border-b border-border-default bg-surface-page">
        <div className="flex min-h-12 items-center gap-10 px-6 py-2 text-sm">
          <div className="flex items-center gap-10">
            <PairDetails pair="BTC/USDT" assetName="Bitcoin" />
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
          <div className="flex gap-10">
            <div className="flex flex-col gap-0.5">
              <span className="label-sm text-content-primary">24h High</span>
              <span className="label-sm text-content-secondary">64,429.26</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="label-sm text-content-primary">24h Low</span>
              <span className="label-sm text-content-secondary">62,150.80</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="label-sm text-content-primary">24h Volume (BTC)</span>
              <span className="label-sm text-content-secondary">14,832.45</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="label-sm text-content-primary">24h Volume (USDT)</span>
              <span className="label-sm text-content-secondary">984.2M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — 4-column grid: 2/8 | 4/8 | 1/8 | 1/8 */}
      <main className="grid flex-1 grid-cols-8 gap-3 p-3">
        {/* Left Panel — 2/8 (col-span-2) */}
        <section className="col-span-2 flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">Empty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">Empty</p>
            </CardContent>
          </Card>
        </section>

        {/* Center Panel — 4/8 (col-span-4) */}
        <section className="col-span-4 flex flex-col gap-3">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">Empty</p>
            </CardContent>
          </Card>
        </section>

        {/* Right Panel — 1/8 (col-span-1) */}
        <section className="col-span-1 flex flex-col gap-3">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Order Form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">Empty</p>
            </CardContent>
          </Card>
        </section>

        {/* Far Right Panel — 1/8 (col-span-1) */}
        <section className="col-span-1 flex flex-col gap-3">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Market Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-content-secondary">Empty</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default App;
