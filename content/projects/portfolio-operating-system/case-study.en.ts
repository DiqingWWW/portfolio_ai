import selection from "./case-study.selection.json";

export interface PortfolioSourceLinked {
  sourceIds: string[];
}

export interface PortfolioMedia extends PortfolioSourceLinked {
  src: string;
  alt: string;
  caption: string;
  truthStatus: "Portfolio reconstruction" | "Source evidence" | "Current implementation";
  width: number;
  height: number;
}

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends PortfolioSourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Portfolio website content references missing source unit: ${sourceId}`);
    }
  }
  return value;
}

function media(value: PortfolioMedia): PortfolioMedia {
  return linked(value);
}

export const portfolioCaseStudy = {
  projectId: "portfolio-operating-system",
  title: "Building a Portfolio—and the System That Keeps It Evolving",
  status: "Ongoing independent project",
  meta: {
    role: "Independent Product Designer / Design Engineer",
    duration: "June 2026 – present",
    type: "Independent project",
  },
  hero: linked({
    sourceIds: ["pos-hero-01", "pos-hero-02"],
    summary: "The project began as a low-cost attempt: using AI to build a distinctive, self-maintainable portfolio. At first I thought the question was simply “which AI builds the best website,” and the workflow was linear: a visual AI generates a full page, hands the whole package over, and an engineering AI re-implements it. The real challenge quickly became: how do multiple tools collaborate around one long-lived product without losing visual intent, engineering context, content relationships, and decisions already made?",
    tools: "Google AI Studio for visual exploration; Claude Code and Codex for code understanding, diff integration, debugging, and maintenance; DeepSeek API as a lower-cost model option for part of the early Claude Code workflow; GitHub for version state; Vercel for a working deployment; the Cloudflare path remains unresolved.",
    outputs: [
      { label: "Experience", value: "A working spatial portfolio with a conventional selected-work browsing path" },
      { label: "Content", value: "Projects, tags, assets, case studies, and site copy each with distinct responsibilities" },
      { label: "Evidence", value: "Three real projects with dedicated case-study pages in the August 2 system snapshot" },
      { label: "Governance", value: "Persistent product boundaries, implementation records, and shared AI working rules" },
    ],
    boundary: "This is an ongoing independent project; it does not claim verified traffic, hiring conversion, task completion, or performance gains.",
    media: {
      sourceIds: ["pos-hero-01"],
      src: "cover-display.webp",
      alt: "Portfolio Workspace displayed on a laptop with a dark sculptural base below",
      caption: "A presentation image of the current portfolio Workspace used to establish product direction. It is not a photographed device, nor an independent historical version.",
      truthStatus: "Portfolio reconstruction",
      width: 1448,
      height: 1086,
    } satisfies PortfolioMedia,
  }),
  actOne: linked({
    sourceIds: ["pos-iteration-01", "pos-iteration-02", "pos-iteration-03", "pos-iteration-04"],
    title: "Act One · Generation｜AI produced the starting point, but not the priority",
    summary: "Under prompt constraints, AI Studio produced a recognizable Workspace concept: the Folder, capability tags, identity card, and canvas metaphor all appeared. But the result cared more about how rich the elements were than about information priority—AI produced a “complete-looking interface,” and complete is not the same as correct.",
    draft: {
      title: "First draft: the prompt generated a concept, not a priority order",
      text: "On desktop, the Folder, capability tags, identity block, and decorative cards carried similar visual weight; on mobile, the entries were simply stacked in sequence without reorganizing the browsing path.",
      media: [
        media({
          sourceIds: ["pos-iteration-01"],
          src: "iteration-01-prompt-draft-desktop.jpg",
          alt: "Prompt-generated first draft (desktop)",
          caption: "The prompt-driven desktop draft from June 2026, from real Git commit e10d73c.",
          truthStatus: "Source evidence",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-01"],
          src: "iteration-01-prompt-draft-mobile.jpg",
          alt: "Prompt-generated first draft (mobile)",
          caption: "The prompt-driven mobile draft from June 2026: entries stacked in sequence without reorganizing the browsing path.",
          truthStatus: "Source evidence",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    critique: {
      title: "Critique: turning vague unease into an actionable list of problems",
      text: "I ran an Impeccable-assisted critique as a diagnostic layer, turning vague unease into locatable, reproducible problems. It surfaced: the Folder, capability tags, identity block, and decorative cards competed for visual weight without a clear primary–secondary relationship; the Explore canvas read as environment decoration; and on mobile, four equal-weight capability cards consumed the first viewport while the real project entry fell below the fold.",
      note: "AI produced the critique; I decided which recommendations were appropriate. I evaluated Impeccable's findings, rejected suggestions that would weaken the Workspace concept, and implemented the changes that improved hierarchy, spacing, typography, responsive behavior, and interaction clarity—Impeccable was a diagnostic layer, not an automatic redesign.",
      media: [
        media({
          sourceIds: ["pos-iteration-02"],
          src: "iteration-02-critique-desktop.jpg",
          alt: "Critique annotation (desktop)",
          caption: "Desktop critique annotation: similar visual weight, no clear primary–secondary entry, Explore canvas reads as decoration. Annotations overlay the real draft without modifying the underlying page.",
          truthStatus: "Source evidence",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-02"],
          src: "iteration-02-critique-mobile.jpg",
          alt: "Critique annotation (mobile)",
          caption: "Mobile critique annotation: four equal-weight capability cards consume the first viewport, pushing the project Folder below the fold.",
          truthStatus: "Source evidence",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    refined: {
      title: "Refinement: rebuilding hierarchy around the project-discovery path",
      text: "The Folder became the primary visual object on the first screen, an explicit View selected work entry was added, the conventional scrolling project list was kept as a second path, capability tags receded to secondary classification, and the contrast of the background typography and supporting cards was rebalanced. This Before / After demonstrates four design judgments: visual hierarchy, information architecture, responsive adaptation, and cognitive-load reduction.",
      note: "Narrative guideline: do not write “Impeccable redesigned the website”; the accurate framing is—An Impeccable-assisted critique exposed hierarchy and responsive-structure problems. I selected the relevant findings and rebuilt the project-discovery flow around a primary workspace entry, an explicit selected-work path, and a lower-density mobile navigation.",
      media: [
        media({
          sourceIds: ["pos-iteration-03"],
          src: "iteration-03-refined-desktop.jpg",
          alt: "Refined version (desktop)",
          caption: "Refined desktop: the Folder stays as the first-screen core, a View selected work entry is added, and capability tags recede to secondary.",
          truthStatus: "Current implementation",
          width: 1280,
          height: 720,
        }),
        media({
          sourceIds: ["pos-iteration-03"],
          src: "iteration-03-refined-mobile.jpg",
          alt: "Refined version (mobile)",
          caption: "Refined mobile: the Folder moves to the first screen, the four large capability cards are removed, and capability classification becomes a compact horizontal sticky navigation.",
          truthStatus: "Current implementation",
          width: 720,
          height: 1280,
        }),
      ] satisfies PortfolioMedia[],
    },
    windows: {
      title: "Unification: the window visual language, from inconsistent to consistent",
      text: "The windows opened by early tag interactions had almost no unified visual language: window proportions, title bars, close controls, and stacking behavior each went their own way. Improvements include restoring near-original title-bar proportions, removing an accidental blue outline, unifying the red–yellow–green control spacing, promoting the Window to a full-page overlay on mobile, and allowing dismissal only through the close button or a specified area outside the window.",
      note: "Decorative elements receded while functional content gained priority—contrast was rebalanced according to content priority, not simply “improved.”",
      media: [
        media({
          sourceIds: ["pos-iteration-04"],
          src: "iteration-04-windows-before.png",
          alt: "Early tag-opened windows with inconsistent visuals",
          caption: "Early windows opened from tags: proportions, title bars, and close controls each went their own way.",
          truthStatus: "Source evidence",
          width: 2582,
          height: 1734,
        }),
        media({
          sourceIds: ["pos-iteration-04"],
          src: "iteration-04-windows-after.png",
          alt: "Current unified window visual language",
          caption: "Current window visuals: title-bar proportions, control spacing, close interaction, and stacking model are unified.",
          truthStatus: "Current implementation",
          width: 2582,
          height: 1734,
        }),
      ] satisfies PortfolioMedia[],
    },
  }),
  actTwo: linked({
    sourceIds: ["pos-decision-01", "pos-decision-02", "pos-product-01"],
    title: "Act Two · Maintenance｜The website was more than a page",
    summary: "When the visual results had to become a maintainable website, the real challenge appeared: the best visual tool was not the best engineering tool. I moved from full-package handoff to bounded diff sync, separated reusable tags from independent projects, and let engineering reality reshape the design judgment loop.",
    diffSync: {
      title: "Decision 1: from full-package handoff to bounded diff sync",
      text: "Google AI Studio reaches a target visual atmosphere faster, while engineering tools are better at understanding file structure, modifying components, and validating the project. Handing over the entire generated package preserves visual detail but risks overwriting local edits and inflating version-comparison cost; a pure UI spec describes type, color, and spacing but tends to lose complex components, motion, image relationships, and overall atmosphere.",
      decision: "I changed the unit of handoff: the running Next.js project remains the current state; the visual tool's output is a candidate change; the engineering tool first identifies the diff and tracks dependencies, then syncs only the parts confirmed to change.",
      flows: [
        { name: "Full-package handoff", steps: ["Visual output", "Re-interpret whole page", "Overwrite risk"], status: "No longer the default" },
        { name: "Bounded diff sync", steps: ["Current system + candidate diff", "Impact check", "Local merge", "Verify"], status: "Current workflow" },
      ],
      boundary: "Bounded diff sync describes the current working method, not an automated sync product.",
    },
    contentModel: {
      title: "Decision 2: Tags are not Projects",
      text: "The first working version already included a spatial workspace, tag launchers, a central project folder, and an identity card. It proved the experience direction could run, but it also exposed a structural problem: the early generated concept treated entries like About Me, HMI, AI Related, and Design System as folders or projects in a strictly tree-shaped taxonomy.",
      decision: "I separated reusable tags from independent projects. A project has a stable identity, public display name, content, assets, and case-study narrative, and can connect to multiple tags. Tags support interest-based discovery. The Mac OS folder remains a filter-free entry to all projects.",
      media: {
        sourceIds: ["pos-decision-02"],
        src: "first-working-prototype-display.webp",
        alt: "First working portfolio Workspace with tag launchers, central folder, and identity card",
        caption: "The first working Workspace prototype from June 2026. Its labels, numbers, and version text record the state at that time, not current project claims.",
        truthStatus: "Source evidence",
        width: 2554,
        height: 1384,
      } satisfies PortfolioMedia,
    },
    product: {
      title: "The website became a product: engineering reality reshaped the design judgment loop",
      text: "Once the prototype entered Next.js, GitHub, and a real deployment environment, “looks fine locally” no longer meant “can be published, maintained, and evolved.” Build health, content traceability, platform compatibility, and regression risk forced the design loop to expand from “does the page look right” to “can this experience be maintained.”",
      versioning: "The portfolio is a living product: minor versions keep updating along the main line; only a real major version that replaces the current experience justifies an archive route or a separate entry.",
      deployment: "Vercel has hosted a working deployment, but access from mainland China is unstable. The Cloudflare path was genuinely attempted and remains unresolved; it is kept as an open constraint, not presented as a successful launch.",
    },
  }),
  actThree: linked({
    sourceIds: ["pos-os-01", "pos-results-01"],
    title: "Act Three · System｜Each update does not start from zero",
    summary: "The tools I use will continue to change, so what needs to be stable is not a fixed “design goes to A, development goes to B” split, but responsibility boundaries and shared product state. A new tool joining did not trigger another rebuild; it pushed me to persist the judgments scattered across conversations and code into layered records.",
    operatingSystem: {
      title: "Decision 3: from workflow to Portfolio Operating System",
      text: "The experience layer lets the website itself prove spatial organization, interaction, and visual judgment; the content layer lets projects, categories, media, and narratives evolve independently; the governance layer preserves long-term boundaries, current state, and scoped changes so the next AI does not have to re-interpret the whole project.",
      boundary: "The Portfolio Operating System is not a standalone software product; it is a systematic description of the current portfolio experience, content, and collaboration model.",
      mindmap: selection.mindmaps.find((mindmap) => mindmap.sourceUnit === "pos-os-01")?.tree ?? null,
    },
    results: {
      title: "What this project proves, and what remains open",
      summary: "The outcome is not about how many AI tools were used, but about defining content entities, drawing boundaries between visual and engineering work, protecting existing product state, distinguishing evidence from inference, and turning ad-hoc decisions into a system that future collaborators can follow.",
      rows: [
        { area: "Experience", outcome: "Spatial Workspace and conventional project browsing", status: "Current implementation" },
        { area: "Content", outcome: "Project–tag relationships, project assets, and dedicated case studies", status: "Current implementation" },
        { area: "Collaboration", outcome: "Bounded diff integration around a Git baseline", status: "Qualified; not yet automated" },
        { area: "Governance", outcome: "Product boundaries, current-state records, plans, audits, and shared rules", status: "Current implementation" },
        { area: "Deployment", outcome: "Working Vercel deployment; Cloudflare path unresolved", status: "Qualified / unresolved" },
      ],
      openQuestions: [
        "Archive a verifiable AI Studio-to-repo diff and a full-handoff case.",
        "Generate and verify the final project–tag relationship diagram from current structured data.",
        "Record the final deployment decision once the Cloudflare path is resolved or dropped.",
        "Define performance, reading-behavior, and hiring outcomes only after stable data exists.",
        "Create V1/V2 history only after a real major experience is replaced.",
      ],
    },
  }),
} as const;

const textUnits = 3;
const visualUnits = 9;

export const portfolioContentBalance = (() => {
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) {
    throw new Error("Portfolio case study must remain at least 50% visual content");
  }
  return { textUnits, visualUnits, visualShare };
})();

const publishedSourceIds = selection.units
  .filter((unit) => unit.selection === "core" || unit.selection === "supporting" || unit.selection === "simplify")
  .map((unit) => unit.id);
const usedSourceIds = new Set([
  ...portfolioCaseStudy.hero.sourceIds,
  ...portfolioCaseStudy.actOne.sourceIds,
  ...portfolioCaseStudy.actTwo.sourceIds,
  ...portfolioCaseStudy.actThree.sourceIds,
]);

export const portfolioSourceCoverage = (() => {
  const missingSourceIds = publishedSourceIds.filter((sourceId) => !usedSourceIds.has(sourceId));
  if (missingSourceIds.length > 0) {
    throw new Error(`Portfolio website misses publishable master units: ${missingSourceIds.join(", ")}`);
  }
  return {
    usedUnits: usedSourceIds.size,
    publishableUnits: publishedSourceIds.length,
    unitCoverage: usedSourceIds.size / publishedSourceIds.length,
  };
})();

export const caseStudyTitle = portfolioCaseStudy.title;
