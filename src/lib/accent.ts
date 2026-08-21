export type Accent = 'mint' | 'violet' | 'sky' | 'amber'

interface AccentClasses {
  text: string
  border: string
  bg: string
  bgSoft: string
  glow: string
  dot: string
  hex: string
}

export const ACCENTS: Record<Accent, AccentClasses> = {
  mint: {
    text: 'text-mint',
    border: 'border-mint/30',
    bg: 'bg-mint',
    bgSoft: 'bg-mint/10',
    glow: 'bg-mint/20',
    dot: 'bg-mint',
    hex: '#7DF9D3',
  },
  violet: {
    text: 'text-violet',
    border: 'border-violet/30',
    bg: 'bg-violet',
    bgSoft: 'bg-violet/10',
    glow: 'bg-violet/25',
    dot: 'bg-violet',
    hex: '#7C5CFF',
  },
  sky: {
    text: 'text-sky',
    border: 'border-sky/30',
    bg: 'bg-sky',
    bgSoft: 'bg-sky/10',
    glow: 'bg-sky/20',
    dot: 'bg-sky',
    hex: '#38BDF8',
  },
  amber: {
    text: 'text-amber',
    border: 'border-amber/30',
    bg: 'bg-amber',
    bgSoft: 'bg-amber/10',
    glow: 'bg-amber/20',
    dot: 'bg-amber',
    hex: '#FFB86B',
  },
}
