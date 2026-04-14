import Link from "next/link";
import type { LocalizedContactInfo, SiteCopy } from "./site-data";
import { getNavItems } from "./site-data";
import { Container } from "./ui";
import { Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  copy: SiteCopy;
  localizedContactInfo: LocalizedContactInfo;
};

export function Footer({ locale, copy, localizedContactInfo }: FooterProps) {
  const navItems = getNavItems(locale);

  return (
    <footer className="khiva-divider border-t border-chocolate/10 bg-[linear-gradient(180deg,rgba(232,215,183,0.95),rgba(214,191,150,0.92))] pb-24 md:pb-0">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.05fr_0.75fr_0.9fr]">
          <div className="space-y-5">
            <div>
              <p className="font-display text-3xl text-chocolate">Baraka Cake</p>
              <p className="mt-2 text-sm leading-6 text-chocolate/75">{copy.footerDescription as string}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex rounded-full bg-inkBlue px-5 py-2.5 text-sm font-semibold text-milk transition hover:bg-turquoise"
              >
                {copy.heroPrimaryCta as string}
              </Link>
              <Link
                href={`/${locale}/custom-cakes`}
                className="inline-flex rounded-full border border-inkBlue/15 bg-white/70 px-5 py-2.5 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
              >
                {copy.orderCake as string}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold uppercase tracking-[0.28em] text-chocolate/60">{copy.quickLinks as string}</p>
            <div className="flex flex-col gap-2 text-sm text-chocolate/80">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-inkBlue">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-sm text-chocolate/75">
            <p className="font-semibold uppercase tracking-[0.28em] text-chocolate/60">{copy.contacts as string}</p>
            <div className="rounded-[26px] border border-white/40 bg-white/32 p-5 shadow-card">
              <a href={localizedContactInfo.phoneHref} className="block font-semibold hover:text-inkBlue">
                {localizedContactInfo.phone}
              </a>
              <a href={localizedContactInfo.mapHref} target="_blank" rel="noreferrer" className="mt-3 block hover:text-inkBlue">
                {localizedContactInfo.address}
              </a>
              <p className="mt-2">{localizedContactInfo.workingHours}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={localizedContactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-inkBlue/15 bg-cream/80 px-3 py-2 text-xs font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
                >
                  {copy.whatsappButton as string}
                </a>
                <a
                  href={localizedContactInfo.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-inkBlue/15 bg-cream/80 px-3 py-2 text-xs font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
                >
                  {copy.telegramLabel as string}
                </a>
                <a
                  href={localizedContactInfo.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-inkBlue/15 bg-cream/80 px-3 py-2 text-xs font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
                >
                  {copy.instagramLabel as string}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-chocolate/10 py-8 text-xs text-chocolate/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Baraka Cake · {copy.brandSubtitle as string}</p>
          <Link href={`/${locale}/contacts`} className="font-semibold text-inkBlue transition hover:text-turquoise">
            {copy.catalogTitle as string}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
