# AGENTS.md

## Project Purpose

This repository contains a small, production-quality fintech web application created for a UI/UX design and frontend assessment.

The project must demonstrate:

* A clear connection between the Figma design system and the coded design system.
* Centralised design tokens.
* Reusable, typed components.
* Deliberate use of Tailwind CSS and shadcn.
* Responsive desktop and mobile behaviour.
* Default, loading, empty and error states.
* Basic accessibility.
* A narrow, polished product scope.
* A readable implementation that an evaluator can understand quickly.

The goal is not to build the largest possible application. Prefer a small, coherent and complete experience over an ambitious but inconsistent implementation.

---

# 1. Core Technology

Use:

* React
* TypeScript
* Tailwind CSS v4
* shadcn only as an editable primitive foundation
* CSS custom properties for semantic design tokens
* Mocked local data
* A local npm workspace package for the design system

Do not add:

* A backend
* Authentication
* A database
* Real API integrations
* Unnecessary state-management libraries
* Large dependencies for simple behaviour
* Unrelated abstractions or infrastructure

Do not replace the selected stack unless explicitly instructed.

---

# 2. Required Architecture

Use the following preferred structure:

```text
apps/
└── web/
    └── src/
        ├── app/
        │   ├── App.tsx
        │   └── routes.tsx
        │
        ├── features/
        │   └── portfolio/
        │       ├── components/
        │       │   ├── PortfolioHeader.tsx
        │       │   ├── PortfolioSummary.tsx
        │       │   ├── HoldingRow.tsx
        │       │   └── TransactionRow.tsx
        │       ├── data/
        │       │   └── mock-data.ts
        │       ├── types/
        │       │   └── portfolio.ts
        │       ├── PortfolioScreen.tsx
        │       └── PortfolioScreen.states.tsx
        │
        └── main.tsx

packages/
└── design-system/
    └── src/
        ├── tokens/
        │   ├── primitives.css
        │   ├── semantic.css
        │   ├── typography.css
        │   └── themes.css
        │
        ├── primitives/
        │   ├── button.tsx
        │   ├── dialog.tsx
        │   ├── input.tsx
        │   └── select.tsx
        │
        ├── components/
        │   ├── Button/
        │   │   ├── Button.tsx
        │   │   └── Button.types.ts
        │   ├── Card/
        │   ├── Badge/
        │   ├── TextField/
        │   ├── Alert/
        │   ├── Skeleton/
        │   └── EmptyState/
        │
        ├── utilities/
        │   └── cn.ts
        │
        └── index.ts

AGENTS.md
README.md
package.json
```

Use the package name:

```text
@assessment/design-system
```

Product code should import system components from:

```tsx
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Skeleton,
  TextField,
} from "@assessment/design-system";
```

Do not publish the package externally. It is a local workspace package used to establish a clear architectural boundary.

---

# 3. Architectural Layers

The UI architecture has four layers.

## Layer 1: Design tokens

Tokens contain the reusable visual decisions:

* Colours
* Typography
* Spacing
* Radius
* Elevation
* Motion, when required

Tokens are defined once and consumed by system components.

## Layer 2: Primitives

Primitives provide low-level accessible behaviour.

Examples:

* shadcn Button foundation
* Radix Dialog behaviour
* Radix Select behaviour
* Focus management
* Keyboard interactions

Primitives are implementation details.

Application screens must never import primitives directly.

## Layer 3: Design-system components

Design-system components expose the product's approved visual language and public APIs.

Examples:

* `Button`
* `Card`
* `Badge`
* `TextField`
* `Alert`
* `Skeleton`
* `EmptyState`

These components:

* Consume design tokens.
* Define controlled variants.
* Include accessibility behaviour.
* Hide primitive implementation details.
* Are exported through the design-system entry point.

## Layer 4: Product components

Product components represent fintech-specific concepts.

Examples:

* `PortfolioSummary`
* `TransactionRow`
* `HoldingRow`
* `TransferSummary`
* `AccountBalance`

Product components compose design-system components.

Product components may contain layout styling but must not recreate or override the internal visual styling of system components.

## Layer 5: Screens

Screens compose product components into a complete experience.

Screens are responsible for:

* Page-level layout
* Data selection
* State selection
* Responsive composition
* Page headings and landmarks

Screens must not contain duplicated low-level component styling.

---

# 4. Dependency Boundaries

The permitted dependency direction is:

```text
Tokens
  ↓
Primitives
  ↓
Design-system components
  ↓
Product components
  ↓
Screens
```

Never reverse this direction.

## Allowed

```tsx
// Product component importing the public system.
import { Badge, Card } from "@assessment/design-system";
```

## Not allowed

```tsx
// Product code importing an internal primitive.
import { Button } from "@assessment/design-system/primitives/button";
```

## Not allowed

```tsx
// Product code importing generated shadcn source directly.
import { Button } from "@/components/ui/button";
```

## Not allowed

```tsx
// Design-system component importing a product component.
import { PortfolioSummary } from "@/features/portfolio";
```

The design system must not know anything about portfolio, banking, trading or other product domains.

---

# 5. Design-Token Rules

## Source of truth

All recurring visual values must originate from token files.

Do not scatter raw values through screens or components.

Token files are the source of truth for:

* Colour
* Typography
* Spacing
* Radius
* Border treatment
* Elevation
* Focus treatment
* Responsive type sizes

## Token hierarchy

Use three levels when appropriate:

```text
Primitive token
    ↓
Semantic token
    ↓
Component usage
```

Example:

```text
--color-blue-600
    ↓
--color-action-primary
    ↓
Button background
```

Components should normally consume semantic tokens rather than primitive palette values.

## Primitive token examples

```css
@theme {
  --color-blue-500: #315aa8;
  --color-blue-600: #294c8e;

  --color-neutral-0: #ffffff;
  --color-neutral-50: #f7f8fa;
  --color-neutral-200: #e2e5e9;
  --color-neutral-600: #667085;
  --color-neutral-900: #17191d;

  --color-green-500: #16875b;
  --color-amber-500: #b54708;
  --color-red-500: #d92d20;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-full: 999px;
}
```

## Semantic token examples

```css
:root {
  --surface-page: var(--color-neutral-50);
  --surface-card: var(--color-neutral-0);
  --surface-subtle: var(--color-neutral-50);

  --content-primary: var(--color-neutral-900);
  --content-secondary: var(--color-neutral-600);
  --content-inverse: var(--color-neutral-0);

  --border-default: var(--color-neutral-200);

  --action-primary: var(--color-blue-500);
  --action-primary-hover: var(--color-blue-600);

  --status-positive: var(--color-green-500);
  --status-warning: var(--color-amber-500);
  --status-negative: var(--color-red-500);

  --focus-ring: var(--color-blue-500);
}
```

Expose semantic tokens to Tailwind where utility classes are useful:

```css
@theme inline {
  --color-surface-page: var(--surface-page);
  --color-surface-card: var(--surface-card);
  --color-surface-subtle: var(--surface-subtle);

  --color-content-primary: var(--content-primary);
  --color-content-secondary: var(--content-secondary);
  --color-content-inverse: var(--content-inverse);

  --color-border-default: var(--border-default);

  --color-action-primary: var(--action-primary);
  --color-action-primary-hover: var(--action-primary-hover);

  --color-status-positive: var(--status-positive);
  --color-status-warning: var(--status-warning);
  --color-status-negative: var(--status-negative);
}
```

---

# 6. Prohibited One-Off Styles

Do not introduce arbitrary values for recurring design decisions.

## Do not do this

```tsx
<div className="rounded-[17px] bg-[#ffffff] px-[22px] py-[18px]">
```

## Do this

```tsx
<div className="rounded-lg bg-surface-card px-6 py-4">
```

Avoid:

* Raw hexadecimal colours in TSX.
* Arbitrary Tailwind colours.
* Repeated arbitrary spacing.
* Repeated arbitrary font sizes.
* Repeated arbitrary radii.
* Inline style objects for standard visual properties.
* Duplicated shadows.
* Feature-specific restyling of foundational components.

An arbitrary value is acceptable only when all conditions are met:

1. It represents a genuinely unique layout constraint.
2. It is not repeated.
3. It does not represent colour, typography, spacing or radius.
4. A brief code comment explains why it cannot use an existing token.

Before adding a new token, search the existing token set for an appropriate value.

Do not create near-duplicate tokens such as:

```text
15px
16px
17px
```

Consolidate to the established scale whenever possible.

---

# 7. Typography System

Use Inter or the selected project sans-serif font.

Use only these weights unless explicitly required:

```text
Regular: 400
Medium: 500
Semibold: 600
```

Use tabular numeric figures for financial values:

```css
font-variant-numeric: tabular-nums;
```

## Primitive font-size scale

```text
font-size-100: 12px
font-size-200: 14px
font-size-300: 16px
font-size-400: 18px
font-size-500: 20px
font-size-550: 22px
font-size-600: 24px
font-size-650: 28px
font-size-700: 32px
font-size-800: 40px
```

Do not introduce unrelated font sizes unless explicitly approved.

## Semantic typography styles

| Token        | Mobile | Desktop | Weight | Intended use                  |
| ------------ | -----: | ------: | -----: | ----------------------------- |
| `caption`    |  12/16 |   12/16 |    400 | Dates and supporting metadata |
| `label-sm`   |  12/16 |   12/16 |    500 | Badges and compact labels     |
| `label-md`   |  14/20 |   14/20 |    500 | Buttons, tabs and navigation  |
| `body-sm`    |  14/20 |   14/20 |    400 | Secondary content             |
| `body-md`    |  16/24 |   16/24 |    400 | Default body and form content |
| `body-lg`    |  16/24 |   18/28 |    400 | Prominent supporting text     |
| `heading-sm` |  18/24 |   18/24 |    600 | Card heading                  |
| `heading-md` |  20/28 |   20/28 |    600 | Section heading               |
| `heading-lg` |  22/28 |   24/32 |    600 | Page heading                  |
| `display-sm` |  28/36 |   32/40 |    600 | Prominent metric              |
| `display-lg` |  32/40 |   40/48 |    600 | Hero metric                   |
| `value-sm`   |  14/20 |   14/20 |    600 | Transaction amount            |
| `value-md`   |  18/24 |   20/28 |    600 | Card metric                   |
| `value-lg`   |  28/36 |   32/40 |    600 | Main account value            |

Use a mobile-first breakpoint at `48rem` for responsive typography.

Body, label, input and button text should generally remain the same size between mobile and desktop.

Only larger headings, display text and major financial values should scale responsively.

## Preferred usage

Prefer a `Text` component or a controlled semantic class:

```tsx
<Text as="h1" variant="heading-lg">
  Portfolio
</Text>
```

Instead of repeating responsive typography classes:

```tsx
<h1 className="text-[22px] leading-7 md:text-2xl md:leading-8">
  Portfolio
</h1>
```

The responsive behaviour should be owned by the typography system, not individually decided by screens.

---

# 8. Tailwind Rules

Tailwind is the styling engine, not the design system.

Tailwind classes must represent values from the project's design tokens.

## Product components may use Tailwind for

* Flexbox
* Grid
* Width and height
* Responsive arrangement
* Alignment
* Overflow
* Visibility
* Positioning
* Token-backed spacing
* Token-backed semantic colours

## Product components must not use Tailwind to

* Redefine Button visual variants.
* Redefine Card radius or elevation.
* Override Input focus treatment.
* Introduce new status colours.
* Recreate Badge styles.
* Bypass responsive typography rules.
* Apply raw palette colours when semantic tokens exist.

## Allowed

```tsx
<div className="grid gap-4 md:grid-cols-2">
```

## Discouraged

```tsx
<Button className="rounded-full bg-blue-600 px-8 text-white">
```

The component variant should own those visual decisions:

```tsx
<Button variant="primary" size="lg">
```

---

# 9. shadcn Rules

shadcn is an editable accessible foundation. It is not the product's design system.

## Retain from shadcn when useful

* Keyboard behaviour
* ARIA patterns
* Focus management
* Composition patterns
* Radix-backed interaction behaviour
* Basic primitive structure

## Replace or adapt

* Default colours
* Default typography
* Default spacing
* Default radii
* Default shadows
* Default component variants
* Default visual identity
* Public component APIs
* Product-specific loading and error behaviour

Generated shadcn components belong in:

```text
packages/design-system/src/primitives
```

They must not be imported directly by application features.

Wrap or adapt primitives inside approved system components.

Example:

```tsx
import {
  Button as ButtonPrimitive,
  type ButtonProps as PrimitiveButtonProps,
} from "../../primitives/button";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "danger";

interface ButtonProps
  extends Omit<PrimitiveButtonProps, "variant"> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-variant={variant}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </ButtonPrimitive>
  );
}
```

Do not leave shadcn components visually unchanged unless their appearance already matches the Figma system exactly.

Do not claim default shadcn styling as original design-system work.

---

# 10. Component Requirements

Create at least six reusable system components.

Minimum recommended set:

1. `Button`
2. `Card`
3. `Badge`
4. `TextField`
5. `Skeleton`
6. `Alert`
7. `EmptyState`, when applicable

Every system component must have:

* A typed public API.
* Appropriate semantic HTML.
* A visible focus state when interactive.
* Disabled behaviour where relevant.
* A controlled set of variants.
* Token-based styling.
* A clear default state.
* Predictable composition.
* No product-domain assumptions.

## Variant rules

Variants must represent meaningful design-system decisions.

Good:

```tsx
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="quiet" />
<Button variant="danger" />
```

Bad:

```tsx
<Button variant="blue" />
<Button variant="white" />
<Button variant="gray" />
```

Prefer semantic names over visual names.

## Component sizing

Use a small controlled size set:

```text
sm
md
lg
```

Do not add sizes for individual screen exceptions.

## Class overrides

Avoid exposing unrestricted `className` styling that allows feature code to replace the component's visual identity.

A `className` may be accepted for layout participation, but product code must not use it to override:

* Internal colour
* Typography
* Radius
* Border
* Focus state
* Component padding
* Variant styling

---

# 11. Product-Component Rules

Product components compose the design system into meaningful fintech UI.

Examples:

```tsx
export interface TransactionRowProps {
  merchant: string;
  description?: string;
  amount: number;
  currency: string;
  occurredAt: string;
  status: "completed" | "pending" | "failed";
}
```

Product components should:

* Receive typed data through props.
* Avoid reading global mock data directly.
* Format monetary values consistently.
* Support long content.
* Support positive and negative amounts.
* Use appropriate system components.
* Preserve semantic HTML.
* Remain independently testable.

Product components may not:

* Introduce raw colours.
* Copy foundational component styles.
* Import shadcn primitives.
* Contain page-level data-fetching logic.
* Assume only ideal data.

---

# 12. Mock-Data Rules

All data must be local and mocked.

Define domain types before creating mock data:

```ts
export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed";

export interface Transaction {
  id: string;
  merchant: string;
  description?: string;
  amount: number;
  currency: string;
  occurredAt: string;
  status: TransactionStatus;
}
```

Store mock data outside JSX:

```text
features/portfolio/data/mock-data.ts
```

Do not manually repeat rows in a screen.

## Mock-data coverage

Include realistic edge cases:

* Positive values
* Negative values
* Small values
* Large values
* Long merchant or asset names
* Pending statuses
* Failed statuses
* Optional missing metadata
* Empty arrays

Never include real account information, credentials or personal financial data.

---

# 13. Required Application States

The application must support:

* Default
* Loading
* Empty
* Error

Add success where the user completes an action.

States do not count as separate screens.

## State implementation

States must be easy for an evaluator to access.

Prefer a query parameter:

```text
/?state=default
/?state=loading
/?state=empty
/?state=error
```

Alternatively, provide a clearly separated development-only state preview control.

Do not hide assessment states in unreachable code.

## Loading state

Use skeletons that preserve the expected content layout.

Do not use only a generic full-page spinner.

Loading UI should:

* Reflect the structure being loaded.
* Avoid layout shifts.
* Use the shared `Skeleton` component.
* Preserve the page heading and major landmarks where reasonable.

## Empty state

The empty state must include:

* A clear explanation.
* A useful next action when applicable.
* Context appropriate to the product.
* The shared `EmptyState` component.

Avoid generic copy such as:

```text
No data.
```

## Error state

The error state must include:

* A specific but safe explanation.
* A recovery action.
* A visible retry button.
* Appropriate live-region behaviour where relevant.
* The shared `Alert` or error-state component.

Retry should transition through loading before returning to the default state when practical.

## Success state

When an action is included, success must:

* Confirm what happened.
* Avoid relying solely on colour.
* Return focus appropriately after modal interactions.
* Provide the next logical action.

---

# 14. Accessibility Requirements

Accessibility is part of component implementation, not a final styling pass.

At minimum:

* Use semantic HTML.
* Use a single clear `main` landmark.
* Maintain a logical heading hierarchy.
* Use real `button` elements for actions.
* Use real labels for inputs.
* Provide accessible names for icon-only controls.
* Provide visible keyboard focus states.
* Ensure disabled states are communicated programmatically.
* Do not communicate status by colour alone.
* Associate errors with their corresponding inputs.
* Use `aria-live` for asynchronous status messages when appropriate.
* Preserve sufficient text and UI contrast.
* Keep touch targets reasonably sized.
* Respect reduced-motion preferences.
* Do not remove outlines without providing an accessible replacement.

Decorative icons should be hidden from assistive technology.

Meaningful icons require accessible text or labels.

Do not add ARIA where native HTML already provides the required semantics.

---

# 15. Responsive Requirements

Build mobile-first.

The experience must work at minimum at:

```text
Mobile: 375px
Tablet: 768px
Desktop: 1280px
```

Test intermediate widths rather than only fixed design frames.

Responsive behaviour must cover:

* Navigation adaptation
* Card stacking
* Table or list adaptation
* Long titles
* Large monetary values
* Empty states
* Error messages
* Modal or sheet behaviour
* Touch target size
* Content overflow

Do not treat the mobile layout as a scaled-down desktop screenshot.

Use layout changes when necessary:

```tsx
<div className="grid gap-4 md:grid-cols-2">
```

Avoid hiding essential information merely to make mobile layout easier.

---

# 16. Financial-UI Rules

Financial values require deliberate formatting.

Use:

```css
font-variant-numeric: tabular-nums;
```

Use `Intl.NumberFormat` rather than manual string concatenation.

Example:

```ts
export function formatCurrency(
  amount: number,
  currency: string,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
```

Clearly distinguish:

* Positive values
* Negative values
* Pending values
* Failed values

Do not rely only on green and red. Include:

* A sign
* A label
* An icon when helpful
* Text indicating the status

Test layout with values such as:

```text
$8.20
$18,429.42
-$1,284,991.80
```

Do not assume every value fits a short label.

---

# 17. Figma-to-Code Alignment

Code should follow the Figma system rather than approximating it independently.

Maintain obvious naming relationships.

Example:

| Figma                      | Code                                     |
| -------------------------- | ---------------------------------------- |
| `surface/card`             | `--surface-card`                         |
| `text/primary`             | `--content-primary`                      |
| `action/primary`           | `--action-primary`                       |
| `status/error`             | `--status-negative`                      |
| `space/4`                  | `--spacing-4`                            |
| `radius/lg`                | `--radius-lg`                            |
| `Typography/Heading/Large` | `heading-lg`                             |
| `Button/Primary/Medium`    | `<Button variant="primary" size="md" />` |

When a code value does not match Figma:

1. Determine whether Figma or code contains the intended decision.
2. Update the source of truth.
3. Update the corresponding implementation.
4. Do not silently introduce a third variation.

Screens must be recognisably composed from equivalents of the components shown in Figma.

---

# 18. AI Agent Working Method

Before writing code:

1. Inspect the relevant files.
2. Identify the architectural layer being modified.
3. Search for an existing token or component.
4. Confirm the intended component API.
5. Make the smallest coherent change.
6. Verify that no dependency boundary is crossed.

Do not immediately generate a new component when an existing one can be extended safely.

Do not rewrite unrelated files.

Do not perform broad refactors without explicit instruction.

Do not delete working behaviour solely to simplify implementation.

When uncertain:

1. Prefer existing project conventions.
2. Prefer semantic tokens.
3. Prefer composition.
4. Prefer accessible native behaviour.
5. Prefer the smaller scope.
6. Explain any meaningful assumption.

---

# 19. Required Agent Checks

Before completing any UI task, verify:

## Design system

* Are repeated visual values represented by tokens?
* Are semantic tokens used where available?
* Does the screen consume public design-system components?
* Did feature code avoid direct shadcn imports?
* Did feature code avoid arbitrary colours and typography?
* Is any new component genuinely reusable?

## Responsiveness

* Does it work at 375px?
* Does it work at 768px?
* Does it work at 1280px?
* Do large numbers wrap or truncate intentionally?
* Does long text remain usable?

## States

* Does the default state work?
* Does the loading state preserve layout?
* Does the empty state explain what to do?
* Does the error state provide recovery?
* Can the evaluator reach each state?

## Accessibility

* Can all controls be reached by keyboard?
* Are focus states visible?
* Are inputs labelled?
* Are headings ordered logically?
* Are icon-only buttons named?
* Is status communicated beyond colour?
* Are errors associated with relevant controls?

## Code quality

* Does TypeScript pass without avoidable errors?
* Are props typed?
* Is mock data outside JSX?
* Are lists keyed with stable IDs?
* Are components reasonably small?
* Are there unnecessary dependencies?
* Are there console errors?

---

# 20. Verification Commands

Before declaring a task complete, run the available equivalents of:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

If a command does not exist, inspect `package.json` and use the closest available script.

At minimum, the production build must succeed.

Do not claim that a check passed unless it was actually run successfully.

If a check cannot be run, report:

* Which check was skipped.
* Why it could not run.
* What was manually verified instead.

Also inspect the browser for:

* Runtime errors
* Console warnings
* Broken assets
* Layout overflow
* Incorrect focus behaviour

---

# 21. Commit Rules

Do not create commits unless explicitly instructed.

When asked to commit, use small, meaningful commits that reflect actual progression.

Preferred examples:

```text
chore: initialise app and workspace
feat: define design tokens and typography
feat: add core design-system components
feat: compose portfolio dashboard
feat: add loading empty and error states
fix: improve focus and responsive behaviour
docs: document design system and AI workflow
```

Avoid:

```text
final
done
changes
update
assessment complete
```

Do not rewrite commit history unless explicitly instructed.

Do not combine unrelated work into one commit.

---

# 22. Documentation Requirements

Keep `README.md` evaluator-friendly.

It should cover:

1. Live application link
2. Figma link
3. Loom link
4. Product problem and selected scope
5. Why this screen or journey was selected
6. Design-system architecture
7. Figma-to-code token mapping
8. Component structure
9. Instructions for accessing states
10. AI tools and workflow
11. Where AI helped
12. Where AI failed
13. How AI output was corrected
14. Accessibility coverage
15. Deliberate trade-offs
16. Prioritised "with more time" improvements
17. Local development instructions

Do not place lengthy installation instructions before the product explanation and assessment links.

Be transparent about shadcn:

```text
Tailwind CSS is used as the styling engine. shadcn and Radix
provide editable accessible foundations for selected primitives.
The visual tokens, component variants, responsive behaviour and
public APIs are defined locally for this product.
```

---

# 23. Do and Don't Examples

## Component import

### Do

```tsx
import {
  Badge,
  Button,
  Card,
} from "@assessment/design-system";
```

### Don't

```tsx
import { Button } from "@/components/ui/button";
```

---

## Colour

### Do

```tsx
<p className="text-content-secondary">
  Updated moments ago
</p>
```

### Don't

```tsx
<p className="text-[#667085]">
  Updated moments ago
</p>
```

---

## Button

### Do

```tsx
<Button variant="primary" loading={isSubmitting}>
  Continue
</Button>
```

### Don't

```tsx
<button className="rounded-[10px] bg-blue-600 px-5 py-3">
  Continue
</button>
```

---

## Status

### Do

```tsx
<Badge tone="positive">
  Completed
</Badge>
```

### Don't

```tsx
<span className="rounded bg-green-100 text-green-700">
  Completed
</span>
```

---

## Typography

### Do

```tsx
<Text as="h1" variant="heading-lg">
  Portfolio
</Text>
```

### Don't

```tsx
<h1 className="text-[22px] font-semibold md:text-[24px]">
  Portfolio
</h1>
```

---

## Product composition

### Do

```tsx
<Card>
  <PortfolioSummary
    balance={portfolio.balance}
    change={portfolio.change}
  />
</Card>
```

### Don't

```tsx
<div className="rounded-xl bg-white p-6 shadow-sm">
  <p className="text-sm text-gray-500">Balance</p>
  <p className="text-3xl font-bold">
    {portfolio.balance}
  </p>
</div>
```

---

# 24. Scope Control

Respect the intended assessment build constraint.

Prioritise in this order:

1. Working default screen
2. Correct tokens
3. Reusable components
4. Responsive behaviour
5. Loading state
6. Empty state
7. Error state
8. Accessibility
9. Documentation
10. Optional theming
11. Additional screens

Do not prioritise:

* Decorative animations
* Complex charts
* A large navigation system
* Authentication
* Backend architecture
* Many incomplete screens
* An oversized component library
* Unnecessary abstraction
* Complex deployment infrastructure

A polished single screen is acceptable.

---

# 25. Theming

A second theme is optional.

Only implement a second theme after the default experience, states, accessibility and documentation are complete.

Themes must be implemented through token overrides:

```css
:root {
  --surface-page: var(--color-neutral-50);
  --surface-card: var(--color-neutral-0);
  --content-primary: var(--color-neutral-900);
}

[data-theme="dark"] {
  --surface-page: var(--color-neutral-900);
  --surface-card: var(--color-neutral-800);
  --content-primary: var(--color-neutral-0);
}
```

Do not add dark-mode conditionals throughout components.

The same components must work without internal edits.

---

# 26. Definition of Done

A task is complete only when:

* The requested behaviour works.
* The production build passes.
* TypeScript errors have been addressed.
* No avoidable console errors remain.
* Tokens are used consistently.
* Public design-system boundaries are respected.
* Desktop and mobile layouts are usable.
* Relevant states are reachable.
* Keyboard focus is visible.
* Components have typed APIs.
* Mock data is separated from presentation.
* No raw colour values are scattered through TSX.
* No direct shadcn imports exist in product features.
* Documentation is updated when architecture or usage changes.

The final result should make it easy for an evaluator to trace:

```text
Figma foundations
    ↓
Code tokens
    ↓
Design-system components
    ↓
Product components
    ↓
Responsive screen
    ↓
Loading, empty and error states
```

That traceability is a primary quality requirement.
