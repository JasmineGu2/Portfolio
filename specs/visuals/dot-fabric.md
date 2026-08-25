# Dot Fabric Visual System

> Animated dot surface for Architecture hero backgrounds and ambient system sections.
> Part of the [visuals layer](./README.md) — see [overview.md](./overview.md) for placement philosophy.

**Component:** `components/visuals/DotField/` · **Import:** `@/components/visuals/DotField/DotField`

### 1. Purpose

Create a reusable animated visual system made from **small circular pixels arranged as a continuous deforming surface**.

The visual must feel like:

- computational fabric
    
- information terrain
    
- a flexible digital membrane
    
- a dotted 3D surface
    
- coherent and spatial
    
It must **not** feel like:

- random particles
    
- stars
    
- constellations
    
- Matrix rain
    
- confetti
    
- floating dust
    
- generic particle backgrounds
    

The key rule is:

> Every dot belongs to the same surface.

---

## 2. Rendering

Use:

```txt
React + TypeScript
Canvas 2D initially
requestAnimationFrame
```

Do not render dots as DOM elements.

Component:

```txt
/components/visuals/DotField/
  DotField.tsx
  dotFieldMath.ts
  dotFieldPresets.ts
  usePointerField.ts
  types.ts
```

---

## 3. Component API

```ts
type DotFieldPreset = "ambient" | "terrain" | "curtain";

type DeformationPoint = {
  x: number;          // normalized 0–1
  y: number;          // normalized 0–1
  radius: number;     // px
  strength: number;   // px
  directionX?: number;
  directionY?: number;
};

type DotFieldProps = {
  preset?: DotFieldPreset;

  spacing?: number;
  dotRadius?: number;

  opacity?: number;

  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;

  noiseScale?: number;
  noiseStrength?: number;
  noiseSpeed?: number;

  foldStrength?: number;

  mouseRadius?: number;
  mouseStrength?: number;

  deformationPoints?: DeformationPoint[];

  scrollProgress?: number; // 0–1

  interactive?: boolean;
  animate?: boolean;

  className?: string;
};
```

---

# 4. Default values

```ts
const defaults = {
  spacing: 10,
  dotRadius: 1,

  opacity: 0.5,

  waveAmplitude: 32,
  waveFrequency: 0.012,
  waveSpeed: 0.00025,

  noiseScale: 0.0035,
  noiseStrength: 22,
  noiseSpeed: 0.00008,

  foldStrength: 80,

  mouseRadius: 240,
  mouseStrength: 22,
};
```

Desktop:

```txt
spacing: 8–11px
dot radius: 0.8–1.5px
```

Mobile:

```txt
spacing: 12–16px
dot radius: 0.8–1.3px
```

---

# 5. Grid

Generate a uniform grid.

```ts
for (let y = -padding; y < height + padding; y += spacing) {
  for (let x = -padding; x < width + padding; x += spacing) {
    // calculate transformed dot
  }
}
```

Recommended:

```txt
padding: 100px
```

Never randomly position dots.

The grid should initially be mathematically perfect.

---

# 6. Base wave deformation

Each point receives smooth displacement.

Concept:

```ts
const waveX =
  Math.sin(y * frequency + time * speed) *
  amplitude;

const waveY =
  Math.cos(x * frequency * 0.8 - time * speed * 0.7) *
  amplitude;
```

Then combine the waves rather than applying them equally:

```ts
const surface =
  Math.sin(x * 0.012 + time * 0.00025) *
  Math.cos(y * 0.009 - time * 0.00018);

const dx = waveX * surface;
const dy = waveY * surface;
```

Final:

```ts
let px = x + dx;
let py = y + dy;
```

Neighboring dots must always move coherently.

---

# 7. Large folds

This is the defining effect.

Each deformation point creates a large bend in the surface.

Calculate:

```ts
const dx = px - centerX;
const dy = py - centerY;

const distanceSq = dx * dx + dy * dy;

const influence =
  Math.exp(-distanceSq / (radius * radius));
```

Apply:

```ts
px += directionX * influence * strength;
py += directionY * influence * strength;
```

Recommended ranges:

```txt
radius:
300–750px

strength:
40–180px
```

Do not create small ripple effects.

The visual should form **large structural folds**.

---

# 8. Depth value

Every dot should have a synthetic depth value:

```ts
const depth =
  waveDepth +
  foldDepth +
  noiseDepth;
```

Normalize:

```ts
const normalizedDepth =
  Math.max(0, Math.min(1, (depth + 1) / 2));
```

Use depth to control the appearance of the dot.

---

# 9. Dot radius

```ts
const radius =
  baseRadius *
  lerp(0.55, 1.65, normalizedDepth);
```

Typical result:

```txt
minimum radius: ~0.5px
average radius: ~1px
maximum radius: ~2px
```

Never allow giant particles.

---

# 10. Dot opacity

```ts
const dotOpacity =
  baseOpacity *
  lerp(0.12, 1, normalizedDepth);
```

Deep/receding portions should almost disappear.

Closer portions become more visible.

This produces 3D form without drawing traditional shadows.

---

# 11. Visibility masks

The field should not cover the entire viewport uniformly.

Create reusable radial masks.

```ts
function radialMask(
  x: number,
  y: number,
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number
) {
  const d = Math.hypot(x - cx, y - cy);

  return 1 - smoothstep(
    innerRadius,
    outerRadius,
    d
  );
}
```

Final opacity:

```ts
opacity *= maskA;
opacity *= maskB;
```

Or subtract holes:

```ts
opacity *= 1 - holeMask;
```

Required behavior:

```txt
dots dissolve gradually
no rectangular clipping
no obvious circular edge
no abrupt ending
```

---

# 12. Cursor behavior

Cursor should deform the **surface**, not scatter particles.

Track:

```ts
targetMouse
smoothMouse
```

Interpolation:

```ts
smoothMouse.x +=
  (targetMouse.x - smoothMouse.x) * 0.06;

smoothMouse.y +=
  (targetMouse.y - smoothMouse.y) * 0.06;
```

For every point:

```ts
const mdx = px - mouseX;
const mdy = py - mouseY;

const mouseDistSq =
  mdx * mdx + mdy * mdy;

const influence =
  Math.exp(
    -mouseDistSq /
    (mouseRadius * mouseRadius)
  );
```

Use the influence to gently alter depth:

```ts
depth += influence * 0.25;
```

And position:

```ts
px += mdx * influence * 0.015;
py += mdy * influence * 0.015;
```

Interaction strength should be barely noticeable at first.

Target:

```txt
mouse radius: 200–300px
maximum displacement: 12–30px
```

No explosive repulsion.

---

# 13. Pointer velocity

Optionally allow slightly more deformation when the cursor moves quickly.

```ts
velocityX = currentX - previousX;
velocityY = currentY - previousY;
```

Clamp:

```ts
velocity = Math.min(
  Math.hypot(velocityX, velocityY),
  30
);
```

Then:

```ts
mouseStrength =
  baseMouseStrength +
  velocity * 0.25;
```

The field briefly stretches and settles back.

---

# 14. Ambient animation timing

Extremely slow.

Target:

```txt
small wave:
12–20 second apparent cycle

large fold:
20–40 seconds

noise drift:
30–60 seconds
```

Avoid:

```txt
rapid pulsation
visible looping
bouncing
elastic spring motion
```

The desired impression is:

> you notice it moved only after looking at it for a few seconds.

---

# 15. Preset: `ambient`

Purpose:

Large background field floating through editorial sections.

Characteristics:

```txt
flat-ish initial grid
2–3 large deformation centers
large radial fade masks
moderate wave amplitude
very slow motion
```

Preset:

```ts
{
  spacing: 10,
  dotRadius: 1,

  waveAmplitude: 28,
  waveFrequency: 0.01,

  noiseStrength: 18,

  foldStrength: 70,

  mouseRadius: 250,
  mouseStrength: 18
}
```

Shape target:

```txt
large soft valley
one broad fold
mostly empty negative space
```

---


# 15b. Preset: `animated-blobs` / `river` (blob mode)

Halftone grid with **fixed dot positions** — density/opacity modulated by 2–4 soft metaball blobs that drift on 30–90s cycles. Dots do not scatter independently; clusters morph together with slow breathing.

```ts
renderMode: 'blobs'
colorScheme: 'warm' | 'dark'  // warm = botanical on light pages; dark = brighter mint/blue/accent
```

`river` uses blob mode with a left-band mask for the Ask panel. Respects `prefers-reduced-motion` (static frame at t=0).

---

# 16. Preset: `curtain`

Purpose:

Create the suspended dotted form visible in the upper portion of the reference.

Start with a vertical grid.

Create tapered width:

```ts
const normalizedY = y / height;

const taper =
  Math.sin(normalizedY * Math.PI);
```

Horizontal deformation:

```ts
px +=
  Math.sin(
    normalizedY * 8 +
    time * 0.0002
  ) *
  taper *
  55;
```

Secondary fold:

```ts
px +=
  Math.sin(
    normalizedY * 17 -
    time * 0.00012
  ) *
  taper *
  16;
```

Opacity:

```ts
opacity *= taper;
```

Result:

```txt
top and bottom dissolve
center remains dense
surface resembles hanging fabric
```

---

# 17. Preset: `terrain`

Purpose:

Create the dotted landscape / floor.

This should use perspective.

Represent each point as:

```ts
worldX
worldZ
height
```

Example grid:

```txt
columns: ~80
rows: ~80
```

Generate:

```ts
const worldX =
  (column - columns / 2) * spacing;

const worldZ =
  row * spacing;
```

Height:

```ts
const terrainHeight =
  Math.sin(worldX * 0.025 + time * 0.0002) * 25 +
  Math.sin(worldZ * 0.018 - time * 0.00012) * 38 +
  noise * 20;
```

Perspective:

```ts
const perspective =
  focalLength /
  (focalLength + worldZ);
```

Projection:

```ts
screenX =
  width / 2 +
  worldX * perspective;

screenY =
  horizonY +
  worldZ * perspective -
  terrainHeight * perspective;
```

Dot radius:

```ts
radius =
  baseRadius *
  perspective *
  1.8;
```

Farther dots should be smaller and denser visually.

---

# 18. Terrain horizon

Recommended:

```txt
horizonY:
35–48% viewport height
```

Fade around horizon:

```ts
opacity *= smoothstep(
  0,
  0.2,
  normalizedDepth
);
```

Do not let the grid suddenly begin at the horizon line.

---

# 19. Scroll-driven system

Accept:

```ts
scrollProgress: number // 0–1
```

Scroll should alter configuration rather than simply translate the canvas.

Example:

```ts
const amplitude =
  lerp(20, 72, scrollProgress);

const foldStrength =
  lerp(40, 140, scrollProgress);

const visibleRadius =
  lerp(320, 680, scrollProgress);
```

---

# 20. Portfolio abstraction behavior

Map your six stages to deformation complexity:

```ts
const abstractionPresets = {
  automation: {
    complexity: 0.15,
    foldCount: 1,
    amplitude: 18
  },

  zeroToOne: {
    complexity: 0.28,
    foldCount: 1,
    amplitude: 28
  },

  interface: {
    complexity: 0.42,
    foldCount: 2,
    amplitude: 38
  },

  system: {
    complexity: 0.6,
    foldCount: 2,
    amplitude: 50
  },

  platform: {
    complexity: 0.8,
    foldCount: 3,
    amplitude: 64
  },

  product: {
    complexity: 1,
    foldCount: 4,
    amplitude: 78
  }
};
```

Do not reset the animation at every section.

Interpolate from one configuration into the next.

That is important: the visual itself should **zoom out with the story**.

---

# 21. Section transition

When moving between stages:

```txt
duration: 900–1600ms
easing: cubic-bezier(0.22, 1, 0.36, 1)
```

Interpolate:

```txt
fold positions
fold strength
wave amplitude
mask positions
field density
depth
```

Never crossfade between completely separate canvases.

---

# 22. Experience interaction

Individual portfolio experiences can subtly influence the field.

On hover over an experience card:

```txt
nearest area of field brightens slightly
one deformation point moves toward that card
dot radius increases by max 10–15%
```

Duration:

```txt
300–500ms
```

On mouse leave:

```txt
800–1200ms return
```

Keep it ambient.

---

# 23. AI / Ask interaction

When the AI references an experience:

```txt
activate related deformation point
increase local opacity
create one slow pulse through nearby dots
```

Pulse should propagate through the grid, not appear as a circular sonar ring.

Concept:

```ts
wave =
  Math.sin(distance * 0.025 - time * 0.004);
```

Multiply with a soft envelope:

```ts
envelope =
  Math.exp(-distance / 250);
```

Keep displacement:

```txt
< 8px
```

---

# 24. Animation easing

Use interpolation heavily.

Helper:

```ts
function lerp(
  start: number,
  end: number,
  alpha: number
) {
  return start + (end - start) * alpha;
}
```

Typical alpha:

```txt
pointer: 0.05–0.08
configuration: 0.025–0.05
slow attractors: 0.01–0.02
```

Nothing should snap.

---

# 25. Organic motion

Do not use `Math.random()` every frame.

Randomness must be deterministic or noise-based.

Good:

```txt
simplex noise
perlin noise
layered sine waves
fixed random seeds
```

Bad:

```ts
x += Math.random();
```

This creates jitter and destroys the fabric illusion.

---

# 26. Canvas sizing

Canvas:

```css
position: absolute;
inset: 0;

width: 100%;
height: 100%;

pointer-events: none;
```

If pointer interaction is required, listen for pointer events on the parent section/window rather than the canvas itself.

---

# 27. DPR

```ts
const dpr =
  Math.min(
    window.devicePixelRatio || 1,
    1.75
  );
```

Canvas:

```ts
canvas.width =
  width * dpr;

canvas.height =
  height * dpr;

ctx.scale(dpr, dpr);
```

---

# 28. Performance target

Target:

```txt
60fps desktop
30–60fps mobile
```

Desktop maximum:

```txt
~12,000 rendered dots
```

Prefer:

```txt
4,000–8,000
```

Mobile:

```txt
1,500–3,500
```

---

# 29. Adaptive density

Calculate spacing based on viewport size.

```ts
if (width < 640) {
  spacing *= 1.5;
}

if (width > 1800) {
  spacing *= 1.15;
}
```

Do not blindly render more dots on larger displays.

---

# 30. Visibility optimization

Use:

```txt
IntersectionObserver
```

If field is not visible:

```ts
running = false;
cancelAnimationFrame(frame);
```

Resume when visible.

---

# 31. Reduced motion

```css
@media (prefers-reduced-motion: reduce)
```

Behavior:

```txt
disable ambient movement
disable pointer distortion
render one attractive static frame
keep scroll transitions minimal
```

Do not remove the dots entirely.

---

# 32. Layering

Recommended structure:

```tsx
<section className="relative overflow-hidden">

  <DotField />

  <div className="relative z-10">
    content
  </div>

</section>
```

Dot field:

```txt
z-index: 0
```

Content:

```txt
z-index: 10+
```

---

# 33. Text exclusion zones

The dots should not visually fight important text.

Allow optional exclusion regions:

```ts
type ExclusionZone = {
  x: number;
  y: number;
  width: number;
  height: number;
  feather: number;
};
```

For dots inside the zone:

```ts
opacity *= exclusionMask;
```

Use feather:

```txt
80–180px
```

This creates soft negative space behind headings.

---

# 34. Recommended page composition

For the hero:

```txt
one ambient fold:
upper center/right

one terrain:
bottom 30–45%

large empty text zone:
left-center
```

Do not cover every empty area.

Approximately:

```txt
40–60% of viewport:
mostly negative space
```

This is part of what makes the reference feel sophisticated.

---

# 35. Visual hierarchy

Use three density levels.

### Primary field

```txt
100% baseline opacity
strongest depth
largest dots
```

### Secondary field

```txt
40–60%
smaller dots
less displacement
```

### Atmospheric field

```txt
10–25%
very sparse visibility
almost static
```

Never make all fields equally strong.

---

# 36. Do-not-do list

Tell Cursor explicitly:

```txt
DO NOT:
- use floating particles
- randomize every dot independently
- make dots bounce
- create mouse repulsion
- add connecting lines between dots
- create a starfield
- use glowing orb particles
- animate at high speed
- use hard radial gradients
- use a visible rectangular canvas edge
- make every area equally dense
- use huge dots
- use three.js unless Canvas performance becomes insufficient
```

---

# 37. Acceptance criteria

The implementation is correct if:

```txt
1. A screenshot still looks visually strong with animation paused.

2. Neighboring dots clearly form one continuous surface.

3. Large folds are visible from several feet away.

4. Individual dot movement is almost impossible to notice.

5. Mouse movement bends the field rather than scattering it.

6. Empty space remains part of the composition.

7. The animation feels slower than expected.

8. No hard edge reveals where the canvas ends.

9. The same visual system can create terrain, curtain, and ambient formations.

10. Scroll can smoothly transform one configuration into another.
```

The single most important instruction to give Cursor is:

> **Treat the dots as samples of an invisible continuous 3D surface. Animate the surface first, then calculate where each dot belongs. Never animate the individual dots independently.**

That distinction is what will make yours resemble the reference rather than a standard particle-effect website.