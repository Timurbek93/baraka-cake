import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getCustomCakes } from "@/components/site-data";
import { Container } from "@/components/ui";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const seasonal = {
  ru: ["Сезонные дизайны", "Мини-торты"],
  en: ["Seasonal designs", "Mini cakes"],
  uz: ["Mavsumiy dizaynlar", "Mini tortlar"],
} as const;

const fields = {
  ru: ["Имя и телефон", "Выбор веса", "Начинка", "Декор", "Дата получения", "Комментарий", "WhatsApp / Telegram"],
  en: ["Name and phone", "Weight", "Filling", "Decoration", "Pickup date", "Comment", "WhatsApp / Telegram"],
  uz: ["Ism va telefon", "Og‘irlik", "Nachinka", "Bezak", "Olish sanasi", "Izoh", "WhatsApp / Telegram"],
} as const;

export default async function LocalizedCustomCakesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const localizedContactInfo = getMergedLocalizedContactInfo(currentLocale, payload);
  const customCakes = getCustomCakes(currentLocale);

  return (
    <main>
      <Header locale={currentLocale} copy={copy} whatsappHref={localizedContactInfo.whatsappHref} />
      <section className="border-b border-chocolate/10 bg-[linear-gradient(180deg,rgba(30,143,151,0.08),rgba(250,246,238,0.88))] py-16">
        <Container>
          <p className="inline-flex rounded-full border border-turquoise/20 bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-turquoise">
            {copy.customPageEyebrow as string}
          </p>
          <h1 className="mt-4 font-display text-5xl text-chocolate">{copy.customPageTitle as string}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-chocolate/72">{copy.customPageDescription as string}</p>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {[...customCakes, ...seasonal[currentLocale]].map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-[28px] border border-chocolate/10 bg-milk p-4 shadow-soft">
                  <div className="h-56 rounded-[22px] bg-[linear-gradient(180deg,#fffaf2,#e6cfab)]" />
                  <h2 className="mt-4 font-display text-3xl text-chocolate">{item}</h2>
                </div>
              ))}
            </div>

            <div className="rounded-[32px] border border-chocolate/10 bg-milk p-8 shadow-soft">
              <h2 className="font-display text-4xl text-chocolate">{copy.orderForm as string}</h2>
              <div className="mt-6 space-y-4">
                {fields[currentLocale].map((field) => (
                  <div key={field} className="rounded-2xl border border-chocolate/10 bg-white/70 px-4 py-3 text-sm text-chocolate/72">
                    {field}
                  </div>
                ))}
              </div>
              <button
                data-analytics-event="order_click"
                data-analytics-section="custom_cakes_form"
                className="mt-6 rounded-full bg-inkBlue px-6 py-3 text-sm font-semibold text-milk"
              >
                {copy.submitRequest as string}
              </button>
            </div>
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
