# Honda content editor handoff

## Purpose of the master

The Obsidian master is the factual and evidentiary source for the project. It records what
happened, the owner's role, claims, source units, evidence boundaries, asset intent, and curation
instructions. It is not a finished web article and should not be rewritten merely to mirror page
layout.

## Current publishing chain

```text
approved master
  → case-study.zh.ts (owner-reviewed selection, order, and Chinese narrative)
  → case-study.en.ts (faithful translation; same content, order, claims, and source IDs)
  → HondaCaseStudyPage.tsx (presentation only)
```

Factual corrections return to the master first. The Chinese module may simplify, reorder, or
combine approved source units for the website. The English module must not introduce or remove
content; it changes only language and locale-matched assets.

## Construction rules

- `sourceIds` connect a website passage to master units. Preserve them when editing the same fact.
- `linked` content is public narrative connected to listed source units.
- Keep facts, selection/translation, and visual composition as separate layers.
- `_CN` assets belong on Chinese pages; paired `_EN` assets belong on English pages. Neutral assets
  are shared.
- `researchFoundation` is intentionally simplified for a short web section between Analysis and
  the three design decisions.
- Do not add facts, metrics, authorship, launch scope, testimonials, or adoption claims that the
  owner has not confirmed.

## Owner-confirmed Honda boundaries

- The system unified the China-region experience; do not describe it as a globally unified system.
- Sharing occurred through internal conferences and forums where photography was prohibited.
- The 45%+ figure combines a financial-cost estimate and reduced project workload; it is not total
  R&D cost.
- The 30%→85%+ reuse figures may be stated without adding a controlled-experiment disclaimer.
- Raw audit files do not need to be published.
- Public copy does not need to attribute the icon-breakpoint concept to an external supplier.
- Animated adaptation media demonstrates an interaction prototype, not proof of production rollout
  across all vehicles.

## Editorial review checklist

1. Can a reader understand the core problem within 30 seconds: inconsistent user experience, high
   learning cost, and duplicated work across four products and 200+ component instances with less
   than 30% reuse?
2. Are research foundations concise and clearly placed before the three design decisions?
3. Is every concept explained before it is used?
4. Does the English module preserve the Chinese module's selected content and order?
5. Do media suffixes match the page locale, and do captions avoid claiming more than the media
   proves?
