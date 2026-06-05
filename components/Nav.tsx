"use client";

import { useState } from "react";
import { BookingButton } from "@/components/BookingButton";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Logo } from "@/components/Logo";
import type { Dictionary, Locale } from "@/lib/i18n";

type NavProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function Nav({ locale, nav }: NavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    { href: "#studio", label: nav.studio },
    { href: "#oprema", label: nav.equip },
    { href: "#programi", label: nav.programs },
    { href: "#kontakt", label: nav.contact },
  ];

  return (
    <div className={`nav-shell${open ? " nav-open" : ""}`}>
      <nav className="nav-bar">
        <div className="nav-brand">
          <Logo locale={locale} onClick={close} priority />
        </div>
        <div className="nav-end">
          <div className="navlinks">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <BookingButton
            locale={locale}
            variant="secondary"
            className="nav-booking-btn"
            ariaLabel={nav.bookCtaAria}
          >
            {nav.bookCta}
          </BookingButton>
          <LanguageSwitch locale={locale} />
        </div>
        <div className="nav-mobile-actions">
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className="nav-mobile" aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <BookingButton locale={locale} variant="primary" ariaLabel={nav.bookCtaAria}>
          {nav.bookCta}
        </BookingButton>
        <LanguageSwitch locale={locale} />
      </div>
    </div>
  );
}
