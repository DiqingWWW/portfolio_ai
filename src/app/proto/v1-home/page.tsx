import type { Metadata } from "next";
import { PortfolioHome } from "@/components/PortfolioHome";

// The V1 homepage, kept reachable for review and rollback while V2 is under owner review.
// Not linked from production navigation and intentionally excluded from search.
export const metadata: Metadata = {
  title: "V1 Homepage — Diqing Wu",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PortfolioHome locale="en" />;
}
