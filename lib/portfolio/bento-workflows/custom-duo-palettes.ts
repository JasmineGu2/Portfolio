import type { ColorSchemeId } from './color-schemes'
import { ensureHeroCardContrast } from './duo-contrast'
import type { DuoBucketPalette, HeroCardTheme } from './palette-scheme-data'
import type { ColorSchemeTokens } from './scheme-tokens'

export const CUSTOM_DUO_SCHEME_IDS = [
  'palette-sand-chartreuse-duo',
  'palette-coast-greige-duo',
  'palette-coast-blush-duo',
  'palette-signal-orange-duo',
] as const satisfies readonly ColorSchemeId[]

export type CustomDuoSchemeId = (typeof CUSTOM_DUO_SCHEME_IDS)[number]

export const CUSTOM_DUO_PALETTE_UPDATE_EVENT = 'bw-duo-palette-update'
export const CUSTOM_DUO_STORAGE_KEY = 'bw-duo-palette-edits'

export interface CustomDuoPaletteEdit {
  warm: string
  cool: string
  neutral: string
  shell: string
  canvas: string
  canvasDot: string
  introBg: string
  introFg: string
  navBg: string
  navFg: string
  pillsBg: string
  pillsFg: string
  actionsBg: string
  actionsFg: string
  emGreen: string
  emBlue: string
  emMagenta: string
}

export const CUSTOM_DUO_DEFAULTS: Record<CustomDuoSchemeId, CustomDuoPaletteEdit> = {
  'palette-sand-chartreuse-duo': {
    warm: '#FF5E32',
    cool: '#1A0089',
    neutral: '#FFFFFF',
    shell: '#FFFFFF',
    canvas: '#FAF8F4',
    canvasDot: '#C9BFAA',
    introBg: '#1A0089',
    introFg: '#FCF893',
    navBg: '#FFFFFF',
    navFg: '#1A0089',
    pillsBg: '#FCF893',
    pillsFg: '#1A0089',
    actionsBg: '#FF5E32',
    actionsFg: '#FFFFFF',
    emGreen: '#FCF893',
    emBlue: '#FF5E32',
    emMagenta: '#FFFFFF',
  },
  'palette-coast-greige-duo': {
    warm: '#E85234',
    cool: '#00408C',
    neutral: '#E5DFD9',
    shell: '#FFFFFF',
    canvas: '#FAFAF8',
    canvasDot: '#CCC4BC',
    introBg: '#00408C',
    introFg: '#FCF893',
    navBg: '#FFFFFF',
    navFg: '#00408C',
    pillsBg: '#FCF893',
    pillsFg: '#00408C',
    actionsBg: '#E85234',
    actionsFg: '#FFFFFF',
    emGreen: '#FCF893',
    emBlue: '#E85234',
    emMagenta: '#FFFFFF',
  },
  'palette-coast-blush-duo': {
    warm: '#E85234',
    cool: '#00408C',
    neutral: '#E5DFD9',
    shell: '#FFFFFF',
    canvas: '#FAF8F6',
    canvasDot: '#D5CEC8',
    introBg: '#00408C',
    introFg: '#FFFFFF',
    navBg: '#F9B8B0',
    navFg: '#00408C',
    pillsBg: '#F9B8B0',
    pillsFg: '#00408C',
    actionsBg: '#E85234',
    actionsFg: '#FFFFFF',
    emGreen: '#F9B8B0',
    emBlue: '#E85234',
    emMagenta: '#00408C',
  },
  'palette-signal-orange-duo': {
    warm: '#F1711B',
    cool: '#3D4F6B',
    neutral: '#F0EBE5',
    shell: '#FFFFFF',
    canvas: '#FAF8F5',
    canvasDot: '#D5CEC4',
    introBg: '#3D4F6B',
    introFg: '#E8A04A',
    navBg: '#FFFFFF',
    navFg: '#3D4F6B',
    pillsBg: '#C8DDF0',
    pillsFg: '#3D4F6B',
    actionsBg: '#F1711B',
    actionsFg: '#FFFFFF',
    emGreen: '#E8A04A',
    emBlue: '#5B8EC4',
    emMagenta: '#C8DDF0',
  },
}

export interface CustomDuoPaletteField {
  key: keyof CustomDuoPaletteEdit
  label: string
  group: 'work' | 'page' | 'hero'
  hint?: string
}

export const CUSTOM_DUO_PALETTE_FIELDS: CustomDuoPaletteField[] = [
  { key: 'warm', label: 'Warm tile', group: 'work', hint: 'Autodesk PM, Ivey' },
  { key: 'cool', label: 'Cool tile', group: 'work', hint: 'Tesla, Eng, Intuit, Hack Western' },
  { key: 'neutral', label: 'Neutral tile', group: 'work', hint: 'Metaverse, Stealth, OMERS' },
  { key: 'shell', label: 'Page shell', group: 'page' },
  { key: 'canvas', label: 'Career canvas', group: 'page' },
  { key: 'canvasDot', label: 'Canvas dots', group: 'page' },
  { key: 'introBg', label: 'Intro background', group: 'hero' },
  { key: 'introFg', label: 'Intro text', group: 'hero' },
  { key: 'navBg', label: 'Nav background', group: 'hero' },
  { key: 'navFg', label: 'Nav text', group: 'hero' },
  { key: 'pillsBg', label: 'Pills background', group: 'hero' },
  { key: 'pillsFg', label: 'Pills text', group: 'hero' },
  { key: 'actionsBg', label: 'Actions background', group: 'hero' },
  { key: 'actionsFg', label: 'Actions text', group: 'hero' },
  { key: 'emGreen', label: 'Intro accent green', group: 'hero' },
  { key: 'emBlue', label: 'Intro accent blue', group: 'hero' },
  { key: 'emMagenta', label: 'Intro accent magenta', group: 'hero' },
]

export function isCustomDuoScheme(id: ColorSchemeId): id is CustomDuoSchemeId {
  return (CUSTOM_DUO_SCHEME_IDS as readonly string[]).includes(id)
}

/** Loaded after client mount, null during SSR/first paint to avoid hydration mismatch */
let clientDuoPaletteEdits: Partial<Record<CustomDuoSchemeId, CustomDuoPaletteEdit>> | null = null

export function setClientDuoPaletteEdits(
  edits: Partial<Record<CustomDuoSchemeId, CustomDuoPaletteEdit>> | null
) {
  clientDuoPaletteEdits = edits
}

export function getClientDuoPaletteEdit(schemeId: CustomDuoSchemeId): CustomDuoPaletteEdit {
  const stored = clientDuoPaletteEdits?.[schemeId]
  return stored ?? getDefaultCustomDuoEdit(schemeId)
}

function heroCardsFromEdit(edit: CustomDuoPaletteEdit): HeroCardTheme {
  const cards = ensureHeroCardContrast({
    intro: {
      bg: edit.introBg,
      fg: edit.introFg,
      emGreen: edit.emGreen,
      emBlue: edit.emBlue,
      emMagenta: edit.emMagenta,
    },
    nav: {
      bg: edit.navBg,
      fg: edit.navFg,
    },
    pills: {
      bg: edit.pillsBg,
      fg: edit.pillsFg,
      label: edit.pillsFg,
    },
    actions: {
      bg: edit.actionsBg,
      fg: edit.actionsFg,
    },
  })

  return {
    ...cards,
    actions: {
      ...cards.actions,
      bg: edit.actionsBg,
      fg: edit.actionsFg,
      sub: edit.actionsFg,
    },
  }
}

export function getDefaultCustomDuoEdit(schemeId: CustomDuoSchemeId): CustomDuoPaletteEdit {
  return { ...CUSTOM_DUO_DEFAULTS[schemeId] }
}

function readStoredEdits(): Partial<Record<CustomDuoSchemeId, Partial<CustomDuoPaletteEdit>>> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(CUSTOM_DUO_STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<Record<CustomDuoSchemeId, Partial<CustomDuoPaletteEdit>>>
  } catch {
    return {}
  }
}

export function readCustomDuoEdit(schemeId: CustomDuoSchemeId): CustomDuoPaletteEdit {
  if (clientDuoPaletteEdits !== null) {
    return getClientDuoPaletteEdit(schemeId)
  }
  return getDefaultCustomDuoEdit(schemeId)
}

export function readAllCustomDuoEdits(): Partial<Record<CustomDuoSchemeId, CustomDuoPaletteEdit>> {
  const stored = readStoredEdits()
  const merged: Partial<Record<CustomDuoSchemeId, CustomDuoPaletteEdit>> = {}

  for (const schemeId of CUSTOM_DUO_SCHEME_IDS) {
    const defaults = getDefaultCustomDuoEdit(schemeId)
    const saved = stored[schemeId]
    merged[schemeId] = saved ? { ...defaults, ...saved } : defaults
  }

  return merged
}

export function writeCustomDuoEdit(schemeId: CustomDuoSchemeId, edit: CustomDuoPaletteEdit) {
  if (typeof window === 'undefined') return
  try {
    const all = readStoredEdits()
    all[schemeId] = edit
    window.localStorage.setItem(CUSTOM_DUO_STORAGE_KEY, JSON.stringify(all))
    window.dispatchEvent(new CustomEvent(CUSTOM_DUO_PALETTE_UPDATE_EVENT))
  } catch {
    // ignore storage failures
  }
}

export function resetCustomDuoEdit(schemeId: CustomDuoSchemeId) {
  if (typeof window === 'undefined') return
  try {
    const all = readStoredEdits()
    delete all[schemeId]
    window.localStorage.setItem(CUSTOM_DUO_STORAGE_KEY, JSON.stringify(all))
    window.dispatchEvent(new CustomEvent(CUSTOM_DUO_PALETTE_UPDATE_EVENT))
  } catch {
    // ignore storage failures
  }
}

export function resetAllCustomDuoEdits() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CUSTOM_DUO_STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(CUSTOM_DUO_PALETTE_UPDATE_EVENT))
  } catch {
    // ignore storage failures
  }
}

function duoBucketsFromEdit(edit: CustomDuoPaletteEdit): DuoBucketPalette {
  return {
    warm: edit.warm,
    cool: edit.cool,
    neutral: edit.neutral,
  }
}

export function applyCustomDuoOverrides(
  schemeId: CustomDuoSchemeId,
  tokens: ColorSchemeTokens,
  edit: CustomDuoPaletteEdit = getDefaultCustomDuoEdit(schemeId)
): ColorSchemeTokens {
  const heroCards = heroCardsFromEdit(edit)

  return {
    ...tokens,
    shellBg: edit.shell,
    canvasBg: edit.canvas,
    canvasDot: edit.canvasDot,
    duoBuckets: duoBucketsFromEdit(edit),
    heroCards,
    emGreen: edit.emGreen,
    emBlue: edit.emBlue,
    emMagenta: edit.emMagenta,
  }
}

export function notifyCustomDuoPaletteUpdate() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(CUSTOM_DUO_PALETTE_UPDATE_EVENT))
}
