import type { Metadata } from "next";
import CuratedHomepage from "@/app/proto/curated-home-v2/CuratedHomepage";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** The actual homepage hero without project cards: a live screen must not embed itself. */
export default async function Page({ searchParams }: {
  searchParams: Promise<{ locale?: string | string[] }>;
}) {
  const locale = (await searchParams).locale === "zh" ? "zh" : "en";
  return <CuratedHomepage referenceStudy production screenOnly locale={locale} />;
}
