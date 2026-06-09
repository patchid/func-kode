"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { useForkCount } from "@/components/site-chrome";

/**
 * LandingPageContent
 *
 * Foreground content layer for the landing page.
 * "use client" is required here to read forkCount from SiteChrome context.
 *
 * Sits above LandingBackground (z-10) inside app/page.tsx.
 * Max width constrained to 1440px (Figma canvas) — centres on wider screens.
 */
export function LandingPageContent() {
  const forkCount = useForkCount();

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1440px] overflow-visible">
      <Navbar variant="landing" forkCount={forkCount} />
      <HeroSection />
    </div>
  );
}
