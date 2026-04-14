import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/ui";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const deliveryCards = {
  ru: ["Доставка по городу и ближайшим районам", "Ежедневно с 09:00 до 21:00", "Минимальный заказ и точное время подтверждаются при оформлении"],
  en: ["Delivery in the city and nearby areas", "Every day from 09:00 to 21:00", "Minimum order and exact time are confirmed during checkout"],
  uz: ["Shahar va yaqin hududlarga yetkazib berish", "Har kuni 09:00 dan 21:00 gacha", "Minimal buyurtma va aniq vaqt rasmiylashtirishda tasdiqlanadi"],
} as const;

export default async function LocalizedDeliveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;
  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const localizedContactInfo = getMergedLocalizedContactInfo(currentLocale, payload);

  return (
    <main>
      <Header locale={currentLocale} copy={copy} whatsappHref={localizedContactInfo.whatsappHref} />
      <section className="py-16">
        <Container>
          <p className="inline-flex rounded-full border border-turquoise/20 bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-turquoise">
            {copy.deliveryPageEyebrow as string}
          </p>
          <h1 className="mt-4 font-display text-5xl text-chocolate">{copy.deliveryPageTitle as string}</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {deliveryCards[currentLocale].map((item) => (
              <div key={item} className="rounded-[28px] border border-chocolate/10 bg-milk p-6 shadow-soft">
                <p className="text-sm leading-6 text-chocolate/75">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
