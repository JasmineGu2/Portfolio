// Shared behaviour for every mock. Load it LAST, after the page has rendered its content.
;(() => {
  const root = document.documentElement
  const $ = (s, r = document) => [...r.querySelectorAll(s)]
  try { const t = localStorage.getItem('mock-theme'); if (t) root.dataset.theme = t } catch {}

  // pencil / blueprint toggle + link back to the index, on every mock
  const bar = document.createElement('div')
  bar.className = 'mockbar'
  bar.innerHTML = `<a href="index.html">all mocks</a><span>${(document.title.split('·')[1] || '').trim()}</span><button class="pill" type="button"></button>`
  const btn = bar.querySelector('button')
  const paint = () => (btn.textContent = root.dataset.theme === 'blueprint' ? 'go pencil' : 'go blueprint')
  paint()
  btn.onclick = () => {
    root.dataset.theme = root.dataset.theme === 'blueprint' ? 'pencil' : 'blueprint'
    try { localStorage.setItem('mock-theme', root.dataset.theme) } catch {}
    paint()
  }
  document.body.append(bar)

  // drag anything marked data-drag (sticky notes, badges, pinboard objects)
  let z = 50
  $('[data-drag]').forEach((el) => {
    let sx = 0, sy = 0, ox = 0, oy = 0, on = false
    el.style.touchAction = 'none'
    el.style.cursor = 'grab'
    el.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a,button')) return
      on = true; sx = e.clientX; sy = e.clientY
      el.setPointerCapture(e.pointerId); el.style.zIndex = ++z; el.style.cursor = 'grabbing'
    })
    el.addEventListener('pointermove', (e) => { if (on) el.style.translate = `${ox + e.clientX - sx}px ${oy + e.clientY - sy}px` })
    el.addEventListener('pointerup', (e) => { if (!on) return; on = false; ox += e.clientX - sx; oy += e.clientY - sy; el.style.cursor = 'grab' })
  })

  // videos: play while visible; the heavy Tesla clip only plays on hover
  const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())), { threshold: 0.25 })
  $('video[data-lazy]').forEach((v) => io.observe(v))
  $('video[data-hover]').forEach((v) => {
    v.parentElement.addEventListener('mouseenter', () => v.play().catch(() => {}))
    v.parentElement.addEventListener('mouseleave', () => v.pause())
  })

  // floating label for [data-tip]
  const tip = document.createElement('div')
  tip.className = 'tip'
  document.body.append(tip)
  document.addEventListener('mousemove', (e) => {
    const t = e.target.closest && e.target.closest('[data-tip]')
    if (!t) { tip.style.display = 'none'; return }
    tip.textContent = t.dataset.tip; tip.style.display = 'block'
    tip.style.left = e.clientX + 14 + 'px'; tip.style.top = e.clientY + 14 + 'px'
  })

  // tab groups: [data-tabs] > [data-tab=x] buttons and [data-panel=x] panels
  $('[data-tabs]').forEach((g) => {
    const btns = $('[data-tab]', g), panels = $('[data-panel]', g)
    const go = (n) => { btns.forEach((b) => b.classList.toggle('on', b.dataset.tab === n)); panels.forEach((p) => (p.hidden = p.dataset.panel !== n)) }
    btns.forEach((b) => (b.onclick = () => go(b.dataset.tab)))
    go(btns[0].dataset.tab)
  })
})()
