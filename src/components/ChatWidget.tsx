import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'jhm-chat-history'
const INTRO: Message = {
  role: 'assistant',
  content: `Hi, I'm ${portfolio.personal.name}! Ask me anything about my work, projects, or how to get in touch. You get 5 questions every 3 hours.`,
}

function formatResetTime(resetAt: number): string {
  const minutes = Math.max(1, Math.ceil((resetAt - Date.now()) / 60000))
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`
  const hours = Math.ceil(minutes / 60)
  return `${hours} hour${hours === 1 ? '' : 's'}`
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Message[]) : [INTRO]
    } catch {
      return [INTRO]
    }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [limitMessage, setLimitMessage] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // storage unavailable — conversation just won't persist across reloads
    }
  }, [messages])

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading || limitMessage) return

    const nextMessages = [...messages, { role: 'user' as const, content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== INTRO) }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setLimitMessage(
            data.resetAt ? `${data.error} (resets in ~${formatResetTime(data.resetAt)})` : data.error || 'Rate limit reached.',
          )
        } else {
          // Transient/validation errors shouldn't lock the whole widget — surface as a
          // message and let the visitor try again.
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.error || 'Something went wrong. Please try again.' },
          ])
        }
        return
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      setRemaining(data.remaining)
      if (data.remaining <= 0) {
        setLimitMessage("That was your last question for now — check back in a few hours, or use the Contact section below.")
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I couldn't reach the server. Please try again in a moment." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with AI about Jawad'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-obsidian shadow-[0_10px_40px_-8px_rgba(125,249,211,0.6)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label="Chat with AI about Jawad Hossain Mahi"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-steel/15 bg-graphite shadow-2xl"
          >
            <div className="flex items-center gap-2.5 border-b border-steel/10 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/10 text-mint">
                <Bot size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ice">Ask about Jawad</p>
                <p className="text-xs text-steel">
                  {remaining !== null ? `${remaining} question${remaining === 1 ? '' : 's'} left` : '5 questions / 3 hours'}
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto bg-mint text-obsidian'
                      : 'mr-auto bg-blue-graphite/60 text-ice border border-steel/10'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex items-center gap-1.5 rounded-2xl border border-steel/10 bg-blue-graphite/60 px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-steel" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-steel [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-steel [animation-delay:300ms]" />
                </div>
              )}
            </div>

            <div className="border-t border-steel/10 p-3">
              {limitMessage ? (
                <p className="px-2 py-2 text-xs text-steel leading-relaxed">{limitMessage}</p>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Ask about his projects, stack…"
                    disabled={loading}
                    className="flex-1 rounded-full border border-steel/20 bg-obsidian/60 px-4 py-2.5 text-sm text-ice placeholder:text-steel/60 outline-none focus:border-mint/40 disabled:opacity-50"
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint text-obsidian disabled:opacity-40"
                  >
                    <Send size={15} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
