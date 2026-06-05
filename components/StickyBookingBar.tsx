"use client";

import { useEffect, useState } from "react";
import { BookingButton } from "@/components/BookingButton";
import type { Locale } from "@/lib/i18n";

type StickyBookingBarProps = {
  locale: Locale;
  label: string;
  ariaLabel: string;
};

export function StickyBookingBar({ locale, label, ariaLabel }: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const ctaBand = document.querySelector(".cta-band");
    const footer = document.querySelector(".site-footer");
    if (!hero) return;

    let heroInView = true;
    const finalInView = new Set<Element>();

    const update = () => {
      setVisible(!heroInView && finalInView.size === 0);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        update();
      },
      { threshold: 0, rootMargin: "0px" }
    );

    const finalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) finalInView.add(entry.target);
          else finalInView.delete(entry.target);
        });
        update();
      },
      { threshold: 0, rootMargin: "0px" }
    );

    heroObserver.observe(hero);
    if (ctaBand) finalObserver.observe(ctaBand);
    if (footer) finalObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`sticky-booking${visible ? " sticky-booking--visible" : ""}`}
      aria-hidden={!visible}
    >
      <BookingButton locale={locale} variant="sticky" ariaLabel={ariaLabel}>
        {label}
      </BookingButton>
    </div>
  );
}
