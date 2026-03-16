# Pet Service HCM — Core Web + SEO Migration Toolkit

This repository now includes a simple static multi-page website plus SEO migration scripts for rebuilding `petservicehcm.com` while preserving search visibility.

## Included Web Pages

- `index.html` — Home
- `services.html` — Services overview
- `pricing.html` — Pricing table
- `about.html` — About page
- `contact.html` — Contact page
- `styles.css` — Shared styling

## Run the Website

```bash
npm start
```

Open `http://localhost:4173`.

## SEO Migration Utilities

- `docs/seo-migration-plan.md` — end-to-end migration checklist.
- `scripts/export-legacy-urls.mjs` — fetches legacy sitemap URLs.
- `scripts/generate-redirects.mjs` — generates redirect JSON from CSV mapping.
- `seo/redirects.template.csv` — URL mapping template (`old_url,new_url,status`).
- `seo/redirects.generated.json` — generated redirects used by your new app.

### Commands

```bash
npm run seo:export-urls
npm run seo:generate-redirects
npm run seo:validate-redirects
```
