/**
 * landing-constants.ts
 *
 * Absolute Figma canvas offsets for the landing page at 1440px width.
 *
 * IMPORTANT - read before using:
 *   - These are raw pixel coordinates from the Figma canvas, NOT design tokens.
 *   - Do NOT use these as arbitrary Tailwind classes (e.g. w-[572px]).
 *   - Do NOT use these as CSS custom property values or min-h / max-h values.
 *   - Safe usage: inline styles (`style={{ left: HERO_MOCKUP_LEFT_PX }}`) for
 *     absolutely-positioned elements that must match the Figma canvas exactly.
 *   - For responsive spacing that scales, prefer the Tailwind tokens in
 *     tailwind.config.ts (e.g. `px-landing-canvas`, `gap-landing-cta`).
 */

/** Width of the Figma design canvas in pixels. All offsets below are relative to this. */
export const FIGMA_CANVAS_WIDTH_PX = 1440;

/**
 * Total height of the Figma landing page canvas.
 *
 * WARNING: Do NOT use this as a CSS min-height or height value — it is the full-page
 * artboard height and will produce an unusably tall fixed-height layout.
 */
export const FIGMA_CANVAS_HEIGHT_PX = 4727;

/**
 * Horizontal left offset of the hero mockup image from the canvas edge (1440px canvas).
 * Use as an inline style only: `style={{ left: HERO_MOCKUP_LEFT_PX }}`.
 * Do NOT convert to an arbitrary Tailwind class.
 */
export const HERO_MOCKUP_LEFT_PX = 572;

/** Width of the hero mockup image as specified in Figma. */
export const HERO_MOCKUP_WIDTH_PX = 822;

/** Height of the hero mockup image as specified in Figma. */
export const HERO_MOCKUP_HEIGHT_PX = 590;

/**
 * Left padding of the hero text column at 1440px canvas width.
 *
 * Prefer the Tailwind token `px-landing-canvas` (122px) over this constant
 * wherever possible — it participates in the responsive utility pipeline.
 * Use this constant only when you need the raw pixel value (e.g. JS calculations).
 */
export const HERO_TEXT_LEFT_PX = 122;
