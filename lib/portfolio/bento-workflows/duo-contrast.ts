import type { HeroCardColors, HeroCardTheme } from './palette-scheme-data'

const DARK_TEXT = '#171717'
const LIGHT_TEXT = '#ffffff'

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

function srgbChannel(value: number): number {
  const channel = value / 255
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number | null {
  const rgb = parseHexColor(hex)
  if (!rgb) return null
  const r = srgbChannel(rgb.r)
  const g = srgbChannel(rgb.g)
  const b = srgbChannel(rgb.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(foreground: string, background: string): number {
  const fg = relativeLuminance(foreground)
  const bg = relativeLuminance(background)
  if (fg === null || bg === null) return 1
  const lighter = Math.max(fg, bg)
  const darker = Math.min(fg, bg)
  return (lighter + 0.05) / (darker + 0.05)
}

/** High-contrast body text on a solid fill */
export function contrastChipText(color: string): '#ffffff' | '#171717' {
  const lum = relativeLuminance(color)
  if (lum === null) return LIGHT_TEXT
  return lum > 0.52 ? DARK_TEXT : LIGHT_TEXT
}

export function ensureReadableForeground(background: string, preferred?: string): string {
  if (preferred) {
    if (contrastRatio(preferred, background) >= 4.5) return preferred
  }

  const darkRatio = contrastRatio(DARK_TEXT, background)
  const lightRatio = contrastRatio(LIGHT_TEXT, background)
  return darkRatio >= lightRatio ? DARK_TEXT : LIGHT_TEXT
}

function ensureCardContrast(card: HeroCardColors): HeroCardColors {
  const fg = ensureReadableForeground(card.bg, card.fg)
  const sub = ensureReadableForeground(card.bg, card.sub ?? fg)
  const label = card.label ? ensureReadableForeground(card.bg, card.label) : fg

  return {
    ...card,
    fg,
    sub: contrastRatio(sub, card.bg) >= 4.5 ? sub : fg,
    label,
    emGreen: card.emGreen ? ensureReadableForeground(card.bg, card.emGreen) : fg,
    emBlue: card.emBlue ? ensureReadableForeground(card.bg, card.emBlue) : fg,
    emMagenta: card.emMagenta ? ensureReadableForeground(card.bg, card.emMagenta) : fg,
  }
}

export function ensureHeroCardContrast(cards: HeroCardTheme): HeroCardTheme {
  return {
    intro: ensureCardContrast(cards.intro),
    nav: ensureCardContrast(cards.nav),
    pills: ensureCardContrast(cards.pills),
    actions: ensureCardContrast(cards.actions),
  }
}
