import { cache } from "react";
import { localeCopy } from "@/components/site-data";
import type { SiteCopy } from "@/components/site-data";
import { prisma } from "@/lib/prisma";
import { buildDefaultSiteSettingsPayload } from "@/lib/site-settings-defaults";
import { parseSiteSettingsJson, type LocaleSettingsBlock, type SiteSettingsPayload } from "@/lib/site-settings-schema";
import type { Locale } from "@/lib/i18n";

/** Тексты из `localeCopy` + поля из БД (FAQ, delivery facts, hero-карточка и т.д.). */
export type MergedSiteCopy = SiteCopy & LocaleSettingsBlock;

export const getSiteSettingsPayload = cache(async (): Promise<SiteSettingsPayload> => {
  const defaults = buildDefaultSiteSettingsPayload();
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!row?.data) return defaults;
    const parsed = parseSiteSettingsJson(row.data);
    if (!parsed) return defaults;
    return parsed;
  } catch {
    return defaults;
  }
});

/** Публичный merge: `localeCopy` + сохранённые поля из БД (hero, FAQ, delivery facts, «О нас» и т.д.). */
export function getMergedCopy(locale: Locale, payload: SiteSettingsPayload): MergedSiteCopy {
  const base = localeCopy[locale];
  const ov = payload.locales[locale];
  return { ...base, ...ov };
}

export function getMergedLocalizedContactInfo(locale: Locale, payload: SiteSettingsPayload) {
  const loc = payload.locales[locale];
  return {
    ...payload.contacts,
    address: loc.address,
    workingHours: loc.workingHours,
  };
}
