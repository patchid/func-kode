import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

/**
 * PATCH ID MIDDLEWARE
 *
 * Route ownership:
 *   patch-id.com/              → (marketing) landing page  — no auth
 *   patch-id.com/oss           → open source community     — no auth
 *   patch-id.com/connect       → GitHub OAuth trigger      — no auth (redirects to Supabase OAuth)
 *   patch-id.com/blog          → blog                      — no auth
 *   patch-id.com/events        → events                    — no auth
 *
 *   /dashboard/**              → developer dashboard       — AUTH REQUIRED
 *   /profile/**                → developer profile         — AUTH REQUIRED
 *   /score/**                  → patch id score view       — AUTH REQUIRED
 *   /onboarding/**             → post-oauth onboarding     — AUTH REQUIRED
 *   /settings/**               → account settings          — AUTH REQUIRED
 *
 * app.patch-id.com is routed to /dashboard via the Cloudflare Worker
 * defined in workers/app-subdomain.ts — no separate deploy needed.
 */

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/score",
  "/onboarding",
  "/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtected) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - static image formats
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
