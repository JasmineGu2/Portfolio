/** Canonical site messaging — used across Work hero, Architecture, metadata, and Ask. */

export const HERO_TAGLINE = {
  primary:
    'Jasmine Gu is a product-minded builder with the experience and versatility to translate between users, engineering, and operations.',
  secondary:
    'Product manager and engineer building thoughtful, AI-powered products—from consumer experiences at TurboTax to enterprise data platforms at Autodesk.',
} as const

export const SITE_METADATA = {
  title: 'Jasmine Gu — Product / Software',
  description: HERO_TAGLINE.secondary,
} as const

export const ARCHITECTURE_NARRATIVE = {
  headline: 'I kept zooming out.',
  lead:
    'I started by building the thing in front of me. Then I kept wondering what was underneath it, what surrounded it, and eventually who decides what the whole system should do.',
} as const
