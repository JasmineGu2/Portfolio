export interface TeslaCaseStudySection {
  id: string
  label: string
}

export const TESLA_CASE_STUDY_SECTIONS: TeslaCaseStudySection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'information-design', label: 'Information Design' },
  { id: 'reusable-systems', label: 'Reusable Systems' },
  { id: 'video-apis-security', label: 'Video, APIs & Security' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'side-quests', label: 'Side Quests' },
]

export const TESLA_HERO_META = {
  kicker: 'Tesla · Shipped Summer 2025',
  title: 'Building Reusable Factory Software',
  role: 'Frontend and Infrastructure Engineering Intern',
  timeline: 'May–August 2025',
  team: ['Software Engineers', 'ML Engineers', 'Operators', 'Technicians'],
  skills: [
    'Frontend Architecture',
    'Information Design',
    'State Management',
    'API Integration',
    'Performance',
    'Security',
  ],
} as const

export const TESLA_OVERVIEW_STATS = [
  { value: '10+ production UI components shipped' },
  { value: '~40% faster time-to-insight for operations teams' },
  { value: '~20% faster page loads' },
  { value: '4 global factory locations supported' },
] as const

export const TESLA_INTUIT_QUESTIONS = [
  'Will this interaction help someone continue?',
  'Does this animation clarify what happened?',
  'Can we reduce uncertainty before the user abandons the flow?',
  'Does the experience feel trustworthy and reassuring?',
] as const

export const TESLA_STAKEHOLDERS = [
  {
    title: 'Operators',
    detail: 'Needed to identify relevant results quickly and continue investigations without losing context.',
  },
  {
    title: 'ML engineers',
    detail: 'Needed enough detail to compare model runs and understand unexpected outputs.',
  },
  {
    title: 'Software engineers',
    detail: 'Needed predictable data contracts, reusable patterns, and code that could support future workflows.',
  },
  {
    title: 'Technicians',
    detail: 'Needed interfaces that reflected how investigations actually happened on the factory floor.',
  },
] as const

export const TESLA_QUALITY_POINTS = [
  'finding the right information quickly',
  'understanding what changed',
  'preserving context during updates',
  'making dense workflows scannable',
  'keeping repeated interactions predictable',
  'allowing engineers to extend the product without rebuilding it',
] as const

export const TESLA_WORKFLOW_CARDS = [
  {
    title: 'Live charts',
    detail: 'For understanding current operational conditions and changes over time.',
  },
  {
    title: 'Forms and filters',
    detail: 'For narrowing large datasets and taking action.',
  },
  {
    title: 'Tables and modal views',
    detail: 'For moving from high-level results into deeper investigation.',
  },
  {
    title: 'Footage and metadata',
    detail: 'For understanding what happened, when it happened, and what the system detected.',
  },
] as const

export const TESLA_DESIGN_QUESTIONS = [
  'What should the user see first?',
  'Which information supports the next decision?',
  'What can remain hidden until deeper investigation?',
  'What should load immediately?',
  'Which states must persist through refreshes?',
  'How should the new workflow fit into the existing product?',
] as const

export const TESLA_REUSE_WORKFLOW =
  'Review data → filter results → inspect details → take action → return without losing context'

export const TESLA_VIDEO_CAPABILITIES = [
  'secure playback',
  'synchronized visual overlays',
  'responsive resizing',
  'persistent playback state',
  'lazy loading',
  'live metadata updates',
  'loading and failure states',
] as const

export const TESLA_VIDEO_SUBSECTIONS = [
  {
    title: 'Separation of concerns',
    body: 'Video state and metadata changed at different rates. Treating them as one unit could cause the video to remount or reset whenever new information arrived. I separated those responsibilities so metadata could update without interrupting playback or closing the investigation.',
  },
  {
    title: 'Performance',
    body: 'Large media files made loading strategy part of the user experience. I used lazy loading, parallel data fetching, skeleton states, memoization, and targeted updates to reduce unnecessary work and keep the interface responsive.',
  },
  {
    title: 'API contracts',
    body: 'The frontend depended on predictable information: protected file locations, timestamps, visual coordinates, detection types, and supporting metadata. I worked with backend engineers to define how this information would be consumed and represented in the interface.',
  },
  {
    title: 'Security',
    body: 'Factory footage could not be treated like a public video URL. Playback required authentication cookies, custom headers, credentials, API coordination, and CORS handling. I helped build the request flow needed to stream protected footage securely.',
  },
] as const

export const TESLA_OUTCOMES = [
  'shipped 10+ production UI components',
  'supported labeling, anomaly investigation, threat visualization, and live factory monitoring',
  'reduced operations teams’ time-to-insight by approximately 40%',
  'reduced page-load time by approximately 20%',
  'created reusable frontend foundations for future operational workflows',
  'supported factory software used across Shanghai, Fremont, Austin, and Berlin',
] as const
