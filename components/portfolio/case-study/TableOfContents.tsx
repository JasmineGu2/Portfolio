'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import styles from './case-study.module.css'

export interface TocItem {
  id: string
  label: string
}

/** A heading counts as "being read" once its top passes this share of the viewport. */
const READ_LINE = 0.3

/**
 * The case study's section list. On wide screens it is a sticky list beside the article; below 900px it is an
 * "On this page" disclosure above it. Both share one IntersectionObserver: whenever a heading crosses the read line,
 * the active item becomes the last heading above that line (or the last section once the page is scrolled to the end).
 * Clicking an item scrolls to its heading (instantly under prefers-reduced-motion), updates the URL hash, and moves
 * focus to the heading so keyboard and screen-reader users land there too.
 */
export function TableOfContents({
  items,
  label,
  ariaLabel,
}: {
  items: TocItem[]
  label: string
  ariaLabel: string
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const lockRef = useRef<string | null>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const compute = useCallback(() => {
    if (lockRef.current) return
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return
    const doc = document.documentElement
    const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= doc.scrollHeight - 2
    if (atEnd) {
      setActiveId(headings[headings.length - 1].id)
      return
    }
    const line = window.innerHeight * READ_LINE
    let current = headings[0].id
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= line) current = heading.id
    }
    setActiveId(current)
  }, [items])

  useEffect(() => {
    // The observed zone is everything above the read line (the huge top margin), so a heading flips state exactly
    // when it crosses the line, even on a big jump like Home/End or a hash link.
    const headings = new IntersectionObserver(compute, {
      rootMargin: `100000px 0px -${100 - READ_LINE * 100}% 0px`,
    })
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) headings.observe(el)
    }
    // A marker at the very bottom of the page: once it is on screen, the last section is the one being read.
    const end = new IntersectionObserver(compute)
    const marker = document.querySelector('[data-case-study-end]')
    if (marker) end.observe(marker)
    compute()
    return () => {
      headings.disconnect()
      end.disconnect()
    }
  }, [items, compute])

  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Hold the clicked item while the page scrolls, so the list doesn't flicker through the sections in between.
    lockRef.current = id
    setActiveId(id)
    const release = () => {
      lockRef.current = null
      window.removeEventListener('scrollend', release)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', release)
      window.removeEventListener('keydown', release)
    }
    window.addEventListener('scrollend', release, { once: true })
    window.addEventListener('wheel', release, { once: true, passive: true })
    window.addEventListener('touchstart', release, { once: true, passive: true })
    window.addEventListener('keydown', release, { once: true })
    window.setTimeout(release, reduced ? 100 : 1500)

    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    target.focus({ preventScroll: true })
    if (detailsRef.current) detailsRef.current.open = false
  }

  const list = (
    <ul className={styles.tocList}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={styles.tocLink}
            aria-current={item.id === activeId ? 'true' : undefined}
            onClick={(event) => onClick(event, item.id)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )

  const activeLabel = items.find((item) => item.id === activeId)?.label

  return (
    <>
      <nav className={styles.sideNav} aria-label={ariaLabel}>
        {list}
      </nav>
      <details ref={detailsRef} className={styles.disclosure}>
        <summary className={styles.summary}>
          <span>{label}</span>
          {activeLabel && <span className={styles.current}>{activeLabel}</span>}
        </summary>
        <nav aria-label={ariaLabel}>{list}</nav>
      </details>
    </>
  )
}
