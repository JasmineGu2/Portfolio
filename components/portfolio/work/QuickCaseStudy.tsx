'use client'

import { ArrowLeft } from 'lucide-react'

interface QuickCaseStudyProps {
  title: string
  date: string
  role: string
  context: string
  impact: string[]
}

export function QuickCaseStudy({
  title,
  date,
  role,
  context,
  impact,
}: QuickCaseStudyProps) {
  return (
    <article className="case-study">
      <div className="case-study__article">
        <a href="/" className="case-study__back">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back home
        </a>

        <header className="case-study__header">
          <h1 className="case-study__title">{title}</h1>
          <p className="case-study__meta">Jasmine Gu · {date}</p>
        </header>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Role</h2>
          <p className="case-study__body">{role}</p>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Context</h2>
          <p className="case-study__body">{context}</p>
        </section>

        <section className="case-study__section">
          <h2 className="case-study__section-title">Impact</h2>
          <ul className="case-study__list">
            {impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
