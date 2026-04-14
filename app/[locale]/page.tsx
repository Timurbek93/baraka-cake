import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AssetImage } from "@/components/asset-image";
import { KhivaSkyline } from "@/components/khiva-skyline";
import { getFeaturedProductsForHome } from "@/lib/catalog-data";
import { formatPriceFromLine } from "@/components/site-data";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

import { PrimaryButton, SecondaryButton, Section, Container } from "@/components/ui";
import Link from "next/link";

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const localizedContactInfo = getMergedLocalizedContactInfo(currentLocale, payload);
  const heroImageSrc = copy.heroImageUrl?.trim() || "/images/hero/hero-cake.jpg";
  const featuredProducts = await getFeaturedProductsForHome(currentLocale);
  const customCakes = copy.customCakeHighlights;
  const benefits = copy.benefits;
  const deliveryFacts = copy.deliveryFacts;
  const reviews = copy.reviews;
  const aboutGallery = copy.aboutGallery;

  const deliveryItems = copy.deliveryItems;

  return (
    <main>
      <Header locale={currentLocale} copy={copy} whatsappHref={localizedContactInfo.whatsappHref} />

      <section className="khiva-divider relative overflow-hidden border-b border-chocolate/10 bg-[linear-gradient(180deg,#fbf5ea_0%,#ead9b9_58%,#e2cca5_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,191,94,0.18),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(24,63,107,0.12),transparent_24%),linear-gradient(180deg,rgba(255,173,73,0.08),transparent_30%)]" />
        <div className="absolute inset-y-0 left-0 hidden w-[38%] border-r border-white/20 bg-[linear-gradient(180deg,rgba(24,63,107,0.08),transparent)] lg:block" />
        <div className="absolute right-0 top-0 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,170,79,0.22),rgba(255,170,79,0)_70%)] blur-3xl lg:block" />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[128%] w-[68%] lg:block">
          <KhivaSkyline className="h-full w-full opacity-[0.18]" />
        </div>
        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-20">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-inkBlue/15 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-inkBlue">
                {copy.heroEyebrow as string}
              </p>
              <h1 className="max-w-3xl font-display text-[clamp(2.75rem,6vw,4.9rem)] leading-[0.94] text-chocolate">
                {copy.heroTitle as string}
                <span className="block text-turquoise">{copy.heroAccent as string}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-chocolate/76">{copy.heroDescription as string}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href={`/${currentLocale}/catalog`} data-analytics-event="catalog_open" data-analytics-section="hero">
                  {copy.heroPrimaryCta as string}
                </PrimaryButton>
                <a
                  href={localizedContactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="whatsapp_click"
                  data-analytics-section="hero"
                  className="inline-flex items-center justify-center rounded-full border border-inkBlue/15 bg-white/65 px-6 py-3 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise"
                >
                  {copy.heroSecondaryCta as string}
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {(copy.heroQuickFacts as string[]).map((item, index) => (
                  <div key={item} className="rounded-[24px] border border-inkBlue/10 bg-white/65 px-4 py-3 shadow-card">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-turquoise">{`0${index + 1}`}</p>
                    <p className="mt-2 text-sm font-semibold text-chocolate">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-8 top-8 hidden h-40 w-40 rounded-full border border-turquoise/12 lg:block" />
              <div className="rounded-[30px] border border-inkBlue/8 bg-white/48 p-3 shadow-card">
                <div className="overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#fbf5ea,#e4cda7)]">
                  <div className="relative h-[390px] p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-y-0 -right-[6%] hidden w-[116%] lg:block">
                      <KhivaSkyline className="h-full w-full opacity-[0.14]" />
                    </div>
                    <div className="absolute inset-0">
                      <AssetImage src={heroImageSrc} alt={copy.heroImageAlt} sizes="(max-width: 1024px) 100vw, 42vw" fallbackMode="silent" />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,245,234,0.06),rgba(251,245,234,0)_20%,rgba(198,154,99,0.18)_48%,rgba(24,63,107,0.68)_100%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex justify-end">
                        <div className="rounded-full border border-white/35 bg-white/82 px-3 py-1 text-xs font-medium text-chocolate/80 shadow-card">
                          {copy.heroBadge as string}
                        </div>
                      </div>

                      <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(20,34,56,0.18),rgba(255,255,255,0.1))] p-5 backdrop-blur-[10px]">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand">{copy.heroCardEyebrow as string}</p>
                        <p className="mt-3 max-w-md font-display text-3xl leading-tight text-white sm:text-[2.45rem]">{copy.heroTitleCard as string}</p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          {(copy.heroFacts as string[]).map((fact, index) => (
                            <div key={`${index}-${fact.slice(0, 24)}`} className="rounded-[18px] bg-white/88 px-4 py-3 shadow-card">
                              <p className="text-xs uppercase tracking-[0.22em] text-chocolate/50">{(copy.heroFactLabels as string[])[index]}</p>
                              <p className="mt-1 text-sm font-semibold text-chocolate">{fact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 lg:block">
          <KhivaSkyline variant="divider" className="h-full w-full opacity-[0.7]" />
        </div>
      </section>

      <Section eyebrow={copy.featuredEyebrow as string} title={copy.featuredTitle as string} description={copy.featuredDescription as string} className="bg-[linear-gradient(180deg,rgba(248,243,234,0.5),rgba(248,243,234,0))]">
        <div className="grid gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.id} className="group rounded-[30px] border border-inkBlue/10 bg-white/65 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-turquoise/30 hover:shadow-soft">
              <div className="relative mb-5 h-56 overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#fbf5ea,#ead5b3)]">
                <AssetImage src={product.image} alt={product.imageAlt} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" fallbackLabel={`Upload ${product.image.split("/").pop()}`} />
                <div className="absolute left-4 top-4 rounded-full border border-white/45 bg-cream/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkBlue shadow-card">
                  {product.category}
                </div>
              </div>
              <h3 className="font-display text-3xl text-chocolate">{product.title}</h3>
              <p className="mt-3 text-sm leading-6 text-chocolate/72">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-inkBlue">
                    {formatPriceFromLine(currentLocale, copy.priceFromLabel as string, product.priceFrom)}
                  </p>
                  <p className="text-xs text-chocolate/55">{product.unit}</p>
                </div>
                <Link
                  href={`/${currentLocale}/catalog`}
                  data-analytics-event="catalog_open"
                  data-analytics-section="featured_products"
                  className="text-sm font-semibold text-turquoise transition group-hover:text-inkBlue"
                >
                  {copy.viewCatalog as string}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.customEyebrow as string} title={copy.customTitle as string} description={copy.customDescription as string} className="bg-[linear-gradient(180deg,rgba(248,243,234,0.78),rgba(232,215,183,0.34))]">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-inkBlue/10 bg-[linear-gradient(180deg,#efe0c2,#dcc39b)] p-6 shadow-soft">
            <div className="rounded-arch border border-white/70 bg-[linear-gradient(180deg,#fffaf2,#f2e3c7)] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-turquoise">{copy.customFormEyebrow as string}</p>
              <h3 className="mt-4 font-display text-4xl text-chocolate">{copy.customFormTitle as string}</h3>
              <div className="mt-6 space-y-3">
                {(copy.customFormFields as string[]).map((item) => (
                  <div key={item} className="rounded-2xl border border-inkBlue/10 bg-white/78 px-4 py-3 text-sm text-chocolate/75">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <PrimaryButton href={`/${currentLocale}/custom-cakes`} data-analytics-event="custom_cake_open" data-analytics-section="custom_cakes">
                  {copy.openForm as string}
                </PrimaryButton>
                <SecondaryButton href={`/${currentLocale}/contacts`} data-analytics-event="order_click" data-analytics-section="custom_cakes">
                  {copy.contactCta as string}
                </SecondaryButton>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {customCakes.map((item) => (
              <div key={item} className="rounded-[28px] border border-inkBlue/10 bg-white/62 p-6 shadow-card">
                <p className="text-xs uppercase tracking-[0.3em] text-turquoise">{copy.customEyebrow as string}</p>
                <h3 className="mt-3 font-display text-3xl text-chocolate">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow={copy.benefitsEyebrow as string} title={copy.benefitsTitle as string} description={copy.benefitsDescription as string}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, index) => (
            <div key={item} className="rounded-[28px] border border-inkBlue/10 bg-white/62 p-6 shadow-card">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[16px] bg-sand text-sm font-bold text-inkBlue">{`0${index + 1}`}</div>
              <h3 className="font-display text-3xl text-chocolate">{item}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.howOrderEyebrow as string}
        title={copy.howOrderTitle as string}
        description={copy.howOrderDescription as string}
        className="bg-[linear-gradient(180deg,rgba(248,243,234,0.72),rgba(248,243,234,0.2))]"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {(copy.howOrderSteps as { title: string; description: string }[]).map((step, index) => (
            <div key={step.title} className="rounded-[28px] border border-inkBlue/10 bg-white/68 p-6 shadow-card">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[16px] bg-inkBlue text-sm font-bold text-milk">
                0{index + 1}
              </div>
              <h3 className="font-display text-3xl text-chocolate">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-chocolate/72">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton href={`/${currentLocale}/catalog`} data-analytics-event="catalog_open" data-analytics-section="how_to_order">
            {copy.heroPrimaryCta as string}
          </PrimaryButton>
          <SecondaryButton href={`/${currentLocale}/contacts`} data-analytics-event="order_click" data-analytics-section="how_to_order">
            {copy.contactCta as string}
          </SecondaryButton>
        </div>
      </Section>

      <Section eyebrow={copy.deliveryEyebrow as string} title={copy.deliveryTitle as string} description={copy.deliveryDescription as string}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-chocolate/10 bg-milk p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-3">
              {deliveryFacts.map((item) => (
                <div key={item} className="rounded-[24px] border border-inkBlue/10 bg-sand/38 p-4 text-sm leading-6 text-chocolate/75">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {deliveryItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-[22px] border border-inkBlue/10 bg-white/62 p-4 shadow-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-inkBlue text-sm font-bold text-milk">{item.icon}</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-turquoise">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-chocolate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href={`/${currentLocale}/delivery`} data-analytics-event="order_click" data-analytics-section="delivery">
                {copy.deliveryPageEyebrow as string}
              </PrimaryButton>
              <SecondaryButton href={`/${currentLocale}/contacts`} data-analytics-event="order_click" data-analytics-section="delivery">
                {copy.contactCta as string}
              </SecondaryButton>
            </div>
          </div>
          <div className="rounded-[32px] border border-turquoise/20 bg-[linear-gradient(180deg,rgba(30,143,151,0.12),rgba(248,243,234,0.95))] p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.32em] text-turquoise">{copy.deliveryPanelEyebrow as string}</p>
            <div className="mt-6 space-y-4 text-chocolate">
              <p className="font-display text-4xl">{copy.deliveryPanelTitle as string}</p>
                <p className="text-sm leading-6 text-chocolate/72">{copy.deliveryPanelDescription as string}</p>
                <div className="space-y-2 text-sm font-semibold text-inkBlue">
                  <p>{localizedContactInfo.phone}</p>
                  <p>{localizedContactInfo.workingHours}</p>
                </div>
              </div>
            </div>
        </div>
      </Section>

      <Section eyebrow={copy.reviewsEyebrow as string} title={copy.reviewsTitle as string} description={copy.reviewsDescription as string} className="bg-[linear-gradient(180deg,rgba(248,243,234,0.6),rgba(248,243,234,0.18))]">
        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review, reviewIndex) => (
            <blockquote key={`${reviewIndex}-${review.author.slice(0, 24)}`} className="rounded-[30px] border border-inkBlue/10 bg-white/70 p-6 shadow-card">
              <p className="text-base leading-7 text-chocolate/78">“{review.quote}”</p>
              <footer className="mt-6 text-sm font-semibold text-inkBlue">{review.author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.faqEyebrow as string}
        title={copy.faqTitle as string}
        description={copy.faqDescription as string}
      >
        <div className="grid gap-4">
          {copy.faqItems.map((item, faqIndex) => (
            <details
              key={`faq-${faqIndex}-${item.question.slice(0, 32)}`}
              data-analytics-event="faq_open"
              data-analytics-section="faq"
              data-analytics-label={item.question}
              className="rounded-[26px] border border-inkBlue/10 bg-white/72 p-5 shadow-card"
            >
              <summary className="cursor-pointer list-none pr-8 font-display text-2xl text-chocolate marker:hidden">
                {item.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-chocolate/72">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.aboutEyebrow as string} title={copy.aboutTitle as string} description={copy.aboutDescription as string} className="bg-[linear-gradient(180deg,rgba(248,243,234,0.82),rgba(232,215,183,0.48))]">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutGallery.map((item) => (
              <div key={item.title} className="rounded-[30px] border border-inkBlue/10 bg-white/60 p-4 shadow-card">
                <div className="relative h-56 overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,rgba(248,243,234,0.88),rgba(232,215,183,0.95),rgba(24,63,107,0.12))]">
                  <AssetImage src={item.image} alt={item.imageAlt} sizes="(max-width: 768px) 100vw, 33vw" fallbackLabel={`Upload ${item.image.split("/").pop()}`} />
                </div>
                <p className="mt-4 font-display text-3xl text-chocolate">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[32px] border border-inkBlue/10 bg-[linear-gradient(180deg,#183F6B,#215786)] p-8 text-milk shadow-soft">
            <p className="text-xs uppercase tracking-[0.35em] text-sand/70">Baraka Cake</p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-milk/90">
              {(copy.aboutText as string[]).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
