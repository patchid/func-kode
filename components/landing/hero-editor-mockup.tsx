import { LANDING_ASSETS } from "@/lib/landing-assets";
import { HERO_MOCKUP_WIDTH_PX, HERO_MOCKUP_HEIGHT_PX } from "@/lib/landing-constants";

/**
 * HeroEditorMockup
 *
 * Renders the platform preview SVG at its Figma aspect ratio (822 / 590).
 * This is an above-the-fold LCP element — fetchPriority="high".
 *
 * Dimensions from lib/landing-constants.ts:
 *   HERO_MOCKUP_WIDTH_PX  = 822
 *   HERO_MOCKUP_HEIGHT_PX = 590
 */
export function HeroEditorMockup() {
  return (
    <div
      className="relative isolate w-full [transform:translateZ(0)]"
      style={{ aspectRatio: `${HERO_MOCKUP_WIDTH_PX} / ${HERO_MOCKUP_HEIGHT_PX}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LANDING_ASSETS.heroEditorMockup}
        alt="Platform preview"
        width={HERO_MOCKUP_WIDTH_PX}
        height={HERO_MOCKUP_HEIGHT_PX}
        decoding="async"
        fetchPriority="high"
        className="h-full w-full drop-shadow-[0_7px_22px_rgba(0,0,0,0.28)]"
      />
    </div>
  );
}
