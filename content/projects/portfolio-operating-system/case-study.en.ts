import selection from "./case-study.selection.json";

export interface PortfolioSourceLinked {
  sourceIds: string[];
}

export interface PortfolioMedia extends PortfolioSourceLinked {
  src: string;
  alt: string;
  caption: string;
  truthStatus: "Portfolio reconstruction" | "Source evidence";
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

export const portfolioCaseStudy = {
  projectId: "portfolio-operating-system",
  title: "Building a Portfolio—and the System That Keeps It Evolving",
  status: "Ongoing independent project",
  meta: {
    role: "Independent Product Designer / Designer–Builder",
    duration: "Jun 2026–Present",
    type: "Independent project",
  },
  hero: linked({
    sourceIds: ["pos-hero-01", "pos-hero-02"],
    summary: "The project began as a low-budget attempt to build a distinctive, self-maintainable portfolio with AI. It became a longer-term product problem: how could visual tools, engineering tools, content, code, and versions evolve together without losing design intent or prior decisions?",
    tools: "Google AI Studio explored visual prototypes. Claude Code and Codex handled code comprehension, differential integration, debugging, and maintenance. DeepSeek API supported part of the earlier Claude Code workflow as a lower-cost model option. GitHub preserved version state; Vercel reached a working deployment; the Cloudflare path remains unresolved.",
    outputs: [
      { label: "Experience", value: "A working spatial portfolio with a conventional Selected Work path" },
      { label: "Content", value: "Distinct responsibilities for projects, tags, assets, case studies, and site copy" },
      { label: "Evidence", value: "Independent case-study routes for three real projects in the Aug 2 system snapshot" },
      { label: "Governance", value: "Durable product boundaries, implementation records, and shared AI working rules" },
    ],
    boundary: "This is an evolving independent project. It does not yet claim verified traffic, hiring conversion, task-completion, or performance improvements.",
    media: {
      sourceIds: ["pos-hero-01"],
      src: "cover-display.webp",
      alt: "Portfolio workspace displayed on a laptop above a dark sculptural plinth",
      caption: "A presentation image of the current Portfolio workspace, used to establish the product direction. It is not a photographed device or an independent historical release.",
      truthStatus: "Portfolio reconstruction",
      width: 1448,
      height: 1086,
    } satisfies PortfolioMedia,
  }),
  diffSync: linked({
    sourceIds: ["pos-decision-01"],
    title: "From full handoffs to bounded diff sync",
    summary: "Google AI Studio could reach the intended visual atmosphere faster, while engineering tools were better at understanding the repository, components, and build constraints. The tools were complementary, but they did not naturally share one project context.",
    tension: "Passing a complete generated package preserved visual detail but could overwrite local improvements and made comparison more expensive with every version. Rewriting the result as a UI specification was safer, but flattened motion, component behavior, image relationships, and atmosphere.",
    decision: "I changed the unit of handoff. The running Next.js repository remained the current state; visual output became a candidate change; and the engineering tool first identified differences and dependencies before integrating only the approved scope.",
    methods: [
      {
        name: "Full-package handoff",
        flow: ["Visual output", "Reinterpret the page", "Overwrite risk"],
        status: "Rejected as the default",
      },
      {
        name: "Bounded synchronization",
        flow: ["Current system + candidate diff", "Impact check", "Local merge", "Verification"],
        status: "Current working method",
      },
    ],
    boundary: "Bounded diff sync describes the current working method; it is not an automated synchronization product.",
  }),
  contentModel: linked({
    sourceIds: ["pos-decision-02"],
    title: "Tags are not Projects",
    summary: "The first working version already contained the spatial workspace, tag launchers, central project folder, and identity cards. It proved the experiential direction could run—but it also exposed a structural error: early generated concepts treated About Me, HMI, AI Related, and Design System as folders or projects in a strict tree.",
    decision: "I separated reusable Tags from independent Projects. A Project owns a stable identity, public name, content, assets, and case-study narrative, and can connect to multiple Tags. Tags support interest-led discovery. The Mac OS folder remains the unfiltered route to all projects.",
    tags: ["HMI", "Design System", "AI Related"],
    project: "One independent project",
    allProjects: "Mac OS folder → All projects",
    consequence: "This model supports multiple discovery paths and independent case-study pages while preserving stable project identities for future localization and genuine historical versions.",
    media: {
      sourceIds: ["pos-decision-02"],
      src: "first-working-prototype-display.webp",
      alt: "The first working portfolio workspace with tag launchers, a central folder, and identity cards",
      caption: "First working workspace prototype, June 2026. Its interface labels, numbers, and version copy document that moment; they are not current project claims.",
      truthStatus: "Source evidence",
      width: 2554,
      height: 1384,
    } satisfies PortfolioMedia,
  }),
  product: linked({
    sourceIds: ["pos-product-01"],
    title: "The website became a product",
    summary: "Once the prototype entered Next.js, GitHub, and real deployment environments, looking correct locally was no longer enough. Visual fidelity and motion had to be evaluated alongside build health, content traceability, platform compatibility, and regression risk.",
    responsibilities: [
      { label: "Visual intent", detail: "Approved prototype direction and interaction behavior" },
      { label: "Product code", detail: "Components, types, dependencies, and build state" },
      { label: "Content & assets", detail: "Project-owned sources with stable references" },
      { label: "Git history", detail: "Version record, rollback context, and shared baseline" },
      { label: "Deployment", detail: "Vercel working; Cloudflare unresolved" },
    ],
    deployment: "Vercel has hosted a working deployment, although access from mainland China is unstable. Cloudflare was genuinely attempted and remains unresolved; it is documented as an open constraint rather than presented as a launch success.",
    versioning: "The portfolio is one living product. Minor versions continue along the main line. An archive route or historical entry only becomes justified when a real major experience has been superseded. V1/V2 entries remain future work because no public historical releases exist yet.",
  }),
  operatingSystem: linked({
    sourceIds: ["pos-os-01"],
    title: "The workflow became a Portfolio Operating System",
    summary: "Tools can change, so a rigid ‘design goes to A, development goes to B’ pipeline would not preserve continuity. The durable system is the responsibility boundary and the shared product state.",
    toolShift: "I initially used Claude Code as the primary engineering collaborator in VS Code. As Codex provided more complete workspace integration, it became the main collaborator and Claude Code shifted to a supporting role. The change did not trigger another rebuild; it pushed scattered decisions into durable system records.",
    layers: [
      {
        name: "Experience layer",
        items: ["Spatial workspace", "Windows and motion", "Conventional project paths"],
        purpose: "Demonstrates spatial organization, interaction craft, and visual judgment.",
      },
      {
        name: "Content layer",
        items: ["Project", "Tag", "Asset", "Case Study", "Global content"],
        purpose: "Lets projects, classifications, media, and narratives evolve without becoming the same entity.",
      },
      {
        name: "Governance layer",
        items: ["Portfolio OS", "Current System", "Migration plans", "Audits", "AI Working Agreement"],
        purpose: "Preserves durable boundaries, current implementation, and scoped change so the next collaborator does not restart the project.",
      },
    ],
    boundary: "Portfolio Operating System is a system-level description of this portfolio’s experience, content, and collaboration model—not a separate software product.",
  }),
  results: linked({
    sourceIds: ["pos-results-01"],
    title: "What the project proves—and what remains open",
    summary: "The outcome is not the number of AI tools involved. It is the ability to define content entities, set boundaries between visual and engineering work, protect an existing product state, distinguish evidence from inference, and turn temporary decisions into a system future collaborators can follow.",
    rows: [
      { area: "Experience", outcome: "Spatial workspace and conventional project browsing", status: "Current implementation" },
      { area: "Content", outcome: "Project–Tag relationships, project assets, and independent case studies", status: "Current implementation" },
      { area: "Collaboration", outcome: "Bounded differential integration around a Git baseline", status: "Qualified; not automated" },
      { area: "Governance", outcome: "Product boundaries, current-state records, plans, audits, and shared rules", status: "Current implementation" },
      { area: "Deployment", outcome: "Working Vercel deployment; unresolved Cloudflare route", status: "Qualified / unresolved" },
    ],
    openQuestions: [
      "Archive one verifiable AI Studio-to-repository diff and a complete handoff case.",
      "Generate and verify the final Project–Tag diagram from current structured data.",
      "Document the final deployment decision after the Cloudflare path is resolved or abandoned.",
      "Define performance, reading-behavior, and recruiting outcomes only after stable data exists.",
      "Create V1/V2 history only after a real major experience has been replaced.",
    ],
  }),
} as const;

const textUnits = 6;
const visualUnits = 8;

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
  ...portfolioCaseStudy.diffSync.sourceIds,
  ...portfolioCaseStudy.contentModel.sourceIds,
  ...portfolioCaseStudy.product.sourceIds,
  ...portfolioCaseStudy.operatingSystem.sourceIds,
  ...portfolioCaseStudy.results.sourceIds,
]);

export const portfolioSourceCoverage = (() => {
  const missingSourceIds = publishedSourceIds.filter((sourceId) => !usedSourceIds.has(sourceId));
  if (missingSourceIds.length > 0) {
    throw new Error(`Portfolio website omits publishable master units: ${missingSourceIds.join(", ")}`);
  }
  return {
    usedUnits: usedSourceIds.size,
    publishableUnits: publishedSourceIds.length,
    unitCoverage: usedSourceIds.size / publishedSourceIds.length,
  };
})();

export const caseStudyTitle = portfolioCaseStudy.title;
