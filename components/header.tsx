"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteCopy } from "./site-data";
import { getNavItems } from "./site-data";
import { Container } from "./ui";
import { Locale, locales } from "@/lib/i18n";

function localizePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const rest = locales.includes(segments[0] as Locale) ? segments.slice(1) : segments;
  return `/${nextLocale}${rest.length ? `/${rest.join("/")}` : ""}`;
}

type HeaderProps = {
  locale: Locale;
  copy: SiteCopy;
  whatsappHref: string;
};

export function Header({ locale, copy, whatsappHref }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(locale);
  const menuLabels = {
    ru: { open: "Открыть меню", close: "Закрыть меню" },
    en: { open: "Open menu", close: "Close menu" },
    uz: { open: "Menyuni ochish", close: "Menyuni yopish" },
  }[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-chocolate/10 bg-cream/85 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4 lg:min-h-[76px] lg:gap-6">
          <Link href={`/${locale}`} className="flex min-w-0 flex-1 items-center gap-3 lg:max-w-[270px] lg:flex-none xl:max-w-[310px]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] border border-inkBlue/15 bg-[linear-gradient(180deg,rgba(248,243,234,0.95),rgba(232,215,183,0.9))] text-sm font-bold text-inkBlue shadow-card">
              BK
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap font-display text-[1.5rem] leading-none text-chocolate sm:text-[1.65rem]">Baraka Cake</p>
              <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.06em] text-chocolate/55 sm:text-[11px]">
                {copy.brandSubtitle as string}
              </p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[13px] font-medium text-chocolate/80 transition hover:text-inkBlue xl:text-[14px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-inkBlue/10 bg-white/60 p-1">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={localizePath(pathname, item)}
                  data-analytics-event="language_switch"
                  data-analytics-section="header"
                  data-analytics-target-locale={item}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition xl:px-3 ${
                    item === locale ? "bg-inkBlue text-milk" : "text-inkBlue/75 hover:text-inkBlue"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
            <Link
              href={whatsappHref}
              data-analytics-event="whatsapp_click"
              data-analytics-section="header"
              className="hidden rounded-full border border-inkBlue/15 bg-white/70 px-4 py-2.5 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise xl:inline-flex"
            >
              {copy.whatsappButton as string}
            </Link>
            <Link
              href={`/${locale}/catalog`}
              data-analytics-event="catalog_open"
              data-analytics-section="header"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-inkBlue/15 bg-white/72 px-4 py-2.5 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise xl:px-5"
            >
              {copy.menuButton as string}
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? menuLabels.close : menuLabels.open}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-inkBlue/15 bg-white/70 text-chocolate transition hover:border-turquoise hover:text-turquoise lg:hidden"
          >
            <span className="text-lg leading-none">{isMenuOpen ? "×" : "≡"}</span>
          </button>
        </div>

        {isMenuOpen ? (
          <div id="mobile-menu" className="border-t border-chocolate/10 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-chocolate/85 transition hover:bg-white/60 hover:text-inkBlue"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={localizePath(pathname, item)}
                    data-analytics-event="language_switch"
                    data-analytics-section="mobile_menu"
                    data-analytics-target-locale={item}
                    className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                      item === locale ? "bg-inkBlue text-milk" : "bg-white/70 text-inkBlue"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <Link
                href={whatsappHref}
                data-analytics-event="whatsapp_click"
                data-analytics-section="mobile_menu"
                className="inline-flex items-center justify-center rounded-full border border-inkBlue/15 bg-white/70 px-5 py-3 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
              >
                {copy.whatsappButton as string}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                data-analytics-event="catalog_open"
                data-analytics-section="mobile_menu"
                className="inline-flex items-center justify-center rounded-full bg-inkBlue px-5 py-3 text-sm font-semibold text-milk transition hover:bg-turquoise"
              >
                {copy.menuButton as string}
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
