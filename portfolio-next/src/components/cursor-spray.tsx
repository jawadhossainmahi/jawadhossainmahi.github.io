"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 240;
const SPAWN_PER_MOVE = 4;
const MIN_SPAWN_DISTANCE = 6;

type Particle = {
  alive: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
};

/**
 * Canvas 2D "spray paint" cursor trail. Object-pooled so steady-state mouse
 * movement allocates nothing. Gated behind (pointer: fine) + (hover: hover)
 * and prefers-reduced-motion — never runs on touch or for motion-sensitive
 * users, and never intercepts pointer events.
 */
export function CursorSpray() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fineHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!fineHover.matches || reducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("cursor-active");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Read the current theme accent color out of CSS so the spray always
    // matches the active palette (dark cyan / light cyan variants).
    const readAccentRgb = (): [number, number, number] => {
      const styles = getComputedStyle(document.documentElement);
      const hex = styles.getPropertyValue("--accent").trim() || "#22e5ff";
      const clean = hex.replace("#", "");
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return [r || 34, g || 229, b || 255];
    };
    let [ar, ag, ab] = readAccentRgb();
    const themeObserver = new MutationObserver(() => {
      [ar, ag, ab] = readAccentRgb();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const pool: Particle[] = Array.from({ length: MAX_PARTICLES }, () => ({
      alive: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 0,
      life: 0,
      maxLife: 0,
      color: "",
    }));
    let cursor = pool.length;

    const spawn = (x: number, y: number) => {
      for (let i = 0; i < SPAWN_PER_MOVE; i++) {
        cursor = (cursor + 1) % pool.length;
        const p = pool[cursor];
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.2;
        p.alive = true;
        p.x = x;
        p.y = y;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed - 0.4;
        p.radius = 1 + Math.random() * 2.6;
        p.maxLife = 40 + Math.random() * 30;
        p.life = p.maxLife;
        const shade = 0.55 + Math.random() * 0.45;
        p.color = `${Math.round(ar * shade)},${Math.round(ag * shade)},${Math.round(ab * shade)}`;
      }
    };

    let lastX = -1;
    let lastY = -1;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = lastX < 0 ? Infinity : e.clientX - lastX;
      const dy = lastY < 0 ? Infinity : e.clientY - lastY;
      if (Math.hypot(dx, dy) < MIN_SPAWN_DISTANCE) return;
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let rafId = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of pool) {
        if (!p.alive) continue;
        p.life -= 1;
        if (p.life <= 0) {
          p.alive = false;
          continue;
        }
        p.vy += 0.02; // gentle gravity
        p.vx *= 0.97; // drag
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${alpha * 0.75})`;
        ctx.arc(p.x, p.y, p.radius * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}
