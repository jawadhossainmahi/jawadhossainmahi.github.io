import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
]

const SECTION_IDS = ['hero', ...LINKS.map((l) => l.id), 'contact']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? 'border-steel/15 bg-obsidian/70 backdrop-blur-xl px-5 py-2.5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]'
              : 'border-transparent px-5 py-2.5'
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
            className="font-display text-lg font-semibold tracking-tight text-ice"
          >
            <span className="text-mint">&lt;</span>JHM<span className="text-mint">/&gt;</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === link.id ? 'text-obsidian' : 'text-steel hover:text-ice'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-mint"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={portfolio.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 text-sm font-medium text-mint transition-colors hover:bg-mint/20"
            >
              Download CV
            </a>
          </div>

          <button
            className="md:hidden text-ice p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden mx-6 mt-3 rounded-2xl border border-steel/15 bg-graphite/95 backdrop-blur-xl p-4"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    active === link.id ? 'bg-mint/10 text-mint' : 'text-steel hover:text-ice'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={portfolio.resumeUrl}
                download
                className="mt-2 text-center rounded-lg border border-mint/30 bg-mint/10 px-4 py-3 text-base font-medium text-mint"
              >
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
