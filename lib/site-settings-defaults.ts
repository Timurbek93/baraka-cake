import {
  contactInfo,
  getAboutGallery,
  getBenefits,
  getCustomCakes,
  getDeliveryFacts,
  getHeroImageMeta,
  getLocalizedContactInfo,
  getReviews,
  localeCopy,
} from "@/components/site-data";
import type { Locale } from "@/lib/i18n";
import type { SiteSettingsPayload } from "./site-settings-schema";

const locales: Locale[] = ["ru", "en", "uz"];

export function buildDefaultSiteSettingsPayload(): SiteSettingsPayload {
  const localesPayload = {} as SiteSettingsPayload["locales"];
  for (const loc of locales) {
    const c = localeCopy[loc];
    const li = getLocalizedContactInfo(loc);
    const heroMeta = getHeroImageMeta(loc);
    localesPayload[loc] = {
      address: li.address,
      workingHours: li.workingHours,

      heroEyebrow: c.heroEyebrow as string,
      heroTitle: c.heroTitle as string,
      heroAccent: c.heroAccent as string,
      heroDescription: c.heroDescription as string,
      heroQuickFacts: [...(c.heroQuickFacts as string[])],
      heroPrimaryCta: c.heroPrimaryCta as string,
      heroSecondaryCta: c.heroSecondaryCta as string,
      heroBadge: c.heroBadge as string,
      heroCardEyebrow: c.heroCardEyebrow as string,
      heroTitleCard: c.heroTitleCard as string,
      heroFacts: [...(c.heroFacts as string[])],
      heroFactLabels: [...(c.heroFactLabels as string[])],
      heroImageUrl: heroMeta.image,
      heroImageAlt: heroMeta.imageAlt,

      featuredEyebrow: c.featuredEyebrow as string,
      featuredTitle: c.featuredTitle as string,
      featuredDescription: c.featuredDescription as string,
      viewCatalog: c.viewCatalog as string,

      customEyebrow: c.customEyebrow as string,
      customTitle: c.customTitle as string,
      customDescription: c.customDescription as string,
      customFormEyebrow: c.customFormEyebrow as string,
      customFormTitle: c.customFormTitle as string,
      customFormFields: [...(c.customFormFields as string[])],
      openForm: c.openForm as string,
      customCakeHighlights: [...getCustomCakes(loc)],

      benefitsEyebrow: c.benefitsEyebrow as string,
      benefitsTitle: c.benefitsTitle as string,
      benefitsDescription: c.benefitsDescription as string,
      benefits: [...getBenefits(loc)],

      howOrderEyebrow: c.howOrderEyebrow as string,
      howOrderTitle: c.howOrderTitle as string,
      howOrderDescription: c.howOrderDescription as string,
      howOrderSteps: [...(c.howOrderSteps as { title: string; description: string }[])],

      deliveryEyebrow: c.deliveryEyebrow as string,
      deliveryTitle: c.deliveryTitle as string,
      deliveryDescription: c.deliveryDescription as string,
      deliveryItems: [...(c.deliveryItems as { label: string; value: string; icon: string }[])],
      deliveryPanelEyebrow: c.deliveryPanelEyebrow as string,
      deliveryPanelTitle: c.deliveryPanelTitle as string,
      deliveryPanelDescription: c.deliveryPanelDescription as string,
      deliveryPageEyebrow: c.deliveryPageEyebrow as string,
      deliveryFacts: [...getDeliveryFacts(loc)],

      reviewsEyebrow: c.reviewsEyebrow as string,
      reviewsTitle: c.reviewsTitle as string,
      reviewsDescription: c.reviewsDescription as string,
      reviews: [...getReviews(loc)],

      faqEyebrow: c.faqEyebrow as string,
      faqTitle: c.faqTitle as string,
      faqDescription: c.faqDescription as string,
      faqItems: [...(c.faqItems as { question: string; answer: string }[])],

      aboutEyebrow: c.aboutEyebrow as string,
      aboutTitle: c.aboutTitle as string,
      aboutDescription: c.aboutDescription as string,
      aboutText: [...(c.aboutText as string[])],
      aboutGallery: getAboutGallery(loc).map((item) => ({ ...item })),

      priceFromLabel: c.priceFromLabel as string,
      contactCta: c.contactCta as string,
    };
  }
  return {
    contacts: {
      phone: contactInfo.phone,
      phoneHref: contactInfo.phoneHref,
      whatsappHref: contactInfo.whatsappHref,
      telegram: contactInfo.telegram,
      telegramHref: contactInfo.telegramHref,
      instagram: contactInfo.instagram,
      instagramHref: contactInfo.instagramHref,
      mapHref: contactInfo.mapHref,
    },
    locales: localesPayload,
  };
}
