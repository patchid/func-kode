# SiteChrome — Global Layout Wrapper

> **Status:** ✅ Implemented — issue [#93](https://github.com/patchid/func-kode/issues/93), updated in [#94](https://github.com/patchid/func-kode/issues/94)

---

## What Is It?

`SiteChrome` (`components/site-chrome.tsx`) is a **client component** that wraps all page content in `app/layout.tsx`. It renders the global `<Navbar variant="app">` on non-landing routes, skips the global Navbar on `/` (so landing shells do not double-render it), and omits `<Footer>` on `/`.

```text
app/layout.tsx (Server Component)
  └── getGitHubStatsSafe()
        └── <SiteChrome forkCount={forks}>
              ├── ForkCountContext (fork count for `/` landing Navbar)
              ├── /  → {children} only (page or LandingPageContent owns Navbar)
              └── other routes
                    ├── <Navbar variant="app" forkCount={forks}>
                    ├── <main>{children}</main>
                    └── <Footer />
```

---

## Why Does It Exist?

### The problem

The root layout is a **Server Component** and cannot call `usePathname()`. `SiteChrome` is the minimal client boundary that:

- Keeps **one** root layout for metadata, fonts, and providers
- Centralizes route-aware chrome rules in **one file**
- Passes server-fetched props (e.g. `forkCount`) into client components

### Blast radius

`SiteChrome` affects **every route** in the app. Reviewers should confirm:

- Navbar on `/` is **not** rendered by `SiteChrome` (avoids duplicate chrome when `LandingPageContent` includes `<Navbar variant="landing" />`)
- Interim `/` (`app/page.tsx`) renders one landing Navbar and reads `forkCount` via `useForkCount()`
- Footer is omitted on `/` (landing footer comes in a later PR)
- `forkCount` from the layout reaches the Navbar without client-side GitHub API calls

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Page content |
| `forkCount` | `number \| null` | `null` | GitHub fork count from `app/layout.tsx` |

---

## Usage

```tsx
// app/layout.tsx
import { getGitHubStatsSafe } from "@/lib/github-stats";
import { SiteChrome } from "@/components/site-chrome";

export default async function RootLayout({ children }) {
  const { forks: forkCount } = await getGitHubStatsSafe();

  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteChrome forkCount={forkCount}>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
```

`SiteChrome` must stay **inside** `Providers` so any future chrome that depends on context (theme, auth) still works.

---

## Route Behaviour

| Route | Global Navbar (`SiteChrome`) | Global Footer | Notes |
|---|---|---|---|
| `/` | ❌ | ❌ | Page / `LandingPageContent` renders `<Navbar variant="landing" />`; use `useForkCount()` for fork count |
| `/dashboard`, `/projects`, `/blog`, … | ✅ `variant="app"` | ✅ | App nav links (Home, About, Projects, Discord) |
| `/auth/login`, `/onboard`, … | ✅ `variant="app"` | ✅ | Unchanged |

---

## Manual Verification

After changing `SiteChrome` or `layout.tsx`, verify:

1. **`/`** — Exactly one Navbar (from page or landing shell); no global Footer; no second Navbar from `SiteChrome`.
2. **`/dashboard`** — Navbar (`variant="app"`) + Footer visible; nav links are route paths, not `/#` anchors.
3. **Network tab** — no client-side calls to `api.github.com` on page load.
4. **Client navigation** — navigate `/dashboard` → `/` → `/dashboard`; Navbar persists; Footer appears/disappears.

---

## Related Work

| Item | Relationship |
|---|---|
| EPIC [#92](https://github.com/patchid/func-kode/issues/92) | Landing rebuild |
| Issue [#94](https://github.com/patchid/func-kode/issues/94) | Navbar rewrite — passes `forkCount`, renders Navbar on `/` |
| Issue [#96](https://github.com/patchid/func-kode/issues/96) | `LandingBackground` — only rendered on `/` |
| Issue [#97](https://github.com/patchid/func-kode/issues/97) | `HeroSection` + `page.tsx` wiring |

---

## Files

| File | Role |
|---|---|
| `components/site-chrome.tsx` | Route-aware chrome wrapper |
| `app/layout.tsx` | Root layout; fetches stats, delegates chrome to `SiteChrome` |
| `components/navbar.tsx` | Global navbar — see [`navbar.md`](../components/navbar.md) |
| `components/footer.tsx` | Global footer (non-landing routes) |
