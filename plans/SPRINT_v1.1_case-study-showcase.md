# Sprint v1.1 — Case Study Showcase

Status: Complete — V1.1 deployed and smoke-tested
Sprint window: 2026-08-05 to 2026-08-18
Owner capacity: no more than 2 hours/day
Planning assumption: 90-minute primary sessions, with explicit catch-up and recovery time

## 1. Sprint goal

Establish a durable, lightweight case-study workflow through Honda first: improve the
single factual master, select its website material deliberately, and turn it into a concise,
visual, evidence-led scrolling story. Then apply only the most valuable point fixes to
Lincoln and Portfolio Operating System.

Mobile is the lead review surface. A successful page should not ask a visitor to cross
multiple full screens of uninterrupted prose before seeing visual evidence, a decision, or
an outcome.

## 2. Sprint outcome

By the end of the sprint:

- Honda has one reviewed factual master with an explicit viewing goal, proof priorities,
  website-selection markers, and a non-destructive reconciliation with the original pitch
  deck; its website is rebuilt as a project-specific scrolling experience;
- Honda's opening viewport and first three mobile scrolls communicate identity, strongest
  result, personal contribution, and meaningful visual proof;
- Lincoln and Portfolio Operating System receive only their highest-value text-density,
  mobile-media, and comprehension fixes unless Honda finishes ahead of estimate;
- all public English copy remains traceable to the approved factual master; the website
  does not receive another Markdown source-of-truth;
- Rubik Studio remains a truthful visual-only project until approved source content exists;
- production-blocking or high-impact site-wide bugs discovered during the sprint are fixed
  or explicitly recorded;
- desktop and mobile project routes pass focused content, responsive, asset, and navigation
  review before deployment.

## 3. Capacity and buffer model

Maximum theoretical capacity across 14 days is 28 hours. This plan deliberately commits
only about 16 hours to scoped feature work and reserves about 5 hours for integration,
unexpected bugs, slower owner decisions, and deployment. The remaining time is recovery
capacity, not hidden scope.

Rules:

- One day contains one primary outcome; unfinished work moves into the next buffer block.
- A 90-minute block ends with a usable checkpoint and a written next action.
- Do not pull optional work forward merely because one task finishes early.
- If a project exceeds its allocated implementation blocks, reduce presentation scope
  before borrowing from final QA and deployment time.
- New factual research, missing metrics, bilingual launch, and new project content go to the
  backlog unless they block truthful presentation.

## Completion snapshot — 2026-08-08

- [x] Honda master reconciliation, Website curation brief, approved source selection, and
  localized English content module.
- [x] Lincoln and Portfolio Operating System migrated to the same source-selection and
  localized-content pipeline.
- [x] All three text-led project routes use dedicated scrolling page compositions; basic owner
  visual acceptance is complete.
- [x] Honda pilot accepted; the project-content workflow is now documented in `AGENTS.md` and
  `governance/project-content/00_PROJECT_CONTENT_PIPELINE.md`.
- [x] Content sync, lint, and production build completed successfully.
- [x] Review release diff and exclude the future Cloudflare/OpenNext files from the Vercel
  release scope.
- [x] Remove the untracked editor swap file; it is not part of the release.
- [x] Stage the accepted V1.1 scope, commit, and push `main`.
- [x] Deploy the accepted commit and complete production desktop/mobile smoke testing on
  `https://deethin.site`.

## 4. Experience principles for this sprint

### Pitch-deck-like, not presentation theatre

- Lead with the strongest truthful outcome or artifact.
- Prefer one clear idea per viewport or visual cluster.
- Convert descriptive section titles into takeaway headlines where the evidence supports it.
- Make role, contribution, decision, and result visibly distinct.
- Keep deeper methodological context available, but do not make it the only reading path.
- Do not invent metrics, outcomes, quotes, client approval, or implementation depth.
- Keep the website as a natural scrolling page. Pitch-deck thinking informs hierarchy,
  visual cadence, and emphasis; it does not require slide navigation or a fixed section
  template.

### Mobile-first composition

- Review at approximately 390 px width before accepting desktop polish.
- Avoid more than roughly one mobile screen of uninterrupted body copy.
- Introduce a visual, evidence card, key decision, result, or navigation cue between dense
  text passages.
- Keep headings, captions, tables, and image pairs readable without horizontal scrolling.
- Use two-up phone imagery only when both images remain legible; otherwise use a deliberate
  sequence, swipe pattern, or single-image focus.
- Preserve natural image ratios unless an approved crop improves comprehension.

### Project-specific storytelling

- Honda should demonstrate system scale, visual capability, reusable rules, and evidence of
  adaptation.
- Lincoln should demonstrate product judgment through compact problem–decision–result
  sequences paired with mobile UI evidence.
- Portfolio Operating System should show iteration, struggle, system decisions, and the
  resulting operating model without reading like process documentation.
- Rubik Studio should foreground its approved long-form visual and make no unsupported
  narrative claims.

### One factual master, deliberate website curation

- Each project keeps one factual case-study master. It may be improved when the narrative
  itself is weak, but changes must preserve provenance and evidence boundaries.
- The master records a viewing goal, proof priorities, website inclusion (`core`,
  `supporting`, `optional`, or `appendix`), and intended visual treatment for important
  blocks.
- The English website module is a localized, selected expression of that master, not a
  second factual manuscript and not an automatic rewrite target.
- A project-specific React page chooses how a fact is seen: image-with-copy, result card,
  comparison, process map, or long-form visual. It must not store untraceable editorial
  claims in JSX.
- Generated diagrams or metrics cards may clarify verified evidence, but cannot strengthen,
  fabricate, or obscure the evidence boundary of the underlying claim.

## 5. Scope

### In scope

- Honda master reconciliation and its project-specific scrolling route.
- Targeted, project-specific fixes for Lincoln and Portfolio Operating System after the
  Honda pilot reaches an owner-review checkpoint.
- Mobile-first typography, spacing, image sizing/grouping, captions, summaries, and rhythm.
- Progressive disclosure for important but secondary detail where appropriate.
- Shared primitives only after repetition is demonstrated across at least two projects.
- High-impact bugs involving broken assets, scrolling, navigation, overlays, overflow,
  accessibility, or production-only behavior.
- Focused performance improvements if project media creates an obvious usability problem.
- Production smoke testing and documentation of the deployed commit.

### Out of scope

- Rewriting the homepage concept or replacing the Window System.
- A universal case-study section schema imposed on all projects.
- New unverified content, outcome research, or fabricated visual evidence.
- Chinese-site implementation.
- CMS, analytics platform, broad test-suite introduction, or Window architecture migration.
- Full global design-system redesign.
- New experiments unrelated to the four published projects.

## 6. Fourteen-day schedule

### Pre-sprint work already completed — Honda source map

- The Honda factual master has received a working website-curation brief, major-block
  markers, a non-destructive pitch-deck reconciliation queue, and the missing five-step
  overview.
- This is preparation only: it does not yet authorize deletion, source synchronization,
  English website-copy changes, or React implementation.

### Day 1 — Honda owner content decision

Date: 2026-08-05
Timebox: 90 minutes

- [x] Review the Honda master’s reconciliation queue and decide, for each candidate overlap, whether to retain, merge, defer to appendix, or remove after confirmation.
- [x] Confirm the webpage’s opening promise, three proof priorities, and which media may be used as hero, outcome, system-map, and supporting evidence.
- [x] Verify whether the pitch-deck-only assets are approved for public use before they enter the asset pipeline.

Acceptance: Honda has an owner-approved content selection; no source material is deleted or
promoted into a public claim without that decision.

### Day 2 — Honda master consolidation and source sync

Date: 2026-08-06
Timebox: 90 minutes

- [ ] Apply only the owner-approved master edits: merge or remove true duplicate expressions, preserve evidence caveats, and retain rejected material in appendix when useful.
- [ ] Run the existing source-sync process only after the master is approved, then verify its generated repository copy and asset mapping.
- [ ] Record any unresolved public-asset or metric question as a TODO rather than blocking the rest of the visual page.

Acceptance: the factual master and its generated repository copy agree; no accidental asset
or evidence loss is introduced.

### Day 3 — Honda English website content selection

Date: 2026-08-07
Timebox: 90 minutes

- Translate and select the approved `core` and `supporting` material into the English website
  content module, preserving source IDs and all material qualifications.
- Keep internal TODOs, evidence-collection notes, and interview prompts out of the public
  reading flow.
- Define only the visual units actually needed: hero/outcome, proof metrics, system map,
  decision-with-media, adaptation evidence, and closing reflection.
- Confirm Honda's first component composition in `src/components/case-study/`:
  `HeroOutcome`, `DecisionBlock`, `CapabilityMap`, and `ResultDashboard`.

Acceptance: Honda has an approved narrative map and English content selection before React
composition begins.

### Day 4 — Honda scrolling page: outcome and system proof

Date: 2026-08-08
Timebox: 90 minutes

- Implement Honda's approved semantic narrative responsibilities in
  `HondaCaseStudyPage.tsx`. Extract components under `src/components/case-study/` only when a
  stable cross-project contract is demonstrated; do not create a generic all-project renderer.
- Replace the generic renderer only for Honda; do not refactor other projects in the same
  change.
- Ensure English/global localized-image selection is correct before visual polish.

### Day 5 — Honda scrolling page: decisions, adaptation, and mobile rhythm

Date: 2026-08-09
Timebox: 90 minutes

- Add the approved decision, system-map, and adaptation evidence; use generated visual
  summaries only where the underlying data is verified.
- Resolve mobile text density, image scale, pairing, captions, and transitions before desktop
  refinement.
- Keep Honda-specific narrative components local; do not turn them into a universal template.

Acceptance: Honda communicates its strongest evidence within the first three mobile scrolls.

### Day 6 — Buffer 1 and Honda owner review

Date: 2026-08-10
Timebox: up to 90 minutes

- Finish work that exceeded the Honda estimate.
- Address only review findings that affect story comprehension or mobile usability.
- If the Honda pilot is accepted, update `AGENTS.md` with the approved operating rules and
  schedule the same master-header convention for future projects. Do not do this promotion
  if the owner wants another Honda iteration.
- If no catch-up is needed, stop early and preserve the buffer.

### Day 7 — Lincoln targeted mobile and media fixes

Date: 2026-08-11
Timebox: 90 minutes

- Apply only the confirmed high-value fixes: smaller phone imagery, meaningful two-up image
  groups, and shorter copy near the relevant visual evidence.
- Do not rewrite Lincoln’s master or narrative structure during this sprint.
- If Honda's component pilot is accepted, compose Lincoln from `HeroOutcome`, `BeforeAfter`,
  and `InteractionDemo` rather than copying Honda's system-story layout.

### Day 8 — Buffer 2 and Lincoln mobile review

Date: 2026-08-12
Timebox: up to 90 minutes

- Complete Lincoln overflow work and verify its full mobile route.
- Check tables, validation examples, paired images, and captions at narrow widths.
- Use remaining time only for a P0 or sprint-critical defect.

### Day 9 — Portfolio Operating System targeted fixes

Date: 2026-08-13
Timebox: 90 minutes

- Apply only confirmed readability, visual-rhythm, and public-TODO-leakage fixes.
- Keep deeper content-master restructuring as a future project-specific task unless Honda’s
  pilot finishes ahead of estimate.

### Day 10 — Cross-project visual and content integrity check

Date: 2026-08-14
Timebox: 90 minutes

- Check that each public claim can be traced to a factual master and that TODO/internal
  evidence notes do not leak into public reading flow.
- Resolve only cross-project issues that block content comprehension or mobile media use.

### Day 11 — Site-wide P0 / high-impact bug block

Date: 2026-08-15
Timebox: 90 minutes

- Fix only high-impact problems confirmed during project work: production assets, scrolling,
  mobile overlay behavior, navigation, overflow, or accessibility blockers.
- Keep Rubik Studio unchanged unless its existing visual-only route has one of those defects.
- Check project headers, back navigation, metadata, ending states, and media treatment across
  all four routes.

### Day 12 — Buffer 3 and production-route review

Date: 2026-08-16
Timebox: up to 90 minutes

- Use the block first for unfinished project work.
- Otherwise verify the deployed-route risks most likely to regress: generated project assets,
  localized-image selection, mobile windows/overlays, project navigation, and long-page
  scrolling.
- Move visual polish and architecture debt to the backlog.

### Day 13 — Integrated QA and owner review

Date: 2026-08-17
Timebox: 90 minutes

- Review all routes at mobile and representative desktop widths.
- Check story comprehension, image loading, alt text/captions, keyboard basics, scroll,
  external links, reduced motion, and console errors.
- Run lint, type checking, production build, and asset inventory validation.
- Produce a release-blocker list only; defer optional refinements.

### Day 14 — Buffer 4, release, and smoke test

Date: 2026-08-18
Timebox: up to 2 hours

- Fix remaining release blockers within the timebox.
- Deploy the approved commit.
- Smoke-test homepage-to-project paths and all project media on production mobile and
  desktop states.
- Record the deployed commit, URL, known limitations, and rollback target.

## 7. Acceptance criteria

- [ ] Each priority route has a distinct, approved story hierarchy.
- [ ] Honda's factual master records a viewing goal, proof priorities, website inclusion,
  visual intent, and evidence boundaries for its core material.
- [ ] Honda's page demonstrates the component-composition pilot without creating a universal
  case-study renderer; the owner decides whether to promote the protocol into `AGENTS.md`.
- [ ] Honda's original pitch deck has been reconciled without silent content deletion or
  escalation of unverified claims.
- [ ] Each route leads with a result, capability, or strong visual rather than background
  exposition.
- [ ] No route presents repeated full mobile screens of uninterrupted prose without a
  deliberate reason.
- [ ] All approved images remain visible and are assigned a narrative role.
- [ ] No unverified fact or asset is introduced.
- [ ] Mobile layouts are accepted before desktop-only polish.
- [ ] P0 production bugs are closed or explicitly accepted.
- [ ] Lint has no new errors, type checking passes, and production build passes.
- [ ] Production media and primary navigation pass a final smoke test.

## 8. Decision checkpoints

The owner reviews and approves:

1. the Day 1 Honda content-selection decision;
2. Honda's semantic-component composition before implementation, and the decision whether it
   can become a protocol pilot;
3. the integrated Day 13 release candidate;
4. any proposed global token or shared-component change that extends beyond proven local
   repetition.

## 9. Rollback and change discipline

- Keep each project's presentation work in a separable commit where practical.
- Modify a factual master only through deliberate narrative or evidence work; never distort,
  delete, or invent source content merely to make a layout easier.
- Preserve source assets and the global `_EN` / `_CN` / language-neutral media rule.
- Keep accepted project pages available until each replacement passes owner review.
- Revert one project's presentation independently if it regresses the release.
- Use the V1 deployment/tag as the sprint rollback baseline.

## 10. Deferred backlog

- Missing evidence, metrics, provenance, and content-lock decisions per project.
- Chinese project routes and `_CN` asset rendering.
- A mature version archive with public links to historical deployments.
- Full Window accessibility/state architecture work.
- Automated visual regression and broader interaction tests.
- Global design-token promotion after project-specific patterns stabilize.
