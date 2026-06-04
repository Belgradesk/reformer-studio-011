import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type LogoProps = {
  locale: Locale;
  onClick?: () => void;
  priority?: boolean;
};

export function Logo({ locale, onClick, priority = false }: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className="logo-link"
      onClick={onClick}
      aria-label="Reformer Studio 011"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo.png?v=011v2"
        alt=""
        width={660}
        height={660}
        className="logo-img"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </Link>
  );
}
