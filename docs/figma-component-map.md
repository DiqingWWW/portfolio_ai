# Figma ↔ code identity map

Status: local identity lookup, 2026-10-07. Not published Code Connect; not visual or behavioral acceptance.

Scope: **Portfolio Website**, owner-confirmed file key `RXVtk9IUr6z8nwfm1sq1MU` on 2026-10-07.
The plugin file name and selected Gallery variant corroborate the supplied URL. These qualified names identify existing
code implementations; they do not authorize regeneration, automatic updates, or promotion of Draft
components into production. Revalidate file identity before using this map in another Figma file.

Figwright reads the following two-column table as explicit name-to-file overrides. The dated
[reconciliation snapshot](../audits/figma-component-reconciliation-2026-10-07.json) records node IDs,
exports, prop translations, gaps, lifecycle, and code hashes. It is evidence, not a second executable
component registry. Existing `src/design-system/registry/` records remain Draft and unbound pending
API/parity review; do not mistake these local path overrides for a published Code Connect binding.
Local Figwright overrides do not require official MCP quota or a published Figma library.

| FigmaName | code/path |
| --- | --- |
| Portfolio/Draft/Action/Button/Small | src/design-system/components/Button/Button.tsx |
| Portfolio/Draft/Action/Button/Medium | src/design-system/components/Button/Button.tsx |
| Portfolio/Draft/Action/Button/Large | src/design-system/components/Button/Button.tsx |
| Portfolio/Draft/Form/Text Field | src/design-system/components/TextField/TextField.tsx |
| Portfolio/Draft/Surface/Card | src/design-system/components/Card/Card.tsx |
| V2/Card/Project | src/design-system/portfolio/ProjectCard.tsx |

## Properties and exclusions

- Draft Button: Label → children; Variant → variant; Size → size. Only the Disabled state maps to
  `disabled`; hover, focus, and pressed remain browser/CSS behavior. The three sets share one export.
- Draft Text Field: label, value, description and error map to existing props. Show description and
  Validation control whether description/error are supplied. Focus is not a React prop.
- Draft Card: use the existing compound exports (`CardMedia`, `CardBody`, `CardTitle`,
  `CardDescription`, `CardFooter`). Do not invent title or width props on `Card`.
- V2 Project: the shared homepage/catalogue export is `ProjectCard`. Its nested Body title maps to
  `title`. Size is responsive layout. `preview` forces a revealed catalogue specimen; it is not a
  replacement for real hover, keyboard, touch, or reduced-motion behavior.
- V2 Button, Tag and Project Body must **not** reuse the fuzzy matches Draft Button, AIContent, and
  Draft Card. These are different concepts. Their current JSX/CSS owners are recorded as unbound
  recipes, not standalone React components.
- Other V2 recipes and code-only components require separate API/identity review before extraction
  or publication. Do not bind a whole page or GalleryControls as a substitute for one card.

## Read-only checks

```sh
node scripts/check-figma-component-map.mjs
node scripts/check-figma-component-map.mjs --figma=288:333
node scripts/check-figma-component-map.mjs --code=src/design-system/portfolio/ProjectCard.tsx
```

The check validates local paths, exports, table consistency, and the recorded direct-code hashes.
It does not contact Figma, prove visual parity, detect live Figma changes, or perform synchronization.
Use a fresh design-context/API read and scoped review before changing either side.
