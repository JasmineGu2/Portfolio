# Performance Budget

Motion, media, and rendering constraints for the Jasmine Gu portfolio. This is a **design-system problem**: one primary motion system per viewport; everything else static, paused, or cheap. Only animate what is visible.

Related: [Visual System](./04-visual-system.md) (look & feel), [Dot Fabric](./visuals/dot-fabric.md) (canvas surface), `.cursor/skills/portfolio-performance/SKILL.md` (agent checklist).

---

## Core principle

```text
One primary motion system per viewport
Everything else → static | paused | cheap
Only animate what's visible
```

If a new effect competes with an existing motion layer, **remove or defer** the weaker one, do not stack ambient animations.

---

## Effect responsibility matrix

Each layer has one job. Do not duplicate work.

| Layer | Responsibility | Not responsible for |
|-------|----------------|---------------------|
| **Videos** | Show work, interfaces, process, artifacts | Atmosphere, scroll narrative |
| **Connectors** | Relationships between nodes / tiles | Decorative motion |
| **Generative layer** (dot fabric, AI background) | Atmosphere, AI presence | Storytelling, video playback |
| **Scroll** | Narrative pacing, section reveals | Ambient particle fields |
| **AI agent (Ask panel)** | Exploration, query, highlight | Full-page ambient animation |

Before adding motion, ask: *which row owns this job?* If two layers answer the same question, consolidate.

---

## Mobile tiers

| Tier | Viewport | Motion budget |
|------|----------|---------------|
| **Desktop full** | ≥1024px | One canvas, ambient 24–30fps, 1–2 decoding videos, scroll transforms |
| **Tablet reduced** | 768–1023px | Lower particle cap, fewer simultaneous videos, same scroll rules |
| **Mobile static + tap-to-play** | <768px | No ambient canvas (or static poster), videos poster-only until tap, scroll-only narrative |

---

## Videos

- **Poster by default**, never autoplay a blank frame.
- **Play on visible or hover only**, use IntersectionObserver; pause when offscreen.
- **Max 1–2 videos decoding** at once site-wide.
- **Short, compressed** WebM (preferred) or MP4, sized to display dimensions, not source resolution.
- **Responsive encodes**, smaller files for card thumbnails vs hero.

```tsx
// Pause offscreen, pattern used in DotField, Tesla case study, etc.
const observer = new IntersectionObserver(
  ([entry]) => {
    const visible = entry?.isIntersecting ?? false
    if (visible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  },
  { threshold: 0.25, rootMargin: '50px' }
)
observer.observe(videoContainer)
```

```tsx
<video
  poster="/media/project-card.webp"
  preload="none"
  muted
  playsInline
  loop
/>
```

---

## Canvas (generative / dot fabric)

- **One global canvas** per viewport, no stacked full-screen canvases.
- **Particle caps by device:**
  - Desktop: 1,500–3,000 (hard ceiling ~3,000)
  - Mobile: 500–1,000, or **disable** ambient canvas entirely
- **24–30fps ambient**, not 60fps for background fields.
- **60fps only** for direct interaction (drag, hover response tied to pointer).
- **Single animation scheduler**, one rAF loop coordinates all canvas work; no independent loops per component.
- **IntersectionObserver pause**, cancel rAF when offscreen.

```ts
const TARGET_FPS = 30
const FRAME_MS = 1000 / TARGET_FPS
let lastFrame = 0
let frameId: number | null = null
let visible = true

function tick(now: number) {
  if (!visible) {
    frameId = null
    return
  }
  if (now - lastFrame >= FRAME_MS) {
    lastFrame = now
    render()
  }
  frameId = requestAnimationFrame(tick)
}

const observer = new IntersectionObserver(
  ([entry]) => {
    visible = entry?.isIntersecting ?? false
    if (visible && frameId === null) {
      frameId = requestAnimationFrame(tick)
    } else if (!visible && frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
  },
  { threshold: 0.05 }
)
observer.observe(canvasContainer)
```

See also: `components/visuals/DotField/DotField.tsx`, `specs/visuals/dot-fabric.md`.

---

## Scroll animations

**Allowed:** `transform`, `opacity`.

**Avoid animating:** `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, `filter: blur()`.

Scroll narrative should use GPU-friendly properties only. Prefer CSS transitions or a single scroll-linked transform per element.

---

## Blur

- **Do not animate `filter: blur()`**, it is expensive and triggers repaints every frame.
- Use **prerendered textures** (static PNG/WebP blur plates) or **translate3d on gradient layers** for depth.
- If blur is decorative, bake it into an asset; if it must move, move the layer with `transform`, not the filter.

---

## Lazy load & progressive unlock

Load in priority order, do not fetch everything on first paint.

| Phase | What loads |
|-------|------------|
| **Initial** | Hero, above-the-fold content, visible project tiles |
| **Idle** (`requestIdleCallback` or short delay) | Background canvas, non-critical gradients |
| **Scroll** | Below-fold images, video sources, section assets |
| **Interaction** | Ask agent panel, heavy 3D, architecture flow detail |

```tsx
// Images
<img src="..." loading="lazy" decoding="async" />

// Video, no preload until needed
<video preload="none" poster="..." />

// Heavy components, Next.js dynamic import
import dynamic from 'next/dynamic'

const AgentSidePanel = dynamic(
  () => import('@/components/portfolio/agent/AgentSidePanel'),
  { ssr: false, loading: () => null }
)

const DotField = dynamic(
  () => import('@/components/visuals/DotField/DotField'),
  { ssr: false }
)
```

---

## Fonts

- **Minimal weights**, only load faces actually used (typically 400 + one display weight).
- **WOFF2** format only in production.
- **Subset** to Latin + required glyphs; avoid loading full character sets for display faces.

Files live in `public/fonts/`; faces declared in `app/portfolio-fonts.css`.

---

## Responsive media

- **Images:** `srcset` + `sizes` for card grids and hero; serve WebP/AVIF where supported.
- **Videos:** separate encodes for card (low bitrate, short loop) vs detail page (higher quality, longer).
- Asset dimensions should match **display size × DPR cap**, not 4K for a 400px card.

---

## prefers-reduced-motion

When `(prefers-reduced-motion: reduce)`:

- Remove **ambient** animations (canvas drift, gradient pulse, auto-playing decorative loops).
- Keep **essential** feedback (focus rings, panel open/close if needed for usability).
- Videos: poster only; require explicit play.
- Dot fabric: static frame or hidden.

```css
@media (prefers-reduced-motion: reduce) {
  .ambient-canvas,
  .gradient-drift {
    animation: none !important;
  }
}
```

```ts
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

---

## Performance budget checklist

Use before shipping any new motion, video, or visual effect:

- [ ] **One canvas**, no second full-viewport generative layer
- [ ] **Particle caps**, desktop ≤3,000; mobile ≤1,000 or disabled
- [ ] **Max 1–2 videos decoding** simultaneously
- [ ] **No offscreen rAF loops**, IntersectionObserver pauses all ambient animation
- [ ] **24–30fps ambient**, 60fps only for direct pointer interaction
- [ ] **Lazy media**, `loading="lazy"`, `preload="none"`, dynamic imports for heavy UI
- [ ] **No animated blur**, prerendered or transform-only depth
- [ ] **Scroll uses transform + opacity only**
- [ ] **Minimal font weights**, WOFF2, subset
- [ ] **Effect matrix**, new motion does not duplicate an existing layer's job
- [ ] **DevTools / Lighthouse** verified on **CPU throttle** (4× slowdown) and mobile viewport

---

## Verification

1. Chrome DevTools → Performance → CPU 4× throttle → record scroll + hover + open Ask.
2. Lighthouse → Performance (mobile), watch TBT, LCP, CLS; investigate any new long tasks.
3. Rendering tab → check **Frames** during ambient animation; target ≤33ms/frame for ambient.
4. Network → confirm videos and heavy chunks load only after scroll or interaction.

---

## Related implementation

| Area | Location |
|------|----------|
| Dot fabric canvas | `components/visuals/DotField/` |
| AI background | `components/visuals/AIBackground/` |
| Video grids | `components/portfolio/experience-videos/` |
| Bento video tiles | `components/portfolio/bento-workflows/WorkflowBentoCanvas.tsx` |
| Visual motion rules | `specs/04-visual-system.md` |
| Agent skill | `.cursor/skills/portfolio-performance/SKILL.md` |
