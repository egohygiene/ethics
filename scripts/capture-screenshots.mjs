import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
const origin = "http://127.0.0.1:4176";
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    "4176",
    "--strictPort",
  ],
  { stdio: "ignore" },
);
let browser;
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try {
      const response = await fetch(origin);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Preview is starting. */
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready) throw new Error("Screenshot preview did not start on port 4176.");
  browser = await chromium.launch(
    process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] }
      : {},
  );
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    colorScheme: "dark",
    reducedMotion: "reduce",
    timezoneId: "America/New_York",
  });
  const page = await context.newPage();
  await page.goto(origin);
  await page
    .getByRole("heading", { name: "AI is not one ethical question." })
    .waitFor();
  await mkdir("docs/qa/screenshots", { recursive: true });
  await page.screenshot({ path: "docs/qa/screenshots/desktop-dark.png" });
  await page
    .locator("#dashboard")
    .screenshot({ path: "docs/qa/screenshots/desktop-dashboard.png" });
  await page
    .locator("#workflow")
    .screenshot({ path: "docs/qa/screenshots/desktop-workflow.png" });
  await page
    .locator("#perspectives")
    .screenshot({ path: "docs/qa/screenshots/desktop-perspectives.png" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "docs/qa/screenshots/desktop-light.png" });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "docs/qa/screenshots/mobile-dark.png" });
  await page
    .locator("#workflow")
    .screenshot({ path: "docs/qa/screenshots/mobile-workflow.png" });
  await page.close();
  await context.close();
  console.log(
    "Captured seven production screenshots: desktop dark/light, mobile, dashboard, perspectives, and both workflow layouts.",
  );
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}
