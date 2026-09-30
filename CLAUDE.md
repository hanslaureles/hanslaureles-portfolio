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
- Automated browser smoke tests: `npx playwright test` (if configured)
- Link and asset check: verify all relative hrefs in case studies.

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
