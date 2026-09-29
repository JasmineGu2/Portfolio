// Round 3 kit: your live page (K.home), the drafted name (K.nameBand), the skills city (K.city). Needs k2-data.js + k2.js first.
;(() => {
  const D = window.K2, K = window.K, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]

  // theme override for pages that want to open in blueprint
  K.theme = (t) => { document.documentElement.dataset.theme = t; const b = $('.k2bar button'); if (b) b.textContent = t === 'blueprint' ? 'go pencil' : 'go blueprint' }

  // ---------- switcher presets ----------
  const SW = {
    grid: { key: 'grid', label: 'Graph paper', opts: [['faint', 'Faint'], ['none', 'None'], ['full', 'Full']] },
    tacc: { key: 'tacc', label: 'Tile accent', opts: [['clean', 'Clean'], ['bubble', 'Bubble'], ['dim', 'Dim lines']] },
    txt: { key: 'txt', label: 'Text', opts: [['clean', 'Clean'], ['dotted', 'Dotted rules']] },
    map: { key: 'map', label: 'Map', opts: [['blue', 'Blue'], ['light', 'Light + orange']] },
    note: { key: 'note', label: 'Layer note', opts: [['sticky', 'Sticky'], ['call', 'Callout'], ['both', 'Both']] },
    nm: { key: 'nm', label: 'Left name', opts: [['hide', 'Hide'], ['show', 'Orange mono']] },
    tiles: { key: 'tiles', label: 'Tiles', opts: [['sq', 'Square'], ['wide', 'Wide'], ['feat', 'Featured']] },
    hf: { key: 'hf', label: 'Headline', opts: [['site', 'Site (Inter)'], ['serif', 'Serif']] },
    big: { key: 'tiles', label: 'Layout', opts: [['two', '2 columns'], ['feat', 'Featured lead'], ['one', '1 column']] },
  }
  K.sw3 = (keys, defs = {}, onChange) => K.switches(keys.map((k) => ({ ...SW[k], def: defs[k] })), onChange)

  // ---------- K.home: the live front page. Left text column exactly as on localhost; right = tabs + the site's tiles ----------
  K.home = (el, o = {}) => {
    const groups = ['Engineering', 'Product', 'Other'].concat(o.mapTab ? ['Skills city'] : [])
    const st = D.status.replace(/(hack western|autodesk|tesla|intuit)/g, '<b>$1</b>')
    el.innerHTML = `<div class="home"><div class="l">
      <h1 class="nm0">jasmine gu</h1><p class="hl">${D.headline}</p><p class="st">${st}</p><div>${K.socials()}</div><p class="in">${D.intro}</p>
      <div><p class="lead">${D.hlLead}</p><ul class="ar">${D.highlights.map((h) => `<li><span>↳</span><span>${h}</span></li>`).join('')}</ul></div>
      <div class="notes"><h2>Notes</h2><ul>${D.notes.map((n) => `<li>${n}</li>`).join('')}</ul></div>
      <div><p class="lead">what i've been building:</p><ul class="ar">${D.building.map((b) => `<li><span>↳</span><span>${b}</span></li>`).join('')}</ul></div>
      <div><p class="lead">previously:</p><ul class="ar prev">${D.previously.map(([c, n]) => `<li><span>↳</span><span><small>${c}</small> <b>${n}</b></span></li>`).join('')}</ul></div>
    </div><div class="r"><div class="tabs">${groups.map((g, i) => `<button data-g="${g}" class="${i === 0 ? 'on' : ''}">${g}</button>`).join('')}</div><div id="tc"></div></div></div>`
    const tc = $('#tc', el)
    const draw = (g) => {
      if (g === 'Skills city') { K.city(tc, { W: 640, H: 640, small: true }); return }
      tc.innerHTML = '<div class="tiles"></div>'; const box = $('.tiles', tc)
      box.innerHTML = K.list().filter((e) => e.group === g).map(K.tile).join('')
      $$('.tile', box).forEach((t, i) => { const e = D.exp.find((x) => x.id === t.dataset.id)
        t.insertAdjacentHTML('afterbegin', K.bub(String(i + 1).padStart(2, '0')))
        $('.m', t).insertAdjacentHTML('afterend', `<div class="dimx"><span>${e.when}</span></div>`) })
      K.videos(box)
    }
    $('.tabs', el).addEventListener('click', (ev) => { const b = ev.target.closest('[data-g]'); if (!b) return; $$('.tabs button', el).forEach((x) => x.classList.toggle('on', x === b)); draw(b.dataset.g) })
    draw('Engineering')
  }

  // ---------- K.bigTiles: big clean tiles (16:10). Default: caption row under the media. { overlay: true }: a white box over the media's bottom-left corner ----------
  K.bigTiles = (el, o = {}) => {
    el.innerHTML = `${o.min ? '' : `<div class="tabs">${['All', 'Engineering', 'Product', 'Other'].map((g, i) => `<button data-g="${g}" class="${i === 0 ? 'on' : ''}">${g}</button>`).join('')}</div>`}<div class="tiles big${o.overlay ? ' ov' : ''}"></div>`
    const box = $('.tiles', el)
    const tags = (e) => e.tags.map((t) => `<span>${t}</span>`).join('')
    const draw = (g) => {
      box.innerHTML = K.list().filter((e) => g === 'All' || e.group === g).map((e, i) => `<article class="tile" data-id="${e.id}" data-when="${e.when}" data-cursor-label="${e.label}">${o.min ? '' : K.bub(String(i + 1).padStart(2, '0'))}<div class="m">${K.media(e)}${o.overlay ? `<div class="bx"><h3>${e.co}</h3><p class="sub">${e.sub}</p><p class="tgl">${tags(e)}</p></div>` : ''}</div>${o.min ? '' : `<div class="dimx"><span>${e.when}</span></div>`}${o.overlay ? '' : `<div class="cap"><div><h3>${e.co}</h3><p class="sub">${e.sub}</p></div><p class="tgl">${tags(e)}</p></div>`}</article>`).join('')
      K.videos(box)
    }
    if (!o.min) $('.tabs', el).addEventListener('click', (ev) => { const b = ev.target.closest('[data-g]'); if (!b) return; $$('.tabs button', el).forEach((x) => x.classList.toggle('on', x === b)); draw(b.dataset.g) })
    draw('All')
  }

  // ---------- K.nameBand: the mock-11 drafted name + the 2 taped stickies ----------
  K.nameBand = (o = {}) => `<div class="nb">${o.bare ? '' : `<p class="label"><span>${o.l || 'Sheet 01 · the name, drafted'}</span><span>Scale 1:1 · Drawn by J.G.</span></p>`}<div class="nbw">
    <svg viewBox="0 0 1200 480" role="img" aria-label="The name Jasmine Gu drafted as a blueprint drawing with dimension lines"><defs><pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="#e8f1ff" stroke-width="1.6"/></pattern></defs>
      <g class="dsh fade" style="--d:.3s"><line x1="600" y1="20" x2="600" y2="450"/><line x1="40" y1="240" x2="1160" y2="240"/></g>
      <text class="nm" x="110" y="375" font-size="330" textLength="900" lengthAdjust="spacingAndGlyphs">JASMINE GU</text>
      <g class="dm"><line class="draw" pathLength="1" style="--d:3.2s" x1="110" y1="420" x2="1010" y2="420"/><line class="draw" pathLength="1" style="--d:3.3s" x1="110" y1="408" x2="110" y2="432"/><line class="draw" pathLength="1" style="--d:3.4s" x1="1010" y1="408" x2="1010" y2="432"/>
        <line class="draw" pathLength="1" style="--d:3.5s" x1="62" y1="125" x2="62" y2="375"/><line class="draw" pathLength="1" style="--d:3.6s" x1="50" y1="125" x2="74" y2="125"/><line class="draw" pathLength="1" style="--d:3.7s" x1="50" y1="375" x2="74" y2="375"/></g>
      <g class="dsh fade" style="--d:3.4s"><line x1="110" y1="375" x2="110" y2="420"/><line x1="1010" y1="375" x2="1010" y2="420"/><line x1="62" y1="125" x2="110" y2="125"/></g>
      <text class="dn fade" style="--d:3.9s" x="520" y="412">W 900</text><text class="dn fade" style="--d:4s" transform="translate(44 265) rotate(-90)">H 250</text>
      <circle class="org fade" style="--d:4.1s" cx="110" cy="375" r="11"/><text class="dn fade" style="--d:4.2s" x="126" y="400">R 11</text>
      <path class="org fade" style="--d:4.2s" d="M960 375 A50 50 0 0 0 1010 325"/><text class="dn fade" style="--d:4.3s" x="1020" y="330">43°</text>
      <text class="dl fade" style="--d:4.4s" x="110" y="462">PRODUCT ENGINEER · TORONTO · GRAD 2027</text><text class="dl fade" style="--d:4.4s" x="1010" y="462" text-anchor="end">FIG. 01</text></svg>
    ${o.stk === false ? '' : `<div class="stks">${K.sticky(0, '', -3)}${K.sticky(2, 'l', 3)}</div>`}</div></div>`

  // ---------- K.city: roads = skills, projects sit on the intersections; click a pin for the big video ----------
  const BASE = [
    { n: 'PRODUCT STRATEGY AVE', a: [-20, 150], b: [1220, 250], o: 8 }, { n: 'BUSINESS BLVD', a: [-20, 440], b: [1220, 360], o: 6 },
    { n: 'FULL-STACK ST', a: [260, -20], b: [380, 580], o: 22 }, { n: 'AI / ML ROAD', a: [640, -20], b: [560, 580], o: 10 },
    { n: 'DATA WAY', a: [-20, -40], b: [1220, 560], o: 30 }, { n: 'COMMUNITY LANE', a: [930, -20], b: [1030, 580], o: 14 },
    { n: 'USER RESEARCH ST', a: [-20, 320], b: [1220, 280], o: 33 },
  ]
  const PIN = { tesla: [3, 4], autodesk: [0, 3], 'autodesk-eng': [2, 4], intuit: [2, 6], omers: [1, 2], metaverse: [1, 4], 'stealth-startup': [0, 2], 'hack-western': [0, 5], 'ivey-product': [5, 6], western: [1, 3] }
  const X = (p, q) => { const [x1, y1] = p.a, [x2, y2] = p.b, [x3, y3] = q.a, [x4, y4] = q.b; const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)); return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)] }
  K.city = (el, o = {}) => {
    const W = o.W || 1200, H = o.H || 560, u = 'c' + Math.random().toString(36).slice(2, 6), sx = W / 1200, sy = H / 560
    const ext = o.ext || 0 // roads can be pushed this far past both ends, so a taller frame (a hero above the map) keeps the same streets
    const R = BASE.map((r) => { const a = [r.a[0] * sx, r.a[1] * sy], b = [r.b[0] * sx, r.b[1] * sy], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L
      return { n: r.n, o: r.o, off: ext ? (r.o / 100) * L + ext : null, a: ext ? [a[0] - ux * ext, a[1] - uy * ext] : a, b: ext ? [b[0] + ux * ext, b[1] + uy * ext] : b } })
    const ln = (r, e = '') => `<line ${e} x1="${r.a[0]}" y1="${r.a[1]}" x2="${r.b[0]}" y2="${r.b[1]}"/>`
    const pins = K.list().map((e, i) => { const [a, b] = PIN[e.id], [x, y] = X(R[a], R[b]), right = x < W * 0.72
      return `<g class="mpin fade" style="--d:${1.4 + i * .1}s" data-id="${e.id}" data-cursor-label="${e.label}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle class="ring" r="11"/>
        <text x="${right ? 20 : -20}" y="-1" text-anchor="${right ? 'start' : 'end'}">${e.co.toUpperCase()}</text>${o.small ? '' : `<text class="w" x="${right ? 20 : -20}" y="13" text-anchor="${right ? 'start' : 'end'}">${e.when.toUpperCase()}</text>`}</g>` }).join('')
    const flat = !!o.blockAt, bx = flat ? W * o.blockAt[0] : W * (o.small ? 0.74 : 0.905), by = flat ? H * o.blockAt[1] : H * (o.small ? 0.86 : 0.79), bs = o.small ? 0.78 : 1
    el.innerHTML = `<div class="cmap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of skills as roads, projects as intersections"><defs><pattern id="${u}d" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" class="mdot"/></pattern>${R.map((r, i) => `<path id="${u}r${i}" d="M${r.a} L${r.b}"/>`).join('')}</defs>
      <rect class="mbg" x="${-ext}" y="${-ext}" width="${W + 2 * ext}" height="${H + 2 * ext}"/><rect x="${-ext}" y="${-ext}" width="${W + 2 * ext}" height="${H + 2 * ext}" fill="url(#${u}d)"/>
      <g class="mrE" stroke-width="38">${R.map((r) => ln(r)).join('')}</g><g class="mrI" stroke-width="36">${R.map((r) => ln(r)).join('')}</g>
      <g class="mrc">${R.map((r, i) => ln(r, `class="draw" pathLength="1" style="--d:${.2 + i * .2}s"`)).join('')}</g>
      ${R.map((r, i) => `<text class="rdl fade" style="--d:${1 + i * .1}s" dy="-6"><textPath href="#${u}r${i}" startOffset="${r.off != null ? r.off : r.o + '%'}">${r.n}</textPath></text>`).join('')}
      <g class="oblk fade" style="--d:1.2s" transform="translate(${bx} ${by}) rotate(${flat ? 0 : -6}) scale(${bs})">${flat ? '<circle class="ring2" cx="-128" cy="0" r="17"/><circle cx="-128" cy="0" r="4.5" fill="#ed3801"/><polygon points="-100,-25 100,-25 100,25 -100,25"/><text x="-82" y="7">JASMINE GU</text>' : '<polygon points="-96,-40 96,-46 90,42 -102,48"/><line x1="-78" y1="20" x2="80" y2="-22"/><text x="-70" y="-6">JASMINE GU</text><text class="s2" x="-70" y="30">TORONTO</text>'}</g>
      ${pins}</svg>${o.nocap ? '' : `<span class="cap">roads are what I care about · pins are where I've worked · click one</span>`}</div>`
    $$('.mpin', el).forEach((g) => (g.onclick = () => K.lightbox(D.exp.find((e) => e.id === g.dataset.id))))
  }
})()
