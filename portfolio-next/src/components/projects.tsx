import { ExternalLink, Users } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ProjectIcon } from "./project-icon";
import { GithubMark } from "./brand-icons";

export function Projects() {
  const [flagship, ...rest] = projects;

  return (
    <section id="work" className="section-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" label="featured_work" title="Selected Work" />

        <Reveal>
          <article className="card-glow group grid gap-8 rounded-2xl border border-border bg-card p-8 lg:grid-cols-[1fr_1.1fr] lg:p-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <ProjectIcon name={flagship.icon} size={24} />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    Flagship product
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text">
                    {flagship.title}
                  </h3>
                </div>
              </div>

              <p className="font-mono text-xs text-subtle">{flagship.role}</p>
              {flagship.team && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <Users size={13} /> {flagship.team}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {flagship.tech.map((t) => (
                  <span key={t} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {flagship.live && (
                  <a
                    href={flagship.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gradient inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-xs font-bold text-bg"
                  >
                    Live Site <ExternalLink size={13} />
                  </a>
                )}
                {flagship.github && (
                  <a
                    href={flagship.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-xs text-subtle hover:border-accent hover:text-accent"
                  >
                    <GithubMark size={13} /> GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-5 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  The problem
                </div>
                <p className="mt-2 text-sm leading-relaxed text-subtle">
                  {flagship.problem}
                </p>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  What I built
                </div>
                <p className="mt-2 text-sm leading-relaxed text-subtle">
                  {flagship.solution}
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <article className="card-glow flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <ProjectIcon name={project.icon} size={18} />
                  </div>
                  <div className="flex items-center gap-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live site`}
                        className="text-muted hover:text-accent"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="text-muted hover:text-accent"
                      >
                        <GithubMark size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-text">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {project.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-subtle">
                  {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
