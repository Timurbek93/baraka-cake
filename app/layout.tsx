import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { defaultLocale } from "@/lib/i18n";
import { getSiteUrl, siteName } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "Современная кондитерская Хивы: торты, десерты, выпечка и доставка по городу.",
  applicationName: siteName,
  alternates: {
    canonical: `/${defaultLocale}`,
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: "Современная кондитерская Хивы: торты, десерты, выпечка и доставка по городу.",
    url: `/${defaultLocale}`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Baraka Cake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "Современная кондитерская Хивы: торты, десерты, выпечка и доставка по городу.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable} bg-sand text-chocolate antialiased`}>
        <GoogleAnalytics />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
