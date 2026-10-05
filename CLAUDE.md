# Claude Code Project Guide — Portfolio Site (`portfolio-site`)

## Project Purpose
Production developer portfolio and kinetic AI agent showcase for **Hans Aaron Laureles** (Applied AI Engineer & Full-Stack Builder). Live deployed on Vercel.

## Architecture
- `index.html`: Main landing page, agent fleet telemetry, terminal playground, kinetic project showcase.
- `sakura-copilot.js`: "Ask Sakura" in-browser BM25 recruiter copilot.
- `terminal.js`: Interactive Unix recruiter playground CLI.
- `sentinel.js`: Swarm telemetry and mission control HUD.
- `case-*.html`: Flagship project case studies (Ciel, LSFM, Cognitive Memory, Aura Store).
- `vercel.json` & `netlify.toml`: Deployment routing and asset caching configurations.

## Tech Stack
- Vanilla HTML5, modern semantic CSS (Swiss-inspired editorial design system)
- Vanilla JavaScript (ES6+), zero heavy frontend framework runtime

## Run Commands
- Local preview via static server: `npx serve .` or `python -m http.server 3000`

## Agent Status Snapshot (`data/status.json`)
- Generated, never hand-edited: from `LE-SSERAFIM-AI-HQ`, run `python -m eunchae_publisher` (writes `../portfolio-site/data/status.json`; `--dry-run` prints it). It validates the schema and rejects anything path- or secret-like.
- Then commit it here as `chore(data): refresh agent status snapshot`. On-demand only (decision D1): no background job commits it.
- `sentinel.js` shows a bot as online only if its heartbeat is under 15 minutes old when the page is viewed; older snapshots read "last seen …".

## Build Commands
- Static site; no compilation or bundling required.

## Test Commands
- Same checks as CI: `node --check` on every `*.js` and `aura-store/*.js`; `python tools/check_headings.py` (one h1, no skipped levels); `python tools/check_assets.py` (no duplicate script/stylesheet includes, every local include has `?v=`); `python tools/check_claims.py` (retracted claims stay out; add a pattern whenever a claim is withdrawn).
- Bump `?v=` on every page when shared JS/CSS changes.
- Playwright smoke tests (CI job `smoke`): `cd tests && npm ci && npx playwright install chromium && npx playwright test`. Every page: no console errors or failed requests, no serious/critical axe violations, no sideways scroll at 375 or 768 px, all local links resolve; plus theme toggle, keyboard lightbox, mobile menu, and the Aura search placeholder fitting from 400 to 1280 px. Lives in `tests/` with its own package.json so the site root stays plain static files (`.vercelignore` excludes it).
- Live probe: `python tools/probe_live.py` (also daily in `.github/workflows/live-probe.yml`): routes, /about.html redirect, security headers, and that production serves the repo's `?v=`.
- Accessibility rules: text colours come from tokens (`--text-*`, `--tone-*` darken on light backgrounds); always-dark widgets re-declare the dark tokens; overlays go through `window.portfolioOverlay` (scroll lock, inert background, focus return).

## Important Constraints
- High-density typography and kinetic animations must remain 60fps on mobile and desktop.
- Dark mode aesthetic with strict WCAG contrast compliance.

## Known Issues
- Large static PDF resume and asset links must remain consistent across Vercel route rewrites.

## Security Requirements
- Client-side static code only; never bundle or expose secret API keys in JavaScript files.

## Deployment Information
- Hosted on Vercel (`vercel.json`) with Netlify fallback (`netlify.toml`).
- Remote: `https://github.com/hanslaureles/hanslaureles-portfolio.git` on branch `main`.
