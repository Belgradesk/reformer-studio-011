import Image from "next/image";
import { BookingButton } from "@/components/BookingButton";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Prebaci na `false` za CRO naslov umesto emotivnog. */
const USE_EMOTIONAL_HEADLINE = true;

type HeroProps = {
  hero: Dictionary["hero"];
  locale: Locale;
};

export function Hero({ hero, locale }: HeroProps) {
  return (
    <header className="hero section-air">
      <div className="hero-copy">
        <p className="hero-eyebrow label">{hero.eyebrow}</p>
        <h1>
          {USE_EMOTIONAL_HEADLINE ? (
            <>
              <span className="ln">
                <i>{hero.emotionalLine1}</i>
              </span>
              <span className="ln">
                <i>{hero.emotionalLine2}</i>
              </span>
            </>
          ) : (
            <span className="ln ln--single">
              <i>{hero.croHeadline}</i>
            </span>
          )}
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-actions">
          <BookingButton locale={locale} ariaLabel={hero.ctaPrimaryAria}>
            {hero.ctaPrimary}
          </BookingButton>
          <a href="#programi" className="hero-secondary-cta" aria-label={hero.ctaSecondary}>
            {hero.ctaSecondary}
            <span className="hero-secondary-cta__arw" aria-hidden="true" />
          </a>
        </div>
        <p className="hero-trust">{hero.trust}</p>
      </div>
      <div className="hero-media">
        <Image
          src="/assets/hero-main.jpg"
          alt={hero.imgAlt}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 50vw"
          className="img-cover hero-img"
        />
      </div>
      <div className="hero-idx">{hero.idx}</div>
      <div className="hero-scroll">{hero.scroll}</div>
    </header>
  );
}
