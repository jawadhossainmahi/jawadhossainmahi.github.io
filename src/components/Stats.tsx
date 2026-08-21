import { useEffect, useRef } from 'react'
import { portfolio } from '@/data/portfolio'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function StatValue({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      el.textContent = `${value.toFixed(decimals)}${suffix}`
      return
    }

    const proxy = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          val: value,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${proxy.val.toFixed(decimals)}${suffix}`
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value, decimals, suffix, reducedMotion])

  return <span ref={ref}>0{suffix}</span>
}

export function Stats() {
  return (
    <section className="relative border-y border-steel/10 bg-graphite/40" aria-label="Credibility metrics">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {portfolio.stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="font-display text-4xl sm:text-5xl font-semibold text-ice tabular-nums">
              <StatValue value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-xs sm:text-sm uppercase tracking-wide text-steel">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
