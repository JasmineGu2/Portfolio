'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import Link from 'next/link'
import { ACCENT_ORANGE } from '@/lib/portfolio/brand'
import { SITE_CONTACT } from '@/lib/portfolio/workflow-layers'
import { RESUME_HREF } from '@/lib/portfolio/resume'
import { useCopyToClipboard } from '@/components/interior/copy-button'
import {
  CHAPTERS,
  IMPACT_STATS,
  LOOP_STEPS,
  TERMINAL_EYEBROW,
  TERMINAL_HEADLINE,
  TERMINAL_ORIGIN,
} from '@/lib/portfolio/terminal-stories'
import { TerminalWindow } from './TerminalWindow'
import { ChapterView } from './Chapters'

/**
 * Your experiences told through a terminal. Layout and pacing follow Inspo's "Ferrite" example (a mono
 * headline, a drawn terminal as the hero visual, left-rail section labels, a footnoted stat strip, numbered
 * steps, a changelog, install-style tabs), found through the Inspo MCP along with Tinybird, Linear, E2B, Warp
 * and Raycast. Only the composition is borrowed; the words are this site's own (see `terminal-stories.ts`).
 */

const ACCENT_PHRASE = 'code and empathy'

function CopyChip({ value, label }: { value: string; label: string }) {
  const { copy, status } = useCopyToClipboard({ timeout: 1800 })
  return (
    <button type="button" className="pt-copy" aria-label={label} onClick={() => void copy(value)}>
      {status === 'copied' ? 'copied' : status === 'error' ? 'failed' : 'copy'}
    </button>
  )
}

function RailSection({
  id,
  label,
  title,
  lead,
  children,
}: {
  id: string
  label: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="pt-section">
      <p className="pt-rail">{label}</p>
      <div className="pt-section__body">
        <h2 className="pt-h2">{title}</h2>
        {lead && <p className="pt-lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

const CONTACT_TABS = [
  { id: 'email', label: 'Email', value: SITE_CONTACT.email, command: `mail ${SITE_CONTACT.email}`, href: `mailto:${SITE_CONTACT.email}` },
  { id: 'linkedin', label: 'LinkedIn', value: SITE_CONTACT.linkedin, command: `open ${SITE_CONTACT.linkedin}`, href: SITE_CONTACT.linkedin },
  { id: 'github', label: 'GitHub', value: SITE_CONTACT.github, command: `open ${SITE_CONTACT.github}`, href: SITE_CONTACT.github },
  { id: 'resume', label: 'Résumé', value: RESUME_HREF, command: `open ${RESUME_HREF}`, href: RESUME_HREF },
] as const

function ContactTabs() {
  const [active, setActive] = useState<(typeof CONTACT_TABS)[number]['id']>('email')
  const tab = CONTACT_TABS.find((t) => t.id === active) ?? CONTACT_TABS[0]
  const external = tab.href.startsWith('http') || tab.href.endsWith('.pdf')

  return (
    <div className="pt-tabs">
      <div role="tablist" aria-label="Ways to reach me" className="pt-tabs__list">
        {CONTACT_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`contact-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls="contact-panel"
            className="pt-tab"
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="contact-panel" aria-labelledby={`contact-tab-${tab.id}`} className="pt-cmdbox pt-cmdbox--wide">
        <span className="pt-ps1" aria-hidden>
          $
        </span>
        <a
          className="pt-cmdbox__code"
          href={tab.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {tab.command}
        </a>
        <CopyChip value={tab.value} label={`Copy ${tab.label}`} />
      </div>
    </div>
  )
}

export function TerminalHomepage() {
  const published = CHAPTERS.filter((c) => c.status === 'published').length
  const drafts = CHAPTERS.length - published
  const accentAt = TERMINAL_HEADLINE.indexOf(ACCENT_PHRASE)

  return (
    <div className="proto-terminal font-mono" style={{ '--pt-accent': ACCENT_ORANGE } as CSSProperties}>
      <p className="pt-crumb">
        <Link href="/proto">← proto</Link>
        <span>terminal · composition from Inspo&apos;s Ferrite example and five references</span>
      </p>

      <header className="pt-hero">
        <div className="pt-hero__copy">
          <p className="pt-eyebrow">{TERMINAL_EYEBROW}</p>
          <h1 className="pt-h1">
            {TERMINAL_HEADLINE.slice(0, accentAt)}
            <span className="pt-accent">{ACCENT_PHRASE}</span>
          </h1>
          <p className="pt-lede">
            {TERMINAL_ORIGIN.headline} {TERMINAL_ORIGIN.lead}
          </p>

          <div className="pt-cmdbox">
            <span className="pt-ps1" aria-hidden>
              $
            </span>
            <code className="pt-cmdbox__code">mail {SITE_CONTACT.email}</code>
            <CopyChip value={SITE_CONTACT.email} label="Copy email address" />
          </div>

          <div className="pt-ctas">
            <a href="#stories" className="pt-btn pt-btn--fill">
              Read the stories
            </a>
            <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer" className="pt-btn pt-btn--ghost">
              Résumé
            </a>
          </div>
          <p className="pt-note">
            {CHAPTERS.length} experiences · {published} published case studies · {drafts} drafts
          </p>
        </div>

        <TerminalWindow />
      </header>

      <RailSection
        id="impact"
        label="impact/"
        title="The numbers come from the case studies below."
        lead="Each figure is quoted from the Autodesk or Tesla case study and footnoted to it."
      >
        <ol className="pt-stats">
          {IMPACT_STATS.map((stat, i) => (
            <li key={stat.label} className="pt-stat">
              <p className="pt-stat__value">
                {stat.value}
                <sup>{i + 1}</sup>
              </p>
              <p className="pt-stat__label">{stat.label}</p>
            </li>
          ))}
        </ol>
        <ol className="pt-footnotes">
          {IMPACT_STATS.map((stat, i) => (
            <li key={stat.label}>
              <sup>{i + 1}</sup> {stat.note}
            </li>
          ))}
        </ol>
      </RailSection>

      <RailSection id="how-i-work" label="how-i-work/" title={TERMINAL_ORIGIN.headline} lead={TERMINAL_ORIGIN.lead}>
        <ol className="pt-loop">
          {LOOP_STEPS.map((step, i) => (
            <li key={step}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {step.toLowerCase()}
            </li>
          ))}
        </ol>
      </RailSection>

      <RailSection
        id="stories"
        label="stories/"
        title={`${CHAPTERS.length} experiences, in the order this site lists them.`}
        lead={`${published} are published case studies, re-arranged. The other ${drafts} are drafts reworded from facts already on this site, and stay flagged until they are reviewed.`}
      >
        <div className="pt-chapters">
          {CHAPTERS.map((chapter) => (
            <ChapterView key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </RailSection>

      <RailSection id="changelog" label="changelog/" title="Everything, on one page.">
        <ul className="pt-changelog">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#ch-${chapter.id}`}>
                <span className="pt-changelog__when">{chapter.period}</span>
                <span className="pt-changelog__what">
                  <strong>{chapter.company}</strong> · {chapter.role}
                </span>
                <span className="pt-changelog__tag" data-status={chapter.status}>
                  {chapter.status}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </RailSection>

      <RailSection id="contact" label="contact/" title="One command per way to reach me.">
        <ContactTabs />
      </RailSection>

      <p className="pt-exit">
        <span className="pt-ps1" aria-hidden>
          $
        </span>{' '}
        exit
      </p>
    </div>
  )
}
