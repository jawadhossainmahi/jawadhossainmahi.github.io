import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { ACCENTS } from '@/lib/accent'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BrowserFrame } from './BrowserFrame'
import { GithubIcon } from './icons'

function ProjectLinks({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        onClick={() => onOpen(project)}
        className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-5 py-2.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
      >
        Case Study
      </button>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full ${ACCENTS[project.accent].bg} px-5 py-2.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03]`}
        >
          Explore Project <ArrowUpRight size={16} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-5 py-2.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
        >
          <GithubIcon size={16} /> Source
        </a>
      )}
    </div>
  )
}

function ProjectContent({
  project,
  onOpen,
  live,
}: {
  project: Project
  onOpen: (p: Project) => void
  live: boolean
}) {
  const colors = ACCENTS[project.accent]
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">
      <div>
        <span className="font-display text-sm text-steel/50">{project.order}</span>
        <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
          {project.name}
        </h3>
        <p className={`mt-1 text-sm font-medium ${colors.text}`}>{project.tagline}</p>
        <p className="mt-5 text-sm sm:text-base text-steel leading-relaxed max-w-lg text-balance">
          {project.description[0]}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="rounded-full border border-steel/20 px-3 py-1 text-xs text-steel">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-steel/60">{project.role}</p>
        <ProjectLinks project={project} onOpen={onOpen} />
      </div>

      <BrowserFrame
        name={project.name}
        url={project.live}
        live={live ? project.live : undefined}
        accent={project.accent}
      />
    </div>
  )
}

export function ProjectShowcase({
  projects,
  onOpen,
}: {
  projects: Project[]
  onOpen: (p: Project) => void
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const panels = panelRefs.current.filter((el): el is HTMLDivElement => el !== null)
    const n = panels.length

    gsap.set(panels, { opacity: 0, y: 24 })
    gsap.set(panels[0], { opacity: 1, y: 0 })

    let lastActive = 0

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = self.progress * n
        panels.forEach((panel, i) => {
          const local = progress - i
          const opacity = 1 - Math.min(Math.abs(local - 0.5) * 1.6, 1)
          const y = (0.5 - local) * 30
          gsap.set(panel, { opacity: Math.max(opacity, 0), y })
        })

        const activeIndex = Math.min(Math.max(Math.round(progress - 0.5), 0), n - 1)
        panels.forEach((panel, i) => {
          panel.style.pointerEvents = i === activeIndex ? 'auto' : 'none'
          panel.setAttribute('aria-hidden', i === activeIndex ? 'false' : 'true')
        })

        if (activeIndex !== lastActive) {
          lastActive = activeIndex
          setRevealed((prev) => (prev.has(activeIndex) ? prev : new Set(prev).add(activeIndex)))
        }
      },
    })

    return () => trigger.kill()
  }, [projects])

  return (
    <div ref={wrapperRef} style={{ height: `${projects.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6 py-24 relative h-[70vh] sm:h-[60vh]">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                panelRefs.current[i] = el
              }}
              className="absolute inset-0"
            >
              <ProjectContent project={project} onOpen={onOpen} live={revealed.has(i)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
