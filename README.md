# Xpert Fulfillment

> The repository now also contains the new public website baseline under
> [`frontend/`](frontend/README.md). The existing WordPress site remains the
> production website while the replacement is reviewed and completed.

Backend API for Xpert Fulfillment's order fulfillment operations. This repository
is a **fresh starter baseline** — there was no pre-existing codebase to preserve;
this establishes the initial project structure, conventions, and a minimal
working slice (health check + an `orders` resource) for the team to build on.

## What this is (and isn't)

- **Is**: a working Node.js/TypeScript/Express API skeleton with a MySQL
  schema (via Prisma) for orders, wired up with linting, tests, and a build
  pipeline.
- **Isn't**: a finished fulfillment system. There's no shipping-carrier
  integration, no auth, no inventory management, and no production
  deployment configured yet. See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md)
  for the honest state of things.

## Architecture overview

```
src/
  index.ts          # process entrypoint — starts the HTTP server
  app.ts            # Express app assembly (middleware + routes)
  config/env.ts     # environment variable loading
  db/prisma.ts      # lazy Prisma client singleton
  routes/           # route definitions (thin)
  controllers/      # HTTP layer — request/response handling
  services/         # business logic, validation, DB access
  types/            # shared TypeScript types
prisma/
  schema.prisma     # data model (MySQL)
tests/              # vitest unit/integration tests
```

Layering is routes → controllers → services → Prisma/DB, kept intentionally
simple. There is no message queue, cache, or background worker yet.

## Required runtimes

- Node.js 22.x (developed against `v22.22.2`)
- npm 10.x
- MySQL 8.0+ (any recent MySQL works; no version-specific features used)

## Local setup

```bash
npm ci
cp .env.example .env    # then fill in real values, especially DATABASE_URL
npx prisma generate     # generates the Prisma client
npx prisma migrate deploy # applies the committed migrations to a fresh database
npm run dev              # starts the API on http://localhost:3000 with reload
```

## Environment variables

See `.env.example` for the full list with placeholder values. Summary:

| Variable       | Required | Purpose                                              |
| -------------- | -------- | ----------------------------------------------------- |
| `NODE_ENV`     | no       | `development` / `production` / `test`                 |
| `PORT`         | no       | HTTP port (default `3000`)                             |
| `CORS_ORIGIN`  | no       | Allowed CORS origin(s), `*` for development            |
| `DATABASE_URL` | yes      | MySQL connection string used by Prisma                 |
| `DHL_API_KEY`  | no       | Placeholder for a future DHL integration (not wired up) |
| `SPEEDX_API_KEY` | no     | Placeholder for a future SpeedX integration (not wired up) |

Never commit a real `.env` file — it's git-ignored on purpose.

## Database setup / migrations

The schema lives in `prisma/schema.prisma` (currently: `Order` and
`OrderItem`, plus `OrderStatus` and `Carrier` enums). The initial migration is
committed under `prisma/migrations/`. To apply all committed migrations to a
fresh database:

```bash
npx prisma migrate deploy
```

When intentionally changing the schema during development, create and apply a
new migration with `npx prisma migrate dev --name <change-name>`. Review the
generated SQL before committing it. Use `prisma migrate deploy` in production
and CI.

## Build, test, and start

```bash
npm run build   # type-checks and compiles src/ -> dist/ (tsc)
npm run lint    # ESLint (flat config, typescript-eslint)
npm test        # vitest — unit tests, no live DB required
npm start       # runs the compiled server (dist/index.js)
```

Current independently verified results (see docs/CURRENT_STATE.md): clean
install ✅, Prisma generate/validate ✅, build ✅, lint ✅, tests ✅ (6/6),
migration deploy to empty MySQL 8.0 ✅, and an end-to-end order create/get/list
round-trip ✅.

## Deployment

Not yet configured. There is no Dockerfile, CI pipeline, or hosting target
defined in this repository yet. Recommended next steps are listed in
docs/CURRENT_STATE.md.

## Known limitations / current priorities

- No authentication or authorization on any route.
- Only one resource (`orders`) exists; no products, customers, inventory, or
  shipment tracking models yet.
- No carrier integrations (DHL, SpeedX, etc.) — env var placeholders exist
  but nothing calls them.
- No CI, no Dockerfile, no deployment target.
- Production database connectivity and deployment are intentionally not
  configured or tested. Verification used an isolated, disposable MySQL 8.0
  database containing synthetic data only.

See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) for full details.
