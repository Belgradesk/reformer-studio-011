import en from "./en";
import sr from "./sr";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { sr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { locales, type Dictionary, type Locale } from "./types";
export { getLocaleFromPathname, isLocale } from "./types";
