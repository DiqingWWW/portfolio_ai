"use client";

import { useEffect } from "react";
import { caseStudyMotion } from "../design-system-directions/deethin-system-v2/case-study.registry";

/** Landing-page motion pattern, scoped to this review route. Content remains visible without JS. */
export default function ScrollEntrances() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-portfolio-ai-candidate]");
    if (!page || !("IntersectionObserver" in window)) return;
    const elements = Array.from(page.querySelectorAll<HTMLElement>("[data-scroll-entrance]"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.entranceState = "visible";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: caseStudyMotion.viewportMargin, threshold: caseStudyMotion.threshold });

    for (const element of elements) {
      if (!reduced.matches && element.getBoundingClientRect().top >= innerHeight * caseStudyMotion.initialVisibleRatio) {
        element.dataset.entranceState = "pending";
        observer.observe(element);
      } else element.dataset.entranceState = reduced.matches ? "instant" : "visible";
    }
    const showAll = () => {
      observer.disconnect();
      for (const element of elements) element.dataset.entranceState = "instant";
    };
    const onPreference = () => { if (reduced.matches) showAll(); };
    const onKeyboard = (event: KeyboardEvent) => {
      if (["Tab", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].includes(event.key)) showAll();
    };
    const onFocus = (event: FocusEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-scroll-entrance]") : null;
      if (element) { element.dataset.entranceState = "instant"; observer.unobserve(element); }
    };
    document.addEventListener("keydown", onKeyboard);
    page.addEventListener("focusin", onFocus);
    reduced.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", onKeyboard);
      page.removeEventListener("focusin", onFocus);
      reduced.removeEventListener("change", onPreference);
      for (const element of elements) delete element.dataset.entranceState;
    };
  }, []);
  return null;
}
