**Blocker first:** `pnpm build` fails on a type error that predates the setup: components/portfolio/SoundProvider.tsx:98 calls `.stop()`, which the `uisfx` 0.4 player type doesn't have. Fix this before the Autodesk task (its check needs a passing build).

**Now:** Move Autodesk case study copy from app/autodesk (AutodeskCaseStudyClient) into content/autodesk.md
- The copy actually lives in lib/portfolio/autodesk-case-study.ts (~3,000 words); public/case-studies/autodesk/Autodesk.md is a public duplicate.
- Done = pnpm build passes and a screenshot matches the current page.

## Where things stand
Claude setup adopted 2026-09-25. Notes moved to notes/, docs to docs/. design.md drafted; specs/04 and .cursor rules still describe Bootzy (stale).

## Open questions
- Retire Bootzy and the old Tailwind palettes (n8n/canvas/workflow)?
