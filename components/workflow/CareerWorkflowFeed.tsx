'use client'

import type { StoryStep } from '@/lib/workflow/story-narrative'

function StepLogo({ step }: { step: StoryStep }) {
  if (step.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={step.logo}
        alt=""
        className={`object-contain shrink-0 ${
          step.logo.includes('autodesk-icon') ? 'w-10 h-10' : 'w-10 h-10 rounded bg-white p-1'
        }`}
      />
    )
  }
  return (
    <div className="w-10 h-10 rounded bg-n8n-panel border border-n8n-border flex items-center justify-center text-lg font-bold text-n8n-muted shrink-0">
      {step.id === 'laurelspace' ? '?' : step.company.slice(0, 1)}
    </div>
  )
}

interface CareerWorkflowFeedProps {
  steps: StoryStep[]
}

/** Newest first — Jenny Wen–style feed with n8n node cards */
export function CareerWorkflowFeed({ steps }: CareerWorkflowFeedProps) {
  const ordered = [...steps].reverse()

  return (
    <section id="workflow" className="scroll-mt-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-n8n-dim mb-10">
        Workflow
      </h2>

      <div className="space-y-0">
        {ordered.map((step, i) => (
          <article
            key={step.id}
            id={`step-${step.id}`}
            className="scroll-mt-24 group"
          >
            {/* Date + headline — simple like Jenny Wen */}
            <p className="text-base text-n8n-muted mb-2">{step.period}</p>
            <h3 className="text-[15px] md:text-base leading-snug mb-1">
              <a
                href={`#step-${step.id}`}
                className="font-semibold underline decoration-n8n-border hover:decoration-n8n-accent transition-colors"
                style={{ color: step.accent }}
              >
                {step.company}
              </a>
              <span className="text-n8n-muted font-normal">
                {' '}
                — {step.role}. {step.tag}
              </span>
            </h3>

            {/* n8n node on canvas */}
            <div className="mt-5 mb-2 rounded-xl border border-n8n-border canvas-grid-n8n overflow-hidden">
              <div className="px-4 py-3 border-b border-n8n-border bg-n8n-toolbar/80 flex items-center justify-between">
                <span className="font-mono text-[10px] text-n8n-dim uppercase tracking-wide">
                  {i === 0 ? 'Trigger' : 'Execute'} · Node {ordered.length - i}
                </span>
                {step.outcome && (
                  <span className="font-mono text-[10px] text-n8n-accent">
                    → {step.outcome}
                  </span>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start gap-4 max-w-lg">
                  {/* input port */}
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-n8n-port bg-n8n-canvas mt-5 shrink-0" />

                  <div
                    className="flex-1 rounded-lg border-2 bg-n8n-node p-4 shadow-lg"
                    style={{ borderColor: `${step.accent}66` }}
                  >
                    <div className="flex items-center gap-3">
                      <StepLogo step={step} />
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-n8n-dim mb-0.5">
                          {step.tag.split('·')[0]?.trim() ?? 'Experience'}
                        </p>
                        <p className="font-semibold text-n8n-text">{step.company}</p>
                        <p className="text-sm text-n8n-muted">{step.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-n8n-muted mt-3 leading-relaxed">
                      {step.story}
                    </p>
                    {step.links && (
                      <div className="flex gap-3 mt-3">
                        {step.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="text-xs font-medium text-n8n-accent hover:underline"
                          >
                            {l.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* output port */}
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-n8n-port bg-n8n-canvas mt-5 shrink-0" />
                </div>
              </div>
            </div>

            {/* connector to next step */}
            {i < ordered.length - 1 && (
              <div className="flex justify-center py-4" aria-hidden>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-8 bg-n8n-border" />
                  <div
                    className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent"
                    style={{ borderTopColor: ordered[i + 1].accent }}
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
