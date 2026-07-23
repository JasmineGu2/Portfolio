import type { CSSProperties } from 'react'
import type { ColorSchemeId } from './color-schemes'
import {
  applyCustomDuoOverrides,
  getDefaultCustomDuoEdit,
  getClientDuoPaletteEdit,
  isCustomDuoScheme,
} from './custom-duo-palettes'
import { ensureHeroCardContrast } from './duo-contrast'
import {
  ALL_PALETTE_SCHEME_ENTRIES,
  type DuoBucketPalette,
  type HeroCardTheme,
  type PaletteGround,
  type PaletteSchemeId,
} from './palette-scheme-data'

export interface SchemePill {
  bg: string
  fg: string
  border: string
}

export type WorkTileMode = 'soft' | 'accent' | 'filled' | 'dark'

export interface ColorSchemeTokens {
  shellBg: string
  sidebarBg: string
  sidebarActiveBg: string
  canvasBg: string
  canvasDot: string
  hero: string
  heroFg: string
  heroSub: string
  heroBorder: string
  softBg: string
  softFg: string
  softBorder: string
  emGreen: string
  emBlue: string
  emMagenta: string
  pillMint: SchemePill
  pillSky: SchemePill
  pillCream: SchemePill
  pillLavender: SchemePill
  pillPeach: SchemePill
  ctaBg: string
  ctaFg: string
  badgeBg: string
  badgeFg: string
  cardLabel: string
  connector: string
  connectorPrimary: string
  workA: string
  workB: string
  workC: string
  workPalette: string[]
  workMode: WorkTileMode
  heroCards?: HeroCardTheme
  duoBuckets?: DuoBucketPalette
}

type Sw = [string, string, string]
type PillColors = [string, string, string, string, string]

function pill(bg: string, fg: string, border: string): SchemePill {
  return { bg, fg, border }
}

function accentPill(bg: string, fg = '#ffffff'): SchemePill {
  return pill(bg, fg, `color-mix(in srgb, ${bg} 72%, #000)`)
}

interface NeutralShell {
  shell: string
  canvas: string
  dot: string
  soft: string
  fg: string
  border: string
}

const WARM_WHITE: NeutralShell = {
  shell: '#faf9f7',
  canvas: '#f3f2ef',
  dot: '#ddd9d2',
  soft: '#ffffff',
  fg: '#1a1a1a',
  border: 'rgba(0, 0, 0, 0.05)',
}

const COOL_PEARL: NeutralShell = {
  shell: '#f8f9fb',
  canvas: '#f0f2f6',
  dot: '#c4cad4',
  soft: '#ffffff',
  fg: '#18181b',
  border: 'rgba(24, 24, 27, 0.05)',
}

const CREAM_WHITE: NeutralShell = {
  shell: '#faf8f5',
  canvas: '#f3f0eb',
  dot: '#d4cfc6',
  soft: '#ffffff',
  fg: '#292524',
  border: 'rgba(41, 37, 36, 0.06)',
}

const PURE_WHITE: NeutralShell = {
  shell: '#ffffff',
  canvas: '#f8f8f8',
  dot: '#e5e5e5',
  soft: '#ffffff',
  fg: '#0a0a0a',
  border: 'rgba(0, 0, 0, 0.04)',
}

const RETRO_IVORY: NeutralShell = {
  shell: '#faf8f4',
  canvas: '#f2ede4',
  dot: '#ddd4c4',
  soft: '#fffdf9',
  fg: '#292524',
  border: 'rgba(41, 37, 36, 0.06)',
}

const RETRO_WARM: NeutralShell = {
  shell: '#faf7f2',
  canvas: '#f2ece3',
  dot: '#d9cfc0',
  soft: '#fffefb',
  fg: '#1c1917',
  border: 'rgba(28, 25, 23, 0.06)',
}

/** Palette schemes share neutral shells; reference colors appear only as accents. */
const PALETTE_NEUTRALS = {
  pop: PURE_WHITE,
  tangerine: WARM_WHITE,
  tangerineSea: COOL_PEARL,
  lee: WARM_WHITE,
  leeForest: COOL_PEARL,
  electric: COOL_PEARL,
  apricot: CREAM_WHITE,
  market: WARM_WHITE,
  marketNavy: COOL_PEARL,
  peony: CREAM_WHITE,
  leeBrand: CREAM_WHITE,
  amour: WARM_WHITE,
  coast: {
    shell: '#F2EEE9',
    canvas: '#ebe5df',
    dot: '#d8d0c8',
    soft: '#ffffff',
    fg: '#1a1a1a',
    border: 'rgba(0, 0, 0, 0.05)',
  },
  play: {
    shell: '#FAF8F4',
    canvas: '#f2ede6',
    dot: '#ddd4c8',
    soft: '#ffffff',
    fg: '#1a1a1a',
    border: 'rgba(0, 0, 0, 0.05)',
  },
  tuned: WARM_WHITE,
  cultura: {
    shell: '#F5F0E8',
    canvas: '#ebe4d8',
    dot: '#d8cfc0',
    soft: '#ffffff',
    fg: '#1c1917',
    border: 'rgba(28, 25, 23, 0.06)',
  },
  trail: {
    shell: '#F4F4F2',
    canvas: '#eaeae6',
    dot: '#d4d4d0',
    soft: '#ffffff',
    fg: '#1a1a1a',
    border: 'rgba(0, 0, 0, 0.05)',
  },
  eggshell: {
    shell: '#EFE7D4',
    canvas: '#e5dcc8',
    dot: '#cfc4ae',
    soft: '#ffffff',
    fg: '#1A0088',
    border: 'rgba(26, 0, 136, 0.08)',
  },
  sunset: {
    shell: '#FFF4EC',
    canvas: '#FFE8D8',
    dot: '#f5cdb8',
    soft: '#ffffff',
    fg: '#292524',
    border: 'rgba(41, 37, 36, 0.06)',
  },
  midnight: COOL_PEARL,
  sage: {
    shell: '#F4F6F0',
    canvas: '#E8EDE4',
    dot: '#d4ddd0',
    soft: '#ffffff',
    fg: '#1c1917',
    border: 'rgba(28, 25, 23, 0.06)',
  },
  berry: {
    shell: '#FFF5F8',
    canvas: '#FCE7F3',
    dot: '#f5c4d8',
    soft: '#ffffff',
    fg: '#292524',
    border: 'rgba(41, 37, 36, 0.06)',
  },
  slate: {
    shell: '#F1F5F9',
    canvas: '#E2E8F0',
    dot: '#cbd5e1',
    soft: '#ffffff',
    fg: '#1e293b',
    border: 'rgba(30, 41, 59, 0.06)',
  },
  coral: {
    shell: '#FFF8F3',
    canvas: '#FFEDE0',
    dot: '#f5d5c4',
    soft: '#ffffff',
    fg: '#292524',
    border: 'rgba(41, 37, 36, 0.06)',
  },
  indigo: {
    shell: '#F5F3FF',
    canvas: '#EDE9FE',
    dot: '#ddd6fe',
    soft: '#ffffff',
    fg: '#1e1b4b',
    border: 'rgba(30, 27, 75, 0.06)',
  },
  rosewood: {
    shell: '#FAF6F3',
    canvas: '#F0E8E0',
    dot: '#dccfc4',
    soft: '#ffffff',
    fg: '#292524',
    border: 'rgba(41, 37, 36, 0.06)',
  },
  moss: {
    shell: '#F3F4F1',
    canvas: '#E7E5E4',
    dot: '#d6d3d1',
    soft: '#ffffff',
    fg: '#1c1917',
    border: 'rgba(28, 25, 23, 0.06)',
  },
  neonPastel: PURE_WHITE,
  sandChartreuse: {
    shell: '#FFFFFF',
    canvas: '#FAF8F4',
    dot: '#C9BFAA',
    soft: '#ffffff',
    fg: '#1A0089',
    border: 'rgba(26, 0, 137, 0.08)',
  },
  coastGreige: {
    shell: '#FFFFFF',
    canvas: '#FAFAF8',
    dot: '#CCC4BC',
    soft: '#ffffff',
    fg: '#00408C',
    border: 'rgba(0, 64, 140, 0.08)',
  },
  coastBlush: {
    shell: '#FFFFFF',
    canvas: '#FAF8F6',
    dot: '#D5CEC8',
    soft: '#ffffff',
    fg: '#00408C',
    border: 'rgba(0, 64, 140, 0.08)',
  },
  signalOrange: {
    shell: '#FFFFFF',
    canvas: '#FAF8F5',
    dot: '#D5CEC4',
    soft: '#ffffff',
    fg: '#3D4F6B',
    border: 'rgba(61, 79, 107, 0.08)',
  },
} as const satisfies Record<string, NeutralShell>

function makeAccentNeutralTokens(
  neutrals: NeutralShell,
  accents: Sw,
  pillColors?: PillColors
): ColorSchemeTokens {
  const [a1, a2, a3] = accents
  const [cream, sky, mint, lavender, peach] = pillColors ?? [a1, a2, a3, a2, a1]

  return {
    shellBg: neutrals.shell,
    sidebarBg: '#ffffff',
    sidebarActiveBg: neutrals.soft,
    canvasBg: neutrals.canvas,
    canvasDot: neutrals.dot,
    hero: neutrals.soft,
    heroFg: neutrals.fg,
    heroSub: '#6b7280',
    heroBorder: neutrals.border,
    softBg: neutrals.soft,
    softFg: neutrals.fg,
    softBorder: neutrals.border,
    emGreen: mint,
    emBlue: sky,
    emMagenta: cream,
    pillMint: accentPill(mint),
    pillSky: accentPill(sky),
    pillCream: accentPill(cream),
    pillLavender: accentPill(lavender),
    pillPeach: accentPill(peach),
    ctaBg: neutrals.fg,
    ctaFg: '#ffffff',
    badgeBg: '#ffffff',
    badgeFg: '#6b7280',
    cardLabel: '#6b7280',
    connector: 'rgba(17, 17, 17, 0.32)',
    connectorPrimary: 'rgba(17, 17, 17, 0.52)',
    workA: a1,
    workB: a2,
    workC: a3,
    workPalette: [cream, sky, mint, lavender, peach],
    workMode: 'accent',
  }
}

function makeTintGroundTokens(
  ground: PaletteGround,
  accents: Sw,
  pillColors?: PillColors
): ColorSchemeTokens {
  const fg = ground.fg ?? '#1a1a1a'
  const border = ground.border ?? 'rgba(0, 0, 0, 0.06)'
  const [a1, a2, a3] = accents
  const [cream, sky, mint, lavender, peach] = pillColors ?? [a1, a2, a3, a2, a1]

  return {
    shellBg: ground.shell,
    sidebarBg: ground.soft,
    sidebarActiveBg: '#ffffff',
    canvasBg: ground.canvas,
    canvasDot: ground.dot,
    hero: ground.soft,
    heroFg: fg,
    heroSub: '#6b7280',
    heroBorder: border,
    softBg: ground.soft,
    softFg: fg,
    softBorder: border,
    emGreen: mint,
    emBlue: sky,
    emMagenta: cream,
    pillMint: accentPill(mint),
    pillSky: accentPill(sky),
    pillCream: accentPill(cream),
    pillLavender: accentPill(lavender),
    pillPeach: accentPill(peach),
    ctaBg: fg,
    ctaFg: '#ffffff',
    badgeBg: '#ffffff',
    badgeFg: '#6b7280',
    cardLabel: '#6b7280',
    connector: 'rgba(17, 17, 17, 0.32)',
    connectorPrimary: 'rgba(17, 17, 17, 0.52)',
    workA: a1,
    workB: a2,
    workC: a3,
    workPalette: [cream, sky, mint, lavender, peach],
    workMode: 'accent',
  }
}

function makeDuoGroundTokens(
  neutrals: NeutralShell,
  accents: Sw,
  pillColors: PillColors,
  cards: HeroCardTheme,
  duoBuckets?: DuoBucketPalette
): ColorSchemeTokens {
  const base = makeAccentNeutralTokens(neutrals, accents, pillColors)

  return {
    ...base,
    shellBg: neutrals.shell,
    canvasBg: neutrals.canvas,
    canvasDot: neutrals.dot,
    heroCards: cards,
    duoBuckets,
    workMode: 'accent',
  }
}

function heroCardCssVars(cards: HeroCardTheme): CSSProperties {
  return {
    '--sch-hero-intro-bg': cards.intro.bg,
    '--sch-hero-intro-fg': cards.intro.fg,
    '--sch-hero-intro-sub': cards.intro.sub ?? cards.intro.fg,
    '--sch-hero-intro-border': cards.intro.border ?? 'rgba(0,0,0,0.06)',
    '--sch-hero-intro-em-green': cards.intro.emGreen ?? cards.intro.fg,
    '--sch-hero-intro-em-blue': cards.intro.emBlue ?? cards.intro.fg,
    '--sch-hero-intro-em-magenta': cards.intro.emMagenta ?? cards.intro.fg,
    '--sch-hero-nav-bg': cards.nav.bg,
    '--sch-hero-nav-fg': cards.nav.fg,
    '--sch-hero-nav-sub': cards.nav.sub ?? cards.nav.fg,
    '--sch-hero-nav-border': cards.nav.border ?? 'rgba(0,0,0,0.06)',
    '--sch-hero-pills-bg': cards.pills.bg,
    '--sch-hero-pills-fg': cards.pills.fg,
    '--sch-hero-pills-sub': cards.pills.sub ?? cards.pills.fg,
    '--sch-hero-pills-label': cards.pills.label ?? cards.pills.fg,
    '--sch-hero-pills-border': cards.pills.border ?? 'rgba(0,0,0,0.06)',
    '--sch-hero-actions-bg': cards.actions.bg,
    '--sch-hero-actions-fg': cards.actions.fg,
    '--sch-hero-actions-sub': cards.actions.sub ?? cards.actions.fg,
    '--sch-hero-actions-border': cards.actions.border ?? 'rgba(0,0,0,0.06)',
  } as CSSProperties
}

function buildPaletteTokens(): Record<string, ColorSchemeTokens> {
  const entries: Record<string, ColorSchemeTokens> = {}

  for (const entry of ALL_PALETTE_SCHEME_ENTRIES) {
    if (entry.variant === 'light' && entry.neutralKey) {
      entries[entry.id] = makeAccentNeutralTokens(
        PALETTE_NEUTRALS[entry.neutralKey],
        entry.accents,
        entry.pills
      )
      continue
    }

    if (entry.variant === 'tint' && entry.ground) {
      entries[entry.id] = makeTintGroundTokens(entry.ground, entry.accents, entry.pills)
      continue
    }

    if (entry.variant === 'duo' && entry.duo && entry.neutralKey) {
      entries[entry.id] = makeDuoGroundTokens(
        PALETTE_NEUTRALS[entry.neutralKey],
        entry.accents,
        entry.pills,
        entry.duo,
        entry.duoBuckets
      )
    }
  }

  return entries
}

const PALETTE_SCHEME_TOKENS = buildPaletteTokens() as Record<PaletteSchemeId, ColorSchemeTokens>

const SOFT_TOKENS: ColorSchemeTokens = {
  ...makeAccentNeutralTokens(WARM_WHITE, ['#db2777', '#2563eb', '#059669'], [
    '#db2777',
    '#2563eb',
    '#059669',
    '#2563eb',
    '#db2777',
  ]),
  ctaBg: '#1a1a1a',
}

export const SCHEME_TOKENS: Record<ColorSchemeId, ColorSchemeTokens> = {
  soft: SOFT_TOKENS,
  'soft-mist': makeAccentNeutralTokens(COOL_PEARL, ['#f472b6', '#60a5fa', '#34d399'], [
    '#f472b6',
    '#60a5fa',
    '#34d399',
    '#a78bfa',
    '#fb7185',
  ]),
  'soft-blush': makeAccentNeutralTokens(CREAM_WHITE, ['#ec4899', '#a78bfa', '#4ade80'], [
    '#ec4899',
    '#a78bfa',
    '#4ade80',
    '#f472b6',
    '#818cf8',
  ]),
  'rainbow-bright': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ef4444', '#3b82f6', '#22c55e'],
    ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6']
  ),
  'rainbow-bright-vivid': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ff1744', '#2979ff', '#00e676'],
    ['#ff1744', '#ff9100', '#00e676', '#2979ff', '#d500f9']
  ),
  'rainbow-bright-sky': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ef4444', '#0ea5e9', '#22c55e'],
    ['#ef4444', '#22c55e', '#0ea5e9', '#8b5cf6', '#f59e0b']
  ),
  'rainbow-prism': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ef4444', '#eab308', '#3b82f6'],
    ['#ef4444', '#eab308', '#3b82f6', '#22c55e', '#a855f7']
  ),
  'rainbow-prism-classic': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#dc2626', '#ca8a04', '#2563eb'],
    ['#dc2626', '#ca8a04', '#2563eb', '#16a34a', '#9333ea']
  ),
  'rainbow-prism-neon': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ff3333', '#ffdd00', '#0066ff'],
    ['#ff3333', '#ffdd00', '#0066ff', '#00cc66', '#cc00ff']
  ),
  'rainbow-prism-pure': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#e63946', '#ffd60a', '#1d4ed8'],
    ['#e63946', '#ffd60a', '#1d4ed8', '#2a9d8f', '#7209b7']
  ),
  'rainbow-prism-light': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#f87171', '#fbbf24', '#60a5fa'],
    ['#f87171', '#fbbf24', '#60a5fa', '#4ade80', '#c084fc']
  ),
  'rainbow-retro': makeAccentNeutralTokens(
    RETRO_IVORY,
    ['#ff6b6b', '#feca57', '#48dbfb'],
    ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff']
  ),
  'rainbow-retro-warm': makeAccentNeutralTokens(
    RETRO_WARM,
    ['#e17055', '#fdcb6e', '#74b9ff'],
    ['#e17055', '#fdcb6e', '#74b9ff', '#a29bfe', '#ff7675']
  ),
  'rainbow-retro-groove': makeAccentNeutralTokens(
    RETRO_IVORY,
    ['#f97316', '#84cc16', '#a855f7'],
    ['#f97316', '#84cc16', '#a855f7', '#38bdf8', '#fbbf24']
  ),
  'rainbow-retro-vintage': makeAccentNeutralTokens(
    RETRO_WARM,
    ['#cd6155', '#f4d03f', '#5dade2'],
    ['#cd6155', '#f4d03f', '#5dade2', '#af7ac5', '#58d68d']
  ),
  'rainbow-retro-sunset': makeAccentNeutralTokens(
    RETRO_IVORY,
    ['#ff7675', '#fdcb6e', '#74b9ff'],
    ['#ff7675', '#fab1a0', '#fdcb6e', '#74b9ff', '#a29bfe']
  ),
  'rainbow-confetti': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#ec4899', '#3b82f6', '#eab308'],
    ['#ec4899', '#f472b6', '#3b82f6', '#eab308', '#22c55e']
  ),
  'rainbow-confetti-pop': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#f472b6', '#6366f1', '#fde047'],
    ['#f472b6', '#6366f1', '#fde047', '#4ade80', '#fb923c']
  ),
  'rainbow-confetti-glow': makeAccentNeutralTokens(
    PURE_WHITE,
    ['#d946ef', '#06b6d4', '#facc15'],
    ['#d946ef', '#a855f7', '#06b6d4', '#facc15', '#22c55e']
  ),
  ...PALETTE_SCHEME_TOKENS,
}

export function getBaseSchemeTokens(id: ColorSchemeId): ColorSchemeTokens {
  const normalized = id.endsWith('-bold') ? (id.replace(/-bold$/, '-duo') as ColorSchemeId) : id
  return SCHEME_TOKENS[normalized] ?? SCHEME_TOKENS[DEFAULT_SCHEME_FALLBACK]
}

const DEFAULT_SCHEME_FALLBACK = 'rainbow-prism' satisfies ColorSchemeId

export function getSchemeTokens(id: ColorSchemeId): ColorSchemeTokens {
  const normalized = id.endsWith('-bold') ? (id.replace(/-bold$/, '-duo') as ColorSchemeId) : id
  let tokens = getBaseSchemeTokens(normalized)

  if (isCustomDuoScheme(normalized)) {
    const edit = getClientDuoPaletteEdit(normalized)
    tokens = applyCustomDuoOverrides(normalized, tokens, edit)
  } else if (tokens.duoBuckets && tokens.heroCards) {
    tokens = {
      ...tokens,
      heroCards: ensureHeroCardContrast(tokens.heroCards),
    }
  }

  return tokens
}

export function schemeTokensToCssVars(tokens: ColorSchemeTokens): CSSProperties {
  return {
    '--sch-shell-bg': tokens.shellBg,
    '--sch-sidebar-bg': tokens.sidebarBg,
    '--sch-sidebar-active-bg': tokens.sidebarActiveBg,
    '--sch-canvas-bg': tokens.canvasBg,
    '--sch-canvas-dot': tokens.canvasDot,
    '--sch-hero': tokens.hero,
    '--sch-hero-fg': tokens.heroFg,
    '--sch-hero-sub': tokens.heroSub,
    '--sch-hero-border': tokens.heroBorder,
    '--sch-soft-bg': tokens.softBg,
    '--sch-soft-fg': tokens.softFg,
    '--sch-soft-border': tokens.softBorder,
    '--sch-em-green': tokens.emGreen,
    '--sch-em-blue': tokens.emBlue,
    '--sch-em-magenta': tokens.emMagenta,
    '--sch-pill-mint-bg': tokens.pillMint.bg,
    '--sch-pill-mint-fg': tokens.pillMint.fg,
    '--sch-pill-mint-border': tokens.pillMint.border,
    '--sch-pill-sky-bg': tokens.pillSky.bg,
    '--sch-pill-sky-fg': tokens.pillSky.fg,
    '--sch-pill-sky-border': tokens.pillSky.border,
    '--sch-pill-cream-bg': tokens.pillCream.bg,
    '--sch-pill-cream-fg': tokens.pillCream.fg,
    '--sch-pill-cream-border': tokens.pillCream.border,
    '--sch-pill-lavender-bg': tokens.pillLavender.bg,
    '--sch-pill-lavender-fg': tokens.pillLavender.fg,
    '--sch-pill-lavender-border': tokens.pillLavender.border,
    '--sch-pill-peach-bg': tokens.pillPeach.bg,
    '--sch-pill-peach-fg': tokens.pillPeach.fg,
    '--sch-pill-peach-border': tokens.pillPeach.border,
    '--sch-cta-bg': tokens.ctaBg,
    '--sch-cta-fg': tokens.ctaFg,
    '--sch-badge-bg': tokens.badgeBg,
    '--sch-badge-fg': tokens.badgeFg,
    '--sch-card-label': tokens.cardLabel,
    '--sch-connector': tokens.connector,
    '--sch-connector-primary': tokens.connectorPrimary,
    '--sch-work-a': tokens.workA,
    '--sch-work-b': tokens.workB,
    '--sch-work-c': tokens.workC,
    ...(tokens.heroCards ? heroCardCssVars(tokens.heroCards) : {}),
  } as CSSProperties
}
