# Honda bilingual responsive QA — 2026-08-22

Scope: read-only inspection of the Chinese Honda route at 390×844 and 1440×1000. No presentation
code was changed during this audit.

## Summary

The page has a stable responsive shell, correct localized imagery, no document-level horizontal
overflow, and a strong desktop hero. The main release risks are mobile diagram comprehension,
incomplete Chinese localization inside the mindmap, semantic heading order, and public evidence
process language.

## Findings

### P1 — Strategy-map action obscures the mobile overview

- Observation: the visible action uses the full accessible label “以全尺寸打开影响—阶段策略图” and
  covers a large part of the 350px-wide diagram.
- Impact: the primary overview becomes harder to understand in the exact state intended for
  first-glance comprehension.
- Location: `InteractiveStrategyMap.tsx`.
- Recommendation: keep the descriptive `aria-label`, but shorten visible text to “放大查看” and
  anchor it without covering the diagram's core columns.

### P1 — Chinese mindmap still exposes English navigation labels

- Observation: `HMI Interaction Framework`, `Design Philosophy`, `Design Platform`, `Design
  Resources`, `Design Guidelines`, and `Adaptation Rules` remain English on the Chinese route.
- Impact: the page is visibly mixed-language and the system structure requires unnecessary language
  switching from the reader.
- Location: `InteractiveMindmap.tsx` and/or the localized Honda content dictionary.
- Recommendation: add Chinese display translations while keeping source data unchanged.

### P1 — Public validation copy contains internal evidence-process language

- Observation: the visible table includes “完整数据待补充” and “未经核实的 NPS 表述已排除”.
- Impact: these read like internal content-management notes rather than an authored public evidence
  boundary, and conflict with the release criterion that internal truth-status notes stay private.
- Location: `case-study.zh.ts`, Validation metric framework.
- Recommendation: owner-review whether to remove these rows, replace them with public-facing scope
  language, or omit Current Status from the public table.

### P2 — Mobile diagram is an overview but its labels are below practical reading size

- Observation: a fixed 1200×720 SVG is scaled into 350px. The whole structure remains visible, but
  most detailed labels cannot be read without enlargement.
- Impact: readers understand that a system exists but cannot extract its logic from the inline view.
- Location: `InteractiveStrategyMap.tsx`.
- Recommendation: retain the complete overview, emphasize only column titles and one key path
  inline, and reserve detailed labels for the enlarged view.

### P2 — Heading outline skips from H1 to H3

- Observation: the page title is H1 and every major chapter is H3; no H2 exists.
- Impact: screen-reader heading navigation communicates an incomplete hierarchy.
- Location: `HondaCaseStudyPage.tsx`, `SectionHeading`.
- Recommendation: render major chapters as H2 and design decisions as H3 while preserving visual
  classes.

### P2 — Several controls miss the project's 44×44 target

- Observation: EN switch is about 38×44, enlarge actions about 40×44, and nested mindmap controls
  are 40px tall.
- Impact: controls remain operable but provide less reliable touch acquisition than the system's
  stated minimum.
- Location: `LanguageSwitcher.tsx`, `OverviewTable.tsx`, `InteractiveMindmap.tsx`.
- Recommendation: use a minimum 44px width and height for touch-critical controls.

### P2 — Research foundation is too dense for a 30-second case-study scan

- Observation: the first research card exceeds one mobile viewport and repeats its paragraph as
  three takeaways.
- Impact: the new section delays the three decisions and weakens the intended fast narrative.
- Location: `HondaCaseStudyPage.tsx` and `case-study.zh.ts`.
- Recommendation: keep one concise setup sentence plus three compact findings; move supporting
  explanation into progressive disclosure or remove the repeated paragraph.

## Positive findings

- Correct `lang="zh-CN"`, Chinese navigation and localized Metadata.
- No document-level horizontal overflow at 390px or 1440px.
- Mobile images select generated 960px variants; Chinese paired assets are used correctly.
- Tables preserve the complete overview and offer an explicit enlarged viewer.
- Header actions remain available throughout the long page.
- Desktop hero, line length, image scale, and warm editorial shell are coherent.
