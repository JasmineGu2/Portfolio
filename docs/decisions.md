# Decisions

## 2026-09-25 · Adopted Claude setup (global CLAUDE.md, agents, skills, hooks)
- Why: stop losing work and context between sessions; make subagents, checks and wrap-ups the default.
- Alternatives: keep ad-hoc prompts and tasks/todo.md only.

## 2026-09-25 · Current fonts are Fraunces / Inter / Awesome Shorten / Analogue OS
- Why: matches the live CSS tokens.
- Alternatives: Bootzy set (.cursor rules, specs/04), National 2 set (docs/TYPOGRAPHY.md).

## 2026-09-25 · Repo layout: notes/ for Obsidian notes, docs/ for build docs, context/ for refs
- Why: notes were loose at the root and inside specs/; one place per kind of file so Claude and Obsidian both find them.
- Alternatives: keep notes at the root; a separate vault outside the repo.

## 2026-09-28 · Archive prototypes to separate portfolio-archive repo
- Why: proto/dev/bento/specs folders bloated context to ~70K lines; split cleans up focus and response time.
- Moved: app/proto/, app/dev/, app/bento*, app/stack-colors, app/city-growth, app/mocks-gallery, specs/01-11.
- Kept: live routes only (home, about, architecture, autodesk, tesla, work/[slug], ask, projects).
- Alternatives: delete prototypes entirely (but archive preserves them for reference).
