# LandingBackground Component

> **Status:** ✅ Implemented — issue [#96](https://github.com/patchid/func-kode/issues/96)

---

## Overview

`LandingBackground` is a full-page decorative background layer for the landing page. It renders **absolutely positioned behind all content** and is fully `pointer-events-none` and `aria-hidden="true"`.

It does **not** control page height — the page grows naturally with content.

---

## Architecture

```
<LandingBackground>          ← pointer-events-none, aria-hidden, absolute inset-0
  ├── Gradient base          ← linear-gradient (dark → purple → dark blue), inset-0
  ├── Hero zone (clamp)      ← top-0, height = clamp(600px, 67.85vw, 977px)
  │   ├── Purple glow orb    ← blurred div, centre-left, % positioned
  │   ├── Teal glow (top)    ← blurred div, right edge, % positioned
  │   ├── Teal glow (lower)  ← blurred div, right edge, desktop only
  │   ├── bgHeroAccentLines  ← SVG, far-left bleed
  │   ├── bgHeroFlowLines    ← SVG, diagonal sweep
  │   ├── bgHeroTopography   ← SVG, subtle mesh fill, opacity-40
  │   ├── bgHeroTealGlow     ← SVG, teal burst right side
  │   └── bgHeroSideLines    ← SVG, left edge lines, hidden on mobile
  └── Grain overlay          ← SVG feTurbulence tiled 128px, opacity-[0.04]
```

Section background bands are **not** in this component. See [Section Bands](#section-bands) below.

---

## Positioning Strategy

All decorative layers use **percentage-based or viewport-unit positioning** — no hardcoded Figma pixel coordinates.

```tsx
// Never — hardcoded Figma pixel value
className="left-[541px] top-[246px]"

// Correct — percentage of container width/height
className="left-[37.57%] top-[25.18%]"
```

### Hero zone height

The Figma hero zone is 977px on a 1440px canvas: `977 / 1440 = 67.85vw`.

```tsx
style={{ height: "clamp(600px, 67.85vw, 977px)" }}
```

| Canvas width | Hero zone height |
|---|---|
| 375px | 600px (clamped min) |
| 768px | 600px (clamped min) |
| 1024px | 694px |
| 1280px | 869px |
| 1440px | 977px (Figma spec) |

### Pixel-to-percentage reference

All values below are from the Figma 1440×977px hero zone:

| Figma value | Converted | Formula |
|---|---|---|
| `left-[541px]` | `left: 37.57%` | 541 / 1440 |
| `top-[246px]` | `top: 25.18%` | 246 / 977 |
| `left-[636px]` | `left: 44.17%` | 636 / 1440 |
| `top-[329px]` | `top: 33.67%` | 329 / 977 |
| `-left-[1066px]` | `left: -74.03%` | 1066 / 1440 |
| `-top-[1279px]` | `top: -130.91%` | 1279 / 977 |
| `-left-[514px]` | `left: -35.69%` | 514 / 1440 |
| `-top-[731px]` | `top: -74.82%` | 731 / 977 |
| `-left-[83px]` | `left: -5.76%` | 83 / 1440 |
| `top-[337px]` | `top: 34.49%` | 337 / 977 |

---

## Background Gradient

```css
linear-gradient(180deg, #040710 4%, #7020BF 35%, #111B34 64%, #111B34 88%)
```

Maps to `landing.dark` → `landing.purple` → `landing.surface` tokens. See [`design-tokens.md`](../architecture/design-tokens.md).

---

## Asset Reference

All SVG paths are managed in [`lib/landing-assets.ts`](../../lib/landing-assets.ts).

| Asset key | File | Visual Role | Used in Hero Zone |
|---|---|---|---|
| `bgHeroAccentLines` | `bg-hero-accent-lines.svg` | Curved teal accent lines, far-left bleed behind text | Yes |
| `bgHeroFlowLines` | `bg-hero-flow-lines.svg` | Diagonal flowing lines sweeping across hero | Yes |
| `bgHeroTopography` | `bg-hero-topography.svg` | Large subtle topography mesh, opacity-40 | Yes |
| `bgHeroTealGlow` | `bg-hero-teal-glow.svg` | Teal radial glow burst behind mockup, right side | Yes |
| `bgHeroSideLines` | `bg-hero-side-lines.svg` | Vertical lines, left edge, hidden on mobile | Yes |
| `bgMidFlowLines` | `bg-mid-flow-lines.svg` | Flowing lines bridging hero to mid sections | Per-section |
| `bgLowerTopography` | `bg-lower-topography.svg` | Topography mesh for lower page sections | Per-section |
| `bgLowerSideLines` | `bg-lower-side-lines.svg` | Side lines for lower page sections | Per-section |

---

## Section Bands

Section background bands (`top-[977px]`, `top-[2358px]` etc. from the rejected PR) are **not** in `LandingBackground`.

**Reason:** Hardcoded `top` offsets break as soon as section content height changes. Using fixed offsets means the bands drift off their sections on different screen sizes.

**Solution (Option A):** Each section component owns its own band:

```tsx
// Inside a section component
export function ForDevelopersSection() {
  return (
    <section className="relative">
      {/* Band co-located with its section — no fixed top offset needed */}
      <div className="absolute inset-0 bg-black/25 -z-10" />
      ... section content ...
    </section>
  );
}
```

Mid/lower decorative SVGs (`bgMidFlowLines`, `bgLowerTopography`, `bgLowerSideLines`) and the amber glow orb will be added inside their respective section components in subsequent PRs.

---

## Grain Overlay

Inline SVG `feTurbulence` tiled at 128px, `opacity-[0.04] mix-blend-overlay`. Do not adjust the opacity — 0.04 is the Figma spec value.

```tsx
const GRAIN_STYLE = {
  backgroundImage: `url("data:image/svg+xml,<svg ...><feTurbulence .../></svg>")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
};
```

---

## Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| `< 768px` (375px–767px) | Hero zone clamped to 600px. Accent lines, flow lines, topography scale to ~40–55% width. Teal glow orbs reduce blur. Side lines hidden (`max-md:hidden`). |
| `768px – 1023px` | Hero zone 600px–694px. Same scaled SVG positions. `max-lg` variants active. |
| `1024px – 1439px` | Hero zone 694px–869px. Scales proportionally. Full desktop SVG positions active. |
| `≥ 1440px` | Full Figma design — 977px hero zone, all layers at spec dimensions. |

`overflow-x-hidden` on the page root is acceptable to contain decorative bleeds — it must not mask broken content layout.

---

## Usage

```tsx
// In app/page.tsx or landing layout
import { LandingBackground } from "@/components/landing/landing-background";

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">
      <LandingBackground />
      <div className="relative z-10">
        {/* page content */}
      </div>
    </div>
  );
}
```

---

## Related

- Issue [#96](https://github.com/patchid/func-kode/issues/96) — this PR
- Issue [#92](https://github.com/patchid/func-kode/issues/92) — EPIC: Landing Page Rebuild
- Issue [#95](https://github.com/patchid/func-kode/issues/95) — Design Tokens (dependency)
- Issue [#97](https://github.com/patchid/func-kode/issues/97) — HeroSection component
- [`lib/landing-assets.ts`](../../lib/landing-assets.ts) — asset registry
- [`docs/architecture/design-tokens.md`](../architecture/design-tokens.md) — color/spacing tokens