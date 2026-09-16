# Portfolio OS

Status: Initial working constitution
Last reviewed: 2026-08-01

This document is the durable source of truth for the portfolio's product intent,
information architecture, and long-term boundaries. It is intentionally principle-led.
It does not freeze implementation details, exact schemas, visual token values, component
APIs, migration tasks, or one-time AI prompts.

## How to read this document

Decisions use four states:

| State | Meaning |
|---|---|
| Canonical | Approved long-term direction. Do not change implicitly. |
| Current | True of the present implementation, but allowed to evolve. |
| Proposed | A candidate direction requiring review before adoption. |
| Open | An unresolved question. Do not silently convert it into a rule. |

The current implementation belongs in `CURRENT_SYSTEM.md`. Temporary execution plans
belong in a versioned migration document. Concrete task prompts do not belong here.

## 1. Project goal

The portfolio exists to demonstrate Diqing Wu's ability to think and work as a product
designer, systems designer, interaction designer, and AI-assisted builder. It should make
the work understandable enough for professional evaluation while allowing the experience
itself to demonstrate design judgment and technical fluency.

The site should prove the ability to:

- define coherent product and information systems;
- communicate role, context, decisions, trade-offs, process, and outcomes;
- design memorable interactions without sacrificing clarity or accessibility;
- connect design intent, structured content, media, and implementation;
- use AI as a directed collaborator while retaining human authorship and judgment;
- evolve a real product incrementally rather than repeatedly regenerate it.

The website is a portfolio product, not merely a gallery and not a demonstration of code
for its own sake.

## 2. Product vision

**Canonical:** The product combines two complementary modes.

1. **Experiential workspace:** a distinctive front door that demonstrates spatial design,
   motion, systems thinking, and interaction craft.
2. **Durable evidence layer:** concise, accessible, indexable project narratives that let
   a reviewer understand the work quickly and confidently.

The workspace is the current canonical homepage concept. A future implementation may refine
its visual expression, but it must not quietly collapse into a generic portfolio grid,
generic SaaS landing page, or decorative interface that obscures the work.

The evidence layer may grow into project routes or another reviewed structure. Its exact
route architecture is not yet canonical.

## 3. Audience and success criteria

### Primary audiences

| Audience | What they need to evaluate |
|---|---|
| Design leaders and hiring managers | Judgment, craft, product thinking, role, decisions, outcomes |
| Senior product/UX designers | Process, constraints, collaboration, systems thinking |
| Recruiters | Relevance, seniority, navigability, résumé/contact access |
| Engineering and design-system partners | Feasibility, implementation literacy, component/content discipline |
| AI-product teams | How AI was directed, evaluated, constrained, and combined with human decisions |

### Success criteria

The portfolio succeeds when:

- a first-time visitor can understand who Diqing is and what kind of work he does;
- a professional reviewer can reach credible project evidence without learning the entire
  workspace interaction model;
- the homepage remains memorable and demonstrates interaction capability;
- keyboard, touch, reduced-motion, and conventional navigation paths remain viable;
- project claims are attributable and are not invented or presented with false certainty;
- new content can be added without rewriting page structure;
- AI contributors can modify the project without erasing its intent or architecture.

Exact analytics, performance budgets, conversion targets, and user-testing metrics remain
open until a measurement strategy is approved.

## 4. Canonical information architecture

The following entities have distinct meanings and must not be conflated:

| Entity | Canonical definition |
|---|---|
| Project | A bounded body of work with its own identity, context, role, time period, content, and related media. |
| Tag | A reusable classification such as capability, domain, method, industry, or technology. A tag is not a project. |
| Asset | A media or document resource used by the site or a project. It is not editorial text or executable UI configuration. |
| Case study | A structured narrative explaining a project's context, decisions, process, evidence, outcome, and reflection. It is not a short preview. |
| Site content/config | Global identity, labels, navigation, metadata, and display content shared by the product. |
| Executable configuration | TypeScript/React configuration that contains components, imports, reducers, behavior, or other executable values. |

### Canonical relationships

- A project can have one or more tags.
- A tag can classify zero or more projects.
- A case study, when present, explains exactly one project.
- A project can own or reference multiple assets.
- A case study may reference assets related to its project.
- Stable internal IDs must not be casually repurposed after publication.
- Display names, copy, layouts, and specific field structures may evolve through review.
- HMI, Design System, AI, Spatial UI, methods, and technologies are classification
  dimensions unless a real bounded project independently exists under that name.

The exact JSON fields, case-study sections, enums, route slugs, asset record schema, and
validation technology are **not yet canonical**. They must be derived from real content
needs and introduced incrementally.

## 5. Content principles

- User-facing editorial content should have a clear content source rather than being
  scattered through JSX.
- Projects, tags, case studies, assets, and global site copy retain separate ownership.
- Content should communicate real evidence: context, personal role, constraints,
  decisions, collaboration, outcomes, and limitations.
- AI must not invent metrics, employers, clients, roles, dates, research findings,
  testimonials, or project outcomes.
- Unverified claims must be revised, qualified, marked as provisional, or omitted.
- Content structure should be typed and eventually validated, but validation must follow
  approved content decisions rather than prematurely dictate them.
- Assets should be traceable to a project or global context and should carry enough
  information for appropriate display and accessibility.
- Editorial content and executable configuration must remain conceptually separate.
  React components, reducers, dynamic imports, and behavior registries do not belong in
  editorial JSON.
- One authoritative source should drive each piece of public content where practical;
  duplicated labels and metadata should be reduced deliberately, not through broad rewrites.

### Case-study evidence narratives

**Canonical:** A published case study is a scrolling visual evidence narrative. It may use
pitch-deck discipline—outcome-first hierarchy, concise proof, visual cadence, and explicit
takeaways—but it is not required to become a slide sequence or a universal case-study
template.

- Each project has one factual content master that owns its complete narrative, evidence
  boundaries, provenance, and internal TODOs.
- The master records a viewing goal, proof priorities, website inclusion, visual intent, and
  evidence status for material considered for public presentation.
- A localized web-content module is a selected, translated expression of the factual master;
  it cannot become an independent source of facts.
- A project may compose different semantic narrative units according to the work being shown.
  These units describe a reader-facing purpose—such as an outcome, decision, capability map,
  scenario, or result—not a mandatory visual section sequence.
- Data visualizations, diagrams, process maps, and generated explanatory visuals may clarify
  verified evidence. They must not fabricate, strengthen, or obscure a claim's evidence
  boundary.

The detailed authoring and implementation contract is maintained in
`governance/project-content/00_PROJECT_CONTENT_PIPELINE.md`. Its project-specific patterns
may evolve through owner-approved work without becoming a universal page template.

## 6. Design philosophy and language principles

### Why the homepage is a workspace

The homepage is a workspace because the medium should demonstrate the same qualities the
portfolio claims: systems thinking, spatial composition, interaction detail, hierarchy,
and the organization of complex material. The workspace metaphor is a product decision,
not a decorative skin.

### Why it is not a conventional portfolio grid

A conventional grid can efficiently list work, but it does not by itself demonstrate the
desired interaction and system-design capabilities. This portfolio should retain an
experiential layer while also providing clear and conventional routes to evidence.

### Canonical principles

- The experience should feel authored, spatial, precise, and product-oriented.
- Typography, space, hierarchy, content, and motion work together; none should compensate
  for weak information architecture.
- The interface should reveal systems thinking without making the visitor decode the UI.
- The workspace metaphor and recognizable project-folder anchor are important current
  identity elements.
- Visual context matters. A pattern designed for one component is not automatically a
  global design-system primitive.
- The product must not drift into a generic template through convenience refactoring.
- Visual exploration remains possible; the visual language is not fully frozen.

### Current, not permanent

The warm cream canvas, blue accent, Inter/JetBrains Mono pairing, white surfaces, window
chrome, shadows, radii, exact spacing, and exact motion values describe the current version.
They are not all permanent constitutional rules.

New exact tokens should be introduced only after comparison and review. Demo-specific
tokens must not automatically become the website's global tokens.

### Canonical design-system governance

The shared-system scope, source hierarchy, token architecture, responsive contract, motion
library, design-to-code mapping policy, and accessibility baseline are owned by
`governance/product/00_DESIGN_SYSTEM_CONTRACT.md`.

All accepted production pages use one shared portfolio design system except for explicitly
documented project-local or one-off treatments. The unfinished `Fabrica Study` remains an isolated
Proposed exploration and does not contribute global tokens, components, or motion patterns until
the owner accepts it and reviews each candidate difference for adoption.

## 7. Interaction principles

- Interaction should improve comprehension, orientation, feedback, or state expression.
- Motion is meaningful when it explains relationship, hierarchy, continuity, or response;
  it should not become noise.
- Hover may enrich the experience but cannot be the only way to access important content.
- Every essential pointer interaction needs an appropriate keyboard and touch path.
- Desktop may retain spatial multi-window behavior; mobile should prioritize usability
  rather than mechanically imitate desktop.
- Accessibility and the experiential concept are coequal product requirements.
- Reduced-motion preferences should be respected without removing essential feedback.
- Engineering optimization must not silently remove the core workspace metaphor.
- New behavior should have clear open, close, focus, recovery, and error states.

Detailed Window System behavior—such as exact z-index logic, Escape behavior, drag bounds,
focus restoration, and mobile sheet policy—belongs in the current system specification or
an approved implementation plan, not as frozen values in this constitution.

## 8. Engineering boundaries

### Canonical boundaries

- Maintain one evolving portfolio product in this repository.
- Preserve the Next.js App Router, TypeScript, structured content flow, and existing
  implementation unless a reviewed migration explicitly changes them.
- Do not replace the repository architecture with generated AI Studio, Gemini, Claude,
  Codex, Cursor, or other tool output.
- Visual reference output is evidence for semantic integration, not an alternate
  architecture to paste over the product.
- Keep editorial content separate from executable configuration.
- Prefer small, reversible changes with explicit acceptance criteria.
- Do not delete functioning features or approved components without explicit scope and a
  reviewed replacement/rollback path.
- Extract shared primitives only from proven repetition. Do not prematurely generalize
  component-specific visual patterns.
- Framework decisions must be based on the installed Next.js version and its bundled docs,
  not assumed knowledge of older Next.js versions.
- Security, accessibility, content integrity, and build health are release concerns, not
  optional polish.

### Proposed, not yet approved

- Narrowing the homepage client boundary.
- A typed Window registry and reducer.
- Formal JSON Schema and referential-integrity validation.
- Server-rendered `/work/[project]` case-study routes.
- Lazy-loading heavier demonstrations.
- Exact values and implementation technology for the formal semantic motion vocabulary.

These proposals are documented for evaluation in the migration plan. Their presence here
does not authorize implementation in unrelated tasks.

## 9. Version strategy

- The portfolio remains in the `v0.x` development stage until a formal V1 is approved.
- Minor v0.x releases may include focused UI refinements, content updates, bug fixes,
  animation changes, component improvements, and limited layout work.
- Short-lived feature branches may support review, but `main` remains the long-term
  integration/deployment branch.
- Git history records development; separate long-lived repositories or version branches
  should not be created merely to preserve website generations.
- A genuinely replaced major public experience may be preserved through an archive route,
  but no archive route should be created prematurely.
- Marketing/release labels and `package.json` versions should eventually be synchronized;
  until then, audits must record both the named release and exact commit/working snapshot.

## 10. Decision governance

- `governance/product/00_PORTFOLIO_OS.md` owns durable product, design, content, and
  engineering boundaries.
- `governance/product/00_DESIGN_SYSTEM_CONTRACT.md` owns the shared design-system scope,
  hierarchy, responsive behavior, motion grammar, design-to-code mapping rules, and accessibility
  baseline.
- `CURRENT_SYSTEM.md` owns factual descriptions of the current implementation.
- `MIGRATION_PLAN_*.md` owns temporary execution sequencing and is archived when complete.
- `AGENTS.md` owns cross-tool AI working rules.
- `CLAUDE.md` is a Claude-specific entry point and should defer to the shared rules.
- `README.md` serves human developers and should document setup, authoring, and operation.
- Version audits preserve evidence about a particular snapshot; they do not automatically
  become constitutional policy.

### Changing a canonical decision

1. Identify the current rule and why it no longer serves the product.
2. Present evidence, alternatives, trade-offs, migration impact, and rollback implications.
3. Obtain explicit owner approval.
4. Update this document and affected implementation documents in the same scoped change.
5. Record unresolved consequences as open questions rather than inventing answers.

AI agents may propose changes to any document when repository evidence or project progress
shows that a rule is stale, ambiguous, contradictory, or unnecessarily restrictive. They
must explain the reason and impact and must not silently promote a proposal to Canonical.

## 11. Open questions

- What is the minimum evidence required for a project to become a published case study?
- Should full case studies use `/work/[project]`, another route model, or remain within the
  workspace for the next stage?
- Which public claims and metrics are verified, estimated, qualitative, or unsuitable?
- How should confidential or NDA work be represented?
- Which deployment platform is canonical, and is a secondary deployment still necessary?
- Should source assets continue to be copied into a generated public directory?
- Should project discovery remain an explicit manifest or become deterministic generation?
- Which Current repeated visual values should be promoted into the reviewed machine-readable
  primitive and semantic token registry?
- Is the Monolith token set illustrative project content, historical work, or a candidate
  for the website's own design system?
- When the owner accepts `Fabrica Study`, which of its differences should become shared, remain
  surface-local, or be rejected?
- What is the intended CV action and source?
- Is deep-linkable workspace state valuable?
- When is a conventional `/work` index justified?
- What browser, performance, analytics, and privacy requirements should be adopted?
- What is the policy for retaining or removing rejected visual explorations?
