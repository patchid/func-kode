# HeroSection Component

> **Status:** ✅ Implemented — issue [#97](https://github.com/patchid/func-kode/issues/97)

---

## Overview

`HeroSection` is the first content section on the landing page. It contains the headline copy, CTA buttons, and the `HeroEditorMockup` platform preview image.

`HeroEditorMockup` renders the `hero-editor-mockup.svg` asset at its Figma aspect ratio (822 / 590) as an above-the-fold LCP element.

---

## Sub-Components

| Component | File | Role |
|---|---|---|
| `HeroSection` | `components/landing/hero-section.tsx` | Layout, copy, CTAs |
| `HeroEditorMockup` | `components/landing/hero-editor-mockup.tsx` | Platform preview image |

---

## Copy

| Element | Text |
|---|---|
| Label | `Trust commits, not cover letters` |
| H1 line 1 | `Build together.` |
| H1 line 2 | `Ship Faster.` |
| H1 line 3 | `Contribute with purpose.` |
| Body | `func(kode) is an open-source developer platform for the Patch ID community. Sign up with GitHub, join collaborative builds, and contribute to projects that matter.` |
| CTA primary | `Start Contributing` → `/auth/login` |
| CTA secondary | `Explore the project` → `/projects` |

---

## Design Tokens Used

All typography values come from design tokens defined in [`architecture/design-tokens.md`](../architecture/design-tokens.md). No raw font-size, tracking, or leading values.

| Element | Token | Value |
|---|---|---|
| Label color | `text-landing-label` | `#EDFFD7` |
| Label tracking | `tracking-landing-tight` | `-0.48px` |
| H1 (mobile) | `text-landing-h1-sm` | `32px / 1.18` |
| H1 (tablet) | `text-landing-h1-md` | `40px / 48px` |
| H1 (desktop) | `text-landing-hero` | `46px / 54.1px` |
| H1 tracking | `tracking-landing-h1` | `-1.38px` |
| Body | `text-landing-body` | `16px / 25.4px, tracking -0.48px` |
| CTA tracking | `tracking-landing-cta` | `-0.45px` |
| CTA gap (1440px) | `gap-landing-cta` | `47px` |
| Container padding | `px-landing-canvas` | `122px` (lg) |

---

## Layout

```
Mobile (< 1024px)
  flex-col, centred
  [Label]
  [H1]
  [Body]
  [CTAs stacked → row at sm]
  [HeroEditorMockup below]

Desktop (>= 1024px / lg)
  flex-row, px-landing-canvas (122px) each side
  [Copy block left]   [HeroEditorMockup right, flex-1]

1440px (Figma pixel-perfect)
  absolute positioning within max-w-[1440px] container
  Copy:   left = 122px  (left-landing-canvas token)
  Mockup: left = 572px  (HERO_MOCKUP_LEFT_PX — see lib/landing-constants.ts)
```

The `572px` mockup offset is the only value not covered by a Tailwind token. It is documented in `lib/landing-constants.ts` as `HERO_MOCKUP_LEFT_PX` and used at `min-[1440px]:` only. Per issue #97 spec, pixel-perfect Figma positioning is acceptable at 1440px.

---

## HeroEditorMockup

| Property | Value |
|---|---|
| Source | `LANDING_ASSETS.heroEditorMockup` → `/landing/hero-editor-mockup.svg` |
| Aspect ratio | `822 / 590` (`HERO_MOCKUP_WIDTH_PX / HERO_MOCKUP_HEIGHT_PX`) |
| `fetchPriority` | `"high"` — LCP element, above the fold |
| `decoding` | `"async"` |
| `alt` | `"Platform preview"` |
| Drop shadow | `drop-shadow-[0_7px_22px_rgba(0,0,0,0.28)]` |

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| `< 375px` | Single column, centred, 20px padding |
| `375px – 767px` | Single column. CTAs stack vertically, then row at `sm`. |
| `768px – 1023px` | Single column, 32px padding (`sm:px-8`). |
| `1024px – 1439px` | Two-column flex row. Copy left, mockup right (`lg:flex-1`). `px-landing-canvas` (122px) padding. |
| `>= 1440px` | Absolute positioning. Copy at left 122px, mockup at left 572px. Pixel-perfect Figma match. |

---

## page.tsx Wiring

```tsx
// app/page.tsx — server component, no "use client"
import { Poppins } from "next/font/google";
import { LandingBackground } from "@/components/landing/landing-background";
import { LandingPageContent } from "@/components/landing/landing-page-content";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700","800"], display: "swap" });

export default function HomePage() {
  return (
    <div className={`relative w-full overflow-x-hidden ${poppins.className}`}>
      <LandingBackground />   {/* absolute inset-0, z-0, aria-hidden */}
      <LandingPageContent />  {/* relative z-10, Navbar + HeroSection */}
    </div>
  );
}
```

`LandingPageContent` is a `"use client"` component that reads `forkCount` from `SiteChrome` context and passes it to `Navbar variant="landing"`.

`Poppins` is loaded in `page.tsx` only — it does not affect other routes (Inter remains global default).

Page height is content-driven — no `min-h-[4727px]` or fixed height.

---

## Related

- Issue [#97](https://github.com/patchid/func-kode/issues/97) — this PR
- Issue [#92](https://github.com/patchid/func-kode/issues/92) — EPIC
- Issue [#95](https://github.com/patchid/func-kode/issues/95) — Design Tokens
- Issue [#96](https://github.com/patchid/func-kode/issues/96) — LandingBackground
- [`lib/landing-assets.ts`](../../lib/landing-assets.ts) — asset registry
- [`lib/landing-constants.ts`](../../lib/landing-constants.ts) — canvas offsets
- [`docs/architecture/design-tokens.md`](../architecture/design-tokens.md)