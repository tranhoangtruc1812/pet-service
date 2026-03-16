import fs from 'node:fs/promises';

async function main() {
  const raw = await fs.readFile('seo/redirects.generated.json', 'utf8');
  const redirects = JSON.parse(raw);

  if (!Array.isArray(redirects)) {
    throw new Error('redirects.generated.json must contain an array');
  }

  const seen = new Set();
  let duplicates = 0;

  for (const [i, redirect] of redirects.entries()) {
    if (!redirect.source || !redirect.destination) {
      throw new Error(`Entry ${i} missing source/destination`);
    }

    const key = `${redirect.source} -> ${redirect.destination}`;
    if (seen.has(key)) duplicates += 1;
    seen.add(key);
  }

  if (duplicates > 0) {
    console.warn(`Found ${duplicates} duplicate redirects.`);
  }

  console.log(`Validated ${redirects.length} redirects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
