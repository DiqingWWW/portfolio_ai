import type { Metadata } from "next";
import { portfolioCaseStudyCandidateEn as content } from "@content/projects/portfolio-operating-system/case-study.candidate.en";
import CandidatePage from "../CandidatePage";

export const metadata: Metadata = {
  title: "Portfolio AI — English design review",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CandidatePage content={content} />;
}
