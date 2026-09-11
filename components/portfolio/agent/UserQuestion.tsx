'use client'

/** Echoes the picked question in the thread — a quiet line, not a chat bubble (spec §19). */
export function UserQuestion({ label }: { label: string }) {
  return (
    <p className="agent-user-question">
      <span className="agent-user-question__marker font-analogue" aria-hidden>
        You asked
      </span>
      {label}
    </p>
  )
}
