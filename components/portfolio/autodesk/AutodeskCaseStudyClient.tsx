'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  AUTODESK_CHALLENGES,
  AUTODESK_EXPORT_DECISION,
  AUTODESK_FUTURE_BLOCKS,
  AUTODESK_HERO_META,
  AUTODESK_OUTCOMES,
  AUTODESK_PROBLEM_REASONS,
  AUTODESK_ROLE_ROWS,
} from '@/lib/portfolio/autodesk-case-study'

export function AutodeskCaseStudyClient() {
  return (
    <article className="case-study">
      <Link href="/" className="case-study__back">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </Link>

      {/* Hero Section */}
      <section className="case-study__hero">
        <p className="case-study__label">{AUTODESK_HERO_META.kicker}</p>
        <h1 className="case-study__hero-title">{AUTODESK_HERO_META.title}</h1>
        <p className="case-study__hero-summary">
          I led product strategy for ADP Studio, Autodesk's governed SQL and data-exploration platform. This case study covers adoption challenges, platform principles, the export governance decision, and scaling to an agentic data strategy.
        </p>
      </section>

      {/* Outcomes */}
      <section className="case-study__section" id="outcomes">
        <p className="case-study__label">Outcomes</p>
        <h2 className="case-study__headline">What Changed</h2>
        <ul className="case-study__list">
          {AUTODESK_OUTCOMES.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <hr className="case-study__divider" />

      {/* Role */}
      <section className="case-study__section" id="my-role">
        <p className="case-study__label">Context</p>
        <h2 className="case-study__headline">My Role</h2>
        <div className="space-y-4">
          {AUTODESK_ROLE_ROWS.map((row) => (
            <div key={row.label}>
              <h3 className="case-study__subhead">{row.label}</h3>
              <p className="case-study__body">{row.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="case-study__divider" />

      {/* The Problem */}
      <section className="case-study__section" id="the-problem">
        <p className="case-study__label">Problem</p>
        <h2 className="case-study__headline">Why Adoption Was Hard</h2>
        <div className="space-y-5">
          {AUTODESK_PROBLEM_REASONS.map((reason) => (
            <div key={reason.title}>
              <h3 className="case-study__subhead">{reason.title}</h3>
              <p className="case-study__body">{reason.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="case-study__divider" />

      {/* Export Decision */}
      <section className="case-study__section" id="exporting">
        <p className="case-study__label">Case Study</p>
        <h2 className="case-study__headline">The Export Governance Decision</h2>
        <div className="space-y-5">
          {AUTODESK_EXPORT_DECISION.map((block) => (
            <div key={block.title}>
              <h3 className="case-study__subhead">{block.title}</h3>
              <p className="case-study__body">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="case-study__divider" />

      {/* Challenges */}
      <section className="case-study__section" id="challenges">
        <p className="case-study__label">Reflection</p>
        <h2 className="case-study__headline">Challenges I Faced</h2>
        <div className="space-y-6">
          {AUTODESK_CHALLENGES.map((challenge) => (
            <div key={challenge.title}>
              <h3 className="case-study__subhead">{challenge.title}</h3>
              <p className="case-study__body">{challenge.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="case-study__divider" />

      {/* What I Learned */}
      <section className="case-study__section" id="future">
        <p className="case-study__label">Lessons</p>
        <h2 className="case-study__headline">What I Learned</h2>
        <div className="space-y-5">
          {AUTODESK_FUTURE_BLOCKS.map((block) => (
            <div key={block.title}>
              <h3 className="case-study__subhead">{block.title}</h3>
              <p className="case-study__body">{block.body}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
