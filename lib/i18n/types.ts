export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return "sr";
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    studio: string;
    equip: string;
    programs: string;
    info: string;
    contact: string;
    bookCta: string;
    bookCtaAria: string;
    openMenu: string;
    closeMenu: string;
  };
  stickyBar: {
    label: string;
    ariaLabel: string;
  };
  hero: {
    eyebrow: string;
    emotionalLine1: string;
    emotionalLine2: string;
    croHeadline: string;
    sub: string;
    ctaPrimary: string;
    ctaPrimaryAria: string;
    ctaSecondary: string;
    trust: string;
    idx: string;
    scroll: string;
    imgAlt: string;
  };
  whyStudio: {
    title: string;
    items: { title: string; desc: string }[];
  };
  strip: string[];
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    figcap: string;
    imgAlt: string;
  };
  highlights: {
    items: { value: string; desc: string }[];
  };
  equip: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    cards: { alt: string; title: string; desc: string }[];
  };
  programs: {
    eyebrow: string;
    title: string;
    cta: string;
    ctaAriaPrefix: string;
    items: {
      num: string;
      title: string;
      desc: string;
      whatsappMessage: string;
    }[];
  };
  firstSession: {
    title: string;
    intro: string;
    steps: { num: string; title: string; desc: string }[];
    cta: string;
    ctaAria: string;
  };
  pricing: {
    title: string;
    cards: { name: string; price: string; desc: string; cta: string }[];
    note: string;
  };
  beforeTeaser: {
    title: string;
    body: string;
    cards: string[];
    cta: string;
  };
  showcase: {
    title: string;
    text: string;
    cta: string;
    ctaAria: string;
  };
  instructor: {
    title: string;
    bioPlaceholder: string;
    photoPlaceholder: string;
    bullets: string[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { quote: string; author: string }[];
  };
  ctaBand: {
    title: string;
    text: string;
    cta: string;
    ctaAria: string;
    addressLabel: string;
    whatsappLabel: string;
    instagramLabel: string;
  };
  info: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    before: {
      title: string;
      body: string;
      items: string[];
      imgAlt: string;
    };
    cancellation: {
      title: string;
      body: string;
    };
    audience: {
      title: string;
      body: string;
      benefits: string[];
      imgAlt: string;
    };
    trainers: {
      title: string;
      body: string;
      imgAlt: string;
    };
    booking: {
      title: string;
      body: string;
      cta: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
  };
  footer: {
    contact: string;
    studio: string;
    intro: string;
    location: string;
    phone: string;
    whatsappLabel: string;
    addressLabel: string;
    book: string;
    bookAria: string;
    about: string;
    equip: string;
    programs: string;
    tagline: string;
  };
}
