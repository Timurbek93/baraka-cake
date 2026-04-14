import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3000";
const outDir = process.env.OUT_DIR || path.join(process.cwd(), "tmp", "qa-screens");

const routes = ["/ru", "/uz", "/en", "/ru/catalog", "/uz/catalog", "/en/catalog"];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

function safeName(s) {
  return s.replaceAll("/", "_").replaceAll("__", "_").replace(/^_/, "");
}

async function screenshotRoute(page, route, variant) {
  const url = `${baseUrl}${route}`;
  await page.setViewportSize(viewports[variant]);
  // В dev-режиме "networkidle" может не наступать (HMR/сокеты), поэтому ждём DOM.
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  // небольшая пауза, чтобы дорисовались шрифты/картинки/лейаут
  await page.waitForTimeout(1200);
  const filename = `${variant}__${safeName(route)}.png`;
  await page.screenshot({ path: path.join(outDir, filename), fullPage: true });
  return filename;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results = [];
  for (const route of routes) {
    for (const variant of Object.keys(viewports)) {
      const file = await screenshotRoute(page, route, variant);
      results.push({ route, variant, file });
    }
  }

  await browser.close();

  const indexPath = path.join(outDir, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify({ baseUrl, results }, null, 2));
  console.log(`Saved ${results.length} screenshots to ${outDir}`);
  console.log(indexPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

