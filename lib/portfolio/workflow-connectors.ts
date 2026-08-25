export type Rect = { x: number; y: number; w: number; h: number }

export type PortSide = 'top' | 'bottom' | 'left' | 'right'

export interface WorkflowEdge {
  from: string
  to: string
  primary?: boolean
}

export function portPoint(rect: Rect, side: PortSide) {
  switch (side) {
    case 'top':
      return { x: rect.x + rect.w / 2, y: rect.y }
    case 'bottom':
      return { x: rect.x + rect.w / 2, y: rect.y + rect.h }
    case 'left':
      return { x: rect.x, y: rect.y + rect.h / 2 }
    case 'right':
      return { x: rect.x + rect.w, y: rect.y + rect.h / 2 }
  }
}

export function pickPorts(from: Rect, to: Rect): [PortSide, PortSide] {
  const dx = to.x + to.w / 2 - (from.x + from.w / 2)
  const dy = to.y + to.h / 2 - (from.y + from.h / 2)

  if (Math.abs(dy) >= Math.abs(dx)) {
    return dy > 0 ? ['bottom', 'top'] : ['top', 'bottom']
  }
  return dx > 0 ? ['right', 'left'] : ['left', 'right']
}

export function workflowPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  fromSide: PortSide,
  toSide: PortSide
) {
  if (fromSide === 'bottom' && toSide === 'top') {
    const midY = (y1 + y2) / 2
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
  }
  if (fromSide === 'top' && toSide === 'bottom') {
    const midY = (y1 + y2) / 2
    return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
  }
  if (fromSide === 'right' && toSide === 'left') {
    const midX = (x1 + x2) / 2
    return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`
  }
  if (fromSide === 'left' && toSide === 'right') {
    const midX = (x1 + x2) / 2
    return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`
  }
  const midY = (y1 + y2) / 2
  return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
}

export const HERO_BENTO_EDGES: WorkflowEdge[] = [
  { from: 'hero-intro', to: 'hero-pills', primary: true },
]
