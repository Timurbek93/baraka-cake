import type { Product } from "@prisma/client";
import { getStaticCatalogProducts } from "@/components/site-data";
import type { Locale } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export type CatalogProductView = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  unit: string;
  priceFrom: string;
  image: string;
  imageAlt: string;
  isPopular: boolean;
};

function mapDbProduct(p: Product, locale: Locale): CatalogProductView {
  const title =
    locale === "ru" ? p.nameRu || p.slug : locale === "en" ? p.nameEn || p.nameRu : p.nameUz || p.nameRu;
  const description =
    locale === "ru" ? p.descRu : locale === "en" ? p.descEn : p.descUz;
  const imageAlt =
    locale === "ru" ? p.imageAltRu || title : locale === "en" ? p.imageAltEn || title : p.imageAltUz || title;
  const image =
    p.imageUrl?.trim() ||
    "/images/products/product-date-caramel-cake.jpg";
  return {
    id: p.id,
    slug: p.slug,
    title,
    description,
    category: p.category ?? "",
    unit: p.unit,
    priceFrom: p.priceFrom,
    image,
    imageAlt,
    isPopular: p.isPopular,
  };
}

type StaticItem = ReturnType<typeof getStaticCatalogProducts>[number];

function mapStaticToView(p: StaticItem): CatalogProductView {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    unit: p.unit,
    priceFrom: p.priceFrom,
    image: p.image,
    imageAlt: p.imageAlt,
    isPopular: p.isPopular,
  };
}

/** Каталог для публичных страниц: БД, иначе статический fallback. */
export async function getCatalogProducts(locale: Locale): Promise<CatalogProductView[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    if (rows.length === 0) {
      return getStaticCatalogProducts(locale).map(mapStaticToView);
    }
    return rows.map((p) => mapDbProduct(p, locale));
  } catch {
    return getStaticCatalogProducts(locale).map(mapStaticToView);
  }
}

/** Блок «популярное» на главной: сначала isPopular, иначе весь каталог (как в статике). */
export async function getFeaturedProductsForHome(locale: Locale): Promise<CatalogProductView[]> {
  const all = await getCatalogProducts(locale);
  const popular = all.filter((p) => p.isPopular);
  const list = popular.length > 0 ? popular : all;
  return list.slice(0, 8);
}
