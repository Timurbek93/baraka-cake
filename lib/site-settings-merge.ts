import type { Locale } from "@/lib/i18n";
import { buildDefaultSiteSettingsPayload } from "@/lib/site-settings-defaults";
import type { SiteSettingsPayload } from "@/lib/site-settings-schema";

const locales: Locale[] = ["ru", "en", "uz"];

/** Сливает сохранённый JSON с полным дефолтом, чтобы старые записи без новых полей не ломали парсер. */
export function mergeSiteSettingsFromDb(raw: unknown): SiteSettingsPayload {
  const defaults = buildDefaultSiteSettingsPayload();
  if (!raw || typeof raw !== "object") return defaults;

  const r = raw as Record<string, unknown>;
  const contacts =
    r.contacts && typeof r.contacts === "object"
      ? { ...defaults.contacts, ...(r.contacts as Record<string, string>) }
      : defaults.contacts;

  const localesOut = { ...defaults.locales };
  for (const loc of locales) {
    const patch = r.locales && typeof r.locales === "object" ? (r.locales as Record<string, unknown>)[loc] : undefined;
    if (patch && typeof patch === "object") {
      localesOut[loc] = { ...defaults.locales[loc], ...(patch as object) } as SiteSettingsPayload["locales"][Locale];
    }
  }

  return { contacts, locales: localesOut };
}
