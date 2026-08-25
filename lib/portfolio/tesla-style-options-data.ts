export type TeslaStyleVariantId =
  | 'story-restrained'
  | 'story-soft-flow'
  | 'story-editorial-mix'
  | 'spacious-editorial'
  | 'spacious-coral-hint'
  | 'spacious-navy-headlines'
  | 'spacious-lavender-impact'
  | 'spacious-warm-paper'
  | 'spacious-line-mark'
  | 'minimal-editorial'
  | 'monochrome-document'
  | 'soft-neutral'
  | 'restrained-accent'

export interface TeslaStyleVariant {
  id: TeslaStyleVariantId
  name: string
  description: string
  bestFor: string
  group: 'story' | 'spacious' | 'other'
}

export const STORY_STYLE_VARIANTS: TeslaStyleVariant[] = [
  {
    id: 'story-restrained',
    name: 'Story · Restrained',
    description:
      'Narrative chapter beats with restrained-accent panels—lavender questions, coral-topped cards, quote pivot, orange outcomes. Reads like a story, not a spec sheet.',
    bestFor: 'The in-between: restrained accent layout with clearer story rhythm—recommended.',
    group: 'story',
  },
  {
    id: 'story-soft-flow',
    name: 'Story · Soft flow',
    description:
      'Same chapter arc and panel types, but grey question blocks and a lighter outcomes treatment. Color stays in the margins.',
    bestFor: 'Story pacing with even less visual weight than restrained accent.',
    group: 'story',
  },
  {
    id: 'story-editorial-mix',
    name: 'Story · Editorial mix',
    description:
      'Editorial chapter labels and airy serif hooks, with restrained panels only where the narrative needs emphasis.',
    bestFor: 'Spacious editorial hierarchy plus restrained-accent story blocks.',
    group: 'story',
  },
]

export const SPACIOUS_STYLE_VARIANTS: TeslaStyleVariant[] = [
  {
    id: 'spacious-editorial',
    name: 'Spacious · Pure',
    description:
      'White canvas, meta grid, small-caps labels, and large serif statements. Almost no color—structure from spacing and type alone.',
    bestFor: 'Maximum calm; closest to the reference layout.',
    group: 'spacious',
  },
  {
    id: 'spacious-coral-hint',
    name: 'Spacious · Coral hint',
    description:
      'Same airy layout with coral section labels, a skills dot, and accent bullet markers. The lightest touch of brand color.',
    bestFor: 'Spacious editorial plus a tiny bit of warmth—recommended starting point.',
    group: 'spacious',
  },
  {
    id: 'spacious-navy-headlines',
    name: 'Spacious · Navy headlines',
    description:
      'Navy serif statements tie back to your portfolio brand. Grey labels, coral micro-dot on skills only.',
    bestFor: 'Editorial hierarchy with homepage navy without colored blocks.',
    group: 'spacious',
  },
  {
    id: 'spacious-lavender-impact',
    name: 'Spacious · Lavender impact',
    description:
      'Neutral throughout; only the Impact section gets a soft lavender panel and navy label.',
    bestFor: 'One quiet highlight zone instead of scattered accents.',
    group: 'spacious',
  },
  {
    id: 'spacious-warm-paper',
    name: 'Spacious · Warm paper',
    description:
      'Cream background with dark headlines and coral labels. Feels editorial but slightly cozier than pure white.',
    bestFor: 'Softer page tone while keeping the same layout rhythm.',
    group: 'spacious',
  },
  {
    id: 'spacious-line-mark',
    name: 'Spacious · Line mark',
    description:
      'Grey type throughout with a thin coral rule under the meta grid and left-edge marks on each section.',
    bestFor: 'Structure and accent through lines—not fills or panels.',
    group: 'spacious',
  },
]

export const OTHER_STYLE_VARIANTS: TeslaStyleVariant[] = [
  {
    id: 'minimal-editorial',
    name: 'Minimal Editorial',
    description:
      'Cream and white surfaces, navy serif headlines, gray body copy. No callout colors—structure comes from spacing and type alone.',
    bestFor: 'Calm, magazine-like reading with homepage serif connection but less visual noise.',
    group: 'other',
  },
  {
    id: 'monochrome-document',
    name: 'Monochrome Document',
    description:
      'Single-column prose, hairline dividers, no tinted cards. Hierarchy through size and weight only.',
    bestFor: 'Maximum readability when you want the writing to feel serious and undistracted.',
    group: 'other',
  },
  {
    id: 'soft-neutral',
    name: 'Soft Neutral',
    description:
      'Light gray panels instead of yellow or orange blocks. Orange reserved for a few emphasized terms.',
    bestFor: 'Structured sections without the current high-contrast color blocks.',
    group: 'other',
  },
  {
    id: 'restrained-accent',
    name: 'Restrained Accent',
    description:
      'Navy typography throughout, one orange outcomes strip, lavender quotes. Removes yellow callouts entirely.',
    bestFor: 'A middle ground—still branded, but much less colorful than the live page today.',
    group: 'other',
  },
]

export const TESLA_STYLE_VARIANTS: TeslaStyleVariant[] = [
  ...STORY_STYLE_VARIANTS,
  ...SPACIOUS_STYLE_VARIANTS,
  ...OTHER_STYLE_VARIANTS,
]

export function isSpaciousVariant(id: TeslaStyleVariantId): boolean {
  return id.startsWith('spacious-')
}

export function isStoryVariant(id: TeslaStyleVariantId): boolean {
  return id.startsWith('story-')
}

export const TESLA_STYLE_PREVIEW = {
  label: 'Context',
  headline: 'Usability changes with the environment.',
  paragraphs: [
    'Factory software operates under very different conditions from consumer onboarding. Operators and engineers needed to inspect model runs, camera footage, operational charts, and related metadata—often while diagnosing time-sensitive issues.',
    'At Intuit, I learned to use motion, consistency, and feedback to reduce uncertainty. At Tesla, those same principles had to support speed, technical depth, and operational trust.',
  ],
  questionTitle: 'Questions we used to evaluate each interaction',
  questions: [
    'Will this interaction help someone continue?',
    'Does this animation clarify what happened?',
    'Can we reduce uncertainty before the user abandons the flow?',
  ],
  stakeholders: [
    {
      title: 'Operators',
      detail: 'Needed to find relevant results quickly and continue an investigation without losing context.',
    },
    {
      title: 'ML engineers',
      detail: 'Needed enough detail to compare model runs and understand unexpected outputs.',
    },
  ],
  quote:
    'At Intuit, usability often meant clarity, confidence, and delight. At Tesla, it meant speed, reliability, continuity, and making complex operational data legible.',
  outcomes: [
    '10+ production UI components shipped',
    '~40% faster time-to-insight for operations teams',
    '~20% faster page loads',
  ],
} as const

export const TESLA_STYLE_SPACIOUS_PREVIEW = {
  meta: [
    { label: 'Role', value: 'Product Designer Intern' },
    { label: 'Timeline', value: 'Jan – Apr 2024' },
    { label: 'Team', value: 'Solo' },
    {
      label: 'Skills',
      value: 'User Research, UI Systems, Figma',
      highlight: 'User Research',
    },
  ],
  sections: [
    {
      label: 'Overview',
      headline: 'Usability changes with the environment.',
      body: 'Factory software operates under very different conditions from consumer onboarding. Operators and engineers needed to inspect model runs, camera footage, operational charts, and related metadata—often while diagnosing time-sensitive issues.',
    },
    {
      label: 'Context',
      headline:
        'At Intuit, clarity and confidence. At Tesla, speed, reliability, and operational trust.',
      body: 'The same design principles had to support technical depth and fast decision-making on the factory floor—not just polished onboarding flows.',
    },
    {
      label: 'Impact',
      headline: 'Shipped production UI that operations teams actually use.',
      bullets: [
        '10+ production UI components shipped',
        '~40% faster time-to-insight for operations teams',
        '~20% faster page loads',
      ],
    },
  ],
} as const

export const TESLA_STYLE_STORY_PREVIEW = {
  beats: [
    {
      chapter: '01 · The shift',
      headline: 'Usability changes with the environment.',
      paragraphs: [
        'Factory software operates under very different conditions from consumer onboarding.',
        'Operators and engineers needed to inspect model runs, camera footage, and operational charts—often while diagnosing time-sensitive issues.',
      ],
    },
    {
      chapter: '02 · The lens',
      lead: 'At Intuit, I learned to use motion and feedback to reduce uncertainty. At Tesla, those principles had to support speed and operational trust.',
      questionTitle: 'Questions we used to evaluate each interaction',
      questions: [
        'Will this interaction help someone continue?',
        'Does this animation clarify what happened?',
        'Can we reduce uncertainty before the user abandons the flow?',
      ],
    },
    {
      chapter: '03 · The people',
      lead: 'The product served several stakeholders with different needs:',
      stakeholders: [
        {
          title: 'Operators',
          detail: 'Needed to find relevant results quickly and continue an investigation without losing context.',
        },
        {
          title: 'ML engineers',
          detail: 'Needed enough detail to compare model runs and understand unexpected outputs.',
        },
      ],
    },
    {
      chapter: '04 · The turn',
      quote:
        'At Intuit, usability often meant clarity, confidence, and delight. At Tesla, it meant speed, reliability, continuity, and making complex operational data legible.',
    },
    {
      chapter: '05 · What shipped',
      headline: 'Production UI that operations teams actually use.',
      outcomes: [
        '10+ production UI components shipped',
        '~40% faster time-to-insight for operations teams',
        '~20% faster page loads',
      ],
    },
  ],
} as const
