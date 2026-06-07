import { BookingButton } from "@/components/BookingButton";
import type { Dictionary, Locale } from "@/lib/i18n";

type CtaBandProps = {
  ctaBand: Dictionary["ctaBand"];
  locale: Locale;
};

export function CtaBand({ ctaBand, locale }: CtaBandProps) {
  return (
    <section className="cta-band" id="zakaži">
      <div className="wrap cta-band-inner reveal">
        <h2>{ctaBand.title}</h2>
        <p>{ctaBand.text}</p>
        <BookingButton locale={locale} className="cta-band-btn" ariaLabel={ctaBand.ctaAria}>
          {ctaBand.cta}
        </BookingButton>
      </div>
    </section>
  );
}
