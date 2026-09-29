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

## 2026-09-28 · Ultra-lean main repo: keep only home, about, work, ask
- Why: focus on core site; everything unused was bloating context and distraction; archive preserves history.
- Moved to archive: routes (autodesk, tesla, architecture, projects, intuit, metaverse, omers, experience-videos, ai, about-v2), CSS (case-study-*, landing-theme, pf-*, bento-*), public folders (case-studies, contact-tiles, gallery, play, projects, puzzle, videos).
- Kept: app/(home), about, work, ask, api; public/fonts, icons, mocks, work; all content markdown.
- Result: ~92% codebase reduction; main repo now ~50 routes → 5 routes, focused on live site only.
- Alternatives: keep everything in main (but bloats context and CI); delete instead of archive (but loses reference).

## 2026-09-28 · Restore 5 global CSS files the ultra-lean cleanup removed
- Why: globals.css still imports n8n-design-system, bento-scheme-global, bento-work-accents, pf-blueprint, pf-ask; `pnpm build` failed without them, and live pages use their classes (footer pf-foot/pf-quote, ask panel, work tiles).
- Also re-added SoundProvider, PortfolioStateProvider, BentoWorkspaceProvider to the root layout (dropped with SiteShell in c5fb8d0; /work/[slug] needs them). SiteShell stays out.
- Alternatives: delete the imports (would silently unstyle footer and ask panel); prune dead selectors (later, as its own task).

## 2026-09-29 · Track public/mocks in git
- Why: the live home and About pages are built from public/mocks (k2/k4/k6 js/css/data). It was excluded locally in .git/info/exclude, so Vercel never got it and the deployed home page would render empty. Jazz asked to stop ignoring it.
- Note: the older throwaway mock pages (1-69-*.html, m52-m58) ship too and are reachable at /mocks/<file>.html once deployed.
- Alternatives: move only the live files to public/site/ and keep mocks excluded (cleaner URLs, more moving parts); keep excluding (site breaks on deploy).

## 2026-09-29 · Vercel builds with pnpm; one file for the home route
- Why: vercel.json still forced npm, which rejects @astryxdesign/core's React 19 peer range (pnpm accepts it; lib/react19-shim.js covers it), so every deploy failed at install. Then app/page.tsx re-exporting app/(home)/page.tsx left an empty .next/server/app/(home) and Vercel failed on its client-reference manifest. Now vercel.json uses pnpm and app/page.tsx is the only "/" page; the group moved to _to_delete/ (excluded in tsconfig).
- Alternatives: `npm install --legacy-peer-deps` (hides a real mismatch, two package managers); keep the route group and add a layout with a client component (works around, doesn't remove the duplicate).

## 2026-09-29 · About badge removed; polaroids + receipt instead
- Why: the physics lanyard was laggy and Jazz asked to remove it. The About top is now tools pad + two polaroids (content/about-photo.md) on the left and a receipt strip of tools-I've-created (content/tools-created.md "Short:" lines) on the right.
- Alternatives: optimise the lanyard (stopped mid-way when she chose to remove it).

## 2026-09-30 · Safari fixes: HTML note overlay, PNG favicon
- Why: WebKit misplaces HTML inside SVG <foreignObject> under transforms/viewBox scaling, and ignores SVG favicons. The hero note is now an HTML overlay positioned from SVG coordinates; favicon ships as SVG + PNG + ICO + apple-touch.
- Alternatives: SVG <text> for the note (loses wrapping and the handwritten styling).
