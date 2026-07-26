function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <nav className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight">Deriv</span>
            <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Spot
              </span>
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Futures
              </span>
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Earn
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Log In
            </span>
            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
              Sign Up
            </span>
          </div>
        </nav>
      </header>

      {/* Price Ticker Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex h-10 items-center gap-6 px-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">BTC/USDT</span>
            <span className="font-mono tabular-nums text-foreground">
              67,432.50
            </span>
            <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              +2.34%
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="hidden gap-4 text-xs text-muted-foreground sm:flex">
            <span>
              24h Vol <span className="text-foreground">2.1B</span>
            </span>
            <span>
              High <span className="text-foreground">68,150.00</span>
            </span>
            <span>
              Low <span className="text-foreground">65,890.20</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content — 4-column grid: 2/8 | 4/8 | 1/8 | 1/8 */}
      <main className="grid flex-1 grid-cols-8 gap-3 p-3">
        {/* Left Panel — 2/8 (col-span-2) */}
        <section className="col-span-2 flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Order Book
            </span>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Empty
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Watchlist
            </span>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Empty
            </div>
          </div>
        </section>

        {/* Center Panel — 4/8 (col-span-4) */}
        <section className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Chart
            </span>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Empty
            </div>
          </div>
        </section>

        {/* Right Panel — 1/8 (col-span-1) */}
        <section className="col-span-1 flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Order Form
            </span>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Empty
            </div>
          </div>
        </section>

        {/* Far Right Panel — 1/8 (col-span-1) */}
        <section className="col-span-1 flex flex-col gap-3">
          <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Market Trades
            </span>
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Empty
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
