export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    { sha: process.env.VERCEL_GIT_COMMIT_SHA },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
