export interface TagSample {
  label: string
  color: string
}

/** Representative hero + work chip labels used across previews */
export const TAG_OPTION_SAMPLES: TagSample[] = [
  { label: 'Product strategy', color: '#3b82f6' },
  { label: 'SWE Intern', color: '#ef4444' },
  { label: 'Platform PM', color: '#a855f7' },
  { label: 'Full-stack shipping', color: '#22c55e' },
  { label: 'Enterprise IT', color: '#6366f1' },
]

export type TagStyleId =
  | 'filled-current'
  | 'outline'
  | 'soft-tint'
  | 'serif-keycap'
  | 'mono-label'
  | 'dot-lead'
  | 'stripe'
  | 'glass'
  | 'underline'
  | 'square-badge'

export interface TagStyleOption {
  id: TagStyleId
  name: string
  description: string
  bestFor: string
}

export const TAG_STYLE_OPTIONS: TagStyleOption[] = [
  {
    id: 'filled-current',
    name: '01 · Current filled',
    description: 'Solid color pills with white/dark text, what you have now.',
    bestFor: 'Work experience chips, high contrast on cards',
  },
  {
    id: 'outline',
    name: '02 · Outline',
    description: 'Transparent fill, colored border and label text.',
    bestFor: 'Cleaner canvas, less visual weight',
  },
  {
    id: 'soft-tint',
    name: '03 · Soft tint',
    description: 'Pastel background wash with saturated label color.',
    bestFor: 'Softer editorial feel on dot canvas',
  },
  {
    id: 'serif-keycap',
    name: '04 · Serif keycap',
    description: 'Fraunces serif pills with ink border and offset shadow.',
    bestFor: 'Hero skill cluster, playful editorial',
  },
  {
    id: 'mono-label',
    name: '05 · Mono label',
    description: 'JetBrains Mono uppercase micro-labels, square corners.',
    bestFor: 'Technical / workflow node aesthetic',
  },
  {
    id: 'dot-lead',
    name: '06 · Dot lead',
    description: 'Neutral chip with a colored dot prefix, no fill block.',
    bestFor: 'Sidebar legend, subtle categorization',
  },
  {
    id: 'stripe',
    name: '07 · Left stripe',
    description: 'Light neutral chip with a bold left color bar.',
    bestFor: 'Scanning categories quickly on tiles',
  },
  {
    id: 'glass',
    name: '08 · Glass',
    description: 'Frosted translucent chip with colored rim glow.',
    bestFor: 'Layered canvas, premium / n8n UI',
  },
  {
    id: 'underline',
    name: '09 · Underline accent',
    description: 'Text-only tags with colored underline, no pill shape.',
    bestFor: 'Minimal hero, magazine layout',
  },
  {
    id: 'square-badge',
    name: '10 · Square badge',
    description: 'Compact stamp badges with sharp corners and bold type.',
    bestFor: 'Dense grids, status / role labels',
  },
]

export function contrastText(color: string): string {
  const hex = color.replace('#', '')
  if (hex.length !== 6) return '#ffffff'
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.62 ? '#171717' : '#ffffff'
}

export function softTint(color: string, amount = 88): string {
  return `color-mix(in srgb, ${color} ${amount}% , #ffffff)`
}
