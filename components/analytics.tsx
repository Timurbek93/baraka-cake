"use client";

import Script from "next/script";
import { useEffect } from "react";
import { Locale } from "@/lib/i18n";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsPayload = {
  locale: Locale;
  page: string;
  device: "mobile" | "desktop";
  source_section?: string;
  href?: string;
  target_locale?: string;
  label?: string;
};

function getDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") {
    return "desktop";
  }

  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function track(eventName: string, payload: AnalyticsPayload) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, payload);
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}

export function AnalyticsTracker({ locale }: { locale: Locale }) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest<HTMLElement>("[data-analytics-event]");

      if (!element) {
        return;
      }

      const eventName = element.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      const href = element instanceof HTMLAnchorElement ? element.href : undefined;

      track(eventName, {
        locale,
        page: window.location.pathname,
        device: getDevice(),
        source_section: element.dataset.analyticsSection,
        href,
        target_locale: element.dataset.analyticsTargetLocale,
        label: element.dataset.analyticsLabel,
      });
    };

    const handleToggle = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLDetailsElement) || !target.open) {
        return;
      }

      const eventName = target.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      track(eventName, {
        locale,
        page: window.location.pathname,
        device: getDevice(),
        source_section: target.dataset.analyticsSection,
        label: target.dataset.analyticsLabel,
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("toggle", handleToggle, true);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("toggle", handleToggle, true);
    };
  }, [locale]);

  return null;
}
