# How to Contribute

> **Status:** 🚧 Template — fill in during onboarding setup

---

## Prerequisites

<!-- List the tools and versions required -->
- Node.js `>=` <!--TODO: add version-->
- npm `>=` <!--TODO: add version-->
- Git
- A GitHub account
- Access to the Figma file <!--TODO: add link-->

---

## Local Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/func-kode.git
cd func-kode

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local

# 4. Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Full site URL (used for redirects) | ✅ |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key for client analytics and server OTLP logs | ⬜ Optional |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog API host (cloud or self-hosted) | ⬜ Optional |
| `POSTHOG_OTLP_LOGS_URL` | Optional override for OTLP log ingest (defaults from host: US/EU) | ⬜ Optional |
| `POSTHOG_SERVICE_NAME` | Service name attached to OpenTelemetry log records | ⬜ Optional |
| `NEXT_PUBLIC_APP_VERSION` | App version shown in the Navbar badge. Defaults to `package.json` `"version"` via `next.config.ts`. Bump `package.json` to release — no manual find-and-replace. | ⬜ Optional |

PostHog client analytics and server OTLP logs are disabled automatically in development, so no events or logs are sent while you work on the app.

### Server logs (OpenTelemetry)

`instrumentation.ts` registers an OTLP log exporter to PostHog on the Node.js runtime. Emit logs from API routes or server code with:

```ts
import { emitPosthogLog } from "@/lib/posthog-server-logger";

emitPosthogLog({
  body: "API route called",
  attributes: { route: "/api/example" },
});
```

---

## Branching Strategy

<!--TODO: describe the branching model (main → dev → feature branches)-->

```
main          ← production
dev           ← staging / integration
fix/ui-tweaks ← active UI work branch
feat/<name>   ← feature branches
fix/<name>    ← bug fix branches
```

---

## Submitting a Contribution

1. Pick an open issue from the [issue tracker](https://github.com/patchid/func-kode/issues)
2. Comment on the issue to claim it
3. Create a branch: `feat/<issue-number>-short-description`
4. Make your changes following the [PR guidelines](./pr-guidelines.md)
5. Open a PR targeting the correct base branch
6. Request a review from a maintainer

---

## Code Style

<!--TODO: add linting/formatting rules, ESLint config notes-->

- We use ESLint and Prettier — run `npm run lint` before pushing
- TypeScript strict mode is enabled — no `any` without justification
- Tailwind CSS for styling — use design tokens, no arbitrary pixel values

---

## Getting Help

- Join the [Discord](https://discord.gg/nnkA8xJ3JU) and ask in `#contributors`
- Open a [GitHub Discussion](https://github.com/patchid/func-kode/discussions)
