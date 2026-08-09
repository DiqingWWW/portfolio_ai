import type { Metadata } from "next";
import PortfolioOperatingSystemCaseStudyPage from "@/components/case-study/PortfolioOperatingSystemCaseStudyPage";
import { caseStudyTitle } from "@content/projects/portfolio-operating-system/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/portfolio-operating-system" },
};

export default function Page() {
  return <PortfolioOperatingSystemCaseStudyPage />;
}
