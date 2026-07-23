'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WorkflowBentoCanvas } from './WorkflowBentoCanvas'
import { getWorkflowLayout } from '@/lib/portfolio/bento-workflows/layouts'

export function WorkflowBentoLayoutView({ slug: initialSlug }: { slug: string }) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug)

  useEffect(() => {
    setSlug(initialSlug)
  }, [initialSlug])

  const layout = getWorkflowLayout(slug)
  const handleLayoutChange = useCallback(
    (nextSlug: string) => {
      setSlug(nextSlug)
      router.replace(`/bento-workflows/${nextSlug}`, { scroll: false })
    },
    [router]
  )

  if (!layout) return null

  return (
    <WorkflowBentoCanvas layout={layout} showSwitcher onLayoutChange={handleLayoutChange} />
  )
}
