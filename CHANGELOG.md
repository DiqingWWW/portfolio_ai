# Changelog

## V2.0 — 2026-09-16

### Published scope

- Activated the Fabrica-derived experiential homepage at `/` and `/zh`, replacing the V1
  Workspace homepage as the production landing page. V1 remains reachable at `/proto/v1-home`
  and `/zh/proto/v1-home`.
- Added the Chinese-only autonomous-driving-to-Agent research study at
  `/zh/work/autonomous-driving-to-agent`, linked from the homepage Study card.
- Revised the Rubik Studio case study at `/zh/work/rubik-studio`: removed the automotive-seat
  concept visual from the “场景延伸：从编程辅助到汽车 HMI 创作” section, and replaced the
  homepage cover with `cover-spatial-code-edit-v1.png` on both locales.
- Renamed the Rubik Studio project title to “Rubik Studio AI Coding Tool” (English) and
  “Rubik Studio AI 代码工具” (Chinese) across the homepage cards and both case-study route
  metadata records.
- Kept the Experiments section to its heading, supporting copy, and a single link to
  `/experiments`; removed the About Me composition from the homepage and its navigation.

### Content and case studies

- The V2 homepage reads its copy from `content/prototypes/curated-home.json` and
  `content/prototypes/fabrica-study.json`, which are runtime dependencies rather than scratch
  data.
- The Chinese Rubik narrative continues to be authored in
  `content/projects/rubik-studio/case-study.zh.ts`; the page composition is
  `src/components/case-study/RubikStudioPage.tsx`. The English route remains a long-image
  fallback.
- Raw image-generation output under `content/projects/rubik-studio/assets/generated/` is kept on
  disk but deliberately excluded from the release commit; nothing at runtime references it.

### Release and operations

- Deployed V2.0 from `main` commit `e3a45f6` through Vercel. GitHub `main` remains the only
  production deployment trigger; no manual deploy step is used.
- `next.config.ts` now pins `turbopack.root` to the repository, and `tsconfig.json` excludes
  `open-next.config.ts` so the unverified Cloudflare adapter no longer breaks `next build`.
- Fifteen public production routes returned HTTP 200 at `https://www.deethin.site`, and the
  Rubik cover asset matched the committed source byte for byte.
- The unverified OpenNext/Cloudflare path (`open-next.config.ts`, `wrangler.jsonc`,
  `public/_headers`) and the parallel `src/design-system/` and `/proto/pixel-motion` experiments
  remain intentionally excluded from this release.

### Known follow-up work

- Evaluate a separate China-access architecture only after the Vercel release baseline is
  verified.
- Both locales intentionally link their Rubik Studio homepage card to the Chinese case-study
  route `/zh/work/rubik-studio`; a dedicated English case study remains future work.
- `content/projects/rubik-studio/assets/generated/` is still untracked and unignored; consider
  adding it to `.gitignore` so it cannot be committed by accident.

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
