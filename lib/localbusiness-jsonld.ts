import { SITE_CONFIG } from "@/config/site";
import { FACEBOOK_URL, INSTAGRAM_URL } from "./constants";
import { BASE_URL, OG_IMAGE } from "./seo";

type PricingCard = { name: string; price: string; desc: string };

// "2.000 RSD" (sr) i "2,000 RSD" (en) -> 2000
function toAmount(price: string): number | null {
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

export function localBusinessJsonLd(locale: string, cards: PricingCard[]) {
  const priced = cards
    .map((card) => ({ card, amount: toAmount(card.price) }))
    .filter((entry): entry is { card: PricingCard; amount: number } => entry.amount !== null);

  const amounts = priced.map((entry) => entry.amount);

  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${BASE_URL}/#studio`,
    name: SITE_CONFIG.studioName,
    url: `${BASE_URL}/${locale}`,
    image: OG_IMAGE.url,
    telephone: SITE_CONFIG.phoneTel.replace(/^tel:/, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Trg Nikole Pašića 12",
      addressLocality: "Beograd",
      addressCountry: "RS",
    },
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL.split("?")[0]],
    priceRange: amounts.length
      ? `${Math.min(...amounts)}–${Math.max(...amounts)} RSD`
      : undefined,
    makesOffer: priced.map(({ card, amount }) => ({
      "@type": "Offer",
      name: card.name,
      description: card.desc,
      price: String(amount),
      priceCurrency: "RSD",
      availability: "https://schema.org/InStock",
    })),
  };
}
