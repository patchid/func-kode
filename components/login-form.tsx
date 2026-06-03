"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import posthog from "posthog-js";
import {
  buildOAuthCallbackUrl,
  GITHUB_OAUTH_SCOPES,
  getGithubOAuthErrorMessage,
} from "@/lib/supabase/oauth";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGithubLogin = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      posthog.capture('login_attempt', { method: 'github' });

      const supabase = createClientComponentClient();
      const origin = window.location.origin;
      const params = new URLSearchParams(window.location.search);
      const nextParam = params.get("redirect") || params.get("next") || "/dashboard";

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          scopes: GITHUB_OAUTH_SCOPES,
          redirectTo: buildOAuthCallbackUrl(origin, nextParam),
        },
      });

      if (error) {
        posthog.capture('login_failed', { method: 'github', error: error.message });
        setErrorMsg(getGithubOAuthErrorMessage(error.message));
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setErrorMsg("No redirect URL returned. Please retry.");
    } catch (e) {
      setErrorMsg("Unexpected error starting GitHub sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        type="button"
        onClick={handleGithubLogin}
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
      >
        {loading ? "Redirecting to GitHub…" : "Sign in with GitHub"}
      </Button>
      {errorMsg && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
    </div>
  );
}
