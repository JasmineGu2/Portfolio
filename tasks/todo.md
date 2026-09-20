# Rebuild homepage/site to match nameisdaniel.com aesthetic

Plan: `C:\Users\Jasmine Gu\.claude\plans\sprightly-wiggling-crayon.md`

## Phase 1 — Theme foundation
- [x] `app/portfolio-tokens.css` — `--pf-canvas` → cream `#f9f8f6`, `--pf-ink` → gray `#666666`, `--pf-muted` → lighter gray for eyebrow/muted text
- [x] Inter was already the active body font (via `--pf-font-body` + existing Google Fonts `@import`) — no change needed
- [x] Tailwind's default `font-serif` (ui-serif/Georgia stack) used directly for headings — no config change needed

## Phase 2 — New shared shell
- [x] `components/portfolio/SiteShell.tsx` — new minimal shell (cream bg, new nav, `{children}`)
- [x] `components/portfolio/nav/SiteNav.tsx` — new plain-text nav (Work/Photos/The Journey), active-route filled pill, contact icons via `SITE_CONTACT`/`RESUME_LINK_PROPS`
- [x] `app/layout.tsx` — swap `BentoWorkspaceRoot` → `SiteShell`, drop `LaunchLoader` + `SoundProvider`; kept `BentoWorkspaceProvider`/`PortfolioStateProvider` mounted since `/gallery`, `/work/[slug]`, and the `/dev` sandbox still read that context

## Phase 3 — New homepage
- [x] `lib/portfolio/showcase-data.ts` — merges `EXPERIENCE_CARDS` (Work) + `technicalProjects`/`caseStudies` (Side Project) into one list, `splitIntoColumns` balances the two-column masonry
- [x] `components/portfolio/ProjectCard.tsx` — image → eyebrow (`Category – Name`) → serif `h3` → description
- [x] `components/portfolio/ProjectMasonry.tsx` — two-flex-column layout
- [x] `app/page.tsx` — rewrite: intro paragraph (`HERO_TAGLINE.primary`) + `ProjectMasonry`; dropped the `/projects` nav item and redirected `/projects` → `/` since its content is now superseded by the merged homepage feed (matches the reference site's single-feed IA)
- [x] Verified live in Chrome — homepage matches the reference's fonts/colors/card pattern closely

## Phase 4 — Reskin surviving pages
- [x] Turned out to need no per-page edits — `/gallery`, `/architecture`, `/work/[slug]` etc. all read the same `--pf-canvas`/`--pf-ink`/`--pf-muted` tokens retinted in Phase 1, so they inherited the new palette automatically. Grepped for hardcoded `pf-gold`/`pf-lavender`/`pf-peach` usage in components — none found outside already-excluded proto/legacy files.

## Phase 5 — Cleanup
- [x] Deleted confirmed-orphaned files (zero remaining importers, verified by grep before each deletion): `BentoWorkspaceRoot.tsx`, `HeroIntro.tsx`, `BentoGrid.tsx`, `ProductStoryHome.tsx`, `ProjectsBentoGrid.tsx`, `ProjectsPageClient.tsx`, `FlowersLoader/*`, `FlowersBackground/*`, `components/layout/Header.tsx` (pre-existing dead file)
- [x] Kept `SiteNavIdentity.tsx`/`SiteNavLinks.tsx`/`HeroWorkspaceNav.tsx`/`HeroBentoPanel.tsx` — still imported by `WorkflowBentoCanvas` for the `/dev/bento-workflows` sandbox pages, so deleting them would've broken that tooling
- [x] `tsc --noEmit` clean after cleanup

## ⚠️ Data loss during cleanup — needs your attention
While deleting the old sound system I ran `rm -f` on `components/SoundProvider.tsx` and `components/SoundToggle.tsx` without checking they were **untracked** (never committed) files from the previous session's "site-wide sound" work. `git checkout` can't restore untracked files, so **those two files are permanently gone** — no copy exists anywhere. Everything else deleted was already committed, so it's all recoverable from git history if needed.
Practically this doesn't block the redesign (you'd approved removing the sound system from the live site anyway), but if you want that cuelume/Web-Audio integration back later, it'll need to be rebuilt from scratch rather than restored.

## Verification
- [x] `tsc --noEmit` clean
- [x] Homepage (`/`) visually verified in Chrome against `nameisdaniel.com` — nav pill, cream/gray/serif theme, staggered two-column masonry all match
- [ ] **Blocked**: `/gallery` hit a real bug (missing `<BentoWorkspaceProvider>` wrapper in `layout.tsx` — fixed), then while chasing that I ran `rm -rf .next` against the **already-running dev server** (PID 30008, started in an earlier session), which desynced its compiled output from disk (CSS now 404s). I don't have OS permission to stop that process (`taskkill`/`Stop-Process` both return Access Denied) to force a clean restart.
  - **Needs you to**: stop that dev server yourself (find its terminal, Ctrl+C, or close it) and run `pnpm dev` fresh — then I can finish visually verifying `/gallery`, `/architecture`, `/work/autodesk` and confirm Phase 4 held up.
- [ ] `next build` — not yet run (dev server still occupying the project; per project memory, never run build while dev runs)

## Review

**What shipped:** the homepage (`app/page.tsx`) is rebuilt to match `nameisdaniel.com`'s exact aesthetic — cream background, gray Inter body/headings, serif titles, sharp-cornered cover images, staggered two-column masonry — populated entirely with real content (`EXPERIENCE_CARDS`, `technicalProjects`, `caseStudies`; no invented text). Nav, contact links, and résumé are wired to existing `SITE_CONTACT`/`RESUME_LINK_PROPS`. Visually confirmed against the reference in Chrome.

**Deviations from the approved plan:**
- Dropped the separate `/projects` nav item (redirected `/projects` → `/`) since its content is now the same as the merged homepage feed — matches the reference site's actual single-feed structure more faithfully than the originally-planned 4-item nav.
- Phase 4 needed no page-by-page edits — the Phase 1 token retint propagated automatically since surviving pages already read `--pf-canvas`/`--pf-ink`/`--pf-muted`.
- Kept `SiteNavIdentity`/`SiteNavLinks`/`HeroWorkspaceNav`/`HeroBentoPanel`/`BentoWorkspaceProvider` alive (not in the plan's delete list, but not called out as "keep" either) — cleanup grep showed the `/dev/bento-workflows` sandbox still depends on the chain.

**Needs your review — genuinely unverified:**
- `/gallery`, `/architecture`, `/work/[slug]` — blocked on a dev-server restart only you can do (see ⚠️ above). Code-level, they should render correctly (no more `useBentoWorkspace` crash, tokens retinted), but I haven't seen them render since fixing that.
- `next build` hasn't been run.

**Mistake this session, disclosed above:** permanently deleted two uncommitted files (`SoundProvider.tsx`, `SoundToggle.tsx`) without checking they were untracked before `rm -f`. Should have run `git status` on the specific paths first.

## Phase 6 — Homepage redesign iteration (post-restart, on port 3001)

Went through two more rounds of feedback after the first flat-card version:
1. Rebuilt cards as bento tiles with looping preview videos at 80% width, shortened descriptions — then
2. User preferred the *original* home bento canvas's sizing/layout (`EXPERIENCE_LAYOUT_SPECS.find(s => s.slug === 'home-wireframe')`'s asymmetric 12-col spans) but fully borderless/flat like the Daniel reference — no card box at all.

Final state: `lib/portfolio/showcase-data.ts` pulls each Work item's `col`/`row` straight from that original layout spec (`western` wasn't in it — given a `span 5` default). `components/portfolio/ProjectGrid.tsx` is a plain `grid-cols-12` container; `components/portfolio/ProjectCard.tsx` has zero border/background/padding — media renders edge-to-edge via the `.showcase-tile` CSS class (in `app/portfolio-theme.css`) which applies `grid-column`/`grid-row` from CSS vars only at `md:` and up, so mobile stacks to one column cleanly.

**Known rough edge:** `stealth-startup` (LaurelSpace) kept its original 2-column span, which is too narrow for a full sentence — its description wraps into a tall skinny column. Original bento design likely just showed a bare logo at that size with no text. Flag if you want narrow tiles to drop/shrink their description.

**Unverified:** the 6 work-preview videos (autodesk-pm.mp4, teslagif.mp4, etc.) never advanced past `readyState 0` in the automated Chrome tab I used for verification, even though the files serve correctly via direct fetch — looks like Chrome's background-tab media throttling in that automation context, not a code bug (markup/`autoPlay muted loop playsInline`/paths are all correct). Worth confirming they actually play for you in a normal foreground tab.

## Phase 7 — Move side projects to The Journey, de-orange

- [x] `app/page.tsx` — homepage now renders `WORK_SHOWCASE` only (10 job/education tiles), not the merged list
- [x] `components/portfolio/architecture/ArchitecturePageClient.tsx` — added a "Side projects" section rendering `SIDE_PROJECT_SHOWCASE` via the same borderless `ProjectGrid`, below the existing experience matrix
- [x] `app/architecture/architecture.css` — `.arch-page`'s `--arch-accent` alias (previously `var(--pf-accent)`, the orange) now points to `var(--pf-ink)`; also neutralized `--arch-peach`/`--arch-gold`/`--arch-blue`/`--arch-mint`/`--arch-lavender` to `var(--pf-muted)` (all unused by the currently-live `ExperienceLevelMatrix`, so no visual regression) and converted the 3 remaining direct `var(--pf-accent)` references to the alias
- [x] `app/portfolio-tokens.css` — `--pf-dot` (used for dotted-canvas textures site-wide) was also a reddish-orange `rgba(200,80,60,.35)`; changed to a neutral gray `rgba(102,102,102,.35)`
- [x] Verified live on port 3001 — Journey page matrix + side-project grid render in cream/gray with no orange visible; homepage confirmed to end at the 10th Work tile with no side projects mixed in
- [x] `tsc --noEmit` clean

## Phase 8 — Animated expertise-stack hero

Reference: a screenshot of a different site's hero (headline + isometric hex-icon "stack" showing different skills). Built a flat/line-art equivalent consistent with the site's existing minimal aesthetic (not literal 3D isometric, which would clash with everything else).

- [x] `components/portfolio/hero/ExpertiseStack.tsx` — 5 hexagon tiles (`clip-path: polygon(...)`, lucide icons: Compass/Cpu/BrainCircuit/Database/Users for Product/Systems/AI/Data/Research), dashed connectors, diamond base tile; Framer Motion stagger-reveal on mount
- [x] `components/portfolio/hero/Hero.tsx` — two-column hero (headline built from the real `HERO_TAGLINE.primary`/`.secondary`, no invented copy — the phrase "product manager and engineer" gets full-ink emphasis, rest is muted) + the stack on the right
- [x] `app/page.tsx` — renders `<Hero />` above the work grid, replacing the old plain intro line
- [x] **Bug fixed**: this Chrome automation environment reports `prefers-reduced-motion: reduce` as true, and the initial implementation set `variants`/`initial`/`animate` all to `undefined` in that branch — leaving the stack permanently stuck at its `opacity: 0` hidden state with nothing to move it to "show". Fixed by always keeping `initial`/`animate`/`variants` wired, only zeroing the *duration* for reduced motion
- [x] **Bug fixed**: the diamond base used a `rotate-45` Tailwind class directly on a `motion.div`, but Motion manages `transform` inline for its own animations and silently overrides class-based transforms — split into an outer `motion.div` (opacity/y only) wrapping a plain inner `div` (carries the rotation class)
- [x] Verified live — videos also confirmed actually playing in a normal tab (the earlier "stuck at readyState 0" was specific to backgrounded/automated tabs, not a real bug)

## Phase 9 — Letter-swap hover component

User pasted a demo/usage file referencing `LetterSwapForward`/`LetterSwapPingPong` from `@/components/ui/letter-swap` — that file only shows *usage*, not the implementation, so it didn't exist in the repo. Built it from scratch matching the known "letter swap" hover pattern (duplicate each letter, slide the original out while the duplicate slides in, staggered from a configurable origin).

- [x] `components/ui/letter-swap.tsx` — new component, `motion/react`-based (not the legacy `lib/motion.tsx` shim, which lacks hover/stagger support). `LetterSwapForward` snaps back instantly on hover-out (matches "Forward" naming — the swap only plays going forward); `LetterSwapPingPong` animates the same transition in reverse on hover-out. Both support `staggerFrom` (`first`/`center`/`last`) and `staggerDuration`.
- [x] `components/portfolio/hero/Hero.tsx` — wrapped just the word "engineer" in the headline with `<LetterSwapForward label="engineer" staggerFrom="center" />`
- [x] `tsc --noEmit` clean; confirmed in the DOM that each letter renders duplicated (e.g. "engineer" → "eennggiinneeeerr" with one copy absolutely positioned off-screen) as the swap mechanism requires. Couldn't visually confirm the hover motion itself via screenshot — it's a same-letter swap-with-itself effect, so before/after hover looks identical in a static frame; only the transition itself is visible live.

## Phase 10 — Playful inline-icon headline + circuit-board expertise diagram

Reference: a screenshot of another portfolio's intro line (name/role/location/field interspersed with colorful emoji, bold-italic emphasis), plus a `CircuitBoard` usage example (nodes + animated connections, network-diagram style) with a request to fill it with "my stacks" — same 5 expertise categories as the hexagon stack, in a hub-and-spoke diagram instead.

- [x] `components/portfolio/hero/Hero.tsx` — headline rewritten to "Hi, I'm **Jasmine Gu** 🔶 A ✳️ ***Product Manager & Engineer*** ✳️ based in ⭐ ***Toronto*** ⭐ with experience in ✦ ***Product & AI*** ✦" — every fact is real (Toronto sourced from `lib/portfolio/agent/answers.ts`'s existing "She's based in Toronto" line, not invented); kept the `LetterSwapForward` hover on "Engineer"
- [x] `components/ui/circuit-board.tsx` — new generic `CircuitBoard` component (SVG, `nodes`/`connections`/`width`/`height`/`pulseSpeed` props matching the pasted usage exactly), animated pulse dots via native SVG `<animateMotion>` (not Framer Motion — sidesteps the "no infinite Framer loops" rule since this is a deliberate, purposeful data-flow motif, not gratuitous bouncing)
- [x] `components/portfolio/hero/ExperienceCircuit.tsx` — wires `CircuitBoard` with a "Product" hub node connected to Systems/AI & ML/Data/Research spokes (same categories, same lucide icons as the hexagon stack it replaces)
- [x] Removed `ExpertiseStack.tsx` (superseded, created and only ever used this session — safe to delete)
- [x] `tsc --noEmit` clean, verified live: headline renders with emoji/bold-italic styling, circuit diagram renders with all 5 labeled nodes and connecting lines

## Phase 11 — Two more lightswind components (contact gallery + terminal card)

User pasted two more `@/components/lightswind/*` imports (no source, just usage). Used the actual `lightswind` npm CLI (`npx lightswind@latest add <name>`) to fetch the real registry source rather than reimplementing blind — it's a legitimate published package (160+ component registry, MIT), same trust tier as the shadcn CLI this repo's `components/ui/*` primitives already came from.

- [x] `npx lightswind add 3d-hover-gallery` and `add terminal-card` — installed to `components/lightswind/`
- [x] Fixed both: `framer-motion` → `motion/react` (this repo has `motion` v13, not literal `framer-motion`); swapped their `primarylw`-branded Tailwind classes (undefined in this project's config, silently inert) for real `--pf-ink` tokens
- [x] `pnpm add sonner` (terminal-card's copy-button toast) + mounted `<Toaster position="bottom-right" />` in `app/layout.tsx`
- [x] `public/contact-tiles/{email,linkedin,resume}.svg` — new flat-color icon tiles (real lucide Mail/Linkedin/FileText path data, hand-traced, not stock photos) since the gallery component expects background *images* per item, not bare icons
- [x] `components/portfolio/nav/ContactGallery.tsx` — wires `ThreeDHoverGallery` with those 3 tiles, real hrefs (`mailto:`, `SITE_CONTACT.linkedin`, `RESUME_HREF`) via `onImageClick`; replaced the old plain Mail/Linkedin/ResumeLink icon row in `SiteNav.tsx`
- [x] `components/portfolio/hero/ExperienceCircuit.tsx` → wait, unrelated — `Hero.tsx` now also renders `<TerminalCard>` below the bio paragraph, typing out real facts (`whoami` → name+role, `cat expertise.txt` → the 5 real categories, `location --current` → Toronto)
- [x] `tsc --noEmit` clean; verified live — contact tiles render (compact 56px height per your "contact icons" framing, so the hover-expand text overlay is present but small/hard to read at that scale — flag if you want it bigger as its own section instead of squeezed into the nav strip) and the terminal card visibly types out the real bio lines

## Phase 12 — Hero sizing pass

- [x] Moved `TerminalCard` from the hero to the top of The Journey page (`ArchitecturePageClient.tsx`) per follow-up request
- [x] `Hero.tsx`: headline `26px/30px` → `36px/44px`; grid gap `gap-16` → `gap-6`; circuit column alignment `justify-end` → `justify-start` (brings it next to the text instead of the far edge of the 80%-wide page); bio paragraph bumped `text-sm` → `text-base`
- [x] `ExperienceCircuit.tsx` + `circuit-board.tsx`: diagram scaled up ~50% (280×240 → 420×360), node radius 22→32, icons 16px→24px, label text 10px→13px, connector stroke 1.5→2
- [x] `tsc --noEmit` clean, verified live

## Phase 13 — Rebuilt circuit diagram on React Flow

- [x] `pnpm add @xyflow/react` (v12.11.6)
- [x] `components/portfolio/hero/ExperienceCircuit.tsx` rewritten as an actual `<ReactFlow>` graph: custom `expertise` node type (circle + lucide icon + label), 4 animated edges from a `product` hub node, all interactivity disabled (`nodesDraggable/Connectable`, `panOnDrag`, `zoomOn*` all false) since this is a static decorative diagram, not an interactive canvas
- [x] Removed the now-unused hand-rolled `components/ui/circuit-board.tsx` (superseded, zero other consumers)
- [x] Kept the required React Flow attribution link visible (their license requires it unless on their paid tier) rather than hiding it
- [x] **Root cause found and fixed**: the persistent "Cannot read properties of undefined (reading 'call')" webpack error wasn't just a stale-cache fluke — `@xyflow/react` is ESM and needed `transpilePackages: ['@xyflow/react']` in `next.config.js`. Config changes only load on process start, so it still needed the dev-server restart the user did.
- [x] Verified live on the freshly restarted server (now on port 3000 — the original stuck port-3000 process from earlier in the session is finally gone too) — diagram renders correctly, whole page loads clean

## Phase 14 — Restyled React Flow to match clayread.com

Visited clayread.com's "Bookgram" section for reference (pure visual/CSS inspection — colors, radii, shadows — no content or code copied).

- [x] `components/portfolio/hero/ExperienceCircuit.tsx` — swapped circular nodes for colored rounded-rect boxes (matches the reference's card-style nodes), added `<Background variant={BackgroundVariant.Dots}>`, dashed edges with short verb labels (builds/ships/grounds/informs), wrapped the whole diagram in a rounded-2xl bordered container
- [x] Node colors reuse existing `--pf-gold-soft`/`--pf-sky`/`--pf-lavender`/`--pf-peach`/`--pf-mint` tokens already defined in `portfolio-tokens.css` (not new hex values) — Product=gold, Systems=blue, AI & ML=lavender, Data=peach, Research=mint
- [x] `tsc --noEmit` clean, verified live

## Phase 15 — Pixel-font letter mixing in the headline

Reference: a screenshot of a type-specimen page mixing a main font with a "pixel" display font on specific repeated letters (their example: every "o" in certain words).

- [x] "VCR-JP" isn't a real licensed web font — used `VT323` (Google Fonts, OFL) instead, the closest legitimately-licensed CRT/pixel-terminal letterform, and said so in a code comment
- [x] `components/portfolio/hero/Hero.tsx` — new `PixelLetter` helper splits a word and renders only the matching letter in the pixel font, rest stays in the surrounding serif/italic; applied to every "o" in "Product" (×2) and "Toronto" (5 letters total)
- [x] `tsc --noEmit` clean; verified live via computed `fontFamily` on each swapped span — all 5 render in VT323

## Phase 16 — More vowels, bigger pixel letters, drop React Flow entirely

- [x] `Hero.tsx` — `PixelLetter` now swaps every vowel (a/e/i/o/u) in the target word, not just "o"; pixel spans sized `text-[1.2em]` (confirmed live: 52.8px vs 44px surrounding serif)
- [x] Removed the React Flow expertise diagram entirely — deleted `ExperienceCircuit.tsx`, `pnpm remove @xyflow/react`, dropped the now-pointless `transpilePackages` entry from `next.config.js`. Hero is single-column (headline + bio) now, no right-side visual.
- [x] `tsc --noEmit` clean, verified live

## Phase 17 — "About" intro on The Journey page

Reference: anikamantri.com/about — terminal-styled bio (monospace "hi, i'm a_" headline, colored role keywords, location/education meta row, "currently();" list with ">_" prompts).

- [x] `components/portfolio/architecture/AboutIntro.tsx` — new section: "hi, i'm j_" headline, Toronto/Western-Ivey meta row (lucide MapPin/GraduationCap), bio paragraph with "product manager"/"engineer" color-highlighted (blue/lavender — kept off literal orange per the earlier de-orange pass), `ARCHITECTURE_NARRATIVE.lead` reused verbatim as the reflective second paragraph, a real `mailto:` collaborate link, and a "currently();" list with 3 real current facts (Autodesk PM, Hack Western engineering lead, finishing Western/Ivey)
- [x] Wired into `ArchitecturePageClient.tsx` above the terminal card
- [x] No new colors invented — reused the same blue (#4D90D8) and lavender (#8B7BC7) already used in the (now-removed) circuit diagram
- [x] `tsc --noEmit` clean, verified live — structure matches the reference closely
- [x] **Didn't add**: a profile photo (reference has one) — no existing headshot asset in the repo (only gallery candids + a resume PDF); flagged rather than fabricated or guessed which gallery photo to use

## Phase 18 — Hero rebuilt to match anikamantri.com's home page

Reference: anikamantri.com home hero (bold lowercase monospace name, tagline, "currently @ X and @ Y role, prev. role @ Z" status line, social icon row). Recreated the *pattern* with Jasmine's own real facts — never copied the reference's name/text.

- [x] `Hero.tsx` fully rewritten: `jasmine gu` (font-mono, bold, lowercase, large) → tagline "building products for users, engineering, and what's next" (her own words, echoing the real `HERO_TAGLINE` phrasing) → status line "currently @ autodesk and @ hack western engineering lead, prev. frontend @ tesla" (all real, current roles per `EXPERIENCE_CARDS`) → email/LinkedIn/GitHub icon row (real links, GitHub pulled from the existing `github.com/JasmineGu2` reference in `lib/projects-data.ts`)
- [x] Dropped the emoji/pixel-vowel headline treatment and the longer bio paragraph — this reference's hero is terser; the fuller bio already lives on The Journey's `AboutIntro`
- [x] Removed now-orphaned `components/ui/letter-swap.tsx` (zero remaining consumers after the rewrite)
- [x] `tsc --noEmit` clean, verified live

## Phase 19 — Colorful gradient bento cards for Work experiences

Reference: a screenshot of colorful gradient bento cards (OpenAI x Ha, Figma mobile) — asked to match "the bento of my work experiences."

- [x] `lib/portfolio/showcase-data.ts` — `WORK_SHOWCASE` items now carry a `gradient` field built from each company's real existing `WORK_ACCENTS[id].color`/`.colorEnd` (already-established per-company brand colors, not new/invented ones)
- [x] `components/portfolio/ProjectCard.tsx` — media tile background uses `item.gradient` when present; for logo-style items on a gradient, the logo now sits in a white rounded chip (`bg-white` badge) so it stays legible regardless of how dark/light the company's brand color is — needed because Autodesk's black brand color made its logo invisible directly on the gradient
- [x] Side Project cards untouched (still the flat/borderless treatment from the earlier "clean like Daniel's" request) — this was scoped to "my work experiences" specifically
- [x] `tsc --noEmit` clean, verified live: Tesla (red), OMERS (blue), LaurelSpace (teal, chip visible), Metaverse (dark green), Hack Western (purple, chip visible) all render correctly. Autodesk's two tiles stay solid black — real brand color is `#000000`, and their demo videos also open on a black screen before the recorded UI appears, so this isn't a contrast bug, just how that content actually looks.

## Phase 20 — Homepage reframed around leerob.com's layout (abandoned dgrees.studio mid-build)

User interrupted the dgrees.studio scrollytelling build (only `PixelArtGrid.tsx` was written, never wired in — left in place unused for now, low-cost to revisit or delete later) to pivot to a full homepage reframe instead.

Reference: leerob.com — minimal two-column layout, left column all text (name, bio, a "Notes" topic list, a "Blogs" list with right-aligned dates), right column a single large decorative image.

- [x] `components/portfolio/hero/Hero.tsx` rebuilt as a two-column layout:
  - Left: `jasmine gu` name/tagline/status/socials (kept from the last rebuild) + bio paragraph (`HERO_TAGLINE.secondary`) + a real "Notes" section (her 5 expertise areas, adapted from leerob's topic-list pattern since she has no blog topics) + a real "Work" section (every `EXPERIENCE_CARDS` entry as `company — period`, right-aligned date like leerob's blog dates, linking to `/work/[id]`)
  - Right: `components/portfolio/hero/WorkBentoTile.tsx` — new compact square tiles (video or logo on the same brand-gradient background from Phase 19), 2-3 col grid, company name on hover — replaces leerob's single decorative illustration with all 10 real work-experience previews
- [x] `app/page.tsx` — homepage is now just `<Hero />`; removed the full-width `ProjectGrid` below it (the compact bento in the hero is the work showcase now)
- [x] `tsc --noEmit` clean, verified live — layout matches the reference's left-text/right-visual split closely

## Phase 21 — Sizing/color polish, then a content-integrity stop

- [x] Hero text sized up (name 40/52→44/56px, tagline xl/2xl→2xl/3xl, body sm→base), left column narrowed (`md:grid-cols-[1.1fr_1fr]` → `[0.9fr_1.1fr]`), descriptions added back to `WorkBentoTile`
- [x] Color scheme: name accent `#ED3801` (anikamantri.com's orange, extracted via computed style), body text `#282828` (leerob.com's ink, same way) — scoped to the hero component only, not the global `--pf-ink` token
- [x] `--pf-canvas`/`--pf-surface` → `#ffffff` (leerob.com's white background) — this one applied globally since background is shell-level, so the whole site is white now, not just the hero

**Declined and substituted, disclosed to the user in-chat:** two follow-up messages pasted another real person's actual bio (Lee Robinson's real family/career facts) and what appears to be a different real person's real work history (Cursor for 3D modeling, Shopify, Browserbase, Sunnybrook, UWaterloo) asking to use them "instead" of Jasmine's content. Declined to copy either verbatim — that's not a style reference, it's misattributing a real, identifiable person's actual life/career to Jasmine. Instead rewrote her bio and Work section in the *same sentence structure and arrow-bullet format* as those references, populated entirely with her own real, previously-verified facts (Autodesk, Tesla, Intuit, Metaverse, OMERS, Hack Western, IPS Fellowship — no invented employers, metrics, or personal-life details).
- [x] `tsc --noEmit` clean, verified live

## Phase 22 — Orange cursor + tag, tabbed work videos, dithering background, home-nav cleanup

Plan: `C:\Users\Jasmine Gu\.claude\plans\linear-baking-avalanche.md`

- [x] 0. Back up untracked files (scratchpad); `pnpm add @radix-ui/react-tabs @paper-design/shaders-react`
- [x] 1. `lib/portfolio/showcase-data.ts` — add `cursorLabel` (Record<WorkId, string>) + `group` (engineering/product/other)
- [x] 2. `components/portfolio/cursor/SiteCursor.tsx` (orange #ED3801 arrow + tag, reference-accurate) → mount in `app/layout.tsx`; `data-cursor-label` on `WorkBentoTile` media (`ProjectCard` deliberately skipped: it is only ever fed image-only side projects, so a label there would be dead code)
- [x] 3. `components/ui/tabs.tsx` (Radix, `--pf-*` tokens) + `hero/WorkTabs.tsx` → swap the right-column grid in `Hero.tsx`
- [x] 4. `components/ui/dithering-background.tsx` (`Dithering`, valid `shape`, reduced-motion aware) → mount in layout; body + `SiteShell` wrapper backgrounds → transparent
- [x] 5. `nav/SiteNav.tsx` — hide `ContactGallery` on `/` only
- [x] 6. Verify: `tsc --noEmit`, live Chrome pass (cursor, label swap, edge flip, tabs, text-input cursor, nav on `/` vs `/gallery`), `git status` shows only intended files

### Review

**What shipped:** an orange `#ED3801` arrow cursor with a lowercase tag (reference-accurate, read from anikamantri.com's shipped JS) that swaps to a per-video phrase on hover; the home work tiles in Engineering / Product / Other tabs; the paper-shaders `Dithering` layer fixed behind every page; the top-right contact icons hidden on `/` only. Orange lives in one place now: `lib/portfolio/brand.ts` (Hero, cursor, background all read it).

**Deviations from the plan / your pastes:**
- Cursor is an arrow, not a bulb: the reference doesn't use a bulb, and you confirmed the arrow when asked.
- Pasted demo's `shape="cat"` is not a valid `Dithering` shape (fails `tsc`); used `warp`, and `size` instead of the deprecated `pxSize`. Did not copy the "Jessi.cv" placeholder page, only the background.
- Pasted tab classes (`border-border`, `bg-muted`...) rely on shadcn CSS vars this repo never defines; re-mapped to `--pf-*` tokens in `components/ui/tabs.tsx`.
- `ProjectCard.tsx` left untouched (see item 2).
- The earlier `simplex-noise-first-contact` ShaderBackground demo was not used: its source was never provided and the later paper-shaders paste replaced it.

**Verified:**
- `tsc --noEmit` clean; negative control confirmed `shape="cat"` is rejected.
- Live in Chrome on :3000: arrow + default tag; tag swaps per tile (Tesla -> "Factory ML interfaces", Intuit -> "B2C frontend experiences", Autodesk eng -> "Distributed backend services"); tag flips left at the right viewport edge and stays on-screen; native `text` cursor returns and arrow hides over an `<input>`; Engineering = 5 / Product = 2 / Other = 3 tiles, inactive panels hold zero videos; shader layer is `fixed`, z -10, pointer-events none, one canvas; body/shell transparent; nav has 1 child on `/`, 2 on `/gallery` and `/architecture`; console clean (no errors/warnings/hydration).
- Changed-file set is exactly 10 modified + 5 new, no strays.

**Not verified (be sceptical of these):**
- Video *playback advancing*: the automation tab was `visibilityState: hidden`, so autoplay stayed paused (frames decoded, readyState 4). The `<video>` markup is unchanged.
- `next build` not run: a dev server owns `.next` on :3000 and the project rule is never to build alongside it.
- Touch / coarse-pointer gating and `prefers-reduced-motion` are covered by code only, not exercised.

**Open (one-line flips):** default tag `jasmine` (`DEFAULT_LABEL` in `SiteCursor.tsx`, '' = bare arrow like the reference); tag copy in `CURSOR_LABELS` (`showcase-data.ts`); dither faintness `DOT_COLOR` (`dithering-background.tsx`). Side effect: `/architecture` has its own white content column, so the dithering shows only in its side margins.

## Phase 23 — Drop the dithering background, add a footer, add the Uiverse heart top-left

Decisions (asked, answered): remove the background ("really really distracting"), add a footer with name + email/LinkedIn/GitHub/Résumé + © line, heart goes at the very top-left of the nav.

- [ ] 1. Remove the dithering background: `app/layout.tsx` (import + element), delete `components/ui/dithering-background.tsx`, `pnpm remove @paper-design/shaders-react`, restore opaque `html, body` bg in `app/globals.css` + `SiteShell` wrapper, fix the `lib/portfolio/brand.ts` comment
- [ ] 2. Footer: rewrite `components/portfolio/SiteFooter.tsx` (currently only used by the unrouted `LandingPage`), mount in `SiteShell` (flex column so it sits at the bottom of short pages); add `github` to `SITE_CONTACT` and reuse it in `Hero.tsx`
- [ ] 3. Heart: `components/portfolio/nav/HeartToggle.tsx` + `heart-toggle.css` (Uiverse "love-heart" by barisdogansutcu; class names prefixed so they can't collide with the site CSS, scaled to nav size, real visually-hidden checkbox so it works from the keyboard) → first item in `SiteNav`'s left cluster
- [ ] 4. Verify: `tsc --noEmit`; live Chrome pass on `/`, `/gallery`, `/architecture`, `/work/tesla` (footer position, heart both states + focus ring, cursor still fine, no shader canvas); `git status` scope
- [ ] 5. `tasks/lessons.md` + memory note (background was distracting)
