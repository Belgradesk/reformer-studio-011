import { BookingButton } from "@/components/BookingButton";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/constants";
import { getWhatsAppUrl } from "@/config/site";
import type { Dictionary, Locale } from "@/lib/i18n";

type FooterProps = {
  footer: Dictionary["footer"];
  locale: Locale;
};

export function Footer({ footer, locale }: FooterProps) {
  return (
    <footer id="kontakt" className="site-footer">
      <div className="foot-top">
        <div className="foot-col foot-brand reveal">
          <div className="foot-big">
            Reformer
            <br />
            <em>Studio</em> 011
          </div>
          <p className="foot-intro">{footer.intro}</p>
        </div>

        <div className="foot-col foot-contact reveal reveal-d1">
          <h5>{footer.contact}</h5>
          <a
            href={getWhatsAppUrl(undefined, locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${footer.whatsappLabel}, ${footer.phone}`}
          >
            {footer.whatsappLabel}: {footer.phone}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profil studija"
          >
            @reformerstudio_011
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook stranica studija">
            Facebook
          </a>
          <p className="foot-address">{footer.addressLabel}: {footer.location}</p>
          {/* TODO: dodati Google Maps link kad bude dostupan */}
          <BookingButton locale={locale} variant="secondary" className="foot-book-btn" ariaLabel={footer.bookAria}>
            {footer.book}
          </BookingButton>
        </div>

        <div className="foot-col foot-nav reveal reveal-d2">
          <h5>{footer.studio}</h5>
          <a href="#studio">{footer.about}</a>
          <a href="#oprema">{footer.equip}</a>
          <a href="#programi">{footer.programs}</a>
          <a href="#kontakt">{footer.contact}</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Reformer Studio 011</span>
        <span>{footer.tagline}</span>
      </div>
    </footer>
  );
}
