import { Footer } from "@/components/footer";
import { AssetImage } from "@/components/asset-image";
import { Header } from "@/components/header";
import { getCatalogProducts } from "@/lib/catalog-data";
import { Container } from "@/components/ui";
import { formatPriceFromLine } from "@/components/site-data";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";

/** Только те категории, по которым есть товары (порядок как в выдаче каталога). */
function categoriesPresentInCatalog(products: { category: string }[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of products) {
    const c = p.category?.trim();
    if (c && !seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  return out;
}

export default async function LocalizedCatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const localizedContactInfo = getMergedLocalizedContactInfo(currentLocale, payload);
  const catalogProducts = await getCatalogProducts(currentLocale);
  const categories = categoriesPresentInCatalog(catalogProducts);

  return (
    <main>
      <Header locale={currentLocale} copy={copy} whatsappHref={localizedContactInfo.whatsappHref} />
      <section className="khiva-divider border-b border-chocolate/10 bg-[linear-gradient(180deg,rgba(248,243,234,0.9),rgba(232,215,183,0.52))] py-16">
        <Container>
          <p className="inline-flex rounded-full border border-turquoise/20 bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-turquoise">
            {copy.catalogTitle as string}
          </p>
          <h1 className="mt-4 font-display text-5xl text-chocolate">{copy.catalogHeading as string}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-chocolate/72">{copy.catalogDescription as string}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-inkBlue/10 bg-white/65 px-5 py-3 text-sm font-medium text-chocolate/80"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : null}

          <div className={categories.length > 0 ? "mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4" : "grid gap-6 md:grid-cols-2 xl:grid-cols-4"}>
            {catalogProducts.map((product) => (
              <article
                key={product.id}
                className="group rounded-[30px] border border-inkBlue/10 bg-white/68 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-turquoise/30 hover:shadow-soft"
              >
                <div className="relative h-52 overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#fbf5ea,#ead5b3)]">
                  <AssetImage src={product.image} alt={product.imageAlt} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" fallbackLabel={`Upload ${product.image.split("/").pop()}`} />
                  <div className="absolute left-4 top-4 rounded-full border border-white/45 bg-cream/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-inkBlue shadow-card">
                    {product.category}
                  </div>
                </div>
                <h2 className="mt-5 font-display text-3xl text-chocolate">{product.title}</h2>
                <p className="mt-3 text-sm leading-6 text-chocolate/72">{product.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-chocolate/45">
                  <span>{copy.quickPreview as string}</span>
                  <span>{product.slug.replaceAll("-", " ")}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-inkBlue">
                      {formatPriceFromLine(currentLocale, copy.priceFromLabel as string, product.priceFrom)}
                    </p>
                    <p className="text-xs text-chocolate/55">{product.unit}</p>
                  </div>
                  <Link
                    href={`/${currentLocale}/contacts`}
                    data-analytics-event="order_click"
                    data-analytics-section="catalog"
                    data-analytics-label={product.slug}
                    className="rounded-full bg-inkBlue px-4 py-2 text-sm font-semibold text-milk transition hover:bg-turquoise"
                  >
                    {copy.details as string}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
