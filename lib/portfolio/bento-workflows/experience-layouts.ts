import type { WorkflowEdge } from '@/lib/portfolio/workflow-connectors'

export interface TilePlacement {
  col: string
  row: string
}

export const WORK_ORDER = [
  'autodesk',
  'tesla',
  'autodesk-eng',
  'intuit',
  'omers',
  'stealth-startup',
  'metaverse',
  'hack-western',
  'ivey-product',
] as const

export type CanvasWorkId = (typeof WORK_ORDER)[number]

export type WorkId = CanvasWorkId | 'western'

export interface ExperienceLayoutSpec {
  slug: string
  title: string
  description: string
  tag: string
  gridClass: string
  work: Record<CanvasWorkId, TilePlacement>
  edges?: WorkflowEdge[]
  careerEntry?: CanvasWorkId
}

function chain(...ids: string[]): WorkflowEdge[] {
  const edges: WorkflowEdge[] = []
  for (let i = 0; i < ids.length - 1; i++) {
    edges.push({ from: ids[i], to: ids[i + 1], primary: true })
  }
  return edges
}

function branch(from: string, to: string[], primary = false): WorkflowEdge[] {
  return to.map((t) => ({ from, to: t, primary }))
}

/** Connect adjacent roles within warm / cool / neutral duo buckets */
function duoBucketChains(groups: {
  warm: CanvasWorkId[]
  cool: CanvasWorkId[]
  neutral: CanvasWorkId[]
}): WorkflowEdge[] {
  return [
    ...chain(...groups.warm),
    ...chain(...groups.cool),
    ...chain(...groups.neutral),
  ]
}

const HOME_DUO_BUCKET_EDGES = duoBucketChains({
  warm: ['autodesk', 'ivey-product'],
  cool: ['tesla', 'autodesk-eng', 'hack-western', 'intuit'],
  neutral: ['omers', 'stealth-startup', 'metaverse'],
})

const FULL_CHAIN = chain(...WORK_ORDER)

/** Spaced hero + 9 experience blocks — engineering vs product tracks */
export const EXPERIENCE_LAYOUT_SPECS: ExperienceLayoutSpec[] = [
  {
    slug: 'home-wireframe',
    title: 'Home bento',
    description:
      'Autodesk PM and Tesla up top, internships in a staggered four-row mosaic.',
    tag: 'Home',
    gridClass: 'bw-grid--home-wireframe',
    careerEntry: 'autodesk',
    work: {
      autodesk: { col: '1 / span 8', row: '1' },
      tesla: { col: '9 / span 4', row: '1' },
      'autodesk-eng': { col: '1 / span 5', row: '2' },
      omers: { col: '6 / span 7', row: '2' },
      'stealth-startup': { col: '1 / span 2', row: '3' },
      metaverse: { col: '3 / span 6', row: '3' },
      'hack-western': { col: '9 / span 4', row: '3' },
      intuit: { col: '1 / span 7', row: '4' },
      'ivey-product': { col: '8 / span 5', row: '4' },
    },
    edges: HOME_DUO_BUCKET_EDGES,
  },
  {
    slug: 'zigzag-cascade',
    title: 'Zigzag cascade',
    description: 'Roles alternate left and right down the canvas in an S-curve.',
    tag: 'S-curve',
    gridClass: 'bw-grid--zigzag',
    work: {
      autodesk: { col: '1 / span 2', row: '1' },
      tesla: { col: '1 / span 2', row: '2' },
      'autodesk-eng': { col: '4', row: '2' },
      intuit: { col: '2 / span 2', row: '3' },
      omers: { col: '1', row: '3' },
      'stealth-startup': { col: '1', row: '4' },
      metaverse: { col: '4', row: '4' },
      'hack-western': { col: '4', row: '1' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'hub-spoke',
    title: 'Hub & spoke',
    description: 'Autodesk TPM anchors the center — internships and roles connect inward.',
    tag: 'Radial',
    gridClass: 'bw-grid--hub',
    careerEntry: 'autodesk',
    work: {
      autodesk: { col: '2 / span 2', row: '2' },
      tesla: { col: '2 / span 2', row: '1' },
      'autodesk-eng': { col: '4', row: '3' },
      intuit: { col: '4', row: '2' },
      omers: { col: '4', row: '1' },
      'stealth-startup': { col: '1', row: '1' },
      metaverse: { col: '2 / span 2', row: '3' },
      'hack-western': { col: '1', row: '2' },
      'ivey-product': { col: '1', row: '3' },
    },
    edges: [
      { from: 'tesla', to: 'autodesk', primary: true },
      { from: 'intuit', to: 'autodesk', primary: true },
      { from: 'omers', to: 'autodesk', primary: true },
      { from: 'stealth-startup', to: 'autodesk-eng', primary: true },
      { from: 'tesla', to: 'autodesk-eng', primary: true },
      { from: 'autodesk-eng', to: 'autodesk', primary: true },
      { from: 'hack-western', to: 'autodesk', primary: true },
      { from: 'metaverse', to: 'autodesk', primary: true },
      { from: 'ivey-product', to: 'autodesk', primary: true },
    ],
  },
  {
    slug: 'dual-rail',
    title: 'Dual rail',
    description: 'Engineering on the left rail, product & leadership on the right.',
    tag: 'Split path',
    gridClass: 'bw-grid--dual',
        work: {
      'autodesk': { col: '1 / span 2', row: '1' },
      'tesla': { col: '1 / span 2', row: '3' },
      'autodesk-eng': { col: '3 / span 2', row: '3' },
      'intuit': { col: '3', row: '1' },
      'omers': { col: '4', row: '1' },
      'stealth-startup': { col: '1', row: '4' },
      'metaverse': { col: '2', row: '4' },
      'hack-western': { col: '2', row: '2' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: [
      ...chain('autodesk', 'tesla', 'autodesk-eng', 'intuit', 'omers'),
      ...chain('stealth-startup', 'metaverse', 'hack-western', 'ivey-product'),
      { from: 'omers', to: 'stealth-startup', primary: true },
      { from: 'intuit', to: 'autodesk-eng', primary: true },
      { from: 'autodesk-eng', to: 'autodesk', primary: true },
    ],
  },
  {
    slug: 'wide-waterfall',
    title: 'Wide waterfall',
    description: 'Hero cube plus wide slabs in three tight bands.',
    tag: 'Stacked',
    gridClass: 'bw-grid--waterfall',
        work: {
      'autodesk': { col: '1 / span 2', row: '1' },
      'tesla': { col: '1 / span 2', row: '3' },
      'autodesk-eng': { col: '3 / span 2', row: '3' },
      'intuit': { col: '1 / span 2', row: '2' },
      'omers': { col: '3', row: '1' },
      'stealth-startup': { col: '4', row: '1' },
      'metaverse': { col: '4', row: '2' },
      'hack-western': { col: '3', row: '2' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'diamond-core',
    title: 'Diamond core',
    description: 'Autodesk anchors the middle — internships form a diamond around it.',
    tag: 'Diamond',
    gridClass: 'bw-grid--diamond',
    careerEntry: 'autodesk',
        work: {
      'autodesk': { col: '1 / span 2', row: '4' },
      'tesla': { col: '4', row: '1' },
      'autodesk-eng': { col: '4', row: '2' },
      'intuit': { col: '2 / span 2', row: '2' },
      'omers': { col: '1', row: '2' },
      'stealth-startup': { col: '4', row: '3' },
      'metaverse': { col: '1', row: '3' },
      'hack-western': { col: '4', row: '4' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: [
      { from: 'hack-western', to: 'autodesk', primary: true },
      { from: 'hack-western', to: 'metaverse', primary: true },
      { from: 'metaverse', to: 'autodesk', primary: true },
      { from: 'omers', to: 'autodesk', primary: true },
      { from: 'intuit', to: 'tesla', primary: true },
      { from: 'tesla', to: 'autodesk-eng', primary: true },
      { from: 'autodesk-eng', to: 'autodesk', primary: true },
      { from: 'ivey-product', to: 'autodesk', primary: true },
    ],
  },
  {
    slug: 'horizontal-pipeline',
    title: 'Horizontal pipeline',
    description: 'Hero leads into a left-to-right career pipeline.',
    tag: 'L→R flow',
    gridClass: 'bw-grid--pipeline',
        work: {
      'autodesk': { col: '4', row: '1 / span 2' },
      'tesla': { col: '5', row: '1' },
      'autodesk-eng': { col: '1', row: '3' },
      'intuit': { col: '3', row: '1' },
      'omers': { col: '2', row: '1' },
      'stealth-startup': { col: '1', row: '1' },
      'metaverse': { col: '2', row: '3' },
      'hack-western': { col: '3', row: '3 / span 2' },
      'ivey-product': { col: '5', row: '3' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'skill-satellites',
    title: 'Satellite orbit',
    description: 'Tesla and Autodesk as focal nodes with internships orbiting.',
    tag: 'Orbit',
    gridClass: 'bw-grid--satellites',
    careerEntry: 'tesla',
        work: {
      'autodesk': { col: '3 / span 2', row: '3 / span 2' },
      'tesla': { col: '1', row: '3' },
      'autodesk-eng': { col: '4', row: '1' },
      'intuit': { col: '2', row: '2' },
      'omers': { col: '3', row: '1' },
      'stealth-startup': { col: '1', row: '2' },
      'metaverse': { col: '2', row: '1' },
      'hack-western': { col: '4', row: '2' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'layered-bands',
    title: 'Layered bands',
    description: 'Hero, school, internships, and leadership in horizontal bands.',
    tag: 'Layers',
    gridClass: 'bw-grid--layers',
        work: {
      'autodesk': { col: '3 / span 2', row: '2' },
      'tesla': { col: '1 / span 2', row: '3' },
      'autodesk-eng': { col: '3 / span 2', row: '3' },
      'intuit': { col: '1 / span 2', row: '2' },
      'omers': { col: '1 / span 2', row: '4' },
      'stealth-startup': { col: '4', row: '1' },
      'metaverse': { col: '3', row: '4' },
      'hack-western': { col: '4', row: '4' },
      'ivey-product': { col: '2', row: '1' },
    },
    edges: [
      ...chain('autodesk', 'tesla', 'autodesk-eng', 'intuit', 'omers'),
      ...chain('autodesk', 'tesla', 'autodesk-eng', 'intuit', 'omers'),
      { from: 'omers', to: 'intuit', primary: true },
      { from: 'tesla', to: 'autodesk-eng', primary: true },
      { from: 'autodesk-eng', to: 'autodesk', primary: true },
      { from: 'ivey-product', to: 'autodesk', primary: true },
    ],
  },
  {
    slug: 'branch-merge',
    title: 'Branch & merge',
    description: 'School splits into eng + product paths, merging at Autodesk.',
    tag: 'Branch',
    gridClass: 'bw-grid--branch',
        work: {
      'autodesk': { col: '3 / span 2', row: '2' },
      'tesla': { col: '1 / span 2', row: '3' },
      'autodesk-eng': { col: '3 / span 2', row: '3' },
      'intuit': { col: '1 / span 2', row: '2' },
      'omers': { col: '3', row: '4' },
      'stealth-startup': { col: '4', row: '1' },
      'metaverse': { col: '1', row: '4' },
      'hack-western': { col: '2', row: '4' },
      'ivey-product': { col: '2', row: '1' },
    },
    edges: [
      ...branch('hack-western', ['metaverse', 'omers'], true),
      { from: 'hack-western', to: 'ivey-product', primary: true },
      { from: 'metaverse', to: 'intuit', primary: true },
      { from: 'omers', to: 'tesla', primary: true },
      ...branch('intuit', ['autodesk-eng', 'autodesk']),
      ...branch('tesla', ['autodesk-eng', 'autodesk']),
      { from: 'ivey-product', to: 'autodesk' },
    ],
  },
  {
    slug: 'open-constellation',
    title: 'Open constellation',
    description: 'Sparse four-row constellation with long connector runs.',
    tag: 'Sparse',
    gridClass: 'bw-grid--constellation',
        work: {
      'autodesk': { col: '2 / span 2', row: '3' },
      'tesla': { col: '4', row: '3' },
      'autodesk-eng': { col: '4', row: '1' },
      'intuit': { col: '1 / span 2', row: '2' },
      'omers': { col: '3', row: '2' },
      'stealth-startup': { col: '4', row: '2' },
      'metaverse': { col: '1', row: '3' },
      'hack-western': { col: '2', row: '4' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'compact-strip',
    title: 'Compact strip',
    description: 'Hero cube plus two tight rows of equal blocks.',
    tag: 'Strip',
    gridClass: 'bw-grid--strip',
        work: {
      'autodesk': { col: '3', row: '1' },
      'tesla': { col: '4', row: '1' },
      'autodesk-eng': { col: '1', row: '2' },
      'intuit': { col: '2 / span 2', row: '3' },
      'omers': { col: '2', row: '2' },
      'stealth-startup': { col: '3', row: '2' },
      'metaverse': { col: '4', row: '2' },
      'hack-western': { col: '4', row: '3' },
      'ivey-product': { col: '1', row: '3' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'hero-corner',
    title: 'Corner flow',
    description: 'Hero in the corner — experience fills toward bottom-right.',
    tag: 'Corner',
    gridClass: 'bw-grid--corner',
        work: {
      'autodesk': { col: '1 / span 2', row: '3' },
      'tesla': { col: '3', row: '3' },
      'autodesk-eng': { col: '1', row: '4' },
      'intuit': { col: '4', row: '2' },
      'omers': { col: '4', row: '1' },
      'stealth-startup': { col: '1', row: '2' },
      'metaverse': { col: '2', row: '2' },
      'hack-western': { col: '3', row: '2' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'stair-step',
    title: 'Stair step',
    description: 'Hero cube then each role steps diagonally down.',
    tag: 'Diagonal',
    gridClass: 'bw-grid--stair',
        work: {
      'autodesk': { col: '3', row: '2' },
      'tesla': { col: '4', row: '2' },
      'autodesk-eng': { col: '2', row: '3' },
      'intuit': { col: '2 / span 2', row: '4' },
      'omers': { col: '3', row: '3' },
      'stealth-startup': { col: '4', row: '3' },
      'metaverse': { col: '1', row: '4' },
      'hack-western': { col: '4', row: '4' },
      'ivey-product': { col: '1', row: '3' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'cross-axis',
    title: 'Cross axis',
    description: 'Hero and Western anchor a spine — paths branch left and right.',
    tag: 'Cross',
    gridClass: 'bw-grid--cross',
        work: {
      'autodesk': { col: '3 / span 2', row: '1' },
      'tesla': { col: '1', row: '3' },
      'autodesk-eng': { col: '4', row: '3' },
      'intuit': { col: '2', row: '2' },
      'omers': { col: '4', row: '2' },
      'stealth-startup': { col: '2', row: '1' },
      'metaverse': { col: '1', row: '2' },
      'hack-western': { col: '3', row: '4' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: [
      ...chain('autodesk', 'tesla', 'autodesk-eng', 'intuit', 'omers'),
      ...chain('autodesk', 'tesla', 'autodesk-eng', 'intuit', 'omers'),
            { from: 'ivey-product', to: 'autodesk' },
    ],
  },
  {
    slug: 'timeline-left',
    title: 'Timeline rows',
    description: 'Hero cube plus two timeline rows — school top, internships below.',
    tag: 'Timeline',
    gridClass: 'bw-grid--timeline',
        work: {
      'autodesk': { col: '4', row: '3 / span 2' },
      'tesla': { col: '4', row: '1' },
      'autodesk-eng': { col: '1', row: '2' },
      'intuit': { col: '1 / span 2', row: '3' },
      'omers': { col: '2', row: '2' },
      'stealth-startup': { col: '3', row: '2' },
      'metaverse': { col: '4', row: '2' },
      'hack-western': { col: '3', row: '3' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'mini-mosaic',
    title: 'Mini mosaic',
    description: 'Hero cube plus nine equal blocks in a tight mosaic.',
    tag: '4×3 grid',
    gridClass: 'bw-grid--mosaic',
        work: {
      'autodesk': { col: '3', row: '1' },
      'tesla': { col: '4', row: '1' },
      'autodesk-eng': { col: '1', row: '2' },
      'intuit': { col: '2 / span 2', row: '3' },
      'omers': { col: '2', row: '2' },
      'stealth-startup': { col: '3', row: '2' },
      'metaverse': { col: '4', row: '2' },
      'hack-western': { col: '4', row: '3' },
      'ivey-product': { col: '1', row: '3' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'inverted-flow',
    title: 'Featured anchor',
    description: 'Hero cube up top — Autodesk anchors the bottom row.',
    tag: 'Anchor',
    gridClass: 'bw-grid--inverted',
    careerEntry: 'autodesk',
        work: {
      'autodesk': { col: '2 / span 2', row: '2' },
      'tesla': { col: '3', row: '1' },
      'autodesk-eng': { col: '4', row: '1' },
      'intuit': { col: '3 / span 2', row: '3' },
      'omers': { col: '1', row: '2' },
      'stealth-startup': { col: '4', row: '2' },
      'metaverse': { col: '1', row: '3' },
      'hack-western': { col: '2', row: '3' },
      'ivey-product': { col: '2', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'checkerboard',
    title: 'Checkerboard',
    description: 'Hero cube plus alternating wide and narrow blocks.',
    tag: 'Checker',
    gridClass: 'bw-grid--checker',
        work: {
      'autodesk': { col: '3 / span 2', row: '2' },
      'tesla': { col: '2 / span 2', row: '3' },
      'autodesk-eng': { col: '4', row: '3' },
      'intuit': { col: '1', row: '2' },
      'omers': { col: '4', row: '1' },
      'stealth-startup': { col: '2', row: '2' },
      'metaverse': { col: '1', row: '4' },
      'hack-western': { col: '2', row: '4' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: FULL_CHAIN,
  },
  {
    slug: 'focal-center',
    title: 'Focal center',
    description: 'Autodesk as the large center block — all roles connect inward.',
    tag: 'Center',
    gridClass: 'bw-grid--focal',
    careerEntry: 'autodesk',
        work: {
      'autodesk': { col: '1', row: '2' },
      'tesla': { col: '4', row: '2' },
      'autodesk-eng': { col: '1', row: '3' },
      'intuit': { col: '2 / span 2', row: '2' },
      'omers': { col: '4', row: '3' },
      'stealth-startup': { col: '1', row: '4' },
      'metaverse': { col: '4', row: '4' },
      'hack-western': { col: '2', row: '4' },
      'ivey-product': { col: '3', row: '4' },
    },
    edges: [
      { from: 'hack-western', to: 'autodesk', primary: true },
      { from: 'metaverse', to: 'autodesk', primary: true },
      { from: 'omers', to: 'autodesk', primary: true },
      { from: 'intuit', to: 'autodesk', primary: true },
      { from: 'tesla', to: 'autodesk-eng', primary: true },
      { from: 'autodesk-eng', to: 'autodesk', primary: true },
      { from: 'ivey-product', to: 'autodesk', primary: true },
    ],
  },
  {
    slug: 'dense-cluster',
    title: 'Dense cluster',
    description: 'Hero cube plus maximum density in four rows.',
    tag: 'Dense',
    gridClass: 'bw-grid--dense',
        work: {
      'autodesk': { col: '3 / span 2', row: '3 / span 2' },
      'tesla': { col: '3', row: '1' },
      'autodesk-eng': { col: '4', row: '1' },
      'intuit': { col: '1 / span 2', row: '3' },
      'omers': { col: '1', row: '2' },
      'stealth-startup': { col: '2', row: '2' },
      'metaverse': { col: '3', row: '2' },
      'hack-western': { col: '4', row: '2' },
      'ivey-product': { col: '2', row: '1' },
    },
    edges: FULL_CHAIN,
  },
]
