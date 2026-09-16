# Fabrica deferred sections

Status: Backup inventory — not rendered.

The owner removed the following unfinished sections from the Fabrica reference-study page on
2026-09-14 so they can be refined later without presenting placeholder content publicly:

- `experienceSection` — “项目体验 / Experiences”
- `pricingSection` — “报价 / Pricing”
- `faqSection` — “常见问题 / FAQ”
- `aboutSection` — “关于我 / About Me” and its process/showreel composition

Their bilingual editorial content remains intact in
`content/prototypes/fabrica-study.json`. Their presentation styles remain in
`fabrica.module.css` under the matching class names. The pricing interaction remains in
`StudyPricing.tsx`. The exact removed JSX is preserved in `deferred-sections.tsx.txt`, which is
deliberately excluded from compilation and rendering. Before restoring any section, verify its
placeholder claims and reinsert it into `FabricaSections.tsx` through owner review.

The removed composition order was:

1. `aboutSection` after Services and before the featured case study.
2. `experienceSection` after About / selected process and before the featured case study.
3. `pricingSection` after the featured case study.
4. `faqSection` immediately after pricing and before Experiments.

Rollback: restore the preserved JSX blocks, then review their desktop and mobile states before
publishing.
