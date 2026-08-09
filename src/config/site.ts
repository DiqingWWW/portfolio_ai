// Site-level metadata constants.
// Visual chrome text — separate from content JSON and navigation.
// Components import what they need; nothing in this file depends on React.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://deethin.site";

export const siteConfig = {
  header: {
    left: "Portfolio // I know the UI looks rough, but I'm having a hard time dealing with AI slop, so please be patient with me...",
    center: "Product Designer & AI Builder",
    year: "2026",
  },
  watermark: "Portfolio",
  footer: {
    left: "Diqing Wu — Interactive Workspace",
    centerLeft: "Click objects to inspect logs",
    centerRight: "Workspace Environment v2.8",
  },
} as const;
