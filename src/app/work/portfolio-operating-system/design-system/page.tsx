import type { Metadata } from "next";
import SystemPage from "@/app/proto/design-system-directions/deethin-system-v2/SystemPage";

export const metadata: Metadata = {
  title: "Portfolio AI — Design System",
  description: "A working design-system proposal for the Portfolio AI project.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SystemPage projectHref="/work/portfolio-operating-system" locale="en" />;
}
