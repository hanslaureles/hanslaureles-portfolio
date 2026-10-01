// Portfolio smoke tests (Phase 3B-2). Every page: no console errors, no
// serious/critical axe violations, no horizontal scroll at 375 px, and every
// local link/asset resolves. Plus the interactive checks: theme toggle and a
// keyboard-operable lightbox.
const { test, expect } = require("@playwright/test");
const { default: AxeBuilder } = require("@axe-core/playwright");

const PAGES = [
  "index.html", "about.html", "404.html",
  "case-lsfm.html", "case-ciel.html", "case-memory.html", "case-aura.html",
  "case-lumina.html", "case-vellum.html", "case-fintrack.html",
  "aura-store/index.html", "aura-store/checkout.html", "aura-store/confirmation.html",
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

    test("has no serious or critical axe violations", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      expect(await axeBlocking(page)).toEqual([]);
    });

    test("does not scroll sideways at 375 px", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path, { waitUntil: "networkidle" });
      const { scrollW, innerW } = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
      }));
      expect(scrollW).toBeLessThanOrEqual(innerW);
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