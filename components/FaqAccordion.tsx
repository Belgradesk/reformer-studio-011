"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  title: string;
  items: FaqItem[];
};

export function FaqAccordion({ title, items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="info-faq" aria-labelledby="info-faq-title">
      <h2 id="info-faq-title" className="info-section-title">
        {title}
      </h2>
      <div className="faq-accordion">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const triggerId = `faq-trigger-${i}`;

          return (
            <div key={item.q} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
              <button
                type="button"
                id={triggerId}
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="faq-panel"
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
