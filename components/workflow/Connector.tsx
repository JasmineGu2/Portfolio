'use client'

import { motion, useReducedMotion } from '@/lib/motion'
import type { ExecutionState } from '@/lib/workflow/types'

interface ConnectorProps {
  id: string
  label?: string
  direction?: 'horizontal' | 'vertical'
  active?: boolean
  completed?: boolean
  className?: string
}

export function Connector({
  id,
  label,
  direction = 'horizontal',
  active = false,
  completed = false,
  className = '',
}: ConnectorProps) {
  const prefersReducedMotion = useReducedMotion()
  const isVertical = direction === 'vertical'

  const strokeColor = active
    ? '#4D90D8'
    : completed
      ? '#7D8CA3'
      : 'rgba(125, 140, 163, 0.45)'

  const pathD = isVertical
    ? 'M 20 0 C 20 30, 20 30, 20 60'
    : 'M 0 20 C 40 20, 40 20, 80 20'

  return (
    <div
      className={`relative flex items-center justify-center ${
        isVertical ? 'flex-col h-16 w-10' : 'flex-row h-10 w-20 md:w-24 lg:w-28'
      } ${className}`}
      aria-hidden={!label}
    >
      <svg
        viewBox={isVertical ? '0 0 40 60' : '0 0 80 40'}
        className={isVertical ? 'h-full w-10' : 'w-full h-10'}
        preserveAspectRatio="none"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: completed || active ? 1 : 0.3 }}
          animate={{
            pathLength: completed || active ? 1 : 0.3,
            opacity: active ? 1 : 0.6,
          }}
          transition={{ duration: 0.5 }}
        />
        {active && !prefersReducedMotion && (
          <circle
            r={3}
            fill="#4D90D8"
            className="connector-particle"
            style={{ offsetPath: `path('${pathD}')` }}
          />
        )}
      </svg>
      {label && (
        <span
          className={`absolute ${
            isVertical
              ? 'left-full ml-2 top-1/2 -translate-y-1/2 max-w-[120px]'
              : 'top-full mt-1 left-1/2 -translate-x-1/2 max-w-[160px]'
          } text-[9px] md:text-[10px] text-center leading-tight text-workflow-connector font-medium px-1`}
        >
          {label}
        </span>
      )}
    </div>
  )
}

interface ConnectorLabelProps {
  label: string
  className?: string
}

export function ConnectorLabel({ label, className = '' }: ConnectorLabelProps) {
  return (
    <p
      className={`text-[10px] md:text-xs text-workflow-connector text-center leading-snug font-medium ${className}`}
    >
      {label}
    </p>
  )
}
