---
paths:
  - "app/**"
  - "components/**"
  - "lib/portfolio/**"
---
# UI rules
- Read design.md before editing. Use `--pf-*` tokens and existing components.
- Copy comes from content/*.md, not string literals in components.
- Motion: one primary motion system per viewport; animate transform/opacity only; pause offscreen work; respect prefers-reduced-motion. Budget in specs/11-performance-budget.md.
- Media: poster + preload="none" on video; lazy-load below-the-fold; max 1-2 videos decoding.
- After UI changes: pnpm build, screenshot, then design-reviewer and accessibility-tester.
