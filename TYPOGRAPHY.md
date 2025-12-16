# Typography System Guide

## Overview

This project uses a three-font typography system:
- **National 2** - Display font for headlines and hero text
- **Feature** - Heading font for section titles and UI emphasis
- **Inter** - Body font for readable content, labels, and buttons

## Quick Usage Rules

### 1. Headlines / Hero Text → Use `h1` or `h2` (National 2)

**When to use:**
- Main page titles
- Hero section headlines
- Large display text

**Example:**
```jsx
<h1 className="text-5xl md:text-7xl font-light">
  I'm Jasmine
</h1>
```

### 2. Section Titles / Card Titles / UI Emphasis → Use `h3`-`h6` (Feature)

**When to use:**
- Section headings
- Card titles
- Subheadings
- UI emphasis text

**Example:**
```jsx
<h3 className="text-xl font-semibold">
  Section Title
</h3>
```

### 3. Body Text / Labels / Buttons → Use `p`, `span`, `label`, `button` (Inter)

**When to use:**
- Paragraphs
- Body text
- Labels
- Button text
- Form inputs
- Links

**Example:**
```jsx
<p className="text-base">
  Body text content goes here.
</p>
```

## Font Weights Available

### National 2 (Display)
- `400` - Regular (default for h1, h2)
- `500` - Medium
- `700` - Bold

### Feature (Heading)
- `400` - Regular
- `500` - Medium
- `600` - Semibold (default for h3-h6)
- `700` - Bold

### Inter (Body)
- `400` - Regular (default for body text)
- `500` - Medium (default for buttons, links)
- `600` - Semibold
- `700` - Bold

## Utility Classes

If you need to override the default font for a specific element:

```jsx
<div className="text-display">Uses National 2</div>
<div className="text-heading">Uses Feature</div>
<div className="text-body">Uses Inter</div>
```

## Size Scale

### Display Sizes (National 2)
- `text-7xl` - 72px
- `text-6xl` - 60px
- `text-5xl` - 48px
- `text-4xl` - 36px

### Heading Sizes (Feature)
- `text-3xl` - 30px
- `text-2xl` - 24px
- `text-xl` - 20px
- `text-lg` - 18px

### Body Sizes (Inter)
- `text-xl` - 20px
- `text-lg` - 18px
- `text-base` - 16px (default)
- `text-sm` - 14px
- `text-xs` - 12px

## Best Practices

1. **Use semantic HTML tags** - The typography system automatically applies the correct font based on the HTML tag
2. **Don't hardcode font-family** - Use the semantic tags or utility classes instead
3. **Maintain hierarchy** - Use h1 for main titles, h2 for major sections, h3-h6 for subsections
4. **Keep it consistent** - Follow the size scale and don't mix fonts arbitrarily

## Migration Notes

When refactoring existing components:
- Replace `font-['National 2',sans-serif]` with semantic `h1` or `h2` tags
- Replace `font-['Feature',sans-serif]` with semantic `h3`-`h6` tags
- Replace `font-['Inter',sans-serif]` with semantic `p`, `span`, `label`, or `button` tags
- Remove inline font-family declarations and rely on semantic HTML

