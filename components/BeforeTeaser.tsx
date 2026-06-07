import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

type BeforeTeaserProps = {
  beforeTeaser: Dictionary["beforeTeaser"];
  locale: Locale;
};

export function BeforeTeaser({ beforeTeaser, locale }: BeforeTeaserProps) {
  return (
    <section className="before-teaser section-dense" aria-labelledby="before-teaser-title">
      <div className="wrap before-teaser-inner">
        <h2 id="before-teaser-title" className="reveal">
          {beforeTeaser.title}
        </h2>
        <p className="before-teaser-body reveal reveal-d1">{beforeTeaser.body}</p>
        <ul className="before-teaser-cards">
          {beforeTeaser.cards.map((item, i) => (
            <li
              key={item}
              className={`before-teaser-card reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="before-teaser-cta reveal">
          <Link href={`/${locale}/info`} className="hero-cta before-teaser-link" data-cursor>
            {beforeTeaser.cta} <span className="arw" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
