import type { PortfolioItem } from '@/lib/portfolio/portfolio-data'
import { PORTFOLIO_ITEMS } from '@/lib/portfolio/portfolio-data'

export type GraphNodeType =
  | 'experience'
  | 'capability'
  | 'tool'
  | 'memory'
  | 'project'
  | 'community'
  | 'output'

export interface GraphNode {
  id: string
  nodeType: GraphNodeType
  title: string
  description: string
  connections: string[]
}

export function portfolioItemToGraphNode(item: PortfolioItem): GraphNode {
  return {
    id: item.id,
    nodeType: item.kind === 'experience' ? 'experience' : 'project',
    title: item.title,
    description: item.description,
    connections: [...item.relatedIds, ...item.capabilities.map((cap) => cap.toLowerCase())],
  }
}

export const PORTFOLIO_GRAPH_NODES: GraphNode[] = PORTFOLIO_ITEMS.map(portfolioItemToGraphNode)

export function getConnectedNodeIds(nodeId: string): string[] {
  const node = PORTFOLIO_GRAPH_NODES.find((entry) => entry.id === nodeId)
  if (!node) return []
  return node.connections
}

export function getGraphNode(id: string): GraphNode | undefined {
  return PORTFOLIO_GRAPH_NODES.find((node) => node.id === id)
}
