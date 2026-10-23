# Portfolio project guide

## Scope and release gate

This checkout implements the portfolio migration on `feat/nextjs`. Production remains the static `4cdd1e0` release until Claude independently clears Phase 6 and Hans separately approves Task 6.5. Codex implements this assigned migration; Claude performs read-only QA. Local commits do not authorize a push, merge, promotion, Vercel configuration change or HQ runtime change.

About skills, the homepage FAQ stack line, HQ `memory/master_resume.md` and the Next.js skill pattern in `tools/check_claims.py` stay unchanged until live verification passes (D8).

## Architecture

- `app/`: Next.js App Router server pages, per-page metadata, root header/footer and theme script. Browser behavior lives in focused client components under `components/`: mobile menu, theme toggle, overlays, About view and homepage controls. Keep ordinary anchors for full-document view transitions.
- `proxy.ts`: fresh 16-byte nonce per app request; forwards the nonce and CSP to rendering, sends the enforced policy and private/no-store HTML. `lib/csp.mjs` is the shared policy source. Aura uses its separate static policy; its pages contain no inline scripts or retired theme hashes.
- `app/api/sakura/route.ts` and `lib/sakura/`: retrieval-only BM25 answers from committed knowledge. No model/provider calls. Preserve question/body limits, JSON validation, 20-per-minute rate limit and non-HTML responses.
- `app/version.json/route.ts`: runtime `VERCEL_GIT_COMMIT_SHA`, `Cache-Control: no-store`. The live probe compares it with the checked-out Git HEAD.
- `app/fonts/`: committed OFL woff2 files with source URLs/hashes and family licences. `next/font/local` preloads Latin; extended-Latin faces load only when needed. Keep CSS variables, unicode ranges and fallback stacks. No Google request at app build time.
- `styles/styles.css`: shared base, imported by `app/layout.tsx`. `styles/home.css`: homepage overrides, imported by `app/page.tsx`. Ciel and Memory have route CSS. Preserve stylesheet order, the explicit homepage hero reset and the single reduced-motion navigation opt-in.
- `public/`: images, data, resume PDF, the two still-used case-demo scripts and the **legacy static Aura store**. Keep Aura's scripts/styles, subfolder `netlify.toml`, explicit aliases and Google font hosts. Root Netlify routing is retired.
- `/404` and unknown paths return 404 with the complete server-rendered custom UI. Old `.html` URLs redirect once to clean routes; `/ciel` and `/ciel-hud` alias `/case-ciel`.

## Install, run and build

Use Node 24 and Python 3.11 or later. Dependencies are pinned in both lockfiles; test dependencies are separate.

```powershell
npm ci
cd tests
npm ci
npx playwright install chromium
cd ..
npm run dev
```

Development uses port 5174. For production validation, stop development first:

```powershell
npm run build
npx tsc --noEmit
$env:VERCEL_GIT_COMMIT_SHA = git rev-parse HEAD
npm run start
```

Run `tsc` after a fresh build so generated route types match the current tree. The SHA assignment is for local verification only; Vercel supplies its own deployment SHA.

## Validation

```powershell
cd tests
npx playwright test --workers=2
cd ..
```

The harness builds and starts Next.js on 5174, supplies current HEAD as the local deployment SHA, and reuses an existing server outside CI. Stop a stale server before testing a new commit. Browser checks cover all ten parity routes including head metadata, visible content without JavaScript, first-paint theme, nonce CSP, API abuse, accessibility, mobile controls, transitions and a 17-route asset crawl. Retired public assets must be absent and unrequested. `tests/probe.spec.js` runs the 18-route live probe locally and verifies its rejection cases.

With `next start` running, export HTML and run the guards on their appropriate roots:

```powershell
node tests/render-pages.mjs
python tools/check_headings.py --root .rendered
python tools/check_claims.py --root .rendered
python tools/build_metric_cards.py --root .rendered --check
python tools/build_metric_cards.py --root .rendered --self-test
python tools/check_headings.py --root public
python tools/check_claims.py --root public
python tools/check_assets.py --root public
python tools/check_csp.py --root public
python tools/test_check_csp.py --root public
```

`.rendered/` is ignored. CSP hashing and static include checks target Aura's source HTML; browser tests validate nonce-bearing app HTML. Syntax-check the remaining `public/**/*.js` with `node --check`. Use only a dry run/help when inspecting the image optimizer; do not re-encode assets as housekeeping.

Performance uses three cold loads per page and viewport, blocks third-party requests, reports decoded bytes and fonts-excluded gzip, and compares page weight with the committed budget. Refresh only for a deliberate change:

```powershell
cd tests
$env:UPDATE_BUDGET = '1'
npx playwright test perf.spec.js --workers=2
Remove-Item Env:UPDATE_BUDGET
cd ..
```

The immutable homepage gzip guard remains active during updates: legacy desktop 110,729 B and mobile 69,549 B, plus at most 163,840 B each. Task 6.5 must also verify LCP median growth is at most 500 ms against `4cdd1e0`.

After an approved deployment, check out its exact expected revision and run `python tools/probe_live.py <deployment-url> --root public`. It checks 18 routes including `/404`, `/version.json`, Aura, the PDF, status data and the `.html` redirect, plus enforced CSP/cache policy. Do not run the new probe against static production and mistake the expected version-endpoint failure for release verification.

## Published status and content

`public/data/status.json` is generated by HQ's `eunchae_publisher`, never hand-edited. HQ main still targets the old root `data/status.json`; preserved release branch `feat/nextjs-status-target` at `6926e47` changes it to `../portfolio-site/public/data/status.json`. Ship that branch only with the approved migration release. Do not invoke the publisher or alter HQ runtime during local migration work. The UI labels old snapshots as old; it has no live connection to agents.

Preserve the Swiss editorial typography, CSS tokens, light/dark contrast, reduced motion and keyboard/focus behavior. Ground public copy in repository evidence; do not add credentials, unverified skills, telemetry or performance claims. Keep case-study demo scripts until their actual callers are migrated.
