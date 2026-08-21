import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './icons'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <section id="contact" className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 grid-overlay [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,black,transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[780px] rounded-full bg-mint/10 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-widest text-mint"
        >
          {portfolio.contact.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-display font-semibold leading-[0.95] tracking-tight text-ice"
        >
          {portfolio.contact.headingLines.map((line, i) => (
            <span
              key={line}
              className={`block text-5xl sm:text-6xl lg:text-7xl ${
                i === portfolio.contact.headingLines.length - 1 ? 'text-mint' : ''
              }`}
            >
              {line}
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-7 max-w-xl mx-auto text-base sm:text-lg text-steel leading-relaxed text-balance"
        >
          {portfolio.contact.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={portfolio.social.email}
            className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03]"
          >
            Send Email <ArrowUpRight size={16} />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
          >
            {copied ? <Check size={16} className="text-mint" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>

          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>

          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
          >
            <GithubIcon size={16} /> GitHub
          </a>

          <a
            href={portfolio.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-steel/25 px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:border-mint/40 hover:text-mint"
          >
            <FacebookIcon size={16} /> Facebook
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 rounded-full border border-mint/30 bg-graphite px-5 py-3 text-sm font-medium text-mint shadow-lg"
          >
            <Check size={16} /> Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
