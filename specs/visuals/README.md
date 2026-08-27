# Visuals Specs

Implementation specs for reusable animated surfaces and ambient effects in the portfolio.

**Code home:** `components/visuals/`

**Design context:** [04, Visual System](../04-visual-system.md) · [Overview](./overview.md)

---

## Index

| Document | System | Component | Status |
|----------|--------|-----------|--------|
| [overview.md](./overview.md) | Visuals layer philosophy & placement rules |, | Reference |
| [dot-fabric.md](./dot-fabric.md) | Animated dot surface (continuous deforming fabric) | `components/visuals/DotField/` | ✅ Built |
| [hover.md](./hover.md) | Agent context stack (isometric slabs) |, | 🔲 Concept |

---

## How to use

```text
04 Visual System          ← typography, palette, cards, motion rules
        ↓
specs/visuals/            ← animated surfaces & ambient effects (this folder)
        ↓
components/visuals/       ← React + Canvas implementations
```

When implementing or extending a visual:

1. Read the relevant spec in this folder
2. Follow `.cursor/skills/portfolio-visual/SKILL.md` for palette and motion guardrails
3. Import from `@/components/visuals/<Name>/`
4. Update this index and [specs/README.md](../README.md) status table if shipping

---

## Legacy note

Dot fabric was originally spec **09** at the repo root. That file now redirects here. The full implementation reference lives in [dot-fabric.md](./dot-fabric.md).
