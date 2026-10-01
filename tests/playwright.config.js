// Smoke tests run against the site root served as plain static files, the way
// Vercel serves it (cleanUrls aside, so pages are requested as *.html).
const { defineConfig } = require("@playwright/test");

const PORT = 5174;
const python = process.platform === "win32" ? "python" : "python3";

module.exports = defineConfig({
  testDir: ".",
  testMatch: "*.spec.js",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    browserName: "chromium",
  },
  webServer: {
    command: `${python} serve.py ${PORT}`,
    url: `http://127.0.0.1:${PORT}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 20_000,
  },
});
