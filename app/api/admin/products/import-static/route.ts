import { NextResponse } from "next/server";
import { getStaticCatalogProducts } from "@/components/site-data";
import { prisma } from "@/lib/prisma";

/** Одноразово переносит 4 демо-товара из кода в БД (если таблица пуста). */
export async function POST() {
  const count = await prisma.product.count();
  if (count > 0) {
    return NextResponse.json({ error: "В БД уже есть товары" }, { status: 400 });
  }

  const ru = getStaticCatalogProducts("ru");
  const en = getStaticCatalogProducts("en");
  const uz = getStaticCatalogProducts("uz");

  for (let i = 0; i < ru.length; i++) {
    const a = ru[i];
    const b = en[i];
    const c = uz[i];
    await prisma.product.create({
      data: {
        slug: a.slug,
        nameRu: a.title,
        nameEn: b.title,
        nameUz: c.title,
        descRu: a.description,
        descEn: b.description,
        descUz: c.description,
        priceFrom: a.priceFrom,
        unit: a.unit,
        category: a.category,
        imageUrl: a.image,
        imageAltRu: a.imageAlt,
        imageAltEn: b.imageAlt,
        imageAltUz: c.imageAlt,
        isPopular: a.isPopular,
        sortOrder: i,
        active: true,
      },
    });
  }

  return NextResponse.json({ ok: true, imported: ru.length });
}
