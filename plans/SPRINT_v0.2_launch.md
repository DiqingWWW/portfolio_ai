# Sprint v0.2 — Real Content Launch

Status: In progress
Sprint window: 2026-08-01 to 2026-08-04
Owner capacity: 4 hours on August 1; 2 hours on August 2; approximately 4 hours on
August 3–4; at least 2 hours/day afterward

## 1. Sprint goal

Within four tightly scoped working blocks, replace the most visible unvalidated/generated portfolio
content with authentic, owner-reviewed material; make one coherent visual-unification pass;
verify the deployable experience; and publish the website.

This is a launch sprint, not a complete content-system migration, full redesign, final
content lock, or final portfolio release. Speed comes from a usable framework, explicit
launch scope, and honest placeholders—not fabricated completeness. Content may continue
to mature after launch.

## 2. Release definition

The sprint succeeds when:

- the homepage identity and primary claims are owner-validated;
- every visible Window is either populated with real reviewed content or clearly labeled as
  a truthful work-in-progress/demo rather than presented as validated professional work;
- at least the strongest real projects are represented with accurate title, role, context,
  summary, contribution, media, and outcome/learning information available at launch;
- generated employers, projects, metrics, biographies, and experience claims are removed or
  replaced before deployment;
- typography, spacing, surface treatment, color usage, imagery, and Window presentation feel
  intentionally related across the launch path;
- mobile and desktop critical paths work;
- lint and production build pass, or any non-blocking exception is explicitly approved;
- the selected production deployment is live and receives a final smoke test.

## 3. Scope guardrails

### In scope

- Content authenticity audit of all public-facing text.
- Fast replacement of profile, experience, capability, project, and Window content.
- Selection and preparation of launch-critical real assets.
- Layout adjustments required by real content.
- One visual-unification pass using the current workspace direction.
- Critical accessibility and interaction defects that block launch.
- Metadata, social preview, sitemap, contact/CV affordance, and deployment checks required
  for a credible public launch.
- Deployment and post-deploy smoke testing.

### Deferred unless launch-blocking

- Complete JSON Schema redesign.
- Full Window reducer/client-boundary migration.
- Comprehensive project-route system.
- Complete case studies for every project.
- Mature global token system.
- Broad automated test suite.
- CMS integration.
- New animation concepts unrelated to real-content fit.
- Large dependency or deployment-platform migration.

## 4. Content truth policy

Every public item is classified during Day 1:

| Status | Meaning | Launch treatment |
|---|---|---|
| Verified | Owner confirms it is accurate and publishable | Publish |
| Needs edit | Real source exists but wording/media needs work | Fix during sprint if launch-critical |
| Unverified/generated | Not confirmed as real portfolio evidence | Remove, replace, or label honestly |
| Confidential | Real but not safe to publish as-is | Redact with owner approval or omit |
| Missing | Needed for understanding but unavailable | Use a truthful minimal placeholder or defer surface |

AI must not fill missing facts by inference.

## 5. Rapid launch schedule

### Day 1 — Truth, selection, and real-project intake

Date: Saturday, 2026-08-01
Planned focus: 4 hours

#### Sprint planning and inventory — 30 minutes

- Confirm production target and deployment access.
- Select the launch audience and the minimum credible launch story.
- Choose the 2–4 strongest real projects for priority treatment.
- Create one visible-content inventory covering landing page and all Windows.

#### Content authenticity audit — 75 minutes

- Mark profile, role, biography, skills, employment/experience, metrics, project names,
  project descriptions, demo claims, and GitHub/CV/contact information using the truth policy.
- Identify anything generated that could be mistaken for a real professional claim.
- Decide remove, replace, redact, demo-label, or defer.

#### Real project intake — 90 minutes

For each priority project, collect the minimum launch packet:

- title and one-sentence summary;
- project context and problem;
- personal role and responsibilities;
- team/collaboration context where publishable;
- key decisions or process;
- outcome, learning, or honest limitation;
- 1 cover and 2–5 supporting assets where available;
- confidentiality and attribution notes.

#### Initial content-to-surface mapping — 45 minutes

- Decide which real content belongs in About, Design System, HMI, AI, and Projects Windows.
- Separate capability demos from real project evidence.
- Identify Windows that should become concise previews rather than pseudo-case studies.
- Draft the content order and asset list for confirmation on Day 2.

#### Day 1 acceptance

- No launch-critical public claim remains unclassified.
- Priority projects and assets are selected.
- Every Window has a proposed truthful content treatment ready for Day 2 confirmation.
- Missing information is visible as a blocker rather than silently invented.

### Day 2 — Confirm launch mapping and begin critical replacement

Date: Sunday, 2026-08-02
Planned focus: 2 hours

#### Confirm launch content and Window mapping — 30 minutes

- Confirm which real projects and capability evidence belong in each Window.
- Confirm what is removed, replaced, redacted, demo-labeled, or deferred.
- Confirm the launch-critical content and asset order for this iteration.

#### Finalize launch-critical copy and assets — 45 minutes

- Resolve the highest-impact missing facts and wording.
- Prepare the minimum viable real assets for the existing pipeline.
- Keep unresolved claims out of the public launch scope.

#### Begin critical content replacement — 45 minutes

- Update profile, experience, navigation, project records, Window copy, and visible metadata.
- Remove or clearly distinguish generated demo narratives.
- Preserve Project/Tag separation and stable project identities.
- Start with homepage identity and the most visible Window/project surfaces.

#### Day 2 acceptance

- Launch-critical content and Window mapping are confirmed for this iteration.
- Homepage identity and the highest-priority content replacement have started.
- All remaining replacement work is explicit and ordered for Day 3.
- No unverified fact is introduced to save time.

### Day 3 — Complete replacement and unify the visual system

Date: Monday, 2026-08-03
Planned focus: 4 hours

#### Complete launch-critical replacement — 90 minutes

- Finish profile, project, Window, navigation, metadata, and real-asset changes.
- Remove or clearly distinguish remaining generated professional narratives.
- Preserve content relationships and use the existing asset pipeline.

#### Real-content layout pass — 60 minutes

- Reflow headings, summaries, metadata, cards, lists, and asset ratios around actual content.
- Check overflow and hierarchy in every Window.
- Ensure mobile does not merely inherit broken desktop composition.

#### Visual unification pass — 75 minutes

- Normalize the launch path's typography hierarchy, spacing rhythm, surface/border treatment,
  accent usage, image presentation, and interaction feedback.
- Prefer current workspace tokens and proven local patterns.
- Avoid a whole-site replacement or new speculative component library.
- Record any exact visual foundation proposed for later canonical adoption.

#### Focused review and handoff to QA — 15 minutes

- Review all launch surfaces once at representative desktop and mobile sizes.
- Create the Day 4 launch-blocker list; move polish into the post-launch backlog.

#### Day 3 acceptance

- Priority public content is real and owner-reviewed.
- Generated professional claims are absent or honestly labeled.
- Critical desktop and mobile surfaces contain the new content without clipping or hierarchy
  failure.
- Visual changes form one coherent pass and remain separable from deferred architecture work.

### Day 4 — QA, deploy, and stabilize

Date: Tuesday, 2026-08-04
Planned focus: 4 hours

#### Content and credibility review — 45 minutes

- Proofread names, roles, dates, claims, links, alt text, contact, CV, and metadata.
- Review confidentiality and attribution one final time.
- Confirm demo content cannot be confused with shipped client work.

#### Critical-path QA — 75 minutes

- Run lint, type checking where available, and production build.
- Verify desktop launchers, open/focus/close, project folder, mobile sheets, scrolling,
  keyboard basics, reduced-motion impact where available, images, and external links.
- Check metadata, favicon, social image, sitemap/robots, and not-found behavior relevant to
  the deployed surface.

#### Fix launch blockers — 60 minutes

- Fix only issues that affect truthfulness, comprehension, navigation, accessibility,
  responsive usability, broken assets, build, or deployment.
- Move non-blocking polish and architecture work to the post-launch backlog.

#### Deploy and live smoke test — 60 minutes

- Deploy through the confirmed canonical path.
- Verify the production URL on desktop and mobile-sized viewports.
- Check primary content, Windows, assets, links, metadata, and console/network failures.
- Record the deployed commit and known limitations.

#### Day 4 acceptance

- Supported validation commands pass or exceptions are explicitly accepted.
- Production deployment succeeds.
- Live critical paths pass smoke testing.
- Known limitations and rollback target are documented.

## 6. Definition of done

- [x] Homepage public identity is real and approved.
- [x] All visible experience/employer/client claims are real, removed, or explicitly marked.
- [x] Priority projects use authentic content and assets.
- [x] Every Window has a truthful content purpose.
- [ ] Desktop and mobile launch paths are visually coherent.
- [x] No broken primary image or link.
- [x] Lint passes (two existing non-blocking warnings remain).
- [x] Type checking passes when available.
- [x] Production build passes.
- [ ] Production deployment and smoke test pass.
- [ ] Deployment commit, URL, limitations, and rollback reference are recorded.

## 7. Post-launch backlog by importance

### P0 — First 48 hours after launch

- Fix production-only errors, broken links/assets, serious mobile overflow, inaccessible
  critical controls, or misleading content.
- Confirm domain, HTTPS, metadata/social preview, and deployment monitoring.
- Capture feedback without immediately redesigning around single opinions.

### P1 — Content credibility and project depth

- Define and complete a future content-lock review after the initial real-content framework
  has been tested in the live website.
- Complete real case-study narratives for priority projects.
- Add outcome provenance, role clarity, confidentiality/redaction rules, captions, and alt
  text.
- Decide and pilot one durable project-detail format or route.
- Remove remaining generated filler and truthfully separate experiments from professional
  work.

### P1 — Usability and accessibility

- Complete semantic Window/folder controls, Escape behavior, focus restoration, drag
  recovery, one-mobile-sheet policy, and reduced motion.
- Test keyboard and touch paths with real content lengths.

### P2 — Engineering health

- Introduce typed Window identity/configuration and deterministic state management.
- Reduce desktop/mobile content dispatch duplication.
- Narrow client boundaries where measured value justifies it.
- Add content integrity validation based on approved real fields.
- Clean up timers, image handling, unused configuration, and documentation drift.

### P2 — Visual-system maturation

- Evaluate which V0.2 foundations become semantic tokens.
- Formalize typography, spacing, surface, image, and motion vocabularies only after the
  real-content layouts stabilize.
- Use parallel visual explorations for significant alternatives.

### P3 — Growth

- Expand remaining case studies.
- Add `/work` or tag browsing only when research/project volume justifies it.
- Add analytics/privacy decisions, performance budgets, visual regression, and CMS only
  after the authoring model stabilizes.

## 8. Daily post-launch cadence

Available capacity: at least 2 hours/day.

Recommended routine:

- 10 minutes: review production issues and current sprint goal.
- 80 minutes: one P0/P1 outcome-focused work block.
- 20 minutes: verification and responsive/content review.
- 10 minutes: update plan status, decisions, blockers, and next action.

Use one weekly planning/review block to reprioritize the backlog. Do not create a new plan
version for ordinary progress updates.

## 9. Rollback strategy

- Record the last known-good deployed commit before launch.
- Keep content replacement, visual unification, and deployment configuration in separable
  commits/PRs when time and workflow allow.
- Do not delete original source assets during the sprint.
- For significant visual alternatives, preserve the accepted implementation until adoption.
- If deployment fails, restore the last known-good deployment and continue fixes without
  rewriting the launch history.
