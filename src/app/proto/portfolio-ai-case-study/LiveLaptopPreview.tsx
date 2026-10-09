"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { laptopAssetGeometry as asset, caseStudyImageSizes } from "../design-system-directions/deethin-system-v2/case-study.registry";
import styles from "./page.module.css";

/** Screen registration uses artwork coordinates, not new design-system dimensions. */
export default function LiveLaptopPreview({ src, title, variant = "hero" }: { src: string; title: string; variant?: "hero" | "card" }) {
  const crop = variant === "card" ? asset.cardCrop : asset.crop;
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = screen.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => {
      element.style.setProperty("--screen-scale", String(entry.contentRect.width / asset.width));
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);
  const geometry = {
    "--scene-ratio": `${crop.width} / ${crop.height}`,
    "--scene-image-width": `${asset.width / crop.width * 100}%`,
    "--scene-image-left": `${-crop.x / crop.width * 100}%`,
    "--scene-image-top": `${-crop.y / crop.height * 100}%`,
    "--screen-left": `${(asset.screen.x - crop.x) / crop.width * 100}%`,
    "--screen-top": `${(asset.screen.y - crop.y) / crop.height * 100}%`,
    "--screen-width": `${asset.screen.width / crop.width * 100}%`,
    "--screen-height": `${asset.screen.height / crop.height * 100}%`,
    "--screen-viewport-width": `${asset.width}px`,
    "--screen-viewport-height": `${asset.width * asset.screen.height / asset.screen.width}px`,
  } as CSSProperties;
  return <div className={styles.laptopScene} style={geometry} data-live-laptop={variant}>
    <Image src="/assets/images/portfolio-operating-system/cover.png" alt="" width={asset.width} height={asset.height} sizes={caseStudyImageSizes} />
    <div ref={screen} className={styles.laptopScreen}>
      <iframe src={src} title={title} loading="lazy" tabIndex={-1} aria-hidden="true" />
    </div>
  </div>;
}
