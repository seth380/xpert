# Xpert Fulfillment

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
npm install
cp .env.example .env    # then fill in real values, especially DATABASE_URL
npx prisma generate     # generates the Prisma client (needs network access
                         # to Prisma's binary CDN — see "Known limitations")
npx prisma migrate dev  # creates the database schema from prisma/schema.prisma
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
`OrderItem`, plus `OrderStatus` and `Carrier` enums). To apply it to a fresh
database:

```bash
npx prisma migrate dev --name init
```

This both creates a migration file under `prisma/migrations/` and applies it.
Run `npx prisma migrate deploy` in production/CI instead of `migrate dev`.

## Build, test, and start

```bash
npm run build   # type-checks and compiles src/ -> dist/ (tsc)
npm run lint    # ESLint (flat config, typescript-eslint)
npm test        # vitest — unit tests, no live DB required
npm start       # runs the compiled server (dist/index.js)
```

Current verified results (see docs/CURRENT_STATE.md for the full smoke-check
log): build ✅, lint ✅ (0 errors, 0 warnings), tests ✅ (6/6 passing), server
boot + `/health` smoke check ✅.

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
- `prisma generate` could not be verified from the build sandbox used to
  create this baseline because outbound access to Prisma's binary CDN
  (`binaries.prisma.sh`) was blocked in that environment. It's expected to
  work normally in a regular dev machine or CI runner with normal internet
  access — this is a sandbox networking limitation, not a code issue.

See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) for full details.
