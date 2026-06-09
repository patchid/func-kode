# Pull Request Guidelines

These rules apply to **every PR** submitted to func(kode). Maintainers will request changes if they are not followed.

---

## ⚡ The Atomic PR Rule

> **One PR = One component or one concern.**

Do not bundle multiple components, architecture changes, and page wiring into a single PR. Large PRs are hard to review, hard to test, and hard to roll back.

**Wrong ❌**
```
PR: "Rebuild Landing Page"
  - New SiteChrome wrapper
  - Navbar rewrite
  - LandingBackground component
  - HeroSection component
  - page.tsx wiring
```

**Right ✅**
```
PR #1: SiteChrome layout wrapper
PR #2: Navbar rewrite
PR #3: LandingBackground + asset registry
PR #4: HeroSection + HeroEditorMockup
PR #5: page.tsx wiring
```

---

## 📋 PR Checklist

Every PR description must include this checklist:

```markdown
## Checklist
- [ ] Targets the correct base branch
- [ ] Linked to an issue (closes #___)
- [ ] One component / one concern only
- [ ] No hardcoded Figma pixel values — uses design tokens
- [ ] Responsive: tested at 375px, 768px, 1024px, 1280px, 1440px
- [ ] Auth state not broken (if touching Navbar or layout)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Docs updated in `/docs` for this component
```

---

## 🚫 Instant Request-for-Changes Triggers

A PR will be immediately sent back if it contains any of the following:

| Issue | Example |
|---|---|
| Hardcoded Figma canvas heights | `min-h-[4727px]` |
| Absolute Figma pixel coordinates | `left-[541px]`, `top-[2402px]` |
| Hardcoded version strings | `const RELEASE_VERSION = "2026.5.4"` |
| Unauthenticated API calls per page load | client-side `fetch` to `api.github.com` |
| Auth state regression | Logged-in users lose dashboard/logout access |
| Bundled scope | More than one component in a single PR |
| Missing docs | No `/docs` update for the new component |

---

## 🎯 PR Title Format

```
[scope] short description
```

Examples:
- `[Landing] Add SiteChrome layout wrapper`
- `[Navbar] Rewrite with Figma design + auth state`
- `[Docs] Add HeroSection component documentation`
- `[Fix] Navbar fork count rate limit`

---

## 📝 Base Branch Rules

| Work type | Target branch |
|---|---|
| Landing page UI (EPIC #92) | `fix/ui-tweaks` |
| New features | `dev` |
| Bug fixes | `dev` |
| Hotfixes | `main` (maintainer only) |

---

## 🔗 Linking Issues

Always link your PR to its issue:

```markdown
Closes #94
```

This auto-closes the issue when the PR merges.
