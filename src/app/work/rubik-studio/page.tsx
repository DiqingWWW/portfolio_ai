import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResponsiveProjectImage from "@/components/ResponsiveProjectImage";

export const metadata: Metadata = {
  title: "Rubik Studio",
  alternates: { canonical: "/work/rubik-studio" },
};

export default function RubikStudioPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Link
        href="/"
        aria-label="Back to workspace"
        className="fixed left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      </Link>
      <ResponsiveProjectImage
        src="/assets/images/rubik-studio/rubikstudio_EN-display.webp"
        mobileSrc="/assets/images/rubik-studio/rubikstudio_EN-mobile.webp"
        alt="Rubik Studio project overview"
        width={736}
        height={2138}
        priority
        className="h-auto w-full"
      />
    </main>
  );
}
