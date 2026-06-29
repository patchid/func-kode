/**
 * (dashboard) route group layout
 *
 * Applies to all authenticated developer-facing pages:
 *   /dashboard
 *   /dashboard/profile
 *   /dashboard/score
 *   /dashboard/settings
 *   /dashboard/onboarding
 *
 * app.patch-id.com/* is rewritten here via workers/app-subdomain.ts
 *
 * Auth guard: any unauthenticated user is sent to /connect.
 * Does NOT use SiteChrome — dashboard has its own nav (DashboardNav, Sprint 2).
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connect");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Sprint 2 — replace with <DashboardNav user={user} /> */}
      <header className="border-b px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Patch ID — {user.email}
        </p>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
