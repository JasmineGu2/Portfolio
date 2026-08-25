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

/** Overlapping serif keycap pills for the hero Core Strengths cell */
export const HERO_PILLS: PillItem[] = [
  { label: 'Product Strategy', tone: 'peach', rotate: -4, x: 2, y: 10, z: 3 },
  { label: 'AI-Powered Products', tone: 'lavender', rotate: 3, x: 36, y: 4, z: 5, icon: 'rocket' },
  { label: 'Data Products', tone: 'lavender', rotate: -2, x: 54, y: 30, z: 4 },
  { label: 'ML & Data Visualization', tone: 'cream', rotate: 2, x: 0, y: 44, z: 2 },
  { label: 'Full-Stack Shipping', tone: 'mint', rotate: -3, x: 26, y: 40, z: 6, icon: 'sparkle' },
  { label: 'Enterprise Systems', tone: 'sky', rotate: 4, x: 50, y: 54, z: 3, icon: 'monitor' },
  { label: 'Product Leadership', tone: 'cream', rotate: -1, x: 10, y: 64, z: 4 },
]

export const ACCENT_PILLS = [
  { label: 'How I got here', tone: 'cream' as PillTone },
  { label: 'Click to explore', tone: 'mint' as PillTone },
]
