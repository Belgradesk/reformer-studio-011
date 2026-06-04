import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

const CARD_SRC = [
  "/assets/detail-wood.jpg",
  "/assets/springs.jpg",
  "/assets/reformer-interior.jpg",
];

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
              <Image
                src={CARD_SRC[i]}
                alt={card.alt}
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
                className="img-cover equip-img"
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
