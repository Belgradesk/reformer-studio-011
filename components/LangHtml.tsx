import type { Locale } from "@/lib/i18n";

export function LangHtml({ lang }: { lang: Locale }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${lang}";`,
      }}
    />
  );
}
