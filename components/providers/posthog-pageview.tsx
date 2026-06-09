"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import {
  buildSanitizedPageviewUrl,
  sanitizeSearchParams,
} from "@/lib/posthog-analytics-url";

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  const search = useMemo(() => sanitizeSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    if (!pathname || !posthog) {
      return;
    }

    posthog.capture("$pageview", {
      $current_url: buildSanitizedPageviewUrl(
        pathname,
        search,
        window.location.origin,
      ),
      $pathname: pathname,
      $search: search,
    });
  }, [pathname, search, posthog]);

  return null;
}
