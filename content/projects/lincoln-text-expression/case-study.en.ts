import selection from "./case-study.selection.json";

type SourceLinked = { sourceIds: readonly string[] };

export type LincolnMedia = SourceLinked & {
  src: string;
  alt: string;
  caption: string;
  truthStatus: string;
};

export type LincolnDerivation = SourceLinked & {
  title: string;
  summary: string;
  points: readonly string[];
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

function derivation(value: LincolnDerivation): LincolnDerivation {
  return linked(value);
}

export const lincolnCaseStudy = {
  projectId: "lincoln-text-expression",
  projectName: "The Lincoln Way",
  title: "Optimizing Mobile Text Input and Information Expression",
  status: "Professional project · shipped with qualified evidence",
  hero: linked({
    sourceIds: ["lincoln-001", "lincoln-002"],
    proposition: "Text rules should be defined by the task the content performs—not by the field name or component style.",
    context: "The client asked us to systematically optimize text-related interactions. The Lincoln Way is Lincoln’s mobile application for vehicle status, community communication, related purchases, and official owner services. In August 2022, I worked as the sole UX designer within the external partner’s scope, covering requirements analysis, competitive research, text-rule definition, interaction design, and design specifications. The client product lead reviewed and approved the work.",
    evidenceBoundary: "The seven primary screenshots show the application’s current shipped experience. Some details differ from the August 2022 delivery; they therefore evidence observable tasks and states, while authorship is limited to the confirmed responsibilities, rules, and implementation scope.",
    cover: media({
      sourceIds: ["lincoln-001"],
      src: "cover-display.webp",
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
    questions: [
      { name: "Controlled short text", examples: "Name · nickname", property: "When users fill a short form, how should the prompts be optimized?", question: "Show rules on focus and validate while typing—prompt timing matches editing cost." },
      { name: "Structured unique identifier", examples: "VIN", property: "When the input is unique, how should constraints be applied?", question: "Priority is not counting, but reducing transcription errors and keeping the information correctly identified." },
      { name: "Open long text", examples: "Post body", property: "When users type long text, what feedback should appear in which situation?", question: "Allowing overflow is deliberate; pair it with an error color and a recovery loop." },
    ],
  }),
  shortText: linked({
    sourceIds: ["lincoln-007", "lincoln-004", "lincoln-005", "lincoln-006", "lincoln-023"],
    title: "Question 1 · Controlled short text: how should prompts be optimized in short forms?",
    summary: "Name and nickname both use a 14-unit limit, yet carry different content responsibilities—name permits Chinese and Latin letters and is not displayed externally; nickname permits underscore and carries all external identity display. Invalid nickname disables Save; a valid save produces a success toast and exits the page.",
    tradeoff: "Name is a real name; from a content-task view it does not actually need a 14-unit limit—real names are short. But because foreign users’ names (Latin spellings) can be longer, we applied the same 14-unit treatment as the nickname, leaving enough input room for users of different languages. Nickname is the opposite: it carries all external identity display, so its rules need to be more explicit.",
    decision: "The core of short-text limits is not the number but the task the content performs. Name and nickname share the 14-unit ceiling for different reasons: name accommodates longer names; nickname constrains a public identity. The current nickname still accepts input beyond 14, which means the defined rule and the shipped implementation are not fully aligned—these two need to be stated separately.",
    presentation: "Short-form interaction centers on up-front prompting: when the field gains focus, show the rule and constraints (for example “up to 14 units, underscore allowed”), so users know the boundary before typing; validate in real time while typing so errors can be corrected before submission. Long text is the opposite—it relies more on post-input prompts. A repairable short-text error should state whether length or character rules failed, what the consequence is, and what the user should do next.",
    media: [
      media({ sourceIds: ["lincoln-004"], src: "profile-overview-display.webp", alt: "Current profile page showing name and nickname fields", caption: "Name and nickname share one profile surface and the same numeric limit, while serving different identity responsibilities.", truthStatus: "Current shipped evidence; differences from the 2022 delivery remain unresolved." }),
      media({ sourceIds: ["lincoln-005"], src: "profile-name-invalid-display.webp", alt: "Current name field rejecting the Latin input widisj", caption: "The confirmed rule allows Chinese and Latin letters, so “widisj” should be valid. The current error indicates a mismatch between the rule and implementation.", truthStatus: "Verified intended rule + verified current screenshot; root cause unknown." }),
      media({ sourceIds: ["lincoln-006"], src: "profile-nickname-invalid-display.webp", alt: "Nickname field displaying its length and special-character guidance", caption: "Nickname allows up to 14 units and underscore, but the combined message does not identify which rule is currently violated.", truthStatus: "Verified current behavior." }),
    ] satisfies LincolnMedia[],
    derivation: derivation({
      sourceIds: ["lincoln-023"],
      title: "How short-text forms present and interact",
      summary: "The experience difference in short-text forms lies mainly in the timing and form of the prompt—prompt granularity should match editing cost.",
      points: [
        "Up-front prompt: show the rule when the field gains focus (for example “up to 14 units, underscore allowed”), so users know the boundary before typing rather than discovering the error afterwards.",
        "Prompt while typing: real-time counting and instant validation show “is it valid, how much is left” as the user types.",
        "Post-input prompt: validation runs on submission and errors surface together—costly for short text because the user must go back and fix it.",
      ],
    }),
  }),
  vin: linked({
    sourceIds: ["lincoln-010", "lincoln-008", "lincoln-009", "lincoln-024"],
    title: "Question 2 · Structured unique identifier: how should constraints be applied when the input is unique?",
    summary: "A VIN has exactly 17 uppercase Latin letters or digits and only one correct answer. Incomplete input cannot proceed, input beyond 17 or illegal characters is blocked, Latin letters are normalized to uppercase, and final validation happens on confirmation. The page supports manual entry, camera scan, find-help, and a disabled empty-state confirmation.",
    tradeoff: "The priority for this kind of field is not a persistent 0/17 counter—one wrong VIN letter points to the wrong vehicle.",
    decision: "The rule for a unique identifier is decided by “the answer must be unique and accurate.” The design focus is reducing transcription errors, providing scan and find-help, normalizing input, and making it clear whether the user can proceed.",
    presentation: "A VIN decides whether the information can be correctly identified and linked to the right vehicle. For this kind of information, the reliability and accuracy of the input method matter most.",
    evidenceBoundary: "The exact scan-failure feedback remains unresolved and is excluded from the public conclusion.",
    media: [
      media({ sourceIds: ["lincoln-009"], src: "vehicle-empty-display.webp", alt: "Vehicle binding entry point and owner-service value", caption: "Successful binding connects vehicle status, finance, warnings, and service booking, increasing the value of accurate entry.", truthStatus: "Verified current evidence." }),
      media({ sourceIds: ["lincoln-008"], src: "vin-entry-display.webp", alt: "VIN entry screen with camera scan and find-help", caption: "Manual entry, scan, find-help, normalization, and confirmation state support one exact 17-unit answer.", truthStatus: "Verified delivery scope; scan-failure feedback unresolved." }),
    ] satisfies LincolnMedia[],
    derivation: derivation({
      sourceIds: ["lincoln-024"],
      title: "Why unique identifiers are least affected by product positioning",
      summary: "Among the three archetypes, unique identifiers have their rules set by external standards; the designer’s freedom lies in the input method.",
      points: [
        "VINs, ID numbers, order numbers—rules come from external standards: 17 digits, 18 digits, specific character sets.",
        "The designer’s freedom is not in “how many characters,” but in the input method: how to reduce transcription errors, how to format, when to validate.",
        "The harder the constraint, the more the design must serve accuracy.",
      ],
    }),
  }),
  longText: linked({
    sourceIds: ["lincoln-011", "lincoln-012", "lincoln-013", "lincoln-014", "lincoln-016", "lincoln-025"],
    title: "Question 3 · Open long text: what feedback should appear in which situation when users type long text?",
    summary: "The post body uses a 1,000-unit limit with a live X/1000 count and has no title field. Topic text is inserted into the body and shares the same 1,000-unit allowance, with no independent topic limit. The current app preserves text beyond the limit but does not implement the error-color state I proposed.",
    tradeoff: "Short text can be stopped at the boundary because editing cost is low; long text has already carried the user’s effort, so overflow must preserve content and let the user edit back to a valid state. The shared body/topic allowance is not an unknown bug; the real design problem is that users cannot see the topic’s cost before selecting it, and whether the prompt is enough to support recovery.",
    decision: "Long text carries expression effort; limits serve expression—after overflow, the content must be preserved, the consequence explained, and recovery provided, rather than blocked like short text.",
    presentation: "The body decides whether expression effort is respected and whether information can be fully conveyed and recovered. Allowing users to keep typing beyond the character limit is a deliberate design choice—the more users invest, the less their input should be cut off mid-way; at the same time, overflow must be clearly signaled: the count enters an error color (1009/1000) to tell users they are over and need to trim back. The current implementation preserves overflow text but does not implement the error-color state.",
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
    ],
    media: [
      media({ sourceIds: ["lincoln-013"], src: "post-overflow-display.webp", alt: "Post body showing 1009 of 1000 without a clear invalid state", caption: "At 1009/1000, overflow text remains editable. I proposed an error-color count state, which the current implementation does not show.", truthStatus: "Verified current behavior + verified design proposal; publish result unknown." }),
      media({ sourceIds: ["lincoln-014"], src: "post-topic-limit-display.webp", alt: "Adding a topic near the text limit triggers an upper-limit message", caption: "Topic text is inserted into the body and shares its 1000-unit allowance. At 997/1000, the selected topic no longer fits.", truthStatus: "Verified intended rule and current evidence." }),
    ] satisfies LincolnMedia[],
    statesTitle: "Four feedback states define the recovery loop",
    statesSummary: "The model distinguishes normal entry, early warning, invalid overflow, and the return to a valid publishing state.",
    states: [
      { state: "Normal", behavior: "Keep the count low-emphasis so expression remains primary." },
      { state: "Approaching", behavior: "Increase emphasis before the boundary is reached." },
      { state: "Over limit", behavior: "Preserve content while identifying excess, consequence, and affected object." },
      { state: "Recovered", behavior: "Restore count color, explanation, and publishing state together." },
    ],
    allowance: "The shared body/topic allowance is not an unknown bug; the real design problem is whether people can predict the topic’s cost before selection and understand how to recover afterward—the allowance must answer “can users predict the cost, can they recover.”",
    derivation: derivation({
      sourceIds: ["lincoln-025"],
      title: "How product positioning defines “long text”",
      summary: "What counts as “long text” is decided by product positioning; a character ceiling is the product’s answer to “how much information one expression should carry.”",
      points: [
        "In The Lincoln Way, a vehicle-owner service app, a 1000-character post is long text—low frequency, functional.",
        "On Xiaohongshu, 1000 characters is also the norm, but it is the core carrier of “recommendation notes.”",
        "When product positioning changes, the definition, allowance, and overflow strategy of long text change together.",
      ],
    }),
  }),
  archetypes: linked({
    sourceIds: ["lincoln-003"],
    title: "From three questions to three text archetypes",
    summary: "Looking back, these are not four fields but three kinds of text tasks—each answers the same question: how will this input be presented, understood, and trusted afterwards?",
    rows: [
      ["Controlled short text", "Name, nickname", "Short, concentrated rules, low editing cost", "Should invalid input be prevented? How should the exact rule be explained?"],
      ["Structured unique identifier", "VIN", "One answer, strict length and character set", "How can input accuracy and final validation be improved?"],
      ["Open long text", "Post body; comment as boundary reference only", "No single answer, high user investment, shared allowances", "Should excess content be preserved? How should state, consequence, and recovery be expressed?"],
    ],
    dimensions: ["Content structure", "Length and editing cost", "Answer certainty", "Downstream visibility", "Failure consequence", "Cross-object coupling"],
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
    title: "Delivered outcome and honest boundary",
    summary: "The method can be reused, but the outcome must stay bounded: after delivery I had no access to production analytics, so the measures below define how the interaction should be evaluated—they are not achieved results.",
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
    statement: "The outcome was not a collection of field limits, but a method for deciding text structure, counting boundaries, input constraints, validation, and recovery—because every character-limit decision is ultimately a decision about how information is presented, understood, and trusted.",
  }),
} as const;

function countTextUnits() {
  return 2 + 1 + 2 + 2 + 2 + 1 + 1;
}

function countVisualUnits() {
  return 1
    + projectVisualCount(lincolnCaseStudy.shortText.media)
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
