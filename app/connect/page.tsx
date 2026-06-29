/**
 * /connect — GitHub OAuth trigger
 *
 * This is the only entry point for authentication.
 * Landing page CTA buttons point here.
 * After OAuth completes, Supabase redirects to /dashboard via /auth/callback.
 *
 * URL: patch-id.com/connect
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ConnectPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If already authenticated, send straight to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Trigger GitHub OAuth
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      scopes: "read:user user:email read:org",
    },
  });

  if (error || !data.url) {
    // Graceful fallback — should rarely happen
    redirect("/?error=oauth_failed");
  }

  redirect(data.url);
}
