<div align="center">

# Hans Aaron Laureles — Portfolio
### Applied AI Engineer & Full-Stack Builder
**Live site:** [hanslaureles.vercel.app](https://hanslaureles.vercel.app/)

[![CI](https://github.com/hanslaureles/hanslaureles-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/hanslaureles/hanslaureles-portfolio/actions/workflows/ci.yml)
[![Live site probe](https://github.com/hanslaureles/hanslaureles-portfolio/actions/workflows/live-probe.yml/badge.svg)](https://github.com/hanslaureles/hanslaureles-portfolio/actions/workflows/live-probe.yml)

</div>

---

## Implementation and release status

The Next.js App Router migration went live on 23 October 2026 through merge [`9c8bec4`](https://github.com/hanslaureles/hanslaureles-portfolio/commit/9c8bec4f092b0cc6080ec90d4d32f20cb12b554a). Production SHA/header probes, the Aura demo checkout, desktop/mobile checks and [main CI](https://github.com/hanslaureles/hanslaureles-portfolio/actions/runs/39939975556) passed. The paired HQ publisher release is `a6618b6`. The Next.js skill claims followed in [`3e7b4ef`](https://github.com/hanslaureles/hanslaureles-portfolio/commit/3e7b4ef4e097b61416c87dd51bf8d296dd688705) once production was verified.

## What is on the site

Seven case studies cover LSFM AI HQ, Manas: Ciel, Memory Core, Aura Coffee & Kitchen, Lumina, Vellum and FinTrack. They use `/case-{lsfm,ciel,memory,aura,lumina,vellum,fintrack}`; old `.html` links redirect, and `/ciel` and `/ciel-hud` remain aliases. The Aura ordering demo is at `/aura-store`; it processes no payment.

The homepage combines selected projects, category filters and an Index view, a scripted request replay, experience, dated evidence, FAQ and contact. About has cards and git views. **Ask Sakura** sends a question to the retrieval-only `/api/sakura` route, which scores committed knowledge with BM25; it makes no model calls. **Agent Overview** combines labelled scripted replay with the published `public/data/status.json` snapshot, not a live agent connection.

## How this checkout is built

- Next.js App Router server pages and per-page metadata; focused React client components handle menus, overlays, theme, About views and homepage interactions. Ordinary anchors preserve full-document view transitions and reduced-motion behavior.
- `proxy.ts` creates a fresh nonce for app responses and enforces the CSP from `lib/csp.mjs`, with private/no-store HTML. `/404` and unknown URLs return 404 with the full custom page, including without JavaScript.
- `next/font/local` serves committed OFL woff2 files for Plus Jakarta Sans, Instrument Serif and JetBrains Mono. Latin preloads; extended-Latin loads on demand. App builds need no Google network access.
- `styles/styles.css` is imported by the root layout; `styles/home.css` supplies homepage overrides. Ciel and Memory have route CSS. Two case-demo scripts remain in `public/` because those pages still load them.
- `public/aura-store/` remains legacy static HTML/CSS/JavaScript with its own font-host CSP and subfolder aliases. Its Netlify config stays; root Netlify fallback files are removed. `vercel.json` remains present; Next configuration owns the migration routes and headers.
- `public/data/status.json` remains generated and committed on demand. HQ's publisher now targets `../portfolio-site/public/data/status.json` (`a6618b6`); publishing still requires an explicit run and a separate portfolio commit.

## Local development and validation

Use Node 24 and Python 3.11 or later. Root and test dependencies have separate lockfiles:

```powershell
npm ci
cd tests
npm ci
npx playwright install chromium
cd ..
npm run dev
```

Open `http://localhost:5174`. For a production build, stop the development server first:

```powershell
npm run build
npx tsc --noEmit
$env:VERCEL_GIT_COMMIT_SHA = git rev-parse HEAD
npm run start
```

Run the suite from `tests/`; its harness builds/starts Next.js and supplies the local Git SHA. Stop an existing server after changing commits so it cannot serve a stale build:

```powershell
cd tests
npx playwright test --workers=2
cd ..
```

The default suite covers visible content without JS, first-paint theme, nonce CSP, API abuse, mobile menus, overlays, accessibility, transitions, local links and a route/asset crawl. The style/content/head parity suite that compared the migration with frozen static `4cdd1e0` captures was retired after release, because approved copy changes now differ from those captures on purpose. The performance test measures desktop/mobile cold loads with third-party requests blocked. Its immutable homepage gzip ceiling excludes fonts and allows at most 163,840 B growth over `4cdd1e0` per view.

With `next start` running:

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

`.rendered/` is ignored. The rendered checks inspect app copy; static include/hash checks inspect Aura's HTML. Syntax-check all remaining `public/**/*.js` with `node --check`. CI runs on main pushes and pull requests. Refresh performance budgets deliberately from `tests/` with `$env:UPDATE_BUDGET='1'; npx playwright test perf.spec.js --workers=2`, then remove that environment variable and review the budget diff; the homepage gzip ceiling still applies during an update.

After an approved deployment, `python tools/probe_live.py <deployment-url> --root public` checks 18 routes and compares `/version.json` with local `git rev-parse HEAD`. The endpoint is no-store and reads Vercel's deployment SHA. The probe also checks app nonce CSP, Aura's static CSP, the custom 404, redirect and status-data cache policy. A daily workflow runs this probe against production.

See [CLAUDE.md](CLAUDE.md) for release boundaries and maintenance commands.


## Contact

**Hans Aaron Laureles**, Cavite, Philippines, open to remote roles.

- [Portfolio](https://hanslaureles.vercel.app/)
- [LinkedIn](https://linkedin.com/in/hanslaureles)
- [GitHub](https://github.com/hanslaureles)
- [hanslaureles92@gmail.com](mailto:hanslaureles92@gmail.com)

## Icon credit

The homepage's inline icons are [Lucide](https://lucide.dev/) SVG markup, copied from the [official icon source](https://github.com/lucide-icons/lucide/tree/main/icons) (retrieved 2026-10-20 and 2026-10-21); no runtime package or CDN is used. Their ISC licence and the MIT notice for the Feather-derived icons follow.

```text
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
