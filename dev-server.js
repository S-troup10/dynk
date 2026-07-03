// Minimal local dev server: serves static files + runs /api/* Vercel functions.
// Usage: node dev-server.js  →  http://localhost:3000
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// --- load .env into process.env (simple KEY=VALUE parser) ---
try {
  const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch {}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

// Adapt Node req/res to the Vercel handler interface.
async function runApi(name, req, res) {
  const file = path.join(__dirname, 'api', name + '.js');
  if (!fs.existsSync(file)) { res.statusCode = 404; return res.end('No API: ' + name); }
  const mod = await import(pathToFileURL(file).href + '?t=' + Date.now()); // cache-bust on each call
  const handler = mod.default;

  let body = '';
  req.on('data', (c) => (body += c));
  await new Promise((r) => req.on('end', r));
  try { req.body = body ? JSON.parse(body) : undefined; } catch { req.body = body; }
  req.query = Object.fromEntries(new URL(req.url, 'http://x').searchParams);

  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); return res; };
  // res.setHeader / res.end already exist on the Node response.

  try {
    await handler(req, res);
  } catch (err) {
    console.error(`[api/${name}]`, err);
    if (!res.headersSent) { res.statusCode = 500; res.end(JSON.stringify({ ok: false, error: 'server_error' })); }
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let pathname = decodeURIComponent(url.pathname);
  console.log(req.method, pathname);

  if (pathname.startsWith('/api/')) {
    return runApi(pathname.slice(5).replace(/\/$/, ''), req, res);
  }

  // Static file resolution: /  → index.html, /foo → foo/index.html or foo.html
  let filePath = path.join(__dirname, pathname);
  if (pathname.endsWith('/')) filePath = path.join(filePath, 'index.html');
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    if (fs.existsSync(filePath + '.html')) filePath += '.html';
    else if (fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
    return fs.createReadStream(filePath).pipe(res);
  }
  res.statusCode = 404;
  res.end('Not found: ' + pathname);
});

server.listen(PORT, () => {
  console.log(`\n  DYNK dev server → http://localhost:${PORT}`);
  console.log(`  API live:         http://localhost:${PORT}/api/marketplace`);
  console.log(`  Secret loaded:    ${process.env.DYNK_ANALYTICS_SECRET ? 'yes' : 'NO — decrypt will fail'}\n`);
});
