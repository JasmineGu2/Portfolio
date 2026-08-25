---
name: portfolio-performance
description: >-
  Enforces the Jasmine Gu portfolio performance budget — one motion system per
  viewport, canvas particle caps, video decode limits, lazy loading, fps targets,
  and mobile tiers. Use when working on performance, animation, canvas, video,
  lazy load, IntersectionObserver, mobile optimization, Lighthouse, frame rate,
  or particle count.
---

# Portfolio Performance Budget

Full spec: `specs/11-performance-budget.md`. Visual look & feel: `.cursor/skills/portfolio-visual/SKILL.md` + `specs/04-visual-system.md`.

## Hierarchy (one job per layer)

```text
Videos          → show work
Connectors      → relationships
Generative      → atmosphere / AI (one canvas)
Scroll          → narrative (transform + opacity only)
Ask agent       → exploration (load on interaction)
```

**Rule:** One primary motion system per viewport. Everything else static, paused, or cheap. Only animate what's visible.

## Budgets at a glance

| Resource | Limit |
|----------|-------|
| Canvas | 1 global; desktop 1.5k–3k particles; mobile 500–1k or off |
| Ambient fps | 24–30 (not 60) |
| Interaction fps | 60 for pointer-driven only |
| Videos decoding | Max 1–2 at once |
| Scroll animation | `transform` + `opacity` only — no width/height/blur/shadow |
| Blur | Never animate `filter: blur()` — prerender or translate3d layers |
| Fonts | Minimal WOFF2 weights, subset |
| Offscreen | No rAF loops — IntersectionObserver pause |

## Mobile tiers

- **Desktop (≥1024px):** Full ambient + scroll
- **Tablet (768–1023px):** Reduced particles, fewer videos
- **Mobile (<768px):** Static or tap-to-play video; ambient canvas off or static

## Progressive load order

1. **Initial** — hero + visible projects
2. **Idle** — background canvas / gradients
3. **Scroll** — below-fold media
4. **Interaction** — Ask panel, heavy 3D, architecture detail

```tsx
import dynamic from 'next/dynamic'
const Heavy = dynamic(() => import('@/components/...'), { ssr: false })
```

## Before adding any motion or visual effect

Copy and verify:

```text
- [ ] Which effect-matrix row owns this? (not duplicating video/scroll/canvas/agent)
- [ ] Visible-only? IntersectionObserver pause when offscreen?
- [ ] Ambient capped at 24–30fps with single scheduler?
- [ ] Another canvas? → merge or reject
- [ ] Video? → poster default, preload="none", pause offscreen, ≤2 decoding
- [ ] Scroll? → transform/opacity only
- [ ] Blur? → static asset, not animated filter
- [ ] prefers-reduced-motion → ambient removed?
- [ ] Lazy/dynamic for below-fold or interaction-only code?
- [ ] Tested DevTools CPU 4× throttle + Lighthouse mobile?
```

## Key patterns

**IntersectionObserver (video / canvas pause):**

```tsx
const observer = new IntersectionObserver(
  ([entry]) => {
    const visible = entry?.isIntersecting ?? false
    // play video OR resume rAF when visible; pause/cancel when not
  },
  { threshold: 0.05, rootMargin: '50px' }
)
observer.observe(container)
```

**FPS cap (ambient canvas):**

```ts
const FRAME_MS = 1000 / 30
if (now - lastFrame >= FRAME_MS) { lastFrame = now; render() }
```

## Alignment with portfolio-visual

- Visual skill defines **what** motion should feel like (slow, deliberate, system-like).
- This skill defines **how much** motion the device can afford.
- When polish conflicts with budget, **reduce motion scope** — never add a second ambient system.

## Reference implementations

- `components/visuals/DotField/DotField.tsx` — visibility + reduced motion
- `components/visuals/AIBackground/AIBackground.tsx` — intersection pause
- `specs/visuals/dot-fabric.md` — canvas density (note: budget in `11-performance-budget.md` is authoritative for caps)
