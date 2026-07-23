export type PillTone = 'mint' | 'sky' | 'cream' | 'lavender' | 'peach'

export interface PillItem {
  label: string
  tone: PillTone
  rotate: number
  x: number
  y: number
  z: number
  icon?: 'monitor' | 'rocket' | 'sparkle'
}

export type HeroStrengthVariant = 'primary' | 'supporting'

export interface HeroStrengthPill {
  label: string
  variant: HeroStrengthVariant
  accent?: 'coral' | 'lavender'
  icon?: 'monitor' | 'rocket' | 'sparkle'
}

/** Homepage core strengths — max 6–7 tags */
export const HERO_STRENGTHS: HeroStrengthPill[] = [
  { label: 'Product Strategy', variant: 'primary', accent: 'coral' },
  { label: 'AI-Powered Products', variant: 'primary', accent: 'lavender', icon: 'rocket' },
  { label: 'Data Products', variant: 'primary', accent: 'lavender' },
  { label: 'ML & Data Visualization', variant: 'supporting' },
  { label: 'Full-Stack Shipping', variant: 'supporting', icon: 'sparkle' },
  { label: 'Enterprise Systems', variant: 'supporting', icon: 'monitor' },
  { label: 'Product Leadership', variant: 'supporting' },
]

/** @deprecated Legacy floating pill cluster */
export const HERO_PILLS: PillItem[] = []

export const ACCENT_PILLS = [
  { label: 'How I got here', tone: 'cream' as PillTone },
  { label: 'Click to explore', tone: 'mint' as PillTone },
]
