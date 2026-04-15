import { Container } from "@/components/ui";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getMergedCopy, getMergedLocalizedContactInfo, getSiteSettingsPayload } from "@/lib/site-settings";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const currentLocale = locale as Locale;

  const payload = await getSiteSettingsPayload();
  const copy = getMergedCopy(currentLocale, payload);
  const localizedContactInfo = getMergedLocalizedContactInfo(currentLocale, payload);

  return (
    <main>
      <Header locale={currentLocale} copy={copy} whatsappHref={localizedContactInfo.whatsappHref} />
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CheckoutForm locale={currentLocale} />
          </div>
        </Container>
      </section>
      <Footer locale={currentLocale} copy={copy} localizedContactInfo={localizedContactInfo} />
    </main>
  );
}

