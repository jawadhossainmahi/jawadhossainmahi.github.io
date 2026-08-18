"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fixed, full-page ambient background: a slow animated linear-gradient
 * sweep (pure CSS) plus three soft gradient orbs that parallax at
 * different speeds as the page scrolls (GSAP ScrollTrigger, scrubbed).
 * Purely decorative — sits behind every section at z-index 0.
 */
export function BackgroundField() {
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrollConfig = {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      };

      // Each orb drifts a different distance/direction across the full
      // scroll range, so the layers separate visually as you scroll —
      // the classic parallax depth cue.
      gsap.to(orbARef.current, { y: 260, x: -60, ease: "none", scrollTrigger: scrollConfig });
      gsap.to(orbBRef.current, { y: -220, x: 40, ease: "none", scrollTrigger: scrollConfig });
      gsap.to(orbCRef.current, { y: 180, x: 80, ease: "none", scrollTrigger: scrollConfig });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="aurora-layer" aria-hidden="true">
      <div className="aurora-sweep" />
      <div ref={orbARef} className="orb orb-a" />
      <div ref={orbBRef} className="orb orb-b" />
      <div ref={orbCRef} className="orb orb-c" />
    </div>
  );
}
