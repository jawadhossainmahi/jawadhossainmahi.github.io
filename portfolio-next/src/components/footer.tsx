import { Mail } from "lucide-react";
import { site } from "@/lib/data";
import { GithubMark, LinkedinMark } from "./brand-icons";

export function Footer() {
  return (
    <footer className="section-bg border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="font-mono font-bold text-accent">
          <span className="text-subtle">&lt;</span>JHM
          <span className="text-subtle">/&gt;</span>
        </div>
        <p className="font-mono text-sm text-subtle">
          © {new Date().getFullYear()} {site.name} · Built with Next.js, Tailwind & GSAP
        </p>
        <div className="flex gap-5">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent"
          >
            <GithubMark size={16} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent"
          >
            <LinkedinMark size={16} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted hover:text-accent"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
