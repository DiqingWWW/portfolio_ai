import selection from "./case-study.selection.json";

export interface SourceLinked {
  sourceIds: readonly string[];
}

export interface CandidateMedia extends SourceLinked {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  truthStatus: "source-evidence" | "portfolio-reconstruction" | "current-implementation";
}

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
  group?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  kind?: "primary" | "feedback" | "conditional";
}

export interface CandidateDiagram extends SourceLinked {
  title: string;
  description: string;
  truthStatus: "portfolio-reconstruction";
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
}

export interface CandidateCaseStudy extends SourceLinked {
  projectId: "portfolio-operating-system";
  locale: "zh" | "en";
  revisionStatus: "candidate-owner-review";
  title: string;
  thesis: string;
  meta: {
    role: string;
    timeline: string;
    type: string;
    scope: string;
  };
  hero: SourceLinked & {
    summary: readonly string[];
    outcomes: readonly { label: string; value: string }[];
    boundary: string;
    media: CandidateMedia;
  };
  story: SourceLinked & {
    question: string;
    beats: readonly (SourceLinked & {
      index: string;
      title: string;
      summary: string;
      evidence: string;
    })[];
  };
  problem: SourceLinked & {
    title: string;
    quote: string;
    interpretation: string;
    failureModes: readonly {
      symptom: string;
      cause: string;
      designResponse: string;
    }[];
  };
  aiNative: SourceLinked & {
    title: string;
    definition: string;
    traits: readonly (SourceLinked & {
      scope: string;
      conventional: string;
      native: string;
      projectEvidence: string;
    })[];
    boundary: string;
  };
  operatingSystem: SourceLinked & {
    title: string;
    summary: string;
    sharedWorkspace: CandidateDiagram;
    modules: readonly (SourceLinked & {
      id: string;
      label: string;
      purpose: string;
      implementation: string;
      limit?: string;
    })[];
    governance: SourceLinked & {
      title: string;
      summary: string;
      levels: readonly { scope: string; home: string; job: string }[];
    };
    contentPipeline: SourceLinked & {
      title: string;
      steps: readonly string[];
      note: string;
    };
    delegation: SourceLinked & {
      title: string;
      summary: string;
      flow: CandidateDiagram;
      result: string;
      boundary: string;
    };
  };
  qualitySystem: SourceLinked & {
    title: string;
    principle: string;
    firstDesign: SourceLinked & {
      title: string;
      summary: string;
      stages: readonly (SourceLinked & {
        label: string;
        title: string;
        text: string;
        media: readonly CandidateMedia[];
      })[];
    };
    secondDesign: SourceLinked & {
      title: string;
      summary: string;
      subjectiveComparison: string;
      failures: readonly (SourceLinked & {
        title: string;
        finding: string;
        consequence: string;
        media?: CandidateMedia;
      })[];
      acceptedArchitecture: readonly {
        asset: string;
        responsibility: string;
        decision: string;
      }[];
      validation: readonly {
        finding: string;
        decision: string;
        relationshipToCheck: string;
      }[];
      acceptance: readonly string[];
      boundary: string;
    };
  };
  result: SourceLinked & {
    title: string;
    summary: string;
    interviewProof: readonly (SourceLinked & { title: string; points: readonly string[] })[];
    delivered: readonly string[];
    transferableValue: readonly (SourceLinked & {
      problem: string;
      capability: string;
      companyValue: string;
    })[];
    established: readonly string[];
    unproven: readonly string[];
    closing: string;
  };
  compositionPlan: {
    readingTime: "30–60 seconds";
    visualLogicRatio: "6:4";
    primaryVisuals: readonly string[];
    progressiveDisclosure: readonly string[];
  };
}

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function visitSourceIds(value: unknown, path: string, seen: Set<string>): void {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    value.forEach((item, index) => visitSourceIds(item, `${path}[${index}]`, seen));
    return;
  }

  const record = value as Record<string, unknown>;
  if (Array.isArray(record.sourceIds)) {
    for (const sourceId of record.sourceIds) {
      if (typeof sourceId !== "string" || !approvedSourceIds.has(sourceId)) {
        throw new Error(`${path} references an unapproved source unit: ${String(sourceId)}`);
      }
      seen.add(sourceId);
    }
  }

  for (const [key, child] of Object.entries(record)) {
    visitSourceIds(child, `${path}.${key}`, seen);
  }
}

export function defineCandidateCaseStudy<T extends CandidateCaseStudy>(content: T): T {
  const seen = new Set<string>();
  visitSourceIds(content, content.locale, seen);

  if (seen.size === 0) {
    throw new Error(`${content.locale} candidate contains no source links`);
  }

  return content;
}

/** Validate localized editorial selections against the same approved master. */
export function defineSourceLinkedContent<T extends SourceLinked>(content: T): T {
  const seen = new Set<string>();
  visitSourceIds(content, "narrative", seen);
  if (seen.size === 0) throw new Error("Narrative contains no approved source links");
  return content;
}
