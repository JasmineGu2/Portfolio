'use client'

import { ArrowUpRight } from 'lucide-react'
import { useAgentActionDispatch, referenceToAction } from '@/lib/portfolio/agent/actions'
import type { ResolvedReference } from '@/lib/portfolio/agent/types'
import { cn } from '@/lib/utils'

/**
 * A rich evidence card, not a bare chip (spec §19). The `reason` line is the
 * point — "worth reading because…" rather than a plain "Related: X" (spec §8).
 */
export function ReferenceCard({ reference }: { reference: ResolvedReference }) {
  const dispatch = useAgentActionDispatch()

  return (
    <button
      type="button"
      className={cn('agent-ref-card', reference.seen && 'agent-ref-card--seen')}
      onClick={() => dispatch(referenceToAction(reference))}
      data-cuelume-hover
      data-cuelume-press
    >
      <span className="agent-ref-card__kind font-analogue">{reference.kindLabel}</span>
      <span className="agent-ref-card__title">{reference.title}</span>
      {reference.reason && <span className="agent-ref-card__reason">{reference.reason}</span>}
      <ArrowUpRight className="agent-ref-card__arrow" aria-hidden />
    </button>
  )
}
