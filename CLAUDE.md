# My Portfolio — CLAUDE.md

## Project Overview
- Cyberpunk-themed single-page developer portfolio for **Gaurav Singh**
- Static site — no build tools, no framework, no package.json
- Contact form via **EmailJS** (client-side only)
- Git remote: `https://github.com/gavksingh/My_Portfolio.git`

## File Map
```
index.html                 # The entire site (~5,200+ lines)
  Lines 33–3223            # <style> block — ALL active CSS
  Lines 3224–4578          # HTML markup (10 sections)
  Lines 4579–5225          # <script defer> IIFE — core runtime JS
assets/img/                # Images (profile, portfolio, blog, favicon)
Reusme/                    # Resume PDF (note: dir name is misspelled)
EmailJS_Setup_Guide.md     # Setup doc for EmailJS integration
```

## How to Serve
```bash
cd /Users/gaurav/Desktop/My_Portfolio && python3 -m http.server 8000
# Open http://localhost:8000
```

## Architecture Notes

**CSS:** All active styles live in the inline `<style>` block. Key variables on `:root`:
`--neon-cyan`, `--neon-pink`, `--neon-yellow`, `--neon-green`, `--dark-bg`, `--dark-surface`, `--dark-card`, `--text-primary`, `--text-secondary`

**Animation patterns:**
- `.card-reveal` / `.revealed` — cards slide up via IntersectionObserver
- `.fade-in` / `.visible` — section content fades in
- `.section-animate` / `.in-view` — section entrance animations
- `.glitch` with `data-text` attr — glitch effect on headings

**JS:** Single `<script defer>` wraps everything in an IIFE: `(function() { ... })();`

**Z-index stack:** cursor-dot 9999, cursor-outline 9998, nav-menu 10000

## Critical Rules (Lessons Learned)

1. **IIFE scope trap:** Functions called via inline `onclick=""` MUST be exposed as `window.functionName`. Forgetting this = silent "not defined" errors.
2. **Keep CSS inline:** Do NOT create separate CSS files. All styles go in the `<style>` block.
3. **Keep JS in the IIFE:** All new JS goes inside the existing IIFE. Do NOT add code to `main.js` (it's not loaded).
4. **Pill overlay timing:** The blue/red pill dismiss sequence has carefully phased timeouts. Blue pill pulses 1× (1s at 3.2s delay), red follows immediately (1s at 4.4s delay). Don't change these without testing the full animation flow.
5. **Carousel scroll delta:** `scrollRow` uses hardcoded 340px. Changing card widths requires updating this value in both JS and HTML `onclick` attrs.
6. **Vendor dir is dead:** Nothing in `assets/vendor/` is referenced. Do not try to use those libs.
7. **Avoid inline `style=""`:** Already 138+ inline style attrs. Prefer CSS classes.

## Sections (in order)
`home` → `about` → `projects` → `opensource` → `skills` → `resume` → `blogs` → `tutorials` → `terminal` → `contact`

## Coding Conventions
- New sections: `<section class="section section-animate" id="name">` with `<div class="container fade-in">`
- Section titles: `<h2 class="glitch" data-text="TITLE">TITLE</h2>`
- External links: always `target="_blank" rel="noopener noreferrer"` with `aria-label`
- Colors: cyan = primary, pink = secondary/hover, yellow/green = accents
- Fonts: Orbitron (headings), Rajdhani (body), Bebas Neue (labels/badges)
