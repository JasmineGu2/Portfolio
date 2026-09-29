# Portfolio

Jazz's personal site. Next.js 14 (app router), React 18, Tailwind 3, pnpm. Deployed on Vercel.
This folder is also an Obsidian vault: notes and code share the repo.

@notes/intent.md

## Commands
- `pnpm dev` (port 3000) · `pnpm build` · `pnpm lint`

## Done means
1. `pnpm build` passes, and
2. a screenshot of every changed page looks right (Claude in Chrome or `npx playwright screenshot http://localhost:3000/<route> shot.png`). Show Jazz the screenshot.

## Where things live
- `app/`: live routes (home, about, architecture, autodesk, tesla, work/[slug], projects, ask)
- `components/portfolio/`: site components · `components/ui/`: primitives (button, card, badge, tabs, timeline…)
- `lib/portfolio/`: data and case-study copy (being moved to content/)
- `content/*.md`: copy the site renders. Jazz edits it in Obsidian. Never hardcode user-facing text.
- `design.md`: current visual system
- `notes/`: Obsidian notes · `context/`: refs.md, links.md, images/, inbox.md
- `mocks/<screen>-vN/`: mock variants · `tasks/lessons.md`: 60 hard-won rules; read the relevant ones before similar work
- `.claude/rules/ui.md` loads automatically for UI files.

## Archived (moved to ../portfolio-archive)
- Old product specs (specs/01-11)
- Prototype routes (proto/, dev/, bento/, mocks-gallery, hero-variations-demo, stack-colors, city-growth)
- Reference: `../portfolio-archive/README.md`

## Rules
- UI work reads design.md first; after UI changes run design-reviewer and accessibility-tester.
- Case studies follow the pattern in the add-case-study skill.
- Main vault (~/Documents/Vault-2) holds job search and general writing; open it only if a task needs it.
