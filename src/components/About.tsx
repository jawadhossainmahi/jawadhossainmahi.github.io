import { motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <SectionBackground accent="sky" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="sticky top-32"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-mint">
                {portfolio.about.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice leading-tight text-balance">
                {portfolio.about.heading}
              </h2>

              <div className="mt-8 relative aspect-[4/5] max-w-xs overflow-hidden rounded-2xl border border-steel/15">
                <img
                  src="/images/jawad-portrait.png"
                  alt="Jawad Hossain Mahi"
                  className="h-full w-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
                <div className="absolute inset-0 mix-blend-color bg-gradient-to-br from-mint/70 via-transparent to-violet/70" />
                <div className="absolute inset-0 noise" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-medium text-ice/90">{portfolio.personal.name}</p>
                  <p className="text-[11px] text-ice/60">{portfolio.personal.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="space-y-5"
            >
              {portfolio.about.paragraphs.map((p) => (
                <p key={p} className="text-base sm:text-lg text-steel leading-relaxed text-balance">
                  {p}
                </p>
              ))}
            </motion.div>

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {portfolio.about.pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
                  className="rounded-2xl border border-steel/15 bg-blue-graphite/40 p-5 transition-colors hover:border-mint/30"
                >
                  <div className="text-sm font-display font-semibold text-mint">{pillar.label}</div>
                  <div className="mt-1.5 text-sm text-steel leading-relaxed">{pillar.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
