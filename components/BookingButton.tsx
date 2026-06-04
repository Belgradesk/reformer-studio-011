import { getWhatsAppUrl } from "@/config/site";
import type { Locale } from "@/lib/i18n";

type BookingButtonProps = {
  locale?: Locale;
  variant?: "primary" | "secondary" | "sticky";
  message?: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function BookingButton({
  locale = "sr",
  variant = "primary",
  message,
  children,
  className = "",
  ariaLabel,
}: BookingButtonProps) {
  const label =
    children ?? (locale === "en" ? "Book your first session" : "Zakaži prvi trening");
  const href = getWhatsAppUrl(message, locale);

  return (
    <a
      href={href}
      className={`booking-btn booking-btn--${variant}${className ? ` ${className}` : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        ariaLabel ??
        (locale === "en" ? `${label} via WhatsApp` : `${label} preko WhatsApp-a`)
      }
      data-cursor
    >
      <span className="booking-btn__text">{label}</span>
      {variant === "primary" && <span className="arw" aria-hidden="true" />}
    </a>
  );
}
