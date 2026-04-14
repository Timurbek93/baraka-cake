import Link from "next/link";

export const dynamic = "force-dynamic";
import { ImportDemoProductsButton } from "@/components/admin/import-demo-products-button";
import { ProductsTable } from "@/components/admin/products-table";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const items = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      slug: true,
      nameRu: true,
      category: true,
      active: true,
      isPopular: true,
      sortOrder: true,
      priceFrom: true,
    },
  });

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-chocolate">Товары</h1>
            <p className="mt-1 text-sm text-chocolate/65">
              Каталог и главная читают активные позиции из БД; если таблица пуста — статический fallback. В списке: порядок, категория, «Популярный», переключение видимости, удаление — правка в форме (в т.ч. URL фото или загрузка в Blob).
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Link href="/admin" className="text-sm font-semibold text-turquoise hover:underline">
              ← Админка
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex rounded-full bg-inkBlue px-5 py-2.5 text-sm font-semibold text-milk hover:bg-turquoise"
            >
              Новый товар
            </Link>
            <ImportDemoProductsButton />
          </div>
        </div>

        <div className="mt-10">
          <ProductsTable initial={items} />
        </div>
      </div>
    </div>
  );
}
