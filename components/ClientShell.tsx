"use client";

import { useEffect } from "react";
import { Cursor } from "@/components/Cursor";
import { useRevealObserver } from "@/hooks/useReveal";

export function ClientShell({ children }: { children: React.ReactNode }) {
  useRevealObserver();

  useEffect(() => {
    const onLoad = () => {
      document.body.classList.add("loaded");
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add("in");
        }
      });
    };
    addEventListener("load", onLoad);
    const t = setTimeout(onLoad, 400);
    return () => {
      removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Cursor />
      {children}
    </>
  );
}
