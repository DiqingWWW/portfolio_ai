# Migration Plan v0.1

Status: Initial proposal; owner review required
Created: 2026-08-01
Applies to: V0.x stabilization and structural preparation

This is a temporary, revisable execution plan. It does not authorize implementation by
itself and does not turn proposed architecture into a canonical decision. Tasks should be
performed only when explicitly selected. When complete or superseded, move this document
to `docs/archive/migrations/` (creating that directory only when needed) and replace it with
the next reviewed plan.

## 1. Migration objective

Stabilize the existing portfolio, make the Window System safer and more accessible, prepare
the content architecture for richer evidence, and reduce homepage coupling without
redesigning or replacing the experiential workspace.

## 2. Operating constraints

- Preserve the existing homepage concept, content hierarchy, project identities, tag
  relationships, and functioning demonstrations.
- Do not combine a broad visual redesign with state, schema, or server/client migration.
- Do not implement the complete speculative schema from the research report.
- Migrate current data only after mapping actual fields and reviewing proposed additions.
- Keep every stage independently reviewable and reversible.
- Do not invent content to satisfy a schema.
- Do not delete the existing implementation until parity and acceptance criteria are met.

## 3. Priority and execution order

### Phase 0 — Establish a trustworthy baseline

Priority: Critical
Can begin immediately: Yes

Tasks:

1. Confirm the canonical deployment target and supported build command.
2. Fix the existing lint error and two warnings, or explicitly document any intentionally
   deferred warning.
3. Add a distinct type-check command if build/lint does not provide a reliable type gate.
4. Update developer setup documentation after the real deployment path is confirmed.
5. Record a baseline desktop/mobile interaction checklist.

Acceptance criteria:

- Lint exits successfully under the supported runtime.
- Type checking and production build complete successfully.
- Generated asset changes are understood and limited to expected output.
- The current homepage is manually verified at representative desktop and mobile widths.
- Deployment documentation names one primary path and the status of any secondary path.

Rollback:

- Revert only the focused baseline changes.
- Retain the audit and failure evidence even if a proposed fix is rejected.

### Phase 1 — Window correctness and accessibility

Priority: Critical
Depends on: Phase 0 baseline

Proposed tasks:

1. Define an exhaustive `WindowId` from the five existing window identities.
2. Centralize current window metadata in executable TypeScript configuration.
3. Replace independent string-keyed window/z-index updates with deterministic state
   transitions, using a reducer if it proves clearer than the current state shape.
4. Add semantic buttons/links and accessible names.
5. Add Escape behavior and focus restoration.
6. Constrain or recover desktop window positions.
7. Ensure only one mobile sheet is active and mounted.
8. Add user-respecting reduced-motion behavior.
9. Clean up every interval and timeout on unmount.

Acceptance criteria:

- Invalid window IDs fail type checking.
- Existing launchers still open the correct content with the current visual appearance.
- Reopening an existing desktop window focuses rather than duplicates it.
- Desktop windows cannot become irrecoverably inaccessible.
- Keyboard users can open and close every essential surface.
- Escape closes the appropriate topmost desktop window or active mobile sheet.
- Focus returns to a reasonable invoking control after close.
- Mobile never presents multiple interactive sheets simultaneously.
- Reduced-motion mode retains state feedback without large spatial movement.
- Focus/open/close behavior has at least one automated interaction test.

Rollback:

- Keep the existing state implementation available until the new behavior passes parity
  review.
- If a large reducer migration proves risky, split semantic/accessibility fixes from state
  restructuring and land the smaller safe subset first.

### Phase 2 — Content integrity foundation

Priority: Important
May overlap with: Late Phase 1 work, provided files and responsibilities do not overlap

Tasks requiring approval before implementation:

1. Inventory all actual content fields and classify them as Canonical, Current, Proposed,
   unused, or deprecated.
2. Decide the minimum canonical shape of Project, Tag, Asset, and optional Case Study.
3. Add validation for existing approved fields.
4. Add cross-record checks for duplicate IDs, unknown tags, missing files, and other
   integrity failures supported by current data.
5. Decide whether the project manifest remains explicit or becomes generated.
6. Preserve data currently discarded by `FolderProject` where it is needed downstream.

Acceptance criteria:

- Current valid content passes without fabricated values.
- Invalid fixtures demonstrate that validation fails clearly.
- Every proposed new required field has owner approval and a real authoring need.
- Stable project IDs and existing project/tag relationships remain unchanged.
- No source asset or content field is silently discarded.
- Authoring and validation steps are documented.

Rollback:

- Validation is introduced as a separate script before it becomes a blocking prebuild gate.
- Keep current loaders available until all existing content passes reviewed validation.
- Revert schema/loader integration without reverting content evidence or field inventory.

### Phase 3 — Server/client and orchestration migration

Priority: Important
Depends on: Stable Window behavior and content contracts

Proposed target:

```text
Server page
└── Workspace client boundary
    ├── DesktopWorkspace
    │   └── WindowManager
    └── MobileWorkspace
        └── one active MobileSheet
```

Tasks:

1. Move static content preparation out of the broad client boundary where Next.js 16
   semantics and measured benefit justify it.
2. Centralize window-body selection for desktop and mobile.
3. Split page orchestration into named responsibilities without changing layout.
4. Evaluate lazy-loading HMI and AI demos when closed.
5. Measure the result before pursuing lower-value micro-optimizations.

Acceptance criteria:

- Installed Next.js documentation has been consulted for every affected framework API.
- Visual layout, project order, copy, launcher behavior, and core motion remain equivalent.
- Desktop and mobile use one authoritative window-body mapping.
- Only necessary interactive modules remain in the client graph.
- Closed heavy demos are excluded from initial client work if lazy loading is adopted.
- Lint, type check, build, interaction tests, and responsive smoke tests pass.
- A before/after architecture and bundle-impact note is recorded.

Rollback:

- Introduce new orchestration beside existing orchestration and switch usage only after
  parity review.
- Revert boundary/lazy-loading work independently of Window and content improvements.

### Phase 4 — Case-study pilot

Priority: Later / requires product-content approval
Depends on: Approved evidence model and content readiness

Proposed tasks:

1. Select one representative project with enough verified material.
2. Define the minimum case-study narrative from that real project.
3. Test one server-rendered canonical project route.
4. Add metadata, project media, and navigation between the workspace and evidence layer.
5. Evaluate the pilot before migrating other projects or creating a `/work` index.

Acceptance criteria:

- The case study distinguishes personal role, context, decisions, process, outcomes, and
  limitations without fabricated content.
- The project has a stable, accessible, indexable URL and metadata.
- The workspace remains the canonical experiential homepage.
- The route does not force an unapproved universal section enum onto all projects.
- Owner review decides adopt, revise, or reject before wider rollout.

Rollback:

- Keep the pilot isolated to one route and one project's content additions.
- Removing the pilot must not disturb the homepage or existing project data.

### Phase 5 — Controlled visual evolution

Priority: Ongoing after functional baselines
Can overlap with: Content writing or isolated engineering work when diffs do not overlap

For each exploration:

1. Select only one subsystem or explicit visual hypothesis.
2. Create a parallel implementation or clearly isolated variant.
3. Preserve the current accepted implementation for comparison.
4. Reuse approved content and keep new tokens marked Proposed.
5. Review desktop, mobile, keyboard, reduced-motion, performance, and content effects.
6. Decide adopt, iterate, or reject.
7. Remove rejected variants promptly after the decision; do not accumulate permanent V2
   debris.

Acceptance criteria:

- The hypothesis and evaluation criteria are written before adoption.
- Current and proposed versions can be compared without replacing the source of truth.
- Accessibility and interaction behavior are equivalent or better.
- Adoption updates relevant documentation and removes superseded code deliberately.
- Rejection leaves the accepted implementation unchanged.

Rollback:

- Disable or remove the isolated variant.
- Because the accepted component remains available during review, rollback should not
  require reconstructing deleted code.

## 4. What may run in parallel

Parallel work is acceptable when ownership and diffs are independent:

- project content inventory and non-overlapping Window accessibility work;
- documentation corrections and isolated tests;
- one visual exploration and unrelated content writing;
- case-study research and performance measurement;
- schema research before schema enforcement.

Parallel work still requires integration sequencing and a shared baseline.

## 5. What must not run in parallel

- Full visual redesign with Window state migration.
- Content-schema enforcement with broad content rewriting.
- Server/client boundary migration with a simultaneous homepage replacement.
- Asset-pipeline replacement with image-component migration unless treated as one explicitly
  scoped, reversible project.
- Deployment-platform migration with unrelated feature work.
- Multiple visual explorations that modify the same component or global tokens.

## 6. Verification matrix

Every implementation task should select checks proportionate to risk:

| Change type | Minimum verification |
|---|---|
| Documentation only | Links, terminology, scope, and status review |
| Content only | Content validation when available, affected page review, lint/build if imported |
| Component behavior | Lint, type check, focused tests, keyboard/manual review, build |
| Visual change | Above plus representative desktop/mobile comparison and reduced-motion review |
| Architecture/config | Lint, type check, full build, relevant tests, deployment/config review |
| Asset pipeline | Dry-run/inventory where possible, build output inspection, missing-asset checks |

If a required command cannot run, report the exact reason and do not claim verification.

## 7. Completion and archive criteria

This plan is complete when:

- the accepted baseline is green;
- the Window System meets the agreed accessibility and recovery criteria;
- approved current content has integrity validation;
- homepage responsibilities and client boundaries are intentionally structured;
- the owner has accepted, revised, or declined the case-study pilot direction;
- remaining work has moved into a new reviewed plan rather than silently expanding v0.1.

At completion, add a final status summary and archive this file. Do not rewrite history to
make abandoned proposals look approved.
