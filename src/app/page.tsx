import CuratedHomepage from "@/app/proto/curated-home-v2/CuratedHomepage";

// V2 (Fabrica-derived) homepage. The V1 composition moved to src/components/PortfolioHome.tsx
// so it can stay reachable without adding a non-route export to this page module.
export default function Home() {
  return <CuratedHomepage referenceStudy production locale="en" />;
}
