**Now:** Jazz wants the hero to look like a reference screenshot she took on her Mac ("something like this, in a very clean manner"). It didn't come through (Mac temp path). Get the image (paste into chat or save to context/images/), then build clean hero mocks in mocks/hero-vN combining it with her pick of the stack mocks (mocks/stack-v1..v5, mocks/stack-compare/compare.png).

## Where things stand
- Live at www.jasminegu.com (Vercel deploys from main with pnpm; both projects "portfolio-sz4g" and "website" build on every push). Everything is committed and pushed.
- Home: sticky header (JASMINE GU · Work/About · LinkedIn, email, RESUME), blueprint hero with new copy, 7 highlights, layer diagram (Safari-safe note), All/Engineering/Product/Side tabs, "Coming soon" tags, footer quotes from content/Quotes about engineering.md.
- About: tools pad with icons + hover cards (top layer), two polaroids, receipt of tools I've created, free-time + product trends cards, gallery, thought-pieces 3D shelf. Case studies: 864px column, line nav; only Autodesk + Tesla have write-ups.

## Open questions for Jazz
1. Remove the duplicate email + LinkedIn row from the hero card now that the header has them? (Also shortens the card, which runs ~76px past the fold at 1440.)
2. Footer "Currently" line still says "Leading engineering at Hack Western" (typed in public/mocks/k4-data.js). What should it say?
3. Stack mock pick: v1 primitives, v2 pyramid, v3 orbits, v4 blueprint section, v5 forms (mocks/stack-compare/compare.png).
4. Is "An ML eye tracking model watches where I look while I answer." accurate (content/tools-created.md)?
5. Hide the old /mocks/*.html pages (publicly reachable now)? Disconnect one of the two Vercel projects?
6. "Drive, Daniel H Park" in content/reading.md: the book is by Daniel H. Pink.
7. Write-ups still needed for 7 case studies (autodesk-eng, intuit, omers, metaverse, hack-western, stealth-startup, ivey-product).

## Files touched this session (high level)
- public/mocks/k2*.js/css, k4-data.js, k6.js/css, k6-ask.js (home + about, now tracked in git)
- app/page.tsx, app/about/page.tsx, app/layout.tsx, app/work/[slug]/page.tsx, next.config.js, vercel.json, tsconfig.json
- components/portfolio/case-study/*, reading/*, cursor/SiteCursor.tsx, VideoAutoplay.tsx
- content/: reading.md, tools.md, tools-created.md, about-photo.md, Quotes about engineering.md
- lib/portfolio/: case-studies/*, reading.ts, tools.ts, tools-created.ts, about-photo.ts, quotes.ts, hero-copy.ts
- mocks/map-v1, mocks/stack-v1..v5, mocks/stack-compare; docs/decisions.md
