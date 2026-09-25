'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  TESLA_HERO_META,
  TESLA_OUTCOMES,
} from '@/lib/portfolio/tesla-case-study'

export function TeslaCaseStudyClient() {
  return (
    <article className="case-study">
      <Link href="/" className="case-study__back">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </Link>

      {/* Hero Section */}
      <section className="case-study__hero">
        <p className="case-study__label">{TESLA_HERO_META.kicker}</p>
        <h1 className="case-study__hero-title">{TESLA_HERO_META.title}</h1>
        <p className="case-study__hero-summary">
          {TESLA_HERO_META.summary}
        </p>
      </section>

      {/* Outcomes */}
      <section className="case-study__section" id="outcomes">
        <p className="case-study__label">Outcomes</p>
        <h2 className="case-study__headline">What Changed</h2>
        <ul className="case-study__list">
          {TESLA_OUTCOMES.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <hr className="case-study__divider" />

      {/* Context Section */}
      <section className="case-study__section" id="overview">
        <p className="case-study__label">Context</p>
        <h2 className="case-study__headline">Overview</h2>
        <p className="case-study__body">
          This is a case study about working on video architecture and infrastructure at Tesla.
          The focus was on building systems that scaled to support the company's data needs.
        </p>
      </section>
    </article>
  )
}
