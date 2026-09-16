# Sprint V2 continuation and release handoff

Status: Local review candidate; not committed, pushed, or deployed
Prepared: 2026-09-14
Repository: `https://github.com/DiqingWWW/portfolio_ai`
Branch: `main`
Current HEAD: `5b2441f` (`feat(brand): add v1.2 site icons`)
Local path: `/Users/diqing/Documents/AI Projects/portfolio_ai`

## Copyable continuation prompt

Use the following prompt in WorkBuddy, Cursor, Claude Code, or another coding agent:

```text
Continue Sprint V2 in the existing repository at:
/Users/diqing/Documents/AI Projects/portfolio_ai

Read AGENTS.md, governance/product/00_PORTFOLIO_OS.md, CURRENT_SYSTEM.md, and this handoff file
(plans/TODO_SPRINT_V2_HANDOFF.md) before changing anything. Preserve all current uncommitted work.
Do not run git add -A, commit, push, deploy, or modify Vercel until I explicitly authorize it.

Current objective:
1. Keep the Fabrica-derived V2 homepage active at / and /zh.
2. Keep the Chinese autonomous-driving-to-Agent research available as the homepage Study at
   /zh/work/autonomous-driving-to-agent.
3. Keep the revised Chinese Rubik Studio page at /zh/work/rubik-studio. Both English and Chinese
   homepage Rubik cards intentionally link to this Chinese route.
4. Preserve the accepted homepage review changes: About Me is removed and backed up; the
   Experiments section shows only its heading, explanation, and Explore Experiments entry; the
   autonomous-driving Study card is compact; Rubik uses homepage-cover.png.
5. Treat all unmentioned content and behavior as frozen. Do not redesign or refactor adjacent UI.

Before proposing release, inspect git status and the complete diff, verify desktop and mobile,
then run npm run content:check, npm run lint, npx tsc --noEmit, and npm run build. Report exact
warnings or failures. Use the explicit staging guidance in this handoff; do not stage unrelated
Cloudflare, design-system catalogue, PDF, or governance experiments without owner approval.
```

## Accepted V2 scope

### Homepage

- `/` and `/zh` render `CuratedHomepage` in production/reference-study mode.
- The prototype routes remain available for review and rollback.
- Production language switching goes to `/` or `/zh`, never to `/proto/...`.
- English and Chinese project cards preserve their locale routes except Rubik Studio, which
  intentionally points to the Chinese-only revised route.
- The homepage navigation currently contains Home, Work, Studies, Experiments, and Languages.
- About Me is not rendered and is not present in the header or footer navigation.
- The removed About Me composition is preserved in
  `src/app/proto/curated-home-v2/backup/deferred-sections.tsx.txt`.
- The Experiments homepage section contains only its heading, supporting copy, and one link to
  `/experiments`. Experiment cards remain on the dedicated `/experiments` page.

### Autonomous-driving-to-Agent Study

- Public route: `/zh/work/autonomous-driving-to-agent`.
- This is intentionally Chinese-only at this stage.
- The homepage Study card links directly to that route.
- The factual/content pipeline files live in
  `content/projects/autonomous-driving-to-agent/`.
- The page composition is `src/components/case-study/AutonomousAgentResearchPage.tsx`, with
  `AgentDimensionLab.tsx` and `ExpandableResearchImage.tsx` as supporting components.
- The accepted page keeps the complete paper-like argument from the approved master, including
  the introductory reasoning, L1–L5 control-right transition, the derivation of five design
  dimensions, and the research boundary.
- Prior accepted review details include: unboxed proposition and boundary copy, compact L1–L5
  presentation, restored explanatory continuity before the five dimensions, unchanged migration
  principles, and white “仍待验证” heading on the dark closing section.
- The route is included in `src/app/sitemap.ts` without a fabricated English alternate.

### Rubik Studio

- Revised public route: `/zh/work/rubik-studio`.
- Homepage project record: `content/projects/rubik-studio/project.json`.
- `detailHref` is `/zh/work/rubik-studio`; this is a relative application path and will use the
  production domain automatically after deployment. Never hardcode localhost.
- Homepage cover: `content/projects/rubik-studio/homepage-cover.png` (1536 × 1024).
- Revised Chinese narrative: `content/projects/rubik-studio/case-study.zh.ts`.
- Revised page composition: `src/components/case-study/RubikStudioPage.tsx`.
- The former English long-image route still exists at `/work/rubik-studio`, but it is no longer
  the destination of the homepage Rubik card.
- Source/selection records and all approved/generated Rubik assets must remain together under
  `content/projects/rubik-studio/` so the prebuild asset copier can publish them.

## Last verified state

Verified locally on 2026-09-14:

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with 0 errors and 3 pre-existing warnings:
  - unused generated variable in `output/curated-view/content.js`;
  - raw `<img>` in `src/components/Hover/HoverImage.tsx`;
  - unused expression in `tmp/pdfs/portfolio-showcase/capture-web-pages.mjs`.
- `npx next build --webpack`: passed and generated all 26 application pages.
- `npm run assets:prepare`: copied 125 project assets.
- Browser checks at `http://localhost:3000/` confirmed:
  - About Me section and navigation item are absent;
  - the homepage Experiments section has zero project cards and retains `/experiments`;
  - Rubik links to `/zh/work/rubik-studio`;
  - Rubik cover loads from `/assets/images/rubik-studio/homepage-cover.png` at 1536 × 1024;
  - the Study card links to `/zh/work/autonomous-driving-to-agent` and is 220px tall on desktop;
  - all Chinese case-study Home controls return to `/zh`; the English Rubik fallback returns `/`.

Qualification: the normal `npm run build` Turbopack build once remained in its optimization stage
without completing during the available window. The webpack production build passed. Before
release, retry the repository-standard `npm run build`; do not claim it passed unless it finishes.

## Git state and ownership

- GitHub account/organization: `DiqingWWW`.
- Repository: `DiqingWWW/portfolio_ai`.
- Remote: `origin = https://github.com/DiqingWWW/portfolio_ai.git` for fetch and push.
- Local Git identity: `DiqingWWW <35846749+DiqingWWW@users.noreply.github.com>`.
- Active branch: `main`.
- `origin/main` and local HEAD were both at `5b2441f` before this handoff.
- There are many modified and untracked files. They belong to the owner/current tasks. Do not
  reset, clean, overwrite, or delete them.

## Release staging boundary

Do not use `git add -A`. First review every path with `git status --short` and `git diff`.

The V2 runtime scope is expected to include these paths:

```text
package.json
package-lock.json
CURRENT_SYSTEM.md
next.config.ts
content/prototypes/
content/projects/autonomous-driving-to-agent/
content/projects/rubik-studio/
src/app/page.tsx
src/app/zh/page.tsx
src/app/sitemap.ts
src/app/proto/curated-home-v2/
src/app/proto/fabrica-study/
src/app/zh/proto/curated-home-v2/
src/app/zh/proto/fabrica-study/
src/app/zh/work/autonomous-driving-to-agent/
src/components/WorkSection.tsx
src/components/case-study/AgentDimensionLab.tsx
src/components/case-study/AutonomousAgentResearchPage.tsx
src/components/case-study/ExpandableResearchImage.tsx
src/components/case-study/RubikStudioPage.tsx
audits/curated-home-pointer-motion-2026-09-09.md
audits/fabrica-reference-study-2026-09-10.md
```

Review separately before staging because they represent governance or parallel experiments rather
than required V2 runtime work:

```text
AGENTS.md
PRODUCT.md
DESIGN.md
governance/product/00_PORTFOLIO_OS.md
governance/product/00_DESIGN_SYSTEM_CONTRACT.md
src/app/proto/design-system/
src/design-system/
src/app/proto/pixel-motion/
public/prototypes/
scripts/render-showreel-opening.mjs
scripts/build-portfolio-showcase-pdf.py
open-next.config.ts
wrangler.jsonc
public/_headers
```

Some parallel files may ultimately be intentional, but they must not enter the V2 release merely
because they are present in the working tree.

## Suggested release sequence

Only run the mutating Git steps after explicit owner approval.

1. Inspect and verify:

   ```bash
   git status --short
   git diff --check
   npm run content:check
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

2. Start the site and complete owner review at both `http://localhost:3000/` and
   `http://localhost:3000/zh`. Review desktop and mobile, keyboard focus, reduced motion, every
   project link, the autonomous Study link, and project-to-Home navigation.

3. Stage only the approved V2 paths. Prefer explicit `git add <path...>` calls based on the list
   above, then inspect:

   ```bash
   git diff --cached --stat
   git diff --cached --check
   git diff --cached
   ```

4. If the staged diff contains only the accepted release, use a scoped commit such as:

   ```bash
   git commit -m "feat(portfolio): prepare v2 homepage and studies"
   ```

5. Push only with explicit owner authorization:

   ```bash
   git push origin main
   ```

6. The repository records that Vercel automatically deploys pushes to `main`. Watch the resulting
   production deployment, then smoke-test `https://www.deethin.site` and representative assets.

## Vercel decision

The expected V2 path is to keep the existing Vercel project. Do not create, move, relink, or
reconfigure a Vercel project merely for this release.

Known repository configuration:

- `vercel.json` uses framework `nextjs`, build command `npm run build`, install command
  `npm install`, and output directory `.next`.
- Production canonical domain: `https://www.deethin.site`.
- Apex `https://deethin.site` should redirect to the `www` canonical host.
- Required production environment value:
  `NEXT_PUBLIC_SITE_URL=https://www.deethin.site`.
- Previous releases deployed automatically from GitHub `main` through Vercel.

The repository does not contain `.vercel/project.json`, so the Vercel team/account name and exact
project ID are not locally verifiable. Before pushing, open Vercel and confirm that the existing
project connected to `DiqingWWW/portfolio_ai` has Production Branch `main`, the two domains above,
and the environment variable above. If those are still correct, Vercel settings need no changes;
the push should create the deployment automatically.

Do not include or activate the unverified Cloudflare/OpenNext path (`open-next.config.ts`,
`wrangler.jsonc`, `public/_headers`) in the Vercel release unless the owner separately approves a
hosting migration. `CURRENT_SYSTEM.md` still treats Cloudflare as unresolved and Vercel as the
working production path.

## Production smoke test

After Vercel reports a successful production deployment, verify:

```text
https://www.deethin.site/
https://www.deethin.site/zh
https://www.deethin.site/zh/work/autonomous-driving-to-agent
https://www.deethin.site/zh/work/rubik-studio
https://www.deethin.site/work/honda-hmi-design-system
https://www.deethin.site/zh/work/honda-hmi-design-system
https://www.deethin.site/work/lincoln-text-expression
https://www.deethin.site/zh/work/lincoln-text-expression
https://www.deethin.site/work/portfolio-operating-system
https://www.deethin.site/zh/work/portfolio-operating-system
https://www.deethin.site/experiments
https://www.deethin.site/robots.txt
https://www.deethin.site/sitemap.xml
```

Confirm HTTP 200, correct locale, no horizontal overflow, loaded images, correct Rubik and Study
links, correct project-to-Home behavior, canonical metadata, and the Rubik cover asset at
`/assets/images/rubik-studio/homepage-cover.png`. Record the deployed commit and deployment result
in `CURRENT_SYSTEM.md` and `CHANGELOG.md` only after production verification succeeds.

## Rollback

- Before commit: unstage paths without discarding working-tree files; do not use destructive reset.
- After commit but before push: create a follow-up fix or amend only with owner approval.
- After deployment: use Vercel's previous known-good V1.2 deployment for immediate rollback, or
  revert the V2 commit and push the revert after owner approval.
- The former V1 workspace homepage implementation remains inside `src/app/page.tsx` as
  `PortfolioHome`; the V2 route switch can be reversed without deleting V2 assets.
