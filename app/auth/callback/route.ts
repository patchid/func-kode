import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { captureServerEvent } from "@/lib/analytics/server";

function sanitizeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }
  return next;
}

/**
 * Checks if this is the user's first ever sign-in by looking at
 * created_at vs last_sign_in_at on the Supabase user object.
 *
 * Supabase sets last_sign_in_at to the current timestamp on every
 * successful auth exchange, so we compare against created_at:
 * if they are within 10 seconds of each other, this is a brand new user.
 */
function isNewUser(user: { created_at: string; last_sign_in_at?: string }): boolean {
  if (!user.last_sign_in_at) return true;
  const created = new Date(user.created_at).getTime();
  const lastSignIn = new Date(user.last_sign_in_at).getTime();
  return Math.abs(lastSignIn - created) < 10_000; // within 10 seconds = new user
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = sanitizeNextPath(url.searchParams.get("next"));

  if (!code) {
    await captureServerEvent("anonymous", ANALYTICS_EVENTS.LOGIN_FAILED, {
      error: "no_code",
    });
    return NextResponse.redirect(new URL("/auth/login?error=no_code", request.url));
  }

  // Determine redirect destination BEFORE creating the response
  // so we can swap it based on new vs returning user below.
  let redirectPath = next;

  // Initialise a temporary response — we'll replace the redirect URL after
  // we know whether the user is new or returning.
  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    await captureServerEvent("anonymous", ANALYTICS_EVENTS.LOGIN_FAILED, {
      error: error?.message ?? "exchange_failed",
    });
    return NextResponse.redirect(
      new URL("/auth/login?error=exchange_failed", request.url)
    );
  }

  const { user, session } = data;
  const provider =
    (session.user.app_metadata?.provider as string | undefined) ?? "github";

  // Route new users to onboarding, returning users to dashboard (or `next` param)
  const newUser = isNewUser(user);
  redirectPath = newUser ? "/dashboard/onboarding" : next;

  await captureServerEvent(user.id, ANALYTICS_EVENTS.LOGIN_SUCCEEDED, {
    provider,
    is_new_user: newUser,
  });

  // Build a fresh redirect response with correct destination + cookies already set
  const finalResponse = NextResponse.redirect(
    new URL(redirectPath, request.url)
  );

  // Copy over the auth cookies from the original response
  response.cookies.getAll().forEach((cookie) => {
    finalResponse.cookies.set(cookie.name, cookie.value);
  });

  return finalResponse;
}
