import fs from 'node:fs/promises';

function parseCsv(content) {
  const lines = content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const [header, ...rows] = lines;
  const expectedHeader = 'old_url,new_url,status';
  if (header !== expectedHeader) {
    throw new Error(`Invalid header. Expected: ${expectedHeader}`);
  }

  return rows.map((row, index) => {
    const [oldUrl, newUrl, status] = row.split(',').map((cell) => cell.trim());
    if (!oldUrl || !newUrl) {
      throw new Error(`Row ${index + 2}: old_url and new_url are required`);
    }

    const code = Number(status || 301);
    if (![301, 302, 307, 308].includes(code)) {
      throw new Error(`Row ${index + 2}: invalid status ${status}`);
    }

    return { oldUrl, newUrl, status: code };
  });
}

function toPath(url) {
  const parsed = new URL(url);
  return `${parsed.pathname}${parsed.search}` || '/';
}

async function main() {
  const csv = await fs.readFile('seo/redirects.template.csv', 'utf8');
  const rows = parseCsv(csv);

  const redirects = rows.map(({ oldUrl, newUrl, status }) => ({
    source: toPath(oldUrl),
    destination: toPath(newUrl),
    permanent: status === 301 || status === 308,
    statusCode: status
  }));

  await fs.writeFile('seo/redirects.generated.json', `${JSON.stringify(redirects, null, 2)}\n`, 'utf8');
  console.log(`Generated ${redirects.length} redirects -> seo/redirects.generated.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
