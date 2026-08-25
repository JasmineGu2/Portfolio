# Visuals Layer — Overview

> Reusable animated surfaces and ambient effects that sit behind portfolio content — not page chrome, not data, not navigation.

---

## What belongs here

The **visuals layer** is a separate namespace from the core visual system (`specs/04-visual-system.md`). Typography, palette, and card families define *how content looks*. Visuals define *ambient motion and depth* behind that content.

| Layer | Spec | Code |
|-------|------|------|
| Design tokens & rhythm | [04 — Visual System](../04-visual-system.md) | `app/portfolio-theme.css`, page schemes |
| Animated surfaces | [Visuals index](./README.md) | `components/visuals/` |

Visual systems in this layer should be:

- **Reusable** — one component, many presets and placement contexts
- **Ambient** — slow, spatial, never competing with text or CTAs
- **Performance-aware** — Canvas or GPU where needed; pause when off-screen
- **Accessible** — respect `prefers-reduced-motion`; static fallback frame

---

## Current systems

| System | Spec | Component | Status |
|--------|------|-----------|--------|
| **Dot fabric** | [dot-fabric.md](./dot-fabric.md) | `components/visuals/DotField/` | ✅ Architecture hero + abstraction stages; CSS speckle on Work canvas + Ask panel |
| **Hover / context stack** | [hover.md](./hover.md) | — | 🔲 Concept — Ask panel context indicator |

---

## Placement rules

Use visuals **sparingly**:

- Architecture hero and runtime narrative sections
- Abstraction engine stages (density increases per level)
- Work bento canvas background (CSS `--pf-dot` speckle)
- Optional subtle dot texture on Ask panel background
- Optional ambient layer behind featured agent cards (see [10 — Agent Card Components](../10-agent-card-components.md))
- Never on individual Work bento tile faces or nav chrome

When adding a new visual system:

1. Add a spec under `specs/visuals/`
2. Implement under `components/visuals/<Name>/`
3. Register in [README.md](./README.md)
4. Link from `specs/04-visual-system.md` if it affects global visual rules

---

## Philosophy

> Treat motion as **system behavior**, not decoration.

Good visuals feel like the portfolio has a computational substrate — information terrain, a flexible membrane — not like a particle demo or starfield. Each dot, slab, or gradient belongs to a coherent surface; nothing floats independently unless the spec says so.

See [dot-fabric.md](./dot-fabric.md) for the canonical example of this philosophy in implementation.
