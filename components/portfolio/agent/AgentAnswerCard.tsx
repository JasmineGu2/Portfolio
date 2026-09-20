'use client'

import type { AgentIntent, ResolvedAnswer } from '@/lib/portfolio/agent/types'
import { ReferenceCard } from './ReferenceCard'
import { WritingPreview } from './WritingPreview'
import { FollowUpChips } from './FollowUpChips'
import { ContextActions } from './ContextActions'

/**
 * One answer, rendered as the four layers of spec §7:
 *   1. Answer — a plain paragraph, no chat bubble, no avatar
 *   2. Related work — rich reference cards, each with its reason
 *   3. Read / Explore next — a writing preview or another portfolio piece
 *   4. Keep exploring — up to three follow-up questions
 * Plus inline navigation, and a no-dead-end footer when every lead is exhausted (spec §18).
 */
export function AgentAnswerCard({
  answer,
  onFollowUp,
  onExploreMore,
}: {
  answer: ResolvedAnswer
  onFollowUp: (intent: AgentIntent) => void
  onExploreMore: () => void
}) {
  return (
    <div className="agent-answer">
      <div className="agent-bubble agent-bubble--assistant">
        <p className="agent-answer__summary">{answer.summary}</p>
      </div>

      {answer.references.length > 0 && (
        <div className="agent-answer__section">
          <p className="agent-answer__section-label font-analogue">Related work</p>
          <div className="agent-answer__cards">
            {answer.references.map((reference) => (
              <ReferenceCard key={`${reference.type}-${reference.id}`} reference={reference} />
            ))}
          </div>
        </div>
      )}

      {answer.readNext.length > 0 && (
        <div className="agent-answer__section">
          <p className="agent-answer__section-label font-analogue">Read / explore next</p>
          <div className="agent-answer__cards">
            {answer.readNext.map((reference) =>
              reference.type === 'writing' ? (
                <WritingPreview key={`w-${reference.id}`} reference={reference} />
              ) : (
                <ReferenceCard key={`${reference.type}-${reference.id}`} reference={reference} />
              )
            )}
          </div>
        </div>
      )}

      {answer.actions.length > 0 && <ContextActions actions={answer.actions} />}

      <FollowUpChips intents={answer.followUps} onPick={onFollowUp} />

      {answer.deadEnd && (
        <div className="agent-deadend">
          <p className="agent-deadend__note">
            That&rsquo;s most of what the portfolio has on this.
          </p>
          <button
            type="button"
            className="agent-deadend__option"
            onClick={onExploreMore}
            data-cuelume-hover
            data-cuelume-press
          >
            Try another question
          </button>
        </div>
      )}
    </div>
  )
}
