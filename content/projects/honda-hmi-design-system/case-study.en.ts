import selection from "./case-study.selection.json";

export interface SourceLinked {
  sourceIds: string[];
}

export interface HondaMedia extends SourceLinked {
  src: string;
  alt: string;
  caption: string;
}

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends SourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Honda website content references missing source unit: ${sourceId}`);
    }
  }
  return value;
}

const systemMindmap = selection.mindmaps.find((mindmap) => mindmap.sourceUnit === "unit-032");
if (!systemMindmap) throw new Error("Honda master is missing the approved system mindmap");

export const hondaCaseStudy = {
  projectId: "honda-hmi-design-system",
  title: "Building Honda’s Global Unified User Experience Design System",
  status: "Professional project",
  meta: {
    role: "Lead Product Designer",
    duration: "Jan–Jun 2024",
    tools: "Figma · FigJam · Notion",
  },
  background: linked({
    sourceIds: ["unit-001", "unit-002", "unit-003", "unit-004", "unit-005"],
    promise: "The project was not about building a larger component library. It transformed HMI design decisions scattered across products, screens, and teams into reusable, scalable experience infrastructure that could continue to evolve.",
    summary: "In six months, we built the system from zero to one: a shared design language, reusable resources, cross-device rules, and a foundation for global collaboration.",
    covers: [
      {
        sourceIds: ["unit-003"],
        src: "cover1-display.webp",
        alt: "Final HMI interface combining driving, navigation, and media",
        caption: "Three high-frequency tasks organized through one HMI visual and component language. Approved professional project material; not standalone proof of production release.",
      },
      {
        sourceIds: ["unit-004"],
        src: "cover2-display.webp",
        alt: "Final HMI interface focused on driving and navigation",
        caption: "A focused driving-and-navigation composition used as both cover and final-experience evidence. Approved professional project material.",
      },
    ] satisfies HondaMedia[],
    achievements: [
      { value: "6 months", label: "System built from zero to one", note: "Project record; exact organizational scope remains to be verified." },
      { value: "85%+", label: "Component reuse", note: "Manual samples across three in-vehicle projects; estimated ±5–10% error." },
      { value: "45%+", label: "Related effort reduction", note: "Estimate based on supplier quotations and project effort; not total R&D cost." },
      { value: "Global sharing", label: "Conference and forum presentations", note: "Sharing is recorded; adoption scope cannot be publicly verified." },
    ],
  }),
  problem: linked({
    sourceIds: ["unit-006", "unit-008", "unit-012"],
    title: "The inconsistency was no longer a visual issue",
    summary: "The same systemic problems appeared differently at company, team, and user levels. Together they affected experience quality, organizational efficiency, brand perception, and ultimately business performance.",
    impacts: [
      { stakeholder: "Company", points: ["Rising cost", "Inconsistent brand expression", "Slower strategic response"] },
      { stakeholder: "Team", points: ["Repeated production", "Alignment and rework", "Quality dependent on individuals"] },
      { stakeholder: "User", points: ["Higher learning cost", "Fragmented behavior", "Lower confidence and trust"] },
    ],
    impactMatrix: [
      { dimension: "Efficiency", company: "Uncontrolled cost", team: "Repeated reinvention", user: "Slower feature delivery" },
      { dimension: "Consistency", company: "Fragmented brand expression", team: "Inconsistent design output", user: "Higher learning cost" },
      { dimension: "Collaboration & Quality", company: "Slower strategic response", team: "Alignment and rework cost", user: "Unstable experience quality" },
      { dimension: "Interaction & Emotion", company: "Retention and satisfaction risk", team: "Design value is difficult to measure", user: "Lower confidence and trust" },
    ],
    dimensions: [
      { name: "Consistency", purpose: "Unify brand and interaction experience" },
      { name: "Efficiency", purpose: "Reduce repeated production" },
      { name: "Collaboration & Quality", purpose: "Replace individual interpretation with shared standards" },
      { name: "Interaction & Emotion", purpose: "Reduce comprehension cost and establish trust" },
    ],
  }),
  analysis: linked({
    sourceIds: ["unit-013", "unit-015", "unit-020"],
    title: "The system goals were derived, not declared",
    summary: "We studied automotive systems as well as Material Design, Ant Design, and cross-device adaptation approaches. The goal was not to imitate a mature library, but to trace impact back to root causes, derive measurable dimensions, and decide what each stage should solve.",
    rootCauses: [
      "No unified design language",
      "Design decisions could not be reused",
      "Knowledge depended on individual experience",
      "Interface behavior lacked shared principles",
    ],
    metrics: ["Consistency", "Efficiency", "Collaboration & Quality", "Interaction & Emotion"],
    phases: [
      { name: "Design System 1.0", focus: ["Consistency", "Efficiency", "Usability"] },
      { name: "Design System 2.0", focus: ["Collaboration & Quality", "Emotion"] },
    ],
  }),
  solution: linked({
    sourceIds: ["unit-026", "unit-027", "unit-028", "unit-029", "unit-030", "unit-032", "unit-038", "unit-039", "unit-040", "unit-041", "unit-042", "unit-043", "unit-046"],
    title: "Three decisions defined the system’s shape and ceiling",
    summary: "The decisive choices were whether to invent or extract the visual language, whether a third token layer justified its governance cost, and whether components should serve fixed screens or encode future adaptation.",
    decisions: [
      {
        sourceIds: ["unit-028", "unit-029", "unit-030"],
        title: "1. Extract the visual language from the brand",
        text: "Rather than inventing a style from scratch, we extracted twilight violet, the coexistence of rounded and angular geometry, and a sense of light from the Honda 0 Series direction. The icon breakpoint concept came from an external supplier and was adopted after internal review; its authorship and incomplete coverage remain explicit.",
        media: [
          { sourceIds: ["unit-029"], src: "visual-language_EN-display.webp", alt: "Brand color and atmosphere exploration", caption: "Brand qualities translated into reusable visual parameters." },
          { sourceIds: ["unit-030"], src: "logo-and-icons_EN-display.webp", alt: "Logo and icon construction language", caption: "Geometry, light, and supplier input connected through one construction logic." },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-032", "unit-038", "unit-039", "unit-040"],
        title: "2. Build a system architecture, not only a library",
        text: "The architecture connects the HMI Interaction Framework, Design Philosophy, and Design Platform. Inside the platform, a Global → Style → Semantic token hierarchy manages foundational values, themes, gradients, and stable design intent. The extra layer increased governance cost, but made Honda’s gradient-heavy visual language maintainable.",
        mindmap: systemMindmap.tree,
        media: [
          { sourceIds: ["unit-040"], src: "tokens-and-components_EN-display.webp", alt: "Three-tier tokens and component system", caption: "Global, Style, and Semantic Tokens connected to component scope and documentation." },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-041", "unit-042", "unit-043", "unit-046"],
        title: "3. Encode adaptation rules before they became urgent",
        text: "Nested Auto Layout and constraints allowed components to respond to landscape and portrait screens, irregular displays, product configurations, and languages. This added construction cost before it was strictly required, but later enabled the same structures to support changing containers and broader mobility scenarios.",
        media: [
          { sourceIds: ["unit-042"], src: "responsive-theme-adaptation.gif", alt: "Component adapting across size, layout, and theme", caption: "Interactive prototype showing size, layout, and theme adaptation; not production software evidence." },
          { sourceIds: ["unit-043"], src: "vehicle-language-adaptation.gif", alt: "Component adapting across vehicle configuration and language", caption: "Interactive prototype showing configuration and language adaptation; not proof that every vehicle shipped it." },
          { sourceIds: ["unit-046"], src: "design-to-code_EN-display.webp", alt: "Design-to-code collaboration proposal", caption: "Token JSON, versioning, and usage checks organized into one design-to-development chain." },
        ] satisfies HondaMedia[],
      },
    ],
  }),
  validation: linked({
    sourceIds: ["unit-017", "unit-047", "unit-048", "unit-049", "unit-050", "unit-058", "unit-059", "unit-060", "unit-061"],
    title: "Validation tested the problem structure—not just the output",
    summary: "Each root cause maps to a Success Metric, which then expands into detailed measures, methods, evidence status, and improvement. The first phase retained two directional ROI records; the remaining dimensions still require continuous audit and user research.",
    metricFramework: [
      { metric: "Consistency", method: "Visual audit · cross-product sampling · usability research", status: "Method defined; complete data pending" },
      { metric: "Efficiency", method: "Component instances · delivery records · effort comparison", status: "85%+ reuse and 45%+ related effort estimates available" },
      { metric: "Collaboration & Quality", method: "Adoption records · design–development match · governance checks", status: "Method defined; complete data pending" },
      { metric: "Interaction & Emotion", method: "Task tests · CSAT/NPS · error and trust measures", status: "Method defined; unverified NPS claim excluded" },
    ],
    results: [
      {
        value: "85%+",
        label: "Component reuse",
        method: "Three launched in-vehicle projects; 15+ core pages sampled per project; manual weighted count.",
        boundary: "Estimated ±5–10% manual error. Raw records still need archiving.",
      },
      {
        value: "45%+",
        label: "Design production and related collaboration effort reduction",
        method: "Supplier quotation and project-effort comparison: approximately 7–8 person-days before versus 3–4 after.",
        boundary: "Directional estimate only; it cannot be extrapolated to total engineering cost.",
      },
    ],
    roadmap: [
      {
        phase: "1.0",
        status: "Delivered foundation",
        summary: "The first stage focused on consistency, efficiency, and usability—the urgent foundations that could be validated within the project window.",
        scope: "Unified design language · Design Tokens · reusable components and patterns · foundational Interaction Patterns · clear usage guidance",
      },
      {
        phase: "2.0",
        status: "Planned",
        summary: "A future stage for capabilities that depend on longer-term organizational adoption and experience maturity.",
        scope: "Design governance · review and feedback systems · brand expression · Motion System · accessibility",
      },
    ],
    closing: "I built scalable HMI experience infrastructure by transforming design knowledge into a systematic framework—not just a component library, but a decision-making system that helps teams move faster while maintaining quality across a mobility ecosystem.",
  }),
} as const;

function countTextUnits() {
  return 2 + 1 + 1 + 2 + hondaCaseStudy.solution.decisions.length + 2;
}

function countVisualUnits() {
  return hondaCaseStudy.background.covers.length
    + 1
    + 1
    + 1
    + hondaCaseStudy.solution.decisions.reduce((total, decision) => total + (decision.media?.length ?? 0) + ("mindmap" in decision ? 1 : 0), 0)
    + 3;
}

export const hondaContentBalance = (() => {
  const textUnits = countTextUnits();
  const visualUnits = countVisualUnits();
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) throw new Error("Honda case study must remain at least 50% visual content");
  return { textUnits, visualUnits, visualShare };
})();

export const caseStudyTitle = hondaCaseStudy.title;
