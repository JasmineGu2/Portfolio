'use client'

import { createContext, useEffect, type ReactNode } from 'react'
import { validateAgentContent } from '@/lib/portfolio/agent/grounding'
import { useAskAgentState } from './useAskAgent'

export type AskAgentState = ReturnType<typeof useAskAgentState>

export const AskAgentContext = createContext<AskAgentState | null>(null)

/**
 * One shared Ask Jasmine conversation for the whole workspace — the hero panel,
 * the side panel, and the floating widget all read this, so a visitor keeps
 * their thread and context moving between pages (spec §2, §11).
 */
export function AskAgentProvider({ children }: { children: ReactNode }) {
  const agent = useAskAgentState({ variant: 'hero' })

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const result = validateAgentContent()
    if (!result.ok) {
      console.error('[ask-jasmine] grounding problems:\n' + result.problems.join('\n'))
    }
  }, [])

  return <AskAgentContext.Provider value={agent}>{children}</AskAgentContext.Provider>
}
