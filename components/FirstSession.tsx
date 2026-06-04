import { BookingButton } from "@/components/BookingButton";
import type { Dictionary, Locale } from "@/lib/i18n";

type FirstSessionProps = {
  firstSession: Dictionary["firstSession"];
  locale: Locale;
};

export function FirstSession({ firstSession, locale }: FirstSessionProps) {
  return (
    <section className="first-session section-dense" aria-labelledby="first-session-title">
      <div className="wrap first-session-inner">
        <h2 id="first-session-title" className="reveal">
          {firstSession.title}
        </h2>
        <p className="first-session-intro reveal reveal-d1">{firstSession.intro}</p>
        <ol className="first-session-steps">
          {firstSession.steps.map((step, i) => (
            <li
              key={step.title}
              className={`first-step reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
            >
              <span className="first-step__num">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="first-session-cta reveal">
          <BookingButton locale={locale} ariaLabel={firstSession.ctaAria}>
            {firstSession.cta}
          </BookingButton>
        </div>
      </div>
    </section>
  );
}
