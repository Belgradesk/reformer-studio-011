import { getPricingWhatsAppUrl } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";

type PricingProps = {
  pricing: Dictionary["pricing"];
  locale: Locale;
  id?: string;
  className?: string;
};

export function Pricing({ pricing, locale, id = "cenovnik", className = "" }: PricingProps) {
  return (
    <section
      className={`pricing section-dense${className ? ` ${className}` : ""}`}
      id={id}
      aria-labelledby="pricing-title"
    >
      <div className="wrap">
        <h2 id="pricing-title" className="reveal">
          {pricing.title}
        </h2>
        <div className="pricing-list">
          {pricing.cards.map((card, i) => (
            <div
              key={card.name}
              className={`pricing-item reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
            >
              <span className="pricing-name">{card.name}</span>
              <span className="pricing-price">{card.price}</span>
              <span className="pricing-desc">{card.desc}</span>
              <a
                href={getPricingWhatsAppUrl(i, locale)}
                className="prog-cta pricing-cta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={card.cta}
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="pricing-note reveal">{pricing.note}</p>
      </div>
    </section>
  );
}
