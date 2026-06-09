# func(kode) — Developer Documentation

Welcome to the func(kode) developer docs. This folder contains everything you need to understand the architecture, contribute code, and document your work.

---

## 📂 Structure

```
docs/
├── contributing/
│   ├── how-to-contribute.md     ← Start here if you're new
│   ├── pr-guidelines.md         ← PR rules & atomic PR policy
│   └── code-review-process.md  ← What maintainers look for
├── architecture/
│   ├── overview.md              ← High-level system architecture
│   ├── tech-stack.md            ← Framework, libraries, tooling
│   ├── design-tokens.md         ← Tailwind tokens & design system
│   └── site-chrome.md           ← Global layout wrapper explained
├── components/
│   ├── navbar.md                ← Navbar — auth, fork count, version badge ✅
│   ├── landing-background.md   ← Background layer system
│   └── hero-section.md         ← Hero layout & responsive behaviour
└── api/
    └── github-stats.md          ← /api/github-stats route ✅
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/patchid/func-kode.git
cd func-kode
npm install
npm run dev
```

See [`contributing/how-to-contribute.md`](./contributing/how-to-contribute.md) for the full setup guide.

---

## 📌 Key Rules

- **One PR per component.** No bundled changes. See [`contributing/pr-guidelines.md`](./contributing/pr-guidelines.md).
- **Every PR must include a doc update.** If you build it, you document it.
- **No hardcoded Figma pixel values in production code.** Use design tokens from [`architecture/design-tokens.md`](./architecture/design-tokens.md).

---

> 📣 This docs folder is a living document. If something is wrong or missing, open a PR to fix it — the same way you'd fix a bug.
