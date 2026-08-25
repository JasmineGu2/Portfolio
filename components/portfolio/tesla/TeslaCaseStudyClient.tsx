'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  TESLA_CASE_STUDY_SECTIONS,
  TESLA_DESIGN_QUESTIONS,
  TESLA_HERO_META,
  TESLA_INTUIT_QUESTIONS,
  TESLA_OUTCOMES,
  TESLA_OVERVIEW_STATS,
  TESLA_QUALITY_POINTS,
  TESLA_REUSE_WORKFLOW,
  TESLA_STAKEHOLDERS,
  TESLA_VIDEO_CAPABILITIES,
  TESLA_VIDEO_SUBSECTIONS,
  TESLA_WORKFLOW_CARDS,
} from '@/lib/portfolio/tesla-case-study'

function SectionLabel({ children }: { children: string }) {
  return <p className="tesla-cs__label font-analogue">{children}</p>
}

function SectionHeadline({ children }: { children: string }) {
  return <h2 className="tesla-cs__headline font-serif-display">{children}</h2>
}

function Subhead({ children }: { children: string }) {
  return <h3 className="tesla-cs__subhead font-serif-display">{children}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="tesla-cs__body">{children}</p>
}

function KeyInsight({ children }: { children: string }) {
  return (
    <aside className="tesla-cs__key-insight">
      <p className="tesla-cs__key-insight-label">Key insight</p>
      <blockquote className="tesla-cs__quote">{children}</blockquote>
    </aside>
  )
}

function PullQuote({ children }: { children: string }) {
  return <blockquote className="tesla-cs__quote tesla-cs__quote--inline">{children}</blockquote>
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="tesla-cs__bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function QuestionBlock({
  title,
  questions,
}: {
  title: string
  questions: readonly string[]
}) {
  return (
    <div className="tesla-cs__question-block">
      <p className="tesla-cs__question-block-title">{title}</p>
      <ol className="tesla-cs__question-rows">
        {questions.map((question, index) => (
          <li key={question} className="tesla-cs__question-row">
            <span className="tesla-cs__question-num">{String(index + 1).padStart(2, '0')}</span>
            <span>{question}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function TeslaCaseStudyClient() {
  const [activeSection, setActiveSection] = useState(TESLA_CASE_STUDY_SECTIONS[0].id)
  const [readProgress, setReadProgress] = useState(0)

  // The app shell scrolls internally on .bw-main, not the window/document — a plain
  // <a href="#id"> fragment jump is ambiguous about which of those it scrolls, and in
  // practice it was scrolling the wrong one, taking the sticky sidebar off-screen with it.
  // Scrolling the target explicitly finds the real scrollable ancestor correctly.
  function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  useEffect(() => {
    const sectionElements = TESLA_CASE_STUDY_SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter((element): element is HTMLElement => element !== null)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    )

    sectionElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // The app shell scrolls internally on .bw-main rather than the window,
    // so this has to listen there too or the progress bar just freezes.
    const scrollContainer = document.querySelector('.bw-main')

    function updateProgress() {
      const article = document.querySelector('.tesla-cs__main')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const viewportHeight = scrollContainer?.clientHeight ?? window.innerHeight
      const total = article.scrollHeight - viewportHeight
      if (total <= 0) return

      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setReadProgress(Math.round((scrolled / total) * 100))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    scrollContainer?.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      scrollContainer?.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <article className="tesla-cs">
      <div className="tesla-cs__layout">
        <aside className="tesla-cs__sidebar" aria-label="Case study sections">
          <div className="bento-tile bento-tile--editorial-soft tesla-cs__sidebar-tile">
            <Link href="/" className="bw-content-back tesla-cs__back">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to workspace
            </Link>
            <div
              className="tesla-cs__progress"
              role="progressbar"
              aria-valuenow={readProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Reading progress"
            >
              <span className="tesla-cs__progress-bar" style={{ width: `${readProgress}%` }} />
            </div>
            <nav className="tesla-cs__nav">
              {TESLA_CASE_STUDY_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => scrollToSection(event, id)}
                  className={cn('tesla-cs__nav-link', activeSection === id && 'tesla-cs__nav-link--active')}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="tesla-cs__main">
          <Link href="/" className="bw-content-back tesla-cs__back lg:hidden">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to workspace
          </Link>

          <nav className="tesla-cs__mobile-nav" aria-label="Case study sections">
            {TESLA_CASE_STUDY_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => scrollToSection(event, id)}
                className={cn('tesla-cs__mobile-link', activeSection === id && 'tesla-cs__mobile-link--active')}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <header className="tesla-cs__hero">
            <p className="tesla-cs__kicker">{TESLA_HERO_META.kicker}</p>
            <h1 className="tesla-cs__hero-title font-serif-display">{TESLA_HERO_META.title}</h1>

            <div className="tesla-cs__meta-grid tesla-cs__wide">
              <div className="tesla-cs__meta-block">
                <p className="tesla-cs__meta-label font-analogue">Role</p>
                <p className="tesla-cs__meta-value">{TESLA_HERO_META.role}</p>
              </div>
              <div className="tesla-cs__meta-block">
                <p className="tesla-cs__meta-label font-analogue">Timeline</p>
                <p className="tesla-cs__meta-value">{TESLA_HERO_META.timeline}</p>
              </div>
              <div className="tesla-cs__meta-block">
                <p className="tesla-cs__meta-label font-analogue">Team</p>
                <p className="tesla-cs__meta-value">{TESLA_HERO_META.team.join(' · ')}</p>
              </div>
              <div className="tesla-cs__meta-block">
                <p className="tesla-cs__meta-label font-analogue">Skills</p>
                <p className="tesla-cs__meta-value">{TESLA_HERO_META.skills.join(' · ')}</p>
              </div>
            </div>
          </header>

          <section id="overview" className="tesla-cs__section">
            <SectionLabel>Overview</SectionLabel>
            <SectionHeadline>Building internal tools for factory investigation</SectionHeadline>
            <Body>
              I built frontend systems for Tesla&apos;s internal factory software, supporting safety,
              quality, investigation, and live-monitoring workflows across factories in Shanghai,
              Fremont, Austin, and Berlin.
            </Body>
            <Body>
              My work included data-heavy pages, live charts, tables, forms, filters, investigation
              modals, loading states, and a reusable video experience for reviewing sensitive factory
              footage.
            </Body>

            <ul className="tesla-cs__impact-list">
              {TESLA_OVERVIEW_STATS.map((stat) => (
                <li key={stat.value}>{stat.value}</li>
              ))}
            </ul>
          </section>

          <section id="context" className="tesla-cs__section">
            <SectionLabel>Context</SectionLabel>
            <SectionHeadline>Usability changes with the environment.</SectionHeadline>
            <Body>
              Factory software operates under very different conditions from consumer onboarding.
              Operators and engineers needed to inspect{' '}
              <span className="tesla-cs__em">model runs</span>,{' '}
              <span className="tesla-cs__em">camera footage</span>,{' '}
              <span className="tesla-cs__em">operational charts</span>, and{' '}
              <span className="tesla-cs__em">related metadata</span>—often while diagnosing
              time-sensitive issues.
            </Body>
            <Body>
              At{' '}
              <Link href="/projects/intuit" className="tesla-cs__inline-link">
                Intuit
              </Link>
              , I learned to use motion, consistency, and feedback to reduce uncertainty. At Tesla,
              those same principles had to support speed, technical depth, and operational trust.
            </Body>

            <QuestionBlock
              title="Questions we used to evaluate each interaction at Intuit"
              questions={TESLA_INTUIT_QUESTIONS}
            />

            <Body>The product served several stakeholders:</Body>
            <div className="tesla-cs__grid tesla-cs__grid--two tesla-cs__wide">
              {TESLA_STAKEHOLDERS.map((card) => (
                <div key={card.title} className="tesla-cs__card">
                  <p className="tesla-cs__card-title">{card.title}</p>
                  <p className="tesla-cs__card-detail">{card.detail}</p>
                </div>
              ))}
            </div>

            <SectionHeadline>
              Internal software is not exempt from usability. It measures it differently.
            </SectionHeadline>
            <Body>
              The software was already part of the work. The goal was not to persuade someone to return
              or create delight for its own sake.
            </Body>
            <Body>Quality meant:</Body>
            <BulletList items={TESLA_QUALITY_POINTS} />
            <Body>
              At Intuit, a subtle animation could reassure someone that they had completed a step
              correctly.
            </Body>
            <Body>
              At Tesla, preserving a modal&apos;s state during a data refresh could be more important. If a
              video reset, a filter disappeared, or a page remounted unexpectedly, the user might have to
              reconstruct an investigation.
            </Body>
            <KeyInsight>
              At Intuit, usability often meant clarity, confidence, and delight. At Tesla, it meant
              speed, reliability, continuity, and making complex operational data legible.
            </KeyInsight>
          </section>

          <section id="information-design" className="tesla-cs__section">
            <SectionLabel>Information Design</SectionLabel>
            <SectionHeadline>
              The challenge was not showing more data. It was deciding what deserved attention first.
            </SectionHeadline>
            <Body>Factory workflows combined:</Body>

            <div className="tesla-cs__grid tesla-cs__grid--two tesla-cs__wide">
              {TESLA_WORKFLOW_CARDS.map((card) => (
                <div key={card.title} className="tesla-cs__card">
                  <p className="tesla-cs__card-title">{card.title}</p>
                  <p className="tesla-cs__card-detail">{card.detail}</p>
                </div>
              ))}
            </div>

            <Body>Our team did not have a dedicated product designer embedded in the workflow.</Body>
            <Body>
              I was often given business requirements and expected to turn them into complete production
              pages. That meant deciding:
            </Body>

            <QuestionBlock
              title="Questions I used to shape each workflow"
              questions={TESLA_DESIGN_QUESTIONS}
            />

            <Body>
              Tesla&apos;s internal design system gave me established patterns for hierarchy, spacing, forms,
              tables, filters, modals, validation, and loading states.
            </Body>
            <Body>
              Instead of inventing every page from scratch, I could focus on understanding the workflow
              and assembling familiar patterns into something coherent.
            </Body>
            <Body>
              This was also summer 2025, before Claude Code-style interface generation became common. We
              had Copilot, but it could not decide what information mattered or how someone should move
              through an investigation.
            </Body>
            <KeyInsight>
              A strong design system did not replace design thinking. It gave engineers enough structure
              to make good product decisions independently.
            </KeyInsight>
          </section>

          <section id="reusable-systems" className="tesla-cs__section">
            <SectionLabel>Reusable Systems</SectionLabel>
            <SectionHeadline>A frontend can work correctly and still be poorly engineered.</SectionHeadline>
            <Body>A form may submit correctly.</Body>
            <Body>A filter may return the right results.</Body>
            <Body>A modal may open.</Body>
            <Body>
              But if nearly identical functionality already exists elsewhere, rebuilding it creates
              duplicated code, inconsistent behavior, and more maintenance.
            </Body>
            <Body>Many pages followed the same workflow:</Body>

            <p className="tesla-cs__workflow-line">{TESLA_REUSE_WORKFLOW}</p>

            <Body>The first question was often:</Body>
            <PullQuote>Can I reuse this component?</PullQuote>
            <Body>Can I reuse an existing table, input, filter, loader, or modal?</Body>
            <Body>But the more valuable question was:</Body>
            <PullQuote>Can I reuse this entire workflow?</PullQuote>
            <Body>
              Could an existing page structure, interaction sequence, or state model support the new use
              case with different data or business rules?
            </Body>
            <Body>Sometimes the right solution was a shared component.</Body>
            <Body>
              Other times, it was extending an existing investigation page rather than creating another
              version of the same flow.
            </Body>
            <Body>The engineering challenge was finding the right abstraction boundary.</Body>
            <Body>
              Too little abstraction created repeated code. Too much abstraction created generic systems
              that were difficult to understand, test, and change.
            </Body>
            <KeyInsight>
              The goal was not maximum abstraction. It was the smallest reusable structure that removed
              meaningful repetition.
            </KeyInsight>
            <Body>This changed how I thought about frontend usability.</Body>
            <Body>
              A good interface should be usable for the person completing the workflow. A good codebase
              should also be usable for the engineer building the next one.
            </Body>
          </section>

          <section id="video-apis-security" className="tesla-cs__section">
            <SectionLabel>Video, APIs &amp; Security</SectionLabel>
            <SectionHeadline>What looked like a video modal was also an infrastructure problem.</SectionHeadline>
            <Body>
              One reusable experience I owned was a secure video modal for reviewing sensitive factory
              footage and associated model results.
            </Body>
            <Body>
              I built the player and added it to Tesla&apos;s reusable internal system so future workflows
              could use the same foundation for:
            </Body>

            <BulletList items={TESLA_VIDEO_CAPABILITIES} />

            <div className="tesla-cs__subsections tesla-cs__wide">
              {TESLA_VIDEO_SUBSECTIONS.map((block) => (
                <div key={block.title} className="tesla-cs__subsection">
                  <Subhead>{block.title}</Subhead>
                  <p className="tesla-cs__subsection-body">{block.body}</p>
                </div>
              ))}
            </div>

            <KeyInsight>
              The visible interface was only one layer. Its reliability depended on clear boundaries
              between rendering, application state, data fetching, API behavior, performance, and
              security.
            </KeyInsight>
          </section>

          <section id="outcomes" className="tesla-cs__section">
            <SectionLabel>Outcomes</SectionLabel>
            <SectionHeadline>Impact across factory investigation workflows</SectionHeadline>
            <Body>My work:</Body>
            <div className="tesla-cs__outcomes-panel tesla-cs__wide">
              <ul className="tesla-cs__outcomes">
                {TESLA_OUTCOMES.map((item) => (
                  <li key={item} className="tesla-cs__outcome">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="side-quests" className="tesla-cs__section">
            <SectionLabel>Side Quests</SectionLabel>
            <SectionHeadline>From React components to a red Cybertruck.</SectionHeadline>
            <Body>
              On weekends, I volunteered at farmers&apos; markets, conferences, and demo-drive events, where I
              spoke with hundreds of people, generated{' '}
              <span className="tesla-cs__em">400+ qualified leads per week</span>, and helped support{' '}
              <span className="tesla-cs__em">12+ Tesla sales</span>.
            </Body>
            <Body>
              I loved getting to know customers and the San Francisco Bay Area ecosystem—and driving a red
              Cybertruck was a definite highlight.
            </Body>
          </section>
        </div>
      </div>
    </article>
  )
}
