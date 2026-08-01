import { localBusinessJsonLd } from "@/lib/localbusiness-jsonld";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  cards: { name: string; price: string; desc: string }[];
};

export function LocalBusinessJsonLd({ locale, cards }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessJsonLd(locale, cards)),
      }}
    />
  );
}
