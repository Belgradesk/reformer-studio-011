import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { BeforeTeaser } from "@/components/BeforeTeaser";
import { CtaBand } from "@/components/CtaBand";
import { Equipment } from "@/components/Equipment";
import { FirstSession } from "@/components/FirstSession";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
// import { Instructor } from "@/components/Instructor";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { Programs } from "@/components/Programs";
import { Reviews } from "@/components/Reviews";
import { Showcase } from "@/components/Showcase";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { Strip } from "@/components/Strip";
import { WhyStudio } from "@/components/WhyStudio";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Nav locale={locale} nav={dict.nav} />
      <Hero hero={dict.hero} locale={locale} />
      <WhyStudio whyStudio={dict.whyStudio} />
      <Strip items={dict.strip} />
      <About about={dict.about} />
      <Highlights highlights={dict.highlights} />
      <Equipment equip={dict.equip} />
      <Programs programs={dict.programs} locale={locale} />
      <Pricing pricing={dict.pricing} locale={locale} />
      <FirstSession firstSession={dict.firstSession} locale={locale} />
      <BeforeTeaser beforeTeaser={dict.beforeTeaser} locale={locale} />
      <Showcase showcase={dict.showcase} />
      {/* Instructor hidden until bio is ready */}
      <Reviews reviews={dict.reviews} />
      <CtaBand ctaBand={dict.ctaBand} locale={locale} />
      <Footer footer={dict.footer} locale={locale} />
      <StickyBookingBar locale={locale} label={dict.stickyBar.label} ariaLabel={dict.stickyBar.ariaLabel} />
    </>
  );
}
