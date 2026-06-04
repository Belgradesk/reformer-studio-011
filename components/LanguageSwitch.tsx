import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type LanguageSwitchProps = {
  locale: Locale;
};

export function LanguageSwitch({ locale }: LanguageSwitchProps) {
  return (
    <div className="lang-switch" aria-label="Language">
      <Link
        href="/sr"
        className={locale === "sr" ? "active" : undefined}
        aria-current={locale === "sr" ? "page" : undefined}
      >
        SR
      </Link>
      <span className="lang-sep" aria-hidden>
        /
      </span>
      <Link
        href="/en"
        className={locale === "en" ? "active" : undefined}
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
