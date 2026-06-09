# Architecture Overview

> **Status:** 🚧 Partial — `SiteChrome` documented in [`site-chrome.md`](./site-chrome.md); other sections still TODO

---

## Tech Stack

See [`tech-stack.md`](./tech-stack.md) for full details.

---

## High-Level Structure

```
func-kode/
├── app/                    ← Next.js App Router pages
│   ├── layout.tsx          ← Root layout (uses SiteChrome)
│   ├── page.tsx            ← Landing page
│   └── (other routes)/
├── components/
│   ├── landing/            ← Landing page components only
│   │   ├── landing-assets.ts
│   │   ├── landing-background.tsx
│   │   ├── landing-page-content.tsx
│   │   ├── hero-section.tsx
│   │   └── hero-editor-mockup.tsx
│   ├── navbar.tsx          ← Global navbar (auth-aware)
│   ├── footer.tsx          ← Global footer
│   ├── site-chrome.tsx     ← Route-aware layout wrapper (see site-chrome.md)
│   └── ui/                 ← Shared UI primitives
├── lib/                    ← Utilities and helpers
│   └── github-stats.ts     ← Cached GitHub repo stats (Navbar fork count)
├── public/
│   └── landing/            ← Landing page static assets (SVGs, images)
├── docs/                   ← ← You are here
└── tailwind.config.ts      ← Design tokens
```

---

## Page Rendering Strategy

<!--TODO: document which pages are SSR, SSG, ISR, or client-side -->

| Route | Strategy | Reason |
|---|---|---|
| `/` (landing) | SSG | Static marketing content, no auth dependency |
| `/dashboard` | SSR | Requires auth session |
| <!--TODO--> | | |

---

## Authentication

<!--TODO: describe Supabase auth flow, session management, and how components access user state -->

---

## Data Flow

<!--TODO: describe how data moves from Supabase → server components → client components -->
