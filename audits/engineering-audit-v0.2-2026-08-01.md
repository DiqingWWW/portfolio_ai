# Engineering Audit — V0.2 Working Snapshot

## Snapshot identity

- Audit date: 2026-08-01
- Portfolio stage: V0.2 working snapshot
- Base commit: `625f07d7151a814a4f881a8be2edb94a09053e72`
- Base commit date: 2026-07-27
- Base commit subject: `fix: switch to static export for Cloudflare Pages deployment`
- Working tree: contained additional uncommitted deployment/configuration changes at audit time
- Application version in `package.json`: `0.1.0`

The V0.2 label follows the repository's `update/V0.2.md` project record. It is not yet
synchronized with the package version. This audit describes the working tree as inspected,
not only the base commit.

## Executive summary

This is a compact, content-driven Next.js 16 portfolio with a distinctive spatial-workspace
interface. It has a sound separation between JSON content, TypeScript content contracts,
and presentation components. Its main engineering constraint is concentration: the entire
home experience, all content, Motion, and nearly every component sit below one large client
boundary in `src/app/page.tsx`.

The strongest evolution strategy is to preserve the canvas as the memorable front door,
stabilize its accessibility and interaction model, and introduce server-rendered project
routes for durable case-study content.

## 1. Current architecture map

```text
Next.js App Router
├── Root layout
│   ├── metadata
│   ├── Inter + JetBrains Mono
│   └── global Tailwind theme
├── Home page (single client boundary)
│   ├── desktop spatial canvas
│   │   ├── navigation nodes and hover previews
│   │   ├── draggable floating windows
│   │   └── animated project folder
│   └── mobile launcher and bottom sheets
├── Content access layer (`src/lib/content.ts`)
│   ├── profile, navigation, tags, nodes and demo JSON
│   └── project manifest and project JSON
└── Prebuild asset pipeline
    └── `content/projects/*` images → `public/assets/images/*`
```

### Runtime characteristics

- Next.js 16.2.9 App Router with React 19.2.4.
- Routes are limited to `/` and the generated sitemap.
- The root layout is server-rendered, but the home page is a Client Component.
- Because the page imports all leaf components and content, nearly the complete experience
  belongs to the client module graph.
- Tailwind CSS v4 provides styling; Motion provides spatial and micro-interactions.
- Vercel and Cloudflare/OpenNext deployment configuration coexist.

## 2. Component dependency tree

```text
RootLayout
└── Home
    ├── content.ts
    │   ├── profile.json
    │   ├── navigation.json
    │   ├── tags.json
    │   ├── nodes.json
    │   ├── design-tokens.json
    │   ├── ai-demo.json
    │   ├── hmi-demo.json
    │   └── projects/_index.ts → four project.json files
    ├── HoverImage
    ├── MacOSFolder
    ├── FloatingWindow
    │   ├── AboutMeContent
    │   ├── DesignSystemContent
    │   ├── HMIContent
    │   ├── AIContent
    │   └── FolderContent
    └── Mobile bottom-sheet composition
        └── the same five content components
```

### Responsibilities

- `Home`: orchestration, content lookup, window state, z-index, responsive composition,
  hover previews and asset selection.
- `FloatingWindow`: desktop chrome, focus and dragging.
- `MacOSFolder`: folder illustration, project peek, decorative badges and GitHub card.
- `AboutMeContent`: stateless profile presentation.
- `DesignSystemContent`: palettes, clipboard, tabs, slider, toggle and KPI demonstrations.
- `HMIContent`: speed, climate and ADAS simulations.
- `AIContent`: simulated compiler and generated-widget demonstrations.
- `FolderContent`: project list/detail state.
- `content.ts`: JSON façade, project/tag lookup and asset URL resolution.

Leaf components do not import one another. Most coupling is concentrated in `Home`.

## 3. Design system summary

### Global foundations

| Role | Value |
|---|---|
| Canvas | `#FAF7F2` |
| Primary text | `#1A1A1A` |
| Muted text | `#737373` |
| Accent | `#2E94E3` |
| Surface | `#FFFFFF` |
| Border | `rgba(26, 26, 26, 0.08)` |
| Grid | `rgba(26, 26, 26, 0.02)` |
| Sans typeface | Inter |
| Monospace typeface | JetBrains Mono |

### Visual language

- Warm, Figma-like workspace canvas.
- White floating surfaces, subtle borders, rounded cards and layered shadows.
- Blue folder/node accent.
- Bold sans-serif headings paired with small uppercase monospace metadata.
- Desktop uses a spatial operating-system metaphor; mobile converts it to a card launcher
  with bottom sheets.

### Maturity assessment

The repository has a coherent visual theme but not yet a complete design system. Global
tokens cover core colors and fonts, while spacing, radii, elevation, typography scale,
control sizes, z-depth and motion are mostly inline utility choices. Components also use
many `neutral`, `sky`, `indigo` and literal color values outside the workspace token set.

`content/design-tokens.json` describes a Monolith demonstration whose palette differs from
the live V0.2 workspace. This is acceptable as portfolio content, but it should not be
mistaken for the application's canonical token source.

## 4. Data and content structure

| Domain | Responsibility |
|---|---|
| `profile.json` | Identity, biography, skills, experience and GitHub data |
| `navigation.json` | UI labels, folder copy, footer copy and peek cards |
| `tags.json` | Canvas categories, titles and hover presentation |
| `nodes.json` | Desktop absolute positions |
| `design-tokens.json` | Design-system demo content and KPIs |
| `ai-demo.json` | Prompt/compiler/widget content |
| `hmi-demo.json` | Gauge, climate and ADAS content |
| `projects/*/project.json` | Project metadata, descriptions, tags, specs and assets |
| `projects/_index.ts` | Explicit project registry |

### Strengths

- Interfaces clearly document the expected content schema.
- Projects support many-to-many tag classification.
- Content editing is largely separated from JSX.
- Project JSON and source imagery are colocated.

### Gaps

- JSON is type-asserted, not runtime-validated.
- `_index.ts` remains manual despite being called auto-generated.
- Gallery and hover assets are modeled and copied but not shown in project details.
- Tag icon/color fields are present in data but visual mapping remains hardcoded.
- Some visual copy remains hardcoded in components.
- Flattening `ProjectData` to `FolderProject` discards assets, year, version and role.
- `nodes.nameBlock.x` contains an unusable coordinate and is bypassed by hardcoded JSX.

## 5. Existing animation system

### Motion animations

- Navigation hover scale and preview entry/exit.
- Thumbnail fans, rotation and staggering.
- Floating-window entry, exit and dragging.
- Folder depth, flap and ambient float.
- Shared-layout tab highlights.
- AI widget transitions.
- HMI gauge, vehicle and lane animation.
- Mobile sheet entry and exit.

Common values include the easing `[0.16, 1, 0.3, 1]`, spring stiffness around 220–350,
damping around 15–25 and small hover scales around 1.015–1.05.

### CSS/Tailwind animations

- Color, opacity and border transitions.
- Active scale feedback.
- Pulsing status indicators.
- General 200–300 ms transitions.

### Timer-driven simulation

- AI compiler progression at roughly 700 ms per step.
- HMI speed decay interval.
- HMI burst reset after two seconds.
- Clipboard confirmation reset after 1.5 seconds.

`src/config/motion.ts` declares shared easing, duration and scale values, but none are
currently imported. The effective motion system is duplicated inline. Reduced-motion
preferences are not handled.

## 6. Technical debt

### High priority

1. **Large client boundary:** `page.tsx` is 580 lines and pulls nearly all UI and content
   into the client module graph.
2. **Window accessibility:** floating windows lack dialog semantics, focus entry and
   restoration, Escape handling, an accessible close label and keyboard movement.
3. **Non-semantic interactive elements:** project rows, the folder and GitHub card use
   clickable `div` elements and are not keyboard-operable by default.
4. **Lint failure:** the audited snapshot reports one error in `AIContent` for synchronous
   state updates inside an effect, plus warnings for raw `<img>` usage and an unused import.
5. **No automated tests:** no unit, component, end-to-end or visual-regression setup exists.

### Medium priority

6. Desktop and mobile duplicate content dispatch and composition.
7. Window IDs use open string records rather than an exhaustive union/registry.
8. Z-index updates can derive from captured state during rapid focus events.
9. Draggable windows have no viewport constraints.
10. Motion constants and variants are duplicated.
11. The raw hover `<img>` does not benefit from Next image sizing/optimization.
12. The prebuild pipeline creates a generated second copy of project assets.
13. The design-system fluid-tab demo has empty click handlers.
14. Some timeouts are not cleaned up on unmount.
15. Content and cross-file references are not validated at build time.

### Lower priority and documentation drift

- Site and navigation configuration contain duplicate or unused fields.
- Several typed content fields and asset fields are unused.
- The root README remains create-next-app boilerplate and references obsolete defaults.
- Loader comments claim runtime scanning, while project discovery uses a manual manifest.
- The canonical deployment target is unclear because two deployment paths coexist.
- Security headers are commented out.
- The CV affordance has no action.
- External GitHub navigation does not explicitly set `noopener`.
- Portfolio claims and metrics have no structured provenance/evidence field.

## 7. Recommended evolution path

### Phase 1 — Stabilize V0.x

- Resolve lint findings.
- Introduce a `WindowId` union and window descriptor registry.
- Add semantic controls, dialog behavior, keyboard access and focus management.
- Add reduced-motion handling.
- Clean up timers and constrain window dragging.
- Complete currently decorative demo controls.
- Validate content and asset references during CI/prebuild.

### Phase 2 — Reduce orchestration and bundle coupling

```text
Server Home page
├── prepares typed content/view models
└── WorkspaceClient
    ├── DesktopWorkspace
    │   ├── CanvasNode
    │   ├── HoverPreview
    │   └── WindowManager
    └── MobileWorkspace
        ├── WorkspaceCard
        └── MobileSheet
```

Keep static content preparation server-side. Keep only interaction state, dragging and
interactive demos within focused client boundaries. Lazy-load heavier window bodies when
opened. Extract primitives only where repetition is proven, preserving component-local
visual context.

### Phase 3 — Formalize foundations

- Decide which tokens are canonical for the live application.
- Add semantic radius, elevation, typography, interaction, z-depth and motion tokens.
- Establish a small motion vocabulary for window entry, node hover, cards, ambient motion
  and mobile sheets.
- Retain intentionally local variants where visual contexts differ.

### Phase 4 — Expand portfolio information architecture

- Preserve `/` as the experiential canvas.
- Add server-rendered routes such as `/work/[project]` for full case studies.
- Include gallery, role, constraints, process, outcomes and evidence-backed metrics.
- Link window summaries and folder entries to the detailed routes.
- Generate sitemap entries and metadata from project content.
- Add archive routes only when a true major version is released.

### Phase 5 — Verification and operations

- Add content-integrity, interaction and visual-regression tests.
- Measure bundle size, hydration cost, LCP and reduced-motion behavior.
- Select and document the primary deployment target.
- Replace the boilerplate README with architecture, authoring, asset, testing and deployment
  documentation.

## Verification performed

- Read-only repository and dependency inspection.
- Relevant bundled Next.js 16 documentation reviewed before making framework assessments.
- ESLint run against the audited working tree: one error and two warnings described above.
- No build was run because the request that initiated this audit prohibited file changes,
  and the build/prebuild pipeline deletes and reconstructs generated public assets.
