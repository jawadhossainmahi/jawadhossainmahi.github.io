import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { SectionBackground } from './SectionBackground'

export function Education() {
  const { degree, prior, coursework } = portfolio.education

  return (
    <section className="relative py-28 sm:py-36 bg-graphite/30 border-y border-steel/10">
      <SectionBackground accent="sky" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-sky">Education</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ice text-balance">
            Academic foundation.
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-3 rounded-3xl border border-sky/20 bg-obsidian/50 p-7 sm:p-8"
          >
            <div className="flex items-center gap-2 text-sky">
              <GraduationCap size={18} />
              <span className="text-xs uppercase tracking-widest">{degree.status}</span>
            </div>
            <h3 className="mt-4 font-display text-xl sm:text-2xl font-semibold text-ice">{degree.program}</h3>
            <p className="mt-1 text-sm text-steel">{degree.institution}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <span className="text-steel">{degree.period}</span>
              <span className="font-medium text-sky">{degree.score}</span>
            </div>

            <div className="mt-7 pt-6 border-t border-steel/10">
              <h4 className="text-xs uppercase tracking-widest text-steel/60">Relevant Coursework</h4>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {coursework.map((c) => (
                  <li key={c} className="text-sm text-steel">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {prior.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
                className="rounded-2xl border border-steel/15 bg-obsidian/50 p-6"
              >
                <h4 className="font-display text-base font-semibold text-ice">{item.program}</h4>
                <p className="mt-1 text-sm text-steel">{item.institution}</p>
                <div className="mt-3 flex justify-between text-xs text-steel">
                  <span>{item.period}</span>
                  <span className="text-sky">{item.score}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
              className="rounded-2xl border border-steel/15 bg-obsidian/50 p-6"
            >
              <h4 className="text-xs uppercase tracking-widest text-steel/60">Languages</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {portfolio.languages.map((lang) => (
                  <span key={lang.name} className="rounded-full border border-steel/20 px-3 py-1 text-xs text-steel">
                    {lang.name} · {lang.level}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
