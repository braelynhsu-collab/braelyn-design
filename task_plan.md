# Task Plan — Braelyn Design Website: Phase 2

## Goal
Refactor CSS (remove inline duplicates), make homepage carousel dynamic (load from JSON), and add full responsive/mobile support.

## Status: COMPLETE

## Phases

### Phase 1: CSS 重构 — Remove duplicate inline styles from all HTML pages
- [ ] Step 1.1: Core pages (index, projects, about, approach, contact)
- [ ] Step 1.2: Project detail pages (future-studio, proya, proya-2023, proya-38, identity, lumina, objekt, vogue, system, project-detail)
- Status: NOT STARTED

### Phase 2: 首页轮播动态化 — Replace hardcoded carousel panels with JS-loaded projects.json
- [ ] Step 2.1: Create JS function to load project data and render panels
- [ ] Step 2.2: Keep GSAP horizontal scroll and arrow navigation intact
- Status: NOT STARTED

### Phase 3: 移动端响应式 — Complete responsive support for all pages
- [ ] Step 3.1: Audit current responsive coverage (only index page has @media 768px)
- [ ] Step 3.2: Add missing responsive styles for projects, about, approach, contact pages
- [ ] Step 3.3: Add smaller breakpoint (480px) for very small screens
- Status: NOT STARTED

## Files to Modify
| File | What Changes |
|------|-------------|
| `index.html` | Remove inline cursor/reset CSS (already in design-system.css); replace hardcoded carousel panels with dynamic JS |
| `projects.html` | Remove inline cursor/nav/reset CSS duplicates |
| `about.html` | Remove inline cursor/nav/reset CSS duplicates |
| `approach.html` | Remove inline cursor/nav/reset CSS duplicates |
| `contact.html` | Remove inline cursor/nav/reset CSS duplicates |
| `future-studio.html` | Remove inline cursor/nav/reset CSS duplicates |
| `proya.html` | Remove inline cursor/nav/reset CSS duplicates |
| `proya-2023.html` | Remove inline cursor/nav/reset CSS duplicates |
| `proya-38.html` | Remove inline cursor/nav/reset CSS duplicates |
| `identity.html` | Remove inline cursor/nav/reset CSS duplicates |
| `lumina.html` | Remove inline cursor/nav/reset CSS duplicates |
| `objekt.html` | Remove inline cursor/nav/reset CSS duplicates |
| `vogue.html` | Remove inline cursor/nav/reset CSS duplicates |
| `system.html` | Remove inline cursor/nav/reset CSS duplicates |
| `project-detail.html` | Remove inline cursor/nav/reset CSS duplicates |
| `design-system.css` | Add/expand responsive media queries |
| `projects.json` | (Read-only reference) |

## Files NOT to Touch
| File | Reason |
|------|--------|
| `theme.js` | Works correctly, not in scope |
| `projects.js` | Works correctly, not in scope |
| `variables.css` | Legacy, kept for fallback |
| `images/` | No image changes |
| `.git/*` | Git internals |

## Risks & Mitigations
- Risk: Removing inline CSS might break page-specific overrides → Mitigation: Only remove cursor, nav, reset styles that exactly match design-system.css; keep all other inline styles
- Risk: Carousel JS might conflict with GSAP scroll → Mitigation: Keep the existing GSAP scroll handler intact, only change panel rendering
- Risk: Responsive changes might look wrong on some pages → Mitigation: Use clamp() and relative units consistently
