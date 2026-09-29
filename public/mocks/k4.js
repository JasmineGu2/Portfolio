// Round 4 kit. Load order: k2-data.js, k4-data.js, k2.js, k3.js, k4.js. Body needs class "q" and data-map="blue".
;(() => {
  const D = window.K2, D4 = window.K4, K = window.K, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const Q = (window.Q = {}), EXP = (id) => D.exp.find((e) => e.id === id), cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  const UP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>'
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches
  const tagsOf = (e) => e.tags.map((t) => `<span>${t}</span>`).join('')

  // ---------- nav: the site's two pills ----------
  Q.nav = (active = 0, workHref = '#work') => `<nav class="q-nav"><a class="q-pill${active === 0 ? ' on' : ''}" href="${workHref}">Work</a><a class="q-pill${active === 1 ? ' on' : ''}" href="${active === 1 ? '#journey' : '23-about-page.html'}">The Journey</a></nav>`

  // ---------- hero text (reference 1): orange mono name, headline, status, icons ----------
  Q.head = () => `<h1 class="q-name">jasmine gu</h1><p class="q-hl">${D.headline}</p><p class="q-st">${D.status.replace(/(hack western|autodesk|tesla|intuit)/g, '<b>$1</b>')}</p><div class="q-soc">${K.socials(['mail', 'linkedin', 'github'])}</div>`

  // ---------- hero collage (reference 1): tilted white card with the name + "What's next", a cork-board picture, the exploded-layers card ----------
  Q.hero = (el, { mode = 'collage' } = {}) => {
    const N = D4.next, st = D.status.replace(/(hack western|autodesk|tesla|intuit)/g, '<b>$1</b>')
    const right = mode === 'notes' ? `<div class="q-notewrap">${Q.notes({ compact: true, r: 1.2, drag: true })}</div>` : mode === 'stickies' ? Q.stickies() : `<figure class="q-pinpic" data-drag style="--r:8deg"><img src="/mocks/img/pinboard.png" alt="A cork board of notes and cards from an earlier design mock"></figure><div class="q-xcard" data-drag style="--r:3deg" id="xc"></div>`
    el.innerHTML = `<div class="q-hero2 m-${mode}"><div class="q-note" data-drag style="--r:-2deg"><h1 class="q-name">jasmine gu</h1><p class="q-hl">${D.headline}</p><p class="q-st">${st}</p><p class="q-in">${D.intro}</p><div class="q-soc">${K.socials(['mail', 'linkedin', 'github'])}</div>
      <div class="q-next"><p class="k">${N.title}</p><div class="r"><b>${N.when}</b><span>${N.text}</span></div></div></div>${right}</div>`
    if (mode === 'collage') K.layers($('#xc', el), 'sticky', { bare: true })
  }

  // two blue stickies: one holds the current role's video, one holds a real fact (placeholder note)
  Q.stickies = () => { const e = EXP('autodesk'); return `<div class="q-stks"><div class="q-stk vid" data-drag style="--r:-3deg"><span class="tape2"></span><div class="vm" data-cursor-label="${e.label}">${K.media(e)}</div><p class="cp"><b>${e.role}, ${e.co}</b>${e.when}</p></div><div class="q-stk nt3" data-drag style="--r:4deg"><span class="tape2"></span><small>placeholder note</small>${D.facts[0]}</div></div>` }

  // ---------- the blue skills-city band ----------
  Q.band = (el) => { el.innerHTML = '<div class="q-band"></div>'; K.city($('.q-band', el), { W: 1440, H: 470, nocap: true, blockAt: [0.6, 0.6] }) }

  // ---------- tiles. o.box: 'all' | 'lead' | 'none' (white box over the video vs caption below), o.stag, o.slice ----------
  Q.tiles = (el, o = {}) => {
    const box = o.box || 'none', list = K.list().slice(...(o.slice || [0, 10]))
    el.innerHTML = `<div class="q-tiles${o.stag ? ' stag' : ''}">${list.map((e, i) => { const L = o.lead === true ? 1 : o.lead || 0, lead = i < L, over = box === 'all' || (box === 'lead' && i < L)
      return `<article class="tile${lead ? ' lead' : ''}" data-id="${e.id}" data-cursor-label="${e.label}"><div class="m">${K.media(e)}${over ? `<div class="bx"><h3>${e.co}</h3><p class="tgl">${tagsOf(e)}</p></div>` : ''}</div>
        <div class="q-cap2"><p class="sub">${e.sub}</p><p class="meta"><span>${e.co} · ${e.when}</span>${over ? '' : `<span class="tg2">${e.tags.map((t) => `<i>${t}</i>`).join(' · ')}</span>`}</p></div></article>` }).join('')}</div>`
    K.videos(el)
  }
  // editorial rows: media + a rail with role and period, alternating sides
  Q.rows = (el) => { el.innerHTML = K.list().map((e, i) => `<article class="q-row${i % 2 ? ' rev' : ''}" data-id="${e.id}" data-cursor-label="${e.label}"><div class="m">${K.media(e)}</div><div class="q-rail"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${e.co}</h3><p class="role">${e.role} · ${e.when}</p><p class="sub">${e.sub}</p><p class="tg">${tagsOf(e)}</p></div></article>`).join(''); K.videos(el) }

  // ---------- stock card (pasted StockCard: logo, ticker, name, price, change with arrow, button) ----------
  const scHTML = (s) => `<div class="top"><span class="q-lg"><img src="${s.logo}" alt=""></span><div><div class="tk">${s.t}</div><div class="nm2">${s.n}</div></div></div><div class="px"><strong>${s.v}</strong><span class="q-up">${UP}${s.u}</span></div><button class="q-buy" type="button" data-id="${s.id}">View</button>`
  Q.stockCard = (el) => {
    const S = D4.stocks; let i = 0; el.innerHTML = `<div class="q-sc">${scHTML(S[0])}</div>`; const c = $('.q-sc', el)
    c.addEventListener('click', (e) => { const b = e.target.closest('.q-buy'); if (b) K.lightbox(EXP(b.dataset.id)) })
    if (REDUCED) return; let hold = false; c.addEventListener('mouseenter', () => (hold = true)); c.addEventListener('mouseleave', () => (hold = false))
    setInterval(() => { if (hold) return; c.classList.add('out'); setTimeout(() => { i = (i + 1) % S.length; c.innerHTML = scHTML(S[i]); c.classList.remove('out') }, 360) }, 5200)
  }
  // ---------- signature (same props as her Signature: text, fontSize, duration). The outline draws left to right, then fills. Click to sign again. ----------
  Q.signature = (el, { text = 'Jasmine', fontSize = 84, duration = 1.5 } = {}) => {
    el.classList.add('q-sig'); el.title = 'click to sign again'
    el.innerHTML = `<svg class="q-sigsvg" role="img" aria-label="${text}, signature" style="--dur:${duration}s"><text x="6" y="${fontSize}" font-size="${fontSize}">${text}</text></svg>`
    const svg = $('svg', el), t = $('text', el)
    const fit = () => { const b = t.getBBox(); svg.setAttribute('viewBox', `${b.x - 8} ${b.y - 8} ${b.width + 16} ${b.height + 16}`); svg.style.width = b.width + 16 + 'px'; svg.style.height = b.height + 16 + 'px' }
    const play = () => { svg.classList.remove('go'); void svg.getBoundingClientRect(); svg.classList.add('go') }
    ;(document.fonts ? document.fonts.load(`${fontSize}px "Mrs Saint Delafield"`) : Promise.resolve()).catch(() => {}).then(() => { fit(); const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { play(); io.disconnect() } }, { threshold: 0.5 }); io.observe(el) })
    el.addEventListener('click', play)
  }

  // ---------- footer: signature + wordmark + stock card, live facts, links, name and year, back to top ----------
  const WX = (c) => (c === 0 ? 'CLEAR' : c === 1 ? 'MOSTLY CLEAR' : c === 2 ? 'PARTLY CLOUDY' : c === 3 ? 'OVERCAST' : c <= 48 ? 'FOG' : c <= 57 ? 'DRIZZLE' : c <= 67 ? 'RAIN' : c <= 77 ? 'SNOW' : c <= 82 ? 'SHOWERS' : c <= 86 ? 'SNOW SHOWERS' : 'THUNDERSTORM')
  Q.footer = (el) => {
    const F = D4.foot, ct = D.contact, yr = new Date().getFullYear(), ext = 'target="_blank" rel="noopener noreferrer"'
    el.innerHTML = `<footer class="bpb q-foot"><div class="q-w">
      <div class="ftop"><div class="mark"><div id="sigBox"></div><div class="q-wm" data-originkit="vector-wordmark">${F.word}</div></div><div id="scBox"></div></div>
      <div class="facts"><div><small>Currently</small>${cap(F.currently)}</div><div><small>Based in</small>${F.city} · <time data-clock>--:--</time></div><div class="note" data-wx>SITE CONDITIONS: --</div><div><small>Last revised</small><span data-rev>--</span></div></div>
      <div class="bar"><nav><a href="mailto:${ct.email}">Email</a><a href="${ct.linkedin}" ${ext}>LinkedIn</a><a href="${ct.github}" ${ext}>GitHub</a><a href="/resume.pdf" ${ext}>Résumé</a></nav><p>${D4.id.name}, ${yr} · <a href="#" data-top>Back to top</a></p></div></div></footer>`
    Q.stockCard($('#scBox', el)); Q.signature($('#sigBox', el), { text: F.sig, fontSize: 84, duration: 1.5 })
    // local time in her city, live
    const tf = new Intl.DateTimeFormat('en-US', { timeZone: F.tz, hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }), tick = () => { $('[data-clock]', el).textContent = tf.format(new Date()) }; tick(); setInterval(tick, 20000)
    // weather as a drafting note (Open-Meteo, no key; only Toronto's coordinates are sent)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${F.lat}&longitude=${F.lon}&current=temperature_2m,weather_code&timezone=auto`).then((r) => r.json()).then((j) => { $('[data-wx]', el).textContent = `SITE CONDITIONS: ${Math.round(j.current.temperature_2m)}°C, ${WX(j.current.weather_code)}` }).catch(() => { $('[data-wx]', el).textContent = 'SITE CONDITIONS: UNAVAILABLE' })
    // last revised: the newest Last-Modified among the files that make this page (on the real site this is the git commit date at build time)
    const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    Promise.all([location.pathname, '/mocks/k4.js', '/mocks/k4.css', '/mocks/k2-data.js', '/mocks/k4-data.js'].map((f) => fetch(f, { method: 'HEAD' }).then((r) => { const lm = r.ok && r.headers.get('last-modified'); return lm ? new Date(lm) : new Date(NaN) }).catch(() => new Date(NaN)))).then((ds) => { const ok = ds.filter((d) => !isNaN(d)); $('[data-rev]', el).textContent = ok.length ? fmt(new Date(Math.max(...ok))) : fmt(new Date(document.lastModified)) })
    $('[data-top]', el).addEventListener('click', (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }) })
  }

  // stock list widget (reference 2)
  Q.stockList = (el) => { el.innerHTML = `<div class="q-sl">${D4.stocks.map((s) => `<div class="r"><span class="q-lg"><img src="${s.logo}" alt=""></span><div><div class="tk">${s.t}</div><div class="nm2">${s.n}</div></div><div class="vv"><strong><span class="q-up">${UP}</span>${s.v}</strong><small>${s.u}</small></div><button class="q-buy" type="button" data-id="${s.id}">View</button></div>`).join('')}</div>`
    el.addEventListener('click', (e) => { const b = e.target.closest('.q-buy'); if (b) K.lightbox(EXP(b.dataset.id)) }) }

  // ---------- punched blue notes sheet (reference 2) ----------
  Q.notes = (o = {}) => `<div class="q-notes${o.compact ? ' compact' : ''}" style="--r:${o.r ?? -1.4}deg"${o.drag ? ' data-drag' : ''}><p class="k">ABOUT · NOTES TO SELF</p><p class="lead">${D.intro}</p><ul class="chk">${D.highlights.map((h) => `<li><i></i><span>${cap(h)}</span></li>`).join('')}</ul></div>`

  // decorative QR-style block (not a real code)
  Q.qr = () => { let sd = 7; const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647, n = 25, fin = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9); let c = ''
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!fin(x, y) && r() > 0.52) c += `<rect x="${x}" y="${y}" width="1" height="1"/>`
    const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`
    return `<svg class="q-qr" viewBox="-1 -1 27 27" aria-hidden="true" shape-rendering="crispEdges"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/>${c}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}</svg>` }

  // ---------- lanyard: verlet rope on a canvas, drag the card to swing it, click to flip ----------
  Q.lanyard = (el) => {
    const I = D4.id, ct = D.contact
    const links = [['mail', 'mailto:' + ct.email, ct.email], ['linkedin', ct.linkedin, 'linkedin.com/in/jasmine-gu-b2aa65201'], ['github', ct.github, 'github.com/JasmineGu2'], ['file', '/resume.pdf', 'Résumé (PDF)']]
    el.classList.add('q-lan')
    el.innerHTML = `<canvas class="q-rope" aria-hidden="true"></canvas><div class="q-card" tabindex="0" role="button" aria-label="ID card. Drag to swing it. Click or press Enter to flip it."><span class="clip"></span><div class="in">
      <div class="face front"><span class="slot"></span><div class="hd"><span class="tri">▲</span><div><b>JASMINE GU</b><small>${I.role.toUpperCase()}</small></div><div class="stk2"><span>PM</span><span>ENG</span><span>${I.grad}</span></div></div>
        <div class="ph"><img src="${I.logo}" alt=""><span class="ck"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg></span></div>
        <div><h3>${I.name}</h3><p class="role">${I.role}</p></div>
        <div class="kvs"><dl><div><dt>Location</dt><dd>${I.loc}</dd></div><div><dt>Class of</dt><dd>${I.grad}</dd></div><div><dt>School</dt><dd>${I.school}</dd></div></dl>${Q.qr()}</div>
        <p class="tagline">ENGINEERING · PRODUCT · BUSINESS · COMMUNITY</p></div>
      <div class="face back"><span class="slot"></span><p class="lead">Contact</p>${links.map(([i, h, t]) => `<a href="${h}" ${h.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${K.icon(i)}<span>${t}</span></a>`).join('')}<p class="hint">click the card to flip it back</p></div></div></div>`
    const cv = $('canvas', el), card = $('.q-card', el), ctx = cv.getContext('2d'), N = 10; let W = 0, H = 0, seg = 31, cw = 340, bx0 = -1e4, bx1 = 1e4; const pts = []
    const size = () => { const r = el.getBoundingClientRect(); W = r.width; H = r.height; const d = Math.min(2, devicePixelRatio || 1); cv.width = W * d; cv.height = H * d; cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(d, 0, 0, d, 0, 0); cw = card.offsetWidth; bx0 = -r.left + cw / 2 + 26; bx1 = innerWidth - r.left - cw / 2 - 26 }
    size(); for (let i = 0; i < N; i++) { const x = W / 2 + i * 5, y = i * seg; pts.push({ x, y, ox: x - (i > 4 ? 3 : 0), oy: y }) }
    const last = pts[N - 1]; let drag = null, moved = 0, vx = 0, vy = 0, t0 = 0
    const P = (e) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top } }
    card.addEventListener('pointerdown', (e) => { if (e.target.closest('a')) return; card.setPointerCapture(e.pointerId); const p = P(e); drag = { dx: p.x - last.x, dy: p.y - last.y }; moved = 0; vx = vy = 0; t0 = performance.now() })
    card.addEventListener('pointermove', (e) => { if (!drag) return; const p = P(e); let x = p.x - drag.dx, y = p.y - drag.dy; const R = (N - 1) * seg * 0.985, ax = W / 2, ay = 0, d = Math.hypot(x - ax, y - ay)
      if (d > R) { x = ax + ((x - ax) * R) / d; y = ay + ((y - ay) * R) / d }
      moved += Math.abs(x - last.x) + Math.abs(y - last.y); if (moved > 6) card.classList.add('grab'); vx = x - last.x; vy = y - last.y; last.x = x; last.y = y; last.ox = x; last.oy = y })
    const release = () => { if (!drag) return; drag = null; card.classList.remove('grab'); if (moved < 6 && performance.now() - t0 < 500) card.classList.toggle('flip'); else { last.ox = last.x - Math.max(-30, Math.min(30, vx)); last.oy = last.y - Math.max(-30, Math.min(30, vy)) } }
    card.addEventListener('pointerup', release); card.addEventListener('pointercancel', release)
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flip') } })
    const step = () => { for (let i = 1; i < N; i++) { const p = pts[i]; if (drag && i === N - 1) continue; const dx = (p.x - p.ox) * 0.987, dy = (p.y - p.oy) * 0.987; p.ox = p.x; p.oy = p.y; p.x += dx; p.y += dy + 0.6; if (p.x > bx1) { p.x = bx1; p.ox = p.x + dx * 0.4 } else if (p.x < bx0) { p.x = bx0; p.ox = p.x + dx * 0.4 } }
      for (let k = 0; k < 14; k++) { pts[0].x = W / 2; pts[0].y = 0
        for (let i = 0; i < N - 1; i++) { const a = pts[i], b = pts[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, f = (d - seg) / d
          if (i === 0) { b.x -= dx * f; b.y -= dy * f } else if (drag && i + 1 === N - 1) { a.x += dx * f; a.y += dy * f } else { a.x += dx * f * 0.5; a.y += dy * f * 0.5; b.x -= dx * f * 0.5; b.y -= dy * f * 0.5 } } } }
    const draw = () => { ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      const path = () => { ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y - 40); ctx.lineTo(pts[0].x, pts[0].y); for (let i = 1; i < N - 1; i++) { const m = { x: (pts[i].x + pts[i + 1].x) / 2, y: (pts[i].y + pts[i + 1].y) / 2 }; ctx.quadraticCurveTo(pts[i].x, pts[i].y, m.x, m.y) } ctx.lineTo(last.x, last.y) }
      path(); ctx.strokeStyle = '#0e3b8f'; ctx.lineWidth = 16; ctx.stroke(); path(); ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 1.4; ctx.setLineDash([5, 7]); ctx.stroke(); ctx.setLineDash([])
      const a = pts[N - 3], th = Math.atan2(last.x - a.x, last.y - a.y); card.style.transform = `translate(${last.x - cw / 2}px,${last.y}px) rotate(${-th}rad)` }
    const loop = () => { step(); draw(); requestAnimationFrame(loop) }
    if (REDUCED) { for (let i = 0; i < 260; i++) step(); draw() } else loop()
    addEventListener('resize', size)
  }

  // ---------- blackjack: $10 a hand, play money, dealer stands on 17, J/Q/K are her photos ----------
  Q.blackjack = (el) => {
    const SU = ['♠', '♥', '♦', '♣'], RK = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    let deck = [], me = [], dl = [], bal = 110, state = 'idle', msg = 'deal · $10 a hand'
    const shuffle = () => { deck = SU.flatMap((s) => RK.map((r) => ({ r, s }))); for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]] } }
    const val = (h) => { let t = 0, a = 0; h.forEach((c) => { if (c.r === 'A') { a++; t += 11 } else t += 'JQK'.includes(c.r) || c.r === '10' ? 10 : +c.r }); while (t > 21 && a) { t -= 10; a-- } return t }
    const draw = () => { if (deck.length < 12) shuffle(); const c = deck.pop(); c.nw = true; return c }
    const card = (c, down) => { if (down) return '<div class="pc down"></div>'; const f = D4.faces[c.r], n = c.nw; c.nw = false
      return `<div class="pc${'♥♦'.includes(c.s) ? ' red' : ''}${f ? ' face' : ''}" ${n ? '' : 'style="animation:none"'}>${f ? `<img src="${f}" alt="">` : ''}<span class="rk"><b>${c.r}</b><span>${c.s}</span></span>${f ? '' : `<span class="st">${c.s}</span>`}</div>` }
    const paint = () => { const play = state === 'play'
      el.innerHTML = `<div class="q-bj"><div class="hd"><span class="chip">$${bal}</span><span class="msg">${msg}</span></div><p class="who">dealer ${play || !dl.length ? '' : val(dl)}</p><div class="hand">${dl.map((c, i) => card(c, play && i === 1)).join('')}</div><p class="who">you ${me.length ? val(me) : ''}</p><div class="hand">${me.map((c) => card(c)).join('')}</div><div class="acts">${play ? '<button class="q-pill" data-a="hit" type="button">Hit</button><button class="q-pill" data-a="stand" type="button">Stand</button>' : '<button class="q-pill" data-a="deal" type="button">Deal</button>'}</div></div>` }
    const end = (m, win) => { state = 'over'; bal += win; msg = m; paint() }
    const stand = () => { while (val(dl) < 17) dl.push(draw()); const p = val(me), d = val(dl)
      if (d > 21) end('dealer busts · you win $10', 20); else if (p > d) end('you win $10', 20); else if (p < d) end('dealer wins · −$10', 0); else end('push', 10) }
    const act = { deal() { if (bal < 10) bal = 100; bal -= 10; if (deck.length < 12) shuffle(); me = [draw(), draw()]; dl = [draw(), draw()]; state = 'play'; msg = 'hit or stand'
        if (val(me) === 21) { state = 'over'; if (val(dl) === 21) end('both blackjack · push', 10); else end('blackjack · you win $15', 25) } else paint() },
      hit() { me.push(draw()); if (val(me) > 21) end('bust · −$10', 0); else if (val(me) === 21) stand(); else paint() }, stand }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) act[b.dataset.a]() }); shuffle(); act.deal()
  }

  // ---------- rotating pins (placeholder quotes) ----------
  Q.quotes = (el) => {
    const Qs = D4.quotes, rot = [-3, 2, -1.5, 3, -2.5], n = Qs.length; let order = Qs.map((_, i) => i), busy = false, hold = false
    el.innerHTML = `<div class="q-pins">${Qs.map((t, i) => `<div class="q-pin" style="--r:${rot[i % rot.length]}deg"><q>${t}</q><small><span>placeholder pin</span><span>${String(i + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}</span></small></div>`).join('')}</div>`
    const cards = $$('.q-pin', el), paint = () => order.forEach((idx, pos) => { const c = cards[idx]; c.style.setProperty('--p', pos); c.style.setProperty('--z', n - pos); c.style.opacity = pos > 2 ? 0 : 1 })
    const next = () => { if (busy) return; busy = true; const top = cards[order[0]]; top.classList.add('out'); setTimeout(() => { top.classList.remove('out'); order.push(order.shift()); paint(); busy = false }, 520) }
    paint(); const box = $('.q-pins', el); box.addEventListener('click', next); box.addEventListener('mouseenter', () => (hold = true)); box.addEventListener('mouseleave', () => (hold = false))
    if (!REDUCED) setInterval(() => { if (!hold) next() }, 4600)
  }

  // ---------- polaroids you can move around ----------
  Q.polaroids = (el) => {
    const P = D4.photos; let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    el.classList.add('q-pola'); el.innerHTML = '<p class="q-hint">drag them around</p>' + P.map((s, i) => `<figure class="q-pol" style="--r:${((rnd() * 7 + 1.5) * (i % 2 ? 1 : -1)).toFixed(1)}deg"><img src="${s}" alt="" loading="lazy" draggable="false"><i>${String(i + 1).padStart(2, '0')}</i></figure>`).join('')
    const pols = $$('.q-pol', el), lay = () => { if (matchMedia('(max-width:760px)').matches) { pols.forEach((p) => { p.style.left = p.style.top = '' }); return }
      const cw = el.clientWidth, ch = el.clientHeight, cols = cw > 1100 ? 5 : cw > 820 ? 4 : 3, rows = Math.ceil(P.length / cols), pw = 224, ph = 300
      pols.forEach((p, i) => { const c = i % cols, r = Math.floor(i / cols); p.style.left = Math.max(0, Math.min(cw - pw, Math.round(c * ((cw - pw) / (cols - 1)) + (rnd() - 0.5) * 44))) + 'px'; p.style.top = Math.round(r * ((ch - ph) / (rows - 1)) + (rnd() - 0.5) * 50) + 'px' }) }
    lay(); let z = 10
    pols.forEach((p) => { let sx = 0, sy = 0, ox = 0, oy = 0, on = false
      p.addEventListener('pointerdown', (e) => { on = true; sx = e.clientX; sy = e.clientY; p.setPointerCapture(e.pointerId); p.style.zIndex = ++z; p.classList.add('drag') })
      p.addEventListener('pointermove', (e) => { if (!on) return; const r = el.getBoundingClientRect(), L = p.offsetLeft, T = p.offsetTop
        const tx = Math.max(-L - 30, Math.min(r.width - L - p.offsetWidth + 30, ox + e.clientX - sx)), ty = Math.max(-T - 20, Math.min(r.height - T - p.offsetHeight + 40, oy + e.clientY - sy)); p.style.translate = `${tx}px ${ty}px` })
      const up = (e) => { if (!on) return; on = false; p.classList.remove('drag'); const m = /(-?[\d.]+)px (-?[\d.]+)px/.exec(p.style.translate || ''); if (m) { ox = +m[1]; oy = +m[2] } }
      p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up) })
  }

  // the tilted polaroid with two black-and-white photos (draggable)
  Q.polaroid2 = (el) => { el.innerHTML = `<div class="q-polad" data-drag><img src="/gallery/moment-yosemite-valley.png" alt=""><img src="/gallery/moment-machu-picchu-llama.png" alt=""></div>` }

  // ---------- her two lists, exactly as written: highlights and what she has been building ----------
  Q.lists = (el, { only } = {}) => {
    const col = (lead, items) => `<div class="col"><p class="lead">${lead}</p><ul>${items.map((h) => `<li><span aria-hidden="true">↳</span><span>${h}</span></li>`).join('')}</ul></div>`
    el.innerHTML = `<div class="q-w"><div class="q-lists${only ? ' one' : ''}">${only === 'building' ? '' : col(D.hlLead, D.highlights)}${col("what i've been building:", D.building)}</div></div>`
  }

  // ---------- what isn't on her resume (verbatim) ----------
  Q.resume = (el) => { const R = D4.resume
    el.innerHTML = `<div class="q-res"><div class="q-panel"><p class="lead">${R.a.lead}</p><ul class="arrows">${R.a.items.map((x) => `<li><span aria-hidden="true">→</span><span>${x}</span></li>`).join('')}</ul></div>
      <div class="q-panel"><p class="lead">${R.b.lead}</p><ul class="dots">${R.b.items.map((x) => `<li>${x}</li>`).join('')}</ul><p class="lead" style="margin-top:22px">${R.b.lead2}</p><dl>${R.b.entries.map(([k, v]) => `<div><dt>${k}:</dt><dd>${v}</dd></div>`).join('')}</dl></div></div>` }

  // ---------- side projects ----------
  Q.side = (el) => { el.innerHTML = `<div class="q-side">${D.side.map((s) => `<article><img src="${s.img}" alt="" loading="lazy"><div><h3>${s.n}</h3><p>${s.line}</p></div></article>`).join('')}</div>` }

  // ---------- more context: exploded view + notes / building / previously ----------
  Q.context = (el) => { el.innerHTML = `<div id="qRes" style="margin-bottom:44px"></div><div class="q-ctx" id="qLay"></div><div class="q-panel info3" style="margin-top:44px"><div class="nt2"><h2>Notes</h2><ul>${D.notes.map((n) => `<li>${n}</li>`).join('')}</ul></div>
      <div><p class="lead">what i've been building:</p><ul>${D.building.map((b) => `<li><span>↳</span><span>${b}</span></li>`).join('')}</ul></div>
      <div><p class="lead">previously:</p><ul>${D.previously.map(([c, n]) => `<li><span>↳</span><span><small>${c}</small> <b>${n}</b></span></li>`).join('')}</ul></div></div>`
    Q.resume($('#qRes', el)); K.layers($('#qLay', el), 'sticky', { bare: true }) }

  // ---------- favorite tools + launches (her words; the launches list is still empty) ----------
  Q.tools = (el) => { const T = D4.tools, L = D4.launches
    el.innerHTML = `<div class="q-play"><div><p class="q-lab">favorite tools</p><div class="q-panel"><p class="q-lead" style="margin-top:22px">A PM and engineer who loves her tools.</p>${T.map((t) => `<div class="q-tool"><span class="n">${t.n}</span><span class="r">${t.r}</span>${t.note ? `<span class="nt4">${t.note}</span>` : ''}</div>`).join('')}</div></div>
      <div><p class="q-lab">product launches i'm bullish on</p>${L.length ? `<div class="q-panel">${L.map((l) => `<div class="q-tool"><span class="n">${l}</span></div>`).join('')}</div>` : '<div class="q-empty"><b>The list goes here</b><span>placeholder · waiting on your launches</span></div>'}</div></div>` }

  // ---------- dither shader: a Toronto skyline drawn in code, then ordered-dithered (Bayer 8x8) in a WebGL fragment shader, blue / cream / orange ----------
  Q.dither = (el) => {
    el.innerHTML = '<div class="q-dith" role="img" aria-label="Toronto skyline with a dither effect"><canvas></canvas><div class="bx2"><b>Toronto, Canada</b><span>43.65° N, 79.38° W</span></div></div>'
    const box = $('.q-dith', el), cv = $('canvas', el), src = document.createElement('canvas'), g = src.getContext('2d')
    const paint = () => { // source art at half resolution; luminance drives the dither density, orange is picked out by the shader
      const W = (src.width = Math.max(320, Math.round(box.clientWidth / 2))), H = (src.height = Math.round(box.clientHeight / 2)), base = H * 0.76; let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
      const sky = g.createLinearGradient(0, 0, 0, base); sky.addColorStop(0, '#4a4a4a'); sky.addColorStop(0.55, '#b9b9b9'); sky.addColorStop(1, '#f6f6f6'); g.fillStyle = sky; g.fillRect(0, 0, W, H)
      const sx = W * 0.72, sr = H * 0.26; g.fillStyle = '#ed3801'; g.beginPath(); g.arc(sx, base - sr * 0.5, sr, 0, 7); g.fill()
      const row = (col, hMin, hMax, wMin, wMax) => { g.fillStyle = col; for (let x = -10; x < W; ) { const w = wMin + rnd() * (wMax - wMin), h = hMin + rnd() * (hMax - hMin); g.fillRect(x, base - h, w, h + 2); if (rnd() < 0.3) g.fillRect(x + w / 2 - 1, base - h - 8, 2, 8); x += w + rnd() * 3 } }
      row('#6c6c6c', H * 0.2, H * 0.5, 14, 30); row('#141414', H * 0.12, H * 0.38, 12, 28)
      g.fillStyle = '#f2f2f2'; for (let i = 0; i < W * 0.9; i++) { const x = rnd() * W, y = base - rnd() * H * 0.26; g.fillRect(x | 0, y | 0, 1, 1) }
      const tx = W * 0.3, top = H * 0.04; g.fillStyle = '#0c0c0c'; g.beginPath(); g.moveTo(tx - 5, base); g.lineTo(tx - 1.5, top + H * 0.3); g.lineTo(tx - 1, top); g.lineTo(tx + 1, top); g.lineTo(tx + 1.5, top + H * 0.3); g.lineTo(tx + 5, base); g.fill()
      g.beginPath(); g.ellipse(tx, top + H * 0.3, 12, 5, 0, 0, 7); g.fill(); g.fillRect(tx - 6, top + H * 0.3 + 3, 12, 4)
      g.fillStyle = '#242424'; g.beginPath(); g.ellipse(tx + W * 0.12, base, W * 0.055, H * 0.2, 0, Math.PI, 0); g.fill()
      const wat = g.createLinearGradient(0, base, 0, H); wat.addColorStop(0, '#8a8a8a'); wat.addColorStop(1, '#e4e4e4'); g.fillStyle = wat; g.fillRect(0, base, W, H - base)
      g.fillStyle = '#f7f7f7'; for (let y = base + 4; y < H; y += 5) g.fillRect(rnd() * W * 0.6, y, W * (0.1 + rnd() * 0.3), 1)
      g.fillStyle = '#ed3801'; for (let y = base + 2; y < H; y += 4) g.fillRect(sx - (H - y) * 0.06 - rnd() * 6, y, 8 + rnd() * 16, 2)
    }
    paint()
    const gl = cv.getContext('webgl', { antialias: false })
    if (!gl) { cv.width = src.width; cv.height = src.height; cv.getContext('2d').drawImage(src, 0, 0); return }
    const mk = (t, c) => { const sh = gl.createShader(t); gl.shaderSource(sh, c); gl.compileShader(sh); return sh }
    const pr = gl.createProgram(); gl.attachShader(pr, mk(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'))
    gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, `precision mediump float;uniform sampler2D img;uniform vec2 res;uniform float cell;uniform float t;
      float b2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}float b4(vec2 a){return b2(.5*a)*.25+b2(a);}float b8(vec2 a){return b4(.5*a)*.25+b2(a);}
      void main(){vec2 px=floor(gl_FragCoord.xy/cell);vec2 q=(px+.5)*cell/res;q.y=1.-q.y;vec3 c=texture2D(img,q).rgb;float l=dot(c,vec3(.299,.587,.114));l+=.05*sin(t*.8+q.x*9.+q.y*5.);
        float th=b8(px);float on=step(th,l);vec3 dark=vec3(.122,.235,1.),light=vec3(.961,.953,.933),org=vec3(.929,.22,.004);float acc=smoothstep(.35,.55,c.r-c.b);
        vec3 col=mix(dark,light,on);col=mix(col,mix(light,org,step(th,.88)),acc);gl_FragColor=vec4(col,1.);}`))
    gl.linkProgram(pr); gl.useProgram(pr); const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex); [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]].forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v))
    const U = (n) => gl.getUniformLocation(pr, n); let vis = true, t0 = performance.now()
    const upload = () => { cv.width = box.clientWidth; cv.height = box.clientHeight; gl.viewport(0, 0, cv.width, cv.height); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src); gl.uniform2f(U('res'), cv.width, cv.height); gl.uniform1f(U('cell'), 3) }
    const frame = () => { gl.uniform1f(U('t'), (performance.now() - t0) / 1000); gl.drawArrays(gl.TRIANGLES, 0, 3) }
    upload(); frame(); new ResizeObserver(() => { paint(); upload(); frame() }).observe(box)
    new IntersectionObserver((es) => (vis = es[0].isIntersecting)).observe(box)
    if (!REDUCED) { const loop = () => { if (vis) frame(); requestAnimationFrame(loop) }; requestAnimationFrame(loop) }
  }

  Q.init = () => { K.init({ rulers: false, bar: /[?&#]tools/.test(location.search) }) }
})()
