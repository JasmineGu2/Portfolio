'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SchemeTag } from '@/components/portfolio/bento-workflows/SchemeTag'
import { useBentoWorkspace } from '@/components/portfolio/bento-workflows/BentoWorkspaceContext'
import { getSchemePaletteColor } from '@/lib/portfolio/bento-workflows/work-accents'
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
  return <p className="bento-eyebrow bw-card-label tesla-cs__label">{children}</p>
}

function SectionHeadline({ children }: { children: string }) {
  return <h2 className="hero-editorial-headline font-serif-display tesla-cs__headline">{children}</h2>
}

function Subhead({ children }: { children: string }) {
  return <h3 className="bento-label tesla-cs__subhead">{children}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="hero-editorial-sub tesla-cs__body">{children}</p>
}

function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="bento-tile bento-tile--editorial-soft tesla-cs__quote">{children}</blockquote>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="tesla-cs__bullets">
      {items.map((item) => (
        <li key={item} className="tesla-cs__bullet">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function TeslaCaseStudyClient() {
  const { colorScheme } = useBentoWorkspace()
  const [activeSection, setActiveSection] = useState(TESLA_CASE_STUDY_SECTIONS[0].id)

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

  return (
    <article className="tesla-cs">
      <div className="tesla-cs__layout bw-content-panel">
        <aside className="tesla-cs__sidebar" aria-label="Case study sections">
          <div className="bento-tile bento-tile--editorial-soft hero-bento-block tesla-cs__sidebar-tile">
            <Link href="/" className="bw-content-back tesla-cs__back">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to workspace
            </Link>
            <nav className="tesla-cs__nav">
              {TESLA_CASE_STUDY_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
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
                className={cn(
                  'tesla-cs__mobile-link pf-keycap-tag pf-pill--soft pf-pill--sky',
                  activeSection === id && 'tesla-cs__mobile-link--active'
                )}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <header className="tesla-cs__hero bento-tile bento-tile--editorial hero-bento-block">
            <p className="bento-eyebrow bw-card-label tesla-cs__kicker">{TESLA_HERO_META.kicker}</p>
            <h1 className="hero-editorial-headline font-serif-display tesla-cs__hero-title">
              {TESLA_HERO_META.title}
            </h1>

            <div className="tesla-cs__meta-grid">
              <div className="bento-tile bento-tile--editorial-soft tesla-cs__meta-block">
                <p className="bw-card-label tesla-cs__meta-label">Role</p>
                <p className="bento-caption tesla-cs__meta-value">{TESLA_HERO_META.role}</p>
              </div>
              <div className="bento-tile bento-tile--editorial-soft tesla-cs__meta-block">
                <p className="bw-card-label tesla-cs__meta-label">Timeline</p>
                <p className="bento-caption tesla-cs__meta-value">{TESLA_HERO_META.timeline}</p>
              </div>
              <div className="bento-tile bento-tile--editorial-soft tesla-cs__meta-block">
                <p className="bw-card-label tesla-cs__meta-label">Team</p>
                <ul className="tesla-cs__meta-list">
                  {TESLA_HERO_META.team.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </div>
              <div className="bento-tile bento-tile--editorial-soft tesla-cs__meta-block">
                <p className="bw-card-label tesla-cs__meta-label">Skills</p>
                <div className="bw-tag-grid tesla-cs__meta-tags">
                  {TESLA_HERO_META.skills.map((skill, index) => (
                    <SchemeTag
                      key={skill}
                      label={skill}
                      color={getSchemePaletteColor(colorScheme, index + 1)}
                      size="sm"
                      variant="supporting"
                    />
                  ))}
                </div>
              </div>
            </div>
          </header>

          <section
            id="overview"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
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

            <Subhead>Impact</Subhead>
            <div className="tesla-cs__stats tesla-cs__stats--four">
              {TESLA_OVERVIEW_STATS.map((stat) => (
                <div key={stat.value} className="bento-tile bento-tile--editorial-soft tesla-cs__stat">
                  <span className="tesla-cs__stat-value">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            id="context"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
            <SectionLabel>Context</SectionLabel>
            <SectionHeadline>Usability changes with the environment.</SectionHeadline>
            <Body>
              Before Tesla, I worked on onboarding experiences at{' '}
              <Link href="/projects/intuit" className="tesla-cs__inline-link">
                Intuit
              </Link>
              .
            </Body>
            <Body>
              At Intuit, frontend quality was closely tied to the customer journey. Motion communicated
              progress. Consistent interactions reduced uncertainty. Small moments of delight made a
              stressful product feel more approachable.
            </Body>
            <Body>We thought about questions like:</Body>
            <BulletList items={TESLA_INTUIT_QUESTIONS} />

            <Body>Tesla required a different definition of a good interface.</Body>
            <Body>
              I worked on factory software used to inspect{' '}
              <strong className="hero-em hero-em--blue">
                machine-learning model runs, video and camera footage, operational charts, and supporting
                metadata
              </strong>
              .
            </Body>
            <Body>The product served several stakeholders:</Body>

            <div className="tesla-cs__grid tesla-cs__grid--two">
              {TESLA_STAKEHOLDERS.map((card) => (
                <div key={card.title} className="bento-tile bento-tile--editorial-soft tesla-cs__card">
                  <p className="bento-label tesla-cs__card-title">{card.title}</p>
                  <p className="bento-caption tesla-cs__card-detail">{card.detail}</p>
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
            <PullQuote>
              At Intuit, usability often meant clarity, confidence, and delight. At Tesla, it meant
              speed, reliability, continuity, and making complex operational data legible.
            </PullQuote>
          </section>

          <section
            id="information-design"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
            <SectionLabel>Information Design</SectionLabel>
            <SectionHeadline>
              The challenge was not showing more data. It was deciding what deserved attention first.
            </SectionHeadline>
            <Body>Factory workflows combined:</Body>

            <div className="tesla-cs__grid tesla-cs__grid--two">
              {TESLA_WORKFLOW_CARDS.map((card) => (
                <div key={card.title} className="bento-tile bento-tile--editorial-soft tesla-cs__card">
                  <p className="bento-label tesla-cs__card-title">{card.title}</p>
                  <p className="bento-caption tesla-cs__card-detail">{card.detail}</p>
                </div>
              ))}
            </div>

            <Body>
              Our team did not have a dedicated product designer embedded in the workflow.
            </Body>
            <Body>
              I was often given business requirements and expected to turn them into complete production
              pages. That meant deciding:
            </Body>

            <div className="bento-tile bento-tile--accent tesla-cs__questions">
              {TESLA_DESIGN_QUESTIONS.map((question) => (
                <p key={question} className="tesla-cs__question">
                  {question}
                </p>
              ))}
            </div>

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
            <PullQuote>
              A strong design system did not replace design thinking. It gave engineers enough structure
              to make good product decisions independently.
            </PullQuote>
          </section>

          <section
            id="reusable-systems"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
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

            <p className="bento-tile bento-tile--editorial-soft tesla-cs__workflow-line">
              {TESLA_REUSE_WORKFLOW}
            </p>

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
            <PullQuote>
              The goal was not maximum abstraction. It was the smallest reusable structure that removed
              meaningful repetition.
            </PullQuote>
            <Body>This changed how I thought about frontend usability.</Body>
            <Body>
              A good interface should be usable for the person completing the workflow. A good codebase
              should also be usable for the engineer building the next one.
            </Body>
          </section>

          <section
            id="video-apis-security"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
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

            <ul className="tesla-cs__list">
              {TESLA_VIDEO_CAPABILITIES.map((item, index) => (
                <li key={item} className="tesla-cs__list-item">
                  <SchemeTag
                    label={item}
                    color={getSchemePaletteColor(colorScheme, index + 2)}
                    size="sm"
                    variant="supporting"
                    className="tesla-cs__list-tag"
                  />
                </li>
              ))}
            </ul>

            <div className="tesla-cs__subsections">
              {TESLA_VIDEO_SUBSECTIONS.map((block) => (
                <div key={block.title} className="bento-tile bento-tile--editorial-soft tesla-cs__subsection">
                  <Subhead>{block.title}</Subhead>
                  <p className="bento-caption tesla-cs__subsection-body">{block.body}</p>
                </div>
              ))}
            </div>

            <PullQuote>
              The visible interface was only one layer. Its reliability depended on clear boundaries
              between rendering, application state, data fetching, API behavior, performance, and
              security.
            </PullQuote>
          </section>

          <section
            id="outcomes"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
            <SectionLabel>Outcomes</SectionLabel>
            <SectionHeadline>Impact across factory investigation workflows</SectionHeadline>
            <Body>My work:</Body>
            <ul className="tesla-cs__outcomes">
              {TESLA_OUTCOMES.map((item) => (
                <li key={item} className="tesla-cs__outcome">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="side-quests"
            className="tesla-cs__section bento-tile bento-tile--editorial hero-bento-block"
          >
            <SectionLabel>Side Quests</SectionLabel>
            <SectionHeadline>From React components to a red Cybertruck.</SectionHeadline>
            <Body>
              On weekends, I volunteered at farmers&apos; markets, conferences, and demo-drive events, where I
              spoke with hundreds of people, generated{' '}
              <strong className="hero-em hero-em--blue">400+ qualified leads per week</strong>, and helped
              support <strong className="hero-em hero-em--blue">12+ Tesla sales</strong>.
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
