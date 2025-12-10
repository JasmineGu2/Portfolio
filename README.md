# Jasmine Gu - Personal Website

A modern, holographic-themed personal portfolio website built with Next.js, TypeScript, and Framer Motion.

## Features

- ✨ **Holographic Design System** - Subtle gradients, glass morphism, and iridescent effects
- 🎨 **Storytelling-First Layout** - Flipbook-style experience timeline
- 🚀 **Next.js App Router** - Modern React with server components
- 📱 **Fully Responsive** - Mobile-first design
- 🎭 **Smooth Animations** - Framer Motion for elegant transitions
- 💎 **Type-Safe** - Full TypeScript support

## Structure

```
app/
  ├── page.tsx          # Main page with all sections
  ├── layout.tsx        # Root layout
  └── globals.css       # Global styles + holographic utilities

components/
  ├── hero/             # Hero section with split-screen
  ├── about/             # Storybook-style about section
  ├── experience/       # Flipbook experience timeline
  ├── career-highlights/# Career highlights grid
  ├── case-studies/     # PM case studies
  ├── technical-projects/# Technical projects grid
  └── footer/           # Footer component

lib/
  ├── design-tokens.ts  # Design system tokens
  └── types.ts          # TypeScript type definitions
```

## Getting Started

1. **Install dependencies:**
   ```bash
   # Using pnpm (recommended - faster)
   pnpm install
   
   # Or using npm
   npm install --legacy-peer-deps
   ```

2. **Run development server:**
   ```bash
   # Using pnpm
   pnpm dev
   
   # Or using npm
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## Customization

### Update Content

Edit `app/page.tsx` to update:
- Hero section content
- Experience timeline
- Career highlights
- Case studies
- Technical projects
- Footer information

### Design Tokens

Modify `lib/design-tokens.ts` to adjust:
- Colors
- Typography
- Spacing
- Holographic gradients
- Animation timings

### Holographic Effects

The design system includes:
- `.glass` - Glass morphism effect
- `.holo-gradient-1/2/3` - Animated gradients
- `.metallic-text` - Shimmering text effect
- `.iridescent-border` - Gradient borders
- `.soft-glow` - Subtle shadow effects

## Build

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Custom CSS** - Holographic effects

## Design Philosophy

- **Minimal** - Clean, uncluttered interface
- **Professional** - Tasteful use of effects
- **Storytelling** - Content-first approach
- **Holographic** - Subtle futuristic aesthetic

---

Built with curiosity and attention to detail. ✨


