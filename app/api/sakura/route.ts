import { search } from '../../../lib/sakura/bm25';

export const runtime = 'nodejs';
// shortcut: per-instance ceiling; use Vercel WAF for a shared deployment-wide limit.
const windows = new Map<string, { count: number; expires: number }>();
function json(body: unknown, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}
function methodNotAllowed() {
  return json({ error: 'Use POST.' }, 405, { Allow: 'POST' });
}
export {
  methodNotAllowed as GET,
  methodNotAllowed as HEAD,
  methodNotAllowed as PUT,
  methodNotAllowed as PATCH,
  methodNotAllowed as DELETE,
  methodNotAllowed as OPTIONS,
};

export async function POST(request: Request) {
  const now = Date.now();
  for (const [key, value] of windows)
    if (value.expires <= now) windows.delete(key);
  // The deployment's trusted proxy supplies X-Forwarded-For; local clients share a bucket.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  const window = windows.get(ip) || { count: 0, expires: now + 60_000 };
  windows.set(ip, window);
  if (++window.count > 20)
    return json({ error: 'Too many questions. Try again in a minute.' }, 429, {
      'Retry-After': String(Math.ceil((window.expires - now) / 1000)),
    });
  if (
    request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !==
    'application/json'
  )
    return json({ error: 'Send JSON.' }, 415);
  let body: unknown;
  try {
    // Bound reading before JSON parsing, including missing or dishonest Content-Length.
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    if (reader) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 65_536) {
            await reader.cancel();
            return json({ error: 'Request too large.' }, 413);
          }
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return json({ error: 'Invalid JSON.' }, 400);
  }
  const question =
    body && typeof body === 'object' && 'question' in body
      ? body.question
      : undefined;
  if (typeof question !== 'string' || !question.trim())
    return json({ error: 'Enter a question.' }, 400);
  if (question.length > 2000)
    return json({ error: 'Question must be at most 2,000 characters.' }, 413);
  return json({ answers: search(question) });
}
