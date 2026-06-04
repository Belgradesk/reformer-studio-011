import type { Dictionary } from "@/lib/i18n";

type WhyStudioProps = {
  whyStudio: Dictionary["whyStudio"];
};

export function WhyStudio({ whyStudio }: WhyStudioProps) {
  return (
    <section className="why-studio section-dense" aria-labelledby="why-studio-title">
      <div className="wrap why-studio-inner">
        <h2 id="why-studio-title" className="reveal">
          {whyStudio.title}
        </h2>
        <div className="why-strip">
          {whyStudio.items.map((item, i) => (
            <article
              key={item.title}
              className={`why-strip__item${i > 0 ? " why-strip__item--ruled" : ""} reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
            >
              <span className="why-strip__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
