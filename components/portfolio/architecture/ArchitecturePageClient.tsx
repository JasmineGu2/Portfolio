'use client'

import { ExperienceLevelMatrix } from '@/components/portfolio/architecture/ExperienceLevelMatrix'
import { AboutIntro } from '@/components/portfolio/architecture/AboutIntro'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import TerminalCard from '@/components/lightswind/terminal-card'
import { SIDE_PROJECT_SHOWCASE } from '@/lib/portfolio/showcase-data'

const TERMINAL_COMMAND = `whoami
> Jasmine Gu, Product Manager & Engineer

cat expertise.txt
> Product · Systems · AI/ML · Data · Research

location --current
> Toronto, ON`

export function ArchitecturePageClient() {
  return (
    <main className="arch-page portfolio-content">
      <section id="arch-about" className="arch-section arch-section--light">
        <div className="arch-container arch-container--narrow">
          <AboutIntro />
        </div>
      </section>

      <section id="arch-terminal" className="arch-section arch-section--light">
        <div className="arch-container">
          <TerminalCard command={TERMINAL_COMMAND} className="max-w-md" />
        </div>
      </section>

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

      <section id="arch-side-projects" className="arch-section arch-section--light">
        <div className="arch-container">
          <h2 className="font-serif text-[21px] font-medium leading-6 text-[var(--pf-ink)]">
            Side projects
          </h2>
          <div className="mt-6">
            <ProjectGrid items={SIDE_PROJECT_SHOWCASE} />
          </div>
        </div>
      </section>
    </main>
  )
}
