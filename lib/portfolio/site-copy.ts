/** Canonical site messaging, used across Work hero, Architecture, metadata, and Ask. */

export const HERO_TAGLINE = {
  primary:
    'Jasmine Gu is a product engineer who codes with the end users, the business context, and product strategy in mind.',
  secondary:
    'Product engineer. Most recently at Autodesk, working on agentic workflows for enterprise data tools. Before that, Tesla and Intuit.',
} as const

export const SITE_METADATA = {
  title: "Jasmine's Portfolio",
  description: HERO_TAGLINE.secondary,
} as const

export const ARCHITECTURE_NARRATIVE = {
  headline: 'I kept zooming out.',
  lead:
    'I started by building the thing in front of me. Then I kept wondering what was underneath it, what surrounded it, and eventually who decides what the whole system should do.',
} as const
