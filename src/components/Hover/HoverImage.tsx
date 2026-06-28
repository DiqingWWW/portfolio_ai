"use client";

// Thin <img> wrapper for debugging — adds data-asset attribute.
// Does NOT handle hover behavior; hover stays local to each component.

interface HoverImageProps {
  asset: string;
  alt: string;
  className?: string;
}

export default function HoverImage({ asset, alt, className }: HoverImageProps) {
  return (
    <img
      data-asset={asset}
      src={asset}
      alt={alt}
      className={className ?? "w-full h-auto object-cover"}
    />
  );
}
