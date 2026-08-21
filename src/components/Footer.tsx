import { Mail } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-steel/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm text-ice">
            © {year} {portfolio.personal.name}
          </p>
          <p className="mt-1 text-xs text-steel">{portfolio.personal.title}</p>
        </div>

        <div className="flex items-center gap-5">
          <a href={portfolio.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-steel hover:text-mint transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-steel hover:text-mint transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <a href={portfolio.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-steel hover:text-mint transition-colors">
            <FacebookIcon size={18} />
          </a>
          <a href={portfolio.social.email} aria-label="Email" className="text-steel hover:text-mint transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
