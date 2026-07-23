'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BentoWorkspaceShell } from '@/components/portfolio/bento-workflows/BentoWorkspaceShell'
import { DuoPalettePreview } from '@/components/portfolio/bento-workflows/DuoPalettePreview'
import { useBentoWorkspace } from '@/components/portfolio/bento-workflows/BentoWorkspaceContext'
import { BENTO_COLOR_SCHEMES } from '@/lib/portfolio/bento-workflows/color-schemes'
import {
  CUSTOM_DUO_PALETTE_FIELDS,
  CUSTOM_DUO_PALETTE_UPDATE_EVENT,
  CUSTOM_DUO_SCHEME_IDS,
  getDefaultCustomDuoEdit,
  readCustomDuoEdit,
  resetAllCustomDuoEdits,
  resetCustomDuoEdit,
  writeCustomDuoEdit,
  type CustomDuoPaletteEdit,
  type CustomDuoSchemeId,
} from '@/lib/portfolio/bento-workflows/custom-duo-palettes'

const FIELD_GROUPS = [
  { id: 'work', label: 'Work tile fills' },
  { id: 'page', label: 'Page background' },
  { id: 'hero', label: 'Hero blocks' },
] as const

function normalizeHex(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return '#000000'
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
}) {
  const safeValue = normalizeHex(value)

  return (
    <label className="duo-editor-field">
      <span className="duo-editor-field-label">
        {label}
        {hint ? <span className="duo-editor-field-hint">{hint}</span> : null}
      </span>
      <div className="duo-editor-field-controls">
        <input
          type="color"
          className="duo-editor-color-swatch"
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          className="duo-editor-hex-input"
          value={safeValue.toUpperCase()}
          onChange={(event) => onChange(normalizeHex(event.target.value))}
          spellCheck={false}
        />
      </div>
    </label>
  )
}

export function DuoPaletteEditorClient() {
  const { colorScheme, setColorScheme } = useBentoWorkspace()
  const initialScheme = CUSTOM_DUO_SCHEME_IDS.includes(colorScheme as CustomDuoSchemeId)
    ? (colorScheme as CustomDuoSchemeId)
    : 'palette-sand-chartreuse-duo'

  const [activeScheme, setActiveScheme] = useState<CustomDuoSchemeId>(initialScheme)
  const [edit, setEdit] = useState<CustomDuoPaletteEdit>(() =>
    getDefaultCustomDuoEdit(initialScheme)
  )

  const paletteOptions = useMemo(
    () =>
      CUSTOM_DUO_SCHEME_IDS.map((id) => {
        const spec = BENTO_COLOR_SCHEMES.find((scheme) => scheme.id === id)
        return {
          id,
          label: spec?.label ?? id,
          description: spec?.description ?? '',
        }
      }),
    []
  )

  useEffect(() => {
    setEdit(readCustomDuoEdit(activeScheme))
    setColorScheme(activeScheme)
  }, [activeScheme, setColorScheme])

  useEffect(() => {
    const syncEdit = () => setEdit(readCustomDuoEdit(activeScheme))
    window.addEventListener(CUSTOM_DUO_PALETTE_UPDATE_EVENT, syncEdit)
    return () => window.removeEventListener(CUSTOM_DUO_PALETTE_UPDATE_EVENT, syncEdit)
  }, [activeScheme])

  const updateField = (key: keyof CustomDuoPaletteEdit, value: string) => {
    const next = { ...edit, [key]: normalizeHex(value) }
    setEdit(next)
    writeCustomDuoEdit(activeScheme, next)
  }

  const handleResetPalette = () => {
    resetCustomDuoEdit(activeScheme)
    setEdit(getDefaultCustomDuoEdit(activeScheme))
  }

  const handleResetAll = () => {
    resetAllCustomDuoEdits()
    setEdit(getDefaultCustomDuoEdit(activeScheme))
  }

  const activeLabel = paletteOptions.find((option) => option.id === activeScheme)?.label

  return (
    <BentoWorkspaceShell
      title="Palette duo editor"
      description="Edit the four custom palette duo schemes. Changes save locally and apply live on the homepage when you pick the same scheme."
    >
      <section className="duo-editor-page">
        <div className="duo-editor-layout">
          <aside className="duo-editor-panel">
            <div className="duo-editor-panel-head">
              <p className="duo-editor-eyebrow">Custom palette duos</p>
              <h2 className="duo-editor-title font-serif-display">{activeLabel}</h2>
            </div>

            <div className="duo-editor-palette-tabs">
              {paletteOptions.map((option) => {
                const isActive = option.id === activeScheme
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={cn('duo-editor-palette-tab', isActive && 'duo-editor-palette-tab--active')}
                    onClick={() => setActiveScheme(option.id)}
                  >
                    <span className="duo-editor-palette-tab-label">{option.label}</span>
                    <span className="duo-editor-palette-tab-desc">{option.description}</span>
                  </button>
                )
              })}
            </div>

            {FIELD_GROUPS.map((group) => (
              <div key={group.id} className="duo-editor-field-group">
                <h3 className="duo-editor-group-title">{group.label}</h3>
                <div className="duo-editor-field-grid">
                  {CUSTOM_DUO_PALETTE_FIELDS.filter((field) => field.group === group.id).map(
                    (field) => (
                      <ColorField
                        key={field.key}
                        label={field.label}
                        hint={field.hint}
                        value={edit[field.key]}
                        onChange={(value) => updateField(field.key, value)}
                      />
                    )
                  )}
                </div>
              </div>
            ))}

            <div className="duo-editor-actions">
              <button type="button" className="duo-editor-btn" onClick={handleResetPalette}>
                Reset this palette
              </button>
              <button
                type="button"
                className="duo-editor-btn duo-editor-btn--ghost"
                onClick={handleResetAll}
              >
                Reset all four
              </button>
            </div>
          </aside>

          <div className="duo-editor-preview-wrap">
            <p className="duo-editor-preview-label">Live preview · {activeLabel}</p>
            <DuoPalettePreview schemeId={activeScheme} />
          </div>
        </div>

        <p className="duo-editor-footer">
          Pick the same palette on{' '}
          <Link href="/" className="duo-editor-link">
            Home →
          </Link>{' '}
          with the scheme switcher to see your edits on the full layout.
        </p>
      </section>
    </BentoWorkspaceShell>
  )
}
