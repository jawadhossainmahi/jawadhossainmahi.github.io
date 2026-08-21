import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { ACCENTS } from '@/lib/accent'
import { BrowserFrame } from './BrowserFrame'
import { GithubIcon } from './icons'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const colors = ACCENTS[project.accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="rounded-3xl border border-steel/15 bg-blue-graphite/30 p-6 sm:p-8"
    >
      <span className="font-display text-sm text-steel/50">{project.order}</span>
      <h3 className="mt-3 font-display text-2xl font-semibold text-ice">{project.name}</h3>
      <p className={`mt-1 text-sm font-medium ${colors.text}`}>{project.tagline}</p>

      <div className="mt-5">
        <BrowserFrame name={project.name} url={project.live} live={project.live} accent={project.accent} />
      </div>

      <p className="mt-5 text-sm text-steel leading-relaxed">{project.description[0]}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className="rounded-full border border-steel/20 px-3 py-1 text-xs text-steel">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-5 text-xs uppercase tracking-widest text-steel/60">{project.role}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => onOpen(project)}
          className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-4 py-2 text-sm font-medium text-ice hover:border-mint/40 hover:text-mint transition-colors"
        >
          Case Study
        </button>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-full ${colors.bg} px-4 py-2 text-sm font-semibold text-obsidian`}
          >
            Visit <ArrowUpRight size={14} />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-4 py-2 text-sm font-medium text-ice hover:border-mint/40 hover:text-mint"
          >
            <GithubIcon size={14} /> Source
          </a>
        )}
      </div>
    </motion.div>
  )
}
