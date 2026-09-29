// Round 7 kit: the street-map mockups. Inline SVG, no libraries. A scene (k7-scenes.js) says where the roads and pins go;
// this file draws them and adds the shared interactions: hover a pin (role, company, address), click for a map info tag,
// hover a street name to light every pin that used that tool, a plain list view, drag to pan, reduced motion.
;(() => {
  const D = window.K7DATA, K7 = (window.K7 = {}), REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const f = (n) => Math.round(n * 10) / 10, esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const EXP = (id) => D.exp.find((e) => e.id === id), LM = (id) => D.landmarks.find((l) => l.id === id)
  K7.D = D; K7.EXP = EXP

  // ---------- geometry ----------
  K7.rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647
  /** A straight road through a and b, pushed `e` units past both ends so it runs off the frame. */
  K7.line = (a, b, e = 500) => { const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d; return [[a[0] - ux * e, a[1] - uy * e], [b[0] + ux * e, b[1] + uy * e]] }
  /** A road from a to b that does not extend past them. */
  K7.seg = (a, b) => [a, b]
  K7.arc = (cx, cy, r, a0, a1, n = 60) => Array.from({ length: n + 1 }, (_, i) => { const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] })
  const pathD = (pts) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L')
  /** Point and (upright) angle at fraction t of segment `seg` of a polyline; seg defaults to the longest one. */
  const along = (pts, t = 0.5, seg) => {
    if (seg == null) { let m = -1; for (let i = 0; i < pts.length - 1; i++) { const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); if (l > m) { m = l; seg = i } } }
    const a = pts[seg], b = pts[seg + 1], x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
    let ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI; if (ang > 90) ang -= 180; if (ang < -90) ang += 180
    return { x, y, ang, ux: (b[0] - a[0]) / L, uy: (b[1] - a[1]) / L }
  }
  K7.along = along
  /** A point at fraction t along a road, pushed `off` units sideways (side +1 / -1) so a pin sits on the block beside the road. */
  K7.beside = (pts, t, off, side = 1, seg) => { const p = along(pts, t, seg); return { x: p.x - p.uy * off * side, y: p.y + p.ux * off * side } }

  // ---------- roads: gaps between blocks. Casings first, then fills, so junctions read cleanly ----------
  K7.RoadSet = class {
    constructor(cls = '') { this.r = []; this.cls = cls }
    add(pts, w, o = {}) { this.r.push({ pts, w, ...o }); return this }
    casings() { return this.r.map((r) => `<path class="cas" ${r.y ? `data-y="${r.y}" pathLength="1"` : ''} ${r.l != null ? `data-l="${r.l}" pathLength="1"` : ''} d="${pathD(r.pts)}" stroke-width="${f(r.w + 2.8)}"/>`).join('') }
    fills() { return this.r.map((r) => `<path class="rd${r.cls ? ' ' + r.cls : ''}" ${r.tool ? `data-tool="${r.tool}"` : ''} ${r.depth ? `data-depth="${esc(r.depth)}"` : ''} ${r.y ? `data-y="${r.y}" pathLength="1"` : ''} ${r.l != null ? `data-l="${r.l}" pathLength="1"` : ''} d="${pathD(r.pts)}" stroke-width="${r.w}"/>`).join('') }
    labels() { return this.r.filter((r) => r.label).map((r) => { const p = along(r.pts, r.t ?? 0.5, r.seg), off = r.off || 0; return `<text class="lb${r.tool || r.depth ? ' hov' : ''}" ${r.tool ? `data-tool="${r.tool}"` : ''} ${r.depth ? `data-depth="${esc(r.depth)}"` : ''} ${r.y ? `data-y="${r.y}"` : ''} ${r.l != null ? `data-l="${r.l}"` : ''} transform="translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.ang)})" dy="${f(off)}" ${r.fs ? `font-size="${r.fs}"` : ''}>${esc(r.label)}</text>` }).join('') }
    hits() { return this.r.filter((r) => r.tool || r.depth).map((r) => `<path class="hit" ${r.tool ? `data-tool="${r.tool}"` : ''} ${r.depth ? `data-depth="${esc(r.depth)}"` : ''} ${r.y ? `data-y="${r.y}"` : ''} d="${pathD(r.pts)}" stroke-width="${Math.max(r.w + 8, 18)}"/>`).join('') }
  }

  /** A district of irregular blocks: two families of near-parallel streets at `angle`, clipped to `poly`. Returns a RoadSet and the clipPath. */
  let clipN = 0
  K7.fabric = ({ poly, angle = 0, gapA = [60, 130], gapB = [60, 130], skew = 84, jitter = 5, w = 5, seed = 3, drop = 0.15 }) => {
    const rnd = K7.rng(seed), xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2, R = Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2 + 40
    const rs = new K7.RoadSet('fab'), id = 'k7c' + clipN++
    const fam = (deg, gap) => { const a = (deg * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a), nx = -uy, ny = ux; for (let o = -R; o < R; o += gap[0] + rnd() * (gap[1] - gap[0])) { if (rnd() < drop) continue; const j = (rnd() - 0.5) * jitter * 2, aa = a + (j * Math.PI) / 1800, ux2 = Math.cos(aa), uy2 = Math.sin(aa); rs.add([[cx + nx * o - ux2 * R * 1.6, cy + ny * o - uy2 * R * 1.6], [cx + nx * o + ux2 * R * 1.6, cy + ny * o + uy2 * R * 1.6]], w) } }
    fam(angle, gapA); fam(angle + skew, gapB)
    rs.clip = id; rs.poly = poly
    return rs
  }
  const clipDef = (rs) => `<clipPath id="${rs.clip}"><polygon points="${rs.poly.map((p) => p.join(',')).join(' ')}"/></clipPath>`

  /** Draw order: every fabric's casings, the main roads' casings, every fabric's fills, the main roads' fills. */
  K7.compose = (fabrics, sets) => ({
    defs: fabrics.map(clipDef).join(''),
    body: fabrics.map((fb) => `<g clip-path="url(#${fb.clip})">${fb.casings()}</g>`).join('') + sets.map((s) => s.casings()).join('') + fabrics.map((fb) => `<g clip-path="url(#${fb.clip})">${fb.fills()}</g>`).join('') + sets.map((s) => s.fills()).join(''),
    labels: fabrics.map((fb) => fb.labels()).join('') + sets.map((s) => s.labels()).join(''),
    hits: fabrics.map((fb) => fb.hits()).join('') + sets.map((s) => s.hits()).join(''),
  })

  K7.bg = () => '<rect class="bgc" x="-3000" y="-3000" width="7200" height="6800"/><rect class="dots" x="-3000" y="-3000" width="7200" height="6800" fill="url(#k7dots)"/>'
  /** A filled block (campus, the orange "me" block) with an optional label. */
  K7.block = (pts, cls, label, lp) => `<polygon class="blk ${cls}" points="${pts.map((p) => f(p[0]) + ',' + f(p[1])).join(' ')}"/>${label ? `<text class="blabel ${cls}" transform="translate(${f(lp.x)} ${f(lp.y)}) rotate(${f(lp.ang || 0)})">${label.map((t, i) => `<tspan x="0" dy="${i ? 11 : 0}">${esc(t)}</tspan>`).join('')}</text>` : ''}`

  // ---------- one info tag (used by the card and the list view) ----------
  const tag = (e, street) => `<div class="k7-nums">${e.nums.map((n) => `<p>${esc(n)}</p>`).join('')}</div>
    <p class="k7-who"><b>${esc(e.role)}</b><br>${esc(e.co)} · Team: ${esc(e.team)}<br><span>${esc(e.when)}${street ? ' · ' + esc(street) : ''}</span></p>
    <div class="k7-split" title="engineering / product"><i style="width:${e.split[0]}%"><em>ENG ${e.split[0]}</em></i><i class="p"><em>PRODUCT ${e.split[1]}</em></i></div>
    <p class="k7-lab">Engineering depth</p><p class="k7-chips">${e.depth.length ? e.depth.map((t) => `<span>${esc(t)}</span>`).join('') : '<span>[TBD]</span>'}</p>
    <p class="k7-lab">Tools</p><p class="k7-chips">${e.tools.map((t) => `<span class="t">${esc(t)}</span>`).join('')}</p>
    <p class="k7-fun"><b>Fun fact</b> ${esc(e.fun)}</p>`

  // ---------- mount ----------
  K7.mount = (root, sceneFn, o = {}) => {
    const pal = o.palette || 'blue', S = sceneFn(K7, D, pal), W = S.W || 1200, H = S.H || 760
    root.classList.add('k7'); root.dataset.pal = pal; root.dataset.blue = 'navy'
    root.innerHTML = `<header class="k7-head"><div class="k7-title"><h1>${esc(S.name)}</h1><p>${esc(S.line)}</p></div><div class="k7-tools">${S.controls || ''}${pal === 'blue' ? '<button type="button" class="k7-btn" data-blue title="switch the blue">Blue: navy</button>' : ''}<button type="button" class="k7-btn" data-view>List</button></div></header>
      <div class="k7-stage"><svg class="k7-svg" role="img" aria-label="${esc(S.name)}: a street map of Jasmine's experience" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="k7dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" class="dot"/></pattern>${S.defs || ''}</defs>
        <g class="world">${S.svg}<g class="hits">${S.hits || ''}</g><g class="pins">${(S.pins || []).map((p) => pinSvg(p)).join('')}</g></g></svg><div class="k7-tip" hidden></div><aside class="k7-card" hidden></aside></div>
      <ol class="k7-list" hidden>${(S.pins || []).filter((p) => EXP(p.id)).map((p) => `<li><h2>${p.year} · ${esc(EXP(p.id).co)}</h2>${tag(EXP(p.id), p.year + ' ' + p.street)}</li>`).join('')}${D.landmarks.map((l) => `<li><h2>${esc(l.name)}</h2><p class="k7-who">${esc(l.sub)}</p></li>`).join('')}</ol>`
    const head = $('.k7-head', root), setHh = () => root.style.setProperty('--hh', head.offsetHeight + 'px'); setHh(); addEventListener('resize', setHh); if (window.ResizeObserver) new ResizeObserver(setHh).observe(head); if (document.fonts && document.fonts.ready) document.fonts.ready.then(setHh)
    const stage = $('.k7-stage', root), svg = $('.k7-svg', root), tip = $('.k7-tip', root), card = $('.k7-card', root), pins = $$('.pin', root)
    const info = (id) => { const e = EXP(id); if (e) return e; const l = LM(id); return l ? { landmark: true, ...l } : null }

    // --- fit + pan: the whole map on a desktop window, a pannable crop on a phone ---
    let vb = { x: 0, y: 0, w: W, h: H }, pan = { x: 0, y: 0 }
    const fit = () => { const cw = stage.clientWidth, ch = stage.clientHeight; if (!cw || !ch) return; const s = cw < 700 ? Math.max(cw / W, ch / H) : Math.min(cw / W, ch / H); vb.w = cw / s; vb.h = ch / s; vb.x = (W - vb.w) / 2 + pan.x; vb.y = (H - vb.h) / 2 + pan.y
      if (vb.w < W) vb.x = Math.max(0, Math.min(W - vb.w, vb.x)); if (vb.h < H) vb.y = Math.max(0, Math.min(H - vb.h, vb.y)); svg.setAttribute('viewBox', `${f(vb.x)} ${f(vb.y)} ${f(vb.w)} ${f(vb.h)}`) }
    fit(); new ResizeObserver(fit).observe(stage)
    let drag = null
    svg.addEventListener('pointerdown', (e) => { if (e.target.closest('.pin, .hit, .lb.hov')) return; drag = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y, id: e.pointerId }; svg.setPointerCapture(e.pointerId); svg.classList.add('grab') })
    svg.addEventListener('pointermove', (e) => { if (!drag) return; const s = vb.w / stage.clientWidth; pan.x = drag.px - (e.clientX - drag.x) * s; pan.y = drag.py - (e.clientY - drag.y) * s
      const nx = (W - vb.w) / 2 + pan.x, ny = (H - vb.h) / 2 + pan.y; if (vb.w < W) pan.x = Math.max(-(W - vb.w) / 2, Math.min((W - vb.w) / 2, pan.x)); else pan.x = 0; if (vb.h < H) pan.y = Math.max(-(H - vb.h) / 2, Math.min((H - vb.h) / 2, pan.y)); else pan.y = 0; fit(); void nx; void ny })
    const end = () => { drag = null; svg.classList.remove('grab') }; svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end)

    // --- highlight: a tool street (or a depth term) lights every pin that used it ---
    const hl = (k, v) => { root.classList.toggle('hl', !!v); $$('[data-tool],[data-depth]', svg).forEach((n) => n.classList.toggle('on', !!v && n.dataset[k] === v))
      pins.forEach((p) => { const e = EXP(p.dataset.id), hit = !!v && !!e && (k === 'tool' ? e.tools : e.depth).includes(v); p.classList.toggle('on', hit); p.classList.toggle('dim', !!v && !hit) }) }
    svg.addEventListener('pointerover', (e) => { const n = e.target.closest('[data-tool],[data-depth]'); if (n) n.dataset.tool ? hl('tool', n.dataset.tool) : hl('depth', n.dataset.depth) })
    svg.addEventListener('pointerout', (e) => { if (e.target.closest('[data-tool],[data-depth]')) hl('tool', null) })
    K7.hl = hl

    // --- tooltip + card ---
    const place = (el, x, y) => { const r = stage.getBoundingClientRect(); el.style.left = Math.max(8, Math.min(r.width - el.offsetWidth - 8, x - r.left + 14)) + 'px'; el.style.top = Math.max(8, Math.min(r.height - el.offsetHeight - 8, y - r.top + 14)) + 'px' }
    const addr = (p) => (EXP(p.id) ? `${p.year} ${p.street}` : '[TBD]')
    pins.forEach((g) => { const p = S.pins.find((q) => q.id === g.dataset.id)
      g.addEventListener('pointerenter', (e) => { if (matchMedia('(hover: none)').matches) return; const d = info(p.id); tip.hidden = false; tip.innerHTML = d.landmark ? `<b>${esc(d.name)}</b><br>${esc(d.sub)}<br>${addr(p)}` : `<b>${esc(d.co)}</b> · ${esc(d.role)}<br>${esc(addr(p))}`; place(tip, e.clientX, e.clientY) })
      g.addEventListener('pointermove', (e) => place(tip, e.clientX, e.clientY)); g.addEventListener('pointerleave', () => (tip.hidden = true))
      g.addEventListener('click', () => select(p.id)); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p.id) } }) })
    const select = (id) => { tip.hidden = true; pins.forEach((g) => g.classList.toggle('sel', g.dataset.id === id)); const d = info(id), p = S.pins.find((q) => q.id === id)
      card.hidden = false; card.innerHTML = `<button type="button" class="k7-x" aria-label="Close">×</button><p class="k7-kick">${d.landmark ? esc(d.name) : esc(d.co.toUpperCase())}</p>${d.landmark ? `<p class="k7-who"><b>${esc(d.sub)}</b><br>Details [TBD]</p>` : tag(d, p.year + ' ' + p.street)}`
      $('.k7-x', card).onclick = () => { card.hidden = true; pins.forEach((g) => g.classList.remove('sel')); api.onSelect && api.onSelect(null) }; api.onSelect && api.onSelect(id) }
    svg.addEventListener('click', (e) => { if (!e.target.closest('.pin')) { /* keep the card open while panning */ } })

    // --- list view + blue switch ---
    $('[data-view]', root).onclick = (e) => { const list = $('.k7-list', root), on = list.hidden; list.hidden = !on; stage.hidden = on; e.currentTarget.textContent = on ? 'Map' : 'List' }
    const bb = $('[data-blue]', root); if (bb) bb.onclick = () => { const b = root.dataset.blue === 'navy' ? 'bright' : 'navy'; root.dataset.blue = b; bb.textContent = 'Blue: ' + b }

    const api = { root, stage, svg, pins, select, hl, fit, S, W, H, reduced: REDUCED, $, $$, EXP, onSelect: null }
    S.setup && S.setup(api)
    return api
  }

  function pinSvg(p) {
    const e = EXP(p.id), lm = LM(p.id), label = e ? e.short : lm.name, sub = e ? String(p.year) : '', side = p.side ?? 1, tx = side * 13
    return `<g class="pin${lm ? ' lm' : ''}" data-id="${p.id}" ${e ? `data-y="${p.year}"` : ''} ${p.l != null ? `data-l="${p.l}"` : ''} tabindex="0" role="button" aria-label="${esc(label)}" transform="translate(${f(p.x)} ${f(p.y)})">${p.tick ? `<line class="tick" x1="0" y1="0" x2="${p.tick[0]}" y2="${p.tick[1]}"/>` : ''}<circle class="pc" r="${lm ? 4.5 : 7}"/><circle class="pd" r="${lm ? 1.5 : 2.6}"/>
      <text class="pl" x="${tx}" y="${sub ? -1 : 3}" text-anchor="${side > 0 ? 'start' : 'end'}">${esc(label)}</text>${sub ? `<text class="pl s" x="${tx}" y="10" text-anchor="${side > 0 ? 'start' : 'end'}">${sub}</text>` : ''}<circle class="pa" r="16"/></g>`
  }
})()
