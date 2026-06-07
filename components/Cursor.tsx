"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "link" | "card" | "cta";

const MODES: CursorMode[] = ["default", "link", "card", "cta"];

function resolveMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";
  if (target.closest(".hero-cta, .play")) return "cta";
  if (target.closest("a, button, .nav-toggle")) return "link";
  if (target.closest(".prog-item, .equip-card, .rev-card, [data-cursor='card']")) {
    return "card";
  }
  return "default";
}

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 860px)").matches;

    if (reducedMotion || coarsePointer || narrow) {
      document.body.classList.add("cursor-off");
      return;
    }

    document.body.classList.add("cursor-on", "cursor-mode-default");

    const root = rootRef.current;
    if (!root) return;

    const shadow = root.querySelector<HTMLElement>(".cursor-shadow");
    const aura = root.querySelector<HTMLElement>(".cursor-aura");
    const frame = root.querySelector<HTMLElement>(".cursor-frame");
    const core = root.querySelector<HTMLElement>(".cursor-core");

    if (!shadow || !aura || !frame || !core) return;

    let mx = 0;
    let my = 0;
    let ax = 0;
    let ay = 0;
    let sx = 0;
    let sy = 0;
    let fx = 0;
    let fy = 0;
    let mode: CursorMode = "default";
    let raf = 0;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    const setMode = (next: CursorMode) => {
      if (mode === next) return;
      mode = next;
      MODES.forEach((m) => document.body.classList.remove(`cursor-mode-${m}`));
      document.body.classList.add(`cursor-mode-${next}`);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      place(core, mx, my);
    };

    const onOver = (e: MouseEvent) => {
      setMode(resolveMode(e.target));
    };

    const tick = () => {
      ax += (mx - ax) * 0.14;
      ay += (my - ay) * 0.14;
      sx += (mx - sx) * 0.09;
      sy += (my - sy) * 0.09;
      fx += (mx - fx) * 0.2;
      fy += (my - fy) * 0.2;
      place(aura, ax, ay);
      place(shadow, sx, sy);
      place(frame, fx, fy);
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove(
        "cursor-on",
        "cursor-off",
        ...MODES.map((m) => `cursor-mode-${m}`)
      );
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-system" aria-hidden>
      <div className="cursor-shadow" />
      <div className="cursor-aura" />
      <div className="cursor-frame">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="cursor-core" />
    </div>
  );
}
