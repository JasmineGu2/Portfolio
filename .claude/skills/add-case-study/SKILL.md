---
name: add-case-study
description: Add a new case study page to the portfolio with its copy in content/<slug>.md. Use when Jazz says "add a case study", "new case study for <company>", or wants a new work page.
---

# Add case study

1. Ask for: company, role, dates, and where the source notes are (Vault-2, notes/, a doc). Read them.
2. Create `content/<slug>.md`: frontmatter (title, role, dates, outcomes list), then one `##` section per part of the story. Only facts from the sources; mark gaps as `TODO(Jazz)`.
3. Make the route render it the same way the Autodesk case study does (see content/autodesk.md and its page). Reuse existing case-study components; no hardcoded copy.
4. Add a line to context/refs.md for the source notes.
5. Check: `pnpm build` passes, then screenshot the new page and show it.
6. Send copy-editor over content/<slug>.md and show its before/after table. Apply only what Jazz approves.
