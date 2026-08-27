import {
  isSpaciousVariant,
  isStoryVariant,
  TESLA_STYLE_PREVIEW,
  TESLA_STYLE_SPACIOUS_PREVIEW,
  TESLA_STYLE_STORY_PREVIEW,
  type TeslaStyleVariantId,
} from '@/lib/portfolio/tesla-style-options-data'

function SpaciousEditorialPreview({ compact = false }: { compact?: boolean }) {
  const content = TESLA_STYLE_SPACIOUS_PREVIEW
  const sections = compact ? content.sections.slice(0, 2) : content.sections

  return (
    <>
      <dl className="tesla-var__meta-grid">
        {content.meta.map((item) => (
          <div key={item.label} className="tesla-var__meta-item">
            <dt className="tesla-var__meta-label">{item.label}</dt>
            <dd className="tesla-var__meta-value">
              {'highlight' in item && item.highlight ? (
                <>
                  <span className="tesla-var__meta-dot" aria-hidden="true" />
                  {item.value}
                </>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      {sections.map((section) => {
        const isImpact = section.label === 'Impact'
        return (
          <section
            key={section.label}
            className={`tesla-var__section${isImpact ? ' tesla-var__section--impact' : ''}`}
          >
            <p className="tesla-var__section-label">{section.label}</p>
            <h3 className="tesla-var__section-headline font-serif-display">{section.headline}</h3>
            {'body' in section && section.body ? (
              <p className="tesla-var__section-body">{section.body}</p>
            ) : null}
            {'bullets' in section && section.bullets ? (
              <ul className="tesla-var__section-bullets">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        )
      })}
    </>
  )
}

function StoryNarrativePreview({ compact = false }: { compact?: boolean }) {
  const beats = compact
    ? TESLA_STYLE_STORY_PREVIEW.beats.filter((_, index) => [0, 1, 3].includes(index))
    : TESLA_STYLE_STORY_PREVIEW.beats

  return (
    <>
      {beats.map((beat) => (
        <section key={beat.chapter} className="tesla-var__story-beat">
          <p className="tesla-var__story-chapter">{beat.chapter}</p>

          {'headline' in beat && beat.headline ? (
            <h3 className="tesla-var__headline font-serif-display">{beat.headline}</h3>
          ) : null}

          {'paragraphs' in beat && beat.paragraphs
            ? beat.paragraphs.map((paragraph) => (
                <p key={paragraph} className="tesla-var__body tesla-var__body--story">
                  {paragraph}
                </p>
              ))
            : null}

          {'lead' in beat && beat.lead ? (
            <p className="tesla-var__body tesla-var__body--story">{beat.lead}</p>
          ) : null}

          {'questionTitle' in beat && beat.questions ? (
            <div className="tesla-var__questions">
              <p className="tesla-var__questions-title">{beat.questionTitle}</p>
              <ol className="tesla-var__question-list">
                {beat.questions.map((question, index) => (
                  <li key={question} className="tesla-var__question-item">
                    <span className="tesla-var__question-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{question}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {'stakeholders' in beat && beat.stakeholders ? (
            <div className="tesla-var__cards">
              {beat.stakeholders.map((card) => (
                <div key={card.title} className="tesla-var__card">
                  <p className="tesla-var__card-title">{card.title}</p>
                  <p className="tesla-var__card-detail">{card.detail}</p>
                </div>
              ))}
            </div>
          ) : null}

          {'quote' in beat && beat.quote ? (
            <blockquote className="tesla-var__quote">{beat.quote}</blockquote>
          ) : null}

          {'outcomes' in beat && beat.outcomes ? (
            <div className="tesla-var__outcomes">
              <ul className="tesla-var__outcomes-list">
                {beat.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ))}
    </>
  )
}

function StandardPreview({ compact = false }: { compact?: boolean }) {
  const content = TESLA_STYLE_PREVIEW

  return (
    <>
      <p className="tesla-var__label">{content.label}</p>
      <h3 className="tesla-var__headline font-serif-display">{content.headline}</h3>

      {content.paragraphs.map((paragraph) => (
        <p key={paragraph} className="tesla-var__body">
          {paragraph.includes('model runs') ? (
            <>
              Factory software operates under very different conditions from consumer onboarding.
              Operators and engineers needed to inspect{' '}
              <span className="tesla-var__em">model runs</span>,{' '}
              <span className="tesla-var__em">camera footage</span>,{' '}
              <span className="tesla-var__em">operational charts</span>, and{' '}
              <span className="tesla-var__em">related metadata</span>-often while diagnosing
              time-sensitive issues.
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}

      <div className="tesla-var__questions">
        <p className="tesla-var__questions-title">{content.questionTitle}</p>
        <ol className="tesla-var__question-list">
          {content.questions.map((question, index) => (
            <li key={question} className="tesla-var__question-item">
              <span className="tesla-var__question-num">{String(index + 1).padStart(2, '0')}</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="tesla-var__cards">
        {content.stakeholders.map((card) => (
          <div key={card.title} className="tesla-var__card">
            <p className="tesla-var__card-title">{card.title}</p>
            <p className="tesla-var__card-detail">{card.detail}</p>
          </div>
        ))}
      </div>

      <blockquote className="tesla-var__quote">{content.quote}</blockquote>

      {!compact && (
        <div className="tesla-var__outcomes">
          <p className="tesla-var__outcomes-label">Impact</p>
          <ul className="tesla-var__outcomes-list">
            {content.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export function TeslaStylePreview({
  variantId,
  compact = false,
}: {
  variantId: TeslaStyleVariantId
  compact?: boolean
}) {
  return (
    <article className={`tesla-var tesla-var--${variantId}${compact ? ' tesla-var--compact' : ''}`}>
      {isStoryVariant(variantId) ? (
        <StoryNarrativePreview compact={compact} />
      ) : isSpaciousVariant(variantId) ? (
        <SpaciousEditorialPreview compact={compact} />
      ) : (
        <StandardPreview compact={compact} />
      )}
    </article>
  )
}
