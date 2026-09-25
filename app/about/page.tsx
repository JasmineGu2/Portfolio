import Script from 'next/script'

export default function AboutPage() {
  return (
    <>
      <div id="nav"></div>
      <main id="journey">
        <div className="q-w">
          <div className="q6-top">
            <div className="q6-left">
              <div id="notes"></div>
              <div id="wel"></div>
            </div>
            <div id="lan"></div>
          </div>
        </div>
        <hr className="q-rule" />
        <div className="q-w">
          <div className="q-desk">
            <div className="d1" id="qt"></div>
            <div className="d2" id="sl"></div>
            <div className="d3" id="bj"></div>
            <div className="d4" id="pd"></div>
          </div>
        </div>
        <div className="q-w q-block" id="inv"></div>
        <div className="q-w q-block">
          <p className="q-lab">gallery</p>
          <div id="pola"></div>
        </div>
        <div className="q-w q-block" id="tools"></div>
        <div className="q-w q-block">
          <div id="dith"></div>
        </div>
        <div className="q-w q-block">
          <p className="q-lab">more context</p>
          <div id="ctx"></div>
        </div>
      </main>
      <div style={{ height: '80px' }}></div>
      <div id="foot"></div>

      <Script src="/mocks/k2-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4-data.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6-ask.js" strategy="beforeInteractive" />
      <Script src="/mocks/k2.js" strategy="beforeInteractive" />
      <Script src="/mocks/k3.js" strategy="beforeInteractive" />
      <Script src="/mocks/k4.js" strategy="beforeInteractive" />
      <Script src="/mocks/k6.js" strategy="beforeInteractive" />

      <Script id="init-about" strategy="afterInteractive">
        {`
          const $ = (s) => document.querySelector(s)
          if (typeof Q !== 'undefined' && typeof K !== 'undefined') {
            K4.quotes = ['Built an agent to automate my own job applications.', '28 educationals. yes, I counted', 'Built systems for people I care about.']
            $('#nav').innerHTML = Q.header({ active: 'about', work: '/', about: '#journey', ask: true })
            $('#notes').innerHTML = Q.notes2()
            Q.welcome($('#wel'))
            Q.lanyard($('#lan'))
            Q.quotes($('#qt'))
            Q.stockList($('#sl'))
            Q.blackjack($('#bj'))
            Q.polaroid2($('#pd'))
            $('.q-polad').removeAttribute('data-drag')
            Q.askInvite($('#inv'))
            Q.polaroids($('#pola'))
            Q.tools($('#tools'))
            Q.dither($('#dith'))
            Q.moreContext($('#ctx'))
            Q.footer2($('#foot'))
            Q.init()
            K.theme('pencil')
            Q.ask()
            Q.drag($('#notes'), { mouseOnly: true })
            ['#qt', '#sl', '#bj', '#pd'].forEach((s) => Q.drag($(s)))
          }
        `}
      </Script>
    </>
  )
}
