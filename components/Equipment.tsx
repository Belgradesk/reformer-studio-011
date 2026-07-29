"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const CARD_SRC = [
  "/assets/oprema-tanja.webp",
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

// play() se na iOS-u ume odbiti (Low Power Mode, jos neostvarena interakcija).
// Tada tiho ostajemo na slici ispod videa, koja sluzi kao poster.
function safePlay(video: HTMLVideoElement) {
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // odbijeno ili prekinuto sa pause(), poster ostaje vidljiv
    });
  }
}

function EquipCardMedia({ imageSrc, alt, videoSrc }: EquipCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    setVideoVisible(true);
    safePlay(video);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    setVideoVisible(false);
    video.pause();
    video.currentTime = 0;
  };

  // Na uredjajima bez hovera nema cime da se pokrene video, pa ga vodi
  // IntersectionObserver: pusta se tek kad kartica ude u kadar i pauzira
  // cim izade, da se ne trose ni podaci ni baterija van vidnog polja.
  useEffect(() => {
    if (!videoSrc) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    // desktop zadrzava hover, ovde se nista ne menja
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData === true) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);
          safePlay(video);
        } else {
          setVideoVisible(false);
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    io.observe(wrap);

    return () => {
      io.disconnect();
      video.pause();
    };
  }, [videoSrc]);

  if (videoSrc) {
    return (
      <div
        ref={wrapRef}
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 860px) 100vw, 33vw"
          className="img-cover equip-img"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="img-cover equip-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            opacity: videoVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
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
