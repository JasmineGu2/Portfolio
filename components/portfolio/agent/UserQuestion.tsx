'use client'

/** Echoes the picked question in the thread, as a right-aligned chat bubble. */
export function UserQuestion({ label }: { label: string }) {
  return (
    <p className="agent-bubble agent-bubble--user">{label}</p>
  )
}
