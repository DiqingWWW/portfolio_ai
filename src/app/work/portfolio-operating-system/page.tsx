import type { Metadata } from "next";
import NarrativeCaseStudyPage from "@/components/NarrativeCaseStudyPage";
import {
  caseStudyBlocks,
  caseStudyTitle,
} from "@content/projects/portfolio-operating-system/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/portfolio-operating-system" },
};

export default function Page() {
  return (
    <NarrativeCaseStudyPage
      projectId="portfolio-operating-system"
      blocks={caseStudyBlocks}
      status="Ongoing independent project"
    />
  );
}
