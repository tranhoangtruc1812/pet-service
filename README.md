# Pet Service HCM — New Core Web Repository Template

This repository is a **starter blueprint** for rebuilding the core web platform while preserving SEO value from the existing site: `https://petservicehcm.com/`.

## Goals

- Build a modern web core with clean architecture.
- Preserve and transfer SEO signals from the current site.
- Avoid ranking loss during migration.

## Repository Structure

- `docs/seo-migration-plan.md` — end-to-end migration checklist.
- `scripts/export-legacy-urls.mjs` — fetches legacy sitemap URLs.
- `scripts/generate-redirects.mjs` — generates redirect JSON from CSV mapping.
- `seo/redirects.template.csv` — URL mapping template (`old_url,new_url,status`).
- `seo/redirects.generated.json` — generated redirects used by your new app.

## Quick Start

1. Export current URLs:

   ```bash
   npm run seo:export-urls
   ```

2. Fill redirect mapping:

   - Open `seo/redirects.template.csv`.
   - Map every legacy URL to a new URL.

3. Generate redirect rules:

   ```bash
   npm run seo:generate-redirects
   ```

4. Validate generated redirects:

   ```bash
   npm run seo:validate-redirects
   ```

5. Implement redirects in your new framework (Next.js, Nuxt, Laravel, etc.) using `seo/redirects.generated.json`.

## Recommended Migration Workflow

Use the checklist in `docs/seo-migration-plan.md` and execute in three phases:

- **Pre-migration**: URL inventory, metadata/content extraction, technical baseline.
- **Launch**: 301 redirects + canonical consistency + sitemap/robots updates.
- **Post-launch**: crawl validation, 404 monitoring, and ranking/index monitoring.

## Notes

- Keep the same domain if possible (`petservicehcm.com`) to retain authority.
- Use **301 (permanent)** redirects for all moved URLs.
- Do not block critical pages/resources in `robots.txt`.
