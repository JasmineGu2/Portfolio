---
name: new-mock-variant
description: Make one or more new mock variants of a screen in mocks/<screen>-vN. Use when Jazz says "make a new mock", "try a variant of <screen>", or "give me N options".
---

# New mock variant

1. Confirm the screen and what should change (one sentence per variant). If Jazz named references, check context/refs.md.
2. Find the next free version numbers in mocks/ (never overwrite).
3. Start one mockup-builder subagent per variant, in parallel. Give each its own folder mocks/<screen>-vN and a one-line brief. If variants need React routes, give each its own worktree and dev port.
4. When they finish, show the screenshots side by side with each NOTES.md line.
5. Ask which to keep; log the choice in docs/decisions.md.
