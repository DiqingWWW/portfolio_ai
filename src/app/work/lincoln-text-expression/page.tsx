import type { Metadata } from "next";
import LincolnCaseStudyPage from "@/components/case-study/LincolnCaseStudyPage";
import { caseStudyTitle } from "@content/projects/lincoln-text-expression/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/lincoln-text-expression" },
};

export default function Page() {
  return <LincolnCaseStudyPage />;
}
