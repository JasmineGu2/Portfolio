/** Miro-style zigzag flow — boxes + oval tags, left → right */

import { getBoxSize, getNodeTier, getTagSize } from './flow-visual'

export const FLOW_BOX_W = 200
export const FLOW_BOX_H = 88
export const FLOW_TAG_W = 184
export const FLOW_TAG_H = 48
export const FLOW_TAG_GAP = 12
export const FLOW_CANVAS = { width: 1820, height: 520 }

export function tagNodeId(stepId: string) {
  return `${stepId}-tag`
}

/** Chronological sequence (matches Miro board — no branches) */
export const FLOW_SEQUENCE = [
  'education',
  'metaverse',
  'omers',
  'laurelspace',
  'intuit',
  'tesla',
  'autodesk-eng',
  'autodesk-pm',
] as const

export const FLOW_LAYOUT: Record<
  string,
  { x: number; y: number; tagSide: 'top' | 'bottom' }
> = {
  education: { x: 32, y: 260, tagSide: 'bottom' },
  metaverse: { x: 252, y: 72, tagSide: 'bottom' },
  omers: { x: 472, y: 280, tagSide: 'top' },
  laurelspace: { x: 692, y: 56, tagSide: 'bottom' },
  intuit: { x: 912, y: 280, tagSide: 'top' },
  tesla: { x: 1132, y: 56, tagSide: 'bottom' },
  'autodesk-eng': { x: 1352, y: 280, tagSide: 'top' },
  'autodesk-pm': { x: 1572, y: 56, tagSide: 'bottom' },
}

type Position = { x: number; y: number }

export function getDefaultBoxPosition(stepId: string): Position {
  const layout = FLOW_LAYOUT[stepId]
  if (!layout) return { x: 0, y: 0 }
  if (layout.tagSide === 'top') {
    return { x: layout.x, y: layout.y + FLOW_TAG_H + FLOW_TAG_GAP }
  }
  return { x: layout.x, y: layout.y }
}

export function getDefaultTagPosition(stepId: string): Position {
  const layout = FLOW_LAYOUT[stepId]
  if (!layout) return { x: 0, y: 0 }
  const tag = getTagSize()
  const tagX = layout.x + (FLOW_BOX_W - tag.w) / 2
  if (layout.tagSide === 'bottom') {
    const box = getDefaultBoxPosition(stepId)
    const { h } = getBoxSize(getNodeTier(stepId))
    return { x: tagX, y: box.y + h + FLOW_TAG_GAP }
  }
  return { x: tagX, y: layout.y }
}

export function getBoxMetrics(
  id: string,
  positions?: Record<string, Position>
) {
  const resolved = resolvePos(id, positions)
  if (!resolved) return null
  const { w, h } = getBoxSize(getNodeTier(id))
  const x = resolved.x + (FLOW_BOX_W - w) / 2
  return { x, y: resolved.y, w, h, cx: x + w / 2, cy: resolved.y + h / 2 }
}

export function getTagMetrics(
  id: string,
  positions?: Record<string, Position>
) {
  const tagId = tagNodeId(id)
  const layout = FLOW_LAYOUT[id]
  if (!layout) return null
  const pos = positions?.[tagId] ?? getDefaultTagPosition(id)
  const tag = getTagSize()
  const x = pos.x + (FLOW_TAG_W - tag.w) / 2
  return { x, y: pos.y, w: tag.w, h: tag.h, cx: x + tag.w / 2, cy: pos.y + tag.h / 2 }
}

function resolvePos(
  id: string,
  positions?: Record<string, Position>
): { x: number; y: number; tagSide: 'top' | 'bottom' } | null {
  const layout = FLOW_LAYOUT[id]
  if (!layout) return null
  const pos = positions?.[id]
  const defaults = getDefaultBoxPosition(id)
  return {
    x: pos?.x ?? defaults.x,
    y: pos?.y ?? defaults.y,
    tagSide: layout.tagSide,
  }
}

export function getFlowNodeCenter(
  id: string,
  positions?: Record<string, Position>
): { x: number; y: number } | null {
  const m = getBoxMetrics(id, positions)
  if (!m) return null
  return { x: m.cx, y: m.cy }
}

export function getFlowNodeRight(
  id: string,
  positions?: Record<string, Position>
): { x: number; y: number } | null {
  const m = getBoxMetrics(id, positions)
  if (!m) return null
  return { x: m.x + m.w, y: m.cy }
}

export function getFlowNodeLeft(
  id: string,
  positions?: Record<string, Position>
): { x: number; y: number } | null {
  const m = getBoxMetrics(id, positions)
  if (!m) return null
  return { x: m.x, y: m.cy }
}
