import type { Locale } from "@/lib/i18n";

export const WHATSAPP_NUMBER = "38163406236";

export const SITE_CONFIG = {
  studioName: "Reformer Studio 011",
  address: "Trg Nikole Pašića 12, Beograd",
  phoneDisplay: "063406236",
  phoneTel: "tel:+38163406236",
  phoneTelLocal: "tel:063406236",
  whatsappNumber: WHATSAPP_NUMBER,
  defaultWhatsappMessage: "Zdravo, želim da zakažem prvi trening",
  defaultWhatsappMessageEn: "Hello, I would like to book my first session",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Trg%20Nikole%20Pa%C5%A1i%C4%87a%2012%2C%20Beograd",
  instagramUrl: "https://www.instagram.com/reformerstudio_011",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reformerstudio011.rs",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// redosled prati pricing.cards u lib/i18n — poruka se bira po indeksu kartice
export const PRICING_WHATSAPP_MESSAGES: Record<Locale, string[]> = {
  sr: [
    "Zdravo! Želim da zakažem probni čas.",
    "Zdravo! Zanima me paket od 8 časova.",
    "Zdravo! Zanima me paket od 10 časova.",
    "Zdravo! Zanima me paket od 12 časova.",
  ],
  en: [
    "Hi! I'd like to book a trial class.",
    "Hi! I'm interested in the 8-class package.",
    "Hi! I'm interested in the 10-class package.",
    "Hi! I'm interested in the 12-class package.",
  ],
};

export const BOOK_SESSION_MESSAGES: Record<Locale, string> = {
  sr: "Zdravo! Želim da zakažem termin.",
  en: "Hi! I'd like to book a session.",
};

export function getWhatsAppUrl(message?: string, locale: Locale = "sr"): string {
  const fallback =
    locale === "en"
      ? SITE_CONFIG.defaultWhatsappMessageEn
      : SITE_CONFIG.defaultWhatsappMessage;
  const text = message ?? fallback;
  return waLink(text);
}

export function getPricingWhatsAppUrl(cardIndex: number, locale: Locale): string {
  const messages = PRICING_WHATSAPP_MESSAGES[locale];
  const message = messages[cardIndex] ?? messages[0];
  return waLink(message);
}
