import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getLocalePath, getSiteUrl } from "@/lib/seo";

const localizedPaths = ["", "/catalog", "/custom-cakes", "/delivery", "/contacts", "/locations"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    localizedPaths.map((path) => ({
      url: `${siteUrl}${getLocalePath(locale, path)}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    })),
  );
}
