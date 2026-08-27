import { notFound, redirect } from 'next/navigation'
import { WORK_ORDER, type WorkId } from '@/lib/portfolio/bento-workflows/experience-layouts'
import { isWorkExperienceSlug } from '@/lib/portfolio/work-experience-content'
import { getWorkTileById } from '@/lib/portfolio/bento-workflows/layouts'
import { WorkExperiencePageClient } from '@/components/portfolio/WorkExperiencePageClient'

export function generateStaticParams() {
  return WORK_ORDER.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isWorkExperienceSlug(slug)) return { title: 'Experience · Jasmine Gu' }
  const tile = getWorkTileById(slug)
  return {
    title: `${tile.title} · Jasmine Gu`,
    description: tile.subtitle,
  }
}

export default async function WorkExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!isWorkExperienceSlug(slug)) notFound()
  if (slug === 'tesla') redirect('/tesla')
  if (slug === 'autodesk') redirect('/autodesk')
  return <WorkExperiencePageClient slug={slug as WorkId} />
}
