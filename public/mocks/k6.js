// Round 6 kit: mock 18 played with (Home v2) and the About page rebuilt (About v2). Loads after k4.js; body needs class "q q6".
// New here: text header, no cork-board picture + a bigger exploded view, bookmark tabs with full-size tiles, commitment heading,
// footer with a core-value quote card and the orange keycap, draggable desk pieces, a bigger blackjack table, the welcome video slot
// and the "Ask me anything" side panel (its questions and answers are generated from lib/portfolio/ask-me-data.ts, see k6-ask.js).
;(() => {
  const D = window.K2, D4 = window.K4, K = window.K, Q = window.Q, A = window.K6ASK
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

  // ---------- header: plain mono text. Name and role left, two links in the middle, the heart (and "Ask me anything" on About) right ----------
  Q.header = ({ active = 'work', work = '34-home-v2.html', about = '35-about-v2.html', ask = false } = {}) =>
    `<header class="q6-hdr"><a class="brand" href="${work}"><b>Jasmine Gu</b><span>Product engineer</span></a><nav aria-label="Primary"><a href="${work}"${active === 'work' ? ' aria-current="page"' : ''}>Work</a><a href="${about}"${active === 'about' ? ' aria-current="page"' : ''}>About me</a></nav><div class="end">${ask ? '<button type="button" class="ask-link" data-ask-open><span aria-hidden="true">✦</span> Ask me anything</button>' : ''}<span class="heart" aria-hidden="true">♡</span></div></header>`

  // ---------- hero: mock 18's collage without the cork-board picture; the exploded view is bigger (see k6.css) ----------
  Q.hero2 = (el) => { Q.hero(el, { mode: 'collage' }); $('.q-pinpic', el)?.remove() }

  // ---------- hero stage: an all-blueprint background (grid + roads, no road text or pins) with the name card, the big exploded layers
  // and the highlights card (back from About on 2026-09-29). Every card can be picked up and moved. The full map lives in its own viewport-tall section below. ----------
  Q.stage = (el) => {
    const N = D4.next, st = D.status.replace(/(hack western|autodesk|tesla|intuit)/g, '<b>$1</b>')
    el.innerHTML = `<section class="q6-stage"><div class="bg" id="stageMap" aria-hidden="true"></div>
      <div class="q-note q6-c" style="--r:-2deg"><h1 class="q-name">jasmine gu</h1><p class="q-hl">${D.headline}</p><p class="q-st">${st}</p><div class="q-soc">${K.socials(['mail', 'linkedin', 'github'])}<button type="button" class="q6-askbtn" data-ask-open><span aria-hidden="true">✦</span> Ask me anything</button></div>
        <div class="q-next"><p class="k">${N.title}</p><div class="r"><b>${N.when}</b><span>${N.text}</span></div></div></div>
      <div class="q-xcard q6-c" style="--r:1.5deg" id="xc"></div>
      <div class="q6-list q6-c" style="--r:-1deg"><p class="lead">${D.hlLead}</p><ul>${D.highlights.map((h) => `<li><span aria-hidden="true">↳</span><span>${h}</span></li>`).join('')}</ul></div></section>`
    const fit = () => { const h = $('.q6-hdr'); stage.style.minHeight = Math.max(640, innerHeight - (h ? h.offsetHeight : 0)) + 'px' }
    const stage = $('.q6-stage', el); fit(); addEventListener('resize', fit)
    // the roads only: the very same street network as the map below (see Q.field), with every label, pin and the JASMINE GU block taken out
    K.layers($('#xc', el), 'sticky', { bare: true })
    // trim the empty left margin so the exploded view fills its card, and narrow the hover note so it fits inside the card
    $('#xc svg', el).setAttribute('viewBox', '44 0 900 600'); $('#xc foreignObject', el).setAttribute('width', 320)
    $$('.q6-c', el).forEach((c) => Q.drag(c))
  }

  // ---------- the map, exactly one viewport tall: the whole thing (roads, labels, pins, the JASMINE GU block) fits the window at any size.
  // The hero above it draws the SAME street network (same roads, same dots, same scale), continued upward, so the streets run straight
  // from the hero into the map. ----------
  Q.field = (heroEl, mapEl) => {
    mapEl.classList.add('q6-mapsec')
    let t = 0
    const draw = () => {
      const W = Math.max(720, innerWidth), H = Math.max(520, innerHeight), stage = $('.q6-stage', heroEl), bg = $('#stageMap', heroEl), hh = stage.clientHeight
      mapEl.style.height = H + 'px'; K.city(mapEl, { W, H, nocap: true, blockAt: [0.5, 0.84], ext: 2600 })
      K.city(bg, { W, H, nocap: true, ext: 2600 }); $$('text, .mpin, .oblk', bg).forEach((n) => n.remove())
      const svg = $('svg', bg); svg.setAttribute('viewBox', `0 ${-hh} ${W} ${hh}`); svg.setAttribute('preserveAspectRatio', 'none')
    }
    draw(); addEventListener('resize', () => { clearTimeout(t); t = setTimeout(draw, 200) })
  }

  // ---------- her two lists; the second one now sits under a line about how she works ----------
  Q.lists2 = (el) => {
    const col = (lead, items, note) => `<div class="col"><p class="lead">${lead}</p>${note ? `<p class="note6">${note}</p>` : ''}<ul>${items.map((h) => `<li><span aria-hidden="true">↳</span><span>${h}</span></li>`).join('')}</ul></div>`
    el.innerHTML = `<div class="q-w"><div class="q-lists">${col(D.hlLead, D.highlights)}${col('A strong commitment to always learning and showing up', D.building, 'some of my experiences')}</div></div>`
  }

  // ---------- bookmark tabs (All / Engineering / Product / Side projects) over full-size tiles. All is the default ----------
  Q.workTabs = (el) => {
    const TABS = [['All', () => true], ['Engineering', (e) => e.group === 'Engineering'], ['Product/Business', (e) => e.group !== 'Engineering'], ['Side projects', null]]
    const FIRST = ['autodesk', 'tesla'] // All leads with the two written case studies, side by side
    const soon = (e) => !(D.caseStudies || []).includes(e.id)
    const LANG = { tesla: 'React · TypeScript · Node.js', 'autodesk-eng': 'Java · C++ · React · JavaScript', intuit: 'React · TypeScript · Node.js', omers: 'ServiceNow', metaverse: 'Python · Selenium' } // languages used: the hover tag on an engineering tile
    el.innerHTML = `<div class="q6-tabs" role="tablist" aria-label="Kinds of work">${TABS.map(([t], i) => `<button type="button" role="tab" class="q6-tab" aria-selected="${i === 0}" data-i="${i}">${t}</button>`).join('')}</div><div class="q6-panel" role="tabpanel"></div>`
    const panel = $('.q6-panel', el), tabs = $$('.q6-tab', el)
    // the original 12-column bento: each experience keeps the width it had (a few stretch so a row fills)
    // All: autodesk + tesla first (7/5), then the rest in balanced rows, no tile under 4 columns
    const BENTO = [{ autodesk: ['1 / span 7', 1, 7], tesla: ['8 / span 5', 1, 5], 'autodesk-eng': ['1 / span 5', 2, 5], intuit: ['6 / span 7', 2, 7], omers: ['1 / span 7', 3, 7], metaverse: ['8 / span 5', 3, 5], 'stealth-startup': ['1 / span 6', 4, 6], 'hack-western': ['7 / span 6', 4, 6], 'ivey-product': ['1 / span 6', 5, 6], western: ['7 / span 6', 5, 6] },
      { tesla: ['1 / span 4', 1, 4], intuit: ['5 / span 8', 1, 8], 'autodesk-eng': ['1 / span 5', 2, 5], omers: ['6 / span 7', 2, 7], metaverse: ['1 / span 12', 3, 12] },
      { autodesk: ['1 / span 8', 1, 8], 'hack-western': ['9 / span 4', 1, 4], 'stealth-startup': ['1 / span 4', 2, 4], 'ivey-product': ['5 / span 4', 2, 4], western: ['9 / span 4', 2, 4] }]
    const tile = (e, bi) => { const b = bento(e, bi); return `<article class="tile" data-id="${e.id}" data-group="${e.group.toLowerCase()}" ${b.attr} data-cursor-label="${soon(e) ? D.comingSoonCursor : LANG[e.id] || e.label}"${soon(e) ? ' data-soon="true"' : ''} style="cursor:pointer"><div class="m">${K.media(e)}</div><div class="q-cap2"><p class="sub">${e.sub}</p><p class="meta">${soon(e) ? `<span class="soon">${D.comingSoon}</span>` : ''}<span>${e.co} · ${e.when}</span><span class="tg2">${e.tags.map((t) => `<i>${t}</i>`).join(' · ')}</span></p></div></article>` }
    const bento = (e, bi) => { const p = (BENTO[bi] || {})[e.id]; return p ? { attr: `style="grid-column:${p[0]};grid-row:${p[1]}" data-span="${p[2]}"${p[2] <= 5 ? ' data-narrow="true"' : ''}` } : { attr: '' } }
    const side = (s) => `<article class="tile side"><div class="m"><img src="${s.img}" alt="" loading="lazy"></div><div class="q-cap2"><p class="sub">${s.line}</p><p class="meta"><span>${s.n}</span></p></div></article>`
    const draw = (i) => {
      tabs.forEach((t, j) => t.setAttribute('aria-selected', j === i))
      const sides = `<div class="q-tiles">${D.side.map(side).join('')}</div>`
      const list = K.list().filter(TABS[i][1] || (() => false)), exps = i === 0 ? [...list.filter((e) => FIRST.includes(e.id)).sort((a, b) => FIRST.indexOf(a.id) - FIRST.indexOf(b.id)), ...list.filter((e) => !FIRST.includes(e.id))] : list
      panel.innerHTML = i === 3 ? sides : `<div class="q-tiles bento">${exps.map((e) => tile(e, i)).join('')}</div>` // All shows work experience only; side projects live in their own tab
      K.videos(panel)
      $$('.tile[data-id]', panel).forEach((tile) => {
        tile.addEventListener('click', () => {
          const id = tile.dataset.id
          if (id) window.location.href = `/work/${id}`
        })
      })
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => draw(i)))
    draw(0)
  }

  // ---------- footer: signature + "always curious", a core-value quote card, the orange keycap, then the facts ----------
  const QUOTES = ['A strong commitment to always learning and showing up.', 'I code while taking careful consideration of the end users, the business context, and product strategy.', 'How I use technology to solve problems around me.', 'Built 0→1 products at startups, where there wasn’t an established roadmap or system to inherit.', 'More experience, better work.']
  const KEY_LAYERS = Array.from({ length: 49 }, (_, i) => `<span class="k6-layer" style="transform:translateZ(${i + 1}px) scale(${1 - ((i + 1) / 50) * 0.2})"></span>`).join('')
  Q.keycap = (href, label = 'Email Me') => `<div class="k6-keyscale"><div class="k6-keyscene"><a class="k6-key" href="${href}" aria-label="${label} (opens an email)"><span class="k6-socket" aria-hidden="true"></span><span class="k6-ext" aria-hidden="true">${KEY_LAYERS}<span class="k6-top" style="transform:translateZ(50px) scale(.8)">${label}</span></span></a></div></div>`
  Q.quoteCard = (el) => {
    let i = Math.floor(Math.random() * QUOTES.length)
    const paint = (fresh) => { el.innerHTML = `<button type="button" class="k6-quote" aria-label="Show another core value"><span class="mk" aria-hidden="true">“</span><span class="tx${fresh ? ' in' : ''}">${QUOTES[i]}</span><span class="ft"><span>A core value</span><span>${i + 1} / ${QUOTES.length} · Another</span></span></button>`; $('.k6-quote', el).addEventListener('click', () => { i = (i + 1) % QUOTES.length; paint(true) }) }
    paint(false)
  }
  Q.footer2 = (el) => {
    Q.stockCard = () => {} // the ADSK card is gone from the footer
    Q.footer(el)
    const box = $('#scBox', el); box.className = 'k6-fcol'; box.innerHTML = '<div id="qc"></div>' + Q.keycap('mailto:' + D.contact.email)
    Q.quoteCard($('#qc', el))
    const wx = $('[data-wx]', el); wx.style.display = 'none'; const cell = document.createElement('div'); cell.innerHTML = '<small>Site conditions</small><span>--</span>'; wx.after(cell)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${D4.foot.lat}&longitude=${D4.foot.lon}&current=temperature_2m,weather_code&timezone=auto`).then((r) => r.json()).then((j) => { const c = j.current.weather_code, n = ['clear', 'mostly clear', 'partly cloudy', 'overcast'][c] || (c <= 48 ? 'fog' : c <= 57 ? 'drizzle' : c <= 67 ? 'rain' : c <= 77 ? 'snow' : 'showers'); $('span', cell).textContent = `${Math.round(j.current.temperature_2m)}°C, ${n}` }).catch(() => { $('span', cell).textContent = 'unavailable' })
  }

  // ---------- pieces you can pick up: a generic drag (capture only once it is a real drag, so clicks inside still work) ----------
  let zTop = 30
  Q.drag = (el, { mouseOnly = false } = {}) => {
    el.classList.add('q6-pd'); if (mouseOnly) el.classList.add('mouse')
    let on = false, moved = false, id = 0, sx = 0, sy = 0, x = 0, y = 0, b = [0, 0, 0, 0]
    el.addEventListener('pointerdown', (e) => {
      if ((e.pointerType === 'mouse' && e.button) || (mouseOnly && e.pointerType !== 'mouse') || e.target.closest('a,button,input,video,canvas')) return
      const r = el.getBoundingClientRect(), a = (el.closest('main') || document.body).getBoundingClientRect()
      on = true; moved = false; id = e.pointerId; sx = e.clientX; sy = e.clientY
      b = [8 - r.left + x, innerWidth - 8 - r.right + x, a.top + scrollY - (r.top + scrollY) + y, a.bottom - r.bottom + y]; el.style.zIndex = ++zTop
    })
    el.addEventListener('pointermove', (e) => {
      if (!on) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (!moved && Math.hypot(dx, dy) < 4) return
      moved = true; if (!el.hasPointerCapture(id)) el.setPointerCapture(id); el.classList.add('is-dragging')
      el.style.translate = `${Math.max(b[0], Math.min(b[1], x + dx))}px ${Math.max(b[2], Math.min(b[3], y + dy))}px`
    })
    const up = (e) => { if (!on) return; on = false; el.classList.remove('is-dragging'); const m = /(-?[\d.]+)px (-?[\d.]+)px/.exec(el.style.translate || ''); if (m) { x = +m[1]; y = +m[2] }; setTimeout(() => (moved = false), 0) }
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up)
    el.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false } }, true)
  }

  // ---------- About v2 pieces ----------
  // legal pad: her favorite tools (copy from content/tools.md, handed over as JSON by app/about/page.tsx). Each name links out;
  // hovering or focusing a row shows a paper card (what it is, how she uses it, a metric if set); tapping the row pins it open.
  Q.toolsPad = (el, T) => {
    const L = T.labels, at = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
    const out = (u) => /wikipedia\.org/.test(u) ? L.wiki : L.site
    const row = (t, i) => `<li class="q6-tool"><span class="nm">${t.url ? `<a href="${at(t.url)}" target="_blank" rel="noreferrer" aria-describedby="tcard${i}">${esc(t.name)}</a>` : `<span tabindex="0" aria-describedby="tcard${i}">${esc(t.name)}</span>`}</span>${t.label ? `<span class="r">${esc(t.label)}</span>` : ''}
      <div class="q6-tcard" id="tcard${i}" role="group" aria-label="${at(t.name)}"><p class="h">${esc(t.name)}</p>${t.what ? `<p class="k">${L.what}</p><p>${esc(t.what)}</p>` : ''}${t.how ? `<p class="k">${L.how}</p><p>${esc(t.how)}</p>` : ''}${t.metric ? `<p class="k">${L.metric}</p><p class="m">${esc(t.metric)}</p>` : ''}${t.url ? `<a class="go" href="${at(t.url)}" target="_blank" rel="noreferrer">${out(t.url)} <span aria-hidden="true">↗</span></a>` : ''}</div></li>`
    el.innerHTML = `<div class="q-notes q6-pad q6-tpad" style="--r:-1.6deg"><p class="k">${esc(T.title)}</p>${T.intro ? `<p class="lead">${esc(T.intro)}</p>` : ''}<ul class="q6-tools">${T.items.map(row).join('')}</ul>${T.hint ? `<p class="hint">${esc(T.hint)}</p>` : ''}</div>`
    const pad = $('.q6-tpad', el), HOVER = matchMedia('(hover: hover)')
    let open = null, pinned = false, t = 0
    const set = (li, on) => { li.classList.toggle('open', on); if (!on) li.classList.remove('pin') }
    const show = (li) => { clearTimeout(t); if (open && open !== li) { set(open, false); pinned = false } open = li; set(li, true); pad.classList.add('has-open') }
    const hide = () => { clearTimeout(t); if (open) set(open, false); open = null; pinned = false; pad.classList.remove('has-open') }
    $$('.q6-tool', el).forEach((li) => {
      li.addEventListener('mouseenter', () => { if (HOVER.matches) show(li) })
      li.addEventListener('mouseleave', () => { if (!pinned && open === li) t = setTimeout(hide, 140) })
      li.addEventListener('focusin', () => show(li))
      li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget) && open === li) hide() })
      // a tap or click on the row (not on a link) pins the card open, a second one closes it
      li.addEventListener('click', (e) => { if (e.target.closest('a') || e.target.closest('.q6-tcard')) return; if (open === li && pinned) hide(); else { show(li); pinned = true; li.classList.add('pin') } })
    })
    document.addEventListener('keydown', (e) => { if (e.key !== 'Escape' || !open) return; const b = $('.nm > [aria-describedby]', open); if (b && $('.q6-tcard', open).contains(document.activeElement)) b.focus({ preventScroll: true }); hide() })
    document.addEventListener('pointerdown', (e) => { if (open && !open.contains(e.target)) hide() })
  }
  // welcome video: a marked placeholder until she records it
  Q.welcome = (el) => { el.innerHTML = '<div class="q6-welcome"><div class="frame"><div class="empty"><i aria-hidden="true"></i><span>placeholder · short video goes here</span></div></div><div class="cap"><h2 class="q6-h">Welcome to my page</h2><p>(I appreciate you being here) :)</p></div></div>' }
  // the in-page invitation to the side panel
  Q.askInvite = (el) => { el.innerHTML = `<div class="q6-invite"><div><h2 class="q6-h">Ask me anything</h2><p class="lede">The questions a recruiter might ask, answered in my own words. Tap one, or open the panel and type your own.</p><button type="button" class="more" data-ask-open>Open the panel</button></div><div class="qs">${A.starters.map((id) => `<button type="button" data-ask-q="${id}"><span aria-hidden="true">↳</span>${A.items.find((x) => x.id === id).q}</button>`).join('')}</div></div>` }
  // product trends
  Q.productTrends = (el) => {
    const trends = (D4.productTrends || []).map((t) => `<div style="margin-bottom:16px"><h4 style="font-size:16px;font-weight:600;margin:0 0 6px;color:var(--ink)">${t.title}</h4><p style="font-size:15px;margin:0;color:var(--muted)">${t.desc}</p></div>`).join('')
    el.innerHTML = `<div class="q6-c q6-paper" style="--r:-1deg;padding:24px"><h3 class="q6-h" style="font-size:22px;margin-bottom:16px">Product Trends I'm interested in</h3><div style="font-size:16px">${trends}</div></div>`
  }
  // custom tools she's built
  Q.customTools = (el) => {
    const tools = (D4.customTools || []).map((t) => `<div style="margin-bottom:12px"><h4 style="font-size:16px;font-weight:600;margin:0 0 4px;color:var(--ink)">${t.name}</h4><p style="font-size:15px;margin:0;color:var(--muted)">${t.desc}</p></div>`).join('')
    el.innerHTML = `<div class="q6-c q6-paper" style="--r:0.8deg;padding:24px"><h3 class="q6-h" style="font-size:22px;margin-bottom:16px">My Favorite Tools I've Created</h3><p style="font-size:15px;margin-bottom:16px;color:var(--muted)">…to solve my pain points :)</p><div>${tools}</div></div>`
  }
  // side quests
  Q.sideQuests = (el) => {
    const quests = (D4.sideQuests || []).map((q) => `<li><span aria-hidden="true">✦</span><span>${q}</span></li>`).join('')
    el.innerHTML = `<div class="q6-c q6-paper" style="--r:-0.6deg;padding:24px"><h3 class="q6-h" style="font-size:22px;margin-bottom:16px">Side Quests I Love</h3><ul style="list-style:none;padding:0;margin:0;font-size:16px">${quests}</ul></div>`
  }

  // ---------- "Ask me anything": a docked side panel ----------
  Q.ask = () => {
    const el = document.createElement('aside'); el.className = 'q6-ask'; el.setAttribute('aria-label', 'Ask me anything'); el.setAttribute('inert', ''); document.body.appendChild(el)
    const by = (id) => A.items.find((x) => x.id === id), link = (id) => `<button type="button" class="lk" data-id="${id}"><span aria-hidden="true">↳</span> ${esc(by(id).q)}</button>`
    let turns = []
    const paint = () => {
      const last = turns[turns.length - 1], asked = new Set(turns.map((t) => t.item && t.item.id))
      const ans = (t) => t.item ? `<div class="a">${t.item.a.map((p) => `<p>${esc(p)}</p>`).join('')}${t.item.links ? `<p class="out">${t.item.links.map((l) => `<a href="${l.href}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(l.label)}</a>`).join('')}</p>` : ''}</div>` : `<div class="a"><p>${esc(A.fallback)}</p><p class="out"><a href="mailto:${D.contact.email}">${D.contact.email}</a></p></div>`
      el.innerHTML = `<header><p><span aria-hidden="true">✦</span> Ask me anything</p><div><button type="button" data-a="reset" aria-label="Start over"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button><button type="button" data-a="close" aria-label="Close"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></header>
        <div class="body"><p class="a">${esc(A.intro)}</p>${turns.length ? '' : `<div class="lks">${A.starters.map(link).join('')}</div>`}${turns.map((t) => `<div class="turn"><p class="q">${esc(t.q)}</p>${ans(t)}${t === last ? `<div class="lks">${(t.item ? t.item.next : A.starters.filter((s) => !asked.has(s)).slice(0, 3)).map(link).join('')}</div>` : ''}</div>`).join('')}</div>
        <form><input placeholder="Ask me anything…" aria-label="Your question" maxlength="200" autocomplete="off"><button type="submit" aria-label="Send" disabled><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7M12 19V5"/></svg></button></form><p class="note">Typed questions are matched to the answers I wrote.</p>`
      const body = $('.body', el); body.scrollTop = body.scrollHeight; const inp = $('input', el), send = $('form button', el)
      inp.addEventListener('input', () => (send.disabled = !inp.value.trim()))
    }
    const open = () => { el.classList.add('open'); el.removeAttribute('inert'); setTimeout(() => $('input', el)?.focus({ preventScroll: true }), 260) }
    const close = () => { el.classList.remove('open'); el.setAttribute('inert', '') }
    const push = (q, item) => { turns.push({ q, item }); paint(); $('input', el).focus({ preventScroll: true }) }
    el.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.a === 'close') close(); else if (b.dataset.a === 'reset') { turns = []; paint() } else if (b.dataset.id) push(by(b.dataset.id).q, by(b.dataset.id)) })
    el.addEventListener('submit', (e) => { e.preventDefault(); const v = $('input', el).value.trim(); if (v) push(v, A.match(v)) })
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && el.classList.contains('open')) close() })
    document.addEventListener('click', (e) => { const o = e.target.closest('[data-ask-open]'), q = e.target.closest('[data-ask-q]'); if (o) open(); if (q) { open(); push(by(q.dataset.askQ).q, by(q.dataset.askQ)) } })
    paint()
  }
})()
