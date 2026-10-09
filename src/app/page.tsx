import type { Metadata } from "next";
import CuratedHomepage from "@/app/proto/curated-home-v2/CuratedHomepage";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Diqing Wu",
    title: "Diqing Wu — Product Designer + AI Builder",
    description: "Selected work by Diqing Wu across automotive HMI, design systems, content interaction, and AI-assisted product building.",
    images: [{
      url: "/assets/images/portfolio-operating-system/social-preview_EN.webp",
      width: 1280,
      height: 960,
      alt: "Diqing Wu portfolio homepage shown on a laptop",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diqing Wu — Product Designer + AI Builder",
    description: "Diqing Wu — Product Designer & AI Builder working across HMI, design systems, and AI-assisted products.",
    images: ["/assets/images/portfolio-operating-system/social-preview_EN.webp"],
  },
};

// V2 (Fabrica-derived) homepage. The V1 composition moved to src/components/PortfolioHome.tsx
// so it can stay reachable without adding a non-route export to this page module.
export default function Home() {
  return <CuratedHomepage referenceStudy production locale="en" />;
}
