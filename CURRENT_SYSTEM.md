# Current System

Status: V0.2 working snapshot
Snapshot date: 2026-08-02
Base commit inspected: `625f07d7151a814a4f881a8be2edb94a09053e72`

This document describes the implementation as it exists. It is descriptive, not a promise
that every current choice should remain. Durable decisions live in `PORTFOLIO_OS.md`; the
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
- There are no API routes, route-level loading states, or error boundaries. The portfolio
  case study is currently a single isolated route rather than a shared project-route system.

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

Two real-project case-study packages are also synchronized from external Obsidian authoring
folders: `字数` to `content/projects/lincoln-text-expression/`, and `hondasystem` to
`content/projects/honda-hmi-design-system/`. A local multi-project configuration drives
`npm run content:text-expression`, which generates the repository case-study copy, copies
approved assets, records a source hash, and updates derived pitch/appendix files in Obsidian.
These synchronized packages now supply the homepage project manifest and static case-study
routes. Their concise `project.json` records drive discovery and link to the longer pages.

The portfolio-building project has a separate Chinese editorial master, English website
content, evidence manifest, and prototype asset in
`content/projects/portfolio-operating-system/`. Its English display is statically rendered
at `/work/portfolio-operating-system`. It is connected to the homepage project manifest but
does not establish a universal schema for the other case studies.

The homepage now continues below the full-height workspace into a conventional selected-work
section containing all four real projects. This provides a direct scanning path alongside
the experiential Window interface.

## 5. Current deployment

- `vercel.json` configures a Next.js Vercel build.
- `open-next.config.ts` and `wrangler.jsonc` configure an OpenNext/Cloudflare path.
- `public/_headers` is present in the working tree.
- The audited base commit describes a Cloudflare Pages/static-export change, while current
  uncommitted configuration also includes deployment changes.
- The canonical production platform is not documented consistently.
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

Spacing, radii, shadows, typography scale, z-depth, and most motion values remain inline
Tailwind/JS choices. Components also use neutral, sky, indigo, emerald, amber, and literal
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
3. Current ESLint failure in `AIContent` from synchronous effect state updates.
4. Raw `<img>` warning and unused asset-script import warning.
5. No automated tests or visual regression setup.

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

- Root README remains create-next-app boilerplate.
- Site/navigation content contains duplicated or unused fields.
- Loader comments do not match manual project discovery.
- V0.2 and `package.json` version `0.1.0` are not synchronized.
- Vercel and Cloudflare responsibilities are not clearly distinguished.

## 9. Verification baseline

The 2026-08-01 audit ran ESLint using the bundled workspace Node runtime. Result:

- 1 error: synchronous state update inside an effect in `AIContent.tsx`.
- 1 warning: raw `<img>` use in `HoverImage.tsx`.
- 1 warning: unused `basename` import in `copy-project-assets.mjs`.

A production build was not run during the read-only audit because the prebuild script
deletes and reconstructs generated public assets.
