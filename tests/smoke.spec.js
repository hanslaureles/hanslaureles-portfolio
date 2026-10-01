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
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const blocking = results.violations
        .filter((v) => ["serious", "critical"].includes(v.impact))
        .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0].target.join(" ")}`);
      expect(blocking).toEqual([]);
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
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
});
