import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL_LOCAL } from "@/lib/constants";
import type { Dictionary, Locale } from "@/lib/i18n";

type FooterProps = {
  footer: Dictionary["footer"];
  locale: Locale;
};

export function Footer({ footer, locale }: FooterProps) {
  const whatsappUrl = getWhatsAppUrl(undefined, locale);

  return (
    <footer id="kontakt" className="site-footer">
      <div className="foot-top">
        <div className="foot-col foot-brand reveal">
          <div className="foot-big foot-col-head">
            Reformer
            <br />
            <em>Studio</em> 011
          </div>
          <p className="foot-intro">{footer.intro}</p>
        </div>

        <div className="foot-col foot-contact reveal reveal-d1">
          <h5 className="foot-col-head">{footer.contact}</h5>
          <p className="foot-address">{footer.location}</p>
          <a href={PHONE_TEL_LOCAL} className="foot-phone" aria-label={footer.phone}>
            {PHONE_DISPLAY}
          </a>
          <div className="foot-social">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-link"
              aria-label="Instagram"
            >
              <Instagram size={21} strokeWidth={1.5} aria-hidden />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-link"
              aria-label="Facebook"
            >
              <Facebook size={21} strokeWidth={1.5} aria-hidden />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="foot-social-link"
              aria-label={footer.whatsappLabel}
            >
              <MessageCircle size={21} strokeWidth={1.5} aria-hidden />
            </a>
          </div>
        </div>

        <div className="foot-col foot-nav reveal reveal-d2">
          <h5 className="foot-col-head">{footer.studio}</h5>
          <a href="#studio">{footer.about}</a>
          <a href="#oprema">{footer.equip}</a>
          <a href="#programi">{footer.programs}</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Reformer Studio 011</span>
      </div>
    </footer>
  );
}
