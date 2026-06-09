# Design Tokens

> **Status:** ✅ Implemented — issue [#95](https://github.com/patchid/func-kode/issues/95)

This document is the single source of truth for all design tokens used in the landing page. Do not use arbitrary Tailwind pixel values — use these tokens instead.

Tokens are defined in `tailwind.config.ts` under `theme.extend`. Figma canvas offsets that are unsafe for CSS live in `lib/landing-constants.ts`.

---

## Typography — Landing Page

Defined in `tailwind.config.ts` under `theme.extend.fontSize`.

| Token | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|
| `landing-hero` | 46px | 54.1px | — | Desktop H1 (>=1440px) |
| `landing-h1-md` | 40px | 48px | — | Tablet H1 (768px–1439px) |
| `landing-h1-sm` | 32px | 1.18 | — | Mobile H1 (<768px) |
| `landing-label` | 14px | 1 | -0.48px | Section labels above headings (bold, uppercase) |
| `landing-body` | 16px | 25.4px | -0.48px | Body copy |

```ts
// tailwind.config.ts — theme.extend.fontSize
"landing-hero":   ["46px", { lineHeight: "54.1px" }],
"landing-h1-md":  ["40px", { lineHeight: "48px" }],
"landing-h1-sm":  ["32px", { lineHeight: "1.18" }],
"landing-label":  ["14px", { lineHeight: "1", letterSpacing: "-0.48px", fontWeight: "700" }],
"landing-body":   ["16px", { lineHeight: "25.4px", letterSpacing: "-0.48px" }],
```

---

## Letter Spacing — Landing Page

Defined in `tailwind.config.ts` under `theme.extend.letterSpacing`.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `landing-tight` | -0.48px | `tracking-landing-tight` | Body copy, label text |
| `landing-h1` | -1.38px | `tracking-landing-h1` | H1 headings |
| `landing-cta` | -0.45px | `tracking-landing-cta` | CTA button text |
| `landing-badge` | -0.36px | `tracking-landing-badge` | Version badge, pill labels |

```ts
// tailwind.config.ts — theme.extend.letterSpacing
"landing-tight": "-0.48px",
"landing-h1":    "-1.38px",
"landing-cta":   "-0.45px",
"landing-badge": "-0.36px",
```

---

## Spacing — Landing Page

Defined in `tailwind.config.ts` under `theme.extend.spacing`.

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| `landing-canvas` | 122px | `px-landing-canvas` | Horizontal canvas inset at 1440px |
| `landing-cta` | 47px | `gap-landing-cta` | Gap between CTA buttons (desktop) |

```ts
// tailwind.config.ts — theme.extend.spacing
"landing-canvas": "122px",
"landing-cta":    "47px",
```

> **Note:** The hero mockup left offset (`572px`) and other layout-specific offsets are defined as named constants in `lib/landing-constants.ts`, not as Tailwind tokens. See [Figma Canvas Constants](#figma-canvas-constants) below.

---

## Colors — Landing Page

Defined in `tailwind.config.ts` under `theme.extend.colors.landing`.

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `landing.label` | `#EDFFD7` | `bg-landing-label` / `text-landing-label` | Label green badge background |
| `landing.teal` | `#00C9B7` | `bg-landing-teal` / `text-landing-teal` | Teal accent (fork icon, glows) |
| `landing.purple` | `#7020BF` | `bg-landing-purple` / `text-landing-purple` | Purple accent |
| `landing.dark` | `#040710` | `bg-landing-dark` | Page background |
| `landing.surface` | `#111B34` | `bg-landing-surface` | Card / section surface |
| `landing.border` | `#1C273A` | `border-landing-border` | Border / divider lines |
| `landing.muted` | `#A1A7B7` | `text-landing-muted` | Secondary / subdued text |
| `landing.fg` | `#FCFCFC` | `text-landing-fg` | Primary foreground text |

```ts
// tailwind.config.ts — theme.extend.colors.landing
landing: {
  label:   "#EDFFD7",
  teal:    "#00C9B7",
  purple:  "#7020BF",
  dark:    "#040710",
  surface: "#111B34",
  border:  "#1C273A",
  muted:   "#A1A7B7",
  fg:      "#FCFCFC",
},
```

> Cross-reference with the global brand color palette in `tailwind.config.ts`. `landing.teal` (`#00C9B7`) may overlap with an existing brand token — confirm before adding a second definition.

---

## Background Gradient

```css
background: linear-gradient(180deg, #040710 4%, #7020BF 35%, #111B34 64%, #111B34 88%);
```

Mapped to `landing.dark`, `landing.purple`, `landing.surface` tokens above.

---

## Figma Canvas Constants

Raw pixel offsets live in `lib/landing-constants.ts` — **not** in Tailwind. Use only for inline styles or JS calculations.

| Constant | Value | Safe for CSS? | Notes |
|---|---|---|---|
| `FIGMA_CANVAS_WIDTH_PX` | 1440 | Yes (reference only) | All offsets relative to this |
| `FIGMA_CANVAS_HEIGHT_PX` | 4727 | NO | Full artboard height — never use as min-h |
| `HERO_MOCKUP_LEFT_PX` | 572 | Inline style only | Mockup x-offset at 1440px canvas |
| `HERO_MOCKUP_WIDTH_PX` | 822 | Inline style only | Mockup image width |
| `HERO_MOCKUP_HEIGHT_PX` | 590 | Inline style only | Mockup image height |
| `HERO_TEXT_LEFT_PX` | 122 | Prefer `px-landing-canvas` | Use Tailwind token in JSX |

---

## What NOT to Do

```tsx
// Never — raw Figma values, no semantic meaning
<h1 className="text-[46px] tracking-[-1.38px] leading-[54.1px]">
  Build better functions
</h1>
<div className="flex gap-[47px]">
  <Button>Get started</Button>
</div>

// Correct — tokens from tailwind.config.ts
<h1 className="text-landing-hero tracking-landing-h1">
  Build better functions
</h1>
<div className="flex gap-landing-cta">
  <Button>Get started</Button>
</div>
```

---

## Related

- Issue [#95](https://github.com/patchid/func-kode/issues/95) — Design Tokens (this PR)
- Issue [#92](https://github.com/patchid/func-kode/issues/92) — EPIC: Landing Page Rebuild
- Issue [#96](https://github.com/patchid/func-kode/issues/96) — HeroSection component
- Issue [#97](https://github.com/patchid/func-kode/issues/97) — LandingBackground component
- Extended reference: [`docs/architecture/landing-tokens.md`](./landing-tokens.md)