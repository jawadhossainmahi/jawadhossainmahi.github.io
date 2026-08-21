import { useEffect, useRef, useState } from 'react'
import type { Accent } from '@/lib/accent'
import { ACCENTS } from '@/lib/accent'

const PREVIEW_WIDTH = 1440
const PREVIEW_HEIGHT = 960

function LivePreview({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / PREVIEW_WIDTH)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <iframe
        src={src}
        title={src}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          border: 'none',
          pointerEvents: 'none',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

export function BrowserFrame({
  name,
  url,
  live,
  accent,
}: {
  name: string
  url?: string
  live?: string
  accent: Accent
}) {
  const colors = ACCENTS[accent]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-steel/15 bg-blue-graphite shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-steel/10 bg-graphite/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-steel/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-steel/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-steel/25" />
        </div>
        <div className="ml-3 flex-1 truncate rounded-full bg-obsidian/60 px-3 py-1 text-[11px] text-steel">
          {url ? url.replace(/^https?:\/\//, '') : `${name.toLowerCase().replace(/\s+/g, '-')}.app`}
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden">
        <div className={`absolute -left-10 -top-10 h-56 w-56 rounded-full ${colors.glow} blur-3xl`} />
        <div className={`absolute -right-16 bottom-0 h-64 w-64 rounded-full ${colors.glow} blur-3xl opacity-70`} />
        <div className="absolute inset-0 grid-overlay opacity-30" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <span
            className={`font-display text-6xl sm:text-7xl font-semibold ${colors.text} opacity-90 tracking-tight`}
          >
            {name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 3)}
          </span>
        </div>

        {!live && (
          <div className="absolute left-6 right-6 bottom-6 flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-obsidian/50 overflow-hidden">
              <div className={`h-full w-2/3 rounded-full ${colors.bg} opacity-70`} />
            </div>
            <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
          </div>
        )}

        {live && <LivePreview src={live} />}
      </div>
    </div>
  )
}
