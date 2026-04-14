import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/ui";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LocalizedLocationsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {copy.locationsEyebrow as string}
          </p>
          <h1 className="mt-4 font-display text-5xl text-chocolate">{copy.locationsTitle as string}</h1>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-chocolate/10 bg-milk p-8 shadow-soft">
              <p className="font-display text-3xl text-chocolate">{copy.mainLocation as string}</p>
              <p className="mt-4 text-base leading-7 text-chocolate/72">{copy.locationsDescription as string}</p>
              <div className="mt-6 space-y-3 text-sm text-chocolate/72">
                <p>{localizedContactInfo.address}</p>
                <p>{localizedContactInfo.workingHours}</p>
                <p>{localizedContactInfo.phone}</p>
              </div>
            </div>
            <div className="rounded-[30px] border border-chocolate/10 bg-[linear-gradient(180deg,#f6ecdc,#e1c89f)] p-4 shadow-soft">
              <div className="h-[360px] rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,rgba(24,64,107,0.12),rgba(30,143,151,0.12),rgba(250,246,238,0.72))]" />
            </div>
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}
