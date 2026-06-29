# Cloudflare Branch Deployment Rules

> **Issue:** [#222](https://github.com/patchid/func-kode/issues/222)  
> **Priority:** P0 — must be done before any feature branch work continues

## Problem

Cloudflare Pages is auto-deploying **every branch push** to production (`patch-id.com`). Feature branches like `feature/authNdashboard` are triggering production deploys. This must be locked down immediately.

## Correct branch model

| Branch | Environment | URL |
|---|---|---|
| `main` | Production | `patch-id.com` / `app.patch-id.com` |
| `dev` | Preview | `dev.patch-id.com` (CF preview URL) |
| `staging/demo` | Preview | `staging.patch-id.com` (CF preview URL) |
| `feat/*`, `fix/*`, `chore/*` | ❌ No deploy | — |

---

## Step-by-step: Lock Cloudflare Pages to `main` only

### Step 1 — Go to Cloudflare Dashboard

1. Open [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select account **Patch ID**
3. Go to **Workers & Pages → func-kode**
4. Click **Settings → Builds & Deployments**

### Step 2 — Set Production Branch

1. Under **Production branch**, set value to: `main`
2. Save

### Step 3 — Configure Preview Branches

1. Under **Preview branches**, select **Custom branches**
2. Add: `dev`
3. Add: `staging/demo`
4. Remove any wildcard (`*`) or other entries
5. Save

### Step 4 — Disable all other branch builds

1. Ensure **"Enable automatic deployments"** is toggled **OFF** for branches not in the list above
2. Confirm: `feat/*`, `fix/*`, `chore/*` branches show no deploy trigger

### Step 5 — Verify

```bash
# Push a test commit to a feature branch
git checkout -b test/cf-verify
git commit --allow-empty -m "test: verify no CF deploy"
git push origin test/cf-verify
```

Expected: **no new Cloudflare Pages build triggered**  
Expected: `patch-id.com` still serves the last `main` deploy unchanged

---

## Step-by-step: Deploy app-subdomain Worker (Issue #223)

Do this **after** step above is complete.

1. Go to **Workers & Pages → Create Worker**
2. Name it: `app-subdomain`
3. Paste contents of `workers/app-subdomain.ts`
4. Click **Deploy**
5. Go to **Workers & Pages → app-subdomain → Triggers → Add Route**
6. Route: `app.patch-id.com/*`
7. Zone: `patch-id.com`
8. Save

### Verify

- `app.patch-id.com/` → loads dashboard (authenticated)
- `app.patch-id.com/score` → loads score page
- Unauthenticated visit → redirects to `/connect`

---

## Checklist

- [ ] Production branch = `main` only
- [ ] Preview branches = `dev`, `staging/demo` only
- [ ] `feat/*`, `fix/*`, `chore/*` produce no CF build
- [ ] Test branch push verified — no deploy triggered
- [ ] `app-subdomain` Worker deployed
- [ ] `app.patch-id.com` route added
- [ ] Issue [#222](https://github.com/patchid/func-kode/issues/222) closed
- [ ] Issue [#223](https://github.com/patchid/func-kode/issues/223) closed
