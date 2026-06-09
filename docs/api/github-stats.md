# API Route: /api/github-stats

> **Status:** ✅ Implemented — issue [#94](https://github.com/patchid/func-kode/issues/94)

---

## Purpose

Provides cached GitHub repository stats (fork count, star count) to the Navbar and any other UI that needs them — without making unauthenticated client-side calls to the GitHub API on every page load.

> ⚠️ Unauthenticated GitHub API calls are rate-limited to **60 requests/hour per IP**. This route and the shared `lib/github-stats.ts` helper cache the response server-side.

---

## Endpoint

```
GET /api/github-stats
```

### Response

```json
{
  "forks": 7,
  "stars": 9,
  "repo": "patchid/func-kode"
}
```

`forks` and `stars` may be `null` if the GitHub API is unreachable or rate-limited.

---

## Implementation

```ts
// app/api/github-stats/route.ts
import { getGitHubStats } from "@/lib/github-stats";

export const revalidate = 3600;

export async function GET() {
  const stats = await getGitHubStats();
  return Response.json(stats);
}
```

Shared fetch logic lives in `lib/github-stats.ts`:

```ts
export async function getGitHubStats() {
  const res = await fetch(`https://api.github.com/repos/patchid/func-kode`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 3600 },
  });
  // returns { forks, stars, repo }
}
```

**Cache window:** 1 hour (`revalidate: 3600`).

---

## Usage in Navbar

The Navbar does **not** call this route directly. Instead, `app/layout.tsx` fetches stats at request time and passes the fork count as a prop:

```tsx
// app/layout.tsx (Server Component)
const { forks: forkCount } = await getGitHubStats();

<SiteChrome forkCount={forkCount}>
  {children}
</SiteChrome>

// components/site-chrome.tsx
<Navbar forkCount={forkCount} />
```

Other components may call `GET /api/github-stats` if they need live stats without going through the layout.

---

## Files

| File | Role |
|---|---|
| `app/api/github-stats/route.ts` | Public API route handler |
| `lib/github-stats.ts` | Shared fetch + ISR cache config |
| `app/layout.tsx` | Primary consumer (passes `forkCount` to Navbar) |

---

## Manual Verification

```bash
curl http://localhost:3000/api/github-stats
```

Expected: JSON with `forks`, `stars`, and `repo` fields. Repeat within 1 hour — response should be served from cache (no new GitHub API call per page load).
