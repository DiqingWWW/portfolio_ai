import type { DesignSystemRegistry } from "./types";

export const designSystemRegistry = {
  schemaVersion: 1,
  status: "draft",
  components: [
    {
      systemId: "component.action.button",
      displayName: "Button",
      lifecycleState: "draft",
      code: {
        path: "src/design-system/components/Button/Button.tsx",
        exportName: "Button",
      },
      design: {
        provider: "figma",
        fileKey: null,
        nodeId: null,
        componentName: "Action/Button",
      },
      propertyMappings: [
        { designProperty: "Variant", codeProperty: "variant" },
        { designProperty: "Size", codeProperty: "size" },
        { designProperty: "Full width", codeProperty: "fullWidth" },
        { designProperty: "Disabled", codeProperty: "disabled" },
      ],
      tokenBindings: ["color.action.*", "radius.control", "motion.feedback.*"],
      supportedStatesAndModes: ["default", "hover", "focus-visible", "pressed", "disabled"],
      version: "0.1.0",
      sourceRevision: null,
    },
    {
      systemId: "component.surface.card",
      displayName: "Card",
      lifecycleState: "draft",
      code: {
        path: "src/design-system/components/Card/Card.tsx",
        exportName: "Card",
      },
      design: {
        provider: "figma",
        fileKey: null,
        nodeId: null,
        componentName: "Surface/Card",
      },
      propertyMappings: [],
      tokenBindings: ["color.surface.*", "color.border.*", "radius.surface", "shadow.raised"],
      supportedStatesAndModes: ["default", "responsive-content"],
      version: "0.1.0",
      sourceRevision: null,
    },
    {
      systemId: "component.form.text-field",
      displayName: "Text field",
      lifecycleState: "draft",
      code: {
        path: "src/design-system/components/TextField/TextField.tsx",
        exportName: "TextField",
      },
      design: {
        provider: "figma",
        fileKey: null,
        nodeId: null,
        componentName: "Form/Text Field",
      },
      propertyMappings: [
        { designProperty: "Description", codeProperty: "description" },
        { designProperty: "Error", codeProperty: "error" },
        { designProperty: "Disabled", codeProperty: "disabled" },
      ],
      tokenBindings: ["color.text.*", "color.border.*", "focus.ring.*", "radius.control"],
      supportedStatesAndModes: ["default", "focus-visible", "invalid", "disabled"],
      version: "0.1.0",
      sourceRevision: null,
    },
    {
      systemId: "component.disclosure.section",
      displayName: "Disclosure",
      lifecycleState: "draft",
      code: {
        path: "src/design-system/components/Disclosure/Disclosure.tsx",
        exportName: "Disclosure",
      },
      design: {
        provider: "figma",
        fileKey: null,
        nodeId: null,
        componentName: "Disclosure/Section",
      },
      propertyMappings: [
        { designProperty: "Open", codeProperty: "open" },
        { designProperty: "Default open", codeProperty: "defaultOpen" },
      ],
      tokenBindings: ["color.surface.*", "color.border.*", "motion.feedback.*"],
      supportedStatesAndModes: ["closed", "open", "focus-visible", "reduced-motion"],
      version: "0.1.0",
      sourceRevision: null,
    },
  ],
} as const satisfies DesignSystemRegistry;

export function getComponentMapping(systemId: string) {
  return designSystemRegistry.components.find((component) => component.systemId === systemId);
}
