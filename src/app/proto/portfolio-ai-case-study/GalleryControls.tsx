"use client";

import { Children, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import primitives from "../design-system-directions/deethin-system-v2/CaseStudyPrimitives.module.css";

export default function GalleryControls({ children, title, previous, next }: { children: ReactNode; title: string; previous: string; next: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  function goTo(target: number) {
    const element = track.current;
    if (!element) return;
    const bounded = Math.min(count - 1, Math.max(0, target));
    const item = element.children[bounded] as HTMLElement | undefined;
    if (!item) return;
    const first = element.children[0] as HTMLElement;
    element.scrollTo({ left: item.offsetLeft - first.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setIndex(bounded);
  }

  function updateIndex() {
    const element = track.current;
    if (!element) return;
    const items = Array.from(element.children) as HTMLElement[];
    const current = items.reduce((best, item, position) =>
      Math.abs(item.offsetLeft - items[0].offsetLeft - element.scrollLeft) < Math.abs(items[best].offsetLeft - items[0].offsetLeft - element.scrollLeft) ? position : best, 0);
    setIndex(current);
  }

  return <div className={styles.galleryShell}>
    <div className={styles.galleryControls} aria-label={title}>
      <span aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
      <button className={primitives.button} data-variant="quiet" type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={previous}><ArrowLeft aria-hidden="true" /></button>
      <button className={primitives.button} data-variant="quiet" type="button" onClick={() => goTo(index + 1)} disabled={index === count - 1} aria-label={next}><ArrowRight aria-hidden="true" /></button>
    </div>
    <div ref={track} className={styles.gallery} tabIndex={0} role="region" aria-label={title} onScroll={updateIndex}>{children}</div>
  </div>;
}
