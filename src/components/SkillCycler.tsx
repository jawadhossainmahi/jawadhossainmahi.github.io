import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolio } from '@/data/portfolio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SKILLS = Array.from(new Set(Object.values(portfolio.skills).flat()))

export function SkillCycler() {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SKILLS.length), 2200)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  return (
    <div className="rounded-2xl border border-steel/15 bg-blue-graphite/40 p-6">
      <span className="text-xs font-medium uppercase tracking-widest text-mint">Skills In Rotation</span>

      <div className="relative mt-4 h-9 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={SKILLS[index]}
            initial={reducedMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? undefined : { y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center font-display text-xl sm:text-2xl font-semibold text-ice"
          >
            {SKILLS[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <p className="mt-4 text-xs text-steel">
        {index + 1} of {SKILLS.length} technologies across the stack
      </p>
    </div>
  )
}
