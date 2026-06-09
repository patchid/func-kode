import { LANDING_ASSETS } from "@/lib/landing-assets";

/**
 * Inline grain texture — SVG feTurbulence tiled at 128px.
 * opacity-[0.04] mix-blend-overlay per design spec.
 */
const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
} as const;

/**
 * Full-page gradient — matches Figma spec exactly.
 * Uses color values from landing.* tokens (tailwind.config.ts).
 */
const GRADIENT =
  "linear-gradient(180deg, #040710 4%, #7020BF 35%, #111B34 64%, #111B34 88%)";

/**
 * BgLayer — purely decorative SVG/image layer.
 *
 * Uses a raw <img> (not next/image) because:
 *   1. These are decorative — no LCP, no CLS impact.
 *   2. fetchPriority="low" defers loading correctly.
 *   3. No need for Next.js width/height optimisation on background decoration.
 */
function BgLayer({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      decoding="async"
      fetchPriority="low"
      aria-hidden="true"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
    />
  );
}

/**
 * LandingBackground
 *
 * Full-page decorative background layer for the landing page.
 * Rendered absolutely behind all content — aria-hidden, pointer-events-none.
 *
 * Positioning strategy:
 *   - Horizontal: percentage of container width (no raw px).
 *   - Vertical within hero zone: percentage of hero zone height (clamp-based).
 *   - Section bands: NOT here — each section component owns its own band.
 *     See docs/components/landing-background.md for the rationale.
 *
 * Hero zone height derivation:
 *   Figma canvas = 1440 × 4727px. Hero zone = 977px tall.
 *   977 / 1440 = 67.85vw → clamp(600px, 67.85vw, 977px).
 */
export function LandingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden isolate"
      aria-hidden="true"
      role="presentation"
    >
      {/* ── 1. Full-page gradient ───────────────────────────────────────────
           Covers the entire page height regardless of content length.
           No fixed height — grows with page naturally. */}
      <div className="absolute inset-0" style={{ background: GRADIENT }} />

      {/* ── 2. Hero zone decorative layers ─────────────────────────────────
           Height = clamp(600px, 67.85vw, 977px).
           At 1440px wide this is exactly 977px (Figma spec).
           All child positions use % of this zone's width/height — no raw px.

           Conversions from Figma (1440px canvas, 977px hero zone):
             left-[541px]   → left: 37.57%   (541 / 1440)
             top-[246px]    → top:  25.18%   (246 / 977)
             left-[636px]   → left: 44.17%   (636 / 1440)
             etc.
      */}
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: "clamp(600px, 67.85vw, 977px)" }}
      >
        {/* Purple glow orb — centre-left, behind hero heading */}
        <div
          className="absolute rounded-full border border-landing-teal bg-landing-purple
                     blur-[200px] max-lg:blur-[120px]"
          style={{
            left: "37.57%",
            top: "25.18%",
            width: "clamp(200px, 40.21vw, 579px)",
            height: "clamp(200px, 40.21vw, 579px)",
          }}
        />

        {/* Teal glow — top-right edge */}
        <div
          className="absolute rounded-full bg-landing-teal/25 blur-[90px] max-lg:blur-[60px]"
          style={{
            right: "-1rem",
            top: "4.09%",
            width: "clamp(140px, 19.44vw, 280px)",
            height: "clamp(180px, 27.78vw, 400px)",
          }}
        />

        {/* Teal glow — right edge, lower (desktop only) */}
        <div
          className="absolute rounded-full bg-landing-teal/15 blur-[80px] max-lg:hidden"
          style={{
            right: "-2rem",
            top: "53.22%",
            width: "clamp(120px, 16.67vw, 240px)",
            height: "clamp(160px, 22.22vw, 320px)",
          }}
        />

        {/* SVG layer: accent lines — far left bleed
             Figma: left=-1066px top=-1279px  →  -74.03% / -130.91% */}
        <BgLayer
          src={LANDING_ASSETS.bgHeroAccentLines}
          className="top-[-130.91%] left-[-74.03%] w-[62.92%]
                     max-lg:top-[-81.88%] max-lg:left-[-48.61%] max-lg:w-[40.28%]"
        />

        {/* SVG layer: flow lines — sweeps diagonally across hero
             Figma: left=296px top=-344px  →  20.56% / -35.21% */}
        <BgLayer
          src={LANDING_ASSETS.bgHeroFlowLines}
          className="top-[-35.21%] left-[20.56%] w-[107.43%]
                     max-lg:top-[-18.43%] max-lg:left-[2.78%] max-lg:w-[55.56%]"
        />

        {/* SVG layer: topography mesh — large subtle fill at 40% opacity
             Figma: left=-514px top=-731px  →  -35.69% / -74.82% */}
        <BgLayer
          src={LANDING_ASSETS.bgHeroTopography}
          className="top-[-74.82%] left-[-35.69%] w-[226.04%] opacity-40
                     max-lg:top-[-38.89%] max-lg:left-[-19.44%] max-lg:w-[111.11%]"
        />

        {/* SVG layer: teal glow burst — right side behind mockup
             Figma: left=636px top=329px  →  44.17% / 33.67% */}
        <BgLayer
          src={LANDING_ASSETS.bgHeroTealGlow}
          className="top-[33.67%] left-[44.17%] w-[60.21%]
                     max-lg:left-auto max-lg:right-[-8%] max-lg:top-[18.42%] max-lg:w-[31.94%]"
        />

        {/* SVG layer: side lines — left edge, hidden on mobile
             Figma: left=-83px top=337px  →  -5.76% / 34.49% */}
        <BgLayer
          src={LANDING_ASSETS.bgHeroSideLines}
          className="top-[34.49%] left-[-5.76%] w-[39.58%] opacity-30 max-md:hidden"
        />
      </div>

      {/* ── 3. Grain overlay ────────────────────────────────────────────────
           Full-page, tiled SVG noise at opacity-[0.04] mix-blend-overlay.
           Matches design spec exactly — do not adjust opacity. */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={GRAIN_STYLE}
      />

      {/*
        ── Section background bands are NOT rendered here ───────────────────
        Rationale (Option A from issue #96):
          Each content section owns its own background band so vertical
          position is determined by content flow, not a hardcoded top offset.

        Pattern to use inside each section component:
          <div className="relative">
            <div className="absolute inset-x-0 inset-y-0 bg-black/25 -z-10" />
            ... section content ...
          </div>

        Mid/lower decorative SVGs (bgMidFlowLines, bgLowerTopography,
        bgLowerSideLines) and the amber glow orb will be added per-section
        in subsequent PRs (#97+).
      */}
    </div>
  );
}
