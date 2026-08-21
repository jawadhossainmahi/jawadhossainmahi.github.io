import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionBackground } from './SectionBackground'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 sm:py-36">
      <SectionBackground accent="mint" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-mint">Experience</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Where I've put engineering to work.
          </h2>
        </motion.div>

        <div className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute left-[3px] sm:left-[7px] top-1 bottom-1 w-px bg-steel/15" />
          <div
            ref={lineRef}
            className="absolute left-[3px] sm:left-[7px] top-1 bottom-1 w-px bg-mint"
            style={{ transform: 'scaleY(0)' }}
          />

          {portfolio.experience.map((job) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative pb-4"
            >
              <span className="absolute -left-8 sm:-left-12 top-1.5 h-[7px] w-[7px] rounded-full bg-mint ring-4 ring-mint/15" />

              <div className="rounded-3xl border border-steel/15 bg-blue-graphite/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-ice">{job.role}</h3>
                  <span className="text-xs font-medium uppercase tracking-wide text-mint">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-steel">
                  {job.company} · {job.location}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-steel leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-steel/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span key={t} className="rounded-full border border-steel/20 px-3 py-1 text-xs text-steel">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
