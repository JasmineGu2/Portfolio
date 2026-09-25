'use client'

import '@astryxdesign/core/astryx.css'
import '@astryxdesign/theme-neutral/theme.css'
import { Outline } from '@astryxdesign/core/Outline'
import { neutralTheme } from '@astryxdesign/theme-neutral/built'

/**
 * The Astryx Outline for the written case studies: the section list on the left of the article,
 * with the sliding indicator beside the section you are reading. The article already tracks the
 * active section, so the Outline is controlled by it. Astryx's stylesheets are the pre-built ones
 * (no reset.css). The Theme provider needs React 19, so the wrapper only sets `data-astryx-theme`,
 * which is all the theme CSS scopes on. Nothing else on the site restyles.
 */
export function ArticleOutline({
  sections,
  activeId,
  onActiveIdChange,
  label = 'Case study sections',
}: {
  sections: readonly { id: string; label: string }[]
  activeId: string
  onActiveIdChange: (id: string) => void
  label?: string
}) {
  return (
    <div data-astryx-theme={neutralTheme.name}>
      <Outline
        items={sections.map(({ id, label: text }) => ({ id, label: text, level: 2 }))}
        activeId={activeId}
        onActiveIdChange={onActiveIdChange}
        label={label}
        density="compact"
      />
    </div>
  )
}
