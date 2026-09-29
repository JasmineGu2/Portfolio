// Round 2 kit. Load after k2-data.js. Pages call K.init() last.
;(() => {
  const D = window.K2, K = (window.K = {}), $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const root = document.documentElement
  try { const t = localStorage.getItem('k2-theme'); if (t) root.dataset.theme = t } catch {}

  // ---------- icons (Email, LinkedIn, GitHub, Résumé) ----------
  const P = {
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  }
  K.icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`
  K.socials = (only) => `<span class="soc">${[['mail', 'mailto:' + D.contact.email, 'Email'], ['linkedin', D.contact.linkedin, 'LinkedIn'], ['github', D.contact.github, 'GitHub'], ['file', D.contact.resume, 'Résumé']]
    .filter(([i]) => !only || only.includes(i)).map(([i, h, t]) => `<a class="ib" href="${h}" ${h.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${t}" title="${t}">${K.icon(i)}</a>`).join('')}</span>`

  // ---------- blueprint header / footer title blocks ----------
  K.header = (active = 0) => `<header class="hdr"><div class="in"><div class="cell"><span class="l">Project</span><span class="v">JASMINE GU · PORTFOLIO</span></div>
    <nav><a class="${active === 0 ? 'on' : ''}" href="#work">A-101 · Work</a><a class="${active === 1 ? 'on' : ''}" href="#journey">A-102 · The Journey</a></nav>
    <div class="cell"><span class="l">Rev · Scale · Sheet</span><span class="v">A · 1:1 · 1/2</span></div></div></header>`
  K.footer = () => `<footer class="ftr"><div class="in"><div class="cell"><span class="l">Drawn by</span><span class="v">JASMINE GU</span></div><div class="cell"><span class="l">Location</span><span class="v">TORONTO</span></div>
    <div class="cell"><span class="l">Contact</span>${K.socials()}</div><div class="cell"><span class="l">Scale</span><div class="scale"><i></i><i></i><i></i><i></i></div></div>
    <div class="cell"><span class="l">North</span><svg class="narrow" viewBox="0 0 26 34" fill="none" stroke="#e8f1ff" stroke-width="1.6"><path d="M13 2 21 28 13 22 5 28Z"/></svg></div><div class="cell"><span class="l">Sheet</span><span class="v">2 / 2</span></div></div></footer>`
  K.dim = (t) => `<div class="dim"><span>${t}</span></div>`
  K.bub = (a, b = 'A-101') => `<span class="bub"><b>${a}</b>${b}</span>`

  // ---------- notes, polaroids, folders ----------
  K.sticky = (i, cls = '', r = -2) => `<div class="stk ${cls}" data-drag style="--r:${r}deg"><span class="tape2"></span><small>placeholder note</small>${D.facts[i % D.facts.length]}</div>`
  K.pols = (n = 5, from = 0) => D.photos.slice(from, from + n).map(([s, c], i) => `<div class="pol" data-drag style="--r:${[-4, 3, -2, 5, -3, 2][i % 6]}deg"><span class="tape2"></span><img src="${s}" alt="${c}" loading="lazy"><i>${c}</i></div>`).join('')
  K.fol = (i = 0, label = 'fun fact') => `<div class="fol" data-fol><div class="back"></div><div class="tabf"></div><div class="pap"><small>placeholder note</small><span>${D.facts[i % D.facts.length]}</span></div><div class="front">${label}</div></div>`
  document.addEventListener('click', (e) => { const f = e.target.closest('[data-fol]'); if (f) f.classList.toggle('open') })

  // ---------- tiles: the site's tile (media, name, subtitle, 3 tags), orange cursor label per role ----------
  K.order = ['tesla', 'autodesk', 'autodesk-eng', 'intuit', 'omers', 'metaverse', 'stealth-startup', 'hack-western', 'ivey-product']
  K.list = () => K.order.map((id) => D.exp.find((e) => e.id === id))
  // autoplay + muted + playsinline in the markup (iOS reads the attributes, not the properties); the poster is the clip's first frame (public/work/*-poster.jpg)
  K.media = (e) => (e.video ? `<video muted loop playsinline autoplay preload="none" poster="${e.video.replace(/\.mp4$/, '-poster.jpg')}" data-src="${e.video}"></video>` : `<img src="${e.img}" alt="${e.co}" loading="lazy">`)
  K.tile = (e) => `<article class="tile" data-id="${e.id}" data-when="${e.when}" data-cursor-label="${e.label}"><div class="m">${K.media(e)}</div><div class="co"><span>${e.co}</span></div><p class="sub">${e.sub}</p><div class="tg">${e.tags.map((t) => `<span>${t}</span>`).join('')}</div></article>`
  K.tiles = (el, { tabs = false } = {}) => {
    let g = 'All'
    el.innerHTML = (tabs ? `<div class="tabs">${['All', 'Engineering', 'Product', 'Other'].map((n) => `<button data-g="${n}" class="${n === g ? 'on' : ''}">${n}</button>`).join('')}</div>` : '') + '<div class="tiles"></div>'
    const box = $('.tiles', el), draw = () => { box.innerHTML = K.list().filter((e) => g === 'All' || e.group === g).map(K.tile).join(''); K.videos(box) }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (!b) return; g = b.dataset.g; $$('[data-g]', el).forEach((x) => x.classList.toggle('on', x === b)); draw() })
    draw()
  }

  // videos: attach the source when near the viewport (the 13 MB Tesla clip too), autoplay muted while visible
  const attach = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (e.isIntersecting && !v.src) { v.src = v.dataset.src; v.preload = 'metadata' } }), { rootMargin: '900px 0px' })
  const play = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (!v.src) return; e.isIntersecting ? v.play().catch(() => {}) : v.pause() }), { threshold: 0.2 })
  // on the Next site, the root layout's VideoAutoplay (window.pfVideoAutoplay) loads and plays every video[autoplay]; these observers only serve the standalone mock pages
  K.videos = (r = document) => { if (window.pfVideoAutoplay) return; $$('video[data-src]', r).forEach((v) => { attach.observe(v); play.observe(v) }) }

  // ---------- exploded layers, note modes: sticky | call (blueprint callout) | both ----------
  K.layers = (el, mode = 'sticky', opts = {}) => {
    const L = D.layers, W = 170, H = 68, T = 14, cx = 330, ys = [96, 222, 348, 474], nx = 570, pts = (y) => `${cx},${y - H} ${cx + W},${y} ${cx},${y + H} ${cx - W},${y}`
    const guides = [cx - W, cx + W].map((x, k) => `<line class="guide fade" style="--d:${.9 + k * .1}s" x1="${x}" y1="${ys[0]}" x2="${x}" y2="${ys[3] + T}"/>`).join('') + `<line class="guide fade" style="--d:1.1s" x1="${cx}" y1="${ys[0] + H}" x2="${cx}" y2="${ys[3] + H + T}"/>`
    const slab = (l, i) => { const y = ys[i], d = 0.2 + i * 0.25; return `<g class="lay-g" data-i="${i}" style="--c:${l.color}">
      <polygon class="fillA fade" style="--d:${d + .9}s" points="${pts(y)}"/><polygon class="sideA fade" style="--d:${d + .9}s" points="${cx - W},${y} ${cx},${y + H} ${cx},${y + H + T} ${cx - W},${y + T}"/><polygon class="sideB fade" style="--d:${d + .9}s" points="${cx},${y + H} ${cx + W},${y} ${cx + W},${y + T} ${cx},${y + H + T}"/>
      <polygon class="ln draw" pathLength="1" style="--d:${d}s" points="${pts(y)}"/><path class="ln draw" pathLength="1" style="--d:${d + .3}s" d="M${cx - W} ${y}v${T}L${cx} ${y + H + T}L${cx + W} ${y + T}V${y}M${cx} ${y + H}v${T}"/>
      <ellipse class="ln draw" pathLength="1" style="--d:${d + .7}s" cx="${cx}" cy="${y}" rx="58" ry="23"/><ellipse class="ln draw" pathLength="1" style="--d:${d + .8}s" cx="${cx}" cy="${y}" rx="20" ry="8"/>
      <circle class="fade" style="--d:${d + 1.2}s" cx="${cx - W}" cy="${y}" r="4.5" fill="${l.color}" stroke="#e8f1ff"/>
      ${l.short.map((s, k) => `<text class="lab fade" style="--d:${d + 1.3}s" text-anchor="end" x="${cx - W - 14}" y="${y - 2 + k * 15 - (l.short.length - 1) * 7}">${s}</text>`).join('')}<text class="sub2 fade" style="--d:${d + 1.4}s" text-anchor="end" x="${cx - W - 14}" y="${y + 24}">LAYER 0${i + 1}</text></g>` }
    const fh = () => (mode === 'both' ? 320 : 190)
    el.innerHTML = `<div class="bpp">${opts.bare ? '' : '<div class="label"><span>Fig. 02 · exploded view · four layers</span><span>hover a layer</span></div>'}<svg viewBox="0 0 960 600">${guides}${L.map(slab).join('')}<path class="leader" d=""/><foreignObject x="${nx}" y="10" width="370" height="${fh()}" style="overflow:visible"><div class="nt"></div></foreignObject></svg></div>`
    const nt = $('.nt', el), fo = $('foreignObject', el), ld = $('.leader', el), gs = $$('.lay-g', el)
    const prompt = () => { nt.className = 'nt' + (mode === 'call' ? ' call' : ''); nt.style.setProperty('--c', '#ffe98a'); nt.innerHTML = `<small>${mode === 'call' ? 'DETAIL / A-101' : 'placeholder note'}</small>Four layers. Hover one and I'll tell you what's in it.`; fo.setAttribute('y', 10); fo.setAttribute('height', fh()); ld.classList.remove('on') }
    const show = (i) => { const l = L[i], y = ys[i]; nt.className = 'nt' + (mode === 'call' ? ' call' : ''); nt.style.setProperty('--c', l.color)
      nt.innerHTML = `<small>${mode === 'call' ? 'DETAIL 0' + (i + 1) + ' / A-101 · ' : 'placeholder note · '}${l.label}</small><ul>${l.items.map((x) => `<li><b>${x[0]}</b>, ${x[1]}: ${x[2]}</li>`).join('')}</ul>` + (mode === 'both' ? `<div class="nt call" style="margin-top:8px"><small>Capabilities</small>${l.caps}</div>` : '')
      const ny = Math.max(6, Math.min(y - 50, 600 - fh())); fo.setAttribute('y', ny); fo.setAttribute('height', fh()); ld.setAttribute('d', `M${cx + W} ${y} H${cx + W + 44} L${nx - 6} ${ny + 26}`); ld.classList.add('on') }
    gs.forEach((g) => { g.addEventListener('mouseenter', () => { gs.forEach((x) => x.classList.toggle('on', x === g)); $('.bpp', el).classList.add('dimm'); show(+g.dataset.i) })
      g.addEventListener('mouseleave', () => { g.classList.remove('on'); $('.bpp', el).classList.remove('dimm') }); g.addEventListener('click', () => show(+g.dataset.i)) })
    prompt()
    return { set(m) { mode = m; prompt() } }
  }

  // ---------- switcher panel: segmented buttons that set body[data-key] ----------
  K.switches = (defs, onChange) => {
    const el = document.createElement('div'); el.className = 'k2sw'
    el.innerHTML = defs.map((d) => `<div class="g"><b>${d.label}</b>${d.opts.map(([v, t]) => `<button data-k="${d.key}" data-v="${v}">${t}</button>`).join('')}</div>`).join('')
    document.body.append(el)
    const set = (k, v) => { document.body.dataset[k] = v; $$(`[data-k="${k}"]`, el).forEach((b) => b.classList.toggle('on', b.dataset.v === v)); onChange && onChange(k, v) }
    el.onclick = (e) => { const b = e.target.closest('button'); if (b) set(b.dataset.k, b.dataset.v) }
    defs.forEach((d) => set(d.key, d.def || d.opts[0][0]))
    return set
  }

  // ---------- lightbox for a large video ----------
  K.lightbox = (e) => { let lb = $('.lb'); if (!lb) { lb = document.createElement('div'); lb.className = 'lb'; document.body.append(lb); lb.onclick = (ev) => { if (!ev.target.closest('.in') || ev.target.closest('[data-x]')) { lb.classList.remove('on'); lb.innerHTML = '' } }
      addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { lb.classList.remove('on'); lb.innerHTML = '' } }) }
    lb.innerHTML = `<div class="in" data-cursor-label="${e.label}">${e.video ? `<video src="${e.video}" muted loop playsinline autoplay controls></video>` : `<img src="${e.img}" alt="${e.co}">`}<div class="tx"><h3>${e.co}</h3><p class="muted">${e.role} · ${e.when}</p><p style="margin:8px 0 10px">${e.sub}</p><div class="tile"><div class="tg">${e.tags.map((t) => `<span>${t}</span>`).join('')}</div></div></div></div>`
    lb.classList.add('on'); const v = $('video', lb); if (v) v.play().catch(() => {})
  }

  // ---------- init: rulers, page bar, cursor, drag ----------
  K.init = ({ rulers = true, bar: showBar = true } = {}) => {
    if (rulers) { const t = document.createElement('div'); t.className = 'rul-t'; t.innerHTML = 'ABCDEFGH'.split('').map((c) => `<span>${c}</span>`).join(''); const l = document.createElement('div'); l.className = 'rul-l'; l.innerHTML = Array.from({ length: 12 }, (_, i) => `<span>${i + 1}</span>`).join(''); document.body.prepend(t, l) }
    const bar = document.createElement('div'); bar.className = 'k2bar'; bar.innerHTML = `<a href="index.html">all mocks</a><span>${(document.title.split('·')[1] || '').trim()}</span><button type="button"></button>`
    const btn = $('button', bar), paint = () => (btn.textContent = root.dataset.theme === 'blueprint' ? 'go pencil' : 'go blueprint'); paint()
    btn.onclick = () => { root.dataset.theme = root.dataset.theme === 'blueprint' ? 'pencil' : 'blueprint'; try { localStorage.setItem('k2-theme', root.dataset.theme) } catch {}; paint() }
    if (showBar) document.body.append(bar)

    let z = 50
    $$('[data-drag]').forEach((el) => { let sx = 0, sy = 0, ox = 0, oy = 0, on = false; el.style.touchAction = 'none'
      el.addEventListener('pointerdown', (e) => { if (e.target.closest('a,button')) return; on = true; sx = e.clientX; sy = e.clientY; el.setPointerCapture(e.pointerId); el.style.zIndex = ++z })
      el.addEventListener('pointermove', (e) => { if (on) el.style.translate = `${ox + e.clientX - sx}px ${oy + e.clientY - sy}px` })
      el.addEventListener('pointerup', (e) => { if (!on) return; on = false; ox += e.clientX - sx; oy += e.clientY - sy }) })
    K.videos(); K.cursor()
  }

  // ---------- cursor: port of SiteCursor.tsx. Dark-blue dot; orange arrow + orange tag over [data-cursor-label] ----------
  K.cursor = () => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    // The site's React SiteCursor owns the cursor there (it sets window.pfSiteCursor): never build a second one.
    if (window.pfSiteCursor) { $$('.k2c').forEach((n) => n.remove()); return }
    const c = document.createElement('div'); c.className = 'k2c'
    c.innerHTML = '<div class="box"><i class="dot"></i><svg class="arw" width="22" height="26" viewBox="0 0 26 31" fill="none"><path d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z" fill="#ED3801" stroke="#FFFEFD" stroke-width="2" stroke-linecap="square"/></svg><span class="tag"></span></div>'
    document.body.append(c); const tag = $('.tag', c)
    // Standalone mocks: if SiteCursor's module loads after this ran, bow out on the first move.
    const move = (e) => {
      if (window.pfSiteCursor) { c.remove(); root.classList.remove('k2on'); document.removeEventListener('pointermove', move); return }
      if (e.pointerType === 'touch') return
      root.classList.add('k2on'); c.style.opacity = 1; c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
      const lab = e.target.closest && e.target.closest('[data-cursor-label]'); const text = lab ? lab.dataset.cursorLabel : ''
      c.classList.toggle('lab', !!text); if (text && tag.textContent !== text) tag.textContent = text
      c.classList.toggle('flip', !!text && e.clientX + 22 + 6 + tag.offsetWidth + 16 > innerWidth)
    }
    document.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('mouseleave', () => (c.style.opacity = 0))
  }
})()
