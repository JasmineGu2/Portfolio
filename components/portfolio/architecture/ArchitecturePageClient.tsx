'use client'

import { ExperienceLevelMatrix } from '@/components/portfolio/architecture/ExperienceLevelMatrix'

export function ArchitecturePageClient() {
  return (
    <main className="arch-page portfolio-content">
      <section
        id="arch-experience-matrix"
        className="arch-section arch-section--light arch-section--engine"
      >
        <div className="arch-container arch-container--engine">
          <div className="arch-text-bubble">
            <p className="arch-matrix-lead">
              Each role trained a different layer, from automating tasks to shaping product
              direction.
            </p>
          </div>
          <ExperienceLevelMatrix />
        </div>
      </section>
    </main>
  )
}
