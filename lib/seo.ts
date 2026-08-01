import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import type { Locale } from "./i18n";

// isti izvor i isti trim kao u app/sitemap.ts
export const BASE_URL = SITE_CONFIG.siteUrl.replace(/\/$/, "");

export const OG_IMAGE = {
  url: `${BASE_URL}/assets/og-image.jpg`,
  width: 1200,
  height: 630,
};

const OG_LOCALES: Record<Locale, string> = {
  sr: "sr_RS",
  en: "en_US",
};

type PageSeo = {
  locale: Locale;
  /** putanja iza jezika, "" za naslovnu ili "/info" */
  path: string;
  title: string;
  description: string;
  imageAlt: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  imageAlt,
}: PageSeo): Metadata {
  const url = `${BASE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "sr-RS": `${BASE_URL}/sr${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}/sr${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      siteName: SITE_CONFIG.studioName,
      url,
      title,
      description,
      images: [{ ...OG_IMAGE, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
