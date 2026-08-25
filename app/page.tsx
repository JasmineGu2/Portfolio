import { WorkflowBentoCanvas } from '@/components/portfolio/bento-workflows/WorkflowBentoCanvas'
import { getWorkflowLayout } from '@/lib/portfolio/bento-workflows/layouts'
import { HERO_TAGLINE } from '@/lib/portfolio/site-copy'

export const metadata = {
  title: 'Work — Jasmine Gu',
  description: HERO_TAGLINE.secondary,
}

export default function WorkPage() {
  const layout = getWorkflowLayout('home-wireframe')

  if (!layout) {
    return null
  }

  return (
    <WorkflowBentoCanvas
      layout={layout}
      showWorkspaceControls={false}
    />
  )
}
