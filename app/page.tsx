import { WorkflowBentoCanvas } from '@/components/portfolio/bento-workflows/WorkflowBentoCanvas'
import { PORTFOLIO_PAGE_SCHEME } from '@/lib/portfolio/bento-workflows/color-schemes'
import { getWorkflowLayout } from '@/lib/portfolio/bento-workflows/layouts'

export default function HomePage() {
  const layout = getWorkflowLayout('home-wireframe')

  if (!layout) {
    return null
  }

  return (
    <WorkflowBentoCanvas
      layout={layout}
      showWorkspaceControls={false}
      fixedColorScheme={PORTFOLIO_PAGE_SCHEME}
    />
  )
}
