# Zenith Design System

This document outlines the visual philosophy, color palette, and UI conventions for the Zenith project.

## 1. Visual Philosophy: "High-Craft"
Zenith is designed to feel like a digital vault—a bridge between technical mastery and tactile craft. The aesthetic draws inspiration from **Sumi-e (ink wash painting)** and **Parchment-based typography**, focusing on:
- **Presence over Distraction:** Using watercolor backgrounds to add atmosphere without competing with technical content.
- **Structural Integrity:** Strong typography and a strict grid system that reflects "First Principles" thinking.

## 2. Color Palette

### Light Mode (The Parchment)
- **Primary (Terracotta/Amber):** `#9a4436` - Used for brand accents, links, and highlights.
- **Surface (Cream):** `#fbf9f5` - The tactile base of the site.
- **On-Surface (Charcoal):** `#1b1c1a` - High-contrast text for maximum readability.
- **Secondary:** `#5f5e5e` - Used for metadata and auxiliary information.

### Dark Mode (The Obsidian)
- **Primary (Coral):** `#ff8674` - A vibrant, glowing version of the brand color.
- **Surface (Dark Ink):** `#1c1b18` - A deep, warm grey that reduces eye strain.
- **On-Surface (Stone):** `#e6e2d3` - Muted off-white text to maintain the "High-Craft" feel.

## 3. Background System
The site uses a layered background approach to maintain depth:
1. **The Paint:** `src/assets/watercolor-background.png` and `meditating-monk.jpeg` are blended using `mix-blend-multiply` in light mode. This "soaks" the pigment into the cream surface.
2. **The Shell:** Listing pages (Home, Archive, Topics) use these paintings to set the atmosphere.
3. **The Work:** Individual Article pages use **solid surfaces** to ensure zero distractions during deep reading.

## 4. Typography
- **Serif (Headings):** `Playfair Display` - Adds a sense of permanence and intellectual weight.
- **Sans (Body):** `Satoshi` - A modern, clean geometric sans-serif for technical clarity.
- **Mono (Meta):** Standard system monospace for dates, tags, and code.

## 5. Interaction Patterns
- **Hover States:** Article previews use `bg-primary/[0.04]` (a 4% tint) to indicate interactivity without obscuring the background art.
- **Focus States:** Every interactive element must include a `focus-visible` ring (`ring-primary/40`) for WCAG accessibility.
- **Transitions:** All color and background shifts use a `300ms ease` duration to feel intentional and fluid.
