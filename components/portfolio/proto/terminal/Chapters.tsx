'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { Beat, Chapter } from '@/lib/portfolio/terminal-stories'

function BeatView({ beat, n }: { beat: Beat; n: number }) {
  return (
    <section className="pt-beat">
      <h4 className="pt-beat__label">
        <span>{String(n).padStart(2, '0')}</span> {beat.label}
      </h4>
      <div className="pt-beat__body">
        {beat.paragraphs?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        {beat.items && (
          <dl className="pt-items">
            {beat.items.map((item, i) => (
              <div key={i}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        )}
        {beat.bullets && (
          <ul className="pt-bullets">
            {beat.bullets.map((bullet, i) => (
              <li key={i}>
                <span aria-hidden>↳</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/**
 * One experience as a `cat` transcript. Published chapters are the case-study text re-arranged; drafts carry a
 * DRAFT badge, a note, and the fact ids they were reworded from, so every line can be checked.
 */
export function ChapterView({ chapter }: { chapter: Chapter }) {
  const reduceMotion = useReducedMotion()
  const draft = chapter.status === 'draft'

  return (
    <motion.article
      id={`ch-${chapter.id}`}
      className="pt-chapter"
      data-status={chapter.status}
      data-cursor-label={draft ? 'draft' : 'story'}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
    >
      <header className="pt-chapter__head">
        <p className="pt-prompt-line">
          <span className="pt-ps1" aria-hidden>
            $
          </span>{' '}
          cat experience/{chapter.id}/story.md
        </p>
        <h3 className="pt-chapter__title">{chapter.title}</h3>
        <p className="pt-chapter__meta">
          {chapter.company} · {chapter.role} · {chapter.period}
        </p>
        <span className="pt-badge" data-status={chapter.status}>
          {chapter.status}
        </span>
      </header>

      {draft && (
        <p className="pt-draft-note">{'// DRAFT: reworded from facts already on this site, not yet reviewed by Jasmine'}</p>
      )}

      <div className="pt-beats">
        {chapter.beats.map((beat, i) => (
          <BeatView key={i} beat={beat} n={i + 1} />
        ))}
      </div>

      <footer className="pt-chapter__foot">
        <p className="pt-sources">
          sources: {chapter.sources.join(' · ')}
        </p>
        {chapter.ledTo && (
          <p className="pt-next">
            → led to{' '}
            <a href={`#ch-${chapter.ledTo.id}`}>
              {chapter.ledTo.company} ({chapter.ledTo.role})
            </a>
            : {chapter.ledTo.reason}
          </p>
        )}
      </footer>
    </motion.article>
  )
}
