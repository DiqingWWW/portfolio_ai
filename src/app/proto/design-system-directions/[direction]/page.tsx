import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DirectionPage } from "../DirectionPage";
import { directions, type DirectionSlug } from "../data";

export const metadata: Metadata = {
  title: "Design System Directions",
  description: "Four isolated visual-system explorations for portfolio review.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return directions.map(({ slug }) => ({ direction: slug }));
}

export default async function DesignSystemDirectionPage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction } = await params;
  if (!directions.some((item) => item.slug === direction)) notFound();
  return <DirectionPage direction={direction as DirectionSlug} />;
}
