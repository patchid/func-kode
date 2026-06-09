# Landing Page Design Tokens

> **Status:** ✅ Implemented — issue [#95](https://github.com/patchid/func-kode/issues/95)
> Part of [EPIC: Landing Page Rebuild #92](https://github.com/patchid/func-kode/issues/92).
> Closes [#95](https://github.com/patchid/func-kode/issues/95).
> Consumed by [#96 (HeroSection)](https://github.com/patchid/func-kode/issues/96) and [#97 (LandingBackground)](https://github.com/patchid/func-kode/issues/97).

---

## Why Tokens Exist

Without tokens, every landing page component hardcodes raw Figma values:

```tsx
// ❌ Before — magic numbers, no semantic meaning
<h1 className="text-[46px] leading-[54.1px] tracking-[-1.38px]">
  Build better functions
</h1>
<div className="flex gap-[47px]">
  <Button>Get started</Button>
  <Button variant="ghost">See demo</Button>
</div>
```

```tsx
// ✅ After — tokens, single source of truth
<h1 className="text-landing-hero tracking-landing-h1">
  Build better functions
</h1>
<div className="flex gap-landing-cta">
  <Button>Get started</Button>
  <Button variant="ghost">See demo</Button>
</div>
```

Tokens are defined once in `tailwind.config.ts`. Change the Figma spec → change one file → all components update.

---

## Typography Tokens (`fontSize`)

Tailwind class prefix: `text-`

| Token | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|
| `landing-hero` | 46px | 54.1px | — | Desktop H1 (≥1440px) |
| `landing-h1-md` | 40px | 48px | — | Tablet H1 (≥768px) |
| `landing-h1-sm` | 32px | 1.18 | — | Mobile H1 (<768px) |
| `landing-label` | 14px | 1 | -0.48px | Badge / label pill (bold, uppercase) |
| `landing-body` | 16px | 25.4px | -0.48px | Body copy under hero |

**Usage:**
```tsx
<h1 className="text-landing-hero md:text-landing-h1-md sm:text-landing-h1-sm" />
<span className="text-landing-label uppercase" />
<p className="text-landing-body" />
```

---

## Letter Spacing Tokens (`letterSpacing`)

Tailwind class prefix: `tracking-`

| Token | Value | Usage |
|---|---|---|
| `landing-tight` | -0.48px | Body copy, label text |
| `landing-h1` | -1.38px | Hero H1 headline |
| `landing-cta` | -0.45px | CTA button label |
| `landing-badge` | -0.36px | Badge / pill text |

**Usage:**
```tsx
<h1 className="tracking-landing-h1" />
<button className="tracking-landing-cta" />
<span className="tracking-landing-badge" />
```

---

## Spacing Tokens (`spacing`)

Tailwind class prefixes: `gap-`, `p-`, `px-`, `py-`, `m-`, `mx-`, etc.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `landing-cta` | 47px | `gap-landing-cta` | Gap between CTA action buttons |
| `landing-canvas` | 122px | `px-landing-canvas` | Hero section left padding (1440px canvas inset) |

**Usage:**
```tsx
<div className="flex gap-landing-cta" />
<section className="px-landing-canvas" />
```

---

## Color Tokens (`colors.landing`)

Tailwind class prefixes: `text-`, `bg-`, `border-`, `fill-`, etc.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `landing.label` | `#EDFFD7` | `bg-landing-label` / `text-landing-label` | Label / badge green background |
| `landing.teal` | `#00C9B7` | `text-landing-teal` / `bg-landing-teal` | Teal accent, CTA highlight |
| `landing.purple` | `#7020BF` | `text-landing-purple` / `bg-landing-purple` | Purple accent |
| `landing.dark` | `#040710` | `bg-landing-dark` | Page / section background |
| `landing.surface` | `#111B34` | `bg-landing-surface` | Card / glassmorphism surface |
| `landing.border` | `#1C273A` | `border-landing-border` | Border / divider lines |
| `landing.muted` | `#A1A7B7` | `text-landing-muted` | Secondary / subdued text |
| `landing.fg` | `#FCFCFC` | `text-landing-fg` | Primary foreground text |

> **Note:** `landing.teal` (`#00C9B7`) may overlap with an existing brand token. Before using `bg-landing-teal`, confirm it differs from `brand.*` values in `tailwind.config.ts`. If already covered, prefer the existing token to avoid drift.

---

## Figma Canvas Constants (`lib/landing-constants.ts`)

These are **raw pixel offsets** from the Figma artboard, not design tokens. They exist for JS calculations only.

| Constant | Value | Safe for CSS? | Notes |
|---|---|---|---|
| `FIGMA_CANVAS_WIDTH_PX` | 1440 | ✅ (reference only) | Canvas width all offsets are relative to |
| `FIGMA_CANVAS_HEIGHT_PX` | 4727 | ⛔ **NO** | Full artboard height — do NOT use as `min-h` or `height` |
| `HERO_MOCKUP_LEFT_PX` | 572 | ⚠️ inline style only | Mockup x-offset; use `style={{ left }}`, not Tailwind |
| `HERO_MOCKUP_WIDTH_PX` | 822 | ⚠️ inline style only | Mockup image width |
| `HERO_MOCKUP_HEIGHT_PX` | 590 | ⚠️ inline style only | Mockup image height |
| `HERO_TEXT_LEFT_PX` | 122 | ⚠️ prefer `px-landing-canvas` | Use Tailwind token in JSX; constant for JS math only |

**Rule:** If you need to position something via Tailwind, use a token. If no token exists yet, add one to `tailwind.config.ts`. Only fall back to `landing-constants.ts` when a raw number is needed in JavaScript logic.

---

## Adding New Tokens

1. Add to `tailwind.config.ts` under `theme.extend`
2. Update this document
3. Reference the issue or Figma frame in a comment

## Related Issues

- [#92 — EPIC: Landing Page Rebuild](https://github.com/patchid/func-kode/issues/92)
- [#95 — Design Tokens (this issue)](https://github.com/patchid/func-kode/issues/95)
- [#96 — HeroSection component](https://github.com/patchid/func-kode/issues/96)
- [#97 — LandingBackground component](https://github.com/patchid/func-kode/issues/97)
