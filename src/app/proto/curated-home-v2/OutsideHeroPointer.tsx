"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

// Proposed, prototype-only. Native cursor remains the fallback for touch/keyboard.
export default function OutsideHeroPointer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointer = ref.current;
    const page = pointer?.closest<HTMLElement>(`.${styles.page}`);
    const hero = page?.querySelector<HTMLElement>(`.${styles.experience}`);
    if (!pointer || !page || !hero) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let x = 0, y = 0, hasPointer = false;
    let mode = "hidden";

    const setMode = (next: string) => {
      if (next === mode) return;
      mode = next;
      pointer.dataset.mode = mode;
      if (mode === "hidden") delete page.dataset.customPointer;
      else page.dataset.customPointer = "active";
    };
    const reset = () => {
      hasPointer = false;
      pointer.dataset.instant = "true";
      setMode("hidden");
    };
    const syncTarget = (target: Element | null) => {
      if (!hasPointer || !fine.matches || reduced.matches || document.hidden
        || hero.dataset.phase !== "ready" || !target || !page.contains(target)
        || hero.contains(target)
        || target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [aria-disabled="true"], :disabled')) {
        setMode("hidden");
        return;
      }
      const interactive = target.closest('a[href], button, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])');
      setMode(interactive ? "hover" : "glow");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { reset(); return; }
      x = event.clientX; y = event.clientY; hasPointer = true;
      delete pointer.dataset.instant;
      pointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      syncTarget(event.target instanceof Element ? event.target : null);
    };
    // Re-hit-test after scrolling: a stationary mouse may now be over a card.
    const recheck = () => syncTarget(hasPointer ? document.elementFromPoint(x,y) : null);
    const opening = new MutationObserver(recheck);
    opening.observe(hero, { attributes: true, attributeFilter: ["data-phase"] });
    page.addEventListener("pointermove", move, { passive: true });
    page.addEventListener("pointerleave", reset);
    page.addEventListener("pointercancel", reset);
    document.addEventListener("keydown", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", recheck, { passive: true });
    window.addEventListener("resize", recheck);
    fine.addEventListener("change", reset);
    reduced.addEventListener("change", reset);
    return () => {
      reset(); opening.disconnect();
      page.removeEventListener("pointermove", move);
      page.removeEventListener("pointerleave", reset);
      page.removeEventListener("pointercancel", reset);
      document.removeEventListener("keydown", reset);
      document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", recheck);
      window.removeEventListener("resize", recheck);
      fine.removeEventListener("change", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);

  return <div ref={ref} className={styles.outsidePointer} data-mode="hidden" aria-hidden="true">
    <div className={styles.outsideGlow} style={{
      maskImage: "radial-gradient(circle, black 0%, rgb(0 0 0 / .96) 25%, rgb(0 0 0 / .45) 49%, transparent 72%)",
      WebkitMaskImage: "radial-gradient(circle, black 0%, rgb(0 0 0 / .96) 25%, rgb(0 0 0 / .45) 49%, transparent 72%)",
    }}>
      <div className={styles.pointerBlurSurface} style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
    </div>
  </div>;
}
