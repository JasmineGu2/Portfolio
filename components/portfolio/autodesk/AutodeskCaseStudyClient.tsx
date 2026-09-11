'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AUTODESK_AUDIENCES,
  AUTODESK_CASE_STUDY_SECTIONS,
  AUTODESK_CHALLENGES,
  AUTODESK_EXPORT_AGAINST,
  AUTODESK_EXPORT_DECISION,
  AUTODESK_EXPORT_FOR,
  AUTODESK_FUTURE_BLOCKS,
  AUTODESK_HERO_META,
  AUTODESK_INVESTMENT_REASONS,
  AUTODESK_OUTCOMES,
  AUTODESK_PLATFORM_PRINCIPLES,
  AUTODESK_PORTAL_COMPONENTS,
  AUTODESK_PROBLEM_REASONS,
  AUTODESK_ROADMAP_PRIORITIES,
  AUTODESK_ROLE_ROWS,
  AUTODESK_VISION_STEPS,
} from '@/lib/portfolio/autodesk-case-study'

function SectionLabel({ children }: { children: string }) {
  return <p className="adsk-cs__label font-analogue">{children}</p>
}

function SectionHeadline({ children }: { children: string }) {
  return <h2 className="adsk-cs__headline font-serif-display">{children}</h2>
}

function Subhead({ children }: { children: string }) {
  return <h3 className="adsk-cs__subhead font-serif-display">{children}</h3>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="adsk-cs__body">{children}</p>
}

function KeyInsight({ children }: { children: string }) {
  return (
    <aside className="adsk-cs__key-insight">
      <p className="adsk-cs__key-insight-label">Key insight</p>
      <blockquote className="adsk-cs__quote">{children}</blockquote>
    </aside>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="adsk-cs__bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function CardGrid({
  cards,
  columns = 'two',
}: {
  cards: readonly { title: string; detail: string }[]
  columns?: 'two' | 'three'
}) {
  return (
    <div className={cn('adsk-cs__grid', `adsk-cs__grid--${columns}`, 'adsk-cs__wide')}>
      {cards.map((card) => (
        <div key={card.title} className="adsk-cs__card">
          <p className="adsk-cs__card-title">{card.title}</p>
          <p className="adsk-cs__card-detail">{card.detail}</p>
        </div>
      ))}
    </div>
  )
}

function Subsections({ blocks }: { blocks: readonly { title: string; body: string }[] }) {
  return (
    <div className="adsk-cs__subsections">
      {blocks.map((block) => (
        <div key={block.title} className="adsk-cs__subsection">
          <Subhead>{block.title}</Subhead>
          <p className="adsk-cs__subsection-body">{block.body}</p>
        </div>
      ))}
    </div>
  )
}

function DefinitionTable({ rows }: { rows: readonly { label: string; detail: string }[] }) {
  return (
    <dl className="adsk-cs__deflist adsk-cs__wide">
      {rows.map((row) => (
        <div key={row.label} className="adsk-cs__defrow">
          <dt className="adsk-cs__defterm font-analogue">{row.label}</dt>
          <dd className="adsk-cs__defdetail">{row.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function SpecList({ rows }: { rows: readonly { label: string; detail: string }[] }) {
  return (
    <dl className="adsk-cs__speclist">
      {rows.map((row) => (
        <div key={row.label} className="adsk-cs__specrow">
          <dt className="adsk-cs__specterm">{row.label}</dt>
          <dd className="adsk-cs__specdetail">{row.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function NumberedBlock({
  title,
  items,
}: {
  title: string
  items: readonly { title: string; detail: string; actions?: readonly string[] }[]
}) {
  return (
    <div className="adsk-cs__numbered-block">
      <p className="adsk-cs__numbered-block-title">{title}</p>
      <ol className="adsk-cs__numbered-rows">
        {items.map((item, index) => (
          <li key={item.title} className="adsk-cs__numbered-row">
            <div className="adsk-cs__numbered-head">
              <span className="adsk-cs__numbered-num">{String(index + 1).padStart(2, '0')}</span>
              <p className="adsk-cs__numbered-title">{item.title}</p>
              <p className="adsk-cs__numbered-detail">{item.detail}</p>
            </div>
            {item.actions && (
              <ul className="adsk-cs__numbered-actions">
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function PrincipleTable({ rows }: { rows: readonly { principle: string; need: string }[] }) {
  return (
    <div className="adsk-cs__principle-table adsk-cs__wide">
      <div className="adsk-cs__principle-row adsk-cs__principle-row--head">
        <span>Platform Principle</span>
        <span>User Need</span>
      </div>
      {rows.map((row) => (
        <div key={row.principle} className="adsk-cs__principle-row">
          <span>{row.principle}</span>
          <span>{row.need}</span>
        </div>
      ))}
    </div>
  )
}

export function AutodeskCaseStudyClient() {
  const [activeSection, setActiveSection] = useState(AUTODESK_CASE_STUDY_SECTIONS[0].id)
  const [readProgress, setReadProgress] = useState(0)

  // The app shell scrolls internally on .bw-main, not the window/document, a plain
  // <a href="#id"> fragment jump is ambiguous about which of those it scrolls, so
  // scrolling the target explicitly is what finds the real scrollable ancestor.
  function scrollToSection(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  useEffect(() => {
    const sectionElements = AUTODESK_CASE_STUDY_SECTIONS.map(({ id }) =>
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
      const article = document.querySelector('.adsk-cs__main')
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
    <article className="adsk-cs">
      <div className="adsk-cs__layout">
        <aside className="adsk-cs__sidebar" aria-label="Case study sections">
          <div className="bento-tile bento-tile--editorial-soft adsk-cs__sidebar-tile">
            <Link href="/" className="bw-content-back adsk-cs__back">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to workspace
            </Link>
            <div
              className="adsk-cs__progress"
              role="progressbar"
              aria-valuenow={readProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Reading progress"
            >
              <span className="adsk-cs__progress-bar" style={{ width: `${readProgress}%` }} />
            </div>
            <nav className="adsk-cs__nav">
              {AUTODESK_CASE_STUDY_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => scrollToSection(event, id)}
                  className={cn('adsk-cs__nav-link', activeSection === id && 'adsk-cs__nav-link--active')}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="adsk-cs__main">
          <nav className="adsk-cs__mobile-nav" aria-label="Case study sections">
            {AUTODESK_CASE_STUDY_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => scrollToSection(event, id)}
                className={cn('adsk-cs__mobile-link', activeSection === id && 'adsk-cs__mobile-link--active')}
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <header className="adsk-cs__hero">
            <p className="adsk-cs__kicker">{AUTODESK_HERO_META.kicker}</p>
            <h1 className="adsk-cs__hero-title font-serif-display">{AUTODESK_HERO_META.title}</h1>

            <div className="adsk-cs__meta-grid adsk-cs__wide">
              <div className="adsk-cs__meta-block">
                <p className="adsk-cs__meta-label font-analogue">Role</p>
                <p className="adsk-cs__meta-value">{AUTODESK_HERO_META.role}</p>
              </div>
              <div className="adsk-cs__meta-block">
                <p className="adsk-cs__meta-label font-analogue">Timeline</p>
                <p className="adsk-cs__meta-value">{AUTODESK_HERO_META.timeline}</p>
              </div>
              <div className="adsk-cs__meta-block">
                <p className="adsk-cs__meta-label font-analogue">Team</p>
                <p className="adsk-cs__meta-value">{AUTODESK_HERO_META.team.join(' · ')}</p>
              </div>
              <div className="adsk-cs__meta-block">
                <p className="adsk-cs__meta-label font-analogue">Skills</p>
                <p className="adsk-cs__meta-value">{AUTODESK_HERO_META.skills.join(' · ')}</p>
              </div>
            </div>
          </header>

          <section id="outcomes" className="adsk-cs__section">
            <SectionLabel>Outcomes</SectionLabel>
            <SectionHeadline>Impact across ADP Studio and Autodesk&apos;s Data Portal</SectionHeadline>
            <div className="adsk-cs__outcomes-panel">
              <ul className="adsk-cs__outcomes">
                {AUTODESK_OUTCOMES.map((item) => (
                  <li key={item} className="adsk-cs__outcome">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="overview" className="adsk-cs__section">
            <SectionLabel>Overview</SectionLabel>
            <SectionHeadline>What is ADP Studio?</SectionHeadline>
            <Body>
              ADP Studio is the SQL and data-exploration layer within Autodesk&apos;s Analytics
              Data Portal, built on Autodesk&apos;s enterprise data lake. It was being built to
              reduce dependency on, and the costs associated with, external SQL tools like{' '}
              <span className="adsk-cs__em">PopSQL</span>, <span className="adsk-cs__em">DBeaver</span>,{' '}
              <span className="adsk-cs__em">Snowflake</span>, and <span className="adsk-cs__em">Hive</span>.
            </Body>
            <Body>
              The broader Data Portal brings together data pipelines, AI/ML infrastructure,
              metadata management, access management, and other data platform capabilities. The
              larger strategy is a more interoperable and governed data ecosystem, connecting how
              data is accessed, governed, and used across AI/ML pipelines and emerging AI
              capabilities.
            </Body>
            <Body>
              I owned product strategy and execution across roadmap planning, query workflows,
              AI-assisted data workflows, rollout strategy, metrics, and stakeholder management.
            </Body>
          </section>

          <section id="data-portal" className="adsk-cs__section">
            <SectionLabel>The Data Portal</SectionLabel>
            <SectionHeadline>What ADP Studio actually sat inside</SectionHeadline>
            <Body>
              Before the rest of this makes sense: my product was one layer of something much larger.
              The Data Portal is Autodesk&apos;s strategy for storing, governing, and processing every
              category of data the business produces, structured and unstructured alike. ADP Studio was
              the SQL and exploration layer inside it, the part people typed into.
            </Body>

            <Subhead>The rest of the Data Portal</Subhead>
            <Body>
              These are the neighbouring systems a query eventually touches. ADP Studio had to
              interoperate with all of them, which is most of what made the boundaries worth knowing.
            </Body>
            <SpecList rows={AUTODESK_PORTAL_COMPONENTS} />

            <Subhead>Why Autodesk was investing here</Subhead>
            <BulletList items={AUTODESK_INVESTMENT_REASONS} />

            <Subhead>Who I was building with</Subhead>
            <CardGrid cards={AUTODESK_AUDIENCES} columns="three" />

            <Body>
              As a platform PM, most decisions were really two decisions: the enterprise-wide,
              one-size-fits-most choice, and the expert or power-user choice a one-size answer usually
              shortchanges. I tried to keep both represented. Some teams needed middle tables to
              stage their work, some needed raw access, and some needed guardrails they would never
              ask for by name.
            </Body>
          </section>

          <section id="the-problem" className="adsk-cs__section">
            <SectionLabel>The Problem</SectionLabel>
            <SectionHeadline>
              ADP Studio had a strategic reason to exist. PopSQL created the urgency.
            </SectionHeadline>
            <Body>
              In April, PopSQL was acquired and announced it would be shutting down, with a planned
              September sunset, and ADP Studio was rushed to be ready for the migration for several
              data teams that exclusively used PopSQL as their query engine.
            </Body>
            <Body>
              The problem was that &ldquo;PopSQL is going away&rdquo; was not enough to make users
              want to actually use ADP Studio, and adoption and user feedback were strikingly low.
            </Body>

            <NumberedBlock title="Why adoption was hard" items={AUTODESK_PROBLEM_REASONS} />
          </section>

          <section id="my-role" className="adsk-cs__section">
            <SectionLabel>My Role</SectionLabel>
            <SectionHeadline>Being the PM representative for ADP Studio</SectionHeadline>
            <Body>
              Sole PM meant autonomy, and autonomy meant a lot of hats. Engineering was in India with
              no in-person overlap. There was no embedded designer, which is normal for an enterprise platform and
              still a gap, so I covered UX myself. And for most of the internship there was no manager
              above me on the product.
            </Body>
            <Body>
              Having worked in corporate environments, startups, leadership roles, and across multiple
              tech teams, I already knew what corporate standards looked like. That made me better
              prepared for the ambiguity of this role than the title suggests.
            </Body>

            <DefinitionTable rows={AUTODESK_ROLE_ROWS} />

            <KeyInsight>
              A lot of ambiguity and a lot of autonomy turned out to be the same condition. I ended up
              the sole representative for this product and the person setting its direction and vision.
              It also meant an enormous amount of onboarding before I could do any of that credibly.
            </KeyInsight>
          </section>

          <section id="roadmap" className="adsk-cs__section">
            <SectionLabel>The Roadmap Question</SectionLabel>
            <SectionHeadline>
              Not &ldquo;how do we recreate PopSQL,&rdquo; but what to prioritize first
            </SectionHeadline>
            <Body>The roadmap competed across:</Body>
            <BulletList items={AUTODESK_ROADMAP_PRIORITIES} />
            <Body>
              Users would not automatically adopt ADP Studio just because PopSQL was going away. I
              had to identify the highest-impact gaps and prioritize them within the timeline and
              engineering resources available.
            </Body>
            <Body>
              ADP Studio served 380+ users across multiple functions, and was intended to be more
              ambitious than PopSQL, serving not only analysts but PMs, engineers, and other
              data-related roles. Even within analyst teams, needs varied: some worked across
              datasets, wrote complex queries, and created intermediate tables, while others cared
              more about dashboarding, charts, and visualizations.
            </Body>
            <Body>
              I inherited 30+ feature requests, bugs, and PopSQL-parity requests, often with limited
              context on the actual user behavior, or even the feature surface.
            </Body>
          </section>

          <section id="platform-pm" className="adsk-cs__section">
            <SectionLabel>Platform Product Management</SectionLabel>
            <SectionHeadline>How do you balance users with platform principles?</SectionHeadline>
            <Body>
              Many features requested by users were constrained by platform-focused principles.
            </Body>
            <PrincipleTable rows={AUTODESK_PLATFORM_PRINCIPLES} />
          </section>

          <section id="exporting" className="adsk-cs__section">
            <SectionLabel>The Exporting Decision</SectionLabel>
            <SectionHeadline>
              When giving users what they want creates a platform problem
            </SectionHeadline>
            <Body>
              Export became one of the largest adoption blockers and one of the most contentious
              platform decisions. Data analysts needed to export data to Excel and other tools
              because ADP Studio could not yet support the volumes and workflows they needed.
            </Body>
            <Body>
              But there was an important difference between PopSQL and ADP Studio. PopSQL primarily
              worked with product data that wasn&apos;t subject to the same sensitivity concerns.
              ADP Studio, however, was built directly on Autodesk&apos;s enterprise data lake, where
              the query engine could reach data that extended beyond product data into sensitive
              financial and user data.
            </Body>
            <Body>
              That meant exporting was no longer just a usability question. Once data left ADP
              Studio, what happened to it? I had to understand why exporting to Excel was necessary,
              what analysts actually did with the exported data, and what the full process and
              storyline of that data leaving the governed environment looked like.
            </Body>
            <Body>
              This became a major area of contention. I conducted industry research and had
              extensive conversations across Security, Legal, Metadata Management, and other teams.
              At different points, I held a different perspective from five different teams
              involved in the decision.
            </Body>

            <Subhead>The tension</Subhead>
            <div className="adsk-cs__tradeoff adsk-cs__wide">
              <div className="adsk-cs__tradeoff-col">
                <p className="adsk-cs__tradeoff-label font-analogue">Allow unrestricted export</p>
                <ul className="adsk-cs__tradeoff-list">
                  {AUTODESK_EXPORT_FOR.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="adsk-cs__tradeoff-col">
                <p className="adsk-cs__tradeoff-label font-analogue">Restrict export</p>
                <ul className="adsk-cs__tradeoff-list">
                  {AUTODESK_EXPORT_AGAINST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Body>
              Users were already taking screenshots and finding other workarounds to bypass
              restrictions. Simply blocking the ideal workflow did not eliminate the underlying
              behavior &mdash; it could push users toward less visible and less governable
              alternatives.
            </Body>

            <Subsections blocks={AUTODESK_EXPORT_DECISION} />
          </section>

          <section id="ai-first" className="adsk-cs__section">
            <SectionLabel>Winning in an AI-First World</SectionLabel>
            <SectionHeadline>My vision for ADP Studio</SectionHeadline>
            <Body>
              While I was solving the immediate adoption problems, I was also asked to step back
              from the roadmap and give a thesis for where ADP Studio should go next. The strategic
              possibilities were broad: should ADP Studio become more powerful for data engineers,
              including Python functionality? Should it move toward being more of a BI tool, making
              data accessible to less technical users? And given the AI capabilities already
              emerging across the Data Portal, what should AI fundamentally change about the
              product?
            </Body>
            <Body>
              One idea from top leadership stuck with me: the future of data products may be no
              more writing SQL. I kept thinking about what I was seeing in practice &mdash; people
              were increasingly using MCPs to talk to Cursor, understand their data, ask questions,
              generate queries, and explore results.
            </Body>
            <Body>
              The important shift wasn&apos;t simply that AI could write SQL. The form of
              interaction itself was changing. Instead of opening a tool, navigating menus, finding
              a table, writing SQL, running it, and moving somewhere else to understand the result,
              people could increasingly describe what they wanted and work conversationally with an
              agent.
            </Body>
            <Body>
              So my thesis for ADP Studio became: don&apos;t just add AI to the SQL workflow. Build
              for the way people will work with data in an AI-first world.
            </Body>
            <Body>
              I envisioned an agentic workspace inspired by Cursor, combining conversational
              interaction with a workspace where users could:
            </Body>
            <p className="adsk-cs__workflow-line">{AUTODESK_VISION_STEPS.join(' → ')}</p>
            <Body>
              The goal was not to hide the underlying data or SQL. It was to create a more
              accessible interaction layer while preserving the ability for technical users to
              understand and work directly with the underlying system.
            </Body>
          </section>

          <section id="avengers" className="adsk-cs__section">
            <SectionLabel>From a Vision to the Avengers Team</SectionLabel>
            <SectionHeadline>From ADP Studio to the broader Data Portal</SectionHeadline>
            <Body>
              I brought the vision to my director, and she loved it. She saw an opportunity to
              extend the idea beyond ADP Studio and reimagine the broader Analytics Data Portal
              experience.
            </Body>
            <Body>
              I was then given an opportunity to lead a hackathon-style &ldquo;Avengers&rdquo;
              team, guided by my direct manager, bringing together 6 engineering teams to bring
              this to life.
            </Body>
          </section>

          <section id="challenges" className="adsk-cs__section">
            <SectionLabel>Challenges</SectionLabel>
            <SectionHeadline>What made this internship hard</SectionHeadline>
            <NumberedBlock title="Four challenges" items={AUTODESK_CHALLENGES} />
          </section>

          <section id="future" className="adsk-cs__section">
            <SectionLabel>What I Learned</SectionLabel>
            <SectionHeadline>What I believe about data products going forward</SectionHeadline>

            <Subsections blocks={AUTODESK_FUTURE_BLOCKS} />

            <KeyInsight>
              Every one of these comes back to the same thing: whether someone can act on your data
              without checking it first. That used to be a nice property. Once an agent is the one
              acting, it is the whole product.
            </KeyInsight>
          </section>

          <section className="adsk-cs__section">
            <Body>
              Before this:{' '}
              <Link href="/work/autodesk-eng" className="adsk-cs__inline-link">
                my first Autodesk internship
              </Link>{' '}
              and{' '}
              <Link href="/tesla" className="adsk-cs__inline-link">
                factory software at Tesla
              </Link>
              .
            </Body>
          </section>

        </div>
      </div>
    </article>
  )
}
