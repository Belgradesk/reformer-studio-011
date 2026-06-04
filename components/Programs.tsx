import { BookingButton } from "@/components/BookingButton";
import type { Dictionary, Locale } from "@/lib/i18n";

type ProgramsProps = {
  programs: Dictionary["programs"];
  locale: Locale;
};

export function Programs({ programs, locale }: ProgramsProps) {
  return (
    <section className="programs section-dense" id="programi">
      <div className="wrap">
        <div className="prog-head">
          <div>
            <div className="eyebrow reveal">
              <span className="label">{programs.eyebrow}</span>
            </div>
            <h2 className="reveal">{programs.title}</h2>
          </div>
        </div>
        <div className="prog-list">
          {programs.items.map((p, i) => (
            <div
              key={p.num}
              className={`prog-item reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
              data-cursor
            >
              <span className="pn">{p.num}</span>
              <span className="ptitle">{p.title}</span>
              <span className="pdesc">{p.desc}</span>
              <BookingButton
                locale={locale}
                variant="secondary"
                className="prog-cta"
                message={p.whatsappMessage}
                ariaLabel={`${programs.ctaAriaPrefix} ${p.title}`}
              >
                {programs.cta}
              </BookingButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
