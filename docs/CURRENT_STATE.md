# Current State

Last updated: 2026-08-26, at initial baseline commit. This is a **new**
project — there was no prior codebase for Xpert Fulfillment to inherit, so
"current state" here means "what this baseline actually contains," not "what
changed."

## What currently works

- Express server boots and serves `GET /health` (verified end-to-end with a
  running process, not just unit tests).
- `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id` are implemented
  end-to-end (route → controller → service → Prisma), but untested against a
  real database in this environment (see "Not verified" below).
- Input validation for order creation (`validateCreateOrderInput`) is pure,
  unit-tested, and does not require a database connection.
- TypeScript build (`npm run build`), ESLint (`npm run lint`), and the vitest
  suite (`npm test`, 6/6 tests) all pass cleanly.

## What is incomplete or broken

- **No auth**: every route is open. Do not deploy publicly as-is.
- **No carrier integration**: `Carrier` is just an enum field on `Order`;
  nothing calls DHL, SpeedX, or any other carrier API. `.env.example` has
  placeholder keys for exactly this reason — fill them in only once real
  integration code exists.
- **No inventory/product catalog**: order items are freeform (`sku`,
  `description`, `quantity`, `unitPrice`) with no backing `Product` table.
- **No pagination/filtering** on `GET /api/orders` — it returns every order.
- **Not verified against a live database**: this baseline was built in a
  sandboxed cloud environment whose outbound network access to Prisma's
  binary CDN (`binaries.prisma.sh`) was blocked (403 Forbidden on `prisma
  generate`). As a result:
  - `npx prisma generate` could not be completed here, so the generated
    Prisma client's native query engine is not present in this environment.
  - `GET /api/orders` was smoke-tested against a running server and correctly
    returned an HTTP 500 with a logged error (`@prisma/client did not
    initialize yet`) rather than crashing the process — the error handling
    works, but the actual database round-trip is unverified.
  - **Action needed**: on a machine with normal internet access, run `npm
    install && npx prisma generate && npx prisma migrate dev` against a real
    Postgres instance and confirm the `orders` endpoints work against real
    data. This is expected to work; it simply couldn't be proven inside this
    build sandbox.

## Major backend routes / services / integrations

| Route                    | Method | Description                          |
| ------------------------- | ------ | ------------------------------------- |
| `/health`                 | GET    | Liveness check, no DB dependency      |
| `/api/orders`             | GET    | List all orders with their items      |
| `/api/orders/:id`         | GET    | Get one order by id                   |
| `/api/orders`             | POST   | Create an order (validates input)     |

No external integrations are wired up yet (no carrier APIs, no payment
processor, no email/notification service).

## Database and infrastructure dependencies

- **PostgreSQL** — required, connected via `DATABASE_URL` and Prisma.
- No cache, queue, object storage, or search index is used.
- No infrastructure-as-code (Terraform, etc.) or Dockerfile exists yet.

## Manual deployment or operational steps

None exist yet — there is no deployment pipeline. Whoever deploys this first
will need to: provision Postgres, set environment variables (see README),
run `prisma migrate deploy`, then run `npm run build && npm start` (or
containerize it).

## Technical debt / risks

- Eager vs. lazy Prisma client: `src/db/prisma.ts` uses a lazy singleton
  (`getPrisma()`) specifically so DB-independent code (like the health
  check) stays importable/testable without a live database connection or
  generated client. Be aware of this pattern before adding new DB-touching
  modules — import `getPrisma()` inside functions, not at module scope, if
  you want the same testability.
- No request-level auth/session model has been decided yet — this is the
  most consequential open design decision before any real deployment.
- Dependency note: `prisma`/`@prisma/client` are pinned to exact version
  `6.19.3` (not a caret range) in `package.json`. During setup, `npm install`
  with a caret range (`^6.19.3`) non-deterministically resolved to a
  pre-release `8.0.0-rc.x` / `7.10.0` mix that pulled in an unrelated,
  vulnerable dependency chain (`@prisma/dev` → `alchemy` → `hono`). Pinning
  the exact version resolved it. If you deliberately upgrade Prisma later,
  re-run `npm audit` afterward.
- One remaining `npm audit` advisory (high severity, `deepmerge-ts` via
  `@prisma/config`, used internally by the Prisma CLI's config loader) has no
  non-breaking fix available as of this baseline; it's config-loading code
  (not exposed to attacker-controlled runtime input in this app) and was left
  as-is rather than force-downgrading Prisma. Re-check `npm audit` next time
  dependencies are touched.

## Files or data intentionally excluded from Git, and why

- `.env` — would contain real secrets (DB credentials, API keys). `.env.example`
  is committed instead with placeholder values.
- `node_modules/`, `dist/`, `*.tsbuildinfo`, logs, coverage output — all
  regenerable from committed manifests/lockfiles/source.
- No customer, order, or production data of any kind exists in this
  repository — the project is brand new, so there was none to exclude.
- Two spreadsheets (`excel/dhl.xlsx`, `excel/speedx.xlsx`) exist in the parent
  `Z:\claude` folder on Bob's machine, alongside but **outside** this
  project's folder (`Z:\claude\xpert-fulfillment`). They were left untouched
  and are not part of this repository — they weren't inspected as part of
  this baseline since they're unrelated pre-existing files, not project
  source. If they contain carrier rate cards or reference data relevant to
  the future DHL/SpeedX integration, they should be reviewed and, if useful,
  intentionally added later (sanitized of any live account numbers/credentials
  first).
