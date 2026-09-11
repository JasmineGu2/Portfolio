'use client'

/** Brief "thinking" beat shown before an answer bubble appears. */
export function TypingIndicator() {
  return (
    <div className="agent-bubble agent-bubble--assistant agent-typing" role="status" aria-label="Thinking">
      <span className="agent-typing__dot" />
      <span className="agent-typing__dot" />
      <span className="agent-typing__dot" />
    </div>
  )
}
