# New Website Baseline

## Decision

Build a clean replacement for the current WordPress site while leaving the
existing production site online. The old site is a reference source for public
facts, approved copy, owned assets, and URL history; its WordPress codebase and
technical debt are not the starting point for the replacement.

The new website lives in `frontend/` and uses Astro with static output. React
support is installed for future interactive components, but the baseline does
not ship unnecessary client-side application code.

## Positioning reflected in the draft

- Established, dependable, and fulfillment-first.
- Written for experienced operators who notice process, handoffs, ownership,
  and exceptions.
- Responsive, hands-on service as the central difference.
- Operational fit and accountability instead of low-price, no-minimum, or
  startup-first language.
- One known, supportable facility fact: a 100,000-square-foot primary facility.

All copy remains subject to business, legal, and operational review.

## Routes in the baseline

- `/` - homepage and positioning
- `/services/` - service and capability overview
- `/industries/` - consolidated Industries Served page
- `/how-it-works/` - discovery through ongoing operation
- `/about/` - company approach, facility, team, and values
- `/contact/` - qualification form design; submission disabled
- `/404.html` - static not-found page

## Deliberately deferred

- Production deployment or DNS/web-server changes.
- Contact-form submission and lead routing.
- Analytics, consent management, and advertising pixels.
- Final logo, fonts, photography, testimonials, and customer marks.
- Specific integration, carrier, cutoff, turnaround, accuracy, volume, or
  service-level claims.
- Legal pages and approved privacy language.
- Migration redirects from current WordPress URLs.
- A CMS. Content is source-controlled until editing requirements justify one.

## Content needed from the old site and business owners

The focused request for Seth and Bob should cover:

1. Current public URL inventory, page titles, meta descriptions, and any pages
   receiving meaningful search or referral traffic.
2. Approved company facts, history, facility details, capabilities, equipment,
   carrier relationships, operating hours, and geographic claims.
3. Current contact details, form recipients, lead workflow, required form
   fields, privacy retention rules, and spam-protection preference.
4. Owned/licensed brand files and photographs with permission status.
5. Approved customer names, logos, testimonials, case-study facts, and written
   permission to publish.
6. Analytics, tag-manager, advertising, domain, DNS, TLS, nginx, and deployment
   ownership - identifiers only, never secrets in Git or chat.
7. Existing redirects, downloadable resources, legal pages, and tracking URLs
   that must survive the transition.

No WordPress database, user data, form submissions, credentials, API keys,
license keys, backups, logs, or unreviewed uploads are needed.

## Launch gates

Before the replacement can become production:

- Seth and Bob approve the information architecture, copy, and visual direction.
- Every factual or measurable claim has an operational source and owner.
- Approved, optimized images replace all placeholders with useful alt text.
- The form has server-side validation, spam controls, rate limiting, secure
  routing, clear success/failure behavior, and an approved privacy policy.
- Contact details and lead ownership are tested end to end.
- Analytics and consent behavior are approved and verified.
- Current URLs are inventoried and mapped to equivalent new routes or explicit
  redirects.
- Page metadata, canonical URLs, sitemap, robots behavior, structured data,
  and social-sharing images are finalized.
- Mobile, desktop, keyboard, accessibility, browser, and performance QA pass.
- Backup and rollback procedures are documented and exercised.
- The preview footer is removed and `launchReady` is set to `true` in the same
  reviewed launch change.

## Verification completed for this baseline

- Clean dependency install with zero reported vulnerabilities.
- Astro/TypeScript diagnostics: zero errors, warnings, or hints.
- Static build generated all seven routes and a sitemap.
- Desktop and mobile full-page renders were reviewed at 1440px and 390px.
- Mobile render has no horizontal overflow.
- The production form remains disabled and all pages remain `noindex,nofollow`.
