import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-chocolate">Админ-панель</h1>
            <p className="mt-1 text-chocolate/70">Этап 1: вход и каркас. Дальше — настройки, товары, отзывы, загрузка фото.</p>
          </div>
          <AdminLogoutButton />
        </div>

        <p className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/settings" className="inline-flex rounded-full bg-inkBlue px-5 py-2.5 text-sm font-semibold text-milk hover:bg-turquoise">
            Настройки сайта
          </Link>
          <Link href="/admin/products" className="inline-flex rounded-full border border-chocolate/20 bg-white px-5 py-2.5 text-sm font-semibold text-chocolate hover:border-turquoise">
            Товары
          </Link>
          <Link href="/admin/orders" className="inline-flex rounded-full border border-chocolate/20 bg-white px-5 py-2.5 text-sm font-semibold text-chocolate hover:border-turquoise">
            Заказы
          </Link>
        </p>

        <ul className="mt-10 space-y-3 rounded-2xl border border-chocolate/10 bg-milk p-6 text-chocolate/85">
          <li>
            <strong>Этап 2 (часть):</strong> контакты, hero, «О нас» — форма в{" "}
            <Link href="/admin/settings" className="font-semibold text-turquoise hover:underline">
              /admin/settings
            </Link>
            , данные в <code className="text-sm">SiteSettings</code>, публичный сайт читает из БД.
          </li>
          <li>
            <strong>Этап 3:</strong> товары CRUD —{" "}
            <Link href="/admin/products" className="font-semibold text-turquoise hover:underline">
              /admin/products
            </Link>
            ; каталог и блок на главной читают <code className="text-sm">Product</code> из БД (пустая таблица → fallback из кода).
          </li>
          <li>
            <strong>Этап 4–5:</strong> отзывы, галерея, SEO, загрузка файлов в storage / <code className="text-sm">public/uploads</code>.
          </li>
        </ul>

        <p className="mt-8 text-sm text-chocolate/60">
          Настройки сайта и каталог товаров читаются из БД; остальные блоки (FAQ, доставка и т.д.) пока частично из{" "}
          <code className="rounded bg-chocolate/5 px-1">site-data.ts</code>.
        </p>

        <Link href="/ru" className="mt-6 inline-block text-sm font-semibold text-turquoise hover:underline">
          ← На сайт
        </Link>
      </div>
    </div>
  );
}
