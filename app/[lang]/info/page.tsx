import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingButton } from "@/components/BookingButton";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { StickyBookingBar } from "@/components/StickyBookingBar";
import { BOOK_SESSION_MESSAGES } from "@/config/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { faqJsonLd } from "@/lib/faq-jsonld";
import { pageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    locale: lang,
    path: "/info",
    title: dict.info.metaTitle,
    description: dict.info.metaDescription,
    imageAlt: dict.meta.ogImageAlt,
  });
}

export default async function InfoPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const { info, pricing, nav, footer, stickyBar } = dict;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(info.faq.items)) }}
      />
      <Nav locale={locale} nav={nav} />
      <main className="info-page">
        <header className="info-hero section-dense">
          <div className="wrap info-hero-inner">
            <h1 className="reveal">{info.h1}</h1>
            <p className="info-intro reveal reveal-d1">{info.intro}</p>
          </div>
        </header>

        <section className="info-section section-dense" aria-labelledby="info-before-title">
          <div className="wrap">
            <h2 id="info-before-title" className="info-section-title reveal">
              {info.before.title}
            </h2>
            <div className="info-before-grid">
              <div className="info-before-media reveal reveal-d1">
                <Image
                  src="/assets/info-prvi-cas.webp"
                  alt={info.before.imgAlt}
                  width={1200}
                  height={1500}
                  quality={88}
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="img-cover info-before-img"
                />
              </div>
              <div className="info-before-text">
                <ul className="info-pills">
                  {info.before.items.map((item, i) => (
                    <li
                      key={item}
                      className={`info-pill reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : i === 3 ? " reveal-d3" : ""}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="info-body reveal">{info.before.body}</p>
              </div>
            </div>
          </div>
        </section>

        <Pricing pricing={pricing} locale={locale} className="info-pricing" />

        <section className="info-section section-dense" aria-labelledby="info-cancellation-title">
          <div className="wrap">
            <h2 id="info-cancellation-title" className="info-section-title reveal">
              {info.cancellation.title}
            </h2>
            <p className="info-body reveal reveal-d1">{info.cancellation.body}</p>
          </div>
        </section>

        <section className="info-section section-dense" aria-labelledby="info-audience-title">
          <div className="wrap">
            <h2 id="info-audience-title" className="info-section-title reveal">
              {info.audience.title}
            </h2>
            <div className="info-audience-grid">
              <div className="info-audience-text">
                <p className="info-body reveal reveal-d1">{info.audience.body}</p>
                <ul className="info-pills info-pills--benefits">
                  {info.audience.benefits.map((item, i) => (
                    <li
                      key={item}
                      className={`info-pill reveal${i % 3 === 1 ? " reveal-d1" : i % 3 === 2 ? " reveal-d2" : ""}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="info-audience-media reveal reveal-d2">
                <Image
                  src="/assets/info-oprema.webp"
                  alt={info.audience.imgAlt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="info-audience-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="info-section section-dense" aria-labelledby="info-trainers-title">
          <div className="wrap">
            <div className="info-trainers-grid">
              <div className="info-trainers-media reveal">
                <Image
                  src="/assets/info-treneri.webp"
                  alt={info.trainers.imgAlt}
                  width={1200}
                  height={1500}
                  quality={88}
                  sizes="(max-width: 900px) 100vw, 38vw"
                  className="img-cover info-trainers-img"
                />
              </div>
              <div className="info-trainers-text">
                <h2
                  id="info-trainers-title"
                  className="info-section-title reveal reveal-d1"
                >
                  {info.trainers.title}
                </h2>
                <p className="info-body reveal reveal-d2">{info.trainers.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="info-section section-dense" aria-labelledby="info-booking-title">
          <div className="wrap">
            <h2 id="info-booking-title" className="info-section-title reveal">
              {info.booking.title}
            </h2>
            <p className="info-body reveal reveal-d1">{info.booking.body}</p>
            <div className="info-booking-cta reveal reveal-d2">
              <BookingButton
                locale={locale}
                message={BOOK_SESSION_MESSAGES[locale]}
                ariaLabel={info.booking.cta}
              >
                {info.booking.cta}
              </BookingButton>
            </div>
          </div>
        </section>

        <div className="wrap">
          <FaqAccordion title={info.faq.title} items={info.faq.items} />
        </div>
      </main>
      <Footer footer={footer} locale={locale} />
      <StickyBookingBar
        locale={locale}
        label={stickyBar.label}
        ariaLabel={stickyBar.ariaLabel}
      />
    </>
  );
}
