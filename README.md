# Deriv Design Challenge

A focused fintech trading interface built with React, TypeScript, Tailwind CSS v4, and a local design-system workspace package. The current product slice is a BTC/USDT spot trading screen with a watchlist, static exchange-style chart, Buy/Sell order form, order book, and a small deposit happy/error flow.

## Assessment links

| Item | Link |
|------|------|
| Live application | Not provided yet |
| Figma | Not provided yet |
| Loom walkthrough | Not provided yet |

## Product scope

This project intentionally focuses on one polished trading screen instead of many incomplete screens.

The selected journey is:

1. Review the BTC/USDT market context.
2. Inspect watchlist pairs, price movement, and order-book depth.
3. Switch between Buy and Sell in the Spot order form.
4. Start the Buy deposit flow.
5. See a wallet-not-connected error state after continuing.

## What is implemented

| Area | Implementation |
|------|----------------|
| Trading shell | Dark Deriv-style header, market ticker, three-column trading layout |
| Watchlist | Sortable crypto pairs with logos, prices, market cap, volume, and positive/negative change styling |
| BTC/USDT chart | Static SVG line chart with timeframe controls, OHLC-style stats, vertical/horizontal grid lines, price ladder, current-price marker, area fill, and volume histogram |
| Order form | Spot tab with Buy/Sell toggle, side-specific available balance, inputs, fees, and CTA styling |
| Sell view | Mirrors the Buy form with BTC balance and a negative Sell CTA |
| Deposit flow | Buy-side Deposit opens a modal using existing design-system components |
| Error flow | Continue from deposit shows a wallet-not-connected modal with Lucide `X` and negative token styling |
| Order book | Bid/ask rows, spread-style midpoint indicator, and a card that grows to use available right-column height |
| Motion | Deposit modals use eased fade/zoom/slide transitions via existing animation utilities |

## Architecture

The repository is an npm workspace with a local design-system package consumed by the web app.

```text
apps/
└── web/
    └── src/
        ├── App.tsx
        ├── index.css
        └── features/
            └── trading/
                ├── components/
                ├── data/
                └── types/

packages/
└── design-system/
    └── src/
        ├── components/
        ├── primitives/
        ├── tokens/
        ├── utilities/
        └── index.ts
```

Product code imports public design-system APIs from:

```tsx
import { Button, Card, CardContent, Tabs } from "@assessment/design-system";
```

Application features do not import shadcn primitives directly. shadcn/Base UI are treated as editable primitive foundations inside the design-system package.

## Design-system approach

The design system is split into:

| Layer | Example |
|-------|---------|
| Tokens | `packages/design-system/src/tokens/*.css` |
| Primitives | `packages/design-system/src/primitives/button.tsx` |
| Public components | `Button`, `Card`, `Badge`, `SearchField`, `Tabs`, `Alert`, `Skeleton`, `EmptyState`, `TextField` |
| Product components | `TradingChart`, `WatchlistTable`, `OrderBookTable`, `BuySellToggle`, `PairDetails` |
| Screen composition | `apps/web/src/App.tsx` |

The token files define Deriv-inspired primitives and semantic CSS custom properties such as:

| Intent | Token |
|--------|-------|
| Positive trading state | `--deriv-positive-green` / `--status-positive` |
| Negative trading state | `--deriv-negative-red` / `--status-negative` |
| Dark app background | `--deriv-bg-dark` |
| Dark input/card fill | `--deriv-input-dark` |
| Secondary content | `--deriv-icon-grey` / `--content-secondary` |

Tailwind is used as the styling engine, but recurring visual decisions come from tokens rather than raw one-off values.

## Data and states

All data is local and mocked in:

```text
apps/web/src/features/trading/data/mock-data.ts
```

Mock data includes:

- Multiple crypto watchlist pairs.
- Positive and negative percentage movements.
- Order-book bid and ask rows.
- A 48-point static BTC/USDT chart history over 24 hours.

Current reachable UI states:

| State | How to access |
|-------|---------------|
| Default trading screen | Open the app |
| Buy order form | Default toggle state |
| Sell order form | Click `Sell` in the Spot order form |
| Deposit modal | Click `Deposit` while Buy is selected |
| Wallet error modal | Click `Continue` in the deposit modal |

## Accessibility notes

- Main interactive controls use real `button` elements.
- Tables use ARIA table/row/cell roles for watchlist and order book structure.
- The chart exposes an SVG `role="img"` with an accessible label.
- Deposit and wallet-error popups use `role="dialog"` and `aria-modal="true"`.
- Status is not communicated by color alone in the order book midpoint; arrow icon and text are both present.
- Financial values use tabular numeric styling where relevant.

## AI workflow transparency

AI assistance was used to accelerate implementation and iteration, especially for:

- Building the local design-system boundary.
- Creating reusable trading product components.
- Mocking realistic BTC/USDT chart and order-book data.
- Iterating visual details such as chart density, axis labels, order-book height, and modal transitions.
- Keeping implementation aligned with tokens and existing components.

Corrections made during the process:

- The initial chart looked too much like a decorative line graph, so it was revised with trading-specific conventions: price ladder, current-price pill, volume histogram, OHLC microcopy, and session grid lines.
- The chart spacing and height were adjusted several times to better match a zoomed-out exchange chart.
- The order book card was updated to grow responsively instead of leaving unused vertical space.
- Modal animation required a short delayed-unmount state so the exit transition could play instead of disappearing abruptly.

## Local development

```bash
# Install dependencies
npm install

# Start the web app
npm run dev

# Production build / TypeScript check
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

## Verification

Latest checks run during this implementation:

```bash
npm run build
npm run lint
```

`npm run build` passes.

`npm run lint` reports two existing Fast Refresh warnings in legacy generated shadcn files under `apps/web/src/components/ui/` (`badge.tsx` and `button.tsx`). No new lint warnings were introduced by the trading screen changes.

There is no root `typecheck` script; TypeScript is covered by `npm run build` through `tsc -b` in `apps/web/package.json`.

## Deliberate trade-offs

- The BTC/USDT chart is static SVG instead of a charting library to keep dependencies low and make the assessment implementation easier to review.
- The deposit and wallet-error modals are inline in `App.tsx` because the requested change explicitly asked not to create a new component.
- The app uses local mocked data only; there is no backend, authentication, wallet integration, or real exchange API.
- The current implementation prioritises the desktop trading layout. Further responsive polish for narrow mobile widths should be a follow-up.

## With more time

1. Extract the order form into a typed product component once the flow stabilises.
2. Add reachable loading, empty, and error states for the trading screen via query parameters.
3. Add keyboard focus management for the modal open/close cycle.
4. Add focused component tests for Buy/Sell state, modal transitions, and table sorting.
5. Expand responsive behaviour for 375px and tablet breakpoints.

## License

Private assessment project.
