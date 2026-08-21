import { useEffect, useState } from 'react'

/**
 * Determines the active section by checking which section's top edge has
 * crossed a fixed reference line near the top of the viewport. Ratio-based
 * IntersectionObserver approaches break down when sections have wildly
 * different heights (e.g. a pinned 400vh project showcase next to a single
 * viewport-height section) — this stays correct regardless of height.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const referenceRatio = 0.35

    const compute = () => {
      const referenceY = window.innerHeight * referenceRatio
      let current = ids[0] ?? ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= referenceY) {
          current = id
        }
      }

      setActive((prev) => (prev === current ? prev : current))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        compute()
        ticking = false
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
