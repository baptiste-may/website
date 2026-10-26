# May Baptiste — Portfolio

Personal portfolio of May Baptiste, available at [may-baptiste.fr](https://may-baptiste.fr). The
site is built with [Astro](https://astro.build) 7, [Tailwind CSS](https://tailwindcss.com) 4,
[daisyUI](https://daisyui.com) 5 and [Sanity](https://www.sanity.io).

Pages are prerendered at build time and served as static assets by
[Cloudflare Workers](https://workers.cloudflare.com); only the contact endpoint runs on demand. The
public pages ship no client-side JavaScript: navigation, the contact form and interactions rely on
native HTML and CSS. Sanity Studio is embedded at `/studio` and is the only JavaScript-bearing
route; it is prerendered as a static shell and loaded in the browser.

## Stack

| Layer              | Choice                                                    |
| ------------------ | --------------------------------------------------------- |
| Framework          | Astro 7 (static pages, one API route and embedded Studio) |
| Styling            | Tailwind CSS 4 with daisyUI 5                             |
| Content            | Sanity 6, GROQ and TypeGen                                |
| Studio             | Sanity Studio at `/studio`, embedded with React 19        |
| Transactional mail | Resend                                                    |
| Hosting            | Cloudflare Workers                                        |
| Tooling            | Bun 1.4.2, TypeScript, ESLint and Prettier                |

## Requirements

- [Bun](https://bun.sh) 1.4.2, pinned in `package.json` and used by CI.
- A Sanity project with `dev` and `production` datasets.
- The local and deployed site origins registered in Sanity CORS with credentials.
- A [Resend](https://resend.com) account and a verified sending domain (contact form only).

## Getting started

```bash
bun install
cp .env.example .env
bun run dev
```

The development server runs at <http://localhost:4321> and serves both the public site and the
embedded Studio at <http://localhost:4321/studio>. There is no separate Studio process. Fill in
`.env` before starting the app; see [Environment variables](#environment-variables). On a fresh
checkout, run `bun run typegen` before `bun run lint` or `bun run typecheck`, because both rely on
generated Sanity types.

To preview the production build locally, set both dataset variables to `dev`:

```bash
SANITY_DATASET=dev SANITY_STUDIO_DATASET=dev bun run build
bun run preview
```

## Environment variables

| Variable                   | Used by           | Purpose                                                                  |
| -------------------------- | ----------------- | ------------------------------------------------------------------------ |
| `SANITY_STUDIO_PROJECT_ID` | Sanity CLI        | Project ID for CLI commands; keep aligned with `SANITY_PROJECT_ID`       |
| `SANITY_STUDIO_DATASET`    | Astro build / CLI | Dataset edited by `/studio`; required for builds and must match the site |
| `SANITY_PROJECT_ID`        | Astro build       | Project ID used by GROQ queries and the embedded Studio                  |
| `SANITY_DATASET`           | Astro build       | Dataset queried at build time and edited by `/studio`                    |
| `SANITY_API_VERSION`       | Astro build       | Sanity API version (`2026-09-23` by default)                             |
| `RESEND_API_KEY`           | Worker            | API key used by `/api/contact`                                           |

`.env.example` lists every variable. `SANITY_STUDIO_DATASET` is required for `bun run build` and
must match `SANITY_DATASET`; the build fails when it is missing or different. Both are `dev` locally
and `production` in production. The `SANITY_STUDIO_*` names remain for Sanity CLI commands such as
`bun run typegen`, while the Astro build injects the resolved site values into the embedded Studio.
Keep the two pairs aligned.

Never commit `.env` or other secret files. In production, Sanity variables are configured in
Cloudflare Workers Builds and `RESEND_API_KEY` is stored as a Worker secret. Never put a Sanity
token in a `SANITY_STUDIO_*` variable: those values are compiled into the browser bundle.

## How it works

- All public pages are prerendered at build time, with content fetched from Sanity.
- `/api/contact` is the only on-demand route (`prerender = false`). It accepts form posts, validates
  and normalizes input, rejects oversized or cross-origin requests, uses a honeypot field against
  bots, and sends the message through Resend.
- `/studio` is an embedded React single-page application. It is prerendered as a static shell,
  served as an asset, and uses hash-based routes (`/studio#/...`), so it needs no Worker route.
- Public pages do not load client-side JavaScript. The Studio bundle loads only on `/studio`.
- The Studio is part of the Astro build: schema or Studio configuration changes become visible only
  after a new site deployment. Content changes still require a rebuild before the public site shows
  them.
- `/studio` is excluded from the sitemap and disallowed in `robots.txt`.

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
├── astro.config.mjs         # Astro, Sanity, Studio and sitemap configuration
├── sanity.config.ts         # Shared Sanity Studio configuration (Astro and CLI)
├── sanity.cli.ts            # Schema extraction and TypeGen settings
└── wrangler.jsonc           # Cloudflare Workers configuration
```

## Content and Sanity

Sanity schema definitions live in `schemaTypes/`. The Studio is configured in `sanity.config.ts`,
embedded at `/studio` by `@sanity/astro`, and started with the site:

```bash
bun run dev
```

Open <http://localhost:4321/studio> and sign in with a Sanity project member account. The Studio
edits the dataset selected by `SANITY_STUDIO_DATASET`; locally this is `dev`. The Sanity CLI keeps
using `sanity.cli.ts` for schema extraction and TypeGen; it does not need a Studio dev server.

GROQ queries live in `src/queries/` and use `defineQuery` so their results are typed. Content is
fetched at build time: publishing a change in Sanity does not update the live site until a new build
is deployed. The same applies to schema and Studio configuration changes.

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
| `bun run dev`          | Start Astro and the embedded Studio                  |
| `bun run build`        | Build the static pages, embedded Studio and Worker   |
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
  typecheck, build, then verifies that `dist/client/studio/index.html` exists. The embedded Studio
  is the only route that loads JavaScript; public pages remain script-free.

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
and the prerendered `/studio` shell are served as assets, while `/api/*` is routed to the Worker
first (see `wrangler.jsonc`). `/studio` does not change `run_worker_first` and needs no Worker
route.

`SANITY_STUDIO_DATASET` is a **build-time** variable. Values in `wrangler.jsonc` are runtime
variables and do not feed `astro build`; set it in the build environment (Cloudflare Workers Builds,
CI, or the shell). It must equal `SANITY_DATASET`, otherwise the build fails.

1. Configure the Sanity build variables in Cloudflare Workers Builds: `SANITY_PROJECT_ID`,
   `SANITY_DATASET`, `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` and `SANITY_API_VERSION`.
   Use `production` for both dataset variables in production and `dev` for preview deployments.
2. Add the local, production and preview origins to Sanity CORS with **Allow credentials** enabled:
   `http://localhost:4321`, `https://may-baptiste.fr`, and each preview URL such as
   `https://<preview>.workers.dev`. Add a wildcard only if the Sanity project supports it.
3. Add the Resend API key as a Worker secret:
   ```bash
   bunx wrangler secret put RESEND_API_KEY
   ```
4. Deploy. With Workers Builds, push the branch and let Cloudflare run the build with the variables
   above. To deploy from your machine, override the `dev` values from `.env` for the build:
   ```bash
   SANITY_DATASET=production SANITY_STUDIO_DATASET=production bun run deploy
   ```
   Variables configured in Cloudflare Workers Builds do not affect a local build.
5. Attach `may-baptiste.fr` to the `may-baptiste-website` Worker in the Cloudflare dashboard
   (Workers & Pages > `may-baptiste-website` > Settings > Domains & Routes).

The site reads Sanity content at build time without a token. The production dataset must therefore
be publicly readable. A private dataset would require passing a read token to the Sanity client
configuration in `astro.config.mjs`; the current setup does not do that. `/studio` does not change
this. The Studio is part of the Astro build: schema or Studio configuration changes require a
redeploy. Its internal URLs use the hash router, for example `/studio#/desk/projects`;
`/studio/projects` is not a supported deep link.

### `/studio` troubleshooting

- **Login or API requests fail with a CORS error**: add the exact origin (`http://localhost:4321`,
  `https://may-baptiste.fr`, or the preview URL) to Sanity CORS and enable **Allow credentials**.
- **The build says `SANITY_STUDIO_DATASET` is required**: set it in the build environment, not only
  in `wrangler.jsonc`.
- **The build reports that the datasets differ**: align `SANITY_DATASET` and
  `SANITY_STUDIO_DATASET`; local development warns instead of failing.
- **A Studio deep link returns 404**: use `/studio#/...`. Paths such as `/studio/projects` are not
  served by the hash router.
- **Studio changes are missing**: redeploy the site; the Studio bundle is built from the repository.
- **The Studio reports `process is not defined`**: a `process.env.*` read in `sanity.config.ts` is
  missing from the `vite.define` map in `astro.config.mjs`.

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
