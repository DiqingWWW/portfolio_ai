# Changelog

## V1.1 — 2026-08-09

### Published scope

- Established the V1.1 portfolio baseline on `main`; no Git tag is created for this minor
  release.
- Retained the experiential Workspace homepage while preserving the conventional selected-work
  route below it.
- Added and refreshed the published project set: Honda HMI Design System, Lincoln Text
  Expression, Portfolio Operating System, and the visual-only Rubik Studio project.
- Moved prototype demonstrations out of professional project windows and into Experiments.
- Added mobile window-sheet behavior, a one-session loading intro, improved hierarchy, shared
  type roles, responsive project covers, and a structured landing footer.

### Content and case studies

- Adopted the factual-master → selection manifest → localized TypeScript module → project page
  workflow for Honda, Lincoln, and Portfolio Operating System.
- Replaced the former generic case-study renderer with dedicated, normal-scrolling project
  compositions and localized English content modules.
- Added the project-content protocol, source traceability, curation fields, and language-aware
  asset selection rules.

### Release and operations

- Deployed V1.1 from `main` commit `c775fd1` through Vercel and verified the configured Alibaba
  Cloud domain. `https://deethin.site` redirects to the canonical
  `https://www.deethin.site`.
- Set `https://www.deethin.site` as the production URL fallback for canonical metadata, sitemap,
  Open Graph, and robots output. Vercel's `NEXT_PUBLIC_SITE_URL` environment variable supplies
  the same value for Production.
- Kept Vercel as the only production deployment path for V1.1. Unverified OpenNext/Cloudflare
  exploration files are intentionally excluded from this release.
- Moved private working material and Google AI archives outside the repository and protected
  against future accidental commits.

### Known follow-up work

- Evaluate a separate China-access architecture only after the Vercel release baseline is
  verified.
- Improve project-master narrative curation before starting a Chinese-site implementation.
