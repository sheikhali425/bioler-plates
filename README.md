# Vite Kit — React + TypeScript

A professional **Vite + React + TypeScript** frontend starter. Opinionated enough to start shipping, lean enough to grow into a real product.

## What's included

- Vite 6 + React 19 + strict TypeScript
- React Router (layout routes, 404)
- Path alias `@/`
- Typed / validated Vite env (`VITE_APP_NAME`, `VITE_API_URL`)
- App shell, UI primitives, feature folder layout
- Error boundary
- ESLint flat config + Prettier
- Vitest + Testing Library + coverage
- VS Code recommended extensions + format-on-save

## Quick start

```bash
git clone -b vite-react https://github.com/sheikhali425/bioler-plates.git my-vite-app
cd my-vite-app

cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run typecheck` | TypeScript project build |
| `npm run test` | Vitest once |
| `npm run test:watch` | Vitest watch |
| `npm run test:coverage` | Coverage report |
| `npm run check` | typecheck + lint + test + build |

## Project structure

```
src/
├── app/              # App root + router
├── components/
│   ├── layout/       # Header, Footer, AppShell
│   └── ui/           # Reusable primitives (Button, Container)
├── features/         # Feature modules (example: home)
├── hooks/            # Shared hooks
├── lib/              # env, helpers
├── pages/            # Route-level screens
├── styles/           # Global CSS
├── test/             # Test setup
└── types/            # Shared types (ready for growth)
```

## Environment

Copy `.env.example` → `.env`:

| Variable | Purpose |
|----------|---------|
| `VITE_APP_NAME` | Product / brand name shown in UI |
| `VITE_API_URL` | Backend API base URL for future data fetching |

Only `VITE_*` variables are exposed to the client.

## Path alias

```ts
import { Button } from '@/components/ui/Button'
import { env } from '@/lib/env'
```

Configured in both `vite.config.ts` and `tsconfig.app.json`.

## Quality baseline

Before opening a PR / shipping a change:

```bash
npm run check
```

## Suggested next steps

- Add a data layer (TanStack Query / fetch client against `env.apiUrl`)
- Auth + protected routes
- Component library expansion
- Storybook or Playwright
- CI workflow running `npm run check`

## License

MIT — see `LICENSE`.
