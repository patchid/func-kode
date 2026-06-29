/**
 * Dashboard layout — auth guard for all /dashboard/** routes
 *
 * Any unauthenticated request to /dashboard/** is redirected
 * to /connect (GitHub OAuth) rather than a login page.
 *
 * This layout wraps:
 *   /dashboard          → main developer dashboard
 *   /dashboard/profile  → developer profile
 *   /dashboard/score    → Patch ID score view
 *   /dashboard/settings → account settings
 *   /dashboard/onboarding → post-oauth onboarding
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
      {/* TODO: Add DashboardNav component here in Sprint 2 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
