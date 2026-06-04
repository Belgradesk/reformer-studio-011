import type { Locale } from "@/lib/i18n";

export const SITE_CONFIG = {
  studioName: "Reformer Studio 011",
  address: "Trg Nikole Pašića 12, Beograd",
  phoneDisplay: "063/406236",
  phoneTel: "tel:+38163406236",
  whatsappNumber: "38163406236",
  defaultWhatsappMessage: "Zdravo, želim da zakažem prvi trening",
  defaultWhatsappMessageEn: "Hello, I would like to book my first session",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Trg%20Nikole%20Pa%C5%A1i%C4%87a%2012%2C%20Beograd",
  instagramUrl: "https://www.instagram.com/reformerstudio_011",
} as const;

export function getWhatsAppUrl(message?: string, locale: Locale = "sr"): string {
  const fallback =
    locale === "en"
      ? SITE_CONFIG.defaultWhatsappMessageEn
      : SITE_CONFIG.defaultWhatsappMessage;
  const text = message ?? fallback;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
