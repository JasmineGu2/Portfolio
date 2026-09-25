import Script from 'next/script'

export default function HomePage() {
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

      <Script src="/mocks/k2-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k2.js" strategy="beforeInteractive" />
      <Script src="/mocks/k3.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6.js" strategy="beforeInteractive" />

      <Script id="init-home" strategy="afterInteractive">
        {`
          const $ = (s) => document.querySelector(s)
          if (typeof Q !== 'undefined' && typeof K !== 'undefined') {
            $('#nav').innerHTML = Q.header({ active: 'work', work: '#work', about: '/about' })
            Q.stage($('#hero'))
            Q.workTabs($('#tabs'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
          }
        `}
      </Script>
    </>
  )
}
