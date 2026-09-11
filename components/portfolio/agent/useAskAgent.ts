'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import { deriveContext, CONTEXT_INTENT_PRIORITY } from '@/lib/portfolio/agent/context'
import { INTENT_QUESTIONS } from '@/lib/portfolio/agent/intents'
import { resolveIntent } from '@/lib/portfolio/agent/retrieval'
import type { AgentIntent, AgentMessage } from '@/lib/portfolio/agent/types'
import { AskAgentContext } from './AskAgentProvider'

const MOBILE_AGENT_MQ = '(max-width: 640px)'

function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function isMobileAgentViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_AGENT_MQ).matches
}

function scrollToTraceSection() {
  document.getElementById('arch-experience-matrix')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function uniq(values: string[]): string[] {
  return [...new Set(values)]
}

function readAsked(messages: AgentMessage[]): AgentIntent[] {
  return messages
    .filter((m): m is Extract<AgentMessage, { role: 'user' }> => m.role === 'user')
    .map((m) => m.intent)
}

function readExplored(messages: AgentMessage[]): string[] {
  return uniq(
    messages.flatMap((m) =>
      m.role === 'assistant'
        ? [m.answer.intent, ...m.answer.references.map((r) => r.id)]
        : [m.intent]
    )
  )
}

export function useAskAgent({ variant = 'sidebar' }: { variant?: 'sidebar' | 'hero' } = {}) {
  const shared = useContext(AskAgentContext)
  const local = useAskAgentState({ variant })
  return shared ?? local
}

export function useAskAgentState({
  variant = 'sidebar',
}: { variant?: 'sidebar' | 'hero' } = {}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const {
    agentOpen,
    setAgentOpen,
    toggleAgent,
    highlightNodes,
    clearHighlights,
    setTraceIds,
    clearTrace,
  } = usePortfolioState()

  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef(pathname)

  const hasMessages = messages.length > 0
  const currentContext = useMemo(() => deriveContext(pathname), [pathname])
  const askedIntents = useMemo(() => readAsked(messages), [messages])
  const exploredIds = useMemo(() => readExplored(messages), [messages])
  const currentIntent = askedIntents.at(-1) ?? null

  const suggestedIntents = useMemo<AgentIntent[]>(() => {
    const last = [...messages].reverse().find((m) => m.role === 'assistant')
    if (last && last.role === 'assistant') return last.answer.followUps
    return CONTEXT_INTENT_PRIORITY[currentContext.page].slice(0, 3)
  }, [messages, currentContext])

  const priorityIntents = CONTEXT_INTENT_PRIORITY[currentContext.page]

  const close = useCallback(() => {
    setAgentOpen(false)
    setCategoriesOpen(false)
  }, [setAgentOpen])

  const askIntent = useCallback(
    (intent: AgentIntent) => {
      setCategoriesOpen(false)
      setMessages((current) => {
        const answer = resolveIntent(intent, currentContext, {
          exploredIds: readExplored(current),
          askedIntents: readAsked(current),
        })
        return [
          ...current,
          { id: newId(), role: 'user', intent, label: INTENT_QUESTIONS[intent] },
          { id: newId(), role: 'assistant', answer },
        ]
      })
    },
    [currentContext]
  )

  // Light the matching tiles / trace path for the newest answer, without
  // navigating away (spec §10). Runs after render so it never updates another
  // component mid-render.
  const lastAnswerId = messages.at(-1)?.id
  useEffect(() => {
    const last = messages.at(-1)
    if (!last || last.role !== 'assistant') return
    const experienceIds = last.answer.references
      .filter((r) => r.type === 'experience')
      .map((r) => r.id)
    if (experienceIds.length > 0) highlightNodes(experienceIds)
    const trace = last.answer.actions.find((a) => a.type === 'trace')
    if (trace && trace.type === 'trace') {
      setTraceIds(trace.nodeIds)
      if (pathname === '/architecture') setTimeout(scrollToTraceSection, 150)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAnswerId])

  const openCategories = useCallback(() => setCategoriesOpen(true), [])
  const closeCategories = useCallback(() => setCategoriesOpen(false), [])

  const startNewChat = useCallback(() => {
    setMessages([])
    setCategoriesOpen(false)
    clearHighlights()
    clearTrace()
  }, [clearHighlights, clearTrace])

  // ── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (categoriesOpen) setCategoriesOpen(false)
        else if (agentOpen) close()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        toggleAgent()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [categoriesOpen, agentOpen, close, toggleAgent])

  useEffect(() => {
    if (!agentOpen) clearHighlights()
  }, [agentOpen, clearHighlights])

  useEffect(() => {
    const prevPath = prevPathRef.current
    if (prevPath === '/architecture' && pathname !== '/architecture') clearTrace()
    if (prevPath !== pathname && agentOpen && isMobileAgentViewport()) close()
    prevPathRef.current = pathname
  }, [pathname, clearTrace, agentOpen, close])

  useEffect(() => {
    if (!agentOpen) return
    const mq = window.matchMedia(MOBILE_AGENT_MQ)
    const sync = () => {
      document.body.style.overflow = mq.matches ? 'hidden' : ''
    }
    sync()
    mq.addEventListener('change', sync)
    return () => {
      mq.removeEventListener('change', sync)
      document.body.style.overflow = ''
    }
  }, [agentOpen])

  useEffect(() => {
    if (searchParams.get('ask') !== 'open') return
    setAgentOpen(true)
    router.replace(pathname, { scroll: false })
  }, [pathname, router, searchParams, setAgentOpen])

  useEffect(() => {
    const thread = threadRef.current
    if (!thread) return
    // Put the newest question at the top so its answer reads top-down, rather
    // than scrolling to the bottom and hiding the summary.
    const items = thread.querySelectorAll('.agent-messages > li')
    const lastQuestion = [...items].reverse().find((li) => li.querySelector('.agent-user-question'))
    const target = lastQuestion ?? items[items.length - 1]
    if (target instanceof HTMLElement) {
      thread.scrollTo({ top: target.offsetTop - 8, behavior: 'smooth' })
    }
  }, [messages])

  return {
    variant,
    pathname,
    messages,
    hasMessages,
    threadRef,
    currentContext,
    currentIntent,
    exploredIds,
    suggestedIntents,
    priorityIntents,
    categoriesOpen,
    agentOpen,
    setAgentOpen,
    toggleAgent,
    askIntent,
    openCategories,
    closeCategories,
    startNewChat,
    close,
  }
}
