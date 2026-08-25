'use client'

import { createContext, type ReactNode } from 'react'
import { useAskAgentState } from './useAskAgent'

export type AskAgentState = ReturnType<typeof useAskAgentState>

export const AskAgentContext = createContext<AskAgentState | null>(null)

export function AskAgentProvider({ children }: { children: ReactNode }) {
  const agent = useAskAgentState({ variant: 'hero' })
  return <AskAgentContext.Provider value={agent}>{children}</AskAgentContext.Provider>
}
