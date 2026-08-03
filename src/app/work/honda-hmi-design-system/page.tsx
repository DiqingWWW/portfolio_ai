import type { Metadata } from "next";
import NarrativeCaseStudyPage from "@/components/NarrativeCaseStudyPage";
import {
  caseStudyBlocks,
  caseStudyTitle,
} from "@content/projects/honda-hmi-design-system/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/honda-hmi-design-system" },
};

export default function Page() {
  return (
    <NarrativeCaseStudyPage
      projectId="honda-hmi-design-system"
      blocks={caseStudyBlocks}
      status="Professional project"
    />
  );
}
