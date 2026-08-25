# System Audit — V1.1 Budget-Aware Improvement Pass

## Scope and baseline

- Audit date: 2026-08-19
- Scope: current Next.js application, representative desktop/mobile layouts, information architecture, components, styling, accessibility, SEO, and obvious performance risks.
- Constraints: preserve the experiential workspace, evidence-layer routes, content pipeline, and incumbent visual language; do not begin broad architecture or token migrations.
- Working tree: unrelated untracked bilingual-content, deployment, deliverable, output, and temporary files were present and intentionally left untouched.

## System assessment

The implementation is a coherent, product-specific portfolio system rather than a generic template. The experiential workspace and conventional selected-work layer serve distinct, complementary navigation needs. Dedicated case-study compositions preserve project-specific evidence while the structured content packages keep facts separate from JSX.

The main engineering concentration remains `src/app/page.tsx`: it owns content lookup, desktop windows, mobile sheets, responsive state, and focus orchestration. This is maintainable at the current scale but increases regression risk for future workspace changes. The visual system is consistent where it matters—canvas, typography, surfaces, and interaction metaphor—while deliberate project-specific color and layout variation should not be normalized.

## Audit health score

| Dimension | Score | Key finding |
|---|---:|---|
| Accessibility | 3/4 | Strong semantic improvement is present; the mobile modal needed focus containment and background isolation. |
| Performance | 2/4 | The homepage client boundary and duplicated generated assets remain the largest costs; images are otherwise sized/lazy-loaded in primary content. |
| Responsive design | 3/4 | No horizontal overflow at 1440×900 or 390×844; mobile has a purpose-built composition and 44px primary targets. |
| Theming | 2/4 | Core workspace tokens are coherent, but many local values remain inline by design and should only be consolidated from proven repetition. |
| Implementation integrity | 4/4 | The detector's sole grid advisory is an intentional canvas substrate required by the workspace concept. |
| **Total** | **14/20 — Good** | Address focused accessibility/performance debt without redesigning the system. |

## Prioritized findings

### P0 — completed in this pass

1. **Mobile modal focus could escape into obscured content**
   - Area: `src/app/page.tsx`
   - Impact: keyboard users could tab behind the open bottom sheet, losing context.
   - Change: contain Tab/Shift+Tab within the dialog, mark the background inert and hidden from assistive technology while open, and preserve focus restoration on close.
   - Standard: WCAG 2.4.3 Focus Order; modal-dialog keyboard behavior.

2. **Mobile sheet ignored reduced-motion preference**
   - Area: `src/app/page.tsx`
   - Impact: the large spring transition remained active for motion-sensitive users.
   - Change: use the same reduced-motion policy already present in desktop windows.

3. **Avoidable lint warning in the asset pipeline**
   - Area: `scripts/copy-project-assets.mjs`
   - Impact: warning noise makes new regressions harder to spot.
   - Change: remove the unused `basename` import.

### P1 — evaluated, deliberately deferred

No P1 refactor was started. The remaining candidates either overlap broader architecture or require more extensive visual/performance validation than is appropriate for this bounded pass.

### P2 — next session

1. **Narrow the homepage client/orchestration boundary**
   - Area: `src/app/page.tsx`, workspace components, `src/lib/content.ts`
   - Problem: most homepage content and behavior share one client module graph.
   - Recommendation: first profile the production bundle, then extract only proven server-safe/static composition while preserving the workspace behavior.
   - Scope: Large
   - Risks: hydration boundaries, Motion behavior, and duplicated desktop/mobile composition. Requires an approved migration slice and rollback route.

2. **Validate and optimize the heaviest published media**
   - Area: `content/projects/honda-hmi-design-system`, generated `public/assets/images`, responsive image components.
   - Problem: several GIF/PNG assets are 3–10 MB and source media is duplicated into `public` during build.
   - Recommendation: audit actual route transfer sizes and browser compatibility, then create approved WebP/AVIF/video derivatives without replacing factual source assets.
   - Scope: Medium
   - Risks: animation fidelity, localization pairs, content-sync ownership, and the destructive generated-asset prebuild step.

3. **Remove the remaining raw hover-image warning only with verified intrinsic sizing**
   - Area: `src/components/Hover/HoverImage.tsx` and its homepage call sites.
   - Problem: the wrapper uses raw `<img>` and has no explicit intrinsic dimensions.
   - Recommendation: migrate to `next/image` with accurate dimensions and `sizes`, verifying every hover composition for crop/layout parity.
   - Scope: Small
   - Risks: subtle popup aspect-ratio or static-export behavior changes.

## Deliberately unchanged

- The canvas grid is intentional product context, not a detector defect.
- Project-specific layouts, colors, motion, and exact local spacing remain local rather than being promoted into global tokens.
- Case-study heading composition follows the documented owner-approved hierarchy and was not mechanically normalized.
- The dedicated case-study routes were not replaced with a universal renderer.
- The desktop multi-window model, selected-work section, content pipeline, route structure, and deployment configuration were preserved.
- Unrelated untracked files were not edited or deleted.

## Verification evidence

- `npm run lint`: 0 errors; two warnings—the deliberately deferred hover image and an unrelated untracked PDF helper.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed after the sandboxed first attempt could not reach Google Fonts; all public routes were statically generated.
- Visual audit: homepage at 1440×900 and 390×844; no horizontal overflow; mobile sheet inspected open.
- Keyboard confirmation: Shift+Tab from the first dialog control wrapped to the last link, Tab from the last link wrapped to Close, background content was inert/hidden while open, and focus returned to the Design System opener on close.
- Post-change mechanical detector on `src/app/page.tsx`: no findings. The baseline scan's sole grid advisory was verified as an intentional canvas substrate.

## Continuation prompt

Continue the V1.1 portfolio improvement pass from `audits/system-audit-v1.1-2026-08-19.md`. Do not repeat the system audit or redo the completed mobile modal accessibility/reduced-motion work in `src/app/page.tsx`, and do not touch unrelated untracked bilingual-content, deployment, deliverable, output, or temporary files. Highest priority is a scoped media-performance audit of the large Honda GIF/PNG assets and the generated `public/assets/images` duplication; measure route transfer impact before changing formats. If time remains, migrate `src/components/Hover/HoverImage.tsx` to `next/image` only after confirming intrinsic dimensions and visual parity at all hover call sites. Do not begin the large homepage client-boundary refactor without a separately approved migration slice. After changes, run the detector on changed UI targets, `npm run lint`, `npx tsc --noEmit`, `npm run build`, and one bounded desktop/mobile browser verification pass.
