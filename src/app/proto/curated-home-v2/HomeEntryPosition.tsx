"use client";

import { useLayoutEffect } from "react";

/** A plain homepage URL is an opening, even when the browser restores an old scroll offset. */
export default function HomeEntryPosition() {
  useLayoutEffect(() => {
    if (location.hash && location.hash !== "#top") return;
    const entryWindow = window as Window & {
      __portfolioHomePreviousScrollRestoration?: History["scrollRestoration"];
      __portfolioHomeOpeningActive?: boolean;
    };
    const previous = entryWindow.__portfolioHomePreviousScrollRestoration ?? history.scrollRestoration;
    entryWindow.__portfolioHomeOpeningActive = true;
    const allowNavigation = () => {
      entryWindow.__portfolioHomeOpeningActive = false;
    };
    const keepOpeningAtTop = () => {
      if (entryWindow.__portfolioHomeOpeningActive !== true || (location.hash && location.hash !== "#top")) return;
      if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: "instant" });
    };

    history.scrollRestoration = "manual";
    keepOpeningAtTop();
    // A delayed browser/Next scroll restoration can happen after the first paint.
    // Capture it before the hero interprets that scroll as an intentional skip.
    window.addEventListener("scroll", keepOpeningAtTop, true);
    window.addEventListener("pageshow", keepOpeningAtTop);
    window.addEventListener("load", keepOpeningAtTop);
    window.addEventListener("wheel", allowNavigation, { passive: true, capture: true });
    window.addEventListener("touchstart", allowNavigation, { passive: true, capture: true });
    window.addEventListener("pointerdown", allowNavigation, true);
    window.addEventListener("keydown", allowNavigation, true);
    return () => {
      window.removeEventListener("scroll", keepOpeningAtTop, true);
      window.removeEventListener("pageshow", keepOpeningAtTop);
      window.removeEventListener("load", keepOpeningAtTop);
      window.removeEventListener("wheel", allowNavigation, true);
      window.removeEventListener("touchstart", allowNavigation, true);
      window.removeEventListener("pointerdown", allowNavigation, true);
      window.removeEventListener("keydown", allowNavigation, true);
      history.scrollRestoration = previous;
      delete entryWindow.__portfolioHomePreviousScrollRestoration;
      delete entryWindow.__portfolioHomeOpeningActive;
    };
  }, []);

  return <script dangerouslySetInnerHTML={{ __html: `
    if (!location.hash || location.hash === "#top") {
      window.__portfolioHomePreviousScrollRestoration = history.scrollRestoration;
      window.__portfolioHomeOpeningActive = true;
      history.scrollRestoration = "manual";
      scrollTo(0, 0);
    }
  ` }} />;
}
