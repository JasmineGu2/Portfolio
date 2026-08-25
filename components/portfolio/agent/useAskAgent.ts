'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { AskAgentContext } from './AskAgentProvider'
import {
  filterExperiencePickerGroups,
  getAutocompleteMatches,
  getContextualSuggestions,
  resolveAskResponse,
  contextLabel,
  type AgentResponse,
} from '@/lib/portfolio/ask-agent'

export type ChatMessage =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; response: AgentResponse }

function scrollToHighlighted(ids: string[]) {
  if (ids.length === 0) return
  const el = document.querySelector(`[data-bw-tile="${ids[0]}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function scrollToTraceSection() {
  const el =
    document.getElementById('arch-experience-inputs') ??
    document.getElementById('arch-timeline')
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function resizeTextarea(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 140)}px`
}

function focusComposer(input: HTMLTextAreaElement | null, delayMs = 0) {
  if (!input) return
  window.setTimeout(() => {
    input.focus({ preventScroll: true })
  }, delayMs)
}

function composerFocusDelayMs(): number {
  if (typeof window === 'undefined') return 0
  return window.matchMedia(MOBILE_AGENT_MQ).matches ? 280 : 0
}

const MOBILE_AGENT_MQ = '(max-width: 640px)'

function isMobileAgentViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_AGENT_MQ).matches
}

export function useAskAgent({ variant = 'sidebar' }: { variant?: 'sidebar' | 'hero' } = {}) {
  const shared = useContext(AskAgentContext)
  const local = useAskAgentState({ variant })
  return shared ?? local
}

export function useAskAgentState({ variant = 'sidebar' }: { variant?: 'sidebar' | 'hero' } = {}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const {
    agentOpen,
    setAgentOpen,
    toggleAgent,
    selectedContexts,
    addContext,
    removeContext,
    clearContexts,
    highlightNodes,
    clearHighlights,
    setTraceIds,
    clearTrace,
  } = usePortfolioState()

  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerQuery, setPickerQuery] = useState('')
  const [activeAutocomplete, setActiveAutocomplete] = useState(-1)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef(pathname)
  const prevAgentOpenRef = useRef(agentOpen)
  const mountedRef = useRef(false)

  const isHero = variant === 'hero'
  const panelActive = isHero || agentOpen
  const hasMessages = messages.length > 0

  const suggestions = useMemo(
    () => getContextualSuggestions(selectedContexts, pathname),
    [selectedContexts, pathname]
  )

  const autocomplete = useMemo(
    () => getAutocompleteMatches(query, selectedContexts, pathname),
    [query, selectedContexts, pathname]
  )

  const groupedPicker = useMemo(
    () => filterExperiencePickerGroups(pickerQuery),
    [pickerQuery]
  )

  const toggleContext = useCallback(
    (id: string) => {
      if (selectedContexts.includes(id)) {
        removeContext(id)
      } else {
        addContext(id)
      }
    },
    [selectedContexts, addContext, removeContext]
  )

  const contextHint =
    selectedContexts.length === 0
      ? 'Focus area (optional) — e.g. Tesla, product, AI'
      : selectedContexts.map((id) => contextLabel(id)).join(' · ')

  const close = useCallback(() => {
    setAgentOpen(false)
    setPickerOpen(false)
  }, [setAgentOpen])

  const submitQuery = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      setMessages((current) => [...current, { id: newId(), role: 'user', text: trimmed }])
      setQuery('')
      setActiveAutocomplete(-1)
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
      }

      const result = resolveAskResponse(trimmed, 'explain', selectedContexts)
      setMessages((current) => [...current, { id: newId(), role: 'assistant', response: result }])

      if (result.traceIds?.length) {
        setTraceIds(result.traceIds)
        if (result.highlightIds.length > 0) {
          highlightNodes(result.highlightIds)
        }
        if (pathname !== '/architecture') {
          router.push('/architecture')
        }
        setTimeout(scrollToTraceSection, pathname !== '/architecture' ? 450 : 150)
        return
      }

      if (result.highlightIds.length > 0) {
        highlightNodes(result.highlightIds)
        if (pathname !== '/') {
          router.push('/')
          setTimeout(() => scrollToHighlighted(result.highlightIds), 400)
        } else {
          scrollToHighlighted(result.highlightIds)
        }
      }
    },
    [selectedContexts, highlightNodes, setTraceIds, pathname, router]
  )

  const startNewChat = useCallback(() => {
    setMessages([])
    setQuery('')
    clearContexts()
    clearHighlights()
    clearTrace()
    setPickerOpen(false)
    inputRef.current?.focus()
  }, [clearContexts, clearHighlights, clearTrace])

  const handleTrace = useCallback(
    (traceIds: string[]) => {
      if (!traceIds.length) return
      setTraceIds(traceIds)
      if (pathname !== '/architecture') {
        router.push('/architecture')
      }
      setTimeout(scrollToTraceSection, pathname !== '/architecture' ? 450 : 150)
    },
    [pathname, router, setTraceIds]
  )

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (pickerOpen) setPickerOpen(false)
        else if (!isHero && agentOpen) close()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        if (isHero) {
          focusComposer(inputRef.current, 0)
        } else {
          toggleAgent()
        }
      }
      if (!panelActive || !query) return
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveAutocomplete((i) => Math.min(i + 1, autocomplete.length - 1))
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveAutocomplete((i) => Math.max(i - 1, 0))
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        if (activeAutocomplete >= 0 && autocomplete[activeAutocomplete]) {
          submitQuery(autocomplete[activeAutocomplete])
        } else {
          submitQuery(query)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    panelActive,
    isHero,
    close,
    toggleAgent,
    query,
    autocomplete,
    activeAutocomplete,
    submitQuery,
    pickerOpen,
    agentOpen,
  ])

  useEffect(() => {
    if (!isHero && !agentOpen) {
      clearHighlights()
    }
  }, [agentOpen, clearHighlights, isHero])

  useEffect(() => {
    const prevPath = prevPathRef.current
    if (prevPath === '/architecture' && pathname !== '/architecture') {
      clearTrace()
    }
    if (
      !isHero &&
      prevPath !== pathname &&
      agentOpen &&
      isMobileAgentViewport()
    ) {
      close()
    }
    prevPathRef.current = pathname
  }, [pathname, clearTrace, isHero, agentOpen, close])

  useEffect(() => {
    if (isHero || !agentOpen) return
    const mq = window.matchMedia(MOBILE_AGENT_MQ)

    function syncBodyScrollLock() {
      document.body.style.overflow = mq.matches ? 'hidden' : ''
    }

    syncBodyScrollLock()
    mq.addEventListener('change', syncBodyScrollLock)
    return () => {
      mq.removeEventListener('change', syncBodyScrollLock)
      document.body.style.overflow = ''
    }
  }, [agentOpen, isHero])

  useEffect(() => {
    if (searchParams.get('ask') !== 'open') return
    setAgentOpen(true)
    router.replace(pathname, { scroll: false })
  }, [pathname, router, searchParams, setAgentOpen])

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!panelActive) {
      prevAgentOpenRef.current = false
      return
    }

    const openedNow = !prevAgentOpenRef.current
    const initialMount = !mountedRef.current
    prevAgentOpenRef.current = true
    mountedRef.current = true

    if (!pickerOpen) {
      if (isHero) {
        // Hero keeps the composer unfocused on load so the typewriter placeholder stays visible.
      } else if (openedNow || initialMount) {
        focusComposer(inputRef.current, composerFocusDelayMs())
      }
    }
  }, [panelActive, pickerOpen, isHero])

  return {
    pathname,
    query,
    setQuery,
    messages,
    hasMessages,
    pickerOpen,
    setPickerOpen,
    pickerQuery,
    setPickerQuery,
    activeAutocomplete,
    setActiveAutocomplete,
    inputRef,
    threadRef,
    suggestions,
    autocomplete,
    groupedPicker,
    selectedContexts,
    contextHint,
    agentOpen,
    setAgentOpen,
    toggleContext,
    clearContexts,
    submitQuery,
    startNewChat,
    close,
    handleTrace,
    highlightNodes,
    resizeTextarea,
  }
}
