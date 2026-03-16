import fs from 'node:fs/promises';

const SITEMAP_URL = 'https://petservicehcm.com/sitemap.xml';

function extractLocs(xml) {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gim)];
  return matches.map((m) => m[1].trim()).filter(Boolean);
}

async function main() {
  console.log(`Fetching ${SITEMAP_URL} ...`);
  const res = await fetch(SITEMAP_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (SEO migration helper)' }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const urls = extractLocs(xml);

  if (urls.length === 0) {
    console.warn('No <loc> entries found. If this sitemap is an index, extend script to parse child sitemaps.');
  }

  const lines = ['old_url,new_url,status', ...urls.map((url) => `${url},,301`)];
  await fs.mkdir('seo', { recursive: true });
  await fs.writeFile('seo/redirects.template.csv', `${lines.join('\n')}\n`, 'utf8');

  console.log(`Exported ${urls.length} URLs to seo/redirects.template.csv`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
