import type { Metadata } from "next";
import NarrativeCaseStudyPage from "@/components/NarrativeCaseStudyPage";
import {
  caseStudyBlocks,
  caseStudyTitle,
} from "@content/projects/lincoln-text-expression/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/lincoln-text-expression" },
};

export default function Page() {
  return (
    <NarrativeCaseStudyPage
      projectId="lincoln-text-expression"
      blocks={caseStudyBlocks}
      status="Professional project"
      mediaLayout="phone-story"
    />
  );
}
