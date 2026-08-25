# Project Content Pipeline

Status: Current — applies to all portfolio case studies

## Purpose

This protocol governs the Obsidian-to-website path for project content, including case studies,
visual-only projects, localized website modules, and project-specific presentation pages. It
keeps projects individually authored while making them implementable and maintainable. It does
not prescribe a universal case-study template or a slide-based presentation format.

## 1. Content-source contract

Each project has one factual Markdown master in its Obsidian authoring folder. Honda currently
uses `01_master/master.md`; legacy projects may retain an older path while they are migrated.
The configured master owns complete facts, source context, evidence boundaries, provenance,
and internal TODOs.

The beginning of that master contains **网页策展信息 / Website curation brief**:

- `Viewing goal`: what a reviewer should understand in roughly 30 seconds;
- `Proof priorities`: the two to four claims or artifacts that must carry the page;
- `Website inclusion`: `core`, `supporting`, `optional`, or `appendix`;
- `Visual intent`: the intended evidence treatment, such as outcome, decision proof, system
  map, comparison, interaction, or evidence boundary;
- `Evidence status`: verified, qualified, reconstruction, concept, or unresolved.

Localized web-content modules (`case-study.en.ts`, `case-study.zh.ts`) select and translate
approved material from the master. They are not second factual manuscripts, contain no JSX,
and retain source IDs for every narrative and visual unit. JSX must not introduce long-form
editorial claims that cannot be traced to a source block.

### Translation fidelity

Localized modules translate the selected master directly by default. Concision is allowed only
when it preserves the original proposition, professional register, evidence boundary, and level
of specificity. Translation must not replace a precise design argument with a friendlier slogan,
invent a new framing, or make the author sound less senior or less formal than the source.

- **Do:** translate `文本规则不应该从字段名或组件样式出发，而应该从内容本身承担的任务出发` as
  `Text rules should be defined by the task the content performs—not by the field name or component style.`
- **Do:** shorten surrounding explanation when the same meaning is already carried by adjacent
  evidence, while retaining the source ID and truth status.
- **Do not:** replace that proposition with `Different text needs different rules.` The slogan is
  broader, less precise, and changes the professional register and reasoning in the master.

The default bilingual publishing path is:

```text
master.md
  → case-study.zh.ts
  → case-study.en.ts
  → ProjectCaseStudyPage.tsx
  → local website review
```

The Chinese module is the owner-reviewed website narrative and may refine selection, order, and
localized expression without changing the approved facts or evidence boundary. The English module
is then translated from the approved Chinese module. It must preserve the same selected content,
source IDs, claims, and narrative order; only language and locale-matched assets change. A factual
correction still returns to `master.md` first.

Targeted local-page edits are allowed when the owner asks for them. Unless the request
explicitly changes a rule, those edits may change only localized wording, selection,
composition, layout, or interaction. They must not silently alter this protocol, the source
taxonomy, evidence rules, or the factual master. A factual correction returns to `master.md`
first; a presentation-only correction may remain in the localized module or page component.

## 2. Semantic component menu

Semantic components describe why a reader sees a unit, not a mandatory sequence or a visual
style. A project uses only the units needed to make its evidence understandable.

| Component | Reader-facing job |
|---|---|
| `HeroOutcome` | Establish the work, its value, a strong artifact, and qualified high-level results. |
| `DecisionBlock` | Show a consequential choice through context, decision, trade-off, and evidence. |
| `CapabilityMap` | Make a complex system, set of capabilities, or relationships scannable. |
| `ResultDashboard` | Turn verified outcomes and their caveats into a focused visual anchor. |
| `BeforeAfter` | Explain a meaningful state, behavior, or experience contrast. |
| `MetricsGrid` | Present several comparable verified metrics without implying unsupported causality. |
| `ImageStory` | Pair a visual sequence with the nearby takeaway it proves. |
| `ArchitectureDiagram` | Explain a system boundary, dependency, or flow using evidence-derived structure. |
| `InteractionDemo` | Explain a designed interaction or state change; label prototype/concept limits clearly. |

The initial implementation location is `src/components/case-study/`. Components are added
only when Honda or another approved project demonstrates the need; they should accept
project-provided data and media references rather than hardcoded public copy.

## 3. Project composition

Each project owns its composition in a page-level component and remains a normal scrolling
webpage.

```text
HondaCaseStudyPage.tsx
├── HeroOutcome
├── DecisionBlock
├── CapabilityMap
└── ResultDashboard

LincolnCaseStudyPage.tsx
├── HeroOutcome
├── BeforeAfter
└── InteractionDemo
```

The examples identify the initial intended compositions, not a restriction against adding a
well-supported unit later. Do not copy Honda's system narrative to Lincoln merely because a
component already exists.

### Visual-content floor

The localized content module must expose a verifiable composition balance before the page is
rendered. For every case study:

- images, video, motion, tables, diagrams, maps, comparisons, and evidence dashboards must
  account for at least 50% of the composed narrative units;
- prose may account for no more than 50%; long prose must be simplified, paired with evidence,
  or moved to progressive disclosure;
- the project page component must preserve the visual majority through its responsive layout,
  rather than satisfying the rule only as a data count;
- every diagram, map, process, comparison, and data table must show one complete high-level
  overview in its default inline state. The overview may not crop content or require internal
  horizontal or vertical scrolling to understand the whole structure;
- complete overviews adapt proportionally or reflow within the viewport. When the inline labels
  become too small for detailed reading, preserve the overview and provide an explicit enlarge
  action instead of replacing it with a clipped or scrollable fragment;
- content modules remain JSX-free and must retain source IDs for every translated narrative and
  visual unit. Project page components own only composition, layout, interaction, and rendering.

### Layout and media rules

- A section heading and its explanatory prose follow one vertical reading column. Do not place
  headings and their related body copy in left/right columns.
- Landscape images normally occupy a complete content row. Do not reduce them to side-by-side
  thumbnails merely to shorten the page.
- Portrait media is decided by evidence and legibility. Phone screenshots should normally appear
  as a pair, or beside concise explanatory text, when both remain readable at the target viewport.
  On mobile, a single phone screenshot must not expand to the full content width as a dominant
  page-filling image. Preserve a phone-like scale with an explicit maximum width; use a paired
  composition, a compact screenshot-and-text composition, or another evidence-led arrangement.
- Prefer spacing, background change, scale, and content rhythm over divider lines. Retain lines
  only when they clarify functional boundaries such as navigation, tables, or data grouping.
  Divider lines must not become the default separator between narrative sections or repeated
  content groups.
- Architecture, process, relationship diagrams, comparisons, and data tables render as one
  complete overview. Their inline treatment behaves like a responsive image: the viewer first
  sees the whole structure at a glance, while an enlarged viewer may provide readable detail.
  Internal scrolling is allowed only inside that explicitly opened detail viewer, never in the
  default inline overview. Keep structured source data canonical rather than converting it to a
  static raster asset solely to satisfy this presentation rule.

### Shared page typography

Landing pages, project case studies, and experiment index surfaces use the shared visual type
roles from `src/app/globals.css`: `page-heading-1` through `page-heading-4`. Those roles remain
globally available at their full sizes and are never redefined within a page scope. All case
studies use the global composition roles `case-study-title`, `case-study-section-title`, and
`case-study-subsection-title`. These apply the complete H2, H3, and H4 visual styles—including
size, line height, weight, and tracking—and render as actual H2, H3, and H4 elements respectively.
Case-study page outlines therefore begin at H2 by owner choice; H1 remains an available 60px
global role for surfaces that explicitly need it. Compact window, card, and control headings
remain component typography because they serve a different UI role.

Closing propositions and other narrative blockquotes use a 24px font size at every viewport.
They may change padding or line length responsively, but must not scale above 24px as display text.

## 4. Visual-evidence rules

- Prefer existing approved project media when it is the best proof.
- A generated graphic, metric card, process map, or diagram may only summarize verified
  content from the factual master.
- The visual must not create a stronger claim than the cited source allows. Preserve relevant
  estimate, sample, prototype, and attribution boundaries in nearby copy or labeling.
- On mobile, avoid sustained prose-only reading; use media, evidence, decisions, or concise
  summaries to maintain cadence without hiding important content.

## 5. Adoption and change control

These rules apply to all case studies. Project-specific components remain local unless two
projects demonstrate a genuinely shared contract. Changes to this protocol require an explicit
owner request; ordinary page refinement is not authorization to change global principles.
