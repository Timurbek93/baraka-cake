import { Locale, locales } from "@/lib/i18n";

export const siteName = "Baraka Cake";
export const defaultSiteUrl = "https://barakacake.uz";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
}

export function getLocalePath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function getAlternates(path = "") {
  return Object.fromEntries(locales.map((locale) => [locale, getLocalePath(locale, path)]));
}
