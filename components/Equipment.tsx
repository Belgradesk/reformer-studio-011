"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Dictionary } from "@/lib/i18n";

const CARD_SRC = [
  "/assets/detail-wood.jpg",
  "/assets/springs.jpg",
  "/assets/reformer-interior.jpg",
];

const VIDEO_SRC: ({ webm: string; mp4: string } | null)[] = [
  null,
  { webm: "/assets/equipment_card.webm", mp4: "/assets/equipment_card.mp4" },
  null,
];

type EquipCardMediaProps = {
  imageSrc: string;
  alt: string;
  videoSrc: { webm: string; mp4: string } | null;
};

function EquipCardMedia({ imageSrc, alt, videoSrc }: EquipCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) void video.play();
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  if (videoSrc) {
    return (
      <div
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={imageSrc}
          className="img-cover equip-img"
        >
          <source src={videoSrc.webm} type="video/webm" />
          <source src={videoSrc.mp4} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 860px) 100vw, 33vw"
      className="img-cover equip-img"
    />
  );
}

type EquipmentProps = {
  equip: Dictionary["equip"];
};

export function Equipment({ equip }: EquipmentProps) {
  return (
    <section className="equip section-air" id="oprema">
      <div className="wrap">
        <div className="eyebrow reveal">
          <span className="label">{equip.eyebrow}</span>
        </div>
        <h2 className="reveal">{equip.title}</h2>
        <p className="equip-lead reveal reveal-d1">{equip.p1}</p>
        <p className="equip-lead reveal reveal-d2">{equip.p2}</p>
        <p className="equip-lead reveal reveal-d3">{equip.p3}</p>
        <div className="equip-row">
          {equip.cards.map((card, i) => (
            <div
              key={card.title}
              className={`equip-card reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
              data-cursor="card"
            >
              <EquipCardMedia
                imageSrc={CARD_SRC[i]}
                alt={card.alt}
                videoSrc={VIDEO_SRC[i]}
              />
              <div className="cap">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h4>{card.title}</h4>
                <p className="cap-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
