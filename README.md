# Deriv Design Challenge

Vite 8 + React 19 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui v4

A design system foundation built on [shadcn/ui](https://ui.shadcn.com) with the goal of publishing a branded npm package (`@deriv/ui`).

## Stack

| Layer | Package |
|-------|---------|
| Build | Vite 8 |
| Framework | React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| Components | shadcn/ui v4 + `@base-ui/react` |
| Icons | Lucide React |
| Lint | Oxlint |
| Package manager | npm |

## Getting started

```bash
# Clone
git clone <this-repo-url>
cd deriv-design-challenge

# Install
npm install

# Dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Adding shadcn components

```bash
npx shadcn add <component> --yes
```

This project uses a `@ → src` symlink so the CLI writes to the correct directory. The symlink is gitignored — if you clone fresh, recreate it:

```bash
ln -sfn src @
```

Currently installed components under `src/components/ui/`: `button`, `badge`, `card`, `input`, `separator`.

## Project structure

```
.
├── @ → src/                  # symlink for shadcn CLI (gitignored)
├── components.json           # shadcn config (base-nova, neutral, OKLCH)
├── vite.config.ts            # Tailwind v4 Vite plugin + @ path alias
├── tsconfig.json             # TypeScript project references
├── tsconfig.app.json         # App TS config with @/* path alias
├── src/
│   ├── index.css             # Tailwind v4 entry + shadcn theme + light/dark
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Root component
│   ├── lib/
│   │   └── utils.ts          # cn() utility (clsx + tailwind-merge)
│   └── components/
│       └── ui/               # shadcn components
├── public/                   # Static assets
└── package.json
```

## Theming

Themes live in `src/index.css` as CSS custom properties using the OKLCH color space. Light and dark variants are defined under `:root` and `.dark` respectively.

```css
:root {
  --primary: oklch(0.55 0.18 260);         /* your brand blue */
  --primary-foreground: oklch(0.97 0.01 260);
  --radius: 0.375rem;
}
```

To customize, override these variables in `src/index.css`. The full token set covers colors (primary, secondary, muted, accent, destructive), border radius scale, sidebar, and chart colors.

See [shadcn theming docs](https://ui.shadcn.com/docs/theming) for details.

## Design system roadmap

This repo is the foundation. The plan is to extract it into a proper npm package:

1. **Audit tokens** — map every CSS custom property to a design decision
2. **Build brand theme** — replace neutral defaults with Deriv brand tokens
3. **Compose components** — build 5-8 opinionated components on top of shadcn
4. **Package for npm** — extract into `packages/ui/` with `tsup`, publish as `@deriv/ui`
5. **Storybook catalog** — interactive docs with variant/state/theme exploration
6. **CI/CD** — lint → test → build → changesets → publish

## License

Private — Deriv internal use.
