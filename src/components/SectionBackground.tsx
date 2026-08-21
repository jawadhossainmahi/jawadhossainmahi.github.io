import { useEffect, useRef } from 'react'
import type { Accent } from '@/lib/accent'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GLOW: Record<Accent, string> = {
  mint: 'bg-mint/10',
  violet: 'bg-violet/15',
  sky: 'bg-sky/10',
  amber: 'bg-amber/10',
}

/**
 * Ambient, scroll-reactive backdrop for a section: a faint grid, two soft color blobs that
 * drift at different speeds as the section scrolls past, and a static third blob for depth.
 * Sits as the first child of a `relative` section so later siblings paint on top of it —
 * no z-index bookkeeping needed.
 */
export function SectionBackground({ accent = 'mint', tall = false }: { accent?: Accent; tall?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return

    const ctx = gsap.context(() => {
      const blobs = ref.current!.querySelectorAll<HTMLElement>('[data-parallax-blob]')
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: i % 2 === 0 ? 22 : -22,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [reducedMotion])

  const glow = GLOW[accent]

  // Short sections fade the grid toward the bottom so it reads as a top-anchored backdrop.
  // Very tall sections (the pinned Work showcase) need it to hold across the whole scroll
  // distance instead, or most of the section would render on flat black.
  const gridMask = tall
    ? '[mask-image:radial-gradient(ellipse_80%_140%_at_50%_20%,black,transparent)]'
    : '[mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]'

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 grid-overlay opacity-40 ${gridMask}`} />
      <div
        data-parallax-blob
        className={`absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full ${glow} blur-[120px]`}
      />
      <div
        data-parallax-blob
        className={`absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full ${glow} blur-[110px]`}
      />
      {tall && (
        <div
          data-parallax-blob
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full ${glow} blur-[130px] opacity-70`}
        />
      )}
    </div>
  )
}
