# Code Review Process

This document describes what maintainers look for when reviewing PRs, and what contributors should expect.

---

## What Maintainers Review

### 1. Scope
- Does this PR do exactly one thing?
- Are there unrelated changes bundled in?

### 2. Correctness
- Does it solve the linked issue?
- Are there edge cases unhandled?
- Does it introduce any regressions (especially auth, routing, layout)?

### 3. Code Quality
- No hardcoded magic values — use design tokens and constants
- No `any` in TypeScript without a comment justifying it
- No `console.log` left in production code
- Components are focused — one responsibility per file

### 4. Accessibility
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Interactive elements have `aria-label` where text isn't visible
- Keyboard navigable (Tab, Enter, Escape)
- Touch targets ≥ 44×44px

### 5. Responsive Design
- Verified at 375px, 768px, 1024px, 1280px, 1440px
- No layout overflow or clipping at any breakpoint
- Mobile first — styles added upward with `sm:`, `md:`, `lg:`, `xl:`

### 6. Performance
- Images use `loading="lazy"` (except LCP images which use `fetchPriority="high"`)
- No client-side data fetching that could be done at build time
- No N+1 API calls

### 7. Documentation
- Is there a `/docs` file for this component?
- Is it filled in — not just a template with TODOs?

---

## Review Turnaround

<!--TODO: set expectations -- e.g. "Maintainers aim to review within 48 hours" -->

---

## Review Labels

| Label | Meaning |
|---|---|
| `approved` | Ready to merge |
| `request changes` | Must fix before re-review |
| `comment` | Non-blocking feedback, contributor decides |

---

## Responding to Review Comments

- Address every comment — either fix it or explain why not
- Use "Resolve conversation" only after the issue is fixed
- Do not force-push after a review has started — add commits instead
- Tag the reviewer when the PR is updated and ready for re-review
