import { ExternalLink, Trophy, Users } from "lucide-react";
import { achievement, community } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Community() {
  return (
    <section id="community" className="section-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          label="community"
          title="University & Community Involvement"
          description="Active in campus tech leadership, not just coursework — the part of a fresher profile that's easy to skip and easy to stand out with."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {community.map((role, i) => (
            <Reveal key={role.org} delay={i * 0.08}>
              <article className="card-glow h-full rounded-2xl border border-border bg-card p-8">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-2/10 text-accent-2">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-text">
                        {role.org}
                      </h3>
                      <p className="text-xs text-muted">{role.orgFull}</p>
                    </div>
                  </div>
                  {role.url && (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${role.org} website`}
                      className="text-muted hover:text-accent"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <p className="mb-4 font-mono text-xs text-accent">
                  {role.role}
                </p>

                <ul className="space-y-2.5">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-subtle"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <div className="card-glow flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-accent/5 p-8 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-bg">
              <Trophy size={20} />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Achievement
              </div>
              <p className="mt-1 font-display font-bold text-text">
                {achievement}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
