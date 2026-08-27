# Xpert Fulfillment Website

This directory contains the new public marketing website. It is a clean,
static-first replacement for the existing WordPress site; it is not a copy of
the WordPress installation.

## Current status

The frontend is a non-production baseline. It includes:

- A responsive design system and shared navigation/footer.
- Homepage, Services, Industries, How It Works, About, Contact, and 404 pages.
- Draft positioning and copy based on approved strategic direction.
- Clearly labeled placeholders for facility and team photography.
- Static metadata, canonical URLs, sitemap generation, and a staging-safe
  `noindex,nofollow` setting.

The contact form is intentionally non-submitting. Contact routing, privacy
requirements, spam protection, and retention rules must be approved before it
is connected.

## Stack

- Astro 7, static output
- TypeScript in strict mode
- React integration available for future interactive components
- Plain CSS with no external font or UI-library dependency

Astro is used because the site is primarily content and lead generation. The
static output can be served directly by nginx without requiring a persistent
Node.js application process. React remains available for focused interactive
features without making every page a client-side application.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321`.

## Validation and build

```bash
npm run check
npm run build
```

The production-ready static files are written to `dist/`.

## Content and launch controls

The following controls are deliberate:

- `src/data/site.ts` sets `launchReady: false`, which adds
  `noindex,nofollow` to every page.
- The footer labels the site as an unapproved preview.
- The contact form cannot submit.
- Draft language avoids unverified service levels, certifications, customer
  claims, dates, carrier promises, and performance statistics.

Do not set `launchReady: true`, remove the preview label, or connect the form
until the launch checklist in `../docs/FRONTEND_BASELINE.md` is approved.

## Deployment shape

For a self-hosted preview, run `npm ci && npm run build`, then serve `dist/`
from a separate nginx virtual host or staging subdomain. Keep the current
WordPress production route untouched until the replacement has passed the
launch checklist and the final redirect map is ready.
