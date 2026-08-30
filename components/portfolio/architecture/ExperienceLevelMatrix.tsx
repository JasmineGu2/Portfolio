'use client'

import Link from 'next/link'
import { usePortfolioState } from '@/components/portfolio/PortfolioStateContext'
import {
  EXPERIENCE_LEVEL_MATRIX,
  MATRIX_LEVELS,
} from '@/lib/portfolio/abstraction-engine-data'
import { cn } from '@/lib/utils'

export function ExperienceLevelMatrix() {
  const { traceIds } = usePortfolioState()

  return (
    <div className="arch-level-matrix-block">
      <div className="arch-level-matrix-wrap">
        <table
          className="arch-level-matrix"
          role="grid"
          aria-label="Experience placement across abstraction levels"
        >
          <thead>
            <tr>
              <th scope="col" className="arch-level-matrix__corner font-analogue">
                <span className="sr-only">Experience</span>
              </th>
              {MATRIX_LEVELS.map((level) => (
                <th key={level.id} scope="col" className="arch-level-matrix__col-head font-analogue">
                  {level.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXPERIENCE_LEVEL_MATRIX.map((row) => {
              const traced = traceIds.includes(row.id)
              return (
                <tr
                  key={row.id}
                  className={cn('arch-level-matrix__row', traced && 'arch-level-matrix__row--traced')}
                >
                  <th scope="row" className="arch-level-matrix__row-head">
                    <Link
                      href={row.href}
                      className="arch-level-matrix__label font-analogue"
                      aria-label={`${row.label} experience`}
                    >
                      {row.label}
                    </Link>
                  </th>
                  {MATRIX_LEVELS.map((level) => (
                    <td
                      key={level.id}
                      className="arch-level-matrix__cell"
                      aria-label={
                        row.levels.includes(level.id)
                          ? `${row.label} at ${level.label} level`
                          : undefined
                      }
                    >
                      {row.levels.includes(level.id) && (
                        <span className="arch-level-matrix__dot" aria-hidden />
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="arch-level-matrix__read">
        The dots mark where the work actually sat. Most roles pulled me across two
        layers at once, and they kept drifting toward direction as I went.
      </p>

      <dl className="arch-level-matrix__key">
        {MATRIX_LEVELS.map((level) => (
          <div key={level.id} className="arch-level-matrix__key-item">
            <dt className="font-analogue">{level.label}</dt>
            <dd>{level.blurb}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
