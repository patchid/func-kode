"use client";

import type { ReactNode } from "react";
import { Suspense, useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PostHogSdkProvider } from "posthog-js/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostHogPageview } from "@/components/providers/posthog-pageview";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";
const analyticsEnabled = process.env.NODE_ENV !== "development" && Boolean(posthogKey);

export function PostHogProvider({ children }: { children: ReactNode }) {
  const trackedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsEnabled || !posthogKey) {
      return;
    }

    if (posthog.__loaded) {
      return;
    }

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: false,
      capture_pageleave: true,
    });

    const supabase = createClientComponentClient();

    const syncIdentity = (userId: string | null) => {
      if (!userId) {
        if (trackedUserId.current) {
          posthog.reset();
          trackedUserId.current = null;
        }

        return;
      }

      if (trackedUserId.current !== userId) {
        posthog.identify(userId);
        trackedUserId.current = userId;
      }
    };

    void supabase.auth.getSession().then(({ data: { session } }) => {
      syncIdentity(session?.user?.id ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      syncIdentity(session?.user?.id ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!analyticsEnabled || !posthogKey) {
    return <>{children}</>;
  }

  return (
    <PostHogSdkProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PostHogSdkProvider>
  );
}
