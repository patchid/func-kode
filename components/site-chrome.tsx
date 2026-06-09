"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ForkCountContext = createContext<number | null>(null);

/** GitHub fork count from root layout — use on `/` where SiteChrome skips the global Navbar. */
export function useForkCount() {
  return useContext(ForkCountContext);
}

/**
 * Route-aware shell for the global Navbar and Footer.
 *
 * On `/`, only children are rendered so a landing shell (e.g. `LandingPageContent`)
 * can own a single `<Navbar variant="landing" />` without duplicating chrome.
 *
 * @see docs/architecture/site-chrome.md
 */
export function SiteChrome({
  children,
  forkCount = null,
}: {
  children: React.ReactNode;
  forkCount?: number | null;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <ForkCountContext.Provider value={forkCount}>
      {isLandingPage ? (
        <div className="flex min-h-screen flex-col">{children}</div>
      ) : (
        <div className="flex min-h-screen flex-col">
          <Navbar variant="app" forkCount={forkCount} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      )}
    </ForkCountContext.Provider>
  );
}
