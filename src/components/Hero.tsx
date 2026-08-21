import { Suspense, lazy, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './icons'
import { GithubTimer } from './GithubTimer'
import { SkillCycler } from './SkillCycler'

const HeroScene = lazy(() => import('./HeroScene').then((m) => ({ default: m.HeroScene })))

const SOCIALS = [
  { label: 'GitHub', href: portfolio.social.github, icon: GithubIcon },
  { label: 'LinkedIn', href: portfolio.social.linkedin, icon: LinkedinIcon },
  { label: 'Facebook', href: portfolio.social.facebook, icon: FacebookIcon },
  { label: 'Email', href: portfolio.social.email, icon: Mail },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const typeRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current) return
    const section = sectionRef.current

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      pointer.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) }
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion, isMobile])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        },
      })

      if (!reducedMotion) {
        gsap.to(typeRef.current, {
          yPercent: -35,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      return () => trigger.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 grid-overlay [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-violet/20 blur-[140px]" />
      <div className="absolute top-20 right-0 h-[360px] w-[360px] rounded-full bg-mint/10 blur-[120px]" />

      {!isMobile && (
        <Suspense fallback={null}>
          <HeroScene
            scrollRef={scrollProgress}
            pointerRef={pointer}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div ref={typeRef} className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/5 px-4 py-1.5 text-xs font-medium tracking-wide text-mint uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              {portfolio.hero.eyebrow}
            </div>

            <h1 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-ice text-balance">
              <span className="block text-2xl sm:text-3xl text-steel font-medium mb-1">
                {portfolio.personal.name}
              </span>
              {portfolio.hero.headingLines.map((line, i) => (
                <span
                  key={line}
                  className={`block text-5xl sm:text-6xl lg:text-7xl ${
                    i === portfolio.hero.headingLines.length - 1 ? 'text-mint' : ''
                  }`}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-steel leading-relaxed text-balance">
              {portfolio.hero.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={portfolio.hero.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {portfolio.hero.primaryCta.label}
              </a>
              <a
                href={portfolio.hero.secondaryCta.href}
                download
                className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-6 py-3 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
              >
                {portfolio.hero.secondaryCta.label}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="text-steel transition-colors hover:text-mint"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            <GithubTimer />
            <SkillCycler />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mb-10 hidden sm:flex w-full items-center justify-center gap-2 text-xs text-steel">
        <ArrowDown size={14} className="animate-bounce" />
        <span className="uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  )
}
