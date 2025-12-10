# Skills Map Component

This component transforms the 3D puzzle visualization into an interactive Skills Map for your portfolio.

## Structure

```
components/skills/
├── PuzzlePiece.tsx    # Main puzzle piece component with hover/click handlers
├── SkillIcon.tsx      # Floating icon above each puzzle piece
├── SkillTooltip.tsx   # Tooltip showing skill name and description
└── README.md          # This file

lib/
└── skills.ts          # Skills configuration file
```

## How to Add New Skills

### 1. Add Icon Files

Place your skill icons in `/public/icons/` directory:
- Format: SVG or PNG
- Recommended size: 24x24px or 32x32px
- Naming: Use lowercase with hyphens (e.g., `react.svg`, `system-design.svg`)

### 2. Update `lib/skills.ts`

Add a new entry to the `skills` array:

```typescript
{
  skill: 'Your Skill Name',
  icon: '/icons/your-skill-icon.svg',
  targetId: 'projects', // or 'story', 'contact', etc.
  description: 'Brief description of the skill',
}
```

### 3. Ensure Target Section Exists

Make sure your page has a section with the corresponding `id`:

```tsx
<div id="projects" className="...">
  {/* Your projects content */}
</div>
```

## How Icons Map to Puzzle Pieces

- Each puzzle piece gets a skill assigned based on its index
- Skills are cycled: if you have 12 skills and 3000 puzzle pieces, each skill appears ~250 times
- The mapping uses modulo: `skillIndex = puzzleIndex % skills.length`

## Features

### Hover Behavior
- **Icon**: Fades in (opacity 0 → 1) with scale animation (0.9 → 1)
- **Tooltip**: Shows skill name and description
- **Puzzle Piece**: Scales up slightly (1.2x)
- **Cursor**: Changes to pointer

### Click Behavior
- Smoothly scrolls to the target section
- Uses `scrollIntoView({ behavior: 'smooth', block: 'start' })`

### Material
- Clean silver matte material
- No holographic colors
- Minimal, professional appearance

## Performance

- Uses `Instances` for efficient rendering
- `Html` components use `distanceFactor={8}` for optimal clarity
- Icons and tooltips only render when visible
- Minimal re-renders with proper state management

## Customization

### Icon Size
Edit `SkillIcon.tsx`:
```tsx
width: '24px',  // Change to desired size
height: '24px',
```

### Tooltip Position
Edit `PuzzlePiece.tsx`:
```tsx
const offsetY = above ? 0.8 : -0.8  // Adjust vertical offset
```

### Material
Edit `Puzzle3D.tsx` in `createSilverMaterial()`:
```tsx
metalness: 0.9,      // Adjust metalness (0-1)
roughness: 0.15,    // Adjust roughness (0-1)
envMapIntensity: 1.2, // Adjust environment map intensity
```

