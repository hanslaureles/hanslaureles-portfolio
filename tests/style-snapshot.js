// Computed-style snapshot for refactors that must not change how pages look (3E-5).
//   node style-snapshot.js before.json        (from tests/; serves the site root itself)
//   node style-snapshot.js after.json --diff before.json
// For each case study at 1280 and 375 px, in light and dark, records the computed
// styles below for every element, keyed by its DOM path, then (with --diff) prints
// every difference. Animations and transitions are frozen before measuring;
// transition-property is recorded separately, on the unfrozen page.
const { chromium } = require("@playwright/test");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = 5175;
// SNAPSHOT_PAGES=index.html,about.html checks other pages instead.
const PAGES = process.env.SNAPSHOT_PAGES ? process.env.SNAPSHOT_PAGES.split(",") : ["case-ciel.html", "case-memory.html", "case-lsfm.html", "case-aura.html",
               "case-lumina.html", "case-vellum.html", "case-fintrack.html"];
const PROPS = ["color", "background-color", "background-image", "border-top-color", "border-bottom-color",
  "border-left-color", "border-right-color", "border-top-width", "border-bottom-width", "border-left-width",
  "border-right-width", "border-top-style", "border-bottom-style", "border-left-style", "border-top-left-radius",
  "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom",
  "padding-left", "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing",
  "text-align", "text-transform", "white-space", "display", "flex-direction", "flex-wrap", "align-items",
  "justify-content", "gap", "grid-template-columns", "width", "height", "opacity", "box-shadow", "overflow-x",
  "list-style-type", "text-decoration-line", "vertical-align", "position"];

async function snapshot(browser) {
  const out = {};
  for (const page of PAGES) {
    for (const width of [1280, 375]) {
      for (const theme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width, height: 900 } });
        await ctx.addInitScript((t) => { try { localStorage.setItem("hans_portfolio_theme", t); } catch (e) {} }, theme);
        const tab = await ctx.newPage();
        await tab.goto(`http://127.0.0.1:${PORT}/${page}`, { waitUntil: "networkidle" });
        const transitions = await tab.evaluate(() => [...document.querySelectorAll("body *")]
          .map((el) => getComputedStyle(el).transitionProperty));
        await tab.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
        await tab.waitForTimeout(150);
        const rows = await tab.evaluate((props) => {
          const key = (el) => {
            const parts = [];
            for (let e = el; e && e !== document.body; e = e.parentElement) {
              const i = [...e.parentElement.children].indexOf(e);
              parts.unshift(`${e.tagName.toLowerCase()}[${i}]`);
            }
            return parts.join(">");
          };
          return [...document.querySelectorAll("body *")].map((el) => {
            const cs = getComputedStyle(el);
            return [key(el), props.map((p) => cs.getPropertyValue(p))];
          });
        }, PROPS);
        rows.forEach((r, i) => r[1].push(transitions[i]));
        out[`${page} ${width} ${theme}`] = Object.fromEntries(rows);
        await ctx.close();
      }
    }
  }
  return out;
}

function diff(before, after) {
  const names = [...PROPS, "transition-property"];
  let n = 0;
  for (const view of Object.keys(before)) {
    const a = before[view], b = after[view] || {};
    for (const el of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!a[el] || !b[el]) { console.log(`${view} ${el}: element ${a[el] ? "removed" : "added"}`); n++; continue; }
      a[el].forEach((v, i) => {
        if (v !== b[el][i]) { console.log(`${view} ${el} ${names[i]}: ${v} -> ${b[el][i]}`); n++; }
      });
    }
  }
  console.log(`${n} difference(s)`);
}

(async () => {
  const [outFile, flag, beforeFile] = process.argv.slice(2);
  const python = process.platform === "win32" ? "python" : "python3";
  const server = spawn(python, [path.join(__dirname, "serve.py"), String(PORT)], { stdio: "ignore" });
  await new Promise((r) => setTimeout(r, 1200));
  const browser = await chromium.launch();
  try {
    const snap = await snapshot(browser);
    fs.writeFileSync(outFile, JSON.stringify(snap));
    console.log(`wrote ${outFile}: ${Object.keys(snap).length} views`);
    if (flag === "--diff") diff(JSON.parse(fs.readFileSync(beforeFile, "utf8")), snap);
  } finally {
    await browser.close();
    server.kill();
  }
})();
