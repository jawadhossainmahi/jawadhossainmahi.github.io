import { motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <SectionBackground accent="amber" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-amber">Achievements</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Recognition earned along the way.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-px overflow-hidden rounded-3xl border border-steel/15 bg-steel/10">
          {portfolio.achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-obsidian p-6 sm:p-8 flex flex-col justify-between min-h-[160px]"
            >
              <div className="font-display text-2xl sm:text-3xl font-semibold text-amber leading-tight">
                {item.label}
              </div>
              <div className="mt-4 text-xs sm:text-sm text-steel leading-relaxed">{item.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
