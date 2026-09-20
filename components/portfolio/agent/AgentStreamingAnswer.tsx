'use client'

import { useEffect, useRef, useState } from 'react'
import { play } from 'cuelume'
import { useReducedMotion } from '@/lib/motion'
import { useAgentActionDispatch, referenceToAction } from '@/lib/portfolio/agent/actions'
import type { ResolvedReference } from '@/lib/portfolio/agent/types'

const WORD_MS = 16
const HOLD_MS = 120

/**
 * Word-by-word reveal of a curated (never generated) answer summary, with one
 * inline citation for the top reference once the sentence finishes. Shares
 * `AgentAnswerCard`'s bubble shell so the swap at `onDone` is seamless.
 */
export function AgentStreamingAnswer({
  summary,
  citation,
  onDone,
}: {
  summary: string
  citation?: ResolvedReference
  onDone?: () => void
}) {
  const reducedMotion = useReducedMotion()
  const dispatch = useAgentActionDispatch()
  const tokens = useRef(summary.split(/\s+/).filter(Boolean)).current
  const [count, setCount] = useState(reducedMotion ? tokens.length : 0)
  const [showCitation, setShowCitation] = useState(reducedMotion)
  const done = count >= tokens.length
  const doneRef = useRef(false)

  useEffect(() => {
    if (reducedMotion || done) return
    const t = setTimeout(() => setCount((c) => c + 1), WORD_MS)
    return () => clearTimeout(t)
  }, [count, done, reducedMotion])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setShowCitation(true), reducedMotion ? 0 : HOLD_MS)
    return () => clearTimeout(t)
  }, [done, reducedMotion])

  useEffect(() => {
    if (!showCitation || doneRef.current) return
    doneRef.current = true
    play('success')
    onDone?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCitation])

  return (
    <div className="agent-bubble agent-bubble--assistant agent-streaming">
      <p className="sr-only">{summary}</p>
      <p aria-hidden="true" className="agent-answer__summary agent-streaming__text">
        {tokens.slice(0, count).map((word, i) => (
          <span key={i}>{word} </span>
        ))}
        {!done && !reducedMotion && <span className="agent-streaming__caret" />}
      </p>
      {citation && showCitation && (
        <button
          type="button"
          onClick={() => dispatch(referenceToAction(citation))}
          className="agent-streaming__citation"
          style={reducedMotion ? undefined : { animation: 'pop-in 200ms cubic-bezier(0.23,1,0.32,1) both' }}
          data-cuelume-hover
          data-cuelume-press
        >
          {citation.title}
        </button>
      )}
    </div>
  )
}
