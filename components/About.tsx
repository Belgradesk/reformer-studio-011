import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

type AboutProps = {
  about: Dictionary["about"];
};

export function About({ about }: AboutProps) {
  return (
    <section className="about section-air" id="studio">
      <div className="wrap about-grid">
        <div className="reveal">
          <div className="eyebrow">
            <span className="label">{about.eyebrow}</span>
          </div>
          <h2>{about.title}</h2>
          <p>{about.p1}</p>
          <p>{about.p2}</p>
          <p>{about.p3}</p>
        </div>
        <div className="figure reveal reveal-d1">
          <Image
            src="/assets/about-reformer.webp"
            alt={about.imgAlt}
            width={1024}
            height={660}
            sizes="(max-width: 860px) 100vw, 48vw"
            quality={88}
            className="img-cover about-img"
          />
          <div className="figcap">{about.figcap}</div>
        </div>
      </div>
    </section>
  );
}
