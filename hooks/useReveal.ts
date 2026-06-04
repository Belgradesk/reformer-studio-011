"use client";

import { useEffect } from "react";

function revealInViewport() {
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add("in");
    }
  });
}

export function useRevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
      revealInViewport();
    };

    observe();
    const t1 = window.setTimeout(observe, 150);
    const t2 = window.setTimeout(observe, 600);
    window.addEventListener("load", observe);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", observe);
      io.disconnect();
    };
  }, []);
}
