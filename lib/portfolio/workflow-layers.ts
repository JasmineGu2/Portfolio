import { COMPANY_LOGOS } from '@/lib/workflow/company-logos'
import { RESUME_HREF } from '@/lib/portfolio/resume'

export type NodeAccent =
  | 'orange'
  | 'mint'
  | 'lavender'
  | 'yellow'
  | 'sky'
  | 'pink'
  | 'blue'
  | 'coral'

export interface WorkflowNode {
  id: string
  title: string
  subtitle: string
  period?: string
  logo?: string
  logoLetter?: string
  /** Short label for the status pill (right side) */
  pill: string
  accent: NodeAccent
  story: string
  links?: { label: string; href: string; external?: boolean }[]
}

export interface WorkflowLayer {
  id: string
  label: string
  nodes: WorkflowNode[]
}

export const ACCENT_HEX: Record<NodeAccent, string> = {
  orange: '#ff6b35',
  mint: '#2dd4bf',
  lavender: '#a78bfa',
  yellow: '#fde047',
  sky: '#38bdf8',
  pink: '#f472b6',
  blue: '#60a5fa',
  coral: '#fb923c',
}

/** Top trigger — school */
export const SCHOOL_NODE: WorkflowNode = {
  id: 'education',
  title: 'CS + Business Dual Degree',
  subtitle: 'Western University / Ivey Business School',
  period: '2022 – 2027',
  logoLetter: 'W',
  pill: 'Foundation',
  accent: 'orange',
  story:
    'Dual degree in Computer Science and Business at Western University and Ivey Business School. Graduating Fall 2027.',
}

export const WORKFLOW_LAYERS: WorkflowLayer[] = [
  {
    id: 'engineering',
    label: 'Engineering Layer',
    nodes: [
      {
        id: 'stealth',
        title: 'Full-Stack Engineer / PM Intern',
        subtitle: 'Pre-Seed Stealth · CRM for childcare',
        period: 'Fall 2023',
        logoLetter: '?',
        pill: 'Zero to one',
        accent: 'yellow',
        story:
          'Pre-seed stealth startup — auth, PostgreSQL, Django, payments. Full product ownership from zero to one.',
      },
      {
        id: 'intuit',
        title: 'Software Engineer Intern',
        subtitle: 'Intuit · TurboTax top-of-funnel',
        period: 'Summer 2024',
        logo: COMPANY_LOGOS.intuit,
        pill: '35% engagement ↑',
        accent: 'mint',
        story:
          '10+ React/TS components for TurboTax. Theming across 4 pages + API integrations → 35% engagement lift.',
        links: [{ label: 'Case study', href: '/intuit' }],
      },
      {
        id: 'tesla',
        title: 'Software Engineer Intern',
        subtitle: 'Tesla · ML observability platform',
        period: 'Summer 2025',
        logo: COMPANY_LOGOS.tesla,
        pill: '40% faster insight',
        accent: 'pink',
        story:
          'Operator-facing ML software — React UI, video infra, bounding boxes. ~40% faster time-to-insight for ops teams.',
        links: [{ label: 'Case study', href: '/tesla' }],
      },
      {
        id: 'autodesk-eng',
        title: 'Full-Stack Engineer Intern',
        subtitle: 'Autodesk · Fusion asset libraries',
        period: 'Jan – May 2026',
        logo: COMPANY_LOGOS.autodeskIcon,
        pill: 'Platform build',
        accent: 'blue',
        story:
          'Asset library platform across microservices. Java/Spring, DynamoDB, Redis. 40+ Pact tests → 35% fewer regressions.',
      },
    ],
  },
  {
    id: 'business',
    label: 'Business Layer',
    nodes: [
      {
        id: 'metaverse',
        title: 'Developer & Data Analyst',
        subtitle: 'Metaverse Group · GTM & outreach',
        period: '2022 – 2023',
        logo: COMPANY_LOGOS.metaverse,
        pill: '900+ leads',
        accent: 'sky',
        story:
          'Python + Selenium outreach bot → 500% outreach increase, 900+ leads, 54% open rate.',
      },
      {
        id: 'omers',
        title: 'Solutions Engineer Intern',
        subtitle: 'ServiceNow · OMERS',
        period: 'Summer 2023',
        logo: COMPANY_LOGOS.omers,
        pill: '60–70% faster',
        accent: 'lavender',
        story:
          'Designed UX and built 8+ automation solutions. 60–70% faster enterprise processes.',
        links: [{ label: 'Case study', href: '/omers' }],
      },
      {
        id: 'autodesk-pm',
        title: 'Platform PM Intern, Data Products',
        subtitle: 'Autodesk · ADP Studio',
        period: 'May 2026 – Present',
        logo: COMPANY_LOGOS.autodesk,
        pill: '60% adoption ↑',
        accent: 'coral',
        story:
          'Owned ADP Studio query platform — 60% adoption lift, 3× workspace. AI schema assist & MCP roadmap.',
      },
    ],
  },
  {
    id: 'community',
    label: 'Community Layer',
    nodes: [
      {
        id: 'ips',
        title: 'VP, Ivey Product Society',
        subtitle: 'Fellowship · 50-person product bootcamp',
        pill: 'Leadership',
        logoLetter: 'P',
        accent: 'lavender',
        story: 'Redesigned Ivey Product Society Fellowship — a 50-person product bootcamp.',
      },
      {
        id: 'rtc',
        title: 'Hub Leader',
        subtitle: 'Rewriting the Code · Women in tech',
        pill: 'Community',
        logoLetter: 'R',
        accent: 'pink',
        story: 'Building spaces for women in tech as a Hub Leader for Rewriting the Code.',
      },
      {
        id: 'myac',
        title: 'President',
        subtitle: 'Mississauga Youth Action Council',
        pill: '300% growth',
        logoLetter: 'M',
        accent: 'sky',
        story: 'Grew MYAC membership 300% as President.',
      },
      {
        id: 'sjc',
        title: 'President, Social Justice Club',
        subtitle: 'Giving back & advocacy',
        pill: 'Impact',
        logoLetter: 'S',
        accent: 'mint',
        story: 'Led Social Justice Club initiatives focused on community giving and advocacy.',
      },
    ],
  },
]

export const ALL_WORKFLOW_NODES: WorkflowNode[] = [
  SCHOOL_NODE,
  ...WORKFLOW_LAYERS.flatMap((l) => l.nodes),
]

export const SITE_CONTACT = {
  email: 'jgu.hba2027@ivey.ca',
  phone: '647-763-3712',
  linkedin: 'https://linkedin.com/in/jasminegu',
  resume: RESUME_HREF,
}

/* ── Layout constants ── */
export const NODE_W = 468
export const NODE_H = 78
export const NODE_GAP = 10
export const LAYER_PAD = 18
export const LAYER_GAP = 14
export const CONNECTOR_H = 36
export const CANVAS_W = 520

export interface LayerLayout {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
  nodeIds: string[]
}

export interface FlowLayout {
  canvasHeight: number
  school: { x: number; y: number }
  layers: LayerLayout[]
  nodes: Record<string, { x: number; y: number; centerX: number }>
  edges: { from: string; to: string }[]
}

export function computeFlowLayout(): FlowLayout {
  const nodes: FlowLayout['nodes'] = {}
  const layers: LayerLayout[] = []
  const edges: { from: string; to: string }[] = []

  let y = 32
  const nodeX = (CANVAS_W - NODE_W) / 2

  nodes[SCHOOL_NODE.id] = {
    x: nodeX,
    y,
    centerX: CANVAS_W / 2,
  }
  y += NODE_H + CONNECTOR_H

  let prevNodeId = SCHOOL_NODE.id

  for (const layer of WORKFLOW_LAYERS) {
    const layerX = (CANVAS_W - NODE_W - LAYER_PAD * 2) / 2
    const layerStartY = y
    const innerX = layerX + LAYER_PAD
    let innerY = layerStartY + 36 + LAYER_PAD

    const nodeIds: string[] = []

    layer.nodes.forEach((node, i) => {
      nodes[node.id] = {
        x: innerX,
        y: innerY,
        centerX: CANVAS_W / 2,
      }
      nodeIds.push(node.id)

      if (i === 0) {
        edges.push({ from: prevNodeId, to: node.id })
      } else {
        edges.push({ from: layer.nodes[i - 1].id, to: node.id })
      }

      innerY += NODE_H + NODE_GAP
    })

    const layerHeight = innerY - layerStartY + LAYER_PAD
    layers.push({
      id: layer.id,
      label: layer.label,
      x: layerX,
      y: layerStartY,
      width: NODE_W + LAYER_PAD * 2,
      height: layerHeight,
      nodeIds,
    })

    y = layerStartY + layerHeight + CONNECTOR_H
    prevNodeId = layer.nodes[layer.nodes.length - 1].id
  }

  return {
    canvasHeight: y + 24,
    school: { x: nodeX, y: 32 },
    layers,
    nodes,
    edges,
  }
}

export function edgePath(
  from: { x: number; y: number; centerX: number },
  to: { x: number; y: number; centerX: number }
) {
  const x1 = from.centerX
  const y1 = from.y + NODE_H
  const x2 = to.centerX
  const y2 = to.y
  const midY = (y1 + y2) / 2
  return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`
}
