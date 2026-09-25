import Script from 'next/script'

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/mocks/k2.css" />
      <link rel="stylesheet" href="/mocks/k3.css" />
      <link rel="stylesheet" href="/mocks/k4.css" />
      <link rel="stylesheet" href="/mocks/k6.css" />

      <div id="nav"></div>
      <main id="work">
        <div id="hero"></div>
        <div id="mapsec"></div>
        <div className="q-sheet">
          <div className="q-w" id="tabs"></div>
        </div>
      </main>
      <div id="foot"></div>

      <Script src="/mocks/k2-data.js" />
      <Script src="/mocks/k4-data.js" />
      <Script src="/mocks/k6-ask.js" />
      <Script src="/mocks/k2.js" />
      <Script src="/mocks/k3.js" />
      <Script src="/mocks/k4.js" />
      <Script src="/mocks/k6.js" />

      <Script id="init-home">
        {`
          const $ = (s) => document.querySelector(s)
          if (typeof Q !== 'undefined') {
            $('#nav').innerHTML = Q.header({ active: 'work', work: '#work' })
            Q.stage($('#hero'))
            Q.field($('#hero'), $('#mapsec'))
            Q.workTabs($('#tabs'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
            Q.ask()
          }
        `}
      </Script>
    </>
  )
}
