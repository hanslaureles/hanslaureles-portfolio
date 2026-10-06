// Portfolio smoke tests (Phase 3B-2). Every page: no console errors, no
// serious/critical axe violations, no horizontal scroll at 375 px, and every
// local link/asset resolves. Plus the interactive checks: theme toggle and a
// keyboard-operable lightbox.
const fs = require("fs");
const nodePath = require("path");
const { test, expect } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");

// The policy production sends (vercel.json is the single source). serve.py ignores
// vercel.json, so the CSP test adds the header to each page itself.
const CSP = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "..", "vercel.json"), "utf8"))
  .headers.find((h) => h.source === "/(.*)").headers
  .find((h) => h.key === "Content-Security-Policy").value;

const PAGES = [
  "index.html", "about.html", "404.html",
  "case-lsfm.html", "case-ciel.html", "case-memory.html", "case-aura.html",
  "case-lumina.html", "case-vellum.html", "case-fintrack.html",
  "aura-store/index.html", "aura-store/checkout.html", "aura-store/confirmation.html",
  // The URLs production actually lands on: Vercel redirects /aura-store/index.html and
  // /aura-store/ to /aura-store, where relative URLs resolve against "/" (serve.py routes the same way).
  "aura-store", "aura-store/checkout", "aura-store/confirmation",
];

async function axeBlocking(page, include) {
  let builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]);
  if (include) builder = builder.include(include);
  const results = await builder.analyze();
  return results.violations
    .filter((v) => ["serious", "critical"].includes(v.impact))
    .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0].target.join(" ")}`);
}

// Tab and Shift+Tab, several times each, must never move focus out of the dialog.
async function expectFocusTrapped(page, dialog) {
  for (const key of ["Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab", "Shift+Tab"]) {
    await page.keyboard.press(key);
    await expect(dialog.locator(":focus"), `focus escaped after ${key}`).toHaveCount(1);
  }
}

// Serve every document with the vercel.json CSP enforced and collect violations in window.__csp.
async function enforceCsp(page) {
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation",
      (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI || "(inline)"} ${e.sourceFile || ""}:${e.lineNumber}`));
  });
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), "content-security-policy": CSP } });
  });
}

function trackErrors(page) {
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://127.0.0.1")) errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

for (const path of PAGES) {
  test.describe(path, () => {
    test("loads with no console errors or failed requests", async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(path, { waitUntil: "networkidle" });
      expect(errors).toEqual([]);
    });

    test("loads without violating the Content-Security-Policy in vercel.json", async ({ page }) => {
      await enforceCsp(page);
      await page.goto(path, { waitUntil: "networkidle" });
      expect(await page.evaluate(() => window.__csp)).toEqual([]);
    });

    test("has no serious or critical axe violations", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      expect(await axeBlocking(page)).toEqual([]);
    });

    // 768 px too: the store header scrolled sideways from 641 to 1,040 px, unseen at 375 (3E-10).
    // 320 px: the narrowest common phone width (3E-11).
    for (const width of [320, 375, 768]) {
      test(`does not scroll sideways at ${width} px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 812 });
        await page.goto(path, { waitUntil: "networkidle" });
        const { scrollW, innerW } = await page.evaluate(() => ({
          scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
        }));
        expect(scrollW).toBeLessThanOrEqual(innerW);
      });
    }

    // Visual pass (audit D): 12 px text floor and 24 px link targets (WCAG 2.5.8) at 320 px.
    // SVG text is skipped: its units scale with the drawing.
    test("has no text under 12 px or links under 24 px tall at 320 px", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 812 });
      await page.goto(path, { waitUntil: "networkidle" });
      const { small, tiny } = await page.evaluate(() => {
        const shown = (el) => {
          const cs = getComputedStyle(el);
          return !el.closest("svg") && cs.display !== "none" && cs.visibility !== "hidden" && el.getClientRects().length > 0;
        };
        const small = [];
        for (const el of document.querySelectorAll("body *")) {
          if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || !shown(el)) continue;
          const px = getComputedStyle(el).fontSize;
          if (parseFloat(px) < 11.95) small.push(`${el.tagName.toLowerCase()}.${el.className} ${px}`);
        }
        const tiny = [...document.querySelectorAll("a[href]")]
          .filter((a) => { const r = a.getBoundingClientRect(); return shown(a) && r.width && r.height && r.height < 23.5; })
          .map((a) => `${a.textContent.trim().slice(0, 30)} ${Math.round(a.getBoundingClientRect().height)}px`);
        return { small, tiny };
      });
      expect(small).toEqual([]);
      expect(tiny).toEqual([]);
    });

    test("every local link and asset resolves", async ({ page, request }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const urls = await page.evaluate(() => {
        const attrs = [...document.querySelectorAll("a[href], img[src], source[srcset], link[href], script[src]")]
          .flatMap((el) => {
            if (el.srcset) return el.srcset.split(",").map((s) => s.trim().split(/\s+/)[0]);
            return [el.getAttribute("href") || el.getAttribute("src")];
          });
        return [...new Set(attrs
          .filter((u) => u && !/^(https?:|mailto:|tel:|javascript:|data:|#)/.test(u))
          .map((u) => new URL(u, location.href))
          .filter((u) => u.origin === location.origin)
          .map((u) => u.pathname))];
      });
      const broken = [];
      for (const p of urls) {
        // Vercel's cleanUrls serves /about as about.html; the static server needs the file name.
        const candidates = /\.[a-z0-9]+$/i.test(p) || p.endsWith("/") ? [p] : [p, `${p}.html`];
        let ok = false;
        for (const c of candidates) if ((await request.get(c)).ok()) { ok = true; break; }
        if (!ok) broken.push(p);
      }
      expect(broken).toEqual([]);
    });
  });
}

test("theme toggle switches data-theme and back", async ({ page }) => {
  await page.goto("case-memory.html"); // the page where a duplicate app.js once made this a no-op
  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  await page.locator(".theme-toggle-btn").first().click();
  await expect(html).not.toHaveAttribute("data-theme", before);
  await page.locator(".theme-toggle-btn").first().click();
  await expect(html).toHaveAttribute("data-theme", before);
});

test("lightbox opens from the keyboard, closes with Escape, and returns focus", async ({ page }) => {
  await page.goto("case-aura.html");
  const trigger = page.locator(".gallery-item .lightbox-trigger, .full-width-image .lightbox-trigger").first();
  await trigger.focus();
  await expect(trigger).toBeFocused();
  // Only one dialog may be exposed at a time: closed overlays (Sakura, Sentinel,
  // the drawer) must be hidden from the accessibility tree, so this stays unambiguous.
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(":focus")).toHaveCount(1); // focus moved into the dialog
  await expectFocusTrapped(page, dialog);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile menu exposes its state and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("index.html");
  const button = page.locator(".mobile-menu-btn");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await expectFocusTrapped(page, page.locator(".mobile-drawer"));
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
});

// Overlays are closed when the page-level axe scan runs, so each one is opened
// (with dynamic content rendered) and scanned on its own, in both themes.
const SETTLE_MS = 500; // let open transitions finish so axe sees final colours

for (const scheme of ["light", "dark"]) {
  test.describe(`open overlays pass axe (${scheme})`, () => {
    test.use({ colorScheme: scheme });

    test("Sakura drawer with an answer", async ({ page }) => {
      await page.goto("index.html", { waitUntil: "networkidle" });
      await page.locator(".sakura-floating-trigger").click();
      await expect(page.locator("#sakuraDrawer")).toBeVisible();
      await page.locator("#sakuraSearchInput").fill("multi-agent experience");
      await page.keyboard.press("Enter");
      await expect(page.locator("#sakuraOutput")).not.toBeEmpty();
      await page.waitForTimeout(SETTLE_MS);
      expect(await axeBlocking(page, "#sakuraDrawer")).toEqual([]);
    });

    test("Sentinel modal after a mission replay", async ({ page }) => {
      await page.goto("index.html", { waitUntil: "networkidle" });
      await page.locator("#sentinelToggleBtn").click();
      await page.locator("#sentinelReplayBtn").click();
      await expect(page.locator("#sentinelLogFeed .log-highlight").nth(1)).toBeVisible({ timeout: 10_000 });
      await page.waitForTimeout(SETTLE_MS);
      expect(await axeBlocking(page, "#sentinelModal")).toEqual([]);
    });

    test("mobile drawer", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("index.html", { waitUntil: "networkidle" });
      await page.locator(".mobile-menu-btn").click();
      await page.waitForTimeout(SETTLE_MS);
      expect(await axeBlocking(page, ".mobile-drawer")).toEqual([]);
    });

    test("lightbox", async ({ page }) => {
      await page.goto("case-aura.html", { waitUntil: "networkidle" });
      await page.locator(".lightbox-trigger").first().click();
      await page.waitForTimeout(SETTLE_MS);
      expect(await axeBlocking(page, ".lightbox-modal")).toEqual([]);
    });
  });
}
// 4C: the agent overview reads /data/status.json. It may only say "online" for a heartbeat
// under 15 minutes old at view time, and any bad or missing file must leave the replay intact.
test.describe("agent overview status snapshot", () => {
  const iso = (offsetMs) => new Date(Date.now() + offsetMs).toISOString();
  const MIN = 60_000;
  const badges = (page) => page.locator(".agent-fleet-item .agent-status-badge");

  async function openWith(page, fulfill) {
    const errors = [];
    // Chromium itself logs every failed fetch ("Failed to load resource … 404"); page code
    // cannot suppress that line, so only errors from our scripts count here.
    page.on("console", (m) => m.type() === "error" && !m.text().startsWith("Failed to load resource") && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("**/data/status.json", fulfill);
    await page.goto("index.html", { waitUntil: "networkidle" });
    await page.locator("#sentinelToggleBtn").click();
    return errors;
  }

  const replayCases = {
    "missing (404)": (route) => route.fulfill({ status: 404, body: "" }),
    "not JSON": (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{oops" }),
    "empty body": (route) => route.fulfill({ status: 200, contentType: "application/json", body: "" }),
    "generated in the future": (route) => route.fulfill({ json: {
      schema_version: 1, generated_at: iso(60 * MIN),
      swarm: { sakura: { status: "online", last_heartbeat_utc: iso(60 * MIN) } } } }),
    "wrong schema": (route) => route.fulfill({ json: { schema_version: 2, generated_at: iso(0), swarm: {} } }),
    // Codex 4C FIX: every one of the five agents must be present and well-formed.
    "missing an agent": (route) => route.fulfill({ json: { schema_version: 1, generated_at: iso(-MIN), swarm: {
      sakura: { status: "online", last_heartbeat_utc: iso(-MIN) },
      chaewon: { status: "online", last_heartbeat_utc: iso(-MIN) },
      kazuha: { status: "online", last_heartbeat_utc: iso(-MIN) },
      yunjin: { status: "online", last_heartbeat_utc: iso(-MIN) } } } }),
    "an agent with an unknown status": (route) => route.fulfill({ json: { schema_version: 1, generated_at: iso(-MIN), swarm: {
      sakura: { status: "online", last_heartbeat_utc: iso(-MIN) },
      chaewon: { status: "online", last_heartbeat_utc: iso(-MIN) },
      kazuha: { status: "online", last_heartbeat_utc: iso(-MIN) },
      yunjin: { status: "online", last_heartbeat_utc: iso(-MIN) },
      eunchae: { status: "great", last_heartbeat_utc: iso(-MIN) } } } }),
    "an agent with a bad heartbeat date": (route) => route.fulfill({ json: { schema_version: 1, generated_at: iso(-MIN), swarm: {
      sakura: { status: "online", last_heartbeat_utc: iso(-MIN) },
      chaewon: { status: "online", last_heartbeat_utc: iso(-MIN) },
      kazuha: { status: "online", last_heartbeat_utc: iso(-MIN) },
      yunjin: { status: "online", last_heartbeat_utc: iso(-MIN) },
      eunchae: { status: "online", last_heartbeat_utc: "yesterday" } } } }),
  };
  for (const [name, fulfill] of Object.entries(replayCases)) {
    test(`keeps the scripted replay when the snapshot is ${name}`, async ({ page }) => {
      const errors = await openWith(page, fulfill);
      await expect(page.locator("#agentOverviewSourceVal")).toHaveText("REPLAY");
      await expect(badges(page)).toHaveText(Array(5).fill("● LOCAL"));
      expect(errors).toEqual([]);
    });
  }

  test("says online only for fresh heartbeats", async ({ page }) => {
    const errors = await openWith(page, (route) => route.fulfill({ json: {
      schema_version: 1,
      generated_at: iso(-1 * MIN),
      swarm: {
        sakura: { status: "online", last_heartbeat_utc: iso(-2 * MIN) },       // fresh
        chaewon: { status: "online", last_heartbeat_utc: iso(-20 * MIN) },     // was online, now too old
        kazuha: { status: "offline", last_heartbeat_utc: null },
        yunjin: { status: "not_ready", last_heartbeat_utc: iso(-1 * MIN) },
        eunchae: { status: "online", last_heartbeat_utc: iso(2 * MIN) },       // from the future, within clock skew (Codex 4C FIX)
      },
      llm_latency: { p50_ms: 736.3, p95_ms: 6177.1, sample_count: 50, measured_on: "2026-10-02",
        source: "bench/results/2026-10-02-telemetry.json" },
      missions: { application_packages: 0, window_days: 7, source: "memory/applications_log.md" },
    } }));
    // DOM order: sakura, chaewon, kazuha, yunjin, eunchae
    await expect(badges(page)).toHaveText(
      ["● ONLINE", "LAST SEEN 20 MIN AGO", "OFFLINE", "● STARTING", "UNKNOWN"]);
    await expect(page.locator("#agentOverviewAgentsVal")).toHaveText("1/5 ONLINE");
    await expect(page.locator("#agentOverviewSourceSub")).toHaveText("Published 1 min ago");
    await expect(page.locator("#agentOverviewMeta")).toContainText("p50 736 ms, p95 6,177 ms (N=50, measured 2026-10-02)");
    expect(errors).toEqual([]);
  });
});

// 3E-10: the search field showed "Sear…" on phones. Its placeholder must fit whole.
test("Aura store search shows its whole placeholder from 400 to 1280 px", async ({ page }) => {
  await page.goto("aura-store/index.html", { waitUntil: "networkidle" });
  for (const width of [400, 480, 520, 521, 768, 1280]) {
    await page.setViewportSize({ width, height: 812 });
    const { have, need } = await page.locator(".search-bar-pill input").evaluate((input) => {
      const cs = getComputedStyle(input);
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      return { have: input.clientWidth, need: Math.ceil(ctx.measureText(input.placeholder).width) };
    });
    expect(have, `search input at ${width} px`).toBeGreaterThanOrEqual(need);
  }
});

// Audit D: Aura is touch-first, so search and the way back get 44 px targets on phones,
// and the promo strip stays short enough at 320 px to leave the hero on the first screen.
test("Aura store has 44 px search/back targets and a short promo strip at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto("aura-store/index.html", { waitUntil: "networkidle" });
  const h = (sel) => page.locator(sel).evaluate((el) => el.getBoundingClientRect().height);
  expect(await h(".search-bar-pill input")).toBeGreaterThanOrEqual(44);
  expect(await h('a[href="/case-aura.html"]')).toBeGreaterThanOrEqual(44);
  expect(await h(".promo-strip")).toBeLessThanOrEqual(120); // was 195 px, now ~98 px
});

// Codex 2026-10-06: `help` advertised `matrix`, which had no handler. Every command help lists must run.
test("every command listed by help runs", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = () => null;                    // github, resume: no new tabs in the test
    HTMLAnchorElement.prototype.click = () => {}; // resume: no download
  });
  await page.goto("index.html", { waitUntil: "domcontentloaded" });
  const input = page.locator("#terminal-input");
  const run = async (cmd) => { await input.fill(cmd); await input.press("Enter"); };
  await run("help");
  const cmds = await page.locator("#terminal-output .term-table .term-highlight").allInnerTexts();
  expect(cmds.length).toBeGreaterThan(5);
  const dead = [];
  for (const cmd of cmds.map((c) => c.trim())) {
    if (cmd === "sakura") continue; // opens the Sakura drawer over the terminal; covered by the overlay tests
    await run("clear");
    await run(cmd);
    if (/command not found/.test(await page.locator("#terminal-output").innerText())) dead.push(cmd);
  }
  expect(dead).toEqual([]);
});

// Audit D: one chip per command, and at most 8 chips (choice overload); `help` lists the rest.
test("terminal quick-command chips are unique, at most 8, and include help", async ({ page }) => {
  await page.goto("index.html", { waitUntil: "domcontentloaded" });
  const cmds = await page.locator(".term-chip").evaluateAll((els) => els.map((el) => el.dataset.cmd));
  expect(cmds.length).toBe(new Set(cmds).size);
  expect(cmds.length).toBeLessThanOrEqual(8);
  expect(cmds).toContain("help");
});

// At /aura-store a relative "styles.css" or "index.html" resolves to the portfolio's own
// files, so the link check above passes while the store is unstyled and "home" leaves it.
for (const path of ["aura-store", "aura-store/checkout", "aura-store/confirmation"]) {
  test(`${path} uses the store's stylesheet and links home inside the store`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const { sheets, home } = await page.evaluate(() => ({
      sheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => new URL(l.href).pathname),
      home: new URL(document.querySelector(".brand-logo").href).pathname,
    }));
    expect(sheets).toContain("/aura-store/styles.css");
    expect(home).toMatch(/^\/aura-store(\/|\/index\.html)?$/);
  });
}

// 5C (Codex 5A NOTE P2): the six payment options were <div>s, reachable by mouse only.
test("Aura checkout payment options are a keyboard-operable radio group", async ({ page }) => {
  await page.goto("aura-store/checkout.html", { waitUntil: "networkidle" });
  const group = page.getByRole("radiogroup", { name: "Select Payment Method" });
  const radios = group.getByRole("radio");
  await expect(radios).toHaveCount(6);
  await expect(group.getByRole("radio", { name: "GCash E-Wallet" })).toBeChecked();
  await group.getByRole("radio", { name: "GCash E-Wallet" }).focus();
  await page.keyboard.press("ArrowRight");
  const maya = group.getByRole("radio", { name: "Maya Wallet / QR" });
  await expect(maya).toBeChecked();
  await expect(maya).toBeFocused();
  await expect(page.locator('.payment-method-pill[data-method="maya"]')).toHaveClass(/active/);
  await expect(page.locator('.payment-method-pill[data-method="gcash"]')).not.toHaveClass(/active/);
  // The focused option must show a visible focus ring.
  const outline = await page.locator('.payment-method-pill[data-method="maya"]').evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
});

// 5E-1: the index card title morphs into its case-study <h1> (cross-document view transition).
const CASE_SLUGS = ["lsfm", "ciel", "memory", "aura", "lumina", "vellum", "fintrack"];
const vtNames = (page) => page.evaluate(() => [...document.querySelectorAll("*")]
  .map((el) => getComputedStyle(el).viewTransitionName).filter((n) => n && n !== "none"));

test.describe("view transitions between index and case studies", () => {
  test("the index gives each card title its own transition name", async ({ page }) => {
    await page.goto("index.html", { waitUntil: "domcontentloaded" });
    const names = await vtNames(page);
    expect(names.length).toBe(new Set(names).size); // a duplicate name makes the browser skip the transition
    for (const slug of CASE_SLUGS) {
      const name = await page.locator(`article:not(.is-clone) .card-title-link[href="case-${slug}.html"] h3`)
        .evaluate((el) => getComputedStyle(el).viewTransitionName);
      expect(name, slug).toBe(`case-${slug}-title`);
    }
  });

  for (const slug of CASE_SLUGS) {
    test(`case-${slug}: the <h1> shares the card's name, once`, async ({ page }) => {
      await page.goto(`case-${slug}.html`, { waitUntil: "domcontentloaded" });
      const names = await vtNames(page);
      expect(names.length).toBe(new Set(names).size);
      expect(await page.locator("h1.case-title").evaluate((el) => getComputedStyle(el).viewTransitionName))
        .toBe(`case-${slug}-title`);
    });
  }

  // The real thing: clicking a card title starts a view transition on the case page
  // (pagereveal carries one), and reduced motion gets a plain navigation.
  for (const motion of ["no-preference", "reduce"]) {
    test(`clicking a card title ${motion === "reduce" ? "does not start" : "starts"} a view transition (${motion})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: motion });
      await page.addInitScript(() => {
        window.addEventListener("pagereveal", (e) => { window.__vt = Boolean(e.viewTransition); });
      });
      await page.goto("index.html", { waitUntil: "networkidle" });
      await page.locator('article:not(.is-clone) .card-title-link[href="case-memory.html"]').click();
      await page.waitForURL(/case-memory/);
      await expect.poll(() => page.evaluate(() => window.__vt)).toBe(motion !== "reduce");
    });
  }

  test("navigation transitions are opted in only without reduced motion", async ({ page }) => {
    await page.goto("index.html", { waitUntil: "domcontentloaded" });
    const where = await page.evaluate(() => {
      const found = [];
      const walk = (rules, media) => {
        for (const r of rules) {
          if (r.cssRules && r.media) walk(r.cssRules, r.media.mediaText);
          else if (r.cssText.startsWith("@view-transition")) found.push(media || "top level");
        }
      };
      for (const sheet of document.styleSheets) {
        try { walk(sheet.cssRules, null); } catch (e) { /* cross-origin font sheet */ }
      }
      return found;
    });
    expect(where).toEqual(["(prefers-reduced-motion: no-preference)"]);
  });
});

// 5E-2: a 2 px reading-progress line at the top of case pages, driven by scroll (CSS only).
for (const motion of ["no-preference", "reduce"]) {
  test(`case pages show a reading-progress bar that follows scroll (${motion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    const scaleX = () => page.evaluate(() => {
      const cs = getComputedStyle(document.body, "::before");
      if (cs.content === "none" || cs.position !== "fixed") return null;
      const m = cs.transform.match(/matrix\(([^,]+)/);
      return m ? Number(m[1]) : (cs.transform === "none" ? 1 : null);
    });
    await page.goto("case-lsfm.html", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    expect(await scaleX()).toBeLessThan(0.02);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(200);
    expect(await scaleX()).toBeGreaterThan(0.98);
    for (const other of ["index.html", "aura-store/index.html"]) {
      await page.goto(other, { waitUntil: "domcontentloaded" });
      expect(await scaleX(), other).toBeNull();
    }
  });
}

// Aura demo store (its own store.js, not app.js): customizer modal and cart drawer.
test.describe("Aura store overlays", () => {
  test("customizer: keyboard open, focus inside and trapped, Escape returns focus", async ({ page }) => {
    await page.goto("aura-store/index.html", { waitUntil: "networkidle" });
    await expect(page.getByRole("dialog")).toHaveCount(0); // nothing exposed while closed
    const trigger = page.locator(".card-add-pill").first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.locator("#customizer-modal");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(":focus")).toHaveCount(1);
    await expectFocusTrapped(page, dialog);
    await page.waitForTimeout(SETTLE_MS);
    expect(await axeBlocking(page, "#customizer-modal")).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("cart drawer: hidden while closed, keyboard open, trapped, Escape returns focus", async ({ page }) => {
    await page.goto("aura-store/index.html", { waitUntil: "networkidle" });
    const drawer = page.locator("#cart-drawer");
    await expect(drawer).toBeHidden();
    const trigger = page.locator("#cart-trigger");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Shopping Bag" })).toBeVisible();
    await expect(drawer.locator(":focus")).toHaveCount(1);
    await expectFocusTrapped(page, drawer);
    await page.waitForTimeout(SETTLE_MS);
    expect(await axeBlocking(page, "#cart-drawer")).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

// Phase 5A: with the vercel.json CSP enforced (no 'unsafe-inline' for scripts), the page
// scripts and the Aura handlers must still work, and nothing may raise a violation.
test.describe("page scripts and Aura handlers work under the enforced CSP", () => {
  test.beforeEach(async ({ page }) => {
    await enforceCsp(page);
    await page.addInitScript(() => {
      window.__copied = [];
      window.alert = () => {};
      Object.defineProperty(navigator, "clipboard",
        { configurable: true, value: { writeText: async (t) => { window.__copied.push(t); } } });
    });
  });
  test.afterEach(async ({ page }) => {
    expect(await page.evaluate(() => window.__csp)).toEqual([]);
  });

  test("about: the git view toggle switches views", async ({ page }) => {
    await page.goto("about.html");
    await page.locator("#btnViewGit").click();
    await expect(page.locator("#experience-git-view")).toBeVisible();
    await expect(page.locator("#btnViewGit")).toHaveAttribute("aria-selected", "true");
  });

  test("case-ciel: a demo chip shows its sample reply", async ({ page }) => {
    await page.goto("case-ciel.html");
    await page.locator('.ciel-chip[data-query="weather"]').click();
    await expect(page.locator("#ciel-demo-output")).toContainText("wttr.in");
  });

  test("case-memory: the recall demo runs on load and from a chip", async ({ page }) => {
    await page.goto("case-memory.html");
    await expect(page.locator("#demo-output")).toContainText("MATCHING LESSONS");
    const chip = page.locator(".memory-chip").first();
    await chip.click();
    await expect(page.locator("#demo-query-input")).toHaveValue(await chip.getAttribute("data-query"));
    await expect(page.locator("#demo-output")).toContainText("MATCHING LESSONS");
    // Codex 5A A6: a query that matches nothing is echoed as text, never parsed as HTML.
    await page.locator("#demo-query-input").fill("<qqzzy>qqzzx</qqzzy>");
    await page.locator("#demo-run-btn").click();
    await expect(page.locator("#demo-output")).toContainText('matched for "<qqzzy>qqzzx</qqzzy>"');
    await expect(page.locator("#demo-output qqzzy")).toHaveCount(0);
  });

  test("Aura store: promo code copies and nav links filter the menu", async ({ page }) => {
    await page.goto("aura-store/index.html");
    await page.locator(".promo-code").click();
    await expect.poll(() => page.evaluate(() => window.__copied)).toEqual(["AURASIP"]);
    await page.locator(".nav-menu .nav-link", { hasText: "Iced Brews" }).click();
    await expect(page.locator('.category-pill[data-category="iced"]')).toHaveClass(/active/);
  });

  test("Aura checkout: autofill, payment, courier, and express pay to the receipt", async ({ page }) => {
    await page.goto("aura-store/checkout.html");
    await page.locator(".demo-fill-btn").click();
    await expect(page.locator("#email")).not.toHaveValue("");
    await page.locator('[data-method="card"]').click();
    await expect(page.locator('[data-method="card"]')).toHaveClass(/active/);
    await expect(page.locator('[data-method="gcash"]')).not.toHaveClass(/active/);
    await page.locator('input[name="courier"][value="express"]').check();
    await expect(page.locator("#sum-delivery")).toHaveText("₱120.00");
    await page.getByRole("button", { name: "Pay with Maya" }).click();
    await expect(page).toHaveURL(/confirmation/);
    await expect(page.locator("#receipt-payment")).toContainText("MAYA");
  });
});

// 5A-6: the CSP crawl as a test. Every visible button / summary / role=button on every page is
// clicked once under the enforced policy; any violation on any document fails (a re-added
// onclick= shows up as script-src-attr).
for (const path of PAGES.filter((p) => p.endsWith(".html"))) {
  test(`${path}: clicking every control raises no CSP violation`, async ({ page }) => {
    test.setTimeout(120_000);
    const hits = [];
    await page.exposeBinding("__cspReport", (_, v) => hits.push(v));
    await enforceCsp(page);
    await page.addInitScript(() => {
      window.open = () => null;
      window.alert = () => {};
      HTMLAnchorElement.prototype.click = function () {}; // downloads
      document.addEventListener("securitypolicyviolation",
        (e) => window.__cspReport(`${location.pathname} ${e.violatedDirective} ${e.sourceFile || ""}:${e.lineNumber}`));
    });
    page.on("dialog", (d) => d.dismiss().catch(() => {}));
    const controls = "button:visible, summary:visible, [role=button]:visible";
    await page.goto(path, { waitUntil: "networkidle" });
    const start = page.url();
    const n = Math.min(await page.locator(controls).count(), 60);
    for (let i = 0; i < n; i++) {
      if (page.url() !== start) await page.goto(path, { waitUntil: "networkidle" });
      await page.locator(controls).nth(i).click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(100);
      await page.keyboard.press("Escape").catch(() => {});
    }
    expect(hits).toEqual([]);
  });
}
