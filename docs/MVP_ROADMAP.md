# MVP Roadmap

## Purpose

Build a dependable operational foundation without prematurely replacing the
systems that already run Xpert Fulfillment. The first release should reduce
manual risk, make exceptions visible, and give staff and clients trustworthy
order, inventory, and shipment status.

The marketing website, staff operations interface, client portal, and backend
API are separate surfaces. They should share approved data and brand standards,
but they should not be forced into one application.

## Product principles

- Reliability before feature count.
- Measure the current workflow before changing it.
- Standardize and simplify before automating.
- Preserve the existing WMS and integrations until replacements are proven.
- Use explicit ownership, audit history, and exception queues for operational
  work.
- Keep customer and production data out of development and test environments.
- Present Xpert as established, dependable, responsive, and hands-on — not as
  a low-cost startup service.

## Decision gates before feature expansion

1. Document which system is authoritative for orders, clients, SKUs, inventory,
   shipments, tracking, and billing.
2. Inventory the current WMS, client portal, order-import, shipping, and carrier
   interfaces without changing production behavior.
3. Define staff, client-admin, and client-user roles and the data each may see.
4. Agree on order, inventory, shipment, and exception status definitions.
5. Confirm retention, backup/restore, audit, and customer-data requirements.

No production integration should begin until its source of truth, owner,
failure behavior, and rollback path are documented.

## Workstreams

### 1. Engineering foundation

- Authentication and role-based authorization before any public deployment.
- Stable API error format, request IDs, structured logs, and audit events.
- Committed database migrations with review and rollback procedures.
- CI for clean install, Prisma validation, build, lint, and tests.
- Reproducible local development environment using synthetic fixtures only.
- Secrets management, environment validation, health/readiness checks, and
  documented backup/restore tests.

### 2. Fulfillment domain

Evolve the starter `Order` model only after validating it against real
operations. The likely minimum domain is:

- Clients and client-scoped users.
- Products/SKUs and approved identifiers.
- Orders, order items, addresses, and idempotent import references.
- Inventory balances plus immutable inventory transactions.
- Shipments, packages, carrier/service selections, and tracking events.
- Receiving records, exceptions, notes, and audit history.

Every list endpoint needs pagination, filtering, stable sorting, and client
scoping before production use. Operational state changes should be explicit
commands, not unrestricted record edits.

### 3. Integration layer

- Start with read-only discovery and test fixtures for current order-import,
  WMS, shipping, and carrier workflows.
- Add an idempotent import boundary with validation, duplicate detection, and a
  human-review exception queue.
- Keep client-specific mappings and shipping rules configurable and versioned.
- Add carrier label/rating integrations only after order and package data are
  stable.
- Use retries, dead-letter handling, reconciliation reports, and alerts for
  every asynchronous integration.

### 4. Staff operations interface

Prioritize the work queues that affect service reliability:

- New-order/import exceptions.
- Receiving and inventory discrepancies.
- Orders awaiting allocation, picking, packing, or shipment.
- Address, inventory, label, and carrier exceptions.
- Shipment status and reconciliation.

The first staff interface should make problems visible and assignable; it does
not need to replace the existing control panel.

### 5. Client portal

- Client-scoped order, inventory, and shipment visibility.
- Search, filters, exports, and tracking links.
- Clear timestamps, status definitions, and exception communication.
- Role management and audit history for client administrators.

Do not expose the starter routes to clients until authentication,
authorization, pagination, and tenant isolation have automated tests.

### 6. Marketing website connection

Keep the public website focused on trust and lead conversion:

- Clear fulfillment-first positioning and an "Industries Served" overview.
- Proof through facility/team photography, testimonials, process clarity, and
  measurable service claims that have been operationally verified.
- A short qualification form routed to a controlled lead workflow.
- No direct access from the public website to operational or customer records.

Working brand line: "Big enough to handle the work. Personal enough to care how
it gets done."

## Recommended delivery order

### Phase 0 — Discovery and controls

System inventory, source-of-truth decisions, roles, status definitions,
security boundaries, and measurable baseline metrics.

### Phase 1 — Safe backend foundation

Auth/RBAC, tenant isolation, migrations, CI, audit events, pagination, test
fixtures, and operational monitoring.

### Phase 2 — One proven vertical slice

Import one synthetic order idempotently, validate it, surface exceptions,
progress it through controlled fulfillment states, create a shipment record,
and expose client-scoped status. Prove reconciliation and rollback.

### Phase 3 — Integration and interface expansion

Connect approved test environments, expand staff queues and client visibility,
then introduce carrier functions and production-readiness controls.

### Phase 4 — Website launch alignment

Connect qualified leads to the sales process and publish only service promises
that operations can measure and consistently meet.

## Explicit non-goals for the first vertical slice

- Replacing the existing WMS or client portal.
- Migrating production/customer data.
- Automating every carrier or client exception.
- Building billing, accounting, or a broad CRM.
- Deploying unauthenticated routes publicly.
- Treating the starter schema as the final domain model.

## Definition of done for the first vertical slice

- A clean checkout installs reproducibly and passes CI.
- An empty MySQL database is created using committed migrations.
- Automated tests prove authentication, tenant isolation, idempotency, state
  transitions, validation, and failure handling.
- The workflow uses synthetic data in development and test.
- Staff can see and resolve exceptions without direct database edits.
- Logs and audit events explain who or what changed operational state.
- Backup/restore and rollback procedures are documented and exercised.
- Seth and Bob approve the workflow against actual warehouse operations before
  production activation.
