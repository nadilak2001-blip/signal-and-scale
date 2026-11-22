# Signal & Scale — Australian B2B Digital Marketing Consultancy Website

Static React + TypeScript + Vite website prepared for export to GitHub, publication via GitHub Pages (including repository subpaths), and Google Analytics 4 measurement.

## Pages Included

1. **Home** (`/`) — Positioning, target industries, problem/solution overview, 4-stage workflow, and conversion CTAs.
2. **Services** (`/services`) — Detailed scope, deliverables, exclusions, comparison table, and illustrative 90-day roadmap across Website & SEO Audit, 90-Day Content & Conversion Roadmap, and Measurement & Performance Reporting.
3. **About** (`/about`) — Proposed consultancy mission, core values, and methodology.
4. **Insights** (`/insights`) — Two complete B2B guides (*Why Your B2B Website Gets Traffic but Few Enquiries* and *SEO Priorities for Australian IT Support Businesses*) plus an accessible FAQ section.
5. **Contact** (`/contact`) — Accessible enquiry form with validation, demonstration mode when unconfigured, privacy notice, and configurable discovery call scheduling placeholder.
6. **Industries** (`/industries`) — Sector challenges and strategy for IT Support Providers, Bookkeeping Firms, and Professional Advisers.
7. **Evidence & Methodology** (`/evidence`) — Illustrative SEO audit framework, sample deliverables, clearly labelled fictional demonstration dashboard, proposed KPIs, and reporting limitations.

## Configuration Before Going Live

All configurable external integrations live centrally in `src/config/siteConfig.ts` and support build-time environment variables (`VITE_*`):

| Setting | Env Var | Default | Purpose |
| :--- | :--- | :--- | :--- |
| GA4 Measurement ID | `VITE_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Replace with your live GA4 ID (`G-...`). Inactive until replaced and user grants consent. |
| Contact Form Endpoint | `VITE_CONTACT_FORM_ENDPOINT` | `""` | Add your Formspree / webhook URL. Empty runs in honest Demonstration Mode. |
| Scheduling URL | `VITE_SCHEDULING_URL` | `""` | Add Calendly / Microsoft Bookings URL. Empty displays unconfigured placeholder. |
| Canonical Base URL | `VITE_CANONICAL_BASE_URL` | `https://example.github.io/signal-and-scale` | Update to match your live GitHub Pages or custom domain URL. |

Also update the placeholder URLs in:
- `index.html` (`<link rel="canonical">`)
- `public/robots.txt` (`Sitemap:` URL)
- `public/sitemap.xml` (`<loc>` entries)

## Google Analytics 4 Event Map

Implemented in `src/lib/analytics.ts` with consent gating, deduplicated `page_view` tracking, and strict zero-PII enforcement:
- `page_view`
- `audit_request_click`
- `service_view`
- `discovery_call_click`
- `contact_form_submit` (fires only on live endpoint success; sends only `business_sector` and `primary_challenge`)
- `insight_to_service_click`

## Deploying to GitHub Pages

The app uses `HashRouter` (`react-router-dom`) and relative Vite base (`base: process.env.VITE_BASE_PATH || './'`), so assets and direct/refreshed routes work out of the box on both root domains and repository subpaths (`https://<user>.github.io/<repo>/`).

### Build Locally

```bash
npm install
npm run build
```

For a specific repository subpath (optional):

```bash
VITE_BASE_PATH=/signal-and-scale/ npm run build
```

Publish the generated `dist/` directory to GitHub Pages (via `gh-pages` or a GitHub Actions workflow deploying `dist`).
