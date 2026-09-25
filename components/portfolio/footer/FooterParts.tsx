'use client'

import { useEffect, useState } from 'react'

/** Local time in her city, updated live. */
export function LocalClock({ timeZone }: { timeZone: string }) {
  const [text, setText] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    const tick = () => setText(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [timeZone])

  return <time suppressHydrationWarning>{text || ' '}</time>
}

/** Weather as one of the footer facts: "Site conditions / 12°C, clear". Fetched from our own /api/weather. */
export function SiteConditions() {
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    let dead = false
    fetch('/api/weather')
      .then((r) => r.json())
      .then((j) => {
        if (!dead && typeof j?.note === 'string') setNote(j.note)
      })
      .catch(() => {})
    return () => {
      dead = true
    }
  }, [])

  if (!note) return <div aria-hidden />
  const [temp, ...sky] = note.replace(/^site conditions:\s*/i, '').split(', ')
  const reading = [temp, ...sky.map((s) => s.toLowerCase())].join(', ')
  return (
    <div>
      <small>Site conditions</small>
      {reading}
    </div>
  )
}

/** "Last revised": the date of the newest git commit, baked in at build time by next.config.js. */
export function LastRevised() {
  const iso = process.env.NEXT_PUBLIC_LAST_REVISED
  if (!iso) return <span>{' '}</span>
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return <span>{' '}</span>
  return (
    <time dateTime={iso}>
      {date.toLocaleDateString('en-US', {
        timeZone: 'America/Toronto',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </time>
  )
}

export function BackToTop() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
      }}
    >
      Back to top
    </a>
  )
}
