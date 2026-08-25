'use client'

export function AnimatedQuestionPlaceholder({
  text,
  showCursor,
}: {
  text: string
  showCursor: boolean
}) {
  return (
    <div className="agent-composer-card__typewriter" aria-hidden="true">
      <span className="agent-composer-card__typewriter-text">{text}</span>
      {showCursor && <span className="agent-composer-card__typewriter-cursor" aria-hidden />}
    </div>
  )
}
