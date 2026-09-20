'use client'

import Script from 'next/script'

/** Registers all @material/web custom elements globally via the esm.run CDN — no build step. */
export function MaterialWebLoader() {
  return (
    <>
      <Script id="material-web-importmap" type="importmap" strategy="beforeInteractive">
        {`{"imports": {"@material/web/": "https://esm.run/@material/web/"}}`}
      </Script>
      <Script id="material-web-init" type="module" strategy="afterInteractive">
        {`
          // next/script re-inserts this inline module on every client-side
          // navigation to a page that mounts MaterialWebLoader. Static "import"
          // statements can't be conditional, so guard with dynamic import()
          // behind a global flag — otherwise customElements.define() runs
          // twice and throws "Cannot define multiple custom elements with the
          // same tag name".
          if (!window.__materialWebLoaded) {
            window.__materialWebLoaded = true;
            Promise.all([
              import('@material/web/all.js'),
              // Card isn't in the all.js bundle yet (still "labs") — import it explicitly.
              import('@material/web/labs/card/elevated-card.js'),
              import('@material/web/labs/card/filled-card.js'),
              import('@material/web/labs/card/outlined-card.js'),
              import('@material/web/typography/md-typescale-styles.js'),
            ]).then(([, , , , typescale]) => {
              document.adoptedStyleSheets.push(typescale.styles.styleSheet);
            });
          }
        `}
      </Script>
    </>
  )
}
