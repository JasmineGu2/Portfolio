'use client'

import { cn } from '@/lib/utils'
import {
  WORK_TYPOGRAPHY_SAMPLE,
  type WorkTypographyId,
  type WorkTypographyOption,
} from '@/lib/portfolio/work-typography-options-data'

function typeStyle(
  layer: WorkTypographyOption['company'] | WorkTypographyOption['role'] | WorkTypographyOption['subtitle']
) {
  return {
    fontFamily: layer.fontFamily,
    fontWeight: layer.fontWeight,
    fontStyle: layer.fontStyle ?? 'normal',
    letterSpacing: 'letterSpacing' in layer ? layer.letterSpacing : undefined,
    textTransform: 'textTransform' in layer ? layer.textTransform : undefined,
  } as React.CSSProperties
}

export function WorkTypographyPreview({
  option,
  compact = false,
}: {
  option: WorkTypographyOption
  compact?: boolean
}) {
  return (
    <div className={cn('work-type-opt-card', compact && 'work-type-opt-card--compact')}>
      <p
        className={cn('work-type-opt-company', option.company.className)}
        style={typeStyle(option.company)}
      >
        {WORK_TYPOGRAPHY_SAMPLE.company}
      </p>
      <p className={cn('work-type-opt-role', option.role.className)} style={typeStyle(option.role)}>
        {WORK_TYPOGRAPHY_SAMPLE.role}
      </p>
      <p
        className={cn('work-type-opt-subtitle', option.subtitle.className)}
        style={typeStyle(option.subtitle)}
      >
        {WORK_TYPOGRAPHY_SAMPLE.subtitle}
      </p>
      {!compact && (
        <p className="work-type-opt-period font-bio">{WORK_TYPOGRAPHY_SAMPLE.period}</p>
      )}
    </div>
  )
}

export function WorkTypographyLegend({ option }: { option: WorkTypographyOption }) {
  return (
    <ul className="work-type-opt-legend">
      <li>
        <span className="work-type-opt-legend-label">Company</span>
        <span className="work-type-opt-legend-value">{option.company.fontFamily.split(',')[0]}</span>
      </li>
      <li>
        <span className="work-type-opt-legend-label">Role</span>
        <span className="work-type-opt-legend-value">{option.role.fontFamily.split(',')[0]}</span>
      </li>
      <li>
        <span className="work-type-opt-legend-label">Subtitle</span>
        <span className="work-type-opt-legend-value">{option.subtitle.fontFamily.split(',')[0]}</span>
      </li>
    </ul>
  )
}

export type { WorkTypographyId }
