// Site-level metadata constants.
// Visual chrome text — separate from content JSON and navigation.
// Components import what they need; nothing in this file depends on React.

export const siteConfig = {
  header: {
    left: "Portfolio // Canvas Workspace",
    center: "This Website is made by Google AI Studio + Claude Code + Vercel",
    year: "2026",
  },
  watermark: "Portfolio",
  footer: {
    left: "Diqing Wu — Interactive Workspace",
    centerLeft: "Click objects to inspect logs",
    centerRight: "Workspace Environment v2.8",
  },
} as const;
