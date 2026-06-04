import type { Dictionary } from "@/lib/i18n";

type ReviewsProps = {
  reviews: Dictionary["reviews"];
};

export function Reviews({ reviews }: ReviewsProps) {
  const [featured, ...secondary] = reviews.items;

  return (
    <section className="reviews testimonials section-air" aria-labelledby="reviews-title">
      <div className="wrap">
        {/* TODO: zameni pravim recenzijama; Google badge ako bude dostupan */}
        <div className="eyebrow reveal">
          <span className="label">{reviews.eyebrow}</span>
        </div>
        <h2 id="reviews-title" className="reveal title">
          {reviews.title}
        </h2>
        <p className="reviews-lead reveal reveal-d1">{reviews.lead}</p>

        <figure className="rev-featured reveal reveal-d2">
          <blockquote className="rev-featured__quote">{featured.quote}</blockquote>
          <figcaption className="rev-featured__author">{featured.author}</figcaption>
        </figure>

        <div className="rev-secondary-grid">
          {secondary.map((r, i) => (
            <figure
              key={r.author}
              className={`rev-secondary reveal${i === 1 ? " reveal-d1" : ""}`}
            >
              <blockquote className="rev-secondary__quote">{r.quote}</blockquote>
              <figcaption className="rev-secondary__author">{r.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
