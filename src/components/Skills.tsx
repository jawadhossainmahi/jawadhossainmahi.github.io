import { motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function Skills() {
  const groups = Object.entries(portfolio.skills)

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <SectionBackground accent="violet" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-mint">Technology</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            The stack behind the products.
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-steel/15 bg-steel/10">
          {groups.map(([group, items], i) => (
            <motion.div
              key={group}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-obsidian p-7"
            >
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mint">
                {group}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-steel/15 bg-blue-graphite/40 px-3 py-1.5 text-sm text-ice/90"
                  >
                    {item}
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
