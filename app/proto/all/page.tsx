'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { MaterialWebLoader } from '@/components/portfolio/proto/MaterialWebLoader'
import '@/components/portfolio/proto/proto-mine.css'
import '@/components/portfolio/proto/proto-theirs.css'
import '@/components/portfolio/proto/proto-kitchen-sink.css'

type Theme = 'default' | 'mine' | 'theirs'

export default function KitchenSinkPage() {
  const [theme, setTheme] = useState<Theme>('default')
  const dialogRef = useRef<any>(null)

  const themeClass = theme === 'mine' ? 'proto-mine' : theme === 'theirs' ? 'proto-theirs' : ''

  return (
    <>
      <MaterialWebLoader />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />
      <div className={`kitchen-sink ${themeClass}`}>
        <header className="kitchen-sink__header">
          <Link href="/proto" style={{ color: 'inherit' }}>
            ← Proto
          </Link>
          <h1 className="md-typescale-headline-large" style={{ marginTop: 12 }}>
            Material Web — every component
          </h1>
          <p className="md-typescale-body-large">
            One page, every `@material/web` component loaded via esm.run. Toggle the token
            set to see how the same markup restyles.
          </p>
          <div className="kitchen-sink__theme-picker">
            <md-filled-button
              onClick={() => setTheme('default')}
              disabled={theme === 'default' || undefined}
            >
              Material default
            </md-filled-button>
            <md-outlined-button
              onClick={() => setTheme('mine')}
              disabled={theme === 'mine' || undefined}
            >
              My colors
            </md-outlined-button>
            <md-outlined-button
              onClick={() => setTheme('theirs')}
              disabled={theme === 'theirs' || undefined}
            >
              GSAP style
            </md-outlined-button>
          </div>
        </header>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Buttons</h2>
          <p className="kitchen-sink__section-hint">elevated, filled, filled-tonal, outlined, text</p>
          <div className="kitchen-sink__row">
            <md-elevated-button>Elevated</md-elevated-button>
            <md-filled-button>Filled</md-filled-button>
            <md-filled-tonal-button>Filled tonal</md-filled-tonal-button>
            <md-outlined-button>Outlined</md-outlined-button>
            <md-text-button>Text</md-text-button>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Icon buttons &amp; FAB</h2>
          <p className="kitchen-sink__section-hint">icon-button, filled, filled-tonal, outlined, fab, branded-fab</p>
          <div className="kitchen-sink__row">
            <md-icon-button>
              <md-icon>favorite</md-icon>
            </md-icon-button>
            <md-filled-icon-button>
              <md-icon>favorite</md-icon>
            </md-filled-icon-button>
            <md-filled-tonal-icon-button>
              <md-icon>favorite</md-icon>
            </md-filled-tonal-icon-button>
            <md-outlined-icon-button>
              <md-icon>favorite</md-icon>
            </md-outlined-icon-button>
            <md-fab aria-label="Compose">
              <md-icon slot="icon">edit</md-icon>
            </md-fab>
            <md-branded-fab aria-label="Compose branded">
              <md-icon slot="icon">edit</md-icon>
            </md-branded-fab>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Chips</h2>
          <p className="kitchen-sink__section-hint">assist, filter, input, suggestion</p>
          <md-chip-set className="kitchen-sink__row">
            <md-assist-chip label="Assist"></md-assist-chip>
            <md-filter-chip label="Filter"></md-filter-chip>
            <md-input-chip label="Input"></md-input-chip>
            <md-suggestion-chip label="Suggestion"></md-suggestion-chip>
          </md-chip-set>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Selection controls</h2>
          <p className="kitchen-sink__section-hint">checkbox, radio, switch, slider</p>
          <div className="kitchen-sink__row">
            <md-checkbox></md-checkbox>
            <md-checkbox checked></md-checkbox>
            <md-radio name="ks-radio" checked></md-radio>
            <md-radio name="ks-radio"></md-radio>
            <md-switch></md-switch>
            <md-switch selected></md-switch>
            <md-slider value={40} style={{ width: 200 }}></md-slider>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Progress</h2>
          <p className="kitchen-sink__section-hint">linear, circular</p>
          <div className="kitchen-sink__row" style={{ alignItems: 'center' }}>
            <md-linear-progress value={0.6} style={{ width: 240 }}></md-linear-progress>
            <md-linear-progress indeterminate style={{ width: 240 }}></md-linear-progress>
            <md-circular-progress value={0.75}></md-circular-progress>
            <md-circular-progress indeterminate></md-circular-progress>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Text fields &amp; select</h2>
          <p className="kitchen-sink__section-hint">filled, outlined, filled-select, outlined-select</p>
          <div className="kitchen-sink__row">
            <md-filled-text-field label="Filled"></md-filled-text-field>
            <md-outlined-text-field label="Outlined"></md-outlined-text-field>
            <md-filled-select label="Filled select">
              <md-select-option value="one">
                <div slot="headline">One</div>
              </md-select-option>
              <md-select-option value="two">
                <div slot="headline">Two</div>
              </md-select-option>
            </md-filled-select>
            <md-outlined-select label="Outlined select">
              <md-select-option value="one">
                <div slot="headline">One</div>
              </md-select-option>
              <md-select-option value="two">
                <div slot="headline">Two</div>
              </md-select-option>
            </md-outlined-select>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Tabs</h2>
          <md-tabs active-tab-index={0}>
            <md-primary-tab>First</md-primary-tab>
            <md-primary-tab>Second</md-primary-tab>
            <md-primary-tab>Third</md-primary-tab>
          </md-tabs>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">List</h2>
          <md-list style={{ maxWidth: 360 }}>
            <md-list-item>
              One line item
            </md-list-item>
            <md-list-item>
              Two line item
              <div slot="supporting-text">Supporting text</div>
            </md-list-item>
          </md-list>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Cards</h2>
          <p className="kitchen-sink__section-hint">elevated, filled, outlined (labs)</p>
          <div className="kitchen-sink__grid">
            <md-elevated-card>
              <div className="kitchen-sink__card-content">Elevated card</div>
            </md-elevated-card>
            <md-filled-card>
              <div className="kitchen-sink__card-content">Filled card</div>
            </md-filled-card>
            <md-outlined-card>
              <div className="kitchen-sink__card-content">Outlined card</div>
            </md-outlined-card>
          </div>
        </section>

        <md-divider></md-divider>

        <section className="kitchen-sink__section">
          <h2 className="md-typescale-title-large">Dialog</h2>
          <md-filled-button onClick={() => dialogRef.current?.show()}>Open dialog</md-filled-button>
          <md-dialog ref={dialogRef}>
            <div slot="headline">Example dialog</div>
            <form id="ks-dialog-form" slot="content" method="dialog">
              This is a standard Material dialog.
            </form>
            <div slot="actions">
              <md-text-button form="ks-dialog-form" onClick={() => dialogRef.current?.close()}>
                Close
              </md-text-button>
            </div>
          </md-dialog>
        </section>
      </div>
    </>
  )
}
