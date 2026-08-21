import { useEffect, useState } from 'react'
import { GithubIcon } from './icons'

// The resume confirms "Active since '22" but not an exact day, so 2022-01-01 is used as a
// clearly-labeled computation anchor rather than implying a fabricated precise join date.
const GITHUB_ANCHOR = new Date('2022-01-01T00:00:00Z')

interface Elapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getElapsed(from: Date, to: Date): Elapsed {
  let years = to.getFullYear() - from.getFullYear()
  let months = to.getMonth() - from.getMonth()
  let days = to.getDate() - from.getDate()
  let hours = to.getHours() - from.getHours()
  let minutes = to.getMinutes() - from.getMinutes()
  let seconds = to.getSeconds() - from.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const daysInPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate()
    days += daysInPrevMonth
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return { years, months, days, hours, minutes, seconds }
}

const UNITS: { key: keyof Elapsed; label: string }[] = [
  { key: 'years', label: 'Years' },
  { key: 'months', label: 'Months' },
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

export function GithubTimer() {
  const [elapsed, setElapsed] = useState(() => getElapsed(GITHUB_ANCHOR, new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setElapsed(getElapsed(GITHUB_ANCHOR, new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl border border-steel/15 bg-blue-graphite/40 p-6">
      <div className="flex items-center gap-2 text-mint">
        <GithubIcon size={16} />
        <span className="text-xs font-medium uppercase tracking-widest">GitHub Member Since 2022</span>
      </div>

      <div className="mt-5 grid grid-cols-6 gap-1.5 sm:gap-2">
        {UNITS.map(({ key, label }) => (
          <div key={key} className="text-center">
            <div className="font-display text-lg sm:text-2xl font-semibold text-ice tabular-nums">
              {String(elapsed[key]).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-wide text-steel">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
