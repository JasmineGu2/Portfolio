import { ArrowLeft } from 'lucide-react'
import type { CaseStudy, CaseStudyBlock, CaseStudyMedia } from '@/lib/portfolio/case-studies'
import { CASE_STUDY_LABELS } from '@/lib/portfolio/case-studies'
import { TableOfContents } from './TableOfContents'
import styles from './case-study.module.css'

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className={styles.paragraph}>{block.text}</p>
    case 'emphasis':
      return <p className={styles.emphasis}>{block.text}</p>
    case 'subhead':
      return <h3 className={styles.subhead}>{block.text}</h3>
    case 'tags':
      return (
        <ul className={styles.tags}>
          {block.items.map((item) => (
            <li key={item} className={styles.tag}>
              {item}
            </li>
          ))}
        </ul>
      )
  }
}

function HeroMedia({ media }: { media: CaseStudyMedia }) {
  const fit = media.fit === 'cover' ? styles.cover : styles.contain
  return (
    <figure className={styles.figure} style={{ aspectRatio: media.aspect }}>
      {media.kind === 'video' ? (
        <video
          className={`${styles.media} ${fit}`}
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={`${styles.media} ${fit}`} src={media.src} alt={media.alt} />
      )}
    </figure>
  )
}

/** A centred long-form case study: back link, header, hero media, sections, and the section list beside it. */
export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const tocItems = study.sections.map((section) => ({ id: section.id, label: section.tocLabel ?? section.heading }))
  const meta = study.meta.join(' · ')
  const hasWriteUp = study.sections.length > 0

  return (
    <div className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.topRow}>
          {/* a plain link on purpose: home's hero and tiles are built by scripts that only run on a full page load */}
          <a href={CASE_STUDY_LABELS.backHref} className={styles.back}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {CASE_STUDY_LABELS.back}
          </a>
        </div>

        {hasWriteUp && (
          <aside className={styles.aside}>
            <TableOfContents items={tocItems} label={CASE_STUDY_LABELS.onThisPage} ariaLabel={CASE_STUDY_LABELS.tocAria} />
          </aside>
        )}

        <article className={styles.article}>
          <header>
            {study.eyebrow && <p className={styles.eyebrow}>{study.eyebrow}</p>}
            <h1 className={styles.title}>{study.title}</h1>
            {study.dek && <p className={styles.dek}>{study.dek}</p>}
            {meta && <p className={styles.meta}>{meta}</p>}
          </header>

          {study.heroMedia && <HeroMedia media={study.heroMedia} />}

          {study.tags && study.tags.length > 0 && (
            <div className={styles.tagRow} aria-label={CASE_STUDY_LABELS.tagsAria} role="group">
              <Block block={{ type: 'tags', items: study.tags }} />
            </div>
          )}

          {!hasWriteUp && <p className={styles.comingSoon}>{CASE_STUDY_LABELS.comingSoon}</p>}

          <div className={styles.body}>
            {study.sections.map((section) => (
              <section key={section.id} className={styles.section} aria-labelledby={section.id}>
                <h2 id={section.id} className={styles.heading} tabIndex={-1}>
                  {section.heading}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
      <div data-case-study-end aria-hidden style={{ height: 1 }} />
    </div>
  )
}
