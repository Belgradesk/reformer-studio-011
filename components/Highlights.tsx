import type { Dictionary } from "@/lib/i18n";

type HighlightsProps = {
  highlights: Dictionary["highlights"];
};

export function Highlights({ highlights }: HighlightsProps) {
  return (
    <section className="highlights">
      <div className="wrap">
        <div className="stat-row">
          {highlights.items.map((item, i) => (
            <div
              key={item.value}
              className={`stat${i > 0 ? " stat--ruled" : ""} reveal${i === 1 ? " reveal-d1" : i === 2 ? " reveal-d2" : ""}`}
            >
              <div className="n">{item.value}</div>
              <div className="t">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
