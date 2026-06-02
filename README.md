# ⚙️ func(Kode) — Developer Collective Platform

Welcome to the official website of [func(Kode)](https://func-kode.netlify.app/) — a community-first initiative built by developers, for developers.  
This project is the central platform for onboarding, collaboration, and real-time contribution tracking within the **func(Kode)** GitHub organization.

![Copilot_20250701_193201](https://github.com/user-attachments/assets/8f3c155a-3722-45a7-a86e-3894d83922e4)

---

## 🌐 Live Site

🔗 https://func-kode.netlify.app/
---

## 🧠 What is func(Kode)?

`func(Kode)` is an open dev community that promotes collaboration, learning, and side-project building — using **GitHub-first workflows**.

Our goal:  
To create a hub where developers can sign in, contribute meaningfully, and grow with like-minded techies through weekly sprints and live project tracking.

---

## 📦 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [Supabase Auth + DB](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/about-webhooks)
- [PostgreSQL via Supabase]

---

## 🚀 Features

- 🔐 GitHub OAuth login
- 🧑 Onboarding flow (`/onboard`) to set user profile
- 📊 Dashboard to view contribution activity from our GitHub org
- 🔔 GitHub webhook integration to track pushes, PRs, issues, and more
- 🔒 Protected routes & role-based views
- 💬 Community Discussions via GitHub

---

## 🛠️ Local Development

### For Contributors

**Important**: Contributors should set up their own development environment with personal GitHub OAuth app and Supabase project for security and isolation.

📖 **[Complete Development Setup Guide](./docs/DEVELOPMENT_SETUP.md)**

### Quick Start

```bash
git clone https://github.com/func-kode/site.git
cd site
npm install

# Follow the development setup guide to create your .env.local
npm run dev
```

### Environment Setup

Create a `.env.local` file with your personal development credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
API_EXTERNAL_URL=http://localhost:54321
AUTH_JWT_SECRET=your-local-jwt-secret
GITHUB_ENABLED=true
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret
```

> **Note**: The production environment uses separate OAuth apps and Supabase project for security. For GitHub OAuth, set the callback URL to `http://localhost:54321/auth/v1/callback` in your GitHub OAuth app and keep `NEXT_PUBLIC_SUPABASE_URL` pointed at the local proxy on port `54321`.

### Enable GitHub Login in Supabase

1. Start the local stack with `docker compose up -d`.
2. Open your GitHub OAuth app settings and add `http://localhost:54321/auth/v1/callback` as the authorization callback URL.
3. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `.env.local`.
4. In Supabase Auth, keep the site URL at `http://localhost:3000` and allow `http://localhost:3000/auth/callback`.
5. Restart the Next.js dev server after updating `.env.local`.
