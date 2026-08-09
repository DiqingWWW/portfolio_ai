import selection from "./case-study.selection.json";

type SourceLinked = { sourceIds: readonly string[] };

export type LincolnMedia = SourceLinked & {
  src: string;
  alt: string;
  caption: string;
  truthStatus: string;
};

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends SourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Lincoln case study references unknown source unit: ${sourceId}`);
    }
  }
  return value;
}

function media(value: LincolnMedia): LincolnMedia {
  return linked(value);
}

export const lincolnCaseStudy = {
  projectId: "lincoln-text-expression",
  projectName: "The Lincoln Way",
  title: "Optimizing Mobile Text Input and Information Expression",
  status: "Professional project · shipped with qualified evidence",
  hero: linked({
    sourceIds: ["lincoln-001", "lincoln-002", "lincoln-003"],
    proposition: "Text rules should be defined by the task the content performs—not by the field name or component style.",
    context: "The Lincoln Way is Lincoln’s mobile application for vehicle status, community communication, related purchases, and official owner services. In August 2022, I worked as the sole UX designer within the external partner’s scope, covering requirements analysis, competitive research, text-rule definition, interaction design, and design specifications. The client product lead reviewed and approved the work.",
    evidenceBoundary: "The seven primary screenshots show the application’s current shipped experience. Some details differ from the August 2022 delivery; they therefore evidence observable tasks and states, while authorship is limited to the confirmed responsibilities, rules, and implementation scope.",
    cover: media({
      sourceIds: ["lincoln-001"],
      src: "cover.png",
      alt: "The Lincoln Way vehicle-owner application shown in a phone mockup",
      caption: "Portfolio presentation mockup using the current vehicle-binding entry experience.",
      truthStatus: "Presentation asset; current product screen shown inside a portfolio mockup.",
    }),
    meta: [
      { label: "Role", value: "Sole UX Designer · external partner" },
      { label: "Duration", value: "Approximately one month" },
      { label: "Scope", value: "Research · rules · interaction · specifications" },
    ],
    outcomes: [
      { label: "Confirmed contribution", value: "Rules and interaction specifications", note: "Name, nickname, VIN, post-body, counting, and interaction guidance." },
      { label: "Approval", value: "Client product lead", note: "Core rules were approved and implemented; some overflow and body/topic details were only partially implemented." },
      { label: "Evidence boundary", value: "No post-launch analytics access", note: "No completion, efficiency, or conversion uplift is presented as an achieved result." },
    ],
    archetypes: [
      { name: "Controlled short text", examples: "Name · nickname", property: "Short, concentrated rules, low editing cost", question: "Should invalid input be prevented, and how should the exact rule be explained?" },
      { name: "Structured unique identifier", examples: "VIN", property: "One answer, strict length and character set", question: "How can input accuracy and final validation be improved?" },
      { name: "Open long text", examples: "Post body", property: "No single answer, high user investment, shared allowances", question: "Should excess content be preserved, and how should state, consequence, and recovery be expressed?" },
    ],
    dimensions: ["Content structure", "Length and editing cost", "Answer certainty", "Downstream visibility", "Failure consequence", "Cross-object coupling"],
  }),
  identityEvidence: linked({
    sourceIds: ["lincoln-004", "lincoln-005", "lincoln-006"],
    title: "The profile reveals where apparently similar fields diverge",
    summary: "Name and nickname both use a 14-unit limit, but they do not carry the same content responsibility. Name is not displayed externally; nickname becomes the visible identity across product surfaces.",
    media: [
      media({ sourceIds: ["lincoln-004"], src: "profile-overview.png", alt: "Current profile page showing name and nickname fields", caption: "Name and nickname share one profile surface and the same numeric limit, while serving different identity responsibilities.", truthStatus: "Current shipped evidence; differences from the 2022 delivery remain unresolved." }),
      media({ sourceIds: ["lincoln-005"], src: "profile-name-invalid.png", alt: "Current name field rejecting the Latin input widisj", caption: "The confirmed rule allows Chinese and Latin letters, so “widisj” should be valid. The current error indicates a mismatch between the rule and implementation.", truthStatus: "Verified intended rule + verified current screenshot; root cause unknown." }),
      media({ sourceIds: ["lincoln-006"], src: "profile-nickname-invalid.png", alt: "Nickname field displaying its length and special-character guidance", caption: "Nickname allows up to 14 units and underscore, but the combined message does not identify which rule is currently violated.", truthStatus: "Verified current behavior." }),
    ] satisfies LincolnMedia[],
  }),
  longText: linked({
    sourceIds: ["lincoln-011", "lincoln-012", "lincoln-013", "lincoln-014", "lincoln-016"],
    title: "Open long text requires a recoverable interaction model",
    summary: "Long text carries substantial user effort. When content exceeds the limit, the interface should preserve that effort, identify the affected allowance, explain the publishing consequence, and restore the valid state coherently.",
    countTitle: "One visible character is not a naturally consistent implementation unit",
    countSummary: "The current application reproducibly counts Chinese characters, Latin letters, digits, and spaces as one; line breaks as zero; and different emoji as two, three, or four. Without engineering evidence, the implementation cause remains unknown. The specification must connect the complete chain rather than infer an encoding model.",
    chain: [
      { stage: "Perceived symbol", responsibility: "What the user understands as one character" },
      { stage: "Visible UI count", responsibility: "What changes the number shown in the interface" },
      { stage: "Input limit", responsibility: "What marks or prevents overflow" },
      { stage: "Submission validation", responsibility: "What the client accepts as valid" },
      { stage: "Service and storage", responsibility: "What the system preserves" },
      { stage: "Redisplay and editing", responsibility: "Whether the same content returns with the same count" },
    ],
    testCases: [
      { input: "Chinese · Latin · digit", increase: "+1 each", status: "Reproducible" },
      { input: "Space · line break", increase: "+1 · +0", status: "Reproducible" },
      { input: "😀", increase: "+2", status: "Reproducible" },
      { input: "👍🏽", increase: "+3", status: "Reproducible" },
      { input: "🇨🇳", increase: "+4", status: "Reproducible" },
      { input: "Tested family / profession sequence", increase: "+2", status: "Exact sample and field remain TODO" },
    ],
    media: [
      media({ sourceIds: ["lincoln-013"], src: "post-overflow.png", alt: "Post body showing 1009 of 1000 without a clear invalid state", caption: "At 1009/1000, excess text remains available for editing. I proposed an error-color state, which the current implementation does not show.", truthStatus: "Verified current behavior + verified design proposal; publish result unknown." }),
      media({ sourceIds: ["lincoln-014"], src: "post-topic-limit.png", alt: "Adding a topic near the text limit triggers an upper-limit message", caption: "Topic text is inserted into the body and shares its 1000-unit allowance. At 997/1000, the selected topic no longer fits.", truthStatus: "Verified intended rule and current evidence." }),
    ] satisfies LincolnMedia[],
    states: [
      { state: "Normal", behavior: "Keep the count low-emphasis so expression remains primary." },
      { state: "Approaching", behavior: "Increase emphasis before the boundary is reached." },
      { state: "Over limit", behavior: "Preserve content while identifying excess, consequence, and affected object." },
      { state: "Recovered", behavior: "Restore count color, explanation, and publishing state together." },
    ],
    statesTitle: "Four feedback states define the recovery loop",
    statesSummary: "The model distinguishes normal entry, early warning, invalid overflow, and the return to a valid publishing state.",
    allowance: "The shared body/topic allowance is confirmed. The design issue is whether people can predict the topic’s cost before selection and understand how to recover afterward.",
  }),
  shortText: linked({
    sourceIds: ["lincoln-007"],
    title: "The same maximum does not imply the same rule",
    summary: "Name permits Chinese and Latin letters and remains private. Nickname also allows underscore and serves as the public identity. Invalid nickname input disables Save; valid input produces a success toast and exits the page.",
    decision: "Because short text carries little editing investment, input beyond the maximum can be prevented instead of preserving overflow. A repairable error should identify whether length or character rules failed, state the consequence, and explain the next valid action.",
    implementationBoundary: "The current nickname field still permits input beyond 14 units. The defined rule and final implementation must therefore be reported separately.",
  }),
  vin: linked({
    sourceIds: ["lincoln-008", "lincoln-009", "lincoln-010"],
    title: "A unique identifier requires specialized treatment",
    summary: "A VIN has one correct answer, a fixed length, and a controlled character set. Its priority is not a persistent 0/17 counter, but accurate transcription, normalized input, clear progression, and final validation.",
    decision: "Accept exactly 17 uppercase Latin letters or digits; capitalize letters automatically; prevent illegal and excess input; disable progression while incomplete; and perform final validation on confirmation.",
    evidenceBoundary: "The VIN rules and interaction were within my confirmed delivery scope. The exact scan-failure feedback remains unresolved and is excluded from the public conclusion.",
    media: [
      media({ sourceIds: ["lincoln-009"], src: "vehicle-empty.png", alt: "Vehicle binding entry point and owner-service value", caption: "Successful binding connects vehicle status, finance, warnings, and service booking, increasing the value of accurate entry.", truthStatus: "Verified current evidence." }),
      media({ sourceIds: ["lincoln-008"], src: "vin-entry.png", alt: "VIN entry screen with camera scan and find-help", caption: "Manual entry, scan, find-help, normalization, and confirmation state support one exact 17-unit answer.", truthStatus: "Verified delivery scope; scan-failure feedback unresolved." }),
    ] satisfies LincolnMedia[],
  }),
  framework: linked({
    sourceIds: ["lincoln-017"],
    title: "From page-level cases to a text-rule decision tool",
    summary: "The tool standardizes the decision sequence—not one universal component: text archetype, cross-context dimensions, counting unit, input boundary, validation timing, error placement, recovery, and end-to-end testing.",
    columns: ["Decision dimension", "Controlled short text", "Structured unique identifier", "Open long text"],
    rows: [
      ["Current case", "Name · nickname", "VIN", "Post body"],
      ["Answer and structure", "User-authored within rules", "One answer with strict format", "Free expression with no single answer"],
      ["Editing cost", "Low", "Medium; transcription-sensitive", "High; preserve authored content"],
      ["Typical boundary", "Length · allowed characters · visibility", "Fixed length · character set · normalization", "Total allowance · shared objects · publishing state"],
      ["Overflow strategy", "Prevent and explain specifically", "Prevent illegal or excess input; validate submission", "Preserve content; prevent invalid publishing; support recovery"],
      ["Feedback priority", "Failed rule and repair", "Scan · find · format · confirmation", "State · affected object · consequence · recovery"],
      ["QA boundary", "Chinese · Latin · symbols · button state", "17 units · case · scan · illegal input", "Chinese · Latin · emoji · topic · paste · line break · recovery"],
    ],
  }),
  validation: linked({
    sourceIds: ["lincoln-019"],
    title: "A measurement plan—not claimed post-launch results",
    summary: "As an external partner, I did not retain access to production analytics after delivery. The following measures define how the interaction should be evaluated; they are not presented as achieved outcomes.",
    metrics: [
      { scenario: "Controlled short text", measures: "First-save success · rule recognition · repeated errors", question: "Can people identify the violated rule and repair it immediately?" },
      { scenario: "VIN", measures: "First-entry success · completion time · scan adoption · validation failures", question: "Do specialized input and help reduce transcription cost?" },
      { scenario: "Open long text", measures: "Overflow incidence · recovery rate · recovery time · abandonment", question: "Do preserved content and state feedback support recovery?" },
      { scenario: "Body + topic", measures: "Shared-allowance comprehension · topic-add failures", question: "Do people understand that a topic consumes body allowance?" },
      { scenario: "Multilingual / emoji", measures: "Rule prediction · front-end/back-end boundary consistency", question: "Do user understanding and implementation validation remain aligned?" },
    ],
  }),
  closing: linked({
    sourceIds: ["lincoln-020"],
    statement: "The outcome was not a collection of field limits, but a method for deciding text structure, counting boundaries, input constraints, validation, and recovery.",
  }),
} as const;

function countTextUnits() {
  return 2 + 1 + 2 + 2 + 2 + 1 + 1;
}

function countVisualUnits() {
  return 1
    + projectVisualCount(lincolnCaseStudy.identityEvidence.media)
    + 3
    + projectVisualCount(lincolnCaseStudy.longText.media)
    + 1
    + projectVisualCount(lincolnCaseStudy.vin.media)
    + 1
    + 1;
}

function projectVisualCount(items: readonly LincolnMedia[]) {
  return items.length;
}

export const lincolnContentBalance = (() => {
  const textUnits = countTextUnits();
  const visualUnits = countVisualUnits();
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) {
    throw new Error("Lincoln case study must remain at least 50% visual content");
  }
  return { textUnits, visualUnits, visualShare };
})();

export const caseStudyTitle = lincolnCaseStudy.title;
