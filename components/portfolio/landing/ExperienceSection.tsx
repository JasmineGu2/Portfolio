'use client'

import { useCallback, useRef } from 'react'
import {
  LANDING_EXPERIENCE_EDGES,
  LANDING_EXPERIENCES,
} from '@/lib/portfolio/landing-data'
import { WorkflowConnectors } from '@/components/portfolio/WorkflowConnectors'
import { SectionLabel } from './SectionLabel'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const setCellRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) cellRefs.current.set(id, el)
      else cellRefs.current.delete(id)
    },
    []
  )

  return (
    <section className="landing-experience" aria-labelledby="landing-experience-heading">
      <SectionLabel id="landing-experience-heading" className="landing-experience__heading">
        Experience Workflow
      </SectionLabel>

      <div ref={wrapRef} className="landing-experience__grid-wrap">
        <WorkflowConnectors
          wrapRef={wrapRef}
          cellRefs={cellRefs}
          edges={[...LANDING_EXPERIENCE_EDGES]}
          className="landing-connectors"
        />

        <div className="landing-experience__grid">
          {LANDING_EXPERIENCES.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              cellRef={setCellRef(experience.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
