# Sprint v1.2 — Chinese Content and Bilingual Publishing

Status: Local release candidate complete — publishing deferred by owner
Sprint window: 2026-08-20 to 2026-08-29
Owner capacity: about 3 hours/day
Daily rhythm: 1 hour in the afternoon, 2 hours in the evening
Release target: `1.2.0` after acceptance; no Git tag for this minor release

## Current checkpoint — 2026-08-25

- Owner review of the English and Chinese homepages and all four published projects is complete.
- Honda, Lincoln, Portfolio Operating System, and Rubik Studio render at matching English and
  `/zh` routes. Existing unprefixed English URLs remain unchanged.
- Rubik remains visual-only: English selects the `_EN` long image and Chinese selects `_CN`.
- Experiments remains one shared English-only collection at `/experiments`; a separate
  `/zh/experiments` route is intentionally deferred.
- Honda master, selection record, localized modules, mindmap source, and locale assets pass the
  parity check against the current reviewed master hash.
- Local route QA, lint, type checking, and production build pass. Lint retains two accepted
  pre-existing warnings and no errors.
- No V1.2 version bump, commit, push, deployment, or production smoke test has been authorized.

## 1. Sprint goal

Publish a coherent Chinese version of the portfolio and establish the Chinese-first bilingual
content path for future project updates:

```text
approved Chinese factual master
  → content:sync / case-study.selection.json
  → case-study.zh.ts
  → faithful English translation in case-study.en.ts
  → project-specific Chinese and English page composition
  → local owner review
  → release verification and deployment
```

The factual master remains the only factual authority. `case-study.zh.ts` becomes the primary
website-language selection layer for Chinese-authored updates, while `case-study.en.ts` remains
a localized translation rather than an independent manuscript. Neither localized module may
invent, strengthen, or silently correct project facts.

## 2. Sprint outcomes

By the end of the sprint:

- the site has an explicit, reviewable Chinese/English route and language-selection strategy;
- Honda, Lincoln, and Portfolio Operating System have approved Chinese web-content modules;
- their English modules are checked against the Chinese selection for proposition, register,
  evidence boundary, source ID, and content parity;
- Rubik Studio displays its existing `_CN` long-form visual on the Chinese route and `_EN` on
  the English route without inventing a new case-study narrative;
- global navigation, profile, metadata, project labels, and repeated public UI copy required by
  the Chinese routes come from the appropriate structured content source;
- language-paired assets obey `_CN` / `_EN` selection, while neutral assets remain shared;
- focused process improvements make the bilingual path repeatable without broad architecture
  cleanup;
- the accepted release passes mobile/desktop, keyboard, content, asset, lint, type-check, build,
  and production smoke review.

## 3. Scope and constraints

### In scope

- Chinese localized modules and Chinese project-page rendering for the four published projects.
- A minimal language switch and route/metadata behavior consistent with the current Next.js
  implementation, chosen only after reading the installed Next.js guide.
- Chinese-first authoring and English-translation checkpoints in the content workflow.
- Targeted fixes found while implementing localization: missing structured copy, text overflow,
  locale asset selection, duplicated labels, and translation parity checks.
- Release version update from `1.1.0` to `1.2.0` only after owner acceptance.

### Out of scope

- Rewriting the homepage or replacing the Workspace concept.
- Full Window accessibility/state architecture work.
- PDF portfolio work, new project research, new unverified metrics, or new Rubik narrative copy.
- A global visual redesign, broad dependency upgrade, CMS introduction, or automated translation.
- Cloudflare/OpenNext migration decisions beyond verifying that the accepted production path is
  not accidentally affected.

### Canonical boundaries touched

- One factual master per project remains Canonical.
- Project, tag, asset, case-study, global content, and executable configuration remain distinct.
- Localized modules remain JSX-free and retain source IDs.
- The homepage Workspace and the scrolling visual-evidence model remain unchanged.

## 4. Capacity model

The sprint has 30 theoretical hours. Commit about 23 hours to planned delivery and reserve about
7 hours inside Days 5, 8, and 10 for owner decisions, integration, regressions, and release work.

- Afternoon block (1 hour): factual decisions, translation review, visual review, or task setup.
- Evening block (2 hours): implementation, focused verification, and a written checkpoint.
- One day has one primary outcome. Unfinished work moves first into the next named buffer.
- Do not borrow from final QA to add optional polish.
- At 21:00, mark the day's checklist and identify the first action for the next session.

## 5. Ten-day schedule

### Day 1 — Bilingual architecture and content inventory

Date: 2026-08-20

Afternoon — 1 hour:

- [x] Confirm the public locale model, default language, URL behavior, language-switch placement,
  and whether the current English URLs must remain unchanged.
- [x] Inventory global copy and all four published projects: Chinese master readiness, existing
  `_CN` assets, missing translations, and route-specific risks. **Deferred to Day 2.**

Confirmed locale decision — 2026-08-20:

- English remains the default public language at the existing unprefixed URLs.
- All existing English URLs remain unchanged; no `/en` migration or redirect is introduced.
- Chinese routes use the `/zh` prefix, including `/zh/work/...` and `/zh/experiments`.
- Language selection is explicit; V1.2 does not automatically redirect from browser language,
  cookies, or client storage.
- The language switch remains globally visible in the top navigation and uses `中文 / EN`, not
  country flags.
- Switching locale preserves the matching page or project whenever that localized route exists.
- The intended routing structure uses an unprefixed English route group and a `/zh` Chinese root
  layout so each locale can emit the correct document language while preserving current URLs.
- Each localized page owns its canonical metadata and declares English/Chinese language alternates;
  the sitemap includes both locale versions.

Evening — 2 hours:

- [x] Read the relevant installed Next.js routing, internationalization, metadata, and image
  guides before choosing implementation details.
- [x] Record the smallest implementation design, acceptance checks, and per-file rollback path.
- [x] Create a content-parity checklist covering source IDs, evidence caveats, asset locale, and
  public TODO leakage.

Day 1 close — 2026-08-20:

- The locale decision and required Next.js documentation review are complete.
- The remaining inventory, implementation record, and parity checklist were not completed within
  the available time and move to Day 2 as the first priority.
- No implementation work should begin until this carryover reaches a reviewable checkpoint.

Acceptance: the owner can approve one bounded bilingual route/content approach before code work.

### Day 2 — Localization foundation and global content

Date: 2026-08-21

Capacity note: Day 1 carryover takes priority. Keep the total at about three hours. Start locale
implementation only if the carryover and owner copy review finish; otherwise move unfinished
implementation into the existing Day 5 buffer instead of extending the workday.

Afternoon — 1 hour:

- [x] Complete the Day 1 inventory of global copy and all four projects, including Chinese-master
  readiness, `_CN` and neutral assets, missing translations, and route-specific risks.
- [x] Create the content-parity checklist covering source IDs, evidence caveats, asset locale, and
  public TODO leakage.

Evening — first hour:

- [x] Record the smallest implementation design, acceptance checks, and per-file rollback path.
- [x] Approve Chinese profile, navigation, project labels, shared buttons, and metadata wording;
  return factual corrections to the authoritative source rather than patching JSX.

Evening — remaining time, only after the carryover checkpoint:

- [x] Implement the approved minimal locale foundation and language switch without changing the
  Workspace composition.
- [x] Connect required Chinese global copy to structured content and preserve existing English
  URLs or redirects according to the Day 1 decision.
- [x] Verify direct navigation, refresh, back navigation, keyboard access, and locale persistence.

Acceptance: both locales can reach the homepage and project routes through a stable navigation path.

Day 2 close — 2026-08-21:

- [x] Honda Chinese factual master completed by the owner.
- The global-copy and four-project inventory is still incomplete; Honda source readiness is the
  only completed part of that inventory.
- The parity checklist, implementation record, global-copy approval, locale foundation, content
  connection, and route verification remain unfinished and move forward.
- Keep future work within the existing daily capacity. Use Day 3 first for the highest-priority
  carryover and Day 5 for remaining implementation; do not compensate by extending the workday.

### Day 3 — Honda Chinese content module

Date: 2026-08-22

Capacity note: Day 2 carryover remains ahead of implementation. Honda's Chinese factual master is
complete, but its website selection, content parity, and route integration are not yet approved as
complete. Use Day 5 for any remaining locale-foundation work that does not fit today.

Afternoon — 1 hour:

- [x] Continue the unfinished global-copy and four-project inventory, parity checklist, and minimal
  implementation/rollback record until they reach a reviewable checkpoint.
- [x] Review Honda's approved Chinese master selection, proof priorities, evidence qualifications,
  and Chinese asset availability.

Evening — 2 hours:

- [x] Create `case-study.zh.ts` from approved source units with source IDs and no JSX.
- [x] Compare `case-study.en.ts` against the Chinese selection; fix translation drift only where
  the approved source supports it.
- [x] Wire Chinese content and `_CN`/neutral assets into Honda's existing project composition.

Acceptance: Honda has factual and structural parity across locales without weakening metric caveats.

### Day 4 — Honda responsive review and reusable locale fixes

Date: 2026-08-23

Afternoon — 1 hour:

- [x] Generate a local Chinese Honda preview from the owner-reviewed `case-study.zh.ts` working
  draft. Treat it as a presentation prototype, not a new factual authority.
- [x] Owner-review Honda at about 390 px mobile width and a representative desktop width, focusing
  on first-three-scroll comprehension, Chinese line breaks, diagrams, and captions.

Evening — 2 hours:

- [x] Fix Honda comprehension, typography, overflow, and locale-asset issues within local scope.
- [x] Classify every preview-driven content change as one of: factual/evidence, localized
  selection/wording, English translation, or TSX presentation. Do not backfill them indiscriminately.
- [x] Extract only locale behavior demonstrably required by another project; keep Honda narrative
  components project-specific.
- [x] Run focused lint/type checks for touched files.

Acceptance: Honda is the accepted bilingual pilot and establishes no universal case-study template.

### Day 5 — Buffer 1 and pipeline hardening

Date: 2026-08-24

Afternoon — 1 hour:

- [x] Resolve owner feedback or unfinished Honda work; if none remains, review the Chinese-first
  master → zh.ts → en.ts handoff for ambiguity.
- [x] Reconcile the accepted Chinese preview: send factual claims, metrics, provenance, and evidence
  boundaries to the factual master first; run `content:sync`; then update `case-study.zh.ts` from the
  refreshed selection record.

Evening — 2 hours:

- [x] Translate the accepted Chinese website selection into `case-study.en.ts`, preserving source
  IDs, proposition, professional register, specificity, and evidence qualifications.
- [x] Keep presentation-only decisions—layout, grouping, rhythm, interaction, and responsive
  treatment—in the project TSX; update the master's curation brief only when the accepted viewing
  goal, proof priority, inclusion level, visual intent, or visual format actually changed.
- [x] Run a final four-layer reconciliation check: factual master ↔ selection record ↔ Chinese TS ↔
  English TS, plus a separate TSX presentation review.
- [x] Add the smallest useful parity validation or checklist support exposed by Honda, without
  introducing automatic narrative translation.
- [x] Update `CURRENT_SYSTEM.md` or the project-content protocol only if the accepted implementation
  makes their Current workflow stale; proposed rules require explicit owner approval.
- [x] Preserve unused buffer rather than pulling in unrelated debt.

Acceptance: the pilot and its repeatable workflow are stable before expanding to other projects.

### Day 6 — Lincoln bilingual content and mobile composition

Date: 2026-08-25

Afternoon — 1 hour:

- [x] Review Lincoln's Chinese source units, terminology, paired phone images, and public evidence
  boundary.

Evening — 2 hours:

- [x] Create `case-study.zh.ts`, reconcile the English translation, and render both locales through
  Lincoln's existing project-specific composition.
- [x] Keep phone imagery compact and readable, including deliberate two-up mobile arrangements.
- [x] Keep the accepted brown/beige section continuity; do not introduce unrelated color changes.

Acceptance: Lincoln is bilingual, traceable, and readable on mobile without narrative redesign.

### Day 7 — Portfolio Operating System bilingual content

Date: 2026-08-26

Afternoon — 1 hour:

- [x] Review Chinese terminology for the operating model, AI-assisted workflow, architecture, and
  evidence limits.

Evening — 2 hours:

- [x] Create `case-study.zh.ts`, reconcile the English translation, and render both locales through
  the existing page composition.
- [x] Preserve the accepted light-blue content background and complete diagram overviews.
- [x] Check Chinese labels, diagrams, captions, long lines, and public TODO leakage.

Acceptance: Portfolio Operating System is bilingual without becoming process documentation or
changing its accepted visual system.

### Day 8 — Rubik, cross-project asset rules, and Buffer 2

Date: 2026-08-27

Afternoon — 1 hour:

- [x] Confirm Rubik remains visual-only and review all four projects for `_CN`, `_EN`, and neutral
  asset selection gaps.

Evening — 2 hours:

- [x] Render Rubik's existing responsive `_CN` visual on Chinese pages and `_EN` visual on English
  pages; add no unsupported narrative.
- [x] Fix cross-project locale-asset selection defects and verify that paired variants never appear
  together on one localized page.
- [x] Use remaining time for unfinished Day 6–7 work, not optional visual polish.

Acceptance: all four published projects follow the global localized-image rule.

### Day 9 — Integrated bilingual QA and owner review

Date: 2026-08-28

Afternoon — 1 hour:

- [x] Owner-review both locales from homepage to all project endings on mobile and desktop.
- [x] Classify findings as release blocker, accepted limitation, or post-sprint backlog.

Evening — 2 hours:

- [x] Verify content parity, source IDs, facts, evidence caveats, locale metadata, titles, links,
  image variants, alt text, captions, keyboard basics, focus, overflow, and reduced motion.
- [x] Run the repository-supported lint, type check, production build, and relevant focused tests
  after reviewing scripts and generated-asset behavior.
- [x] Produce a release-blocker list; no local integration blocker remains. Two existing lint
  warnings are accepted and remain outside this Sprint's release scope.

Acceptance: the owner has an auditable release candidate and exact verification evidence.

### Day 10 — Buffer 3, V1.2 release, and production smoke test

Date: 2026-08-29

Afternoon — 1 hour:

- [ ] Fix only accepted release blockers and perform final diff review, including untracked PDF,
  output, temporary, and deployment-experiment files.
- [ ] Obtain owner acceptance before changing the package version or publishing.

Evening — up to 2 hours:

- [ ] Update the package version to `1.2.0` after acceptance.
- [ ] Commit, push, and deploy only when explicitly authorized; do not use `git add .`.
- [ ] Smoke-test both locales, all four projects, responsive assets, direct URLs, metadata, locale
  switching, redirects, and rollback path on production.
- [ ] Record the deployed commit, production URL, known limitations, and next backlog.

Acceptance: V1.2 is deployed and smoke-tested, or a release blocker is documented without making
an unverified release claim.

## 6. Release acceptance criteria

- [x] The approved Chinese master remains the only factual authority for Chinese-authored updates.
- [x] Chinese website selection flows through `case-study.zh.ts`; English is a faithful localized
  expression in `case-study.en.ts`.
- [x] Honda, Lincoln, Portfolio Operating System, and Rubik have correct locale behavior.
- [x] No localized page mixes `_CN` and `_EN` variants of the same asset.
- [x] No public page exposes internal TODO, truth-status, provenance, or asset-management notes.
- [x] Existing English URLs and search/index behavior follow the approved Day 1 decision.
- [x] Mobile and desktop layouts preserve the visual-content floor and complete diagram overviews.
- [x] Language controls are semantic, keyboard reachable, visibly focused, and understandable.
- [x] Lint has no new errors; type checking and production build pass.
- [ ] Owner acceptance occurs before version bump, commit, push, or deployment.
- [ ] Production smoke testing covers both locales and all published project routes.

## 7. Rollback and change discipline

- Keep locale foundation, each project's localized content, and release wiring separable in the
  diff and in commits if commits are later authorized.
- Preserve current English pages until their bilingual replacement passes owner review.
- Roll back one project's locale wiring independently if it regresses without removing accepted
  content from other projects.
- Do not stage untracked PDF, `output/`, `tmp/`, or deployment-experiment files by default.
- Use the currently deployed V1.1 commit as the release rollback baseline; record the exact commit
  immediately before an authorized V1.2 deployment.

## 8. Deferred backlog

- Full Window accessibility/state architecture work.
- Automated visual regression and broader interaction tests.
- PDF portfolio pagination and video/GIF frame treatment.
- Cloudflare/OpenNext production-authority decision.
- New project research, missing evidence collection, or invented Rubik narrative content.
- Global design-token promotion or broad visual redesign.
