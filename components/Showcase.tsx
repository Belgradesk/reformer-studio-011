"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";

const ShowcaseWebGL = dynamic(
  () => import("@/components/ShowcaseWebGL").then((m) => m.ShowcaseWebGL),
  { ssr: false }
);

type ShowcaseProps = {
  showcase: Dictionary["showcase"];
};

export function Showcase({ showcase }: ShowcaseProps) {
  return (
    <section className="showcase section-air section-break" id="showcase">
      <div className="showcase-poster">
        <Image
          src="/assets/video-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="img-cover"
        />
      </div>
      <ShowcaseWebGL />
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
