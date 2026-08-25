import type { WorkId } from './experience-layouts'
import { WORK_ORDER } from './experience-layouts'
import type { ColorSchemeId } from './color-schemes'
import { getPaletteVariant } from './color-schemes'
import { contrastChipText } from './duo-contrast'
import { getSchemeTokens, type ColorSchemeTokens } from './scheme-tokens'
import { EXPERIENCE_CARDS } from '@/lib/portfolio/experience-cards-data'

export type TagVariant = 'primary' | 'supporting' | 'category' | 'filled'

/** Brand colors matched to each org's logo */
export interface WorkAccent {
  /** Primary accent — strip + filled chip background */
  color: string
  /** Gradient end (defaults via CSS color-mix) */
  colorEnd?: string
  /** Logo wrap tint on light surfaces */
  soft: string
  /** Short role chip label */
  chip: string
  /** Text on filled chip pill */
  chipFg?: string
  /** Text color on filled tile */
  textOn?: 'light' | 'dark'
  /** @deprecated Legacy brand highlight — no longer used for tags */
  highlight?: string
}

/** Shared soft-tint tag vars for tags, chips, and sidebar legend */
export function schemeTagStyleVars(
  color: string,
  variant: TagVariant = 'primary'
): Record<string, string> {
  if (variant === 'supporting') {
    return {
      '--exp-accent-base': 'var(--pf-accent)',
      '--exp-chip-fg': 'var(--pf-muted)',
      '--exp-chip-soft': 'color-mix(in srgb, var(--pf-peach) 10%, var(--pf-surface))',
      '--exp-chip-border': 'color-mix(in srgb, var(--pf-accent) 14%, transparent)',
    }
  }

  if (variant === 'category') {
    return {
      '--exp-accent-base': 'var(--pf-accent)',
      '--exp-chip-fg': 'var(--pf-muted)',
      '--exp-chip-soft': 'transparent',
      '--exp-chip-border': 'transparent',
    }
  }

  if (variant === 'filled') {
    const fg = contrastChipText(color)
    return {
      '--exp-accent-base': color,
      '--exp-chip-fg': fg,
      '--exp-chip-soft': color,
      '--exp-chip-border': color,
    }
  }

  return {
    '--exp-accent-base': 'var(--pf-accent)',
    '--exp-chip-fg': 'var(--pf-accent-chip-fg)',
    '--exp-chip-soft': 'color-mix(in srgb, var(--pf-peach) 28%, var(--pf-surface))',
    '--exp-chip-border': 'var(--pf-accent-chip-border)',
  }
}

export function getSchemePaletteColor(schemeId: ColorSchemeId, index: number): string {
  const palette = getSchemeTokens(schemeId).workPalette
  const idx = ((index % palette.length) + palette.length) % palette.length
  return palette[idx]
}

export const WORK_ACCENTS: Record<WorkId, WorkAccent> = {
  western: {
    color: '#4F2683',
    colorEnd: '#3A1D62',
    soft: '#f3eff8',
    chip: EXPERIENCE_CARDS.western.category,
    textOn: 'light',
  },
  'hack-western': {
    color: '#6D28D9',
    colorEnd: '#5B21B6',
    soft: '#FAF8F4',
    chip: EXPERIENCE_CARDS['hack-western'].category,
    textOn: 'dark',
  },
  metaverse: {
    color: '#1E3333',
    colorEnd: '#2A4A4A',
    soft: '#FAF8F4',
    chip: EXPERIENCE_CARDS.metaverse.category,
    textOn: 'dark',
  },
  omers: {
    color: '#003DA5',
    colorEnd: '#002B75',
    soft: '#FAF8F4',
    chip: EXPERIENCE_CARDS.omers.category,
    textOn: 'dark',
  },
  intuit: {
    color: '#0077C5',
    colorEnd: '#005A99',
    soft: '#e6f3fa',
    chip: EXPERIENCE_CARDS.intuit.category,
    textOn: 'light',
  },
  tesla: {
    color: '#E31937',
    colorEnd: '#B8142C',
    soft: '#fde8eb',
    chip: EXPERIENCE_CARDS.tesla.category,
    textOn: 'light',
  },
  'autodesk-eng': {
    color: '#1A1A1A',
    colorEnd: '#000000',
    soft: '#f0f0f0',
    chip: EXPERIENCE_CARDS['autodesk-eng'].category,
    textOn: 'dark',
  },
  autodesk: {
    color: '#000000',
    colorEnd: '#1A1A1A',
    soft: '#f0f0f0',
    chip: EXPERIENCE_CARDS.autodesk.category,
    textOn: 'dark',
  },
  'ivey-product': {
    color: '#7B002C',
    colorEnd: '#5C0021',
    soft: '#FCF893',
    chip: EXPERIENCE_CARDS['ivey-product'].category,
    textOn: 'dark',
  },
  'stealth-startup': {
    color: '#14B8A6',
    colorEnd: '#0D9488',
    soft: '#ecfdf8',
    chip: EXPERIENCE_CARDS['stealth-startup'].category,
    textOn: 'light',
  },
}

/** @deprecated Use WorkAccent.highlight instead */
export const WORK_ACCENT_HIGHLIGHTS: Partial<Record<WorkId, string>> = {
  metaverse: '#5BBFBF',
  omers: '#F7941D',
}

export const WORK_ACCENT_RAINBOW: WorkId[] = [
  'autodesk',
  'tesla',
  'autodesk-eng',
  'intuit',
  'omers',
  'stealth-startup',
  'metaverse',
  'hack-western',
  'ivey-product',
]

/** Maps each experience to a hero pill palette slot */
export type WorkPillTone = 'mint' | 'sky' | 'cream' | 'lavender' | 'peach'

export const WORK_SCHEME_TONE: Record<WorkId, WorkPillTone> = {
  western: 'lavender',
  'hack-western': 'lavender',
  metaverse: 'mint',
  omers: 'sky',
  intuit: 'sky',
  tesla: 'peach',
  'autodesk-eng': 'cream',
  autodesk: 'cream',
  'ivey-product': 'lavender',
  'stealth-startup': 'mint',
}

/** CSS custom properties for scheme-matched accent tiles */
export function workAccentStyleVars(accent: WorkAccent): Record<string, string> {
  return {
    ...schemeTagStyleVars(accent.color),
    '--exp-accent': accent.color,
    '--exp-accent-end': accent.colorEnd ?? accent.color,
    '--exp-soft': accent.soft,
  }
}

/** Inline vars for work / gallery / project bento tiles */
export function workTileThemeStyleVars(accent: WorkAccent): Record<string, string> {
  const fg = accent.chipFg ?? (accent.textOn === 'dark' ? '#1a1a1a' : '#ffffff')
  const vars: Record<string, string> = {
    ...workAccentStyleVars(accent),
    '--exp-work-bg': accent.color,
    '--exp-work-fg': fg,
    '--exp-work-border': accent.colorEnd ?? accent.color,
    '--exp-work-duo-bg': accent.color,
    '--exp-work-duo-fg': fg,
  }
  return vars
}

function accentFromSchemeColor(color: string, chip: string): WorkAccent {
  const chipFg = contrastChipText(color)
  return {
    color,
    colorEnd: `color-mix(in srgb, ${color} 72%, #000)`,
    soft: `color-mix(in srgb, ${color} 14%, #ffffff)`,
    chip,
    chipFg,
    textOn: chipFg === '#171717' ? 'dark' : 'light',
  }
}

type DuoRoleBucket = 'warm' | 'cool' | 'neutral'

/** Duo tiles — warm product, cool engineering, neutral enterprise/community */
const DUO_WARM_ROLES = ['autodesk', 'stealth-startup'] as const satisfies readonly WorkId[]
const DUO_COOL_ROLES = ['tesla', 'autodesk-eng', 'intuit'] as const satisfies readonly WorkId[]
const DUO_NEUTRAL_ROLES = [
  'metaverse',
  'omers',
  'hack-western',
  'ivey-product',
] as const satisfies readonly WorkId[]

const DUO_WORK_BUCKETS: Partial<Record<WorkId, DuoRoleBucket>> = {
  autodesk: 'warm',
  'stealth-startup': 'warm',
  tesla: 'cool',
  'autodesk-eng': 'cool',
  intuit: 'cool',
  metaverse: 'neutral',
  omers: 'neutral',
  'hack-western': 'neutral',
  'ivey-product': 'neutral',
}

function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace('#', '')
  if (normalized.length === 3) {
    return {
      r: Number.parseInt(normalized[0] + normalized[0], 16),
      g: Number.parseInt(normalized[1] + normalized[1], 16),
      b: Number.parseInt(normalized[2] + normalized[2], 16),
    }
  }
  if (normalized.length === 6) {
    return {
      r: Number.parseInt(normalized.slice(0, 2), 16),
      g: Number.parseInt(normalized.slice(2, 4), 16),
      b: Number.parseInt(normalized.slice(4, 6), 16),
    }
  }
  return null
}

function colorMetrics(hex: string): { hue: number; saturation: number; luminance: number } | null {
  const rgb = parseHexColor(hex)
  if (!rgb) return null

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255

  if (delta === 0) {
    return { hue: 0, saturation: 0, luminance }
  }

  let hue = 0
  if (max === r) hue = ((g - b) / delta) % 6
  else if (max === g) hue = (b - r) / delta + 2
  else hue = (r - g) / delta + 4
  hue = Math.round(hue * 60)
  if (hue < 0) hue += 360

  const saturation = delta / max
  return { hue, saturation, luminance }
}

function isNeutralWhiteColor(hex: string): boolean {
  const metrics = colorMetrics(hex)
  if (!metrics) return false
  return metrics.luminance > 0.78 && metrics.saturation < 0.2
}

function isNeutralTileColor(hex: string): boolean {
  const metrics = colorMetrics(hex)
  if (!metrics) return false
  if (isNeutralWhiteColor(hex)) return true
  return metrics.saturation < 0.28 && metrics.luminance >= 0.52 && metrics.luminance <= 0.9
}

function isWarmColor(hex: string): boolean {
  const metrics = colorMetrics(hex)
  if (!metrics) return false
  if (isNeutralWhiteColor(hex)) return false
  if (metrics.saturation < 0.18) return false
  return metrics.hue <= 90 || metrics.hue >= 300
}

function isCoolColor(hex: string): boolean {
  const metrics = colorMetrics(hex)
  if (!metrics) return false
  if (isNeutralWhiteColor(hex)) return false
  if (metrics.saturation < 0.18) return false
  return metrics.hue >= 155 && metrics.hue <= 285
}

function uniqueColors(colors: string[]): string[] {
  return [...new Set(colors.map((color) => color.toLowerCase()))]
}

function mixHex(colorA: string, colorB: string, amountB: number): string {
  const a = parseHexColor(colorA)
  const b = parseHexColor(colorB)
  if (!a || !b) return colorA
  const t = Math.max(0, Math.min(1, amountB))
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const blue = Math.round(a.b + (b.b - a.b) * t)
  return `#${[r, g, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

function warmnessScore(hex: string): number {
  const metrics = colorMetrics(hex)
  if (!metrics) return 0
  if (metrics.hue <= 90) return metrics.saturation + (90 - metrics.hue) / 180
  if (metrics.hue >= 300) return metrics.saturation + (metrics.hue - 300) / 180
  return 0
}

function coolnessScore(hex: string): number {
  const metrics = colorMetrics(hex)
  if (!metrics) return 0
  if (metrics.hue < 155 || metrics.hue > 285) return 0
  const center = 220
  return metrics.saturation + (1 - Math.abs(metrics.hue - center) / 65) * 0.35
}

function paletteAccentColors(tokens: ColorSchemeTokens): string[] {
  return uniqueColors([tokens.workA, tokens.workB, tokens.workC])
}

function pickBestWarmAccent(tokens: ColorSchemeTokens): string {
  const warm = paletteAccentColors(tokens).filter(isWarmColor)
  if (warm.length > 0) {
    return warm.sort((a, b) => warmnessScore(b) - warmnessScore(a))[0]
  }
  const ranked = paletteAccentColors(tokens).sort((a, b) => warmnessScore(b) - warmnessScore(a))
  return ranked[0] ?? tokens.workA
}

function pickBestCoolAccent(tokens: ColorSchemeTokens): string {
  const cool = paletteAccentColors(tokens).filter(isCoolColor)
  if (cool.length > 0) {
    return cool.sort((a, b) => coolnessScore(b) - coolnessScore(a))[0]
  }
  const ranked = paletteAccentColors(tokens).sort((a, b) => coolnessScore(b) - coolnessScore(a))
  return ranked[0] ?? tokens.workB
}

function bucketShades(base: string, count: number): string[] {
  if (count <= 1) return [base]
  return Array.from({ length: count }, (_, index) => {
    const step = index / Math.max(count - 1, 1)
    if (index === 0) return base
    if (step <= 0.5) return mixHex(base, '#ffffff', step * 0.34)
    return mixHex(base, '#000000', (step - 0.5) * 0.22)
  })
}

function neutralBucketShades(tokens: ColorSchemeTokens, count: number): string[] {
  const shells = uniqueColors([
    tokens.shellBg,
    tokens.canvasBg,
    tokens.softBg,
    tokens.hero,
    '#fafaf8',
    '#ffffff',
  ]).filter((color) => isNeutralTileColor(color) || (colorMetrics(color)?.saturation ?? 1) < 0.22)

  const ordered = shells.length > 0 ? shells : [tokens.softBg, tokens.shellBg, tokens.canvasBg]
  const shades: string[] = []

  for (let index = 0; index < count; index++) {
    if (ordered[index]) {
      shades.push(ordered[index])
      continue
    }
    const base = ordered[0] ?? tokens.softBg
    shades.push(mixHex(base, '#ffffff', 0.08 + index * 0.1))
  }

  return shades
}

function resolveDuoWorkColor(workId: WorkId, tokens: ColorSchemeTokens): string {
  const bucket = DUO_WORK_BUCKETS[workId] ?? 'cool'
  const palette = tokens.duoBuckets

  if (palette) {
    if (bucket === 'warm') return palette.warm
    if (bucket === 'cool') return palette.cool
    return palette.neutral
  }

  if (bucket === 'warm') {
    const shades = bucketShades(pickBestWarmAccent(tokens), DUO_WARM_ROLES.length)
    const slot = DUO_WARM_ROLES.indexOf(workId as (typeof DUO_WARM_ROLES)[number])
    return shades[slot >= 0 ? slot : 0] ?? tokens.workA
  }

  if (bucket === 'cool') {
    const shades = bucketShades(pickBestCoolAccent(tokens), DUO_COOL_ROLES.length)
    const slot = DUO_COOL_ROLES.indexOf(workId as (typeof DUO_COOL_ROLES)[number])
    return shades[slot >= 0 ? slot : 0] ?? tokens.workB
  }

  const shades = neutralBucketShades(tokens, DUO_NEUTRAL_ROLES.length)
  const slot = DUO_NEUTRAL_ROLES.indexOf(workId as (typeof DUO_NEUTRAL_ROLES)[number])
  return shades[slot >= 0 ? slot : 0] ?? tokens.softBg
}

/** Scheme palette accent for non-work tiles (gallery, etc.) */
export function schemeAccentFromColor(color: string, chip: string): WorkAccent {
  return accentFromSchemeColor(color, chip)
}

/** Scheme palette slot per experience — uniform filled tag styling */
export function resolveWorkAccent(workId: WorkId, schemeId: ColorSchemeId): WorkAccent {
  const base = WORK_ACCENTS[workId]
  const tokens = getSchemeTokens(schemeId)

  if (getPaletteVariant(schemeId) === 'duo') {
    return accentFromSchemeColor(resolveDuoWorkColor(workId, tokens), base.chip)
  }

  const palette = tokens.workPalette
  const idx = (WORK_ORDER as readonly WorkId[]).indexOf(workId)
  const color = palette[(idx >= 0 ? idx : 0) % palette.length]
  return accentFromSchemeColor(color, base.chip)
}

/** Sidebar legend dots — one swatch per work tag color in the active scheme */
export function getWorkAccentLegend(
  schemeId: ColorSchemeId
): { id: WorkId; color: string; label: string }[] {
  return WORK_ACCENT_RAINBOW.map((id) => {
    const accent = resolveWorkAccent(id, schemeId)
    return {
      id,
      color: accent.color,
      label: accent.chip,
    }
  })
}
