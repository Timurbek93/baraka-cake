import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "https://baraka-cake.vercel.app";

const locales = ["ru", "uz", "en"];

async function assertOk(page, label) {
  // In Playwright, response is returned from goto().
  const status = page.__lastResponseStatus ?? null;
  if (status && status >= 400) throw new Error(`${label}: HTTP ${status}`);
}

async function getHref(page, selector) {
  const el = await page.$(selector);
  if (!el) return null;
  const href = await el.getAttribute("href");
  return href;
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    extraHTTPHeaders: { "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.8" },
  });

  const results = [];

  for (const loc of locales) {
    // Home
    {
      const resp = await page.goto(`${baseUrl}/${loc}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
      page.__lastResponseStatus = resp?.status() ?? null;
    }
    await page.waitForTimeout(800);
    await assertOk(page, `${loc} home`);

    // Header language toggles exist
    const hasRu = await page.$('a[data-analytics-event="locale_switch"][data-analytics-target-locale="ru"], button[data-analytics-event="locale_switch"][data-analytics-target-locale="ru"]');
    const hasUz = await page.$('a[data-analytics-event="locale_switch"][data-analytics-target-locale="uz"], button[data-analytics-event="locale_switch"][data-analytics-target-locale="uz"]');
    const hasEn = await page.$('a[data-analytics-event="locale_switch"][data-analytics-target-locale="en"], button[data-analytics-event="locale_switch"][data-analytics-target-locale="en"]');
    results.push({ page: `/${loc}`, check: "locale toggles present", ok: !!(hasRu && hasUz && hasEn) });

    // WhatsApp link exists (hero/header button)
    const waHref = await getHref(page, 'a[data-analytics-event="whatsapp_click"]');
    results.push({ page: `/${loc}`, check: "whatsapp href", ok: typeof waHref === "string" && waHref.startsWith("https://wa.me/"), value: waHref });

    // Footer social links
    const tgHref = await getHref(page, 'a[data-analytics-event="telegram_click"]');
    results.push({ page: `/${loc}`, check: "telegram href", ok: typeof tgHref === "string" && tgHref.startsWith("https://t.me/"), value: tgHref });

    const igHref = await getHref(page, 'a[href*="instagram.com"]');
    results.push({ page: `/${loc}`, check: "instagram href", ok: typeof igHref === "string" && igHref.includes("instagram.com"), value: igHref });

    // Catalog page
    {
      const resp = await page.goto(`${baseUrl}/${loc}/catalog`, { waitUntil: "domcontentloaded", timeout: 60_000 });
      page.__lastResponseStatus = resp?.status() ?? null;
    }
    await page.waitForTimeout(800);
    await assertOk(page, `${loc} catalog`);

    // "Details" / "Batafsil" button should navigate to contacts
    const detailsHref = await getHref(page, 'a[data-analytics-section="catalog"][data-analytics-event="order_click"]');
    results.push({ page: `/${loc}/catalog`, check: "details leads to contacts", ok: typeof detailsHref === "string" && detailsHref.endsWith(`/${loc}/contacts`), value: detailsHref });

    // First card image area link (if clickable)
    const imageLink = await getHref(page, 'article a[data-qa="catalog-card-link"]');
    results.push({ page: `/${loc}/catalog`, check: "image/title clickable", ok: typeof imageLink === "string" && imageLink.endsWith(`/${loc}/contacts`), value: imageLink });
  }

  await browser.close();

  // Print summary
  const failed = results.filter((r) => !r.ok);
  console.log(JSON.stringify({ baseUrl, passed: results.length - failed.length, failed: failed.length, failedChecks: failed }, null, 2));
  if (failed.length) process.exit(2);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

