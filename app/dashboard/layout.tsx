import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const cookieStore = await cookies();
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const profileRes = await fetch(`${origin.replace(/\/$/, "")}/api/profile`, {
    method: "GET",
    headers: {
      cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
    cache: "no-store",
  });

  if (!profileRes.ok) {
    redirect("/onboard");
  }

  const profileBody = await profileRes.json().catch(() => ({}));
  if (!profileBody?.profile?.is_onboarded) {
    redirect("/onboard");
  }

  return <>{children}</>;
}
