<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shared AI Working Agreement

This file is the common operating agreement for Codex, Claude, Gemini, Cursor, and other
AI contributors working in this repository. Tool-specific entry files may add narrower
instructions but must not contradict these rules.

## 1. Project goal

Maintain and evolve a professional portfolio product that demonstrates Diqing Wu's product
design, systems thinking, interaction craft, HMI experience, design-system work, and
AI-assisted building practice. The experiential workspace is part of the product's evidence,
not disposable decoration.

## 2. Required reading order

Before planning or modifying the application:

1. Read this file completely.
2. Read `PORTFOLIO_OS.md` for durable product and architecture boundaries.
3. Read `CURRENT_SYSTEM.md` for the implementation actually present now.
4. Read the active `MIGRATION_PLAN_*.md` only when the task relates to that migration.
5. Read the latest relevant audit under `audits/` when historical evidence is needed.
6. Read the relevant installed Next.js guide under `node_modules/next/dist/docs/` before
   changing Next.js APIs, conventions, routing, rendering, caching, images, or configuration.
7. Inspect the actual affected source and current working-tree changes before proposing edits.

`README.md` is the human developer entry point. `CLAUDE.md` is a Claude-specific pointer.
Neither overrides the shared constitution or this agreement.

## 3. Authority and decision states

Respect the status vocabulary in `PORTFOLIO_OS.md`:

- **Canonical:** do not change without explicit owner approval and a documented decision.
- **Current:** describe the implementation; may change through a scoped task.
- **Proposed:** evaluate, do not treat as approved implementation.
- **Open:** ask or present options; do not silently decide.

The documents are initial and expected to evolve. During project work, AI contributors may
propose amendments when evidence shows a rule is stale, contradictory, ambiguous, or blocks
the product unnecessarily. State the evidence, impact, alternatives, and affected files.
Do not edit a Canonical decision merely because a different pattern is more common.

## 4. Non-negotiable product boundaries

- Do not rewrite or regenerate the entire site.
- Do not replace the repository structure with AI Studio or other generated output.
- Do not remove existing behavior, content, project relationships, or approved visual
  components unless the task explicitly authorizes it and provides a rollback path.
- Preserve the experiential workspace as the homepage concept unless the owner approves a
  constitutional product change.
- A Project is a body of work. HMI, AI, Design System, industry, method, and technology are
  Tags/classifications unless a bounded project actually exists under that identity.
- Keep project, tag, asset, case-study, and site-level responsibilities distinct.
- Do not invent portfolio facts, metrics, clients, roles, dates, outcomes, or testimonials.
- Do not turn Proposed research-report examples into required schemas or tokens without
  explicit approval.

## 5. Content and executable configuration

User-facing editorial text, project metadata, and repeated public labels should come from
the appropriate structured content source rather than being newly hardcoded in JSX.

Store content according to responsibility:

- project content with the project content model;
- tag definitions with tag content;
- site/profile/navigation copy with global content;
- media in the approved asset location and referenced through the content/asset model;
- React components, dynamic imports, reducers, callbacks, behavior, and window registries in
  TypeScript, not JSON.

Global localized-image selection rule:

- English pages use the `_EN` asset when a language-paired asset exists.
- Chinese pages use the same-named `_CN` asset when a language-paired asset exists.
- Assets without a language suffix are language-neutral and must remain available to both
  English and Chinese pages.
- Do not render both `_EN` and `_CN` variants on the same localized page merely to show all
  source assets; select the variant that matches the page language.

Do not move existing hardcoded decorative text mechanically during unrelated work. When
encountered, report it or migrate it only if the task covers content normalization.

## 6. Coding rules

- Make the smallest coherent change that fulfills the approved scope.
- Do not mix unrelated cleanup, dependency upgrades, content changes, visual redesign, and
  architecture migration.
- Preserve user changes in a dirty working tree and avoid overwriting overlapping work.
- Use existing dependencies unless a new dependency is genuinely necessary; explain its
  purpose, cost, and alternatives before adding it.
- Keep pages/layouts server-rendered unless interaction or browser APIs require a client
  boundary, but do not refactor boundaries outside task scope.
- Prefer semantic HTML and accessible native controls.
- Preserve stable IDs and project/tag relationships during content migrations.
- Extract shared components only from demonstrated repetition. Do not promote local visual
  patterns into global design language automatically.
- Treat demo-specific styles and tokens as local unless reviewed as site-wide foundations.
- Do not delete old architecture until replacement parity is verified and rollback is clear.
- Do not expose secrets, local environment files, private references, or confidential work.

## 7. Visual exploration rules

Visual exploration must be parallel and reviewable:

- Select one explicit subsystem or hypothesis.
- Create an isolated alternative component, route, flag, or registry entry appropriate to
  the task; do not overwrite the accepted implementation.
- Preserve the current version for side-by-side comparison.
- Keep content relationships and behavior equivalent unless the experiment explicitly tests
  them.
- Mark new exact colors, spacing, type, radius, shadow, and motion values as Proposed until
  accepted.
- Evaluate representative desktop/mobile states, keyboard use, reduced motion, content fit,
  and performance impact.
- Record a clear adopt/iterate/reject decision.
- Remove rejected experiments after the decision so parallel versions do not become
  permanent ambiguity.

Google AI Studio output is a visual reference, not an architectural source of truth.
Integrate visual intent semantically into the existing architecture.

## 8. Change workflow

Before editing:

1. Inspect repository status and affected files.
2. State the task boundary and relevant assumptions.
3. Identify Canonical decisions and open questions touched by the change.
4. For meaningful changes, define acceptance criteria and rollback approach.

During editing:

1. Modify only necessary files.
2. Keep content, behavior, architecture, and visual concerns separable.
3. Preserve existing behavior outside scope.
4. Surface uncertainty rather than filling gaps with invented decisions.

After editing:

1. Review the diff for accidental or unrelated changes.
2. Run verification proportionate to risk.
3. Summarize outcome, files changed, visible/behavioral impact, verification evidence,
   unresolved issues, and rollback notes.
4. Suggest documentation changes when the implementation makes `CURRENT_SYSTEM.md` or an
   active migration plan stale.

## 9. Verification rules

For application changes, run the supported equivalents of:

```text
npm run lint
type check (when configured or available)
npm run build
relevant automated tests
```

Also perform focused manual or automated review for affected desktop/mobile, keyboard,
focus, reduced-motion, content, and asset behavior.

Important qualifications:

- Read the scripts before running them; the current prebuild asset script reconstructs a
  generated public directory.
- Do not run destructive or externally mutating commands without scope and authorization.
- Documentation-only changes do not require a production build unless they affect imported
  application content or configuration.
- If the environment cannot run a required check, report the exact failure and never claim
  that it passed.
- Do not fix unrelated failures unless explicitly brought into scope; report them separately.

## 10. Review, commits, and pull requests

- Do not commit, push, create a branch, or open/merge a pull request unless the user asks.
- Keep one concern per commit/PR where practical.
- Use an imperative, scoped commit message such as `fix(window): restore focus on close` or
  `docs(governance): define portfolio operating rules`.
- A requested PR must include: objective, scope, key decisions, files changed, verification
  evidence, screenshots for visible changes, accessibility/performance implications,
  unresolved questions, and rollback notes.
- Never merge a PR or deploy without explicit authorization.
- Review against `PORTFOLIO_OS.md`, task acceptance criteria, and actual diff behavior—not
  merely whether the build passes.

## 11. Prohibited behavior

Do not:

- hardcode new editorial content when an appropriate content source exists;
- put executable component configuration in JSON;
- delete working features to simplify a refactor;
- replace the whole page to implement a local visual update;
- generalize a component-specific reference into global tokens without evidence;
- mix unrelated changes into the same task;
- claim tests, builds, visual review, or browser behavior that was not actually verified;
- copy one-time prompts into `PORTFOLIO_OS.md`;
- treat audits or migration proposals as automatic authorization;
- publish secrets, private references, or unverified claims.
