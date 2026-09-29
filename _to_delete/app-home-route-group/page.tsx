import Script from 'next/script'
import { getQuotes } from '@/lib/portfolio/quotes'

export default function HomePage() {
  // Footer quotes live in content/Quotes about engineering.md; the footer card reads this JSON.
  const quotesJson = JSON.stringify(getQuotes()).replace(/</g, '\\u003c')
  return (
    <>
      <div id="nav"></div>
      <main id="work">
        <div id="hero"></div>
        <div className="q-sheet">
          <div className="q-w" id="tabs"></div>
        </div>
      </main>
      <div id="foot"></div>
      <script id="quotes-data" type="application/json" dangerouslySetInnerHTML={{ __html: quotesJson }} />

      <Script src="/mocks/k2-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6-ask.js" strategy="beforeInteractive" />
      <Script src="/mocks/k2.js" strategy="beforeInteractive" />
      <Script src="/mocks/k3.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6.js" strategy="beforeInteractive" />

      <Script id="init-home" strategy="afterInteractive">
        {`
          const $ = (s) => document.querySelector(s)
          if (typeof Q !== 'undefined' && typeof K !== 'undefined') {
            $('#nav').innerHTML = Q.header({ active: 'work', work: '#work', about: '/about', ask: false })
            Q.stage($('#hero'))
            Q.workTabs($('#tabs'))
            Q.footer2($('#foot'), JSON.parse($('#quotes-data').textContent))
            Q.init()
            K.theme('pencil')
            // Ask me anything panel removed; keep all other content
          }
        `}
      </Script>
    </>
  )
}
