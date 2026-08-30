/** Jenny Wen–style bio + nav, edit your write-up here */

import { RESUME_HREF } from '@/lib/portfolio/resume'

export const BIO_NAV = {
  primary: [{ label: 'Workflow', href: '#workflow' }],
  secondary: [
    { label: 'Email', href: 'mailto:jgu.hba2027@ivey.ca' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jasmine-gu-b2aa65201', external: true },
    { label: 'Résumé', href: RESUME_HREF, external: true },
  ],
}

export interface BioLink {
  label: string
  href: string
  stepId?: string
}

/** Inline links referenced in the bio paragraphs */
export const BIO_LINKS: Record<string, BioLink> = {
  autodesk: { label: 'Autodesk', href: '#step-autodesk-pm', stepId: 'autodesk-pm' },
  tesla: { label: 'Tesla', href: '#step-tesla', stepId: 'tesla' },
  intuit: { label: 'Intuit', href: '#step-intuit', stepId: 'intuit' },
  omers: { label: 'OMERS', href: '#step-omers', stepId: 'omers' },
  metaverse: { label: 'Metaverse Group', href: '#step-metaverse', stepId: 'metaverse' },
  western: { label: 'Western / Ivey', href: '#step-education', stepId: 'education' },
}

export const BIO_PARAGRAPHS: { text: string; linkKeys?: string[] }[] = [
  {
    text: 'My work is translation. I move between users, product, engineering, and operations, and turn ambiguous problems into shipped workflows.',
  },
  {
    text: 'I studied Computer Science and Business at {western}. Right now I\'m shaping data products and AI capabilities at {autodesk}, after building operator-facing ML software at {tesla} and product engineering at {intuit}.',
    linkKeys: ['western', 'autodesk', 'tesla', 'intuit'],
  },
  {
    text: 'Along the way I\'ve translated enterprise stakeholder needs at {omers}, automated B2B growth at {metaverse}, and shipped full-stack products at early-stage startups. I\'m most useful where product, engineering, and operations collide.',
    linkKeys: ['omers', 'metaverse'],
  },
]
