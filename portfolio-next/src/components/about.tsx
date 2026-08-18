import { languages, timeline } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const bio = [
  "I'm a Full Stack Developer based in Narayanganj, Bangladesh, currently in my 2nd year of a B.Sc. in Computer Science & Engineering at Green University of Bangladesh. I work full-time at Webshinez Technologies while building EduSelf, a school management product I co-founded, on the side.",
  "My day-to-day spans a Laravel and CodeIgniter backend to a React.js and Next.js frontend, styled with Tailwind CSS and brought to life with GSAP. I care about the full path from database schema to the pixel a user actually taps — not just one layer of it.",
  "Outside of shipped work, I hold Data Structures & Algorithms fundamentals close and put them into practice through university tech leadership — GUCC and GUBCPC — where I get to build real tools for a real community, not just solve problems in isolation.",
];

export function About() {
  return (
    <section id="about" className="section-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="04" label="about_me" title="The Developer Behind The Code" />

        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              {bio.map((p) => (
                <p key={p} className="leading-relaxed text-subtle">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="tag-pill">🇧🇩 Bangladesh</span>
              <span className="tag-pill">🎓 CSE Student</span>
              <span className="tag-pill">💼 Open to Work</span>
              <span className="tag-pill">⚡ Full Stack</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="font-display text-sm font-bold text-text">
                    {lang.name}
                  </div>
                  <div className="font-mono text-xs text-muted">
                    {lang.level}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative border-l border-border pl-8">
              {timeline.map((item) => (
                <div key={item.title} className="relative mb-8 last:mb-0">
                  <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-surface bg-accent shadow-[0_0_10px_var(--accent)]" />
                  <div className="font-mono text-xs text-accent">
                    {item.period}
                  </div>
                  <div className="mt-1 font-display font-bold text-text">
                    {item.title}
                  </div>
                  <div className="text-sm text-subtle">{item.org}</div>
                  {item.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
