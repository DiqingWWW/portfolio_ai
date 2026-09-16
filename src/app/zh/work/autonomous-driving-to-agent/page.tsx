import type { Metadata } from "next";
import AutonomousAgentResearchPage from "@/components/case-study/AutonomousAgentResearchPage";
import { autonomousAgentCaseStudy } from "@content/projects/autonomous-driving-to-agent/case-study.zh";

export const metadata: Metadata = {
  title: autonomousAgentCaseStudy.title,
  description: autonomousAgentCaseStudy.dek,
  alternates: { canonical: "/zh/work/autonomous-driving-to-agent" },
  openGraph: {
    title: autonomousAgentCaseStudy.title,
    description: autonomousAgentCaseStudy.dek,
    locale: "zh_CN",
    url: "/zh/work/autonomous-driving-to-agent",
    images: [{ url: "/assets/images/autonomous-driving-to-agent/autonomous-driving-agent-relationship.png", alt: autonomousAgentCaseStudy.agentLoop.media.alt }],
  },
};

export default function Page() { return <AutonomousAgentResearchPage />; }
