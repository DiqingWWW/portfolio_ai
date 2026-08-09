import type { Metadata } from "next";
import HondaCaseStudyPage from "@/components/case-study/HondaCaseStudyPage";
import { caseStudyTitle } from "@content/projects/honda-hmi-design-system/case-study.en";

export const metadata: Metadata = {
  title: caseStudyTitle,
  alternates: { canonical: "/work/honda-hmi-design-system" },
};

export default function Page() {
  return <HondaCaseStudyPage />;
}
