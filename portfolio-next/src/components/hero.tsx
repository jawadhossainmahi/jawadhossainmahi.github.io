"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, Download } from "lucide-react";
import { site } from "@/lib/data";
import { Magnetic } from "./magnetic";
import { Parallax } from "./parallax";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const restRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion || !headlineRef.current) {
        gsap.set([headlineRef.current, restRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.registerPlugin(SplitText);
      const split = new SplitText(headlineRef.current, {
        type: "chars, words",
        charsClass: "inline-block will-change-transform",
      });

      gsap.set(restRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(split.chars, {
        opacity: 0,
        yPercent: 120,
        rotate: 6,
        stagger: 0.02,
        duration: 0.8,
        ease: "power4.out",
      }).to(
        restRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      );

      return () => split.revert();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      className="hero-grid relative z-10 flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, color-mix(in oklab, var(--accent) 10%, transparent), transparent), radial-gradient(ellipse 50% 40% at 85% 15%, color-mix(in oklab, var(--accent-2) 10%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-xs text-accent">
              Open to fresher / junior Full Stack roles
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="overflow-hidden font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-text sm:text-6xl lg:text-7xl"
          >
            {site.name}
          </h1>

          <div ref={restRef} className="opacity-0">
            <p className="mt-5 flex items-center gap-2 font-mono text-sm text-accent">
              <span className="text-accent-2">&gt;</span> {site.role}
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-subtle">
              {site.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="btn-gradient inline-flex items-center gap-2 rounded-lg px-7 py-3 font-display font-bold text-bg transition-transform hover:-translate-y-0.5"
                >
                  View My Work
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
                >
                  Get In Touch
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3 font-mono text-sm text-subtle transition-colors hover:border-accent hover:text-accent"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </Magnetic>
            </div>

            <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat value="2+" label="Years Exp" />
              <Stat value="4" label="Shipped Projects" />
              <Stat value="3.49" label="CGPA" />
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Parallax speed={35}>
            <div className="relative float-anim">
              <div className="photo-ring absolute -inset-1.5 rounded-full opacity-60 blur-sm" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-surface lg:h-80 lg:w-80">
                <Image
                  src="/jawad.jpg"
                  alt="Jawad Hossain Mahi"
                  fill
                  priority
                  sizes="(min-width: 1024px) 320px, 256px"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-lg border border-border bg-card px-4 py-2 font-mono text-xs text-accent shadow-xl">
                2+ yrs exp
              </div>
              <div className="absolute -left-6 -top-2 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-accent-2 shadow-xl">
                Full Stack
              </div>
            </div>
          </Parallax>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-subtle hover:text-accent sm:block"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-extrabold text-accent">
        {value}
      </div>
      <div className="mt-1 font-mono text-xs text-subtle">{label}</div>
    </div>
  );
}
