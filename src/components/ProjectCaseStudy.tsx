import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { ACCENTS } from '@/lib/accent'
import { BrowserFrame } from './BrowserFrame'
import { GithubIcon } from './icons'

export function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto bg-obsidian/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative my-8 w-full max-w-3xl rounded-3xl border border-steel/15 bg-graphite p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 rounded-full border border-steel/20 p-2 text-steel hover:text-mint hover:border-mint/30 transition-colors"
            >
              <X size={18} />
            </button>

            <span className="font-display text-sm text-steel/50">{project.order}</span>
            <h2 id="case-study-title" className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ice">
              {project.name}
            </h2>
            <p className={`mt-1 text-sm font-medium ${ACCENTS[project.accent].text}`}>{project.tagline}</p>

            <div className="mt-6">
              <BrowserFrame name={project.name} url={project.live} live={project.live} accent={project.accent} />
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <h3 className="text-xs uppercase tracking-widest text-steel/60">Overview</h3>
                <ul className="mt-3 space-y-3">
                  {project.description.map((line) => (
                    <li key={line} className="text-sm text-steel leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-steel/60">My Role</h3>
                  <p className="mt-2 text-sm text-ice">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-steel/60">Technology</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full border border-steel/20 px-2.5 py-1 text-xs text-steel">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full ${ACCENTS[project.accent].bg} px-5 py-2.5 text-sm font-semibold text-obsidian`}
                >
                  Live Product <ArrowUpRight size={16} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-5 py-2.5 text-sm font-semibold text-ice hover:border-mint/40 hover:text-mint"
                >
                  <GithubIcon size={16} /> Source Code
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
