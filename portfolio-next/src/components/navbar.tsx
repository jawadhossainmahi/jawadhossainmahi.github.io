"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { site } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { Magnetic } from "./magnetic";
import { GithubMark } from "./brand-icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#community", label: "Community" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-bold tracking-tight text-accent"
        >
          <span className="text-subtle">&lt;</span>JHM
          <span className="text-subtle">/&gt;</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wide text-subtle transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic className="hidden md:block">
            <a
              href={site.resumeHref}
              download
              className="flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-xs text-subtle transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={13} />
              Resume
            </a>
          </Magnetic>
          <Magnetic className="hidden md:block">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-accent px-4 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              <GithubMark size={13} />
              GitHub
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-subtle hover:text-accent md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-bg md:hidden"
          >
            <nav className="flex h-full flex-col gap-1 overflow-y-auto px-6 py-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="border-b border-border py-4 font-display text-2xl font-bold text-text transition-colors hover:text-accent"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={site.resumeHref}
                download
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + links.length * 0.05, duration: 0.35 }}
                className="btn-gradient mt-6 flex items-center gap-2 rounded-lg px-6 py-3.5 text-center font-display font-bold text-bg"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
              <motion.a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.05, duration: 0.35 }}
                className="mt-3 flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 font-mono text-sm text-subtle"
              >
                <GithubMark size={14} />
                GitHub Profile
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
