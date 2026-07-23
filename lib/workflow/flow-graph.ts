/** Main backbone + branch graph for the n8n-style career flow */

export type NodeKind = 'milestone' | 'project' | 'router'

export type FlowCategory = 'Engineering' | 'Product' | 'Data' | 'Founder' | 'Business'

export interface GraphNode {
  id: string
  kind: NodeKind
  /** Story step id — project nodes may reuse parent or own step */
  stepId: string
  x: number
  y: number
  category?: FlowCategory
  isCurrent?: boolean
  /** Compact label override (defaults from step flowRole / tag) */
  label?: string
  sublabel?: string
}

export type PortSide = 'left' | 'right' | 'top' | 'bottom'

export interface GraphEdge {
  id: string
  from: string
  to: string
  kind: 'main' | 'branch'
  fromPort: PortSide
  toPort: PortSide
}

export const GRAPH_CANVAS = { width: 1380, height: 480 }

export const MAIN_Y = 228
export const BRANCH_UPPER_Y = 96
export const BRANCH_LOWER_Y = 360

/** Main chronological backbone */
export const MAIN_SPINE: string[] = [
  'education',
  'metaverse',
  'omers',
  'intuit',
  'tesla',
  'autodesk-router',
]

export const GRAPH_NODES: GraphNode[] = [
  // ── Main spine ──
  {
    id: 'education',
    kind: 'milestone',
    stepId: 'education',
    x: 24,
    y: MAIN_Y,
    category: 'Business',
  },
  {
    id: 'metaverse',
    kind: 'milestone',
    stepId: 'metaverse',
    x: 204,
    y: MAIN_Y,
    category: 'Founder',
  },
  {
    id: 'omers',
    kind: 'milestone',
    stepId: 'omers',
    x: 384,
    y: MAIN_Y,
    category: 'Engineering',
  },
  {
    id: 'intuit',
    kind: 'milestone',
    stepId: 'intuit',
    x: 564,
    y: MAIN_Y,
    category: 'Engineering',
  },
  {
    id: 'tesla',
    kind: 'milestone',
    stepId: 'tesla',
    x: 744,
    y: MAIN_Y,
    category: 'Engineering',
  },
  {
    id: 'autodesk-router',
    kind: 'router',
    stepId: 'autodesk-eng',
    x: 924,
    y: MAIN_Y,
    label: 'Engineering / Product',
  },

  // ── Autodesk split ──
  {
    id: 'autodesk-eng',
    kind: 'milestone',
    stepId: 'autodesk-eng',
    x: 1104,
    y: BRANCH_UPPER_Y,
    category: 'Engineering',
  },
  {
    id: 'autodesk-pm',
    kind: 'milestone',
    stepId: 'autodesk-pm',
    x: 1104,
    y: BRANCH_LOWER_Y,
    category: 'Product',
    isCurrent: true,
  },

  // ── Lower branches (projects / context) ──
  {
    id: 'branch-education',
    kind: 'project',
    stepId: 'education',
    x: 24,
    y: BRANCH_LOWER_Y,
    label: 'Coding foundation',
    category: 'Engineering',
  },
  {
    id: 'branch-metaverse',
    kind: 'project',
    stepId: 'metaverse',
    x: 204,
    y: BRANCH_LOWER_Y,
    category: 'Founder',
  },
  {
    id: 'branch-omers',
    kind: 'project',
    stepId: 'omers',
    x: 384,
    y: BRANCH_LOWER_Y,
    category: 'Engineering',
  },
  {
    id: 'branch-intuit',
    kind: 'project',
    stepId: 'intuit',
    x: 564,
    y: BRANCH_LOWER_Y,
    category: 'Engineering',
  },
  {
    id: 'branch-tesla',
    kind: 'project',
    stepId: 'tesla',
    x: 744,
    y: BRANCH_LOWER_Y,
    category: 'Data',
  },

  // ── Upper branches (side roles / research) ──
  {
    id: 'laurelspace',
    kind: 'project',
    stepId: 'laurelspace',
    x: 384,
    y: BRANCH_UPPER_Y,
    category: 'Founder',
  },
  {
    id: 'ivey',
    kind: 'project',
    stepId: 'ivey',
    x: 564,
    y: BRANCH_UPPER_Y,
    category: 'Data',
  },
]

export const GRAPH_EDGES: GraphEdge[] = [
  // Main path
  { id: 'e1', from: 'education', to: 'metaverse', kind: 'main', fromPort: 'right', toPort: 'left' },
  { id: 'e2', from: 'metaverse', to: 'omers', kind: 'main', fromPort: 'right', toPort: 'left' },
  { id: 'e3', from: 'omers', to: 'intuit', kind: 'main', fromPort: 'right', toPort: 'left' },
  { id: 'e4', from: 'intuit', to: 'tesla', kind: 'main', fromPort: 'right', toPort: 'left' },
  { id: 'e5', from: 'tesla', to: 'autodesk-router', kind: 'main', fromPort: 'right', toPort: 'left' },
  { id: 'e6', from: 'autodesk-router', to: 'autodesk-eng', kind: 'main', fromPort: 'top', toPort: 'left' },
  { id: 'e7', from: 'autodesk-router', to: 'autodesk-pm', kind: 'main', fromPort: 'bottom', toPort: 'left' },

  // Lower branches
  { id: 'b1', from: 'education', to: 'branch-education', kind: 'branch', fromPort: 'bottom', toPort: 'top' },
  { id: 'b2', from: 'metaverse', to: 'branch-metaverse', kind: 'branch', fromPort: 'bottom', toPort: 'top' },
  { id: 'b3', from: 'omers', to: 'branch-omers', kind: 'branch', fromPort: 'bottom', toPort: 'top' },
  { id: 'b4', from: 'intuit', to: 'branch-intuit', kind: 'branch', fromPort: 'bottom', toPort: 'top' },
  { id: 'b5', from: 'tesla', to: 'branch-tesla', kind: 'branch', fromPort: 'bottom', toPort: 'top' },

  // Upper branches
  { id: 'b6', from: 'omers', to: 'laurelspace', kind: 'branch', fromPort: 'top', toPort: 'bottom' },
  { id: 'b7', from: 'intuit', to: 'ivey', kind: 'branch', fromPort: 'top', toPort: 'bottom' },
]

export const NODE_SIZES = {
  milestone: { w: 96, h: 96 },
  project: { w: 132, h: 44 },
  router: { w: 80, h: 80 },
} as const

export function getGraphNode(id: string) {
  return GRAPH_NODES.find((n) => n.id === id)
}

export function getPortPoint(
  nodeId: string,
  port: PortSide
): { x: number; y: number } | null {
  const node = getGraphNode(nodeId)
  if (!node) return null
  const size = NODE_SIZES[node.kind]
  const { x, y } = node
  switch (port) {
    case 'left':
      return { x, y: y + size.h / 2 }
    case 'right':
      return { x: x + size.w, y: y + size.h / 2 }
    case 'top':
      return { x: x + size.w / 2, y }
    case 'bottom':
      return { x: x + size.w / 2, y: y + size.h }
  }
}

/** Smooth-step connector (n8n-style orthogonal routing) */
export function smoothStepPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const dx = x2 - x1
  const dy = y2 - y1
  if (Math.abs(dy) < 4) {
    const mid = x1 + dx / 2
    return `M ${x1} ${y1} L ${mid} ${y1} L ${mid} ${y2} L ${x2} ${y2}`
  }
  if (Math.abs(dx) < 4) {
    const mid = y1 + dy / 2
    return `M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`
  }
  const midY = y1 + dy / 2
  return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
}

export function edgesForNode(nodeId: string) {
  return GRAPH_EDGES.filter((e) => e.from === nodeId || e.to === nodeId)
}

export function isEdgeLit(
  edge: GraphEdge,
  activeId: string | null
): boolean {
  if (!activeId) return false
  return edge.from === activeId || edge.to === activeId
}

export const STAGE_LABELS = [
  { x: 24, label: 'School' },
  { x: 294, label: 'Early roles' },
  { x: 564, label: 'Engineering' },
  { x: 924, label: 'Platform' },
] as const
