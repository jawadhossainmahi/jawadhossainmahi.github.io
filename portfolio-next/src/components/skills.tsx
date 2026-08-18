import {
  Code2,
  Database,
  LayoutGrid,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  database: Database,
  wrench: Wrench,
  smartphone: Smartphone,
};

// Bento sizing: first two groups (Frontend, Backend) get more room.
const SPAN: Record<number, string> = {
  0: "md:col-span-3 lg:col-span-2",
  1: "md:col-span-3 lg:col-span-2",
  2: "md:col-span-3 lg:col-span-2",
  3: "md:col-span-3 lg:col-span-3",
  4: "md:col-span-3 lg:col-span-3",
  5: "md:col-span-6 lg:col-span-6",
};

export function Skills() {
  return (
    <section id="skills" className="section-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          label="tech_stack"
          title="Technical Arsenal"
          description="Full-stack from a Laravel-leaning backend to a React/Next.js frontend, with real production experience across the gaps in between."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <Reveal
                key={group.label}
                delay={i * 0.05}
                className={`card-glow rounded-xl border border-border bg-card p-6 ${SPAN[i] ?? "md:col-span-3"}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={17} />
                  </div>
                  <h3 className="font-display font-bold text-text">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
