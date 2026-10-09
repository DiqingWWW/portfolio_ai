export type ComponentLifecycle = "draft" | "current" | "canonical" | "deprecated";

export interface PropertyMapping {
  designProperty: string;
  codeProperty: string;
  values?: Readonly<Record<string, string>>;
}

export interface DesignToolBinding {
  provider: "figma" | "js-design";
  fileKey: string | null;
  nodeId: string | null;
  componentName: string;
}

export interface DesignComponentMapping {
  systemId: `component.${string}`;
  displayName: string;
  lifecycleState: ComponentLifecycle;
  code: {
    path: `src/${string}`;
    exportName: string;
  };
  design: DesignToolBinding;
  propertyMappings: readonly PropertyMapping[];
  tokenBindings: readonly string[];
  supportedStatesAndModes: readonly string[];
  version: string;
  sourceRevision: string | null;
}

export interface DesignSystemRegistry {
  schemaVersion: 1;
  status: "draft";
  components: readonly DesignComponentMapping[];
}
