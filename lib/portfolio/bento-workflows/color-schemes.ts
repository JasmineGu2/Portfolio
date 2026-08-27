import {
  ALL_PALETTE_SCHEME_ENTRIES,
  PALETTE_DUO_SCHEME_IDS,
  PALETTE_LIGHT_SCHEME_IDS,
  PALETTE_SCHEME_IDS,
  PALETTE_TINT_SCHEME_IDS,
  type PaletteSchemeId,
  getPaletteVariant,
  normalizePaletteSchemeId,
} from './palette-scheme-data'

export type ClassicColorSchemeId =
  | 'warm-portfolio'
  | 'portfolio-warm'
  | 'soft'
  | 'soft-mist'
  | 'soft-blush'
  | 'rainbow-bright'
  | 'rainbow-bright-vivid'
  | 'rainbow-bright-sky'
  | 'rainbow-prism'
  | 'rainbow-prism-classic'
  | 'rainbow-prism-neon'
  | 'rainbow-prism-pure'
  | 'rainbow-prism-light'
  | 'rainbow-retro'
  | 'rainbow-retro-warm'
  | 'rainbow-retro-groove'
  | 'rainbow-retro-vintage'
  | 'rainbow-retro-sunset'
  | 'rainbow-confetti'
  | 'rainbow-confetti-pop'
  | 'rainbow-confetti-glow'

export type ColorSchemeId = ClassicColorSchemeId | PaletteSchemeId

export interface ColorSchemeSpec {
  id: ColorSchemeId
  label: string
  description: string
  swatches: [string, string, string]
}

export const BENTO_COLOR_SCHEMES: ColorSchemeSpec[] = [
  {
    id: 'warm-portfolio',
    label: 'Warm Portfolio',
    description: 'Warm ivory canvas: amber, peach, lavender accents',
    swatches: ['#faf6f0', '#e8784a', '#c8b8e8'],
  },
  {
    id: 'portfolio-warm',
    label: 'Portfolio Warm',
    description: 'Alias for the warm ivory canvas aligned with Architecture palette',
    swatches: ['#faf6f0', '#e8784a', '#c8b8e8'],
  },
  {
    id: 'soft',
    label: 'Soft',
    description: 'Warm white: rose, blue, green tags',
    swatches: ['#ffffff', '#db2777', '#2563eb'],
  },
  {
    id: 'soft-mist',
    label: 'Soft Mist',
    description: 'Cool pearl: blush, sky, sage tags',
    swatches: ['#ffffff', '#f472b6', '#60a5fa'],
  },
  {
    id: 'soft-blush',
    label: 'Soft Blush',
    description: 'Cream white: peony, lilac, mint tags',
    swatches: ['#ffffff', '#ec4899', '#a78bfa'],
  },
  {
    id: 'rainbow-bright',
    label: 'Rainbow Bright',
    description: 'White base, full-spectrum bold tags',
    swatches: ['#ffffff', '#ef4444', '#3b82f6'],
  },
  {
    id: 'rainbow-bright-vivid',
    label: 'Bright Vivid',
    description: 'Pure white, max-saturation rainbow punch',
    swatches: ['#ffffff', '#ff1744', '#2979ff'],
  },
  {
    id: 'rainbow-bright-sky',
    label: 'Bright Sky',
    description: 'White canvas, red-green-sky-violet spread',
    swatches: ['#ffffff', '#ef4444', '#0ea5e9'],
  },
  {
    id: 'rainbow-prism',
    label: 'Rainbow Prism',
    description: 'White canvas, red-yellow-blue primaries',
    swatches: ['#ffffff', '#ef4444', '#eab308'],
  },
  {
    id: 'rainbow-prism-classic',
    label: 'Prism Classic',
    description: 'White hero, sharp RYB primary set',
    swatches: ['#ffffff', '#dc2626', '#ca8a04'],
  },
  {
    id: 'rainbow-prism-neon',
    label: 'Prism Neon',
    description: 'White base, neon red-yellow-blue-green',
    swatches: ['#ffffff', '#ff3333', '#ffdd00'],
  },
  {
    id: 'rainbow-prism-pure',
    label: 'Prism Pure',
    description: 'White canvas, clean saturated primaries',
    swatches: ['#ffffff', '#e63946', '#ffd60a'],
  },
  {
    id: 'rainbow-prism-light',
    label: 'Prism Light',
    description: 'White hero, softer red-gold-sky prism',
    swatches: ['#ffffff', '#f87171', '#fbbf24'],
  },
  {
    id: 'rainbow-retro',
    label: 'Rainbow Retro',
    description: 'Warm white, 70s coral-gold-sky nostalgia',
    swatches: ['#ffffff', '#ff6b6b', '#feca57'],
  },
  {
    id: 'rainbow-retro-warm',
    label: 'Retro Warm',
    description: 'Ivory canvas, terracotta-mustard-periwinkle',
    swatches: ['#ffffff', '#e17055', '#fdcb6e'],
  },
  {
    id: 'rainbow-retro-groove',
    label: 'Retro Groove',
    description: 'Cream base, orange-avocado-purple groove',
    swatches: ['#ffffff', '#f97316', '#84cc16'],
  },
  {
    id: 'rainbow-retro-vintage',
    label: 'Retro Vintage',
    description: 'Warm ivory, muted 60s poster palette',
    swatches: ['#ffffff', '#cd6155', '#f4d03f'],
  },
  {
    id: 'rainbow-retro-sunset',
    label: 'Retro Sunset',
    description: 'Cream canvas, coral-peach-gold dusk',
    swatches: ['#ffffff', '#ff7675', '#fdcb6e'],
  },
  {
    id: 'rainbow-confetti',
    label: 'Rainbow Confetti',
    description: 'White canvas, party pink-blue-yellow-green',
    swatches: ['#ffffff', '#ec4899', '#3b82f6'],
  },
  {
    id: 'rainbow-confetti-pop',
    label: 'Confetti Pop',
    description: 'Pure white, hot pink-indigo-lime party',
    swatches: ['#ffffff', '#f472b6', '#6366f1'],
  },
  {
    id: 'rainbow-confetti-glow',
    label: 'Confetti Glow',
    description: 'White hero, violet-cyan-gold celebration',
    swatches: ['#ffffff', '#d946ef', '#06b6d4'],
  },
  ...ALL_PALETTE_SCHEME_ENTRIES.map(({ id, label, description, swatches }) => ({
    id,
    label,
    description,
    swatches,
  })),
]

export {
  PALETTE_DUO_SCHEME_IDS,
  PALETTE_LIGHT_SCHEME_IDS,
  PALETTE_SCHEME_IDS,
  PALETTE_TINT_SCHEME_IDS,
  getPaletteVariant,
  normalizePaletteSchemeId,
}

export function normalizeColorSchemeId(id: ColorSchemeId): ColorSchemeId {
  return normalizePaletteSchemeId(id) as ColorSchemeId
}

export const RAINBOW_SCHEME_IDS: ColorSchemeId[] = BENTO_COLOR_SCHEMES.filter((s) =>
  s.id.startsWith('rainbow-')
).map((s) => s.id)

export function isRainbowScheme(id: ColorSchemeId): boolean {
  return id.startsWith('rainbow-')
}

export function isPaletteScheme(id: ColorSchemeId): boolean {
  return id.startsWith('palette-')
}

export const DEFAULT_COLOR_SCHEME: ColorSchemeId = 'warm-portfolio'

/** Production Work / Projects bento, warm portfolio palette aligned with --arch-* tokens */
export const PORTFOLIO_DEFAULT_SCHEME: ColorSchemeId = 'warm-portfolio'

/** @deprecated Use PORTFOLIO_DEFAULT_SCHEME */
export const PORTFOLIO_PAGE_SCHEME: ColorSchemeId = PORTFOLIO_DEFAULT_SCHEME

export function getColorSchemeIndex(id: ColorSchemeId): number {
  return BENTO_COLOR_SCHEMES.findIndex((scheme) => scheme.id === normalizeColorSchemeId(id))
}

export function getAdjacentColorScheme(
  id: ColorSchemeId,
  direction: 'prev' | 'next'
): ColorSchemeId {
  const index = getColorSchemeIndex(normalizeColorSchemeId(id))
  const safeIndex = index >= 0 ? index : 0
  const count = BENTO_COLOR_SCHEMES.length
  const nextIndex =
    direction === 'next'
      ? (safeIndex + 1) % count
      : (safeIndex - 1 + count) % count
  return BENTO_COLOR_SCHEMES[nextIndex]?.id ?? DEFAULT_COLOR_SCHEME
}
