/**
 * PATCH ID — app.patch-id.com Subdomain Worker (Option A)
 *
 * This Cloudflare Worker intercepts requests to app.patch-id.com
 * and rewrites them to the /dashboard route internally.
 *
 * This means:
 *   app.patch-id.com/          → /dashboard
 *   app.patch-id.com/profile   → /dashboard/profile
 *   app.patch-id.com/score     → /dashboard/score
 *   app.patch-id.com/settings  → /dashboard/settings
 *
 * The main site (patch-id.com) continues to serve the landing page.
 * No separate deployment is needed. Add this Worker route in Cloudflare:
 *   Route: app.patch-id.com/*
 *   Worker: app-subdomain
 *
 * NOTE: In the future (Pilot MVP phase), migrate to a separate
 * Cloudflare Pages project (Option B) for full isolation.
 */

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Strip the subdomain and rewrite to /dashboard internally
    const rewrittenPath =
      url.pathname === "/" ? "/dashboard" : `/dashboard${url.pathname}`;

    const rewrittenUrl = new URL(
      `https://patch-id.com${rewrittenPath}${url.search}`
    );

    const rewrittenRequest = new Request(rewrittenUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual",
    });

    return fetch(rewrittenRequest);
  },
};
