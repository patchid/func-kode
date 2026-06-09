const DEFAULT_POSTHOG_HOST = "https://app.posthog.com";

/** OTLP logs ingest URL for PostHog (US/EU). Override with POSTHOG_OTLP_LOGS_URL. */
export function getPostHogOtlpLogsUrl(host?: string): string {
  const explicit = process.env.POSTHOG_OTLP_LOGS_URL;
  if (explicit) {
    return explicit;
  }

  const normalized = (host ?? process.env.NEXT_PUBLIC_POSTHOG_HOST ?? DEFAULT_POSTHOG_HOST).toLowerCase();
  if (normalized.includes("eu")) {
    return "https://eu.i.posthog.com/otlp/v1/logs";
  }

  return "https://us.i.posthog.com/otlp/v1/logs";
}

export const POSTHOG_SERVICE_NAME =
  process.env.POSTHOG_SERVICE_NAME ?? "funckode";

export function isPostHogLogsEnabled(): boolean {
  return process.env.NODE_ENV !== "development" && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}
