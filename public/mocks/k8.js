// Round 8: five landing stories built off the City Growth map (mock 40).
// Fewer streets (one core avenue, three lanes, seven skill spurs), each experience is ONE logo chip, and a "stack" legend
// (a different layered object per page) that lights the places it relates to. Data is only what she listed; unknown dates are [TBD].
;(() => {
  'use strict'
  const D = window.K7DATA
  const W = 1200, H = 760, STR_H = 206
  const YEARS = [2021, 2022, 2023, 2024, 2025, 2026]
  const f = (n) => Math.round(n * 10) / 10
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const $ = (s, r) => (r || document).querySelector(s)
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)]
  const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

  // ---------- polyline measuring ----------
  const meas = (pts) => {
    const seg = []
    let tot = 0
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1][0] - pts[i][0], dy = pts[i + 1][1] - pts[i][1], l = Math.hypot(dx, dy)
      seg.push({ i, l, s: tot, dx, dy })
      tot += l
    }
    const at = (t) => {
      const d = clamp(t, 0, 1) * tot
      let g = seg[seg.length - 1]
      for (const s of seg) if (d <= s.s + s.l) { g = s; break }
      const k = g.l ? (d - g.s) / g.l : 0, ux = g.dx / g.l, uy = g.dy / g.l
      return { x: pts[g.i][0] + g.dx * k, y: pts[g.i][1] + g.dy * k, ux, uy, nx: uy, ny: -ux }
    }
    return { pts, len: tot, at, d: 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join(' L ') }
  }

  // ---------- the layers (her four) ----------
  const LAYERS = [
    { id: 'swe', name: 'Software engineering', short: 'ENGINEERING', caps: 'Frontend · Backend · Systems · Infrastructure' },
    { id: 'product', name: 'Product', short: 'PRODUCT', caps: 'Discovery · Prioritization · Product Strategy · Execution' },
    { id: 'business', name: 'Business', short: 'BUSINESS', caps: 'Strategy · Markets · Operations · Incentives' },
    { id: 'community', name: 'Community', short: 'COMMUNITY', caps: 'Users · Facilitation · Storytelling · Feedback' },
  ]
  const LAY = Object.fromEntries(LAYERS.map((l) => [l.id, l]))

  // ---------- the map: ONE core avenue (engineering), three lanes, seven skill spurs ----------
  const core = meas([[-70, 600], [230, 500], [560, 372], [880, 252], [985, 222]])
  const CORE_F = { 2021: 0, 2022: 0.25, 2023: 0.4, 2024: 0.5, 2025: 0.72, 2026: 1 } // how much of the avenue exists each year
  const laneOf = (t, dir, offs) => {
    const a = core.at(t)
    return meas(offs.map(([n, u]) => [a.x + dir * a.nx * n + a.ux * u, a.y + dir * a.ny * n + a.uy * u]))
  }
  const LANES = {
    business: { id: 'business', name: 'BUSINESS ST', w: 16, year: 2022, m: laneOf(0.21, 1, [[0, 0], [90, 10], [230, 50], [380, 100], [560, 150]]) },
    community: { id: 'community', name: 'COMMUNITY LN', w: 16, year: 2023, m: laneOf(0.365, 1, [[0, 0], [90, 5], [220, 55], [360, 130], [540, 240]]) },
    product: { id: 'product', name: 'PRODUCT AVE', w: 28, year: 2026, m: laneOf(0.86, -1, [[0, 0], [80, 10], [200, 70], [330, 150], [500, 240]]) },
  }
  const SPUR_DEF = [
    ['python', 'PYTHON', 0.08, 2022, 112], ['servicenow', 'SERVICENOW', 0.22, 2023, 124], ['node', 'NODE.JS', 0.36, 2024, 106],
    ['react', 'REACT', 0.47, 2025, 126], ['typescript', 'TYPESCRIPT', 0.55, 2025, 102], ['sql', 'SQL', 0.63, 2026, 116], ['java', 'JAVA', 0.73, 2026, 106],
  ]
  const SPURS = SPUR_DEF.map(([id, name, t, year, len]) => {
    const a = core.at(t)
    const m = meas([[a.x, a.y], [a.x - a.nx * len, a.y - a.ny * len]])
    return { id, name, t, year, m, end: { x: a.x - a.nx * len, y: a.y - a.ny * len } }
  })
  const TOOL_SPUR = { Python: 'python', ServiceNow: 'servicenow', 'Node.js': 'node', React: 'react', TypeScript: 'typescript', SQL: 'sql', Java: 'java' }
  const ME = { x: 1070, y: 190, w: 176, h: 68, a: -18 }

  // ---------- the places: every experience is ONE chip. `layers` is what the stack legend lights ----------
  const exp = (id, o) => {
    const e = D.exp.find((x) => x.id === id)
    return { id, name: e.short, co: e.co, year: e.year, role: e.role, when: e.when, nums: e.nums, what: e.what, tools: e.tools, depth: e.depth, split: e.split, ...o }
  }
  const PLACES = [
    { id: 'western', name: 'WESTERN', co: 'Western', year: 2022, role: 'CS + Business dual degree', when: '2022 to 2027', nums: ['Computer science and business, side by side'], what: '', tools: [], depth: [], layers: ['business'], road: 'business', s: 0.5, off: 1, r: 21, mono: 'WU', logo: '/work/western-ivey-cover.png' },
    exp('metaverse', { layers: ['swe', 'business'], road: 'core', s: 0.13, off: 1, r: 26, mono: 'MG', logo: '/work/metaverse.png' }),
    exp('omers', { layers: ['swe', 'business'], road: 'core', s: 0.29, off: 1, r: 26, mono: 'OM', logo: '/work/omers.png', fit: 'meet' }),
    { id: 'hack-western', name: 'HACK WESTERN', co: 'Hack Western', year: 2023, role: 'Dev Lead, then PM Lead', when: '2023 to present', nums: ['8-person dev team', '300+ students'], what: 'Introduced new product processes and built internal tools, including a sponsorship dashboard connected to Slack through MCP.', tools: [], depth: [], layers: ['swe', 'product', 'community'], road: 'community', s: 0.34, off: 1, r: 21, mono: 'HW', logo: '/work/hack-western.png' },
    exp('intuit', { layers: ['swe'], road: 'core', s: 0.44, off: 1, r: 26, mono: 'IN', logo: '/work/logos/intuit-square.png' }),
    exp('ivey', { layers: ['swe', 'business'], road: 'core', s: 0.555, off: 1, r: 26, mono: 'IV', logo: '/work/ivey-product-cover.jpg' }),
    exp('tesla', { layers: ['swe'], road: 'core', s: 0.665, off: 1, r: 26, mono: 'TS', logo: '/work/logos/tesla-square.png' }),
    exp('autodesk-fs', { layers: ['swe'], road: 'core', s: 0.78, off: 1, r: 26, mono: 'AD', logo: '/work/logos/autodesk-square.png' }),
    exp('autodesk-pm', { layers: ['product', 'community'], road: 'product', s: 0.24, off: 1, r: 21, mono: 'AD', logo: '/work/logos/autodesk-square.png' }),
    { id: 'ips', name: 'IPS FELLOWSHIP', co: 'IPS Fellowship', year: 2026, tbd: true, role: 'Fellowship lead', when: '2 years, dates [TBD]', nums: ['28 product educationals in 2 years'], what: 'Helping students develop PM skills.', tools: [], depth: [], layers: ['product', 'community'], road: 'community', s: 0.74, off: -1, r: 21, mono: 'IP' },
    { id: 'laurelspace', name: 'LAURELSPACE', co: 'LaurelSpace', year: 2026, tbd: true, role: 'PM + engineer', when: 'Pre-seed, dates [TBD]', nums: ['0→1 ops platform, customer discovery to MVP', 'Pre-seed positioning'], what: '', tools: [], depth: [], layers: ['product', 'business'], road: 'product', s: 0.62, off: -1, r: 21, mono: 'LS', logo: '/work/stealth-startup.png' },
  ]
  const PL = Object.fromEntries(PLACES.map((p) => [p.id, p]))
  PLACES.forEach((p) => {
    const m = p.road === 'core' ? core : LANES[p.road].m
    const a = m.at(p.s), dist = p.road === 'core' ? 70 : 56
    p.ax = a.x; p.ay = a.y
    p.x = a.x + p.off * a.nx * dist
    p.y = a.y + p.off * a.ny * dist
    p.engine = p.layers[0] === 'swe' && p.road === 'core'
  })
  const yearAtCore = (t) => [2022, 2023, 2024, 2025, 2026].find((y) => CORE_F[y] >= t) || 2026
  const builtAt = (p, step) => p.year <= YEARS[step]

  // ---------- faint buildings along the avenue and lanes (the city growing), kept clear of every road and chip ----------
  const BLDS = (() => {
    const rnd = rng(11), samples = [], out = []
    const push = (m, id, year) => { for (let d = 0; d <= m.len; d += 26) { const p = m.at(d / m.len); samples.push({ x: p.x, y: p.y, id }) } }
    push(core, 'core'); Object.values(LANES).forEach((l) => push(l.m, l.id)); SPURS.forEach((s) => push(s.m, s.id))
    const cand = []
    for (let d = 0; d < core.len; d += 34) { const a = core.at(d / core.len); cand.push({ a, year: yearAtCore(d / core.len) }) }
    Object.values(LANES).forEach((l) => { for (let d = 30; d < l.m.len; d += 40) cand.push({ a: l.m.at(d / l.m.len), year: l.year }) })
    for (const c of cand) {
      for (let k = 0; k < 2; k++) {
        const side = rnd() < 0.5 ? -1 : 1, dist = 52 + rnd() * 62, w = 24 + rnd() * 32, h = 16 + rnd() * 18
        const x = c.a.x + side * c.a.nx * dist, y = c.a.y + side * c.a.ny * dist
        if (x < 14 || x > W - 14 || y < 14 || y > H - 14) continue
        if (samples.some((s) => Math.hypot(s.x - x, s.y - y) < 34 + Math.max(w, h) * 0.3)) continue
        if (PLACES.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + 46 + Math.max(w, h) * 0.3 || Math.hypot(p.x - x, p.y - 38 - y) < 58)) continue
        if (Math.hypot(ME.x - x, ME.y - y) < 140) continue
        if (out.some((o) => Math.hypot(o.x - x, o.y - y) < 40)) continue
        out.push({ x, y, w, h, a: (Math.atan2(c.a.uy, c.a.ux) * 180) / Math.PI, year: c.year })
      }
    }
    return out
  })()

  // ---------- copy: story headlines are placeholder wording; every fact under them is hers ----------
  const CHAPTERS = [
    { k: 'Before 2022', h: 'An empty grid.', p: 'Press to build my city, one year at a time. The orange block at the end is where it is going.' },
    { k: '2022 · Chapter 1', h: 'It starts with one street: engineering.', ids: ['metaverse', 'western'] },
    { k: '2023 · Chapter 2', h: 'Engineering keeps going. A community lane opens.', ids: ['omers', 'hack-western'] },
    { k: '2024 · Chapter 3', h: 'Frontend at scale.', ids: ['intuit'] },
    { k: '2025 · Chapter 4', h: 'AI pipelines and factory software.', ids: ['ivey', 'tesla'] },
    { k: '2026 · Chapter 5', h: 'Then product joins the street.', ids: ['autodesk-fs', 'autodesk-pm'], also: ['ips', 'laurelspace'] },
  ]
  const LAYER_WINS = (id) => PLACES.filter((p) => p.layers.includes(id)).map((p) => ({ p, line: p.nums[0] })).filter((x) => x.line)
  const logoImg = (p, cls) => (p.logo ? `<img class="${cls || 'lg'}" src="${p.logo}" alt="" onerror="this.style.display='none'">` : '') + `<i class="mono">${p.mono}</i>`

  // ---------- SVG markup ----------
  const rectAlong = (cx, cy, deg, w, h) => {
    const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a)
    return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c])
  }
  const roadMarkup = (id, m, w, name, opts = {}) => `<g class="road ${opts.cls || ''}" data-road="${id}" data-y="${opts.year}">
    <path id="rd-${id}" class="rd-c" d="${m.d}" pathLength="1" stroke-width="${w + (opts.edge || 4)}"/>
    <path class="rd-f" d="${m.d}" pathLength="1" stroke-width="${w}"/>${opts.center ? `<path class="rd-x" d="${m.d}" stroke-width="2"/>` : ''}
    <text class="rd-t ${opts.tcls || ''}" dy="${opts.dy || 4}"><textPath href="#rd-${id}" startOffset="${opts.off || '50%'}" text-anchor="middle">${name}</textPath></text></g>`
  const chipMarkup = (p) => {
    const r = p.r
    const label = `<text class="pl-n" y="${-r - 20}" text-anchor="middle">${esc(p.name)}</text><text class="pl-y" y="${-r - 7}" text-anchor="middle">${p.tbd ? '[TBD]' : p.id === 'western' ? '2022–27' : p.id === 'hack-western' ? '2023–' : p.year}</text>`
    const img = p.logo ? `<image href="${p.logo}" x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" preserveAspectRatio="xMidYMid ${p.fit || 'slice'}" clip-path="url(#cp-${p.id})"/>` : ''
    return `<g transform="translate(${f(p.x)} ${f(p.y)})"><g class="pl ${p.engine ? 'eng' : ''} ${p.tbd ? 'tbd' : ''}" data-p="${p.id}" data-y="${p.year}" tabindex="0" role="button" aria-label="${esc(p.co)}: ${esc(p.role)}">
      <line class="pl-c" x1="0" y1="0" x2="${f(p.ax - p.x)}" y2="${f(p.ay - p.y)}"/><circle class="pl-h" r="${r + 9}"/>
      <circle class="pl-r" r="${r}"/><text class="pl-m" y="4" text-anchor="middle">${p.mono}</text>${img}${label}</g></g>`
  }
  const strataBands = [['community', 24], ['business', 34], ['product', 54], ['swe', 84]]
  const STRATA_Y0 = H + 8
  const wave = (y, seed, amp = 4) => {
    const r = rng(seed)
    let d = `M0 ${y}`
    for (let x = 0; x < W; x += 100) d += ` Q${x + 50} ${f(y + (r() - 0.5) * amp * 2)} ${x + 100} ${f(y + (r() - 0.5) * amp)}`
    return d
  }
  const strataMarkup = () => {
    let y = STRATA_Y0, s = `<g class="strata"><rect class="st-bg" x="0" y="${y - 6}" width="${W}" height="${STR_H + 6}"/>`
    strataBands.forEach(([id, h], i) => {
      s += `<g class="st-band" data-l="${id}"><rect class="st-f st-${id}" x="0" y="${y}" width="${W}" height="${h}"/><path class="st-w" d="${wave(y, 30 + i)}"/>
        <text class="st-t" x="12" y="${y + h / 2 + 4}">${LAY[id].short} · ${PLACES.filter((p) => p.layers.includes(id)).length}</text></g>`
      y += h
    })
    // each place is a small chip in every band it belongs to; a line joins them so one experience reads as one column
    PLACES.forEach((p) => {
      const ys = p.layers.map((id) => { let yy = STRATA_Y0; for (const [b, h] of strataBands) { if (b === id) return yy + h / 2; yy += h } })
      const px = clamp(p.x, 150, W - 40)
      s += `<g class="ld st-col" data-p="${p.id}" data-y="${p.year}"><line class="st-l" x1="${f(px)}" x2="${f(px)}" y1="${f(Math.min(...ys))}" y2="${f(Math.max(...ys))}"/>${p.layers
        .map((id, i) => { const yy = ys[i], rr = id === 'swe' ? 13 : id === 'product' ? 11 : 9; return `<g class="ld-i" data-l="${id}" transform="translate(${f(px)} ${f(yy)})"><circle class="ld-r" r="${rr}"/><text class="ld-m" y="3" text-anchor="middle">${p.mono}</text></g>` })
        .join('')}</g>`
    })
    return s + '</g>'
  }
  const mapMarkup = (cfg) => {
    let s = `<defs><pattern id="k8dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" class="dot"/></pattern>
      ${PLACES.map((p) => `<clipPath id="cp-${p.id}"><circle r="${p.r - 2}"/></clipPath>`).join('')}</defs>
      <rect class="bgc" x="-3000" y="-3000" width="7200" height="6800"/><rect x="-3000" y="-3000" width="7200" height="6800" fill="url(#k8dots)"/>`
    s += `<g class="blds">${BLDS.map((b) => `<rect class="bld rv" data-y="${b.year}" x="${f(b.x - b.w / 2)}" y="${f(b.y - b.h / 2)}" width="${f(b.w)}" height="${f(b.h)}" transform="rotate(${f(b.a)} ${f(b.x)} ${f(b.y)})"/>`).join('')}</g>`
    s += `<g class="spurs">${SPURS.map((sp) => `<g class="spur" data-s="${sp.id}" data-y="${sp.year}"><path class="sp-l" d="${sp.m.d}" pathLength="1"/><path class="sp-k" d="M${f(sp.end.x - 6)} ${f(sp.end.y)}h12"/><text class="sp-t" x="${f(sp.end.x + 10)}" y="${f(sp.end.y + 4)}">${sp.name}</text></g>`).join('')}</g>`
    s += `<g class="lanes">${Object.values(LANES).map((l) => roadMarkup(l.id, l.m, l.w, l.name, { year: l.year, cls: 'lane', tcls: 'lane-t', dy: l.w > 20 ? 4 : 3.5 })).join('')}</g>`
    s += `<g class="coreg">${roadMarkup('core', core, 38, 'ENGINEERING BLVD', { year: 2022, cls: 'coreroad', edge: 6, tcls: 'core-t', off: '38%', dy: 7 })}</g>`
    const me = rectAlong(ME.x, ME.y, ME.a, ME.w, ME.h)
    s += `<g class="me" data-y="2026"><polygon class="me-b" points="${me.map((q) => f(q[0]) + ',' + f(q[1])).join(' ')}"/>
      <text class="me-t" transform="translate(${ME.x} ${ME.y - 3}) rotate(${ME.a})" text-anchor="middle">JASMINE GU</text><text class="me-t s" transform="translate(${ME.x} ${ME.y + 13}) rotate(${ME.a})" text-anchor="middle">PRODUCT ENGINEER</text></g>`
    s += `<g class="places">${PLACES.map(chipMarkup).join('')}</g><g class="veh" opacity="0"><circle class="veh-g" r="22"/><path class="veh-a" d="M-13 -8 L15 0 L-13 8 L-7 0 Z"/></g>`
    if (cfg.strata) s += strataMarkup()
    return s
  }

  // ---------- the stack legends (each a different layered object; SWE biggest, product a clear second, business and community small) ----------
  const members = (id) => PLACES.filter((p) => p.layers.includes(id))
  const LEG_LABEL = (id, x, y, anchor) => `<rect class="lg-hit" x="${x - 3}" y="${y - 13}" width="100" height="31" fill="transparent"/><text class="lg-n" x="${x}" y="${y}" text-anchor="${anchor || 'start'}">${LAY[id].short}</text><text class="lg-c" x="${x}" y="${y + 13}" text-anchor="${anchor || 'start'}">${members(id).length} places</text>`
  const diamond = (cx, cy, w, h, t) => {
    const top = `${cx - w},${cy} ${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h}`
    return `<polygon class="lg-u" points="${cx - w},${cy} ${cx},${cy - h} ${cx + w},${cy} ${cx + w},${cy + t} ${cx},${cy + h + t} ${cx - w},${cy + t}"/><polygon class="lg-top" points="${top}"/>
      <polygon class="lg-sl" points="${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + t} ${cx - w},${cy + t}"/><polygon class="lg-sr" points="${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + t} ${cx},${cy + h + t}"/>
      <polygon class="lg-ln" points="${top}"/><path class="lg-ln" d="M${cx - w} ${cy}v${t}L${cx} ${cy + h + t}L${cx + w} ${cy + t}V${cy}M${cx} ${cy + h}v${t}"/>`
  }
  const dot = (p, x, y, r, layer) => `<g class="ld" data-p="${p.id}" data-y="${p.year}" data-l="${layer}"><circle class="ld-d" cx="${f(x)}" cy="${f(y)}" r="${r}"><title>${esc(p.co)}</title></circle></g>`
  const LEGENDS = {
    // 1 · isometric slabs, with one dot per place on the slab
    slabs: () => {
      const cfg = { swe: [250, 322, 150, 60, 30, 20], product: [250, 226, 104, 42, 18, 15], business: [250, 148, 74, 30, 12, 10], community: [250, 84, 64, 26, 12, 9] }
      let s = ''
      ;['swe', 'product', 'business', 'community'].forEach((id) => {
        const [cx, cy, w, h, t, r] = cfg[id], ms = members(id), n = ms.length, span = w * 1.5, gap = n > 1 ? span / (n - 1) : 0
        s += `<g class="lg" data-l="${id}"><g data-blk>${diamond(cx, cy, w, h, t)}</g>${ms.map((p, i) => dot(p, cx - span / 2 + i * gap, cy, r * 0.55 + 1.5, id)).join('')}
          <path class="lg-lead" d="M${cx - w - 4} ${cy}H126"/>${LEG_LABEL(id, 6, cy - 4)}</g>`
      })
      return { vb: '0 0 400 430', svg: s }
    },
    // 2 · a tower that fills in as the years go by (ghost blocks until a layer has its first place)
    tower: () => {
      const bl = { swe: [115, 300, 260, 110], product: [155, 214, 180, 86], business: [190, 152, 110, 62], community: [215, 104, 60, 48] }
      let s = `<line class="lg-ln" x1="60" y1="410" x2="392" y2="410"/>`
      ;['swe', 'product', 'business', 'community'].forEach((id) => {
        const [x, y, w, h] = bl[id], ms = members(id), n = ms.length, r = id === 'swe' ? 10 : id === 'product' ? 8.5 : id === 'business' ? 6.5 : 6, gap = (w - 2 * (r + 8)) / Math.max(1, n - 1)
        s += `<g class="lg" data-l="${id}"><rect class="lg-blk lg-top" data-blk x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><line class="lg-ln" x1="${x}" x2="${x + w}" y1="${y + 8}" y2="${y + 8}"/>
          ${ms.map((p, i) => dot(p, x + r + 8 + i * gap, y + h / 2 + 4, r, id)).join('')}<path class="lg-lead" d="M${x - 4} ${y + h / 2}H100"/>${LEG_LABEL(id, 6, y + h / 2 - 6)}</g>`
      })
      return { vb: '0 0 400 430', svg: s + `<path class="lg-ln" d="M245 104V70"/><circle class="lg-flag" cx="245" cy="66" r="4"/>` }
    },
    // 3 · a stack of books, one book per place per layer (a place in three layers is three books)
    books: () => {
      const wdt = { swe: 250, product: 200, business: 160, community: 124 }, hgt = { swe: 24, product: 20, business: 16, community: 14 }
      let y = 424, s = ''
      ;['swe', 'product', 'business', 'community'].forEach((id) => {
        const ms = members(id), top = y - ms.length * (hgt[id] + 2) + 2
        s += `<g class="lg" data-l="${id}">`
        ms.forEach((p, i) => {
          const by = y - (i + 1) * (hgt[id] + 2) + 2, jit = ((i * 7) % 5) - 2, bx = 262 - wdt[id] / 2 + jit * 2
          s += `<g class="ld book" data-p="${p.id}" data-y="${p.year}" data-l="${id}"><rect class="ld-d lg-blk" data-blk x="${f(bx)}" y="${by}" width="${wdt[id]}" height="${hgt[id]}" rx="2"/><line class="lg-ln" x1="${f(bx + 10)}" x2="${f(bx + 10)}" y1="${by}" y2="${by + hgt[id]}"/><line class="lg-ln" x1="${f(bx + wdt[id] - 10)}" x2="${f(bx + wdt[id] - 10)}" y1="${by}" y2="${by + hgt[id]}"/>
            <text class="bk-t" x="${f(bx + wdt[id] / 2)}" y="${by + hgt[id] / 2 + 3.4}" text-anchor="middle" style="font-size:${id === 'swe' ? 10 : id === 'product' ? 9 : 8}px">${esc(p.name)}</text></g>`
        })
        s += `<path class="lg-br" d="M124 ${top}h-8V${y}h8"/>${LEG_LABEL(id, 6, top + (y - top) / 2 - 6)}</g>`
        y = top - 6
      })
      return { vb: '0 0 400 430', svg: s }
    },
    // 5 · a jar that fills, layer by layer, as the years go by
    jar: () => {
      const s = `<g class="jar"><rect class="jar-g" x="130" y="70" width="200" height="340" rx="14"/><rect class="jar-l" x="122" y="50" width="216" height="20" rx="4"/>
        ${['swe', 'product', 'business', 'community'].map((id) => `<g class="lg" data-l="${id}"><rect class="jar-f jf-${id}" data-blk x="131" y="410" width="198" height="0"/><g class="jar-b"></g><path class="lg-lead" d="M126 0H100"/><g class="jar-lab">${LEG_LABEL(id, 6, 0)}</g></g>`).join('')}
        <path class="jar-shine" d="M148 84v300"/></g>`
      return { vb: '0 0 400 430', svg: s, jar: true }
    },
  }
  const JAR_H = { swe: 150, product: 95, business: 55, community: 40 }

  // ---------- mount ----------
  const MODES = {
    press: { start: 'Build 2022 →', next: (s) => (s >= 5 ? 'Enter the site →' : `Next: ${YEARS[s + 1]} →`), lead: 'Every year adds a street.' },
    film: { start: '▶ Watch it get built', auto: 5600, camera: true, lead: 'It plays slowly. Hover a place, or press Pause, to stop and read.' },
    scroll: { start: 'Scroll ↓ to build it', scroll: true, lead: 'One scroll notch, one year.' },
    drive: { start: 'Start the engine →', vehicle: true, strata: true, next: (s) => (s >= 5 ? 'Enter the site →' : `Keep driving: ${YEARS[s + 1]} →`), lead: 'Follow the avenue. Engineering is the street everything hangs off.' },
    counter: { start: 'PLAY', auto: 4200, counters: true, lead: 'Press play and watch it fill.' },
  }

  window.K8 = {
    PLACES, LAYERS, YEARS,
    mount(root, cfg) {
      const M = MODES[cfg.mode], q = new URLSearchParams(location.search)
      cfg = { ...cfg, strata: !!(cfg.strata ?? M.strata) }
      const stepMs = M.auto ? +q.get('ms') || M.auto : 0 // ?ms=800 speeds up the films (for testing)
      const st = { step: 0, started: false, hover: null, pin: null, paused: false }
      const leg = LEGENDS[cfg.legend] ? LEGENDS[cfg.legend]() : null
      root.dataset.mode = cfg.mode
      root.dataset.pal = 'blue'
      root.innerHTML = `<header class="k8-head"><div class="k8-title"><h1>${esc(cfg.title)}</h1><p>${esc(cfg.line)}</p></div><div class="k8-tools"><button type="button" class="k8-skip" data-skip>Skip to today</button></div></header>
        <div class="k8-body"><section class="k8-map">
          ${M.counters ? '<div class="k8-count"><div><b data-c="int">0</b><span>/ 7 internships</span></div><div><b data-c="sk">0</b><span>/ 7 skill streets</span></div><div><b data-c="ly">0</b><span>/ 4 layers</span></div></div>' : ''}
          <svg class="k8-svg" viewBox="0 -28 ${W} ${(cfg.strata ? H + STR_H : H) + 28}" role="img" aria-label="A city that grows year by year: each experience is a place, engineering is the main avenue" xmlns="http://www.w3.org/2000/svg">${mapMarkup(cfg)}</svg>
          <div class="k8-sub" hidden></div>
          <div class="k8-cta"><p>${esc(M.lead)}</p><button type="button" class="k8-go" data-go>${esc(M.start)}</button></div>
          <div class="k8-ctl">${M.auto ? '<button type="button" class="k8-pause" data-pause hidden>❚❚ Pause</button>' : ''}<button type="button" class="k8-next" data-next hidden></button></div>
          <nav class="k8-time" aria-label="Years">${YEARS.map((y, i) => `<button type="button" data-step="${i}" disabled><b>${i === 0 ? 'START' : y}</b><span>${PLACES.filter((p) => p.year === y).map((p) => `<i class="tl-dot" data-p="${p.id}">${p.mono}</i>`).join('')}</span></button>`).join('')}</nav>
          ${M.scroll ? '<div class="k8-cue">↓</div>' : ''}
        </section>
        <aside class="k8-side"><div class="k8-info" aria-live="polite"></div>${leg ? `<div class="k8-legend"><svg viewBox="${leg.vb}" role="img" aria-label="The stack: hover a layer to light up the places it covers" xmlns="http://www.w3.org/2000/svg">${leg.svg}</svg><p class="k8-leghint"><span class="h-hover">Hover</span><span class="h-tap">Tap</span> a layer, a place or a skill street. They light each other up.</p></div>` : `<ul class="k8-key">${LAYERS.map((l) => `<li class="lg" data-l="${l.id}"><b>${l.short}</b><span>${members(l.id).length} places</span></li>`).join('')}</ul>`}</aside></div>`
      const head = $('.k8-head', root), setHh = () => root.style.setProperty('--hh', head.offsetHeight + 'px')
      setHh(); addEventListener('resize', setHh); if (window.ResizeObserver) new ResizeObserver(setHh).observe(head)
      const $svg = $('.k8-svg', root), $info = $('.k8-info', root), $cta = $('.k8-cta', root), $next = $('[data-next]', root), $sub = $('.k8-sub', root)
      const $lgSvg = $('.k8-legend svg', root)
      let cam = { x: 0, y: -28, w: W, h: (cfg.strata ? H + STR_H : H) + 28 }, camT = { ...cam }, camRaf = 0

      // ----- info panel -----
      const rowHTML = (p) => `<li class="ip-r" data-p="${p.id}"><span class="ip-lg">${logoImg(p)}</span><div><b>${esc(p.co)}${p.id === 'autodesk-fs' ? ' · Engineering' : p.id === 'autodesk-pm' ? ' · Product' : ''}</b><span>${esc(p.role)} · ${esc(p.when)}</span>${p.nums[0] ? `<em>${esc(p.nums[0])}</em>` : ''}</div></li>`
      const chapterHTML = () => {
        const c = CHAPTERS[st.step]
        if (!c.ids) return `<p class="ip-k">${c.k}</p><h2 class="ip-h">${c.h}</h2><p class="ip-p">${c.p}</p>`
        const also = (c.also || []).map((id) => PL[id])
        return `<p class="ip-k">${c.k}</p><h2 class="ip-h">${c.h}</h2><ul class="ip-rows">${c.ids.map((id) => rowHTML(PL[id])).join('')}</ul>${also.length ? `<p class="ip-also">Also along the way (dates [TBD]): ${also.map((p) => `<b data-p="${p.id}">${esc(p.co)}</b>`).join(' · ')}</p>` : ''}`
      }
      const ledgerHTML = () => `<p class="ip-k">THE LEDGER</p><ol class="ip-led">${CHAPTERS.slice(1, st.step + 1).map((c, i) => `<li class="${i === st.step - 1 ? 'now' : ''}"><b>${YEARS[i + 1]}</b><div>${c.ids.map((id) => `<span class="lr" data-p="${id}"><span class="ip-lg">${logoImg(PL[id])}</span>${esc(PL[id].co)}<em>${esc(PL[id].nums[0] || '')}</em></span>`).join('')}</div></li>`).join('') || '<li class="empty">Nothing built yet. Scroll.</li>'}</ol>`
      const placeHTML = (p) => `<p class="ip-k">${p.layers.map((l) => LAY[l].short).join(' · ')}</p><div class="ip-hd"><span class="ip-lg big">${logoImg(p)}</span><div><h2 class="ip-h s">${esc(p.co)}</h2><p class="ip-sub">${esc(p.role)}<br>${esc(p.when)}${p.team && p.team !== '[TBD]' ? ' · ' + esc(p.team) : ''}</p></div></div>
        <ul class="ip-b">${p.nums.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>${p.what ? `<p class="ip-p">${esc(p.what)}</p>` : ''}
        ${p.split ? `<div class="ip-split" title="engineering vs product"><i style="width:${p.split[0]}%"></i><span>ENGINEERING ${p.split[0]} · PRODUCT ${p.split[1]}</span></div>` : ''}
        ${p.tools.length + p.depth.length ? `<div class="ip-chips">${[...p.tools, ...p.depth].map((t) => `<span class="${TOOL_SPUR[t] ? 'sk' : ''}">${esc(t)}</span>`).join('')}</div>` : ''}`
      const layerHTML = (id) => { const l = LAY[id], ms = members(id); return `<p class="ip-k">THE ${l.short} LAYER · ${ms.length} PLACES</p><h2 class="ip-h s">${l.name}</h2><p class="ip-sub">${l.caps}</p>
        <ul class="ip-b">${LAYER_WINS(id).map((x) => `<li><b>${esc(x.p.co)}:</b> ${esc(x.line)}</li>`).join('')}</ul><div class="ip-lgs">${ms.map((p) => `<span class="ip-lg" title="${esc(p.co)}" data-p="${p.id}">${logoImg(p)}</span>`).join('')}</div>` }
      const skillHTML = (id) => { const sp = SPURS.find((s) => s.id === id), ps = PLACES.filter((p) => p.tools.some((t) => TOOL_SPUR[t] === id)); return `<p class="ip-k">A SKILL STREET</p><h2 class="ip-h s">${sp.name}</h2><p class="ip-sub">First used in ${sp.year}. Used at:</p><ul class="ip-rows">${ps.map(rowHTML).join('')}</ul>` }
      const paintInfo = () => {
        const fc = st.hover || st.pin
        $info.classList.toggle('is-focus', !!fc)
        $info.classList.toggle('is-ledger', !fc && cfg.mode === 'scroll')
        $info.innerHTML = !fc ? (cfg.mode === 'scroll' ? ledgerHTML() : chapterHTML()) : fc.type === 'place' ? placeHTML(PL[fc.id]) : fc.type === 'skill' ? skillHTML(fc.id) : layerHTML(fc.id)
        if (!fc && cfg.mode === 'scroll') $info.scrollTop = $info.scrollHeight
      }

      // ----- focus: hover / pin a place, a layer or a skill street; everything related lights up -----
      const paintFocus = () => {
        const fc = st.hover || st.pin
        const layerOn = !fc ? [] : fc.type === 'layer' ? [fc.id] : fc.type === 'place' ? PL[fc.id].layers : [...new Set(PLACES.filter((p) => p.tools.some((t) => TOOL_SPUR[t] === fc.id)).flatMap((p) => p.layers))]
        const placeOn = (p) => !fc ? false : fc.type === 'place' ? p.id === fc.id : fc.type === 'layer' ? p.layers.includes(fc.id) : p.tools.some((t) => TOOL_SPUR[t] === fc.id)
        root.classList.toggle('focusing', !!fc)
        $$('.pl', root).forEach((el) => { const on = placeOn(PL[el.dataset.p]); el.classList.toggle('on', on); el.classList.toggle('dim', !!fc && !on) })
        const roadHot = (id) => !!fc && ((fc.type === 'layer' && (fc.id === id || (id === 'core' && fc.id === 'swe'))) || (fc.type === 'place' && (PL[fc.id].road === id)) || (fc.type === 'skill' && id === 'core'))
        $$('.road', root).forEach((el) => el.classList.toggle('hot', roadHot(el.dataset.road)))
        $$('.spur', root).forEach((el) => { const id = el.dataset.s; const hot = !!fc && ((fc.type === 'skill' && fc.id === id) || (fc.type === 'place' && PL[fc.id].tools.some((t) => TOOL_SPUR[t] === id)) || (fc.type === 'layer' && members(fc.id).some((p) => p.tools.some((t) => TOOL_SPUR[t] === id)))); el.classList.toggle('hot', hot) })
        $$('.lg', root).forEach((el) => { const on = layerOn.includes(el.dataset.l); el.classList.toggle('on', on); el.classList.toggle('dim', !!fc && !on) })
        $$('.ld', root).forEach((el) => { const p = PL[el.dataset.p], l = el.dataset.l; const on = !!fc && (fc.type === 'place' ? p.id === fc.id : fc.type === 'layer' ? (!l || l === fc.id) && p.layers.includes(fc.id) : placeOn(p)); el.classList.toggle('on', on); el.classList.toggle('dim', !!fc && !on) })
        $$('.ld-i', root).forEach((el) => { const parent = el.closest('.ld'); el.classList.toggle('lit', !!fc && parent.classList.contains('on') && (fc.type !== 'layer' || el.dataset.l === fc.id)) })
        $$('.st-band', root).forEach((el) => { const on = layerOn.includes(el.dataset.l); el.classList.toggle('on', on); el.classList.toggle('dim', !!fc && !on) })
        $$('.tl-dot', root).forEach((el) => el.classList.toggle('on', !!fc && placeOn(PL[el.dataset.p])))
      }
      const syncPause = () => { st.paused = !!st.userPaused || !!(st.hover || st.pin); const pb = $('[data-pause]', root); if (pb) pb.textContent = st.userPaused ? '▶ Resume' : '❚❚ Pause' }
      const focus = (fc) => { st.hover = fc; paintFocus(); paintInfo(); syncPause() }
      const fromEl = (t) => {
        const pl = t.closest('.pl, .ld, .ip-r, .ip-also b, .ip-lg[data-p], .lr, .tl-dot')
        if (pl && pl.dataset.p) return { type: 'place', id: pl.dataset.p }
        const lg = t.closest('.lg, .st-band')
        if (lg && lg.dataset.l) return { type: 'layer', id: lg.dataset.l }
        const sp = t.closest('.spur')
        if (sp) return { type: 'skill', id: sp.dataset.s }
        return null
      }
      root.addEventListener('pointerover', (e) => { if (e.pointerType === 'touch') return; const fc = fromEl(e.target); if (fc && (!st.hover || st.hover.id !== fc.id || st.hover.type !== fc.type)) focus(fc) })
      root.addEventListener('pointerout', (e) => { if (e.pointerType === 'touch') return; if (!st.hover) return; const to = e.relatedTarget; const still = to && fromEl(to); if (!still) focus(null) })
      root.addEventListener('focusin', (e) => { const fc = fromEl(e.target); if (fc) focus(fc) })
      root.addEventListener('focusout', () => focus(null))
      root.addEventListener('click', (e) => {
        const fc = fromEl(e.target)
        if (fc && !e.target.closest('button, a')) { st.pin = st.pin && st.pin.id === fc.id && st.pin.type === fc.type ? null : fc; paintFocus(); paintInfo(); syncPause() }
        else if (!e.target.closest('button, a, .k8-side')) { st.pin = null; paintFocus(); paintInfo(); syncPause() }
      })

      // ----- the year machine -----
      const total = { int: D.exp.length, sk: SPURS.length, ly: 4 }
      const JAR_SLOT = { swe: 410, product: 260, business: 165, community: 110 } // bottom of each compartment
      const jarUpdate = () => {
        if (!leg || !leg.jar) return
        ;['swe', 'product', 'business', 'community'].forEach((id) => {
          const ms = members(id), built = ms.filter((p) => builtAt(p, st.step)).length, h = JAR_H[id] * (built / ms.length), g = $(`.jar .lg[data-l="${id}"]`, root), bottom = JAR_SLOT[id], mid = bottom - JAR_H[id] / 2
          const rect = $('.jar-f', g)
          rect.setAttribute('y', f(bottom - h)); rect.setAttribute('height', f(h))
          $('.jar-lab text.lg-n', g).setAttribute('y', f(mid - 4)); $('.jar-lab text.lg-c', g).setAttribute('y', f(mid + 9))
          $$('.jar-lab text', g).forEach((t) => t.setAttribute('x', 6)); $('.lg-lead', g).setAttribute('d', `M126 ${f(mid)}H100`)
          const hit = $('.lg-hit', g); hit.setAttribute('y', f(mid - 17)); hit.setAttribute('x', 3)
          const bub = $('.jar-b', g)
          if (!bub.dataset.done) { bub.dataset.done = '1'; bub.innerHTML = ms.map((p, i) => dot(p, 156 + ((i + 0.5) * 148) / ms.length, 0, 6.5, id)).join('') }
          $$('.ld-d', bub).forEach((c, i) => c.setAttribute('cy', f(bottom - Math.min(h, JAR_H[id]) / 2 + ((i % 2) - 0.5) * 10)))
        })
      }
      const render = (instant) => {
        const yr = YEARS[st.step]
        root.dataset.step = st.step
        root.classList.toggle('instant', !!instant)
        $$('[data-y]', $svg).forEach((el) => {
          const y = +el.dataset.y
          el.classList.toggle('vis', y <= yr)
          el.classList.toggle('fresh', y === yr && yr > 2021)
        })
        // roads draw in: the core by how far it has got, lanes and spurs whole
        $$('.road', $svg).forEach((el) => {
          const id = el.dataset.road, fr = id === 'core' ? CORE_F[yr] : +el.dataset.y <= yr ? 1 : 0
          $$('.rd-c, .rd-f', el).forEach((p) => (p.style.strokeDashoffset = 1 - fr))
          const x = $('.rd-x', el); if (x) x.style.strokeDashoffset = 0
          el.classList.toggle('vis', fr > 0)
        })
        $$('.spur', $svg).forEach((el) => $('.sp-l', el).style.setProperty('stroke-dashoffset', +el.dataset.y <= yr ? 0 : 1))
        $$('.ld, .lg', root).forEach((el) => { if (el.dataset.p) el.classList.toggle('built', PL[el.dataset.p].year <= yr) })
        // a layer exists once it has its first place
        $$('.lg[data-l]', root).forEach((el) => el.classList.toggle('ghost', !members(el.dataset.l).some((p) => builtAt(p, st.step))))
        $$('.st-band', root).forEach((el) => el.classList.toggle('ghost', !members(el.dataset.l).some((p) => builtAt(p, st.step))))
        $$('.tl-dot', root).forEach((el) => el.classList.toggle('built', PL[el.dataset.p].year <= yr))
        $$('.k8-time button', root).forEach((b) => { const i = +b.dataset.step; b.classList.toggle('now', i === st.step); b.classList.toggle('done', i < st.step); b.disabled = i > st.step && !(cfg.mode === 'scroll') })
        const done = st.step === 5
        $('.me', $svg).classList.toggle('lit', done)
        root.classList.toggle('is-done', done)
        if (M.counters) {
          $('[data-c=int]', root).textContent = D.exp.filter((e) => e.year <= yr).length
          $('[data-c=sk]', root).textContent = SPURS.filter((s) => s.year <= yr).length
          $('[data-c=ly]', root).textContent = LAYERS.filter((l) => members(l.id).some((p) => builtAt(p, st.step))).length
        }
        jarUpdate()
        paintInfo()
        paintFocus()
        // controls
        if (M.next) { $next.hidden = !st.started; $next.textContent = M.next(st.step); $next.classList.toggle('enter', st.step >= 5) }
        const sub = $sub
        if (M.camera && st.started) { const c = CHAPTERS[st.step]; sub.hidden = false; sub.innerHTML = `<b>${c.k}</b> ${c.h}${c.ids ? ' ' + [...new Set(c.ids.map((id) => PL[id].co))].map(esc).join(' + ') : ''}` }
        if (st.step >= 5) showEnter()
        if (M.vehicle) driveTo(st.step, instant)
        if (M.camera || (narrow() && !M.vehicle)) camFor(st.step)
      }
      const showEnter = () => {
        if ($('.k8-enter', root)) return
        const a = document.createElement('a'); a.className = 'k8-enter'; a.href = '/'; a.textContent = 'Enter the site →'
        $('.k8-ctl', root).appendChild(a)
      }
      const go = (n, instant) => { st.step = clamp(n, 0, 5); render(instant) }
      const start = () => {
        if (st.started) return
        st.started = true; root.classList.add('started'); $cta.hidden = true
        const pb = $('[data-pause]', root); if (pb) pb.hidden = false
        if (cfg.mode === 'scroll') return
        go(1)
        if (stepMs) timer()
      }
      let tm = 0
      const timer = () => { clearInterval(tm); tm = setInterval(() => { if (!st.paused && st.step < 5) go(st.step + 1) }, stepMs) }
      $('[data-go]', root).addEventListener('click', start)
      $next.addEventListener('click', () => { if (st.step >= 5) return; go(st.step + 1) })
      $('[data-skip]', root).addEventListener('click', () => { st.started = true; root.classList.add('started'); $cta.hidden = true; clearInterval(tm); go(5) })
      $$('.k8-time button', root).forEach((b) => b.addEventListener('click', () => { if (!st.started && cfg.mode !== 'scroll') return; if (cfg.mode === 'scroll') { scrollToStep(+b.dataset.step); return } go(+b.dataset.step) }))
      document.addEventListener('keydown', (e) => {
        if (e.target.closest && e.target.closest('input, textarea')) return
        if ([' ', 'Enter', 'ArrowRight'].includes(e.key) && !e.target.closest('button, a, .pl')) { e.preventDefault(); if (!st.started) start(); else if (M.auto) { st.userPaused = !st.userPaused; syncPause() } else if (cfg.mode !== 'scroll') go(st.step + 1) }
        else if (e.key === 'ArrowLeft' && cfg.mode !== 'scroll') go(st.step - 1)
        else if (e.key === 'Escape') { st.pin = null; paintFocus(); paintInfo(); syncPause() }
      })
      // a film pauses while she is looking at something (hover or pin a place, a layer or a skill street) or when she presses Pause
      const pauseBtn = $('[data-pause]', root); if (pauseBtn) pauseBtn.addEventListener('click', () => { st.userPaused = !st.userPaused; syncPause() })

      // ----- camera (the film zooms to each new place; the drive follows the car) -----
      const camApply = () => { $svg.setAttribute('viewBox', `${f(cam.x)} ${f(cam.y)} ${f(cam.w)} ${f(cam.h)}`) }
      const camLoop = () => {
        const k = 0.09
        for (const key of ['x', 'y', 'w', 'h']) cam[key] += (camT[key] - cam[key]) * k
        camApply()
        if (Math.abs(camT.x - cam.x) + Math.abs(camT.y - cam.y) + Math.abs(camT.w - cam.w) > 1) camRaf = requestAnimationFrame(camLoop)
        else { cam = { ...camT }; camApply(); camRaf = 0 }
      }
      const camGo = (r, instant) => { camT = r; if (instant) { cam = { ...r }; camApply(); return } if (!camRaf) camRaf = requestAnimationFrame(camLoop) }
      const FULL = { x: 0, y: -28, w: W, h: (cfg.strata ? H + STR_H : H) + 28 }
      const narrow = () => matchMedia('(max-width: 900px)').matches
      const camFor = (step) => {
        if (!st.started || step === 0 || step === 5) return camGo({ ...FULL })
        const c = CHAPTERS[step], ps = c.ids.map((id) => PL[id]), cx = ps.reduce((a, p) => a + p.x, 0) / ps.length, cy = ps.reduce((a, p) => a + p.y, 0) / ps.length
        const w = narrow() ? 420 : 560, h = w * (H / W) * (narrow() ? 1.08 : 1)
        camGo({ x: clamp(cx - w / 2, -40, W - w + 40), y: clamp(cy - h / 2 + 30, -20, H - h + 20), w, h })
      }

      // ----- the drive: an orange car goes along the avenue to each year's stop -----
      const veh = $('.veh', $svg), STOP_T = [0, 0.16, 0.33, 0.47, 0.72, 1]
      let vt = 0, vRaf = 0
      const vPlace = (t) => { const a = core.at(t); veh.setAttribute('transform', `translate(${f(a.x)} ${f(a.y)}) rotate(${f((Math.atan2(a.uy, a.ux) * 180) / Math.PI)}) scale(1.5)`); return a }
      const driveTo = (step, instant) => {
        if (!st.started && step === 0) { veh.setAttribute('opacity', 0); return }
        veh.setAttribute('opacity', 1)
        const t1 = STOP_T[step]; cancelAnimationFrame(vRaf)
        if (instant) { vt = t1; const a = vPlace(vt); camGo(driveCam(a), true); return }
        const t0 = vt, T = 1500, s0 = performance.now()
        const tick = (now) => { const k = clamp((now - s0) / T, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; vt = t0 + (t1 - t0) * e; const a = vPlace(vt); camGo(driveCam(a)); if (k < 1) vRaf = requestAnimationFrame(tick) }
        vRaf = requestAnimationFrame(tick)
      }
      const driveCam = () => ({ ...FULL }) // the whole map and the section stay in view while she drives

      // ----- scroll mode: the page is tall, the stage is pinned, and the step follows the scrollbar -----
      const scrollToStep = (i) => { const max = document.documentElement.scrollHeight - innerHeight; window.scrollTo({ top: (max * (i + 0.5)) / 6, behavior: 'smooth' }) }
      if (cfg.mode === 'scroll') {
        root.classList.add('scrolly')
        const onScroll = () => { const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = clamp(scrollY / max, 0, 1), s = Math.min(5, Math.floor(p * 6)); if (s > 0 && !st.started) { st.started = true; root.classList.add('started'); $cta.hidden = true } if (s !== st.step) go(s); }
        addEventListener('scroll', onScroll, { passive: true }); onScroll()
      }
      render(true)
      root.__k8 = { st, go, start }
    },
  }
})()
