'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { WorkFilter } from '@/lib/portfolio/portfolio-data'

export type PortfolioView = 'architecture' | 'work' | 'ask'

export interface PortfolioState {
  activeView: PortfolioView
  selectedExperienceIds: string[]
  selectedContexts: string[]
  activeFilters: WorkFilter[]
  highlightedNodeIds: string[]
  traceIds: string[]
  agentOpen: boolean
}

export interface PortfolioStateContextValue extends PortfolioState {
  setActiveView: (view: PortfolioView) => void
  setSelectedExperienceIds: (ids: string[]) => void
  addContext: (id: string) => void
  removeContext: (id: string) => void
  clearContexts: () => void
  setActiveFilters: (filters: WorkFilter[]) => void
  setWorkFilter: (filter: WorkFilter) => void
  setHighlightedNodeIds: (ids: string[]) => void
  highlightNodes: (ids: string[]) => void
  clearHighlights: () => void
  setTraceIds: (ids: string[]) => void
  clearTrace: () => void
  setAgentOpen: (open: boolean) => void
  toggleAgent: () => void
}

const PortfolioStateContext = createContext<PortfolioStateContextValue | null>(null)

export function PortfolioStateProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<PortfolioView>('work')
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>([])
  const [selectedContexts, setSelectedContexts] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<WorkFilter[]>(['ALL'])
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([])
  const [traceIds, setTraceIdsState] = useState<string[]>([])
  const [agentOpen, setAgentOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(max-width: 640px)').matches
  })

  const addContext = useCallback((id: string) => {
    setSelectedContexts((current) => (current.includes(id) ? current : [...current, id]))
  }, [])

  const removeContext = useCallback((id: string) => {
    setSelectedContexts((current) => current.filter((entry) => entry !== id))
  }, [])

  const clearContexts = useCallback(() => {
    setSelectedContexts([])
  }, [])

  const setWorkFilter = useCallback((filter: WorkFilter) => {
    setActiveFilters([filter])
  }, [])

  const highlightNodes = useCallback((ids: string[]) => {
    setHighlightedNodeIds(ids)
  }, [])

  const clearHighlights = useCallback(() => {
    setHighlightedNodeIds([])
  }, [])

  const setTraceIds = useCallback((ids: string[]) => {
    setTraceIdsState(ids)
  }, [])

  const clearTrace = useCallback(() => {
    setTraceIdsState([])
  }, [])

  const toggleAgent = useCallback(() => {
    setAgentOpen((open) => !open)
  }, [])

  const value = useMemo<PortfolioStateContextValue>(
    () => ({
      activeView,
      selectedExperienceIds,
      selectedContexts,
      activeFilters,
      highlightedNodeIds,
      traceIds,
      agentOpen,
      setActiveView,
      setSelectedExperienceIds,
      addContext,
      removeContext,
      clearContexts,
      setActiveFilters,
      setWorkFilter,
      setHighlightedNodeIds,
      highlightNodes,
      clearHighlights,
      setTraceIds,
      clearTrace,
      setAgentOpen,
      toggleAgent,
    }),
    [
      activeView,
      selectedExperienceIds,
      selectedContexts,
      activeFilters,
      highlightedNodeIds,
      traceIds,
      agentOpen,
      addContext,
      removeContext,
      clearContexts,
      setWorkFilter,
      highlightNodes,
      clearHighlights,
      setTraceIds,
      clearTrace,
      toggleAgent,
    ]
  )

  return (
    <PortfolioStateContext.Provider value={value}>{children}</PortfolioStateContext.Provider>
  )
}

export function usePortfolioState() {
  const context = useContext(PortfolioStateContext)
  if (!context) {
    throw new Error('usePortfolioState must be used within PortfolioStateProvider')
  }
  return context
}
