# Design system (source of truth for UI work)
Tokens live in `app/portfolio-tokens.css` (`--pf-*`). Use tokens, never raw hex. Supersedes specs/04 and docs/TYPOGRAPHY.md where they differ.

## Type (one job per font)
| Font | Token / class | Use |
|---|---|---|
| Fraunces | `--pf-font-editorial` / `.font-editorial` | editorial titles, hero statements |
| Inter | `--pf-font-body` / `.font-body` | body, nav, buttons, long text (default) |
| Awesome Shorten | `--pf-font-personality` / `.font-personality` | conversational, personality asides |
| Analogue OS | `--pf-font-system` / `.font-analogue` | system metadata, status, tool names |

## Color (name → value → role)
- `--pf-canvas` #ffffff → page background · `--pf-canvas-alt` #f5f5f5 → alt sections, bento canvas
- `--pf-ink` #666666 → body text · `--pf-muted` #6b6b6b → secondary text (5.3:1)
- `--pf-brand-orange` #ed3801 → hero name, cursor, buttons · `--pf-brand-orange-ink` → small orange text (AA)
- `--pf-accent` #d97757 → accent chips, gradient text
- Pastels: `--pf-gold` #e8c547 · `--pf-peach` #f4b896 · `--pf-lavender` #c8b8e8 · `--pf-sky` #b8d4f0 · `--pf-mint` #b8e8d4 → decoration only, never text
- Dark sections: `--pf-dark` #141210 · `--pf-dark-surface` #1c1916
- Page schemes: Architecture uses `--arch-*`; Work/Projects bento uses `--sch-*`.

## Shape and depth
- Radius: `--pf-card-radius` 1.35rem · `-lg` 1.5rem · `-sm` 0.875rem
- Borders: `--pf-card-border` (12% ink), hover `--pf-card-border-hover`
- Shadows: `--pf-shadow-outline*` only, subtle. Transitions: `--pf-card-transition` (180ms)

## Spacing
Tailwind 4px scale (gap-2/3/4, p-4, px-6/8 are the common steps). No arbitrary px values.

## Components (reuse before building)
`components/ui/`: button, card, badge, tabs, timeline, skeleton, image/video-with-skeleton, navigation-menu, theme-toggle, spotlight
`components/portfolio/`: SiteShell, SiteNav*, SiteFooter, ProjectCard/Grid, HeroBentoPanel, VideoAutoplay, PillCluster

## Don'ts
Neon purple or cyber-AI styling · glassmorphism or obvious gradients on every card · custom fonts on every element · stacked animated canvases.

## To confirm with Jazz
- Tailwind config still carries old `n8n`, `canvas`, `workflow` palettes. Are they live or leftovers?
- Bootzy is still loaded and used in 2 files. Retire it?
