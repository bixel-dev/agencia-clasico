# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js is managed via nvm. Load it before running any command:

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
```

| Task | Command |
|---|---|
| Dev server | `npm run dev` → http://localhost:4321 |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

There are no tests or linting configured yet.

## Architecture

Single-page marketing site for **clasi.co**, a Chilean creative agency. All visible content lives in `src/pages/index.astro`, which composes one section component per page section. There are no dynamic routes or data fetching — all content is hardcoded in component frontmatter.

**Request flow:** `Layout.astro` provides the HTML shell and Google Fonts import → `index.astro` assembles the page → each section component is self-contained with its own markup and `<script>` block.

**Section order and IDs** (used by navbar anchor links):
`#nosotros` → `#servicios` → `#trabajos` → `#clientes` → `#contacto`

## GSAP Animation Pattern

Every animated component imports GSAP inside its own `<script>` tag — Astro bundles these together. Components that use scroll-triggered animations must call `gsap.registerPlugin(ScrollTrigger)` locally:

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

Entrance animations target CSS class selectors (`.about-text > *`, `.service-card`, etc.). ScrollTrigger `start` values use the `'top 72%'` convention to trigger slightly before the element is fully in view.

## Navbar: mix-blend-difference

The top bar uses CSS `mix-blend-difference` on its inner flex container. All elements inside (logo, burger lines) are white (`text-white` / `bg-white`). This causes them to appear **white on dark sections** and **inverted/dark on light sections** automatically — no scroll listener needed. The full-screen overlay menu (`#nav-overlay`, z-40) is a sibling element outside the header (z-50) so the blend only affects the top bar, not the overlay.

Burger → X math: with `gap-[5px]` between `h-[1.5px]` lines, line 1 center is at `0.75px` and line 2 center is at `7.25px`. Moving line 1 by `y: 6.5` aligns both centers; rotating ±45° forms the X.

## Design System

**Colors** (defined in `tailwind.config.mjs` as `brand.*`):
- `brand-dark` `#111111` — primary dark background
- `brand-light` `#f4f4f2` — light section background  
- `brand-gray` `#5f5f5f` — body text on light backgrounds
- `brand-muted` `#8d8d8d` — labels, subtitles, placeholders
- `brand-border` `#2a2a2a` — subtle borders on dark backgrounds

**Fonts** (loaded from Google Fonts in `Layout.astro`):
- `font-heading` → Montserrat — all headings and the logo
- `font-sans` → Raleway — body paragraphs
- `font-accent` → Dosis — labels, tags, buttons, small caps text

**Global utility classes** (defined in `src/styles/global.css`):
- `.label-tag` — 9px Dosis, tracking-[0.3em], uppercase, `text-brand-muted`
- `.btn-primary` — white border button (for dark backgrounds)
- `.btn-dark` — dark border button (for light backgrounds)

**Typography sizing** uses `clamp()` inline via `style` attribute rather than Tailwind classes, since the values (up to 8.5rem) fall outside Tailwind's default scale. Responsive font sizes follow the pattern `clamp(min, vw-value, max)`.

**Section rhythm:** dark sections (`bg-brand-dark`, `bg-[#0d0d0d]`) alternate with light sections (`bg-brand-light`). Section vertical padding is `py-32 md:py-40`. Content is constrained to `max-w-6xl mx-auto px-8 md:px-14`.

## Adding Content

To update portfolio items, edit the `works` array in `src/components/Works.astro` frontmatter. To add a new nav link, update the `navLinks` array in `src/components/Navbar.astro`. To change hero taglines, edit the `taglines` array in `src/components/Hero.astro`.

To add a new section: create `src/components/NewSection.astro`, give its `<section>` an `id`, import and add it to `src/pages/index.astro`, and add a matching anchor link to the `navLinks` array in `Navbar.astro`.
