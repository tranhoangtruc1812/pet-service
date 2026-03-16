import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT || 4173);
const root = process.cwd();

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function resolveFile(urlPath) {
  const cleaned = decodeURIComponent((urlPath || '/').split('?')[0]);
  const relative = cleaned === '/' ? '/index.html' : cleaned;
  const target = normalize(join(root, relative));
  if (!target.startsWith(root)) return null;

  if (existsSync(target)) {
    const stats = statSync(target);
    if (stats.isDirectory()) {
      const indexPath = join(target, 'index.html');
      return existsSync(indexPath) ? indexPath : null;
    }
    return target;
  }

  return null;
}

createServer((req, res) => {
  const file = resolveFile(req.url || '/');
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const type = mime[extname(file)] || 'application/octet-stream';
  res.writeHead(200, { 'content-type': type });
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => {
  console.log(`Static server running on http://0.0.0.0:${port}`);
});
