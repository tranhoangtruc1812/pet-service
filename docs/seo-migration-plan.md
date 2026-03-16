# SEO Migration Plan for `petservicehcm.com`

## 1) Pre-Migration (2–4 weeks before launch)

- Crawl legacy website and collect all indexable URLs.
- Export metadata for each URL:
  - title
  - meta description
  - canonical URL
  - H1 and core content intent
- Identify top-performing pages (traffic + conversions + backlinks).
- Freeze URL strategy for new site.
- Build one-to-one URL mapping for all legacy URLs.
- Prepare XML sitemap and robots.txt draft for the new platform.

## 2) Technical Requirements at Launch

- 301 redirect every legacy URL to the closest relevant new URL.
- Keep status 200 for destination pages.
- Ensure canonical tags point to self (or canonical source when intentional).
- Ensure noindex is removed from production pages.
- Verify Open Graph and structured data are valid.
- Submit new XML sitemap in Google Search Console and Bing Webmaster.

## 3) Post-Launch Validation (first 30 days)

- Recrawl the full legacy URL list and validate:
  - old URL returns 301
  - target URL returns 200
  - no redirect chains > 1 hop
- Monitor:
  - index coverage
  - crawl stats
  - 404 pages
  - soft 404 warnings
- Patch missing redirects within 24 hours.
- Track rankings for priority keywords weekly.

## 4) Content/On-Page SEO Continuity

- Keep topical relevance of high-performing pages.
- Preserve internal linking depth for important service pages.
- Ensure image alt texts and media filenames remain descriptive.
- Maintain service/location intent in slugs and headings.

## 5) KPIs

- % migrated URLs with valid 301
- Number of 404s over time
- Indexed pages parity vs old site
- Organic traffic delta (week 1, 2, 4)
- Conversion rate parity/recovery
