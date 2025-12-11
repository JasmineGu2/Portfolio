# Jasmine Gu - Personal Website

A modern personal portfolio website built with Next.js, TypeScript, and Three.js.

## Features

- ✨ **3D Interactive Elements** - Three.js puzzle visualization
- 🎨 **Clean Design** - Minimal, professional interface
- 🚀 **Next.js App Router** - Modern React with server components
- 📱 **Fully Responsive** - Mobile-first design
- 💎 **Type-Safe** - Full TypeScript support

## Structure

```
app/
  ├── page.tsx          # Home/Work page
  ├── projects/         # Projects page (PM & Technical)
  ├── gallery/          # Gallery page
  ├── layout.tsx        # Root layout
  └── globals.css       # Global styles

components/
  ├── Puzzle3D/        # 3D puzzle visualization
  ├── layout/           # Header and layout components
  ├── skills/           # Skill-related components
  └── ui/               # UI components (buttons, theme toggle)

lib/
  ├── projects-data.ts  # Project data
  ├── skills.ts         # Skills data
  └── types.ts          # TypeScript type definitions
```

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run development server:**
   ```bash
   pnpm dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## Pages

- **/** - Home page with hero section and work experience
- **/projects** - Projects page with PM case studies and technical projects
- **/gallery** - Gallery page with photos and community highlights

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js

---

Built with curiosity and attention to detail. ✨
