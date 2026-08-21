import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio, type Project } from '@/data/portfolio'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ProjectShowcase } from './ProjectShowcase'
import { ProjectCard } from './ProjectCard'
import { ProjectCaseStudy } from './ProjectCaseStudy'
import { SectionBackground } from './SectionBackground'

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const isMobile = useIsMobile(1024)

  const featured = portfolio.projects.filter((p) => p.featured)
  const rest = portfolio.projects.filter((p) => !p.featured)

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <SectionBackground accent="violet" tall={!isMobile} />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-mint">Selected Work</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Products, platforms and systems I've built.
          </h2>
        </motion.div>
      </div>

      {isMobile ? (
        <div className="mx-auto max-w-7xl px-6 mt-14 space-y-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </div>
      ) : (
        <ProjectShowcase projects={featured} onOpen={setActiveProject} />
      )}

      {rest.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 mt-10 lg:mt-24">
          <h3 className="text-xs uppercase tracking-widest text-steel/60 mb-6">More Projects</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
            ))}
          </div>
        </div>
      )}

      <ProjectCaseStudy project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
