import { motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function EngineeringFocus() {
  return (
    <section className="relative py-28 sm:py-36 bg-graphite/30 border-y border-steel/10">
      <SectionBackground accent="amber" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-mint">What I Build</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Systems that run real organizations, not just demos.
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {portfolio.focus.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: (i % 2) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-steel/15 bg-obsidian/50 p-8"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/0 blur-3xl transition-colors duration-500 group-hover:bg-mint/10" />
              <span className="font-display text-sm text-steel/60">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ice">{area.title}</h3>
              <p className="mt-3 text-sm text-steel leading-relaxed">{area.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-steel/20 px-3 py-1 text-xs text-steel group-hover:border-mint/25 group-hover:text-mint/90 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
