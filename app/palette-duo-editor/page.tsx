import type { Metadata } from 'next'
import { DuoPaletteEditorClient } from '@/components/portfolio/bento-workflows/DuoPaletteEditorClient'
import './palette-duo-editor.css'

export const metadata: Metadata = {
  title: 'Palette duo editor — Jasmine Gu',
  description: 'Edit and preview the four custom palette duo color schemes.',
}

export default function PaletteDuoEditorPage() {
  return <DuoPaletteEditorClient />
}
