# May Baptiste — Portfolio

Personal portfolio of May Baptiste, available at [may-baptiste.fr](https://may-baptiste.fr). The
site is built with [Astro](https://astro.build) 7, [Tailwind CSS](https://tailwindcss.com) 4,
[daisyUI](https://daisyui.com) 5 and [Sanity](https://www.sanity.io).

Pages are prerendered at build time and served as static assets by
[Cloudflare Workers](https://workers.cloudflare.com); only the contact endpoint runs on demand. The
public site ships no client-side JavaScript: navigation, the contact form and interactions rely on
native HTML and CSS.

## Stack

| Layer              | Choice                                           |
| ------------------ | ------------------------------------------------ |
| Framework          | Astro 7 (static pages + one on-demand API route) |
| Styling            | Tailwind CSS 4 with daisyUI 5                    |
| Content            | Sanity 6, GROQ and TypeGen                       |
| Transactional mail | Resend                                           |
| Hosting            | Cloudflare Workers                               |
| Tooling            | Bun 1.4.2, TypeScript, ESLint and Prettier       |

## Requirements

- [Bun](https://bun.sh) 1.4.2, pinned in `package.json` and used by CI.
- A Sanity project with a dataset.
- A [Resend](https://resend.com) account and a verified sending domain (contact form only).

## Getting started

```bash
bun install
cp .env.example .env
bun run dev
```

The development server runs at <http://localhost:4321>. Fill in `.env` before starting the app; see
[Environment variables](#environment-variables). On a fresh checkout, run `bun run typegen` before
`bun run lint` or `bun run typecheck`, because both rely on generated Sanity types.

To preview the production build locally:

```bash
bun run build
bun run preview
```

## Environment variables

| Variable                   | Used by       | Purpose                                      |
| -------------------------- | ------------- | -------------------------------------------- |
| `SANITY_STUDIO_PROJECT_ID` | Sanity Studio | Sanity project ID exposed to the Studio      |
| `SANITY_STUDIO_DATASET`    | Sanity Studio | Dataset edited in the Studio                 |
| `SANITY_PROJECT_ID`        | Astro build   | Sanity project ID used by GROQ queries       |
| `SANITY_DATASET`           | Astro build   | Dataset queried at build time                |
| `SANITY_API_VERSION`       | Astro build   | Sanity API version (`2026-09-23` by default) |
| `RESEND_API_KEY`           | Worker        | API key used by `/api/contact`               |

`.env.example` lists every variable. The `SANITY_STUDIO_*` and `SANITY_*` pairs are separate on
purpose: Sanity only exposes variables prefixed with `SANITY_STUDIO_` to the Studio, while frontend
queries run at build time and use the unprefixed names.

Never commit `.env` or other secret files. In production, Sanity variables are configured in
Cloudflare Workers Builds and `RESEND_API_KEY` is stored as a Worker secret.

## How it works

- All pages are prerendered at build time, with content fetched from Sanity.
- `/api/contact` is the only on-demand route (`prerender = false`). It accepts form posts, validates
  and normalizes input, rejects oversized or cross-origin requests, uses a honeypot field against
  bots, and sends the message through Resend.
- The public site ships no JavaScript. CI fails if a `.js` file or a module script appears in
  `dist`.
- Sanity Studio runs separately from the Astro site and is not part of the public bundle.

## Project structure

```text
.
├── public/                  # Static files (favicons, robots.txt, Open Graph image)
├── schemaTypes/             # Sanity schema definitions
├── src/
│   ├── assets/              # Images and global CSS (Tailwind, daisyUI)
│   ├── components/          # Astro components, grouped by feature
│   ├── layouts/             # Shared layout and SEO metadata
│   ├── legal/               # MDX content for the /info legal page
│   ├── lib/contact/         # Contact form validation and Resend delivery
│   ├── pages/               # Routes: home, jobs, projects, contact, info, 404
│   │   └── api/contact.ts   # On-demand contact endpoint
│   ├── queries/             # GROQ queries
│   └── types/               # Shared types, legal content and generated Sanity types
├── astro.config.mjs         # Astro, Sanity and sitemap configuration
├── sanity.config.ts         # Sanity Studio configuration
├── sanity.cli.ts            # Schema extraction and TypeGen settings
└── wrangler.jsonc           # Cloudflare Workers configuration
```

## Content and Sanity

Sanity schema definitions live in `schemaTypes/`. The Studio is configured in `sanity.config.ts` and
uses the `SANITY_STUDIO_*` variables from `.env`.

```bash
bunx sanity dev
```

GROQ queries live in `src/queries/` and use `defineQuery` so their results are typed. Content is
fetched at build time: publishing a change in Sanity does not update the live site until a new build
is deployed.

## Sanity types

```bash
bun run typegen
```

This extracts the schema to `schema.json` and generates `src/types/sanity-typegen.d.ts`. Both files
are gitignored. CI regenerates them before linting and type checking, and `bun run check` includes
the generation step.

## Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `bun run dev`          | Start the Astro development server                   |
| `bun run build`        | Build the static pages and the Worker                |
| `bun run preview`      | Preview the production build locally                 |
| `bun run deploy`       | Build and deploy to Cloudflare Workers               |
| `bun run typegen`      | Extract the Sanity schema and generate types         |
| `bun run lint`         | Run ESLint with zero warnings allowed                |
| `bun run lint:fix`     | Run ESLint and apply fixes                           |
| `bun run format`       | Format files with Prettier                           |
| `bun run format:check` | Check formatting without writing                     |
| `bun run typecheck`    | Run `astro check`                                    |
| `bun run check`        | Run format check, typegen, lint, typecheck and build |

## Code quality

- Prettier formats the codebase; ESLint enforces TypeScript, Astro, accessibility and Tailwind
  rules.
- `simple-git-hooks` runs `lint-staged` on commit, applying ESLint and Prettier to staged files.
- Imports are sorted by `@ianvs/prettier-plugin-sort-imports`, with groups for Node built-ins,
  third-party packages, the `@/` alias and relative imports.
- Tailwind classes in `.astro` files are sorted by `eslint-plugin-better-tailwindcss`, because
  `prettier-plugin-tailwindcss` does not sort them with `prettier-plugin-astro` 1.x.
- MDX files set `proseWrap: never` in `.prettierrc`, because wrapping a paragraph before inline JSX
  makes MDX treat the surrounding text as separate paragraphs.
- CI runs on every push to `master` and on pull requests: install, format check, typegen, lint,
  typecheck, build, then a guard against client-side JavaScript in `dist`.

## Legal content

Legal notice, privacy policy, cookies, accessibility and credits are grouped on `/info`. Their
content lives as MDX files in `src/legal/`, while shared publisher, host and processor details live
in `src/types/legal.ts`.

The publisher has opted not to publish a postal address under article 1-1, II of the French LCEN.
That option requires the hosting provider to hold the publisher's full identity: keep the Cloudflare
account details up to date before going live. Update `src/types/legal.ts` whenever the publisher's
status, host or processors change.

## Deployment

The site is deployed to Cloudflare Workers through the `@astrojs/cloudflare` adapter. Static pages
are served as assets, while `/api/*` is routed to the Worker first (see `wrangler.jsonc`).

1. Configure the Sanity build variables in Cloudflare Workers Builds: `SANITY_PROJECT_ID`,
   `SANITY_DATASET` and `SANITY_API_VERSION`.
2. Add the Resend API key as a Worker secret:
   ```bash
   bunx wrangler secret put RESEND_API_KEY
   ```
3. Deploy:
   ```bash
   bun run deploy
   ```
4. Attach `may-baptiste.fr` to the `may-baptiste-website` Worker in the Cloudflare dashboard
   (Workers & Pages > `may-baptiste-website` > Settings > Domains & Routes).

Application code is host-agnostic: the form posts to `/api/contact`, the route uses standard
`Request`/`Response` objects, and email delivery is isolated in `src/lib/contact/send-email.ts`.
Moving to another platform such as Vercel would only require a different adapter and deployment
configuration.

### Resend setup

1. Create an account on [resend.com](https://resend.com).
2. Verify `may-baptiste.fr` by adding the DNS records Resend provides in Cloudflare: DKIM on
   `resend._domainkey`, plus SPF and return-path MX records on the `send` subdomain (for example
   `send.may-baptiste.fr`).
3. Leave the root MX records unchanged; they still point to the Ionos mailbox.
4. Create an API key and store it as described above.

Messages are sent to `pro@may-baptiste.fr`, with the visitor's address as `Reply-To`.

For local testing, add `RESEND_API_KEY` to `.env`. The build writes it to `dist/server/.dev.vars`
for `wrangler dev`; rebuild before starting the Worker after changing the value.

### Rebuilding after content changes

Sanity content is read at build time. Trigger a new deployment through a Sanity webhook wired to
Cloudflare Workers Builds, or run `bun run deploy` manually.
