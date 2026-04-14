import { z } from "zod";
import { mergeSiteSettingsFromDb } from "@/lib/site-settings-merge";

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const reviewItemSchema = z.object({
  quote: z.string(),
  author: z.string(),
});

const deliveryItemRowSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
});

const howOrderStepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const aboutGalleryItemSchema = z.object({
  title: z.string(),
  image: z.string(),
  imageAlt: z.string(),
});

/** Переопределения по одной локали (храним полный снимок после merge). */
export const localeSettingsBlockSchema = z.object({
  address: z.string(),
  workingHours: z.string(),

  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroAccent: z.string(),
  heroDescription: z.string(),
  heroQuickFacts: z.array(z.string()).max(12),
  heroPrimaryCta: z.string(),
  heroSecondaryCta: z.string(),
  heroBadge: z.string(),
  heroCardEyebrow: z.string(),
  heroTitleCard: z.string(),
  heroFacts: z.array(z.string()).max(8),
  heroFactLabels: z.array(z.string()).max(8),
  heroImageUrl: z.string(),
  heroImageAlt: z.string(),

  featuredEyebrow: z.string(),
  featuredTitle: z.string(),
  featuredDescription: z.string(),
  viewCatalog: z.string(),

  customEyebrow: z.string(),
  customTitle: z.string(),
  customDescription: z.string(),
  customFormEyebrow: z.string(),
  customFormTitle: z.string(),
  customFormFields: z.array(z.string()).max(24),
  openForm: z.string(),
  customCakeHighlights: z.array(z.string()).max(12),

  benefitsEyebrow: z.string(),
  benefitsTitle: z.string(),
  benefitsDescription: z.string(),
  benefits: z.array(z.string()).max(16),

  howOrderEyebrow: z.string(),
  howOrderTitle: z.string(),
  howOrderDescription: z.string(),
  howOrderSteps: z.array(howOrderStepSchema).max(12),

  deliveryEyebrow: z.string(),
  deliveryTitle: z.string(),
  deliveryDescription: z.string(),
  deliveryItems: z.array(deliveryItemRowSchema).max(12),
  deliveryPanelEyebrow: z.string(),
  deliveryPanelTitle: z.string(),
  deliveryPanelDescription: z.string(),
  deliveryPageEyebrow: z.string(),
  deliveryFacts: z.array(z.string()).max(12),

  reviewsEyebrow: z.string(),
  reviewsTitle: z.string(),
  reviewsDescription: z.string(),
  reviews: z.array(reviewItemSchema).max(12),

  faqEyebrow: z.string(),
  faqTitle: z.string(),
  faqDescription: z.string(),
  faqItems: z.array(faqItemSchema).max(30),

  aboutEyebrow: z.string(),
  aboutTitle: z.string(),
  aboutDescription: z.string(),
  aboutText: z.array(z.string()).max(30),
  aboutGallery: z.array(aboutGalleryItemSchema).max(12),

  priceFromLabel: z.string(),
  contactCta: z.string(),
});

export const contactsBlockSchema = z.object({
  phone: z.string(),
  phoneHref: z.string(),
  whatsappHref: z.string(),
  telegram: z.string(),
  telegramHref: z.string(),
  instagram: z.string(),
  instagramHref: z.string(),
  mapHref: z.string(),
});

export const siteSettingsPayloadSchema = z.object({
  contacts: contactsBlockSchema,
  locales: z.object({
    ru: localeSettingsBlockSchema,
    en: localeSettingsBlockSchema,
    uz: localeSettingsBlockSchema,
  }),
});

export type SiteSettingsPayload = z.infer<typeof siteSettingsPayloadSchema>;
export type ContactsBlock = z.infer<typeof contactsBlockSchema>;
export type LocaleSettingsBlock = z.infer<typeof localeSettingsBlockSchema>;

export function parseSiteSettingsJson(raw: string | null | undefined): SiteSettingsPayload | null {
  if (raw == null || raw.trim() === "" || raw.trim() === "{}") return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    const merged = mergeSiteSettingsFromDb(parsed);
    const result = siteSettingsPayloadSchema.safeParse(merged);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
