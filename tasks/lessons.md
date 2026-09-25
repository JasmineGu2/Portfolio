# Lessons

Rules I write for myself after a correction or a near-miss. Newest first.

## 2026-09-24 (round 6: header, tabs, keycap, drag, Ask me anything)

- **Do not `setPointerCapture` on pointerdown for a generic drag wrapper.** The click that follows goes to the capturing element, so the pins inside a draggable never advanced. Capture only after the pointer has moved past a few pixels, and swallow the one click that ends a real drag.
- **In CSS, `:hover` and `:active` on the same element tie on specificity, so order decides.** The keycap stayed bright while pressed until the hover rule was moved above the press rule. Test the pressed state with `mouse.down()` in a browser.
- **A pasted component can carry `position: fixed` bits that land on the header.** The lanyard's "Drag to swing" hint sat on top of the nav links. After dropping in any pasted overlay, check `document.elementFromPoint` on the header links.
- **Chrome pauses muted autoplay videos that are off screen.** A test that expects every tile's video to be playing fails for the wrong reason; assert only on the visible ones.
- **A queued paste is recoverable from the transcript.** Her keycap source was in the `queue-operation` entries of the session `.jsonl`, not in a user message; search every entry for a unique token.
- **Old Q&A in git history is not a fact source.** `recruiter-qa.ts` had stale numbers (six internships, 400+ participants). Write answers only from the vetted `agent/answers.ts` and current site copy, and add a test that every number in the answers is on an allow-list.
- **A negative `margin-top` inherited from an old kit can put an element over a new header.** In the mock the lanyard box covered the "Ask me anything" link; Playwright's "intercepts pointer events" message names the culprit.

## 2026-09-24 (round 4 mocks, the Play page, a pile of install prompts)

- **A long paste with many asks is a queue, not a pivot.** She sent about ten instructions across four messages and then asked "are you finishing each of my prompts?" and "stop redirecting the attention". List every ask with its status the moment a new message lands, finish the queue in order, and answer status questions with the table first. Do not restart the design because the newest message changed a colour.
- **Deferring "real" work because a mock exists reads as not doing it.** Her pasted `npx shadcn add ...`, `claude mcp add ...` and `import {Outline} ...` lines were instructions for the real repo. Do them, verify on `localhost:3000`, and say plainly what is blocked (Originkit needs her sign-in).
- **Do not park a stand-in server on port 3000.** It 404'd `/` and she thought the site was gone. Restart `next dev` instead; it serves `public/` (the mocks) too.
- **Check peer dependencies before installing a design library.** Astryx wants React 19 and crashed both article pages until the `react` alias shim and no `Theme` provider. Type-check passing is not enough: load the page and read the console.
- **Load the page before trusting "no errors".** Hydration mismatches (the pasted lanyard's inline `<style>`) and a wrong `opentype.js` major only showed in the browser console.
- **The Bash tool strips backslashes in heredocs and inline python.** Write regexes and scripts with the Edit or Write tools. And never pass 8.3 short paths (`JASMIN~1`) to Write: it creates stray folders (I made and removed two).
- **Test fixtures must mirror the app's accounting.** My blackjack check reconstructed the pre-bet balance wrong for an instant blackjack; the app was right. Debug the failing case before "fixing" the app.

## 2026-09-23 (portfolio copy, buttons, centering pass)

- **Grep for a class name before making it shared.** I named the new button class `.pf-pill`; `portfolio-theme.css` already defined it for legacy keycap tags, so my class silently inherited a hard drop shadow. `git grep -n "<name>" -- '*.css' '*.tsx'` first, and check computed styles in a browser, not just the source.
- **A CSS file that loads later wins ties.** New shared rules go in a file imported last (`app/pf-btn.css` after `bento-work-accents.css`), and any per-component layout override of a shared rule has to live in that same file after it.
- **"Text is on the left" is a measurement, not a guess.** Measure `getBoundingClientRect` center offsets at 390 / 1440 / 2661 with Playwright before and after. That also caught `/autodesk` not scrolling at all (stale `overflow: hidden` lock from the removed `.bw-main` shell), which no screenshot showed.
- **When you enter plan mode and the user keeps sending requests, say plainly that nothing has changed yet.** They asked "where are these changes?" because plan mode is silent from their side.
- **Facts the user pastes beat facts already on the site, but ask.** The paste said Hack Western team of 8 / 300+ and IPS 2 years / 28 educationals; the site said six engineers / 400+ and a 10-week bootcamp. I asked once, then updated every occurrence and grepped for leftovers instead of trusting agent reports.
- **The Grep and Glob tools can fail with `uv_spawn` on this machine.** Use `git grep` / `git ls-files -co --exclude-standard` through Bash.
- **Check tracked state before deleting.** Everything I removed (`AboutIntro`, terminal card, gallery panels, `app/gallery/page.tsx`) was confirmed tracked with `git ls-files --error-unmatch`, and files with uncommitted edits were copied to the scratchpad first.

## 2026-09-24 (round 7: tabs, pinboard, mobile, road maps)

- **Never capture the pointer on press.** The Draggable wrapper captured on pointerdown, so clicks on children (pins, cards) retargeted to the wrapper and did nothing. Capture only after a 4px move, and swallow the click that follows a real drag.
- **Hover rules go above press rules.** The keycap's `:hover` came after `:active`, so the pressed look never showed.
- **Videos on phones need three things:** `muted`, `playsinline`, and a play() retry on first touch. One global observer (`VideoAutoplay`) beats per-tile code, and pausing far off-screen videos saves data.
- **A `min-height: var(--x)` that reads its own measurement is a feedback loop.** The road-map header set `--hh` from its own `offsetHeight` and used it as `min-height` (content-box), so it grew 29px every load and pushed the stage past the window. Measure with a ResizeObserver and never feed the value back into the element it measures.
- **SVG layer order is the hit-test order.** The tool-street hit paths sat above the pins and swallowed clicks. Draw hits first, pins last.
- **Two "different" streets can be the same line.** On the rail map, Python and Node.js pair-streets were both offset ~95px from a collinear station line, so one fully hid the other. Check overlap by sampling `elementFromPoint` along each street.
- **Tests that click the bbox centre of an SVG group are flaky** (the centre can be empty space or another element). Click the shape (`.pc`), or sample points along the shape and pick one where it is the top element.
- **innerText applies `text-transform`.** Match uppercase labels with `/i`.
- **Bash heredocs with apostrophes or backticks in the body break on this machine.** Write scripts with the Write tool, or patch with `python - <<'EOF'` only when the body has no shell-sensitive quoting problems (a single quoted EOF is fine for Python that avoids a lone `'` in the shell text).
- **Only one dev server on :3000.** An orphan Next process answered 404 while the real one was starting; kill both and restart one.
- **When she asks "did you finish everything?", answer from the list.** Say what is done and verified, what is waiting on her (Originkit sign-in, launches list, Pinterest quotes, stack letter), and what was not checked (real-phone touch, Safari/Firefox).

## 2026-09-24 (round 7, part 2: dev server, patch scripts, tests)

- **A second `next dev` wipes `.next` and breaks the first one.** Starting `pnpm dev` while an orphan server held :3000 made Next pick :3001, delete the shared `.next`, and the orphan then answered 500 ("Cannot find module './vendor-chunks/…'"). Before starting, check `Get-NetTCPConnection -LocalPort 3000`. If a server you cannot kill (Session 0, access denied) is stuck, `touch next.config.js` makes it restart itself, then start yours only if the port is free.
- **Python patch scripts in a Bash heredoc lose backslashes.** `"\\n"` became a real newline and the patch silently did nothing before failing to find its anchor. Use the Edit tool for anything containing `\n`, `\(` or `\s`.
- **Screenshot tests of a flipped card test the wrong face.** The badge test flipped the card, then "verified" the front face from the back. Flip it back first, and check the result by looking at the image once.
- **Shared-row grids stretch short items.** A two-column legend built with `grid-template-columns` gave every row the height of its tallest item; CSS `column-count: 2` with `break-inside: avoid` flows items naturally.
- **Add a tab, re-check the tab row on a phone.** Four tabs did not fit the 312px column; the row now runs edge to edge (`width: 100vw`) with `min-width: 44px` per tab.
- **When she adds content to a fixed layout, re-measure the neighbours.** Nine legend entries made the tools card 850px tall and it sat on top of three pieces; measure real bounding boxes (not the estimates in `PIECES`) and re-lay the board.
- **`color-mix()` computes to `color(srgb r g b)` in Chrome, not `rgb()`.** A contrast script or test that only parses `rgb(...)` returns null for tokens like `--pf-brand-orange-ink`; parse both.
- **Load margin and play margin are different numbers.** One IntersectionObserver with a 300px margin kept far-off videos playing; use a wide margin to fetch and a tight one to play.
- **Count what the page really has before asserting.** The All tab has 10 tiles but only 6 videos; a test that assumed 10 failed for the wrong reason.
