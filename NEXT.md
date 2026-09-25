**Now:** Continue the Claude setup at Phase 6 (baseline numbers). Say "continue the Claude setup from ~/.claude/SETUP-PROGRESS.md".

## Then
1. **Blocker:** `pnpm build` fails on a type error that predates the setup: components/portfolio/SoundProvider.tsx:98 calls `.stop()`, which the `uisfx` 0.4 player type doesn't have. Fix before the Autodesk task.
2. Move Autodesk case study copy from app/autodesk (AutodeskCaseStudyClient) into content/autodesk.md. The copy actually lives in lib/portfolio/autodesk-case-study.ts (~3,000 words); public/case-studies/autodesk/Autodesk.md is a public duplicate. Done = pnpm build passes and a screenshot matches the current page.

## Where things stand
Claude setup Phases 1-5 done 2026-09-25: global CLAUDE.md, agents, skills, hooks, settings; this repo has CLAUDE.md, design.md, .claude/ (rules, agents, skills), context/, docs/decisions.md. Notes moved to notes/, build docs to docs/.

## Open questions
- Retire Bootzy and the old Tailwind palettes (n8n/canvas/workflow)? specs/04 and .cursor rules still describe Bootzy.

## Files touched this session
CLAUDE.md, design.md, NEXT.md, notes/intent.md, .claude/{rules/ui.md, agents/mockup-builder.md, agents/copy-editor.md, skills/add-case-study, skills/new-mock-variant}, context/{refs,links,inbox}.md, docs/decisions.md; moved Content.md, Ideas.md, Branding canvas, Jasmine Gu.md → notes/; TYPOGRAPHY/REFACTORING_SUMMARY/SKILLS_MAP_IMPLEMENTATION/DEPLOY.md → docs/; screenshots → context/images/; hero HTML → mocks/*-v1/; public/mocks$i-.html → public/_to_delete/.
