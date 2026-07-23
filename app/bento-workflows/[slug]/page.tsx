import { notFound } from 'next/navigation'
import { WorkflowBentoHub } from '@/components/portfolio/bento-workflows/WorkflowBentoCanvas'
import { WorkflowBentoLayoutView } from '@/components/portfolio/bento-workflows/WorkflowBentoLayoutView'
import { getWorkflowLayout, WORKFLOW_BENTO_LAYOUTS } from '@/lib/portfolio/bento-workflows/layouts'

export function generateStaticParams() {
  return WORKFLOW_BENTO_LAYOUTS.map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const layout = getWorkflowLayout(params.slug)
  if (!layout) return { title: 'Workflow bento' }
  return { title: `Workflow bento — ${layout.title}` }
}

export default function WorkflowBentoPage({ params }: { params: { slug: string } }) {
  const layout = getWorkflowLayout(params.slug)
  if (!layout) notFound()

  return <WorkflowBentoLayoutView slug={params.slug} />
}
