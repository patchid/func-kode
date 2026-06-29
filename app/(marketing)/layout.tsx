/**
 * (marketing) route group layout
 *
 * Applies to all public-facing pages:
 *   patch-id.com/
 *   patch-id.com/oss
 *   patch-id.com/connect
 *   patch-id.com/blog
 *   patch-id.com/events
 *   patch-id.com/rsvp
 *   patch-id.com/submit-project
 *
 * Uses SiteChrome (public nav + footer).
 * No auth check here — fully public.
 */

import { SiteChrome } from "@/components/site-chrome";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
