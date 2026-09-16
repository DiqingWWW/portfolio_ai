"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

/** Progressive enhancement: server-rendered content is visible without this observer. */
export default function ScrollEntrances() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(`.${styles.animatedPage}`);
    if (!page || !("IntersectionObserver" in window)) return;
    const elements = Array.from(page.querySelectorAll<HTMLElement>("[data-scroll-entrance]"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.entranceState = "visible";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -64px 0px", threshold: 0 });

    // Deep links and restored scroll positions must never hide already-visible content.
    for (const element of elements) {
      if (!reduced.matches && element.getBoundingClientRect().top >= innerHeight - 64) {
        element.dataset.entranceState = "pending";
        observer.observe(element);
      }
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
