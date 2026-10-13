<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Personal portfolio site for may-baptiste.fr (content is in French, `lang="fr"`).
Next.js App Router + React 19 + TypeScript 7 + Tailwind v4 + Biome. These
versions are ahead of most training data — follow the bundled Next docs, not
memory.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` — standard Next scripts.
- `pnpm lint` — `biome check` (read-only; exits non-zero only on errors).
- `pnpm lint:fix` — `biome check --write`; applies lint fixes, formatting, and
  import sorting. Prefer this over `pnpm format`, which only formats.
- No test suite and no `typecheck` script exist. `pnpm build` runs TypeScript
  during the build, so verification is: `pnpm lint:fix` then `pnpm build`.
- Package manager is **pnpm** (`pnpm@12.11.2`, `pnpm-lock.yaml`), managed via
  Corepack. `pnpm-workspace.yaml` sets `minimumReleaseAge: 0` so freshly
  published versions install without pnpm's default 24h maturity delay. Do not
  use npm/yarn.

## Layout

- `src/app/` — App Router routes: `layout.tsx` (root providers + metadata),
  `page.tsx` (home), `legal/`, `sitemap.ts`.
- `src/app/sendMail/route.tsx` — the only API route (`POST /sendMail`). The
  `.tsx` extension is intentional; keep it.
- `src/components/` — shared UI, including context providers (`Alert`,
  `InteractiveImage`, `ScrollProvider`).
- `src/sections/` — page sections. `Projects.tsx` and `AboutMe.tsx` export the
  `Project` / `EventType` types that `src/config.ts` consumes.
- `src/config.ts` — **all site content** (events, projects) as typed data.
  Edit content here, not inside components.
- `src/elements/` — SVG assets imported as React components; `public/` — static
  images.
- Import alias: `@/*` → `./src/*`.

## Conventions & gotchas

- **Biome, not ESLint/Prettier.** Config is `biome.jsonc`, scoped to `src/**`
  plus a few root config files. Existing `eslint-disable` comments (e.g.
  `src/sections/Contact.tsx`) are inert leftovers from the migration.
- **SVG imports**: a default import becomes a React component (SVGR); append
  `?url` for the asset URL (`svgr.d.ts`). Wired up for **both** webpack and
  Turbopack in `next.config.mjs` — keep the two configs in sync (Next 16 builds
  with Turbopack by default).
- **Tailwind v4**: no `tailwind.config`; theme tokens and custom utilities are
  declared in `src/app/globals.css` via `@theme` / `@utility`. Add colors there
  (e.g. `--color-primary-1` → `bg-primary-1`).
- `reactStrictMode: false` in `next.config.mjs` is intentional — don't "fix" it.
- Env vars (`.env`, gitignored): `GOOGLE_ANALYTICS_GA` is **required** —
  `src/app/layout.tsx` throws at render if missing. `EMAIL_USER` /
  `EMAIL_PASSWORD` drive `sendMail` (IONOS SMTP, `smtp.ionos.fr:465`).
  `.env.example` (committed) documents the three variables; keep it in sync when
  adding or removing one.
