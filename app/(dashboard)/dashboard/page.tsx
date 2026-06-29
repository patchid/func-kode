/**
 * /dashboard — Main developer dashboard
 *
 * Accessible at:
 *   patch-id.com/dashboard
 *   app.patch-id.com/ (via Cloudflare Worker rewrite)
 *
 * Sprint 1: placeholder shell
 * Sprint 2: Patch ID score card + activity feed
 * Sprint 3: full profile + recruiter-visible view
 */

import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard | Patch ID",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Your Patch ID</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {user?.user_metadata?.user_name ?? user?.email}.
        </p>
      </div>

      {/* TODO: Sprint 2 — <PatchIDScoreCard userId={user.id} /> */}
      {/* TODO: Sprint 2 — <ActivityFeed userId={user.id} /> */}
      {/* TODO: Sprint 3 — <ProfilePreview userId={user.id} /> */}

      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Score card coming in Sprint 2.
      </div>
    </div>
  );
}
