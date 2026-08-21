import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export function ScrollProgress() {
  const active = useActiveSection(SECTIONS.map((s) => s.id))

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3">
      {SECTIONS.map((section, i) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${section.label}`}
            aria-current={isActive}
          >
            <span
              className={`text-[10px] font-display tabular-nums transition-colors ${
                isActive ? 'text-mint' : 'text-steel/50 group-hover:text-steel'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-6 bg-mint' : 'w-1.5 bg-steel/30 group-hover:bg-steel/60'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
