const DEFAULT_REDIRECT_PATH = "/dashboard";

export const GITHUB_OAUTH_SCOPES = "read:user user:email";

export function normalizeRedirectPath(path?: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return DEFAULT_REDIRECT_PATH;
  }

  return path;
}

export function buildOAuthCallbackUrl(origin: string, nextPath?: string | null) {
  const normalizedNextPath = normalizeRedirectPath(nextPath);
  return `${origin.replace(/\/$/, "")}/auth/callback?next=${encodeURIComponent(normalizedNextPath)}`;
}

export function getGithubOAuthErrorMessage(errorMessage: string) {
  const message = errorMessage.toLowerCase();

  if (message.includes("provider is not enabled") || message.includes("unsupported provider")) {
    return "GitHub is not enabled in Supabase yet. Turn on Auth > Providers > GitHub and add your GitHub OAuth credentials.";
  }

  if (message.includes("redirect") && message.includes("not allowed")) {
    return "Supabase rejected the redirect URL. Add your callback URL in Auth > URL Configuration > Redirect URLs.";
  }

  if (message.includes("invalid_client") || message.includes("client secret")) {
    return "GitHub OAuth credentials are missing or invalid in Supabase. Recheck the Client ID and Secret.";
  }

  return "Could not start GitHub sign-in. Please try again.";
}
