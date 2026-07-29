"use client";

import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";

type ShowcaseProps = {
  showcase: Dictionary["showcase"];
};

export function Showcase({ showcase }: ShowcaseProps) {
  return (
    <section className="showcase section-air section-break" id="showcase">
      <div className="showcase-poster">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/video-poster.webp"
          className="img-cover"
        >
          <source src="/videos/hero_bg.webm" type="video/webm" />
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="showcase-copy reveal">
        <h2>{showcase.title}</h2>
        <p>{showcase.text}</p>
        <Link
          href={INSTAGRAM_URL}
          className="hero-cta showcase-cta"
          data-cursor
          target="_blank"
          rel="noopener noreferrer"
          aria-label={showcase.ctaAria}
        >
          {showcase.cta} <span className="arw" />
        </Link>
      </div>
    </section>
  );
}
