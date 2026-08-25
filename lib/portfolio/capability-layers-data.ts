import type { WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'

export type CapabilityLayerId =
  | 'product'
  | 'software-engineering'
  | 'business'
  | 'community'

export interface CapabilityLayer {
  id: CapabilityLayerId
  label: string
  capabilities: string[]
  experienceRefs?: WorkId[]
}

/** Core strengths stack — top to bottom in the hero isometric graphic. */
export const CAPABILITY_LAYERS: CapabilityLayer[] = [
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    capabilities: ['Frontend', 'Backend', 'Systems', 'Infrastructure'],
    experienceRefs: ['tesla', 'autodesk-eng', 'intuit'],
  },
  {
    id: 'product',
    label: 'Product',
    capabilities: ['Discovery', 'Prioritization', 'Product Strategy', 'Execution'],
    experienceRefs: ['autodesk', 'stealth-startup', 'hack-western'],
  },
  {
    id: 'business',
    label: 'Business',
    capabilities: ['Strategy', 'Markets', 'Operations', 'Incentives'],
    experienceRefs: ['stealth-startup', 'omers', 'metaverse'],
  },
  {
    id: 'community',
    label: 'Community',
    capabilities: ['Users', 'Facilitation', 'Storytelling', 'Feedback'],
    experienceRefs: ['hack-western', 'ivey-product', 'autodesk'],
  },
]

/** Flat list for sr-only accessibility in the hero cell. */
export const CAPABILITY_LAYER_A11Y_SUMMARY = CAPABILITY_LAYERS.flatMap((layer) =>
  layer.capabilities.map((cap) => `${layer.label}: ${cap}`)
)
