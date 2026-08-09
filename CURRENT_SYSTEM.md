# Current System

Status: Current working snapshot — V1.1 release candidate
Snapshot date: 2026-08-09
Base release: V1.1; this document describes the accepted content-pipeline and case-study
showcase scope awaiting final Vercel domain verification and production smoke testing.

This document describes the implementation as it exists. It is descriptive, not a promise
that every current choice should remain. Durable decisions live in
`governance/product/00_PORTFOLIO_OS.md`; the
full snapshot audit lives in `audits/engineering-audit-v0.2-2026-08-01.md`.

## 1. Application architecture

- Next.js 16.2.9 App Router, React 19.2.4, TypeScript 5.
- Tailwind CSS v4 supplies utilities and CSS-first theme variables.
- Motion 12 supplies component animation and dragging.
- Lucide React supplies most icons; several brand icons are inline SVG.
- `src/app/layout.tsx` is the root Server Component and owns fonts and metadata.
- `src/app/page.tsx` is a 580-line Client Component and imports the complete homepage
  orchestration, content façade, Motion, icons, and all major content components.
- Current public routes are `/`, `/experiments`, the generated sitemap, three static case studies at
  `/work/honda-hmi-design-system`, `/work/lincoln-text-expression`, and
  `/work/portfolio-operating-system`, plus the image-only Rubik Studio project route at
  `/work/rubik-studio`.
- There are no API routes, route-level loading states, or error boundaries. The three primary
  case-study routes have dedicated page compositions rather than one shared generic renderer.

```text
JSON content
    ↓
src/lib/content.ts
    ↓
src/app/page.tsx (client orchestration)
    ↓
desktop workspace / mobile sheets
    ↓
typed content components
```

Because `page.tsx` is the client boundary, its imported components and content participate
in the homepage client module graph.

## 2. Component relationships

```text
RootLayout
└── Home
    ├── HoverImage
    ├── MacOSFolder
    ├── FloatingWindow × 5
    │   ├── AboutMeContent
    │   ├── DesignSystemContent
    │   ├── HMIContent
    │   ├── AIContent
    │   └── FolderContent
    └── Mobile bottom sheets
        └── the same five content components
```

`Home` owns content lookup, tag/project selection, text hover previews, window open state,
z-index state, default desktop positions, desktop composition, mobile content dispatch, and
the transition from the workspace hero to the scrollable selected-work section. Leaf content
components do not import one another.

## 3. Current Window System

### Desktop

- Five singleton windows exist: `about`, `ds`, `hmi`, `ai`, and `projects`.
- Design System, HMI, and AI Windows now contain only real project cards and case-study
  links. Their former interactive prototypes live in the separate `/experiments` collection.
- Open state is stored in `Record<string, boolean>`.
- Z-index state is stored in a second string-keyed record plus a `topZIndex` counter.
- Clicking a launcher opens and focuses its window.
- Pointer-down on a window raises it.
- Motion provides enter/exit transitions and unconstrained dragging.
- Windows use fixed pixel defaults and do not currently persist position.
- Window bodies are rendered through five repeated `FloatingWindow` declarations.

### Mobile

- The canvas becomes a two-column launcher grid and project folder.
- Open windows are mapped into fixed bottom sheets.
- Multiple window booleans may be true, so multiple sheets can remain mounted and overlap.
- Mobile sheets have a close action but no complete modal focus-management system.

### Accessibility status

- The desktop multi-window experience lacks complete dialog labeling, Escape handling,
  focus entry/restoration, and keyboard movement/recovery.
- Several interactive cards/folders use clickable non-semantic elements.
- Hover previews are not consistently paired with focus behavior.
- Reduced-motion behavior is not configured.

## 4. Current content and JSON structure

```text
content/
├── profile.json
├── navigation.json
├── tags.json
├── nodes.json
├── design-tokens.json
├── ai-demo.json
├── hmi-demo.json
└── projects/
    ├── _index.ts
    ├── honda-hmi-design-system/
    ├── lincoln-text-expression/
    ├── portfolio-operating-system/
    └── generated concept source folders (published only through the separately labeled Experiments collection)
```

### Current entities

- `ProjectData`: ID, title, tags, metadata, descriptions, specs, tokens, and asset paths.
- `TagDefinition`: ID, label, icon/color hints, ordering, window title, and hover layout.
- Profile, navigation, design-system demo, AI demo, HMI demo, and node-position structures.
- `FolderProject`: a flattened project view that discards assets and some project metadata.

TypeScript interfaces describe expected shapes, but imported JSON is asserted into those
types. There is no runtime schema or referential-integrity validation. Project discovery is
an explicit TypeScript manifest even though comments describe it as automatic indexing.

Project images live with source project content. A prebuild script deletes and reconstructs
`public/assets/images`, copying supported media from every project directory. Runtime asset
helpers then resolve relative project paths into public URLs.

Three real-project packages are synchronized from external Obsidian authoring folders:
`字数`, `hondasystem`, and `Portfolio Websites`. A local multi-project configuration drives
`npm run content:sync`, which reads each approved `01_master/master.md`, copies approved assets,
records a source hash, updates derived pitch/appendix files in Obsidian, and generates a
`case-study.selection.json` manifest in the repository.

Each project keeps a JSX-free localized content module—currently `case-study.en.ts`; future
Chinese pages will use `case-study.zh.ts`. The TypeScript modules select and translate source
units from the manifest while retaining source IDs. Project-specific components compose these
modules into the corresponding route:

```text
Obsidian master
  → content:sync
  → case-study.selection.json + approved assets
  → case-study.en.ts
  → project-specific TSX page
```

Honda, Lincoln, and Portfolio Operating System now use this curation-tag pipeline. The older
repository `case-study.md`, `case-study.en.tsx`, and Portfolio OS `website.en.json` artifacts
were intentionally removed after route references migrated to the new modules. Their concise
`project.json` records continue to drive homepage discovery and links.

The portfolio-building project follows the same numbered authoring structure:
`01_master` is its sole factual master, `02_sections` holds source-ID composition briefs,
`03_references` preserves historical inputs, and `04_assets` owns approved source media. Its
repository package contains a source-selection manifest, a JSX-free English content module,
approved publication assets, and a dedicated page at `/work/portfolio-operating-system`. It
does not establish a universal composition for other project pages.

The homepage now continues below the full-height workspace into a conventional selected-work
section containing all four real projects. This provides a direct scanning path alongside
the experiential Window interface.

## 5. Current deployment

- `vercel.json` configures the current Next.js Vercel build and Vercel remains the production
  deployment path for this release. `https://deethin.site` is the intended production custom
  domain; Vercel and Alibaba Cloud DNS verification is still required before it becomes the
  confirmed public canonical URL.
- `open-next.config.ts`, `wrangler.jsonc`, and `public/_headers` are an unverified future
  OpenNext/Cloudflare path; they are not the current production deployment authority.
- `next.config.ts` contains production options and commented security-header examples.

## 6. Current design tokens and visual foundations

Global `@theme` variables currently define:

| Role | Value |
|---|---|
| Workspace background | `#FAF7F2` |
| Workspace text | `#1A1A1A` |
| Muted text | `#737373` |
| Accent | `#2E94E3` |
| Surface | `#FFFFFF` |
| Border | `rgba(26, 26, 26, 0.08)` |
| Grid | `rgba(26, 26, 26, 0.02)` |
| Sans | Inter |
| Mono | JetBrains Mono |
| Page H1 | `60px` |
| Page H2 | `42px` |
| Page H3 | `32px` |
| Page H4 | `18px`, bold |

Page-level visual roles are shared through `page-heading-1` to `page-heading-4` at 60px, 42px,
32px, and 18px bold. They are never redefined by page scope. Case-study pages keep semantic
H1/H2/H3 markup while applying the global `case-study-title`, `case-study-section-title`, and
`case-study-subsection-title` composition roles. Those roles render actual H2/H3/H4 elements and
use the complete corresponding styles, including size, line height, weight, and tracking. By
owner choice, case-study outlines begin at H2; the 60px H1 role remains available for future
surfaces that explicitly need it. Compact window, card, and control typography remains local.
Spacing, radii, shadows, the remaining typography scale, z-depth, and most motion values remain
inline Tailwind/JS choices. Components also use neutral, sky, indigo, emerald, amber, and literal
colors outside the small workspace token set.

`content/design-tokens.json` drives the Monolith demonstration and KPI cards. It is content
shown by the portfolio, not the canonical source for the live workspace theme.

## 7. Current animation system

- Motion enter/exit, hover, layout, spring, drag, SVG, and ambient animations.
- Tailwind/CSS color, opacity, border, active-state, and pulse transitions.
- Timer-driven AI compilation, HMI speed decay/status, and clipboard confirmation.
- Repeated expressive easing `[0.16, 1, 0.3, 1]` and similar spring values.
- `src/config/motion.ts` defines shared presets but is not imported by the implementation.
- No site-wide reduced-motion policy exists.

## 8. Current technical debt

### High priority

1. Oversized homepage client boundary and orchestration component.
2. Incomplete semantic and keyboard accessibility for the window/folder system.
3. Raw `<img>` warning in `HoverImage` and unused `basename` import warning in the asset-copy
   script; current lint has no errors.
4. No automated tests or visual regression setup.

### Medium priority

1. Duplicated desktop/mobile window-body composition.
2. Untyped string window IDs and long conditional dispatch.
3. Possible stale-state z-index updates under rapid focus events.
4. Unconstrained dragging and fixed desktop positions.
5. Duplicated inline motion values; unused shared motion configuration.
6. Generated duplication of source assets under `public`.
7. Incomplete design-system demo tabs.
8. Timeouts without consistent unmount cleanup.
9. No content schema or cross-record validation.
10. Underused gallery, hover, metadata, icon, and color fields.

### Documentation/configuration drift

- README retains standard Next.js boilerplate below its project-specific setup and content-sync
  instructions.
- Site/navigation content contains duplicated or unused fields.
- `package.json` now records the V1.1 release version. The project does not create Git tags for
  minor releases.
- The prospective Cloudflare path has not yet been validated against the Vercel deployment.

## 9. Verification baseline

The 2026-08-08 release-preparation check ran:

- `npm run content:sync`: synchronized Lincoln, Honda, and Portfolio Operating System;
- `npm run lint`: 0 errors, 2 warnings (raw `<img>` and unused `basename` import);
- `npm run build`: passed after copying 39 project assets and statically generating all public
  routes.

The build emits a non-blocking warning that Next.js inferred the parent `AI Projects` directory
as the Turbopack workspace root because both parent and repository lockfiles exist.
