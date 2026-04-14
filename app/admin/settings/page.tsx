import Link from "next/link";

export const dynamic = "force-dynamic";
import { SiteSettingsEditor } from "@/components/admin/site-settings-editor";
import { getSiteSettingsPayload } from "@/lib/site-settings";

export default async function AdminSettingsPage() {
  const initial = await getSiteSettingsPayload();

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-chocolate">Настройки сайта</h1>
            <p className="mt-1 text-sm text-chocolate/65">
              Контакты; hero слева и справа; CTA; три строки доставки на главной; FAQ; «О нас» — для ru / en / uz. Публичный сайт читает из БД, при пустой/битой записи — значения из кода.
            </p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-turquoise hover:underline">
            ← Админка
          </Link>
        </div>
        <SiteSettingsEditor initial={initial} />
      </div>
    </div>
  );
}
