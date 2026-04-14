import { AnalyticsTracker } from "@/components/analytics";
import type { Metadata } from "next";
import { LocaleHtml } from "@/components/locale-html";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { notFound } from "next/navigation";
import { isLocale, Locale, locales } from "@/lib/i18n";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { getAlternates, getLocalePath, siteName } from "@/lib/seo";

/** Читать настройки из БД на каждый запрос (CMS), без обязательной пересборки. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {
      title: "Baraka Cake",
      description: "Baraka Cake bakery website.",
    };
  }

  const currentLocale = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const canonicalPath = getLocalePath(currentLocale);

  return {
    title: copy.brandSubtitle as string,
    description: copy.heroDescription as string,
    alternates: {
      canonical: canonicalPath,
      languages: getAlternates(),
    },
    openGraph: {
      type: "website",
      locale: currentLocale,
      url: canonicalPath,
      siteName,
      title: `${siteName} | ${copy.brandSubtitle as string}`,
      description: copy.heroDescription as string,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteName} ${copy.brandSubtitle as string}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | ${copy.brandSubtitle as string}`,
      description: copy.heroDescription as string,
      images: ["/opengraph-image"],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const loc = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(loc, payload);
  const contactInfo = getMergedLocalizedContactInfo(loc, payload);

  return (
    <div data-locale={loc}>
      <LocaleHtml locale={loc} />
      <AnalyticsTracker locale={loc} />
      {children}
      <MobileStickyCta copy={copy} contactInfo={contactInfo} />
    </div>
  );
}
