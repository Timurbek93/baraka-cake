import type { LocalizedContactInfo, SiteCopy } from "./site-data";

type MobileStickyCtaProps = {
  copy: SiteCopy;
  contactInfo: LocalizedContactInfo;
};

export function MobileStickyCta({ copy, contactInfo }: MobileStickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-inkBlue/10 bg-cream/92 px-3 py-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2">
        <a
          href={contactInfo.whatsappHref}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="whatsapp_click"
          data-analytics-section="mobile_sticky_cta"
          className="inline-flex items-center justify-center rounded-full bg-inkBlue px-3 py-3 text-xs font-semibold text-milk shadow-card transition hover:bg-turquoise"
        >
          {copy.whatsappButton as string}
        </a>
        <a
          href={contactInfo.telegramHref}
          target="_blank"
          rel="noreferrer"
          data-analytics-event="telegram_click"
          data-analytics-section="mobile_sticky_cta"
          className="inline-flex items-center justify-center rounded-full border border-inkBlue/15 bg-white/72 px-3 py-3 text-xs font-semibold text-inkBlue shadow-card transition hover:border-turquoise hover:text-turquoise"
        >
          {copy.telegramLabel as string}
        </a>
        <a
          href={contactInfo.phoneHref}
          data-analytics-event="call_click"
          data-analytics-section="mobile_sticky_cta"
          className="inline-flex items-center justify-center rounded-full border border-inkBlue/15 bg-white/72 px-3 py-3 text-xs font-semibold text-inkBlue shadow-card transition hover:border-turquoise hover:text-turquoise"
        >
          {copy.callButton as string}
        </a>
      </div>
    </div>
  );
}
