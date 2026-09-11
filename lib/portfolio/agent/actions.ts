'use client'

/**
 * Ask Jasmine — navigation actions (spec §10).
 *
 * The agent is an interface to the portfolio, not a search box. A reference card
 * or a context button dispatches an `AgentAction` that moves the visitor through
 * the site and can pre-light the destination (highlight tiles, trace a path on
 * the Journey page). Answering a question never navigates on its own — only an
 * explicit click does.
 */

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { getWritingEntry } from './writing'
import { experienceHref, referenceToAction } from './retrieval'
import type { AgentAction } from './types'

export { experienceHref, referenceToAction }

const ARCH_SCROLL_TARGET = 'arch-experience-matrix'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function useAgentActionDispatch() {
  const router = useRouter()
  const { highlightNodes, setTraceIds } = usePortfolioState()

  return useCallback(
    (action: AgentAction) => {
      switch (action.type) {
        case 'navigate':
          router.push(action.href)
          break
        case 'openExperience':
          router.push(experienceHref(action.id))
          break
        case 'openWriting': {
          const entry = getWritingEntry(action.id)
          if (entry) router.push(entry.href)
          else if (process.env.NODE_ENV !== 'production') {
            console.warn(`[ask-jasmine] openWriting: no writing entry "${action.id}"`)
          }
          break
        }
        case 'scroll':
          scrollToId(action.targetId)
          break
        case 'highlight':
          highlightNodes([action.targetId])
          break
        case 'trace':
          setTraceIds(action.nodeIds)
          if (typeof window !== 'undefined' && window.location.pathname !== '/architecture') {
            router.push('/architecture')
            window.setTimeout(() => scrollToId(ARCH_SCROLL_TARGET), 450)
          } else {
            scrollToId(ARCH_SCROLL_TARGET)
          }
          break
      }
    },
    [router, highlightNodes, setTraceIds]
  )
}
