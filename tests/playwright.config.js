const { defineConfig } = require("@playwright/test");

const PORT = 5174;

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
    command: `npm --prefix .. run build && npm --prefix .. run start -- -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
