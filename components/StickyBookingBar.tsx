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
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
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
