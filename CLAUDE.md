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

## Build Commands
- Static site; no compilation or bundling required.

## Test Commands
- Same checks as CI: `node --check` on every `*.js` and `aura-store/*.js`; `python tools/check_headings.py` (one h1, no skipped levels); `python tools/check_assets.py` (no duplicate script/stylesheet includes, every local include has `?v=`); `python tools/check_claims.py` (retracted claims stay out; add a pattern whenever a claim is withdrawn).
- Bump `?v=` on every page when shared JS/CSS changes.
- Playwright smoke tests are planned (Phase 3B-2) and not configured yet.

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
