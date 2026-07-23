/** Visual hierarchy + timeline metadata for the career flow */

export type FlowTier = 'foundation' | 'muted' | 'milestone' | 'current'

export const FLOW_NODE_META: Record<
  string,
  { tier: FlowTier; year: number }
> = {
  education: { tier: 'foundation', year: 2022 },
  metaverse: { tier: 'muted', year: 2022 },
  omers: { tier: 'muted', year: 2023 },
  laurelspace: { tier: 'milestone', year: 2023 },
  intuit: { tier: 'milestone', year: 2024 },
  tesla: { tier: 'milestone', year: 2025 },
  'autodesk-eng': { tier: 'milestone', year: 2026 },
  'autodesk-pm': { tier: 'current', year: 2026 },
}

export const TIMELINE_YEARS = [2022, 2023, 2024, 2025, 2026] as const

export function getNodeTier(stepId: string): FlowTier {
  return FLOW_NODE_META[stepId]?.tier ?? 'milestone'
}

export function getNodeYear(stepId: string): number {
  return FLOW_NODE_META[stepId]?.year ?? 2024
}

export function getBoxSize(tier: FlowTier) {
  switch (tier) {
    case 'current':
      return { w: 248, h: 102 }
    case 'milestone':
      return { w: 216, h: 92 }
    case 'muted':
      return { w: 188, h: 80 }
    case 'foundation':
      return { w: 176, h: 74 }
  }
}

export function getTagSize() {
  return { w: 148, h: 32 }
}

export function tierOpacity(tier: FlowTier) {
  switch (tier) {
    case 'current':
      return 1
    case 'milestone':
      return 1
    case 'muted':
      return 0.78
    case 'foundation':
      return 0.68
  }
}
