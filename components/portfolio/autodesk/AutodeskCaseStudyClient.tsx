'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AUTODESK_AI_FIRST_BLOCKS,
  AUTODESK_AMBIGUITY_TYPES,
  AUTODESK_AUDIENCES,
  AUTODESK_AVENGERS_BEATS,
  AUTODESK_CASE_STUDY_SECTIONS,
  AUTODESK_EXPORT_AGAINST,
  AUTODESK_EXPORT_DECISION,
  AUTODESK_EXPORT_FOR,
  AUTODESK_FUTURE_BLOCKS,
  AUTODESK_HERO_META,
  AUTODESK_INVESTMENT_REASONS,
  AUTODESK_OUTCOMES,
  AUTODESK_TRANSITION_ROWS,
  AUTODESK_PORTAL_COMPONENTS,
  AUTODESK_ROLE_ROWS,
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

function InlineBeats({ blocks }: { blocks: readonly { title: string; body: string }[] }) {
  return (
    <div className="adsk-cs__inline-beats">
      {blocks.map((block) => (
        <p key={block.title} className="adsk-cs__inline-beat">
          <span className="adsk-cs__inline-beat-title">{block.title}.</span> {block.body}
        </p>
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
            <SectionHeadline>
              Owning product strategy for a governed SQL and data-exploration platform on
              Autodesk&apos;s data lake
            </SectionHeadline>
            <Body>
              ADP Studio was a modern SQL editor. It was the query and exploration interface into
              Autodesk&apos;s Data Portal, the company&apos;s broader strategy for storing, governing,
              and processing every category of data the business produces.
            </Body>
            <Body>
              Autodesk built the lake so all of that data could be harnessed in one place instead of
              team by team. One governed store, with access control, classification, and auditing built
              into how you reach it. That is safer than the same data spread across a dozen tools
              nobody can see into, and more useful, because analysis can finally cross sources that
              never used to meet.
            </Body>
            <Body>
              I owned product strategy and execution for it, positioned against{' '}
              <span className="adsk-cs__em">DBeaver</span>,{' '}
              <span className="adsk-cs__em">Hive</span>, and{' '}
              <span className="adsk-cs__em">direct Snowflake access</span> as the enterprise
              alternative. That covered the roadmap, the redesigned query workflows, and the rollout
              strategy for AI-assisted data work. It also covered the UX for all of it, since the team
              had no embedded designer.
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

          <section id="transition" className="adsk-cs__section">
            <SectionLabel>The Transition</SectionLabel>
            <SectionHeadline>ADP Studio existed because PopSQL was going away.</SectionHeadline>
            <DefinitionTable rows={AUTODESK_TRANSITION_ROWS} />
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

          <section id="ambiguity" className="adsk-cs__section">
            <SectionLabel>Ambiguity</SectionLabel>
            <SectionHeadline>Three types of ambiguity, and what I did about each</SectionHeadline>

            <NumberedBlock title="The three types" items={AUTODESK_AMBIGUITY_TYPES} />
          </section>

          <section id="exporting" className="adsk-cs__section">
            <SectionLabel>The Exporting Decision</SectionLabel>
            <SectionHeadline>
              Should a governed data tool let you take the data out?
            </SectionHeadline>
            <Body>
              Export was the single biggest blocker to adoption, and the obvious fixes both cost
              something real. Here is how the two sides actually stacked up.
            </Body>

            <div className="adsk-cs__tradeoff adsk-cs__wide">
              <div className="adsk-cs__tradeoff-col">
                <p className="adsk-cs__tradeoff-label font-analogue">The case for allowing it</p>
                <ul className="adsk-cs__tradeoff-list">
                  {AUTODESK_EXPORT_FOR.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="adsk-cs__tradeoff-col">
                <p className="adsk-cs__tradeoff-label font-analogue">The case against</p>
                <ul className="adsk-cs__tradeoff-list">
                  {AUTODESK_EXPORT_AGAINST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Subsections blocks={AUTODESK_EXPORT_DECISION} />

            <KeyInsight>
              A platform question that only has two answers is usually the wrong question. Classifying
              the data turned one policy argument into a property of each table, which is the version
              Security, Legal, and analysts could all live with.
            </KeyInsight>
          </section>

          <section id="ai-first" className="adsk-cs__section">
            <SectionLabel>Winning in an AI-First World</SectionLabel>
            <SectionHeadline>
              I hit this problem building in an AI-first world, so I made Spec Mode.
            </SectionHeadline>
            <Body>
              When anyone can generate a working prototype in an afternoon, building stops being the
              constraint and agreement becomes it. That shows up as a very specific failure: a demo
              that looks finished and settles nothing.
            </Body>

            <Subsections blocks={AUTODESK_AI_FIRST_BLOCKS} />

            <KeyInsight>
              Building was never really the hard part, even before AI. It just used to hide how hard it
              was to get everyone aligned. Now that hiding place is gone.
            </KeyInsight>
          </section>

          <section id="avengers" className="adsk-cs__section">
            <SectionLabel>From a Vision to the Avengers Team</SectionLabel>
            <SectionHeadline>
              My vision for ADP Studio turned into Autodesk&apos;s Data Portal strategy.
            </SectionHeadline>

            <InlineBeats blocks={AUTODESK_AVENGERS_BEATS} />

          </section>

          <section id="future" className="adsk-cs__section">
            <SectionLabel>The Future of Product</SectionLabel>
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
