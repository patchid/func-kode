# 🤝 Contributing to func(Kode)

Hey dev! 👋  
Thanks for contributing to func(kode). We want this repository to be friendly to first-time contributors and efficient for regular maintainers.

---

## 🚀 About the Project

`func(Kode)` is a GitHub-first developer collective.  
We build projects together, track real-time contributions, and grow through meaningful collaboration.  
All our contributions happen via GitHub and our platform at [func(Kode)](https://func-kode.netlify.app/).

func(kode) is a developer collective platform built around onboarding, collaboration, contribution tracking and community-driven building.

---

## 🧭 Getting Started

### Before You Start

- Search existing issues before opening a new one.
- For large changes, open an issue first and discuss the approach.
- Keep pull requests focused; avoid mixing unrelated changes.

### ⭐ 1. Star, Fork & Clone the Repo

```bash
# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/func-kode.git
cd func-kode
git checkout dev
git checkout -b feat/your-feature-name
npm install
```

### 2. Set Up Your Development Environment

**Important**: Create your local environment file and add the required variables and then start the app.

For the full environment variable table, see [docs/contributing/how-to-contribute.md](docs/contributing/how-to-contribute.md).

### 3. Run the App

```bash
npm run dev
```

### 4. Branching Strategy

- `main`= stable, production-ready code
- `dev`= integration branch for validated work.
- Feature branches should start from `dev``

### 5. Recommended branch names

- `feat/...`
- `fix/...`
- `docs/...`
- `refactor/...`
- `chore/...`
- `test/...`

### 6. What you can work on

You can contribute to:

🐛 Bug fixes

💅 UI/UX improvements

✨ New features

📖 Documentation

🔧 Code refactors

⚡ Performance boosts

🧪 Tests and developer experience


### 7. Coding Expectations

- Use clean names and small, focused changes
- Prefer resubale components over copy-paste
- Keep functions simple and readable
- Do not commit secrets, tokens, or production credentials.
- Update docs when behaviour changes.

### 8. Pull Request Process

1. Make your changes in a feature branch.
2. Run checks locally:

```bash
npm run lint
npm run build
````

3. Commit with a clear message.
4. Push your brach and open a PR against `dev` unless a maintainer asks for `main`.
5. Fill out the PR template completely
6. Link the related issues.
7. Address review feedback and keep the branch up to date.


### 9. Commit Message Style.

Use simple conventional-style commits where possible:


### 10. Issue Reporting

When reporting bugs, include:

- What happened
- What you expected
- Steps to reproduce
- Screenshots or logs
- Browse / OS details when relevant

When requesting features, include:

- Problem statement
- Proposaed solution
- Alternative considered
- Any UI or API impact

Comment on the issue before starting to work so maintainers can assign or guide you.

### 11. Community

Please follow the `CODE_OF_CONDUCT.md` in all repo interactions.

Thanks again for helping build func(kode)