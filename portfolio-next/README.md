# Jawad Hossain Mahi — Portfolio (Next.js)

The 2026 rebuild of the portfolio, living alongside the original static site
in this same repo without touching it. The static site at the repo root
keeps serving `jawadhossainmahi.github.io` via GitHub Pages untouched; this
app deploys separately to Vercel.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4
· Motion · GSAP (ScrollTrigger, SplitText) · Lenis · next-themes

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000 (or next free port)
npm run build     # production build
npm run lint      # eslint
```

## Content

All copy lives in `src/lib/data.ts` — projects, skills, timeline, community
roles — sourced from the resume (`public/resume.pdf`) and cross-checked
against the live GitHub repos. Edit that file to update site content; no
component changes needed for text/data updates.

## Contact form

`src/components/contact.tsx` posts to [Formspree](https://formspree.io) when
`NEXT_PUBLIC_FORMSPREE_ID` is set (create a free Formspree form and drop its
ID into `.env.local` / your Vercel project env vars). Without that env var,
the form gracefully falls back to opening a pre-filled `mailto:` link, so
it's functional either way.

```bash
# .env.local
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

## The cursor spray effect

`src/components/cursor-spray.tsx` is a pooled Canvas 2D particle system. It
only activates when `(pointer: fine) and (hover: hover)` matches (never on
touch) and `prefers-reduced-motion` is not set to `reduce`. See that file's
comments for the performance approach (object pooling, capped particle
count, RAF pause on hidden tabs).

## Deploying

Deploy target is Vercel. Point a new Vercel project at this repo with **Root
Directory** set to `portfolio-next/` — the static site at the repo root is
unaffected. Once you're happy with the rebuild, you can either keep both
live at different domains or point the GitHub Pages domain at the Vercel
deployment.

SEO metadata (OpenGraph, canonical URL, sitemap, robots.txt) resolves its
domain automatically from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so it
needs no config on a fresh deploy. Once a custom domain is attached, set
`NEXT_PUBLIC_SITE_URL` (e.g. `https://jawadhossainmahi.dev`) in the Vercel
project's env vars to override it.
