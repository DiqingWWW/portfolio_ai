import type { Metadata } from "next";
import RubikStudioPage from "@/components/case-study/RubikStudioPage";

export const metadata: Metadata = {
  title: "Rubik Studio",
  alternates: {
    canonical: "/work/rubik-studio",
    languages: { en: "/work/rubik-studio", "zh-CN": "/zh/work/rubik-studio" },
  },
  openGraph: {
    title: "Rubik Studio",
    locale: "en_US",
    url: "/work/rubik-studio",
    images: [{ url: "/assets/images/rubik-studio/rubikstudio_EN-display.webp", alt: "Rubik Studio project overview" }],
  },
};

export default function Page() {
  return <RubikStudioPage locale="en" />;
}
