/**
 * landing-assets.ts
 *
 * Central registry of all /public/landing/ static asset paths.
 *
 * Rules:
 *   - Every key must point to a file that physically exists in /public/landing/.
 *   - Never import these paths directly into CSS — use in src/href attributes only.
 *   - Do not add paths for assets that do not exist yet (causes 404s in production).
 */
export const LANDING_ASSETS = {
  /** Landing page logo (PNG). */
  logo: "/landing/logo.png",

  /** Hero code-editor mockup — primary illustration (SVG). */
  heroEditorMockup: "/landing/hero-editor-mockup.svg",

  /** Hero code-editor mockup — alternate version (SVG). */
  heroEditorMockupAlt: "/landing/hero-editor-2.svg",

  /** Hero editor screen detail. */
  heroEditorScreen: "/landing/hero-editor-2.svg",

  // ── Hero zone background layers ────────────────────────────────────────────

  /** Curved accent lines — far left bleed, renders behind hero text. */
  bgHeroAccentLines: "/landing/bg-hero-accent-lines.svg",

  /** Flowing diagonal lines — spans across the hero zone. */
  bgHeroFlowLines: "/landing/bg-hero-flow-lines.svg",

  /** Large subtle topography mesh — fills hero background at low opacity. */
  bgHeroTopography: "/landing/bg-hero-topography.svg",

  /** Teal radial glow burst — right side of hero behind the mockup. */
  bgHeroTealGlow: "/landing/bg-hero-teal-glow.svg",

  /** Vertical side lines — left edge of hero zone, hidden on mobile. */
  bgHeroSideLines: "/landing/bg-hero-side-lines.svg",

  // ── Mid / lower section background layers ─────────────────────────────────
  // NOTE: These are registered here but rendered per-section (Option A).
  // Each section component owns its own background band — do not add
  // hardcoded top offsets here. See docs/components/landing-background.md.

  /** Flowing lines that bridge the hero and mid sections. */
  bgMidFlowLines: "/landing/bg-mid-flow-lines.svg",

  /** Large topography mesh for lower page sections. */
  bgLowerTopography: "/landing/bg-lower-topography.svg",

  /** Vertical side lines for lower page sections. */
  bgLowerSideLines: "/landing/bg-lower-side-lines.svg",

  // ── Section illustrations ──────────────────────────────────────────────────

  /** Illustration used in the "For Teams & Platforms" section. */
  sectionTeamsIllustration: "/landing/section-teams-illustration.svg",

  /** Illustration used in the "For Developers" section. */
  sectionDevelopersIllustration: "/landing/section-developers-illustration.svg",
} as const;

export type LandingAssetKey = keyof typeof LANDING_ASSETS;
