# Patch ID — Branch & Deployment Strategy

## Branch ownership

| Branch | Purpose | Deploys to |
|---|---|---|
| `main` | Production — protected, PR only | `patch-id.com` (Cloudflare Production) |
| `dev` | Active development integration branch | Preview only — NOT production |
| `staging/demo` | Investor demo / QA staging | Preview only |
| `feat/*` | Feature branches | No auto-deploy |
| `fix/*` | Bug fix branches | No auto-deploy |
| `hotfix/*` | Emergency production fixes | Merge to `main` directly via PR |

## Cloudflare Pages rules (set manually in dashboard)

- **Production branch:** `main` only
- **Preview branches:** `dev`, `staging/demo` only
- **All other branches:** disabled — no auto-deploy

## URL routing

| URL | What it serves |
|---|---|
| `patch-id.com/` | Landing page — public, no auth |
| `patch-id.com/oss` | Open source community page — public |
| `patch-id.com/connect` | GitHub OAuth entry point — triggers Supabase OAuth |
| `patch-id.com/blog` | Blog — public |
| `patch-id.com/events` | Events — public |
| `patch-id.com/dashboard/**` | Developer dashboard — auth required |
| `app.patch-id.com/**` | Rewrites to `/dashboard/**` via Cloudflare Worker |
| `partner.patch-id.com/**` | Partner API dashboard — separate repo (Phase 2) |
| `admin.patch-id.com/**` | Internal admin console — separate repo (Phase 2) |

## Auth flow

```
User clicks "Connect" on landing page
  → patch-id.com/connect
  → GitHub OAuth via Supabase
  → /auth/callback
  → /dashboard (or /dashboard/onboarding if first time)
```

## Protected routes (middleware.ts)

Only these prefixes run Supabase session validation:
- `/dashboard`
- `/profile`
- `/score`
- `/onboarding`
- `/settings`

All other routes are fully public — no auth overhead.

## Worker routing (Cloudflare)

`workers/app-subdomain.ts` handles `app.patch-id.com` → `/dashboard` rewrite.

Add this in Cloudflare Dashboard → Workers & Pages → Add Route:
- Route: `app.patch-id.com/*`
- Worker: deploy `workers/app-subdomain.ts` as a standalone Worker named `app-subdomain`

## Future migration (Pilot MVP phase)

When the dashboard is stable and partner console is ready,
migrate `app.patch-id.com` to a fully separate Cloudflare Pages project (Option B)
for complete isolation and independent deployment pipelines.
