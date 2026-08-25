---
name: "Diqing Wu Portfolio"
description: "A precise, authored portfolio operating system combining a spatial workspace with evidence-led project narratives."
colors:
  workspace-blue: "#2E94E3"
  warm-canvas: "#FAF7F2"
  surface-white: "#FFFFFF"
  ink: "#1A1A1A"
  heading-charcoal: "#303030"
  muted-text: "#737373"
  quiet-border: "rgba(26, 26, 26, 0.08)"
  canvas-grid: "rgba(26, 26, 26, 0.02)"
  inverse-text: "#FFFFFF"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "42px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.12em"
rounded:
  control: "8px"
  compact-surface: "12px"
  evidence-surface: "16px"
  project-card: "24px"
  pill: "9999px"
spacing:
  micro: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "40px"
  chapter: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.workspace-blue}"
    textColor: "{colors.inverse-text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  capability-chip:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.compact-surface}"
    padding: "8px 16px"
  project-card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.project-card}"
    padding: "24px"
  floating-window:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.compact-surface}"
  evidence-card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.evidence-surface}"
    padding: "24px"
---

# Design System: Diqing Wu Portfolio

## Overview

**Creative North Star: "The Portfolio Operating System"**

The portfolio behaves like a designed operating environment for professional evidence. Its
homepage is a spatial workspace: projects, capabilities, identity, windows, and tools coexist on
one warm canvas. The interface demonstrates systems thinking through organization and behavior,
not through decorative technical styling alone.

The visual voice is precise, authored, and product-oriented. Components are restrained and exact:
quiet surfaces, fine borders, clear states, selective motion, and one consistent blue accent. The
system uses a hybrid depth model. The homepage can feel layered and tactile because spatial
interaction is part of the product evidence; case-study pages become flatter, calmer, and more
editorial so project evidence leads.

This is a shared visual language, not a universal page composition. Individual projects may own
their palette, media rhythm, and narrative structure. The shared system supplies the canvas,
typography, interaction grammar, accessibility behavior, evidence surfaces, and route-level
orientation.

**Key Characteristics:**

- Warm drafting canvas with a quiet 100px grid.
- Workspace Blue used for action, focus, navigation, and active state.
- Inter for confident editorial hierarchy; JetBrains Mono for system metadata.
- Layered, draggable desktop workspace paired with conventional scrolling evidence pages.
- White surfaces, fine translucent borders, restrained shadows, and rounded geometry.
- Project-specific visual storytelling inside a consistent portfolio shell.
- Motion communicates state, hierarchy, and spatial relationship; reduced motion remains viable.

**The Evidence Leads Rule.** Interaction may establish character, but it must never obscure the
project, contribution, decision, or evidence the visitor came to evaluate.

## Colors

The core palette is warm-neutral and nearly monochromatic, with Workspace Blue providing a single
clear interactive voice. Project-local colors are permitted when they belong to the project story;
they do not automatically become global tokens.

### Primary

- **Workspace Blue:** The primary action and orientation color. Use it for interactive focus,
  capability markers, folder identity, active navigation, and selected states.

### Neutral

- **Warm Canvas:** The persistent workspace and site background. It gives the technical interface
  a human, editorial temperature.
- **Surface White:** Floating windows, cards, evidence panels, and readable foreground layers.
- **Ink:** Primary workspace text and strong dark controls.
- **Heading Charcoal:** Shared page and case-study headings; deliberately softer than pure black.
- **Muted Text:** Metadata, captions, secondary explanations, and inactive system labels.
- **Quiet Border:** Low-contrast boundaries for surfaces, tables, headers, and functional grouping.
- **Canvas Grid:** The drafting substrate. It is contextual structure, not decoration to repeat on
  every page.
- **Inverse Text:** Text and headings on dark evidence or control surfaces.

### Named Rules

**The One Blue Voice Rule.** Workspace Blue owns global interaction and focus. A project may use a
local palette inside its narrative, but it must not create a competing global action color.

**The Warm Canvas Rule.** Site-level neutral backgrounds remain warm. Pure cool gray is reserved
for project-local evidence or functional controls, not the portfolio's primary atmosphere.

**The Local Project Color Rule.** Honda neutrals, Lincoln browns, Portfolio OS blues, and other
project-specific treatments stay local until repeated evidence supports promotion.

## Typography

**Display Font:** Inter, with the system sans-serif stack as fallback
**Body Font:** Inter, with the system sans-serif stack as fallback
**Label/Mono Font:** JetBrains Mono, with the system monospace stack as fallback

**Character:** Inter provides a neutral but confident editorial voice for identity, project titles,
and long-form evidence. JetBrains Mono signals system state, taxonomy, status, file-like labels,
and compact metadata. Mono is an annotation layer, not the default reading face.

### Hierarchy

- **Display** (700, 60px, 1.04): Reserved for major page-level statements. It is available globally
  but is not mandatory on every case-study route.
- **Headline** (600, 42px, 1.1): Primary visual title role for Selected Work and case-study titles.
- **Title** (700, 32px, 1.18): Major narrative sections and project-level chapter headings.
- **Subtitle** (700, 18px, 1.45): Sub-decisions and compact section hierarchy.
- **Body** (400, 16px, approximately 1.75): Long-form explanation, usually constrained to roughly
  64–68 characters per line.
- **Label** (700, typically 9–12px, expanded tracking, often uppercase): Status, project type,
  capability tags, system labels, and navigation metadata.
- **Caption** (400, typically 12px, approximately 1.65): Evidence context, provenance, and media
  qualification.

The Workspace also uses component-local type between 8px and 20px for compact simulated-OS
controls, folder labels, cards, and window content. These sizes do not replace the page hierarchy.

### Named Rules

**The Two Voices Rule.** Sans-serif communicates the work; monospace communicates the system around
the work.

**The Semantic Independence Rule.** Heading element order and visual tier are separate decisions.
Use semantic HTML for document structure, then apply the appropriate visual role.

**The Quiet Qualification Rule.** Evidence boundaries remain legible but secondary. Use caption or
metadata roles rather than allowing caveats to compete with the primary result.

## Layout

The site uses two complementary layout systems.

The desktop homepage is a full-viewport spatial canvas beginning at the medium breakpoint. Major
objects use authored absolute positions over a 100px drafting grid. The canvas includes a left
positioning statement, right-aligned identity block, capability launchers, central project folder,
floating windows, and fixed system bars. The working area is intentionally experiential rather
than a conventional column grid.

The mobile homepage replaces absolute composition with a single reading flow. Identity and
positioning lead, the folder remains the primary visual object, capability actions become a
two-column launcher grid and horizontal sticky navigation, and windows become bottom-sheet dialogs.
Desktop and mobile therefore preserve responsibilities rather than literal geometry.

The conventional Selected Work and case-study layers use centered containers. The broadest shared
container is approximately 1280px; editorial copy is commonly constrained to 64–68ch. Outer page
padding begins at 20px, grows to 32px on small screens, and reaches 48px on large screens. Project
cards shift from one column to two at the medium breakpoint and four at extra-large widths.

Spacing is based on recurring 4px multiples, but it is semantic rather than a fully enforced token
scale. Compact controls use 8–16px internal space; cards use 16–24px; evidence clusters use 24–40px;
major case-study chapters use approximately 112px on mobile and 160px on larger screens.

### Responsive Rules

- Below 768px, replace the desktop canvas and draggable windows with linear content and modal
  bottom sheets.
- At and above 768px, enable the authored spatial canvas and desktop window system.
- Use 640px for small-screen padding, type, and selected component adjustments.
- Use 1024px for larger editorial layouts, side navigation, and wider spacing.
- Use 1280px for four-column project browsing and the broadest content compositions.
- Language-paired assets select `_EN` for English and `_CN` for Chinese; assets without a language
  suffix remain shared.
- Responsive project images prefer generated mobile WebP derivatives below 768px.
- Large diagrams and tables show a complete overview inline; detail may open in an explicit viewer.

**The Responsibility-Preserving Rule.** Responsive adaptation may change composition completely,
but it must preserve the same content relationships, actions, hierarchy, and evidence.

**The Complete Overview Rule.** Diagrams, systems, comparisons, and tables must show the whole
structure inline. Internal scrolling belongs only in an explicitly opened detail view.

## Elevation & Depth

The system uses hybrid depth. Homepage objects behave like layers on a design canvas: windows,
folder contents, hover previews, and utility cards use shadow and z-position to communicate spatial
relationship. Evidence pages are flatter. They rely primarily on tonal background, spacing, scale,
and occasional restrained shadow to distinguish figures and functional overlays.

### Shadow Vocabulary

- **Quiet Lift:** A small, diffuse shadow for capability chips, compact cards, and inactive
  workspace objects.
- **Surface Lift:** Medium ambient elevation for project thumbnails, folder layers, and hover
  summaries.
- **Window Lift:** Strong, broad elevation for floating desktop windows and active workspace
  surfaces.
- **Evidence Float:** Long, shallow shadow beneath media, tables, and selected case-study figures.
- **Modal Depth:** The strongest elevation, paired with a dark translucent backdrop for enlarged
  evidence viewers.

**The Hybrid Depth Rule.** Depth demonstrates spatial behavior on the homepage. On reading pages,
use depth only when it clarifies figure, overlay, or interaction hierarchy.

**The Active Layer Rule.** Elevation must correspond to state. Focused windows rise; hovered or
expanded objects lift; static prose remains flat.

## Shapes

The form language is softly geometric. Controls use 8px corners; most compact workspace surfaces
and windows use 12px; case-study figures and evidence panels use 16px; major project cards use 24px.
Pills and state dots use fully rounded geometry. The Mac-style folder is the signature silhouette,
combining a rectangular body, tab, stacked document, and layered cards.

Borders are fine and low contrast. They clarify function without dividing every narrative section.
Clipping is used deliberately for media cards, window shells, and the folder object. Content-heavy
pages prefer whitespace and background changes over repeated divider lines.

**The Soft Precision Rule.** Rounded corners make the system approachable, but radii stay tied to
scale: smaller controls are tighter; larger evidence and project surfaces are more generous.

## Components

Components feel restrained and precise. Their states are clear, their surfaces are quiet, and their
motion is limited to useful feedback or spatial explanation.

### Buttons

- **Primary action:** Dark Ink surface, inverse text, 8px corners, and compact 10px × 16px padding.
  Hover changes to Workspace Blue.
- **Capability chip:** White surface, fine border, 12px corners, small uppercase mono label, and a
  blue state dot. Hover changes border and text to Workspace Blue.
- **Icon action:** Usually 44px square for modal and touch-critical controls, with 12px corners.
- **Focus:** A two-pixel Workspace Blue outline with visible offset. Focus is never expressed by
  color change alone.
- **Motion:** Common state changes use approximately 200–350ms. Expressive workspace transitions use
  the authored ease `[0.16, 1, 0.3, 1]` or restrained springs.

### Chips

- Capability chips use white surfaces, mono uppercase labels, quiet borders, and Workspace Blue
  markers.
- Number and status pills are smaller annotation elements. They should not compete with primary
  actions.
- Selected states use either Workspace Blue or dark Ink with inverse text, depending on context.

### Cards / Containers

- **Project card:** 24px corners, white surface, fine border, 4:3 cover, 24px content padding, and no
  resting shadow. Hover gently scales the image rather than lifting the entire card.
- **Window project card:** 16px corners, white surface, quiet border, shallow shadow, wide image, and
  16px content padding.
- **Evidence panel:** 16px corners; white, warm neutral, or dark Ink depending on evidence role.
- **Result card:** Dark neutral surface, inverse text, prominent numeric signal, and quieter method
  and boundary notes.

### Navigation

- Desktop navigation is embedded in the workspace through capability nodes, the project folder,
  and direct Selected Work access.
- Mobile navigation becomes sticky, compact, and horizontally scrollable where capability count
  exceeds the viewport.
- Case studies use a restrained sticky header with Workspace return and project status. Portfolio OS
  additionally demonstrates a desktop section index.
- Links use native semantics and visible focus. External destinations disclose new-tab behavior to
  assistive technology.

### Floating Window

Floating windows are the signature desktop interaction. They use a 12px white shell, warm title
bar, Mac-style controls, broad shadow, focus elevation, constrained dragging, Escape-to-close, and
focus restoration. They are modeless on desktop and become modal bottom sheets on mobile.

### Project Folder

The central blue folder is the signature project-discovery object. It uses layered documents,
tilted metadata cards, depth, spring motion, and a strong blue gradient. It must remain a meaningful
route to project content, not a decorative illustration.

### Evidence Figure

Evidence figures preserve source aspect ratio, use responsive mobile/display assets, and pair media
with a concise caption. Large tables and diagrams include an explicit 44px enlarge action and a
modal detail state while retaining a complete inline overview.

### Page Templates

- **Experiential Homepage:** Full-height desktop workspace followed by conventional Selected Work
  and footer. Mobile uses an authored linear composition rather than scaled desktop coordinates.
- **Project Case Study:** Sticky return/status header, centered evidence article, project-specific
  narrative composition, complete visual overviews, and natural vertical scrolling.
- **Visual-Only Project:** Minimal route shell around one approved visual asset. It does not invent
  narrative content absent from the factual source.
- **Experiments Index:** Conventional collection surface, visually separated from professional and
  independent work.

## Do's and Don'ts

### Do:

- **Do** preserve the Workspace as the experiential front door and pair it with conventional access
  to project evidence.
- **Do** use Workspace Blue consistently for global action, focus, and active state.
- **Do** keep Inter for content and JetBrains Mono for system annotation.
- **Do** preserve project-specific visual language inside shared shell and accessibility rules.
- **Do** use spacing, background, scale, and rhythm before adding divider lines.
- **Do** expose complete diagram and table overviews before offering enlarged detail.
- **Do** support keyboard, touch, focus restoration, Escape, and reduced motion.
- **Do** keep factual content and evidence boundaries traceable to structured sources.

### Don't:

- **Don't** turn the portfolio into a generic portfolio grid or SaaS landing page.
- **Don't** use decorative complexity to hide weak project evidence or unclear contribution.
- **Don't** promote a project-local color, spacing value, or component into the global system after
  seeing it only once.
- **Don't** make monospace the default long-form reading face.
- **Don't** use shadows as decoration on flat editorial content.
- **Don't** impose one rigid case-study template on projects with different evidence needs.
- **Don't** mix `_EN` and `_CN` variants on the same localized page.
- **Don't** invent project facts, metrics, outcomes, or testimonials to complete a visual pattern.
