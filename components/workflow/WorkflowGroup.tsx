import type { ReactNode } from 'react'

interface WorkflowGroupProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
}

export function WorkflowGroup({
  title,
  subtitle,
  children,
  className = '',
  id,
}: WorkflowGroupProps) {
  return (
    <section
      id={id}
      className={`workflow-group relative ${className}`}
      aria-label={title}
    >
      {(title || subtitle) && (
        <header className="mb-6 md:mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-workflow-text tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm md:text-base text-workflow-secondary mt-2 max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
