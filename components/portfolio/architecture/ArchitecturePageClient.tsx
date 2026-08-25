'use client'

import { ArrowUpRight } from 'lucide-react'
import { AGENT_IDENTITY } from '@/lib/portfolio/abstraction-engine-data'
import { ExperienceLevelMatrix } from '@/components/portfolio/architecture/ExperienceLevelMatrix'
import { ALL_PROJECT_TILES } from '@/lib/portfolio/projects-bento-data'
import { GALLERY_PHOTOS, GALLERY_INTRO, encodeGallerySrc } from '@/lib/portfolio/gallery-data'

function ArchitectureIdCard() {
  return (
    <section className="arch-hero">
      <div className="arch-hero__grid arch-hero__grid--card-only">
        <aside className="arch-id-card">
          <p className="arch-id-card__name font-serif-display">{AGENT_IDENTITY.name}</p>
          <dl className="arch-id-card__meta font-analogue">
            <div>
              <dt>Location</dt>
              <dd>{AGENT_IDENTITY.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>{AGENT_IDENTITY.education}</dd>
            </div>
            <div>
              <dt>Current Mode</dt>
              <dd>{AGENT_IDENTITY.currentMode}</dd>
            </div>
            <div>
              <dt>Background</dt>
              <dd>{AGENT_IDENTITY.background}</dd>
            </div>
            <div>
              <dt>Default Loop</dt>
              <dd>{AGENT_IDENTITY.defaultLoop}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="arch-id-card__status">
                <span className="arch-status-dot" aria-hidden />
                {AGENT_IDENTITY.status}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

function ExplorationsCompact() {
  return (
    <section className="arch-section arch-section--light arch-section--engine">
      <div className="arch-container arch-container--engine">
        <div className="arch-text-bubble">
          <p className="arch-eyebrow font-analogue">Explorations</p>
        </div>
        <div className="arch-project-grid">
          {ALL_PROJECT_TILES.map((tile) => (
            <a
              key={tile.id}
              href={tile.href}
              target={tile.external ? '_blank' : undefined}
              rel={tile.external ? 'noopener noreferrer' : undefined}
              className="arch-project-card"
              style={{ gridColumn: tile.col, gridRow: tile.row }}
            >
              <div className="arch-project-card__head">
                <span className="arch-project-card__chip">{tile.tag}</span>
                <span className="arch-project-card__arrow" aria-hidden>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <img
                src={tile.imageSrc}
                alt={tile.imageAlt}
                className="arch-project-card__img"
                loading="lazy"
              />
              <p className="arch-project-card__title">{tile.title}</p>
              {tile.subtitle && (
                <span className="arch-project-card__desc">{tile.subtitle}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryCompact() {
  return (
    <section className="arch-section arch-section--light arch-section--engine">
      <div className="arch-container arch-container--engine">
        <div className="arch-text-bubble">
          <p className="arch-eyebrow font-analogue">Gallery</p>
          <p className="arch-gallery-title font-serif-display">{GALLERY_INTRO.title}</p>
          <p className="arch-gallery-lead">{GALLERY_INTRO.lead}</p>
        </div>

        <div className="arch-gallery-photos">
          {GALLERY_PHOTOS.map((photo) => (
            <figure key={photo.id} className="arch-gallery-photos__item" tabIndex={0}>
              <div className="arch-gallery-photos__bento">
                <img
                  src={encodeGallerySrc(photo.imageSrc)}
                  alt={photo.alt ?? photo.title}
                  loading="lazy"
                  decoding="async"
                  className="arch-gallery-photos__img"
                />
                <figcaption className="arch-gallery-photos__caption">
                  <span className="arch-gallery-photos__caption-tag">{photo.tag}</span>
                  <span className="arch-gallery-photos__caption-title">{photo.title}</span>
                  <span className="arch-gallery-photos__caption-desc">{photo.subtitle}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ArchitecturePageClient() {
  return (
    <main className="arch-page portfolio-content">
      <ArchitectureIdCard />
      <section className="arch-section arch-section--light arch-section--engine">
        <div className="arch-container arch-container--engine">
          <div className="arch-text-bubble">
            <p className="arch-matrix-lead">
              Each role trained a different layer — from automating tasks to shaping product
              direction.
            </p>
          </div>
          <ExperienceLevelMatrix />
        </div>
      </section>
      <ExplorationsCompact />
      <GalleryCompact />
    </main>
  )
}
