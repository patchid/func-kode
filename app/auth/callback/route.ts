import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { normalizeRedirectPath } from "@/lib/supabase/oauth";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next") || "/dashboard";
  const nextPath = normalizeRedirectPath(rawNext);

  console.log("=== AUTH CALLBACK START ===");
  console.log("Auth callback - URL:", url.href);
  console.log(
    "Auth callback - Code:",
    code ? `present (${code.substring(0, 10)}...)` : "missing"
  );

  if (!code) {
    console.error("No authorization code received");
    return NextResponse.redirect(
      new URL("/auth/login?error=no_code", request.url)
    );
  }

  let response = NextResponse.redirect(new URL(nextPath, request.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.redirect(new URL(nextPath, request.url));
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.session) {
    console.error(
      "Code exchange failed:",
      error?.message || "No session returned"
    );
    return NextResponse.redirect(
      new URL("/auth/login?error=exchange_failed", request.url)
    );
  }

  console.log("✅ Session created successfully:", {
    userId: data.session.user.id,
    email: data.session.user.email,
    provider: data.session.user.app_metadata?.provider,
  });

  console.log("=== AUTH CALLBACK SUCCESS - REDIRECTING ===");
  return response;
}
