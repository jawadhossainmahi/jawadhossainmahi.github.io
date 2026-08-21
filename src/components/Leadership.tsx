import { motion } from 'framer-motion'
import { ArrowUpRight, Users } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function Leadership() {
  return (
    <section className="relative py-28 sm:py-36 bg-graphite/30 border-y border-steel/10">
      <SectionBackground accent="violet" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-violet">Leadership</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Contributing beyond individual projects.
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {portfolio.leadership.map((entry, i) => (
            <motion.div
              key={entry.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
              className="rounded-3xl border border-steel/15 bg-obsidian/50 p-7 sm:p-8"
            >
              <div className="flex items-center gap-2 text-violet">
                <Users size={16} />
                <span className="text-xs uppercase tracking-widest">{entry.meta}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ice">{entry.role}</h3>
              <p className="mt-1 text-sm text-steel">{entry.org}</p>

              <ul className="mt-5 space-y-2.5">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-steel leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-steel/50" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-violet hover:text-mint transition-colors"
                >
                  Visit site <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
