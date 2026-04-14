import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/ui";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LocalizedContactsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {copy.contacts as string}
          </p>
          <h1 className="mt-4 font-display text-5xl text-chocolate">{copy.contactsHeading as string}</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              `${copy.phoneLabel as string}: ${localizedContactInfo.phone}`,
              `${copy.whatsappLabel as string}: ${localizedContactInfo.phone}`,
              `${copy.telegramLabel as string}: ${localizedContactInfo.telegram}`,
              `${copy.instagramLabel as string}: ${localizedContactInfo.instagram}`,
              `${copy.addressLabel as string}: ${localizedContactInfo.address}`,
              `${copy.hoursLabel as string}: ${localizedContactInfo.workingHours}`,
            ].map((item) => (
              <div key={item} className="rounded-[28px] border border-chocolate/10 bg-milk p-6 shadow-soft">
                <p className="text-base text-chocolate/78">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
