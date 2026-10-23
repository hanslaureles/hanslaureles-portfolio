const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createServer } = require('node:http');
const { execFileSync } = require('node:child_process');

const TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
};

async function startLegacyBaseline() {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-legacy-'));
  const root = path.join(temporary, 'site');
  let server;
  const close = async () => {
    if (server?.listening) {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    }
    fs.rmSync(temporary, { recursive: true, force: true });
  };
  try {
    fs.mkdirSync(root);
    const archive = path.join(temporary, 'legacy.tar');
    execFileSync(
      'git',
      ['-c', 'core.autocrlf=false', 'archive', '4cdd1e0', '--output', archive],
      { cwd: path.join(__dirname, '..') },
    );
    execFileSync('tar', ['-xf', archive, '-C', root]);
    server = createServer(async (request, response) => {
      let file;
      try {
        const pathname = decodeURIComponent(
          new URL(request.url, 'http://localhost').pathname,
        );
        file = path.resolve(
          root,
          '.' + (pathname === '/' ? '/index.html' : pathname),
        );
      } catch {
        response.writeHead(400).end();
        return;
      }
      if (!file.startsWith(root + path.sep)) {
        response.writeHead(403).end();
        return;
      }
      try {
        const body = await fs.promises.readFile(file);
        response.writeHead(200, {
          'Content-Type':
            TYPES[path.extname(file)] || 'application/octet-stream',
        });
        response.end(body);
      } catch (error) {
        response
          .writeHead(['ENOENT', 'EISDIR'].includes(error.code) ? 404 : 500)
          .end();
      }
    });
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
    return { url: `http://127.0.0.1:${server.address().port}`, close };
  } catch (error) {
    await close();
    throw error;
  }
}

module.exports = { startLegacyBaseline };
