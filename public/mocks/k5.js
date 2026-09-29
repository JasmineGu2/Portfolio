// Round 5 kit: ten ways to draw "the intersection of SWE, frontend, user experience and PM".
// Needs k2-data.js, k5-data.js, k2.js, k3.js (K.list, K.media, K.videos, K.lightbox, K.init) loaded first.
;(() => {
  const K = window.K, M = window.K5DATA, DI = M.disc
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const K5 = (window.K5 = {}), maps = (K5.maps = {})
  const W = 1200, H = 640, OR = '#ed3801', ids = DI.map((d) => d.id), dn = (id) => DI.find((d) => d.id === id)
  const EX = () => K.list().map((e) => ({ ...e, ev: M.ev[e.id], set: ids.filter((id) => M.ev[e.id][id]) }))
  const cut = (s, n = 26) => (s.length > n ? s.slice(0, n - 1) + '…' : s)
  const FIT = { 'hack-western': 'slice', 'ivey-product': 'slice' }
  const wrap = (inner, label, defs = '', cls = '') => `<svg class="${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}"><defs>${defs}</defs>${inner}</svg>`
  const logo = (e, x, y, w = 62, h = 42) => `<g class="lg" transform="translate(${x - w / 2} ${y - h / 2})"><rect width="${w}" height="${h}" rx="9" class="lgbg"/><svg x="5" y="5" width="${w - 10}" height="${h - 10}"><image href="${e.logo}" width="100%" height="100%" preserveAspectRatio="xMidYMid ${FIT[e.id] || 'meet'}"/></svg></g>`
  const pin = (e, x, y, o = {}) => {
    const many = e.set.length > 1, r = o.r || 9, anc = o.anchor || 'start'
    const shape = o.logos ? logo(e, x, y) : `<circle class="kdot${e.set.length === 4 ? ' all' : ''}" cx="${x}" cy="${y}" r="${many ? r + 3 : r}"/>`
    const tx = o.logos ? x : x + (anc === 'end' ? -(r + 13) : r + 13), ty = o.logos ? y + 38 : y - 2, a2 = o.logos ? 'middle' : anc
    return `<g class="pin${o.cls ? ' ' + o.cls : ''}" data-id="${e.id}" data-cursor-label="${e.label}" tabindex="0">${shape}<text class="tx pn" x="${tx}" y="${ty}" text-anchor="${a2}">${e.co}</text><text class="mu2" x="${tx}" y="${ty + 14}" text-anchor="${a2}">${cut(e.label, o.cut || 24)}</text></g>`
  }

  // ---------- side panel: what she did, in the site's words, per discipline ----------
  K5.panel = (el) => {
    const hint = '<p class="hint">Hover a pin to see what I did there. Click it for the video.</p>'
    const show = (e) => { el.innerHTML = `<div class="m" data-cursor-label="${e.label}">${K.media(e)}</div><h3>${e.co}</h3><p class="rl">${e.role} · ${e.when}</p><p class="sb">${e.sub}</p><p class="at">${e.set.length === 4 ? 'All four meet here' : 'Sits at ' + e.set.map((i) => dn(i).s).join(' + ')}</p><ul class="dl">${e.set.map((id) => `<li><b>${dn(id).n}</b><span>${e.ev[id].join(' · ')}</span></li>`).join('')}</ul>`; K.videos(el); $('.m', el).onclick = () => K.lightbox(e) }
    const list = (title, es) => { el.innerHTML = `<p class="hint"><b>${title}</b></p><ul class="pl">${es.map((e) => `<li>${e.co} · ${e.label}</li>`).join('') || '<li>Nothing here yet</li>'}</ul>` }
    el.innerHTML = hint
    return { show, list, reset: () => (el.innerHTML = hint) }
  }
  const wire = (stage, panel, hooks = {}) => {
    const by = Object.fromEntries(EX().map((e) => [e.id, e]))
    $$('.pin', stage).forEach((g) => { const e = by[g.dataset.id]; const on = () => { panel.show(e); hooks.enter && hooks.enter(e, g) }, off = () => hooks.leave && hooks.leave(e, g)
      g.addEventListener('mouseenter', on); g.addEventListener('focus', on); g.addEventListener('mouseleave', off); g.addEventListener('blur', off)
      if (!hooks.noclick) { g.addEventListener('click', () => K.lightbox(e)); g.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); K.lightbox(e) } }) } })
    return by
  }
  // dim everything that is not in discipline `d` (or everything not in all of the set `ds`)
  const focusSet = (stage, by, ds) => $$('.pin', stage).forEach((g) => g.classList.toggle('faded', !!ds.length && !ds.every((d) => by[g.dataset.id].set.includes(d))))

  // ---------- 1. metro strip: four tracks, an experience is a bar joining the tracks it touched ----------
  maps.strip = (stage, panel) => {
    const ex = EX().sort((a, b) => a.order - b.order), Y = { swe: 150, fe: 262, ux: 374, pm: 486 }, X = (i) => 214 + i * 94
    let g = '<text class="mu" x="1120" y="52" text-anchor="end">EARLIER → LATER</text>'
    DI.forEach((d) => (g += `<g class="trk" data-d="${d.id}"><line class="rd" x1="176" x2="1128" y1="${Y[d.id]}" y2="${Y[d.id]}"/><text class="tx lbl" x="26" y="${Y[d.id] + 4}">${d.n.toUpperCase()}</text></g>`))
    ex.forEach((e, i) => { const x = X(i), ys = e.set.map((id) => Y[id]), y1 = Math.min(...ys), y2 = Math.max(...ys)
      g += `<g class="pin" data-id="${e.id}" data-cursor-label="${e.label}" tabindex="0">`
      if (e.set.length === 4) g += `<rect class="ob" x="${x - 23}" y="${y1 - 26}" width="46" height="${y2 - y1 + 52}" rx="23"/>`
      else if (e.set.length > 1) g += `<rect class="kbar" x="${x - 6}" y="${y1}" width="12" height="${y2 - y1}" rx="6"/>`
      e.set.forEach((id) => (g += `<circle class="stn${e.set.length > 1 ? ' x' : ''}" cx="${x}" cy="${Y[id]}" r="${e.set.length > 1 ? 11 : 8}"/>`))
      g += `<foreignObject x="${x - 45}" y="548" width="90" height="84"><div xmlns="http://www.w3.org/1999/xhtml" class="fo"><b>${e.co}</b><span>${cut(e.label, 30)}</span></div></foreignObject></g>` })
    stage.innerHTML = wrap(g, 'Four tracks, one per discipline. Each experience is a bar across the tracks it touched.')
    const by = wire(stage, panel, { enter: (e) => { $$('.trk', stage).forEach((t) => t.classList.toggle('faded', !e.set.includes(t.dataset.d))) }, leave: () => $$('.trk', stage).forEach((t) => t.classList.remove('faded')) })
    $$('.trk', stage).forEach((t) => { t.addEventListener('mouseenter', () => { focusSet(stage, by, [t.dataset.d]); $$('.trk', stage).forEach((x) => x.classList.toggle('faded', x !== t)) }); t.addEventListener('mouseleave', () => { focusSet(stage, by, []); $$('.trk', stage).forEach((x) => x.classList.remove('faded')) }) })
  }

  // ---------- ring roads (four overlapping loops). Modes: cursor (region under the cursor), chips (intersection filter), time (slider) ----------
  const S = 1.25, ELL = () => M.venn.map((v, i) => ({ cx: 600 + (v.cx - 550) * S, cy: 326 + (v.cy - 342) * S, rx: v.rx * S, ry: v.ry * S, rot: v.rot, id: ids[i], r: (v.rot * Math.PI) / 180 }))
  const fEll = (e, x, y) => { const c = Math.cos(e.r), s = Math.sin(e.r), dx = x - e.cx, dy = y - e.cy, u = dx * c + dy * s, v = -dx * s + dy * c; return (u * u) / (e.rx * e.rx) + (v * v) / (e.ry * e.ry) }
  const memb = (L, x, y) => L.filter((e) => fEll(e, x, y) < 1).map((e) => e.id)
  const placeAll = (L, ex, rad) => { const placed = [], out = {}
    ;[...ex].sort((a, b) => b.set.length - a.set.length).forEach((e) => { let best = null, bm = -1
      for (let y = 34; y < H - 34; y += 6) for (let x = 50; x < W - 60; x += 6) { const m = memb(L, x, y); if (m.length !== e.set.length || !e.set.every((s) => m.includes(s))) continue
        if (placed.some((p) => Math.hypot(p[0] - x, p[1] - y) < rad)) continue
        const mg = Math.min(...L.map((el) => Math.abs(fEll(el, x, y) - 1))); if (mg > bm) { bm = mg; best = [x, y] } }
      out[e.id] = best || [600, 320]; placed.push(out[e.id]) })
    return out }
  maps.venn = (stage, panel, o = {}) => {
    const L = ELL(), ex = EX(), pos = placeAll(L, ex, o.logos ? 112 : 92), OFF = [10, 12, 60, 8]
    const tf = (e) => `rotate(${e.rot} ${e.cx} ${e.cy})`
    let defs = '', g = ''
    L.forEach((e, i) => (defs += `<clipPath id="vc${i}"><ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" transform="${tf(e)}"/></clipPath><path id="vp${i}" d="M${e.cx - e.rx} ${e.cy} A${e.rx} ${e.ry} 0 1 1 ${e.cx + e.rx} ${e.cy} A${e.rx} ${e.ry} 0 1 1 ${e.cx - e.rx} ${e.cy}"/>`))
    L.forEach((e) => (g += `<ellipse class="rf" cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" transform="${tf(e)}"/>`))
    g += `<g id="core" clip-path="url(#vc0)"><g clip-path="url(#vc1)"><g clip-path="url(#vc2)"><g clip-path="url(#vc3)"><rect width="${W}" height="${H}" fill="${OR}"/></g></g></g></g>`
    L.forEach((e, i) => (g += `<g class="kring" data-d="${e.id}" transform="${tf(e)}"><ellipse class="re" cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/><ellipse class="ri" cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/><ellipse class="rc" cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}"/><text class="krdl"><textPath href="#vp${i}" startOffset="${OFF[i]}%">${dn(e.id).n.toUpperCase()} ROAD</textPath></text></g>`))
    ex.forEach((e) => (g += pin(e, pos[e.id][0], pos[e.id][1], { logos: o.logos, cls: e.set.length === 4 ? 'onor' : '', cut: 22 })))
    g += '<text class="mu" x="1180" y="618" text-anchor="end">ORANGE = ALL FOUR ROADS MEET</text>'
    stage.innerHTML = wrap(g, 'Four ring roads for the four disciplines. Where they overlap is where an experience sits.', defs) + '<div class="k5-now" id="now"></div>'
    const by = wire(stage, panel, { enter: (e) => $$('.kring', stage).forEach((r) => r.classList.toggle('on', e.set.includes(r.dataset.d))), leave: () => $$('.kring', stage).forEach((r) => r.classList.remove('on')) })
    const svg = $('svg', stage), now = $('#now', stage)
    if (o.mode === 'cursor') { now.textContent = 'MOVE OVER THE MAP: WHICH ROADS ARE YOU ON?'
      stage.addEventListener('mousemove', (ev) => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); const m = memb(L, q.x, q.y)
        now.textContent = m.length ? 'ON ' + m.map((i) => dn(i).s).join(' + ') : 'OFF THE ROADS'; focusSet(stage, by, m); $$('.kring', stage).forEach((r) => r.classList.toggle('on', m.includes(r.dataset.d))) })
      stage.addEventListener('mouseleave', () => { now.textContent = 'MOVE OVER THE MAP: WHICH ROADS ARE YOU ON?'; focusSet(stage, by, []); $$('.kring', stage).forEach((r) => r.classList.remove('on')) }) }
    if (o.mode === 'chips') { const ctl = $('#ctl'), act = new Set(); ctl.innerHTML = DI.map((d) => `<button type="button" class="q-pill" data-d="${d.id}">${d.n}</button>`).join('') + '<span class="cap2" id="cnt">Pick roads to see who sits on all of them.</span>'
      ctl.onclick = (ev) => { const b = ev.target.closest('button'); if (!b) return; act.has(b.dataset.d) ? act.delete(b.dataset.d) : act.add(b.dataset.d); b.classList.toggle('on', act.has(b.dataset.d))
        const s = [...act]; focusSet(stage, by, s); $$('.kring', stage).forEach((r) => r.classList.toggle('on', act.has(r.dataset.d))); const hit = ex.filter((e) => s.every((d) => e.set.includes(d)))
        $('#cnt').textContent = s.length ? `${hit.length} of ${ex.length} experiences sit on ${s.map((i) => dn(i).s).join(' + ')}` : 'Pick roads to see who sits on all of them.'; panel.list(s.length ? 'On ' + s.map((i) => dn(i).s).join(' + ') : 'All experiences', hit) } }
    if (o.mode === 'time') { const ordered = [...ex].sort((a, b) => a.order - b.order), ctl = $('#ctl'); ctl.innerHTML = `<button type="button" class="q-pill" id="pl">Play</button><input id="sl" type="range" min="0" max="${ordered.length}" value="0" aria-label="Step through my experiences in order"><span class="cap2" id="cp"></span>`
      const core = $('#core', stage), apply = (n) => { const seen = ordered.slice(0, n), on = new Set(seen.flatMap((e) => e.set))
        $$('.pin', stage).forEach((g) => (g.style.opacity = seen.some((e) => e.id === g.dataset.id) ? 1 : 0.0)); $$('.kring', stage).forEach((r) => r.classList.toggle('off', !on.has(r.dataset.d))); core.style.opacity = seen.some((e) => e.set.length === 4) ? 1 : 0
        $('#cp').textContent = n ? `${n}/${ordered.length}  ${seen[n - 1].co} · ${seen[n - 1].when}` : 'Slide to walk through my experiences in order.'; if (n) panel.show(seen[n - 1]) }
      const sl = $('#sl'); sl.oninput = () => apply(+sl.value); let t = null; $('#pl').onclick = () => { if (t) { clearInterval(t); t = null; $('#pl').textContent = 'Play'; return } $('#pl').textContent = 'Pause'; if (+sl.value >= ordered.length) sl.value = 0; t = setInterval(() => { sl.value = +sl.value + 1; apply(+sl.value); if (+sl.value >= ordered.length) { clearInterval(t); t = null; $('#pl').textContent = 'Play' } }, 1500) }
      core.style.transition = 'opacity .5s'; $$('.pin', stage).forEach((g) => (g.style.transition = 'opacity .5s')); apply(0) }
  }

  // ---------- site plan: four streets in a # ; blocks are named by the streets that border them ----------
  maps.plan = (stage, panel, o = {}) => {
    const ex = EX(), RD = { swe: { o: 'h', p: 170 }, ux: { o: 'h', p: 470 }, fe: { o: 'v', p: 380 }, pm: { o: 'v', p: 820 } }, xs = [0, 380, 820, W], ys = [0, 170, 470, H], hw = 13
    const colSet = [['fe'], ['fe', 'pm'], ['pm']], rowSet = [['swe'], ['swe', 'ux'], ['ux']]
    let g = ''
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const set = ids.filter((id) => colSet[i].includes(id) || rowSet[j].includes(id)), x = xs[i] + (i ? hw : 0), y = ys[j] + (j ? hw : 0), w = xs[i + 1] - xs[i] - (i ? hw : 0) - (i < 2 ? hw : 0), h = ys[j + 1] - ys[j] - (j ? hw : 0) - (j < 2 ? hw : 0)
      g += `<g class="blk${set.length === 4 ? ' all' : ''}" data-k="${set.join(',')}"><rect class="bf" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="mu bl" x="${x + 14}" y="${y + 24}">${set.map((s) => dn(s).s).join(' + ')}${set.length === 4 ? ' · ALL FOUR' : ''}</text></g>` }
    g += `<text class="jg" x="${xs[1] + 36}" y="${ys[2] - 44}" style="pointer-events:none">JASMINE GU</text>`
    ids.forEach((id) => { const r = RD[id]; g += r.o === 'h'
      ? `<g class="rdg" data-d="${id}"><rect class="rdb" x="0" y="${r.p - hw}" width="${W}" height="${hw * 2}"/><line class="rdc" x1="0" x2="${W}" y1="${r.p}" y2="${r.p}"/><text class="rn" x="120" y="${r.p + 4}" text-anchor="middle">${dn(id).s} AVE</text></g>`
      : `<g class="rdg" data-d="${id}"><rect class="rdb" x="${r.p - hw}" y="0" width="${hw * 2}" height="${H}"/><line class="rdc" x1="${r.p}" x2="${r.p}" y1="0" y2="${H}"/><text class="rn" transform="translate(${r.p + 4} 320) rotate(-90)" text-anchor="middle">${dn(id).s} AVE</text></g>` })
    const P = { 'hack-western': [600, 262], tesla: [96, 262], intuit: [96, 380], autodesk: [880, 262], 'stealth-startup': [880, 380], omers: [880, 90], western: [1030, 90], metaverse: [470, 170], 'autodesk-eng': [700, 170], 'ivey-product': [820, 560] }
    ex.forEach((e) => (g += pin(e, P[e.id][0], P[e.id][1], { logos: o.logos, cls: e.set.length === 4 ? 'onor' : '', cut: 22 })))
    stage.innerHTML = wrap(g, 'A site plan: four streets cross in a hash. The center block, bordered by all four, is orange.')
    const by = wire(stage, panel, { enter: (e) => { const ks = $$('.blk', stage); ks.forEach((b) => b.classList.toggle('hot', !!b.dataset.k && b.dataset.k.split(',').length === e.set.length && e.set.every((d) => b.dataset.k.includes(d)) && !b.classList.contains('all'))) }, leave: () => $$('.blk', stage).forEach((b) => b.classList.remove('hot')) })
    if (o.hover === 'road') $$('.rdg', stage).forEach((r) => { r.addEventListener('mouseenter', () => { focusSet(stage, by, [r.dataset.d]); $$('.rdg', stage).forEach((x) => { x.classList.toggle('hot', x === r); x.classList.toggle('faded', x !== r) }) }); r.addEventListener('mouseleave', () => { focusSet(stage, by, []); $$('.rdg', stage).forEach((x) => x.classList.remove('hot', 'faded')) }) })
    else $$('.blk', stage).forEach((b) => { b.addEventListener('mouseenter', () => { const s = b.dataset.k.split(','); b.classList.add('hot'); $$('.rdg', stage).forEach((r) => r.classList.toggle('hot', s.includes(r.dataset.d))); panel.list('Block on ' + s.map((d) => dn(d).s).join(' + '), ex.filter((e) => e.set.length === s.length && s.every((d) => e.set.includes(d)))) }); b.addEventListener('mouseleave', () => { b.classList.remove('hot'); $$('.rdg', stage).forEach((r) => r.classList.remove('hot')) }) })
  }

  // ---------- city grid: avenues are disciplines, streets are experiences, orange blocks where they cross ----------
  maps.grid = (stage, panel, o = {}) => {
    const ex = EX().sort((a, b) => b.set.length - a.set.length || a.order - b.order), AX = { swe: 600, fe: 760, ux: 920, pm: 1080 }, y0 = 108, dy = 50
    let g = ''
    ids.forEach((id) => (g += `<g class="ave" data-d="${id}"><rect class="rdb" x="${AX[id] - 8}" y="68" width="16" height="${dy * ex.length + 48}"/><text class="mu lbl" x="${AX[id]}" y="50" text-anchor="middle">${dn(id).s} AVE</text></g>`))
    ex.forEach((e, i) => { const y = y0 + i * dy
      g += `<g class="pin st" data-id="${e.id}" data-cursor-label="${e.label}" tabindex="0"><rect class="rdb" x="330" y="${y - 8}" width="${W - 350}" height="16"/>`
      ids.forEach((id) => { g += e.set.includes(id) ? `<rect class="ob" x="${AX[id] - 16}" y="${y - 16}" width="32" height="32" rx="6"/>` : `<rect class="xs" x="${AX[id] - 8}" y="${y - 8}" width="16" height="16"/>` })
      g += `${logo(e, 62, y, 56, 36)}<text class="tx pn" x="104" y="${y - 3}">${e.co}</text><text class="mu2" x="104" y="${y + 11}">${cut(e.label, 30)}</text></g>` })
    stage.innerHTML = wrap(g, 'A city grid. Avenues are disciplines, streets are experiences, orange blocks are where they cross.')
    const by = wire(stage, panel)
    $$('.ave', stage).forEach((a) => { a.addEventListener('mouseenter', () => { focusSet(stage, by, [a.dataset.d]); a.classList.add('hot') }); a.addEventListener('mouseleave', () => { focusSet(stage, by, []); a.classList.remove('hot') }) })
  }

  // ---------- contour: rings by how many of the four an experience touches; the center is all four ----------
  maps.contour = (stage, panel) => {
    const ex = EX(), cx = 600, cy = 322, R = { 4: 62, 3: 150, 2: 226, 1: 290, 0: 290 }, AXA = { fe: -90, ux: 0, pm: 90, swe: 180 }, rad = (d) => (d * Math.PI) / 180
    const ax = (id, r) => [cx + r * Math.cos(rad(AXA[id])), cy + r * Math.sin(rad(AXA[id]))], NAME = { 1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'ALL FOUR' }
    let g = ''
    ;[1, 2, 3, 4].forEach((n) => (g += `<circle class="ct c${n}" cx="${cx}" cy="${cy}" r="${R[n]}"/>`))
    ;[1, 2, 3].forEach((n) => (g += `<text class="mu" x="${cx + R[n] * 0.7 + 4}" y="${cy + R[n] * 0.7 + 4}">${NAME[n]}</text>`))
    ids.forEach((id) => { const [x, y] = ax(id, 290), [lx, ly] = ax(id, 312); g += `<line class="axl" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/><text class="tx lbl" x="${lx}" y="${ly + 4}" text-anchor="${id === 'swe' ? 'end' : id === 'ux' ? 'start' : 'middle'}">${dn(id).n.toUpperCase()}</text>` })
    g += '<polygon class="fp" id="fp" points="" style="opacity:0"/>'
    const grp = {}; ex.forEach((e) => (grp[e.set.join()] = (grp[e.set.join()] || []).concat(e)))
    ex.forEach((e) => { const n = e.set.length; let x = cx, y = cy; if (n < 4) { let sx = 0, sy = 0; e.set.forEach((id) => { sx += Math.cos(rad(AXA[id])); sy += Math.sin(rad(AXA[id])) }); const list = grp[e.set.join()]; const k = list.indexOf(e); let a = Math.atan2(sy, sx) + (k - (list.length - 1) / 2) * 0.62; e.anc = list.length > 1 ? (k === 0 ? 'end' : 'start') : 'start'; const r = (R[n] + R[n + 1 > 4 ? 4 : n + 1]) / 2; x = cx + r * Math.cos(a); y = cy + r * Math.sin(a) }
      g += pin(e, x, y, { cls: n === 4 ? 'onor' : '', cut: 20, anchor: n === 4 ? 'start' : (e.anc || (x < cx ? 'end' : 'start')) }) })
    stage.innerHTML = wrap(g, 'Contour map. Rings show how many of the four disciplines an experience touches. The center touches all four.')
    const order = ['fe', 'ux', 'pm', 'swe'], fp = $('#fp', stage)
    wire(stage, panel, { enter: (e) => { const pts = order.filter((id) => e.set.includes(id)).map((id) => ax(id, 290)); fp.setAttribute('points', pts.length === 1 ? `${cx},${cy} ${pts[0].join()} ${cx + 1},${cy + 1}` : pts.map((p) => p.join()).join(' ')); fp.style.opacity = 1 }, leave: () => (fp.style.opacity = 0) })
  }

  // ---------- constellation: four hubs, orange center, experiences pulled toward the hubs they touch; drag them ----------
  maps.net = (stage, panel) => {
    const hubs = { swe: [170, 150], fe: [1030, 150], ux: [170, 490], pm: [1030, 490] }, C = [600, 320], ex = EX(), P = {}
    ex.forEach((e, i) => { let x = 0, y = 0; e.set.forEach((id) => { x += hubs[id][0]; y += hubs[id][1] }); P[e.id] = [x / e.set.length + Math.cos(i * 2.4) * 34, y / e.set.length + Math.sin(i * 2.4) * 34] })
    for (let it = 0; it < 160; it++) ex.forEach((a) => { ex.forEach((b) => { if (a === b) return; const dx = P[a.id][0] - P[b.id][0], dy = P[a.id][1] - P[b.id][1], d = Math.hypot(dx, dy) || 0.1; if (d < 118) { const k = (118 - d) * 0.12; P[a.id][0] += (dx / d) * k; P[a.id][1] += (dy / d) * k } })
      const cx = P[a.id][0] - C[0], cy = P[a.id][1] - C[1], cd = Math.hypot(cx, cy) || 0.1; if (cd < 150) { P[a.id][0] = C[0] + (cx / cd || 1) * 150; P[a.id][1] = C[1] + (cy / cd || 0.5) * 150 }
      P[a.id][0] = Math.max(70, Math.min(W - 70, P[a.id][0])); P[a.id][1] = Math.max(50, Math.min(H - 60, P[a.id][1])) })
    let g = ''
    ex.forEach((e) => e.set.forEach((id) => (g += `<line class="ed" data-e="${e.id}" data-d="${id}" x1="${P[e.id][0]}" y1="${P[e.id][1]}" x2="${hubs[id][0]}" y2="${hubs[id][1]}"/>`)))
    ids.forEach((id) => (g += `<circle class="hub" cx="${hubs[id][0]}" cy="${hubs[id][1]}" r="50"/><text class="hubt" x="${hubs[id][0]}" y="${hubs[id][1] + 4}" text-anchor="middle">${dn(id).s}</text><text class="mu" x="${hubs[id][0]}" y="${hubs[id][1] + 72}" text-anchor="middle">${dn(id).n.toUpperCase()}</text>`))
    g += `<circle class="hub c" cx="${C[0]}" cy="${C[1]}" r="52"/><text class="hubt" x="${C[0]}" y="${C[1] - 2}" text-anchor="middle">JASMINE</text><text class="hubt" x="${C[0]}" y="${C[1] + 14}" text-anchor="middle">GU</text>`
    ex.forEach((e) => (g += `<g class="pin drg" data-id="${e.id}" data-cursor-label="${e.label}" tabindex="0" transform="translate(${P[e.id][0]} ${P[e.id][1]})"><circle class="kdot" r="${e.set.length > 1 ? 13 : 10}"/><text class="tx pn" x="${P[e.id][0] < C[0] ? -18 : 18}" y="-2" text-anchor="${P[e.id][0] < C[0] ? 'end' : 'start'}">${e.co}</text><text class="mu2" x="${P[e.id][0] < C[0] ? -18 : 18}" y="12" text-anchor="${P[e.id][0] < C[0] ? 'end' : 'start'}">${cut(e.label, 22)}</text></g>`))
    stage.innerHTML = wrap(g, 'Constellation. Four hubs, one per discipline. Experiences hang between the hubs they touch. Drag them.')
    const svg = $('svg', stage), by = wire(stage, panel, { noclick: true, enter: (e) => $$('.ed', stage).forEach((l) => l.classList.toggle('on', l.dataset.e === e.id)), leave: () => $$('.ed', stage).forEach((l) => l.classList.remove('on')) })
    $$('.pin', stage).forEach((n) => { let drag = null, moved = 0; const e = by[n.dataset.id]
      const pt = (ev) => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()) }
      n.addEventListener('pointerdown', (ev) => { n.setPointerCapture(ev.pointerId); const q = pt(ev); drag = { dx: q.x - P[e.id][0], dy: q.y - P[e.id][1] }; moved = 0 })
      n.addEventListener('pointermove', (ev) => { if (!drag) return; const q = pt(ev), x = Math.max(40, Math.min(W - 40, q.x - drag.dx)), y = Math.max(40, Math.min(H - 40, q.y - drag.dy)); moved += Math.abs(x - P[e.id][0]) + Math.abs(y - P[e.id][1]); P[e.id] = [x, y]; n.setAttribute('transform', `translate(${x} ${y})`); $$(`.ed[data-e="${e.id}"]`, stage).forEach((l) => { l.setAttribute('x1', x); l.setAttribute('y1', y) }) })
      const up = () => { if (drag && moved < 6) K.lightbox(e); drag = null }; n.addEventListener('pointerup', up); n.addEventListener('pointercancel', () => (drag = null)) })
  }

  // ---------- isometric city: height = how many of the four it touches; four stripes show which ----------
  maps.iso = (stage, panel) => {
    const ex = EX(), by = Object.fromEntries(ex.map((e) => [e.id, e])), LAT = [['ivey-product', 'metaverse', 'omers', 'western', 'autodesk-eng'], ['tesla', 'intuit', 'hack-western', 'autodesk', 'stealth-startup']], sx = 118, sy = 59, hw = 90, hh = 45, cx0 = 600, cy0 = 340
    const cells = []; LAT.forEach((row, j) => row.forEach((id, i) => cells.push({ e: by[id], i, j }))); cells.sort((a, b) => a.i + a.j - (b.i + b.j) || a.i - b.i)
    const P = (a) => a.map((q) => q.map((n) => n.toFixed(1)).join(',')).join(' ')
    let g = `<polygon class="gnd" points="${P([[cx0, cy0 - 270], [cx0 + 560, cy0 + 10], [cx0, cy0 + 285], [cx0 - 560, cy0 + 10]])}"/>`
    cells.forEach(({ e, i, j }) => { const x = cx0 + (i - j - 1.5) * sx, y = cy0 + (i + j - 2.5) * sy, n = e.set.length, h = 26 + n * 44, all = n === 4
      const top = [[x, y - hh - h], [x + hw, y - h], [x, y + hh - h], [x - hw, y - h]], left = [[x - hw, y - h], [x, y + hh - h], [x, y + hh], [x - hw, y]], right = [[x, y + hh - h], [x + hw, y - h], [x + hw, y], [x, y + hh]]
      const cT = all ? '#ed3801' : ['', '#f3f4f5', '#e6e8ea', '#d9dcdf'][n], cL = all ? '#c22e01' : '#c4c7cb', cR = all ? '#a02501' : '#adb1b6'
      let s = ''; ids.forEach((id, k) => { if (!e.set.includes(id)) return; const t0 = k / 4 + 0.04, t1 = (k + 1) / 4 - 0.04, pt = (t, dyv) => [x - hw + hw * t, y - h + hh * t + dyv], qt = (t, dyv) => [x - hw + hw * t, y + hh * t + dyv]; s += `<polygon points="${P([pt(t0, 12), pt(t1, 12), qt(t1, -12), qt(t0, -12)])}" fill="${all ? '#fff' : '#1f2124'}"/>` })
      g += `<g class="pin" data-id="${e.id}" data-cursor-label="${e.label}" tabindex="0"><polygon points="${P(left)}" fill="${cL}"/><polygon points="${P(right)}" fill="${cR}"/>${s}<polygon points="${P(top)}" fill="${cT}" stroke="#fff" stroke-opacity=".6"/><text class="pn" x="${x}" y="${y - h + 4}" text-anchor="middle" style="fill:${all ? '#fff' : '#1f2124'};stroke:none">${e.co}</text></g>` })
    g += '<text class="mu" x="40" y="592">HEIGHT = HOW MANY OF THE FOUR IT TOUCHES</text><text class="mu" x="40" y="612">STRIPES, LEFT TO RIGHT: SWE · FE · UX · PM</text>'
    stage.innerHTML = wrap(g, 'Isometric city. Taller blocks touch more of the four disciplines.', '', 'iso')
    wire(stage, panel)
  }

  // ---------- mount ----------
  K5.mount = (kind, o = {}) => {
    const wrapEl = $('#stagewrap'); wrapEl.dataset.skin = o.skin || 'navy'
    const panel = K5.panel($('#panel')); maps[kind]($('#stage'), panel, o)
    K.init({ rulers: false, bar: /[?&#]tools/.test(location.search) }); K.theme('pencil')
  }
})()
