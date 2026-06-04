import { BookingButton } from "@/components/BookingButton";
import { INSTAGRAM_URL } from "@/lib/constants";
import { getWhatsAppUrl } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";

type CtaBandProps = {
  ctaBand: Dictionary["ctaBand"];
  locale: Locale;
};

export function CtaBand({ ctaBand, locale }: CtaBandProps) {
  return (
    <section className="cta-band section-air" id="zakaži">
      <div className="wrap cta-band-inner reveal">
        <h2>{ctaBand.title}</h2>
        <p>{ctaBand.text}</p>
        <BookingButton locale={locale} className="cta-band-btn" ariaLabel={ctaBand.ctaAria}>
          {ctaBand.cta}
        </BookingButton>
        <p className="cta-band-contact">
          <span>{ctaBand.addressLabel}</span>
          <span className="cta-band-sep" aria-hidden="true">
            ·
          </span>
          <a
            href={getWhatsAppUrl(undefined, locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              locale === "en"
                ? `${ctaBand.whatsappLabel} via WhatsApp`
                : `${ctaBand.whatsappLabel} preko WhatsApp-a`
            }
          >
            {ctaBand.whatsappLabel}
          </a>
          <span className="cta-band-sep" aria-hidden="true">
            ·
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ctaBand.instagramLabel}${locale === "en" ? ", open profile" : ", otvori profil"}`}
          >
            {ctaBand.instagramLabel}
          </a>
        </p>
        {/* TODO: dodati Google Maps link kad bude dostupan */}
      </div>
    </section>
  );
}
