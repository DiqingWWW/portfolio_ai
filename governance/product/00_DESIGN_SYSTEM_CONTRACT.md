# Portfolio Design System Contract

Status: Canonical scope and governance; Current foundations; Proposed unapproved values
Last reviewed: 2026-09-12
Owner decision: 2026-09-12

This document is the single canonical human-readable contract for the portfolio design system.
It defines what belongs to the system, how design decisions become tokens, how responsive and
motion behavior are specified, how accessibility is verified, and how future design-tool assets
map to code. It does not authorize a broad visual rewrite or premature component extraction.

## 1. Authority and scope

### Portfolio AI case-study visual boundary (owner-approved for the current candidate)

The Portfolio AI review page may compose only visual treatments evidenced by the current
deethin.site landing page, the local Design System V2 reference, and these owner-reviewed Figma
specimens: `Media Stage / Accent surface`, `04 / Evidence / Inverse`, and
`05 / Contact + Footer`. A horizontally scrolling media gallery is the one additional candidate
pattern. This is a page-level composition constraint, not approval to promote a new shared
component or token. Any further visual treatment requires owner review before implementation.

- Use one Light canvas for the main reading flow. An approved inverse evidence panel and the
  closing/footer may interrupt it; alternating full-section colors or blue as a general semantic
  surface are not part of this candidate. Pale blue remains local to the reviewed Media Stage.
- A structural container does not acquire a fill, border, or shadow merely because it groups
  content. Do not turn tables, process steps, or relationships into equal-sized text cards and
  call them diagrams. Use the actual source images, tables, and connected diagrams where they
  communicate something the prose cannot.
- Preserve the landing page's lower-edge blur and purposeful motion grammar. Motion must reveal
  hierarchy or interaction, remain usable without hover, and stop or simplify under reduced
  motion. Do not add ambient movement to every section.
- Check Chinese and English copy at 320px, intermediate widths, desktop, and 200% text scaling.
  Type must reflow inside its actual container; viewport-based font scaling alone is insufficient.
- Only approved repeated behavior may graduate from this case study into the shared design
  system. Project-local compositions and the new gallery remain Proposed until separately accepted.

### Canonical

- All accepted production pages share one portfolio design system.
- A visual or behavioral value belongs to the shared system only when it expresses the same intent
  in repeated accepted use. A one-off composition may stay local and must not be promoted merely
  because it is visually similar.
- Project-specific evidence, brand treatments, diagrams, and narrative compositions may keep local
  values under a project namespace. Local values cannot override global interaction,
  accessibility, or content-integrity rules.
- `Fabrica Study` is an isolated Proposed exploration. Until the owner explicitly accepts the
  finished study for adoption, none of its colors, typography, spacing, radii, components, or
  motion values belong to the shared system.
- Component-library implementation has started as an isolated Draft catalogue. Draft components
  must remain outside accepted pages until the owner reviews and approves each component
  individually; creating the architecture does not authorize a production migration.

### Single-source model

1. This document owns system scope, naming, lifecycle, responsive behavior, motion grammar,
   accessibility requirements, and design-to-code mapping rules.
2. A future reviewed machine-readable token registry will own approved token values. Until that
   registry is created and adopted, `src/app/globals.css` remains the Current runtime value source.
3. `DESIGN.md` is a descriptive working reference. `.impeccable/design.json` and any future design
   tool library are derived artifacts; they never override this contract or the approved token
   registry.
4. `content/design-tokens.json` is portfolio demonstration content, not the website design system.
5. A generated artifact must record its source revision. Drift is reported and repaired through a
   scoped task; generated output must never silently become a new authority.

### Lifecycle

Every reusable decision has one state:

| State | Meaning |
|---|---|
| Proposed | Candidate under review; may be used only in an isolated experiment. |
| Current | Used by the accepted implementation but not yet guaranteed as durable. |
| Canonical | Owner-approved long-term rule or semantic role. |
| Deprecated | Still supported during migration; no new use. |
| Retired | Removed after consumers and derived artifacts have migrated. |

Promotion requires accepted repetition, named intent, responsive and accessibility review, owner
approval, and a migration/rollback note. Fabrica-local values cannot satisfy this promotion gate
until Fabrica itself is accepted.

## 2. Token architecture

The system uses four layers. Consumers bind to the highest meaningful layer and must not bypass an
available semantic token to use a primitive directly.

### Layer 1 — Primitive tokens

Raw material without usage intent: color coordinates, numeric spacing steps, font families,
font weights, radii, shadow recipes, durations, easing curves, and spring parameters.

Examples:

```text
color.blue.500
color.neutral.warm.050
space.4
radius.12
duration.150
ease.out.standard
```

Primitive names describe value, not use. Changing a primitive may affect many semantic aliases and
therefore requires impact review.

### Layer 2 — Semantic tokens

Intent shared across surfaces and components. These are the normal consumption layer.

```text
color.canvas.default
color.surface.raised
color.text.primary
color.text.muted
color.action.primary
color.border.subtle
focus.ring.color
layout.gutter.compact
motion.feedback.fast
```

Semantic names must remain meaningful across responsive layouts and themes. They must not contain
a component name.

### Layer 3 — Component tokens

Aliases for a proven reusable component need. They may reference semantic tokens and may differ by
state or size.

```text
navigation.tab.background.active
project-card.radius
dialog.surface.shadow
button.primary.text.disabled
```

Component tokens are added only when a real component exists and the semantic layer is too broad.
The isolated Draft catalogue may exercise Proposed component tokens, but those tokens do not
become shared runtime foundations until the owning component is individually approved.

### Layer 4 — Modes and local namespaces

Modes change a semantic value without changing intent. Namespaces prevent local visual languages
from becoming accidental global standards.

```text
mode: light | dark | reduced-motion
surface: workspace | editorial
local.project.honda.*
local.project.lincoln.*
local.prototype.fabrica.*
```

`local.prototype.fabrica.*` remains Proposed and isolated. Project-local tokens may inherit global
accessibility and interaction rules but not redefine them.

### Required token metadata

Every future registry entry must include:

- stable token ID and human-readable name;
- layer, value, unit, and aliases;
- lifecycle state and owner approval date;
- intended use and prohibited use;
- supported modes;
- source evidence or accepted call sites;
- accessibility constraints where applicable;
- replacement ID when deprecated.

## 3. Responsive system

### Canonical behavior

- Breakpoints exist where content or interaction stops working, not to imitate named devices.
- Responsive adaptation may recompose a surface, but it preserves content relationships, action
  priority, reading order, evidence, and accessible alternatives.
- DOM order follows logical reading order. Visual CSS reordering must not create a different
  keyboard or screen-reader sequence.
- Shared components define behavior between breakpoints, not only screenshots at fixed widths.
- At 320 CSS px viewport width and at 400% zoom, content must reflow without two-dimensional page
  scrolling except for content that intrinsically requires it, such as a data table or diagram.
- Text must remain usable at 200% text scaling without clipping, overlap, or lost controls.
- Sticky and fixed UI accounts for dynamic viewport units and safe-area insets.

### Current breakpoint roles

These values describe the Current implementation and are the starting point for validation. They
do not become Canonical exact values until representative pages pass content-fit review.

| Role | Current range | Expected behavior |
|---|---:|---|
| Compact | `0–639px` | One reading column, 20px outer gutter, touch-first controls, no essential hover dependency. |
| Comfortable | `640–767px` | Increased 32px gutter where content permits; intermediate wrapping and media sizing. |
| Workspace | `768–1023px` | Experiential desktop workspace may activate; spatial behavior must remain recoverable. |
| Wide | `1024–1279px` | Wider editorial compositions, side navigation where proven, increased section rhythm. |
| Maximum | `1280px+` | Shared content container remains capped near 1280px; space does not stretch reading lines. |

### Required responsive specification per pattern

Every future pattern or component specification records:

1. minimum and maximum content width;
2. outer gutter, internal gap, and alignment rule;
3. text wrapping, truncation, and long-content behavior;
4. media aspect ratio and crop/contain behavior;
5. layout change at each relevant breakpoint;
6. touch, keyboard, and hover behavior;
7. sticky/fixed behavior and safe-area handling;
8. representative English and Chinese content-fit cases;
9. reduced-motion behavior;
10. overflow and 200% text/400% zoom results.

## 4. Motion library

The motion library is a vocabulary of reusable decisions, not a gallery of effects. It teaches why
an element moves, what event causes it, how it can be interrupted, and what remains when motion is
reduced. Motion tokens describe timing; motion patterns describe behavior; a page choreography may
compose patterns without promoting its unique sequence into the global library.

### Motion layers

| Layer | Purpose | Example |
|---|---|---|
| Token | Reusable physical value | duration, easing, spring, distance, opacity range |
| Pattern | Reusable cause-and-effect behavior | press feedback, dialog enter/exit, disclosure |
| Choreography | Surface-specific sequence | workspace folder reveal, case-study title sequence |
| Experimental | Isolated study behavior | Fabrica scroll handoff and local reveal system |

### Proposed starting tokens

These values are Proposed teaching and evaluation defaults, not approved runtime migrations:

| Token | Proposed value | Intended use |
|---|---:|---|
| `duration.instant` | `0ms` | Keyboard-initiated changes and reduced-motion substitution |
| `duration.feedback` | `120–150ms` | Hover, press, color, border, and icon feedback |
| `duration.overlay` | `180–250ms` | Tooltip, menu, popover, and small overlay |
| `duration.spatial` | `220–300ms` | Dialog, drawer, sheet, and moderate layout movement |
| `duration.editorial` | `300–400ms` | Rare page-level or evidence transitions |
| `ease.enter` | `cubic-bezier(.32,.72,0,1)` | Element entering or becoming prominent |
| `ease.move` | `ease-in-out` | An on-screen element changing position or size |
| `ease.constant` | `linear` | Progress-as-time, spinner, or explicitly approved marquee |

Existing Motion springs remain Current implementation details until audited and named by intent.
Gesture-driven or interruptible motion should use springs; ordinary hover/color feedback should
use CSS transitions.

### Initial pattern catalogue

The library must eventually specify, but does not yet implement, these patterns:

1. Intent feedback: hover, focus, press, selected, success, and copy confirmation.
2. Overlay: tooltip, language menu, popover, dialog, mobile sheet, backdrop.
3. Disclosure: accordion, details, expanding project description.
4. Spatial continuity: floating-window open/focus/close and drag recovery.
5. Content transition: masked heading reveal, staggered list entry, route/content replacement.
6. Scroll relationship: reveal-on-enter, bounded parallax, sticky handoff.
7. Ambient: marquee, pulse, WebGL/video background, loading/progress.

Every motion-pattern record must contain:

- stable pattern ID and lifecycle state;
- user intent and trigger;
- entering, resting, interrupted, reversing, and exiting states;
- animated properties, distance/scale/opacity bounds, duration, easing, and transform origin;
- whether keyboard activation suppresses motion;
- pointer/coarse-pointer behavior;
- reduced-motion substitution;
- focus and content-visibility effects;
- performance budget and permitted implementation technology;
- representative recording or frame sequence and validation notes.

### Motion rules

- Motion must explain feedback, continuity, hierarchy, or spatial relationship. Otherwise omit it.
- Frequent or keyboard-driven navigation must respond immediately and must not wait for animation.
- Interactive state transitions must be interruptible and reversible.
- Prefer `transform` and `opacity`; layout or paint-heavy animation requires measured evidence.
- Hover animation applies only to devices with a fine pointer and cannot reveal the only access to
  essential content.
- Exit is quieter and normally 20–30% faster than entry.
- Every motion pattern has a reduced-motion alternative. Essential state feedback remains, while
  parallax, large travel, blur, auto-rotation, and looping ambient motion stop.
- Fabrica motion remains `local.prototype.fabrica.*` until owner acceptance and a separate
  extraction review.

### Learning path

Motion should be studied in this order:

1. state diagrams: trigger → entering → rest → exit;
2. duration and easing as expressions of distance and purpose;
3. transform origin and spatial continuity;
4. interruption, reversal, and gesture velocity;
5. reduced-motion substitution;
6. scroll-linked timelines and performance;
7. page choreography composed from already understood patterns.

## 5. Design-to-code mapping

### What it is for

A mapping identifies one design-system concept across the design tool and repository. It prevents
an agent or developer from rebuilding a look-alike component when an approved implementation
already exists, translates design variants into real props, exposes the correct tokens, and makes
design/code drift reviewable as a diff.

Mapping does not make Figma or code overwrite the other automatically. It supplies identity and
context so a human can approve a scoped change in the correct authority.

### Mapping record

Each component candidate receives a Draft record when implementation begins. Design-tool IDs may
remain unbound until a real library file exists; a record becomes Current or Canonical only after
the component and its design-tool identity are both reviewed.

Each record contains:

```text
systemId
designToolFileKey
designToolNodeId
designComponentName
codePath
codeExportName
propertyMappings
tokenBindings
supportedStatesAndModes
version
sourceRevision
lifecycleState
```

Example relationship:

```text
component.navigation.bookmark
  ↔ Figma component key and node ID
  ↔ src/.../BookmarkNavigation.tsx
  ↔ Active / Default / Language / Locale properties
  ↔ navigation.* and focus.* token aliases
```

### How it is built

1. Approve the component and its API; do not map a temporary or Fabrica-local experiment.
2. Assign a stable `systemId` independent of display name and file location.
3. Build or identify the design-tool component with matching properties and variants.
4. Bind its visual properties to approved Variables/tokens.
5. Record the design node ID, code path, export, prop mappings, and revision.
6. For Figma, publish the library component and connect it with Code Connect UI or a reviewed Code
   Connect template when property-level precision is required.
7. Verify one instance in both directions: design context selects the correct code component, and
   code-driven generation reuses the existing design component rather than drawing a duplicate.
8. Treat every later mismatch as an explicit design diff or code diff. Never synchronize by
   replacing an entire page.

The code-side registry lives in `src/design-system/registry/`. Its Draft records are the executable
mapping source for the isolated catalogue. A null design-tool file key or node ID explicitly means
“not bound”; it must never be guessed from a name or screenshot.

## 6. Accessibility standard

### Normative baseline

- Accepted public pages target **WCAG 2.2 Level AA**.
- Use semantic HTML first. Use **WAI-ARIA 1.2** only when native HTML cannot express the required
  semantics or state.
- Use the **WAI-ARIA Authoring Practices Guide (APG)** as an implementation and keyboard-pattern
  reference for custom widgets. APG examples do not replace testing or WCAG conformance.
- The internal touch-target standard is at least 44 by 44 CSS px. This intentionally exceeds WCAG
  2.2 AA Target Size (Minimum), which permits smaller targets under defined conditions.
- Accessibility requirements apply equally to shared, project-local, experimental, English, and
  Chinese surfaces. An experimental label is not an exemption.

### Required design rules

#### Perceivable

- Normal text contrast is at least 4.5:1; large text is at least 3:1.
- Meaningful non-text UI boundaries, focus indicators, and controls maintain at least 3:1 against
  adjacent colors where WCAG requires it.
- Information is never communicated by color alone.
- Meaningful images have concise contextual alternative text; decorative images use empty alt text
  or are hidden from assistive technology.
- Video with meaningful speech or sound requires captions; essential visual-only information needs
  an equivalent description or transcript.
- Content survives 200% text resizing without lost information or controls.

#### Operable

- All essential functionality works with keyboard and touch, without requiring hover, drag, or a
  path-based gesture.
- Every drag interaction, including desktop windows, has a non-drag alternative or recovery path.
- Focus order follows logical reading and action order.
- Focus is visible, is not fully obscured by sticky/fixed content, and returns to a sensible trigger
  when temporary UI closes.
- Long repeated navigation provides a skip path to main content.
- Targets are at least 44 by 44 CSS px unless a documented native-text exception is approved.
- Auto-moving, blinking, looping, or time-based content can be paused, stopped, hidden, or replaced
  by the reduced-motion mode when required.

#### Understandable

- Navigation naming and relative placement remain consistent across accepted routes.
- Controls have persistent labels; placeholder text is not the only label.
- Error messages identify the field, explain the problem, and provide a correction path. Color is
  supplemented by text and/or an icon.
- The page declares `lang="en"` or `lang="zh-CN"`; passages in another language declare their own
  language when pronunciation matters.
- Changes of context do not occur merely from focus or data entry without advance explanation.

#### Robust

- Prefer native links, buttons, inputs, `details`, headings, lists, landmarks, and dialogs.
- Custom controls expose correct accessible name, role, value/state, and relationships.
- Hidden or inert UI is absent from the tab order and accessibility tree as appropriate.
- Status updates that do not move focus use an appropriate live region or native status semantics.
- IDs, label relationships, and ARIA references remain unique and valid.

### Portfolio interaction patterns

| Pattern | Required behavior |
|---|---|
| Bookmark navigation | Native links, current location exposed, visible focus, scroll target not hidden under sticky header. |
| Language menu | Button owns expanded state; keyboard opening, directional navigation, Escape, focus return, and current-language state are exposed. |
| Floating desktop window | Non-modal dialog semantics where appropriate, accessible name, focus entry, Escape/close, focus return, bounded/recoverable position, non-drag path. |
| Mobile sheet/modal | Background inert, focus trapped, visible close control, Escape where a hardware keyboard exists, focus restored on close. |
| Accordion/disclosure | Native `details/summary` or button with `aria-expanded` and `aria-controls`; hidden content not focusable. |
| Project/evidence media | Useful alt text or explicit decorative treatment; complete inline overview before an enlarged detail view. |
| WebGL/video hero | Text and navigation remain independent of renderer success; reduced motion disables nonessential movement; fallback preserves identity and actions. |

### Verification contract

Every shared-system release requires:

1. automated semantic, duplicate-ID, and detectable contrast checks;
2. keyboard-only review of navigation, menus, dialogs, disclosures, forms, and recovery paths;
3. representative VoiceOver + Safari review on macOS/iOS;
4. representative NVDA + Chrome or Firefox review when that environment is available;
5. 320 CSS px reflow, 200% text scaling, and 400% zoom review;
6. light/current modes, high-contrast or forced-colors where supported, and reduced-motion review;
7. English and Chinese content-fit and language-announcement review;
8. a report of untested environments—absence of a test environment is not a passing result.

Automated tools cannot establish WCAG conformance alone. Any intentional exception must identify
the affected success criterion, evidence, user impact, alternative, owner decision, and review date.

## 7. Adoption sequence

1. Keep Fabrica isolated while the owner continues visual iteration.
2. Inventory accepted production foundations and classify them as shared or one-off.
3. Propose the machine-readable primitive and semantic token registry; review values before
   migration.
4. Migrate accepted non-Fabrica pages incrementally to semantic tokens with visual rollback.
5. Build the motion token and pattern catalogue as documentation and interactive learning examples.
6. Build Draft components in the isolated catalogue and review them individually before adoption.
7. Bind design-to-code IDs only after the matching design-tool components exist; promote mappings
   together with their reviewed components.
8. When Fabrica is finished, compare it against the shared system and explicitly adopt, localize,
   or reject each difference. Never merge it wholesale by implication.

## 8. References

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ARIA Authoring Practices Guide patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [Figma Code Connect](https://developers.figma.com/docs/code-connect/)
