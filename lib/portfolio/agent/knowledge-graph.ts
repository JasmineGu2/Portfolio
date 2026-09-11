/**
 * Ask Jasmine — knowledge graph.
 *
 * The portfolio is a connected graph, not a list of pages (spec §6). This layers
 * typed `Relationship` edges over the existing `relatedIds` in `portfolio-data.ts`
 * so an answer can retrieve evidence and then point somewhere connected.
 *
 * Two sources:
 *  1. Hand-authored spine edges below — the meaningful "this led to that" and
 *     "this demonstrates that" links.
 *  2. Derived `relates_to` edges from every `relatedIds` pair.
 *
 * Edges are stored directional but traversed both ways: if LaurelSpace
 * `demonstrates` product ownership at Autodesk, Autodesk is still relevant when
 * the question is about LaurelSpace.
 */

import { PORTFOLIO_ITEMS } from '@/lib/portfolio/portfolio-data'
import type { Relationship } from './types'

export interface GraphEdge {
  from: string
  to: string
  relationship: Relationship
  reason?: string
}

const SPINE_EDGES: GraphEdge[] = [
  { from: 'omers', to: 'intuit', relationship: 'continues', reason: 'enterprise workflows to building the interface itself' },
  { from: 'intuit', to: 'tesla', relationship: 'continues', reason: 'frontend work to the systems underneath it' },
  { from: 'tesla', to: 'autodesk-eng', relationship: 'continues', reason: 'one systems problem to a platform of them' },
  { from: 'autodesk-eng', to: 'autodesk', relationship: 'continues', reason: 'building the platform to deciding what it should be' },
  { from: 'tesla', to: 'autodesk', relationship: 'influenced', reason: 'systems thinking she carried into product work' },
  { from: 'autodesk-eng', to: 'tesla', relationship: 'elaborates', reason: 'went deeper on distributed systems and contracts' },
  { from: 'metaverse', to: 'omers', relationship: 'relates_to', reason: 'both were about turning manual work into a system' },
  { from: 'stealth-startup', to: 'autodesk', relationship: 'demonstrates', reason: 'owning product and engineering end to end' },
  { from: 'stealth-startup', to: 'hack-western', relationship: 'relates_to', reason: 'both are zero-to-one builds' },
  { from: 'hack-western', to: 'ivey-product', relationship: 'relates_to', reason: 'product leadership inside the Ivey community' },
  { from: 'hack-western', to: 'autodesk', relationship: 'demonstrates', reason: 'leading engineers toward a product vision' },
  { from: 'tldw', to: 'autodesk', relationship: 'relates_to', reason: 'shipping something AI-powered end to end' },
  { from: 'brewmates', to: 'autodesk', relationship: 'relates_to', reason: 'a fast AI build outside a full-time role' },
  { from: 'tldw', to: 'brewmates', relationship: 'relates_to', reason: 'both hackathon builds with an LLM at the core' },
]

function derivedEdges(): GraphEdge[] {
  const seen = new Set(SPINE_EDGES.map((e) => `${e.from}->${e.to}`))
  const out: GraphEdge[] = []
  for (const item of PORTFOLIO_ITEMS) {
    for (const relId of item.relatedIds) {
      const key = `${item.id}->${relId}`
      const reverseKey = `${relId}->${item.id}`
      if (seen.has(key) || seen.has(reverseKey)) continue
      seen.add(key)
      out.push({ from: item.id, to: relId, relationship: 'relates_to' })
    }
  }
  return out
}

export const AGENT_GRAPH_EDGES: GraphEdge[] = [...SPINE_EDGES, ...derivedEdges()]

export interface GraphNeighbor {
  id: string
  relationship: Relationship
  reason?: string
}

/** Every node directly connected to `id`, either direction. */
export function getRelated(id: string, relationships?: Relationship[]): GraphNeighbor[] {
  const allow = relationships ? new Set(relationships) : null
  const neighbors: GraphNeighbor[] = []
  for (const edge of AGENT_GRAPH_EDGES) {
    if (allow && !allow.has(edge.relationship)) continue
    if (edge.from === id) neighbors.push({ id: edge.to, relationship: edge.relationship, reason: edge.reason })
    else if (edge.to === id) neighbors.push({ id: edge.from, relationship: edge.relationship, reason: edge.reason })
  }
  return neighbors
}

/** All ids reachable from `seedIds` within `depth` hops (seeds excluded from the result). */
export function neighborhood(
  seedIds: string[],
  relationships?: Relationship[],
  depth = 1
): string[] {
  const seeds = new Set(seedIds)
  const visited = new Set(seedIds)
  let frontier = [...seedIds]

  for (let hop = 0; hop < depth; hop++) {
    const next: string[] = []
    for (const nodeId of frontier) {
      for (const neighbor of getRelated(nodeId, relationships)) {
        if (visited.has(neighbor.id)) continue
        visited.add(neighbor.id)
        next.push(neighbor.id)
      }
    }
    frontier = next
  }

  return [...visited].filter((id) => !seeds.has(id))
}

/** Best relationship weight from any of `seedIds` to `id`, for ranking (spec §17). */
const RELATIONSHIP_WEIGHT: Record<Relationship, number> = {
  demonstrates: 1,
  elaborates: 1,
  influenced: 0.8,
  continues: 0.8,
  built: 0.7,
  owned: 0.7,
  worked_on: 0.7,
  worked_with: 0.6,
  contrasts_with: 0.5,
  relates_to: 0.4,
}

export function graphScore(id: string, seedIds: string[]): number {
  let best = 0
  for (const seed of seedIds) {
    if (seed === id) continue
    for (const neighbor of getRelated(seed)) {
      if (neighbor.id !== id) continue
      best = Math.max(best, RELATIONSHIP_WEIGHT[neighbor.relationship] ?? 0)
    }
  }
  return best
}

export function isGraphConnected(a: string, b: string): boolean {
  if (a === b) return false
  return getRelated(a).some((neighbor) => neighbor.id === b)
}
