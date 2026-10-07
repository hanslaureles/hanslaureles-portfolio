// Performance budget (Phase 6D-2). For every page at desktop and mobile width:
//  - first-party page weight (the document plus same-origin files loaded by the end of
//    load + network idle) must stay within WEIGHT_MARGIN of tests/perf-budget.json;
//  - LCP (median of LCP_LOADS cold loads) is reported, and gated once perf-budget.json
//    has a runner baseline for it: fail over max(2x baseline, baseline + 500 ms).
// Third-party requests (Google Fonts) are blocked, so only the repo is measured.
// Accept a deliberate change: UPDATE_BUDGET=1 npx playwright test perf.spec.js, then
// commit tests/perf-budget.json (the diff shows which files grew).
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUDGET_FILE = path.join(__dirname, "perf-budget.json");
const PAGES = ["index.html", "about.html", "404.html", "case-lsfm.html", "case-ciel.html", "case-memory.html",
  "case-aura.html", "case-lumina.html", "case-vellum.html", "case-fintrack.html",
  "aura-store/index.html", "aura-store/checkout.html", "aura-store/confirmation.html"];
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, mobile: { width: 375, height: 812 } };
const WEIGHT_MARGIN = 0.10;
const LCP_LOADS = 3;
const TEXT_FILE = /\.(html|css|js|mjs|json|svg|txt|webmanifest)$/;

// Bytes as git stores them (LF). A Windows checkout with core.autocrlf=true has CRLF
// text files, 1.6-4.3 % heavier per page (measured 2026-10-07); dropping the CRs makes a
// local run measure what CI and Vercel serve. Binary files are never touched.
function carriageReturns(pathname) {
  const file = path.join(ROOT, decodeURIComponent(pathname));
  if (!TEXT_FILE.test(file) || !fs.existsSync(file)) return 0;
  let n = 0;
  for (const byte of fs.readFileSync(file)) if (byte === 13) n++;
  return n;
}

async function load(browser, baseURL, page, viewport) {
  const context = await browser.newContext({ viewport, baseURL }); // a fresh context: a cold load
  try {
    const tab = await context.newPage();
    const origin = new URL(baseURL).origin;
    await context.route(url => url.origin !== origin, route => route.abort());
    await tab.addInitScript(() => {
      window.__lcp = null;
      new PerformanceObserver(list => { for (const e of list.getEntries()) window.__lcp = e.startTime; })
        .observe({ type: "largest-contentful-paint", buffered: true });
    });
    await tab.goto(`/${page}`, { waitUntil: "load" });
    await tab.waitForLoadState("networkidle");
    const { entries, lcp } = await tab.evaluate(o => ({
      entries: [...performance.getEntriesByType("navigation"), ...performance.getEntriesByType("resource")]
        .filter(e => e.name.startsWith(o)).map(e => ({ url: e.name, size: e.decodedBodySize })),
      lcp: window.__lcp,
    }), origin);
    const files = {};
    for (const { url, size } of entries) {
      const pathname = new URL(url).pathname; // ?v= cache-busters are not part of the name
      files[pathname] = (files[pathname] || 0) + size - carriageReturns(pathname);
    }
    return { files, bytes: Object.values(files).reduce((a, b) => a + b, 0), lcp };
  } finally {
    await context.close();
  }
}

const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const kb = bytes => (bytes / 1024).toFixed(1);

test("page weight within budget; LCP reported", async ({ browser }, testInfo) => {
  test.setTimeout(240_000);
  const baseURL = testInfo.project.use.baseURL;
  const budget = JSON.parse(fs.readFileSync(BUDGET_FILE, "utf8"));
  const measured = {};
  const report = [];

  for (const page of PAGES) {
    for (const [vp, viewport] of Object.entries(VIEWPORTS)) {
      const loads = [];
      for (let i = 0; i < LCP_LOADS; i++) loads.push(await load(browser, baseURL, page, viewport));
      const { files, bytes } = loads[0];
      const lcps = loads.map(l => l.lcp).filter(Number.isFinite);
      const lcp = lcps.length ? Math.round(median(lcps)) : null;
      (measured[page] ||= {})[vp] = { bytes, files };
      report.push({ page, vp, kb: +kb(bytes), lcp_ms: lcp });

      const base = budget.pages?.[page]?.[vp];
      if (!process.env.UPDATE_BUDGET) {
        expect.soft(base, `${page} ${vp}: no budget yet (run UPDATE_BUDGET=1)`).toBeTruthy();
        if (base) {
          const limit = Math.floor(base.bytes * (1 + WEIGHT_MARGIN));
          const grown = Object.entries(files)
            .filter(([f, size]) => size > (base.files[f] ?? 0))
            .map(([f, size]) => `${f} ${kb(base.files[f] ?? 0)} -> ${kb(size)} KB`);
          expect.soft(bytes, `${page} ${vp}: ${kb(bytes)} KB is over its budget of ${kb(base.bytes)} KB `
            + `+${WEIGHT_MARGIN * 100}% (${kb(limit)} KB). New or grown: ${grown.join("; ") || "none"}`)
            .toBeLessThanOrEqual(limit);
        }
        const lcpBase = budget.lcp?.[page]?.[vp];
        if (Number.isFinite(lcpBase) && lcp !== null) {
          const lcpLimit = Math.max(2 * lcpBase, lcpBase + 500);
          expect.soft(lcp, `${page} ${vp}: LCP ${lcp} ms is over ${lcpLimit} ms (baseline ${lcpBase} ms)`)
            .toBeLessThanOrEqual(lcpLimit);
        }
      }
    }
  }

  console.log(report.map(r => `${r.page.padEnd(30)} ${r.vp.padEnd(8)} ${String(r.kb).padStart(7)} KB  LCP ${r.lcp_ms} ms`).join("\n"));
  await testInfo.attach("perf.json", { body: JSON.stringify(report, null, 1), contentType: "application/json" });

  if (process.env.UPDATE_BUDGET) {
    fs.writeFileSync(BUDGET_FILE, JSON.stringify({ ...budget, pages: measured }, null, 1) + "\n");
    console.log(`wrote ${BUDGET_FILE}`);
  }
});
