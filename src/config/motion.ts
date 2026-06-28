// Shared motion presets — pure constants, no components or hooks.
// Components import only what they need; hover logic stays local.

// Shared spring-like easing curve (cubic-bezier)
export const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

// Shared transition durations (in seconds)
export const DURATION = {
  hoverScale: 0.4,
  thumbnail: 0.35,
  textReveal: 0.3,
} as const;

// Shared hover scale factor for text/button nodes
export const HOVER_SCALE_NODE = 1.05;
