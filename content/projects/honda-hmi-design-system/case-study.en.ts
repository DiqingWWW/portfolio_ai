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

const systemMindmap = selection.mindmaps.find((mindmap) => mindmap.sourceUnit === "unit-031");
if (!systemMindmap) throw new Error("Honda master is missing the approved system mindmap");

export const hondaCaseStudy = {
  projectId: "honda-hmi-design-system",
  title: "Building a Unified User Experience Design System for Honda China",
  status: "Professional project",
  meta: {
    role: "Lead Product Designer",
    duration: "Jan–Jun 2024",
    tools: "Figma",
  },
  background: linked({
    sourceIds: ["unit-001", "unit-002", "unit-003", "unit-004", "unit-005"],
    promise: "This project was not simply about building a design system. It transformed HMI design decisions scattered across products, screens, and teams into reusable, scalable experience infrastructure that could continue to evolve.",
    summary: "In six months, we built the system from zero to one: a shared design language, reusable resources, cross-device rules, and a foundation for collaboration across Honda China.",
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
      { value: "45%+", label: "Design production cost and related workload reduction", note: "Combined estimate based on supplier quotations and project workload." },
      { value: "Global HQ internal sharing", label: "2024 Honda Technical Forum", note: "The project was shared through Honda's internal global-headquarters technical forum." },
    ],
  }),
  problem: linked({
    sourceIds: ["unit-006", "unit-008", "unit-012"],
    title: "The problem emerged",
    summary: "As Honda’s global digital products expanded, regional teams designed independently and gradually developed different visual standards and interaction patterns. Users faced inconsistent experiences, design assets could not be reused, and collaboration costs continued to rise. A UI audit across four launched products sampled more than 200 component instances and found that fewer than 30% had a reuse relationship—in other words, more than 70% of UI elements were repeatedly designed and implemented in each project. Breaking the issues down one by one revealed that what appeared to be different complaints from the company, teams, and users were the same four problems projected across different levels.",
    emphasis: "the same four problems projected across different levels",
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
    sourceIds: ["unit-013", "unit-015", "unit-019"],
    title: "Why this design system?",
    summary: "We studied automotive systems as well as Material Design, Ant Design, and cross-device adaptation approaches. The goal was not to imitate a mature component library. The solution itself was not new; the critical task was to trace impact back to root causes, derive measurable dimensions, and define what kind of system could address each stage efficiently in Honda’s specific context.",
    emphasis: "the critical task was to trace impact back to root causes, derive measurable dimensions, and define what kind of system could address each stage efficiently in Honda’s specific context.",
    rootCauses: [
      "No unified design language",
      "Design decisions could not be reused",
      "Knowledge depended on individual experience",
      "Interface behavior lacked shared principles",
    ],
    metrics: ["Consistency", "Efficiency", "Collaboration & Quality", "Interaction & Emotion"],
    phases: [
      { name: "Design System 1.0", focus: ["Consistency", "Efficiency", "Usability"], target: ["Build the foundation and address current pain points"] },
      { name: "Design System 2.0", focus: ["Collaboration & Quality", "Emotion"] },
    ],
    phaseRationale: "Given the project's scope of impact, urgency, and what could be validated, we chose to make substantial improvements to consistency, efficiency, and usability in Design System 1.0. Usability belongs to the Interaction & Emotion dimension and was addressed through shared foundational interaction patterns that made HMI behavior easier to understand and predict.",
  }),
  researchFoundation: linked({
    sourceIds: ["unit-021", "unit-022", "unit-023"],
    title: "Research and the foundation for design decisions",
    summary: "Before defining the system’s form, we used an internal audit, external references, key-screen validation, and scenario coverage analysis to establish a basis for the design decisions. The goal was not to apply a mature system directly, but to determine what could be borrowed and what needed to be redesigned for Honda HMI contexts.",
    studies: [
      {
        sourceIds: ["unit-021"],
        title: "1. Design-system reference research",
        text: "We first built a complete component inventory through an internal audit, then reviewed automotive and other cross-platform design systems. The research clarified three points: no existing system could directly fit Honda’s HMI context; token architecture and component organization could be borrowed but needed automotive-specific adaptation; and the choice between two-tier and three-tier token architectures needed to be tested in practice.",
        keyTakeaways: [
          "No existing system could directly fit Honda’s HMI context.",
          "Token architecture and component organization could be borrowed, but needed automotive-specific adaptation.",
          "Two-tier and three-tier token architectures needed to be tested before making a decision.",
        ],
      },
      {
        sourceIds: ["unit-022"],
        title: "2. Validate the Home screen first",
        text: "Before building components at scale, we first confirmed the final visual direction of the Home screen. Home was both the most frequently encountered screen and the clearest concentration of the system’s visual language. Once its visual direction passed internal review and received brand approval, it could serve as the baseline for deriving and validating component styles.",
      },
      {
        sourceIds: ["unit-023"],
        title: "3. Component-selection methodology",
        text: "The component scope was not copied from an existing library. It was determined through audit, scenario coverage, and external references, balancing coverage of core HMI scenarios against system scale and maintenance cost.",
        steps: [
          { step: "Step 1", title: "Audit existing components", description: "Inventory components across current products and projects to identify repetition, variation, and gaps." },
          { step: "Step 2", title: "Analyze scenario coverage", description: "Use frequent tasks, screen formats, and vehicle configurations to determine which real scenarios the components needed to cover." },
          { step: "Step 3", title: "Supplement with external references", description: "Use automotive and cross-platform systems to identify patterns missing from the internal sample without copying them directly." },
        ],
      },
    ],
  }),
  solution: linked({
    sourceIds: ["unit-025", "unit-026", "unit-027", "unit-028", "unit-029", "unit-031", "unit-037", "unit-038", "unit-039", "unit-040", "unit-041", "unit-042", "unit-045"],
    title: "Three decisions defined the system’s fundamental form",
    summary: "The decisive choices were whether to invent or extract the visual language, whether a third token layer justified its governance cost, and whether components should serve fixed screens or encode future adaptation.",
    decisions: [
      {
        sourceIds: ["unit-027", "unit-028", "unit-029"],
        title: "1. Extract the visual language from the brand",
        text: "Rather than inventing a style from scratch, we extracted twilight violet, the coexistence of rounded and sharp geometry, and a sense of light from the Honda 0 Series direction. The icon breakpoint concept treats an icon as a three-dimensional object and places breaks where light would cast a shadow. After internal review, the concept was extended across the system’s visual design.",
        media: [
          { sourceIds: ["unit-028"], src: "visual-language_EN-display.webp", alt: "Brand color and atmosphere exploration", caption: "Brand qualities translated into reusable visual parameters." },
          { sourceIds: ["unit-029"], src: "logo-and-icons_EN-display.webp", alt: "Logo and icon construction language", caption: "Geometry, light, and supplier input connected through one construction logic." },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-031", "unit-037", "unit-038", "unit-039"],
        title: "2. Build a robust and flexible design-system architecture",
        text: "The architecture connects the HMI Interaction Framework, Design Philosophy, and Design Platform. Inside the platform, a Global → Style → Semantic token hierarchy manages foundational values, themes, gradients, and stable design intent. The extra layer increased governance cost, but made Honda’s gradient-heavy visual language maintainable.",
        mindmap: systemMindmap.tree,
        media: [
          { sourceIds: ["unit-039"], src: "tokens-and-components_EN-display.webp", alt: "Three-tier tokens and component system", caption: "Global, Style, and Semantic Tokens connected to component scope and documentation." },
        ] satisfies HondaMedia[],
      },
      {
        sourceIds: ["unit-040", "unit-041", "unit-042", "unit-045"],
        title: "3. Use nested Auto Layout to create room for adaptation",
        text: "Nested Auto Layout and constraints allowed components to respond to landscape and portrait screens, irregular displays, product configurations, and languages. This added construction cost before it was strictly required, but later enabled the same structures to support changing containers and broader mobility scenarios.",
        media: [
          { sourceIds: ["unit-041"], src: "responsive-theme-adaptation.gif", alt: "Component adapting across size, layout, and theme", caption: "Interactive prototype showing size, layout, and theme adaptation; not production software evidence." },
          { sourceIds: ["unit-042"], src: "vehicle-language-adaptation.gif", alt: "Component adapting across vehicle configuration and language", caption: "Interactive prototype showing configuration and language adaptation; not proof that every vehicle shipped it." },
          { sourceIds: ["unit-045"], src: "design-to-code_EN-display.webp", alt: "Design-to-code collaboration proposal", caption: "Token JSON, versioning, and usage checks organized into one design-to-development chain." },
        ] satisfies HondaMedia[],
      },
    ],
  }),
  validation: linked({
    sourceIds: ["unit-017", "unit-046", "unit-047", "unit-048", "unit-049", "unit-050", "unit-058", "unit-059", "unit-060", "unit-061"],
    title: "Validation and project impact",
    summary: "Each root cause maps to a Success Metric, which then expands into detailed measures, methods, evidence status, and improvement. The first phase retained two directional ROI records; the remaining dimensions still require continuous audit and user research. The team’s way of working shifted accordingly: from rebuilding to composing — designers no longer start from a blank canvas, but assemble experiences from existing building blocks.",
    metricFramework: [
      { metric: "Consistency", definition: "Measure improvement in brand and interaction consistency", method: "Visual audit · cross-product sampling · usability research", status: "Method defined; complete data pending" },
      { metric: "Efficiency", definition: "Measure whether design and development production efficiency improved", method: "Component instances · delivery records · effort comparison", status: "85%+ reuse and 45%+ related effort estimates available" },
      { metric: "Collaboration & Quality", definition: "Measure team collaboration and output quality", method: "Adoption records · design–development match · governance checks", status: "Method defined; complete data pending" },
      { metric: "Interaction & Emotion", definition: "Measure the overall user experience", method: "Task tests · CSAT/NPS · error and trust measures", status: "Method defined; complete data pending" },
    ],
    results: [
      {
        value: "30%→85%+",
        label: "Component reuse",
        method: "From below 30% at the start of the project to 85%+ after manually sampling at least 15 core pages in each project; weighted manually.",
        boundary: "Estimated ±5–10% manual error.",
      },
      {
        value: "45%+ ↑",
        label: "Reduction in design production cost and related workload",
        method: "Supplier quotation and project-effort comparison: approximately 7–8 person-days before versus 3–4 after.",
        boundary: "Combined estimate based on supplier quotations and project workload.",
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
    closing: "I built scalable HMI experience infrastructure by transforming design knowledge into a systematic framework—not just a component library, but a decision-making system: 1.0 established order and used standardization for efficiency, while 2.0 moves toward experience intelligence and organizational capability—helping teams move faster while maintaining experience quality.",
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
