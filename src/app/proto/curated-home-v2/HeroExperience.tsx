"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { createSmokeRenderer } from "./smoke-renderer";
import styles from "./page.module.css";

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (v: number) => 1 - (1 - clamp(v)) ** 3;
const easeInOut = (v: number) => {
  const t = clamp(v);
  return t < .5 ? 4*t*t*t : 1 - (-2*t+2) ** 3/2;
};

export default function HeroExperience({ heading, cta, statement, name }: {
  heading: ReactNode;
  cta: ReactNode;
  statement: string;
  name: string;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const cardBodyRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const splitAt = name.lastIndexOf(" ");
  const firstName = splitAt < 0 ? name : name.slice(0, splitAt);
  const lastName = splitAt < 0 ? "" : name.slice(splitAt + 1);

  useLayoutEffect(() => {
    const hero = heroRef.current, canvas = canvasRef.current;
    const dock = dockRef.current, card = cardRef.current, text = textRef.current;
    const surface = surfaceRef.current, cardBody = cardBodyRef.current;
    if (!hero || !canvas || !dock || !card || !text || !surface || !cardBody) return;
    const intro = introRef.current, first = firstWordRef.current, last = lastWordRef.current;
    const blur = blurRef.current;
    if (!intro || !first || !last || !blur) return;
    const finalCopy = [hero.querySelector("h1"), hero.querySelector(`.${styles.heroHeading} > p`), hero.querySelector(`.${styles.heroCta}`)] as HTMLElement[];
    const page = hero.closest<HTMLElement>(`.${styles.page}`)!;
    const homeCanvas = page.querySelector<HTMLCanvasElement>(`.${styles.homeField}`);
    const homeTab = homeCanvas?.parentElement;
    const homeContext = homeCanvas?.getContext("2d", { alpha: false });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const renderer = createSmokeRenderer(canvas);
    const glyphs = Array.from(statement);
    const nameGlyphs = Array.from(name);
    // Timing is Proposed and local to this visual study.
    const nameAt = .65, nameDoneAt = 2.05;
    const cursorAt = 2.4, popupAt = 2.95, typingAt = 3.95;
    const typedAt = typingAt + glyphs.length * .042;
    const dockAt = typedAt + .4, dockedAt = dockAt + 1.35, doneAt = dockedAt + 1.55;
    let elapsed = 0, lastFrame = 0, lastDraw = -1, raf = 0;
    let visible = true, disposed = false, contextLost = false;
    let lastCount = -1, lastNameCount = -1, phase = "";
    let bounds = hero.getBoundingClientRect();
    let homeBounds = homeTab?.getBoundingClientRect();
    let fieldExtension = 0, fieldHeight = bounds.height;
    let center: [number, number] = [.5, .5];
    let fromX = 0, fromY = 0;
    let pointerActive = false, blurOpacity = 0;
    let pointerX = 0, pointerY = 0, blurX = 0, blurY = 0;
    let blurDiameter = 340;
    const pointerState = new Float32Array(4);

    const updateBlur = (dt: number) => {
      const enabled = pointerActive && elapsed >= doneAt && finePointer.matches && !reduced.matches;
      if (!enabled && blurOpacity < .002) {
        if (blurOpacity !== 0) { blurOpacity = 0; blur.style.opacity = "0"; }
        return;
      }
      const follow = 1-Math.exp(-dt*18);
      blurX += (pointerX-blurX)*follow;
      blurY += (pointerY-blurY)*follow;
      blurOpacity += ((enabled ? 1 : 0)-blurOpacity)*(1-Math.exp(-dt*8));
      blur.style.opacity = blurOpacity < .002 ? "0" : String(blurOpacity);
      blur.style.transform = `translate3d(${blurX}px, ${blurY}px, 0) translate(-50%, -50%)`;
    };

    const updateSequence = () => {
      const ready = elapsed >= doneAt;
      if (ready && phase === "ready") return;
      const next = ready ? "ready" : elapsed >= dockedAt ? "settling" : elapsed >= dockAt ? "docking" : elapsed >= typingAt ? "typing" : elapsed >= popupAt ? "popup" : elapsed >= cursorAt ? "split" : elapsed >= nameAt ? "name" : "reveal";
      if (next !== phase) { hero.dataset.phase = next; phase = next; }
      page.style.setProperty("--intro-copy", String(easeOut((elapsed-2.8)/1.2)));
      const nameCount = Math.floor(clamp((elapsed-nameAt)/(nameDoneAt-nameAt))*nameGlyphs.length);
      if (nameCount !== lastNameCount) {
        const typedName = nameGlyphs.slice(0,nameCount).join("");
        first.textContent = typedName.slice(0, firstName.length);
        last.textContent = typedName.slice(firstName.length+1);
        lastNameCount = nameCount;
      }
      const count = ready ? glyphs.length : Math.floor(clamp((elapsed-typingAt)/(typedAt-typingAt))*glyphs.length);
      if (count !== lastCount) { text.textContent = glyphs.slice(0, count).join(""); lastCount = count; }
      const enter = easeInOut((elapsed-popupAt)/.8);
      const travel = easeInOut((elapsed-dockAt)/1.35);
      card.style.opacity = String(easeOut((elapsed-cursorAt)/.18));
      card.style.transform = `translate3d(${fromX*(1-travel)}px, ${fromY*(1-travel)}px, 0)`;
      // The surface alone unfolds from a caret; text is never stretched.
      surface.style.transform = `scale(${.007+.993*enter}, ${.52+.48*enter})`;
      cardBody.style.opacity = String(easeOut((elapsed-typingAt)/.18));
      // The opening name splits and disappears BEFORE the white surface expands.
      const split = easeInOut((elapsed-cursorAt)/.48);
      const dissolve = easeInOut((elapsed-cursorAt-.06)/.36);
      intro.style.opacity = String(elapsed >= nameAt ? 1-dissolve : 0);
      intro.style.filter = `blur(${dissolve*5}px)`;
      first.parentElement!.style.transform = `translateX(${-26*split}px)`;
      last.parentElement!.style.transform = `translateX(${26*split}px)`;
      // These are the real, fixed-position texts. They never fly across the hero.
      finalCopy.forEach((element, index) => {
        const progress = easeInOut((elapsed-dockedAt-index*.12)/1.2);
        element.style.opacity = String(progress);
        element.style.filter = progress >= 1 ? "none" : `blur(${(1-progress)*(index ? 8 : 14)}px)`;
      });
    };

    // Home is a live crop of this very frame, not a second gradient or simulation.
    // Extend the render above the hero, then copy only the tiny bookmark viewport.
    const drawHome = () => {
      if (!homeCanvas || !homeContext || !homeBounds) return;
      const scaleX = canvas.width/bounds.width, scaleY = canvas.height/fieldHeight;
      const homeIsActive = homeTab?.getAttribute("aria-current") === "location";
      homeContext.fillStyle = "#f4f3ee";
      homeContext.fillRect(0, 0, homeCanvas.width, homeCanvas.height);
      homeContext.drawImage(canvas,
        (homeBounds.left-bounds.left)*scaleX,
        (homeIsActive ? homeBounds.top-bounds.top+fieldExtension : 0)*scaleY,
        homeBounds.width*scaleX, homeBounds.height*scaleY,
        0, 0, homeCanvas.width, homeCanvas.height);
    };

    const draw = () => {
      const enabled = elapsed >= doneAt && finePointer.matches && !reduced.matches;
      pointerState.set([blurX/bounds.width, (blurY+fieldExtension)/fieldHeight, blurDiameter*.27/fieldHeight, enabled ? blurOpacity : 0]);
      const fieldCenter: [number, number] = [center[0], (center[1]*bounds.height+fieldExtension)/fieldHeight];
      renderer?.draw(reduced.matches ? 4 : elapsed, clamp(elapsed/2.65), fieldCenter, reduced.matches ? 0 : Math.max(0, elapsed-doneAt), pointerState);
      drawHome();
    };

    const finish = () => {
      if (elapsed < doneAt) { elapsed = doneAt; updateSequence(); draw(); }
    };
    const resize = () => {
      bounds = hero.getBoundingClientRect();
      homeBounds = homeTab?.getBoundingClientRect();
      fieldExtension = homeBounds?.height ?? 0;
      fieldHeight = bounds.height+fieldExtension;
      canvas.style.top = `${-fieldExtension}px`;
      canvas.style.height = `${fieldHeight}px`;
      blurDiameter = blur.offsetWidth || 340;
      const target = dock.getBoundingClientRect();
      center = [(innerWidth*.5-bounds.left)/bounds.width, (innerHeight*.5-bounds.top)/bounds.height];
      fromX = innerWidth*.5 - (target.left+target.width*.5);
      fromY = innerHeight*.5 - (target.top+target.height*.5);
      intro.style.left = `${center[0]*bounds.width}px`;
      intro.style.top = `${center[1]*bounds.height}px`;
      renderer?.resize(bounds.width, fieldHeight, !finePointer.matches);
      if (homeCanvas && homeBounds) {
        homeCanvas.width = Math.max(1, Math.round(homeBounds.width*canvas.width/bounds.width));
        homeCanvas.height = Math.max(1, Math.round(homeBounds.height*canvas.height/fieldHeight));
      }
      updateSequence(); draw();
    };
    const tick = (now: number) => {
      raf = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const dt = lastFrame ? Math.min((now-lastFrame)/1000, .08) : 0;
      elapsed += dt;
      lastFrame = now;
      updateSequence();
      updateBlur(dt);
      const interval = finePointer.matches ? 1000/30 : 1000/20;
      if (now-lastDraw >= interval) { draw(); lastDraw = now; }
      if (!reduced.matches) raf = requestAnimationFrame(tick);
    };
    const resume = () => {
      cancelAnimationFrame(raf); lastFrame = 0;
      pointerActive = false; blurOpacity = 0; blur.style.opacity = "0";
      if (reduced.matches) { finish(); draw(); return; }
      if (visible && !document.hidden && !contextLost) raf = requestAnimationFrame(tick);
    };
    const pointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduced.matches || event.pointerType !== "mouse" || elapsed < doneAt) return;
      pointerX = event.clientX-bounds.left;
      pointerY = event.clientY-bounds.top;
      if (!pointerActive) { blurX = pointerX; blurY = pointerY; }
      pointerActive = true;
    };
    const pointerLeave = () => { pointerActive = false; };
    const scroll = () => {
      if (scrollY > 8) finish();
      bounds = hero.getBoundingClientRect();
      homeBounds = homeTab?.getBoundingClientRect();
      if (reduced.matches) draw();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (["Tab", "Escape", "PageDown", "ArrowDown", "End", " "].includes(event.key)) finish();
    };
    const lost = (event: Event) => {
      event.preventDefault(); contextLost = true;
      cancelAnimationFrame(raf);
      hero.dataset.renderer = "fallback";
      finish();
    };

    if (!renderer) {
      hero.dataset.renderer = "fallback";
      finish();
      return;
    }
    hero.dataset.renderer = "webgl";
    if (reduced.matches || scrollY > 8 || location.hash) elapsed = doneAt;
    resize(); resume();
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    observer.observe(dock);
    if (homeTab) observer.observe(homeTab);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    intersection.observe(hero);
    hero.addEventListener("pointermove", pointerMove, { passive: true });
    hero.addEventListener("pointerleave", pointerLeave);
    hero.addEventListener("pointercancel", pointerLeave);
    canvas.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", resume);
    document.addEventListener("keydown", keyboard);
    // Keyboard intent skips the intro; passive browser/window focus must not skip it.
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resume);
    finePointer.addEventListener("change", resize);
    return () => {
      disposed = true; cancelAnimationFrame(raf);
      observer.disconnect(); intersection.disconnect(); renderer.dispose();
      hero.removeEventListener("pointermove", pointerMove);
      hero.removeEventListener("pointerleave", pointerLeave);
      hero.removeEventListener("pointercancel", pointerLeave);
      canvas.removeEventListener("webglcontextlost", lost);
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", resume);
      finePointer.removeEventListener("change", resize);
      page.style.removeProperty("--intro-copy");
    };
  }, [statement, name, firstName]);

  return <section ref={heroRef} className={`${styles.hero} ${styles.experience}`} aria-labelledby="hero-title" data-phase="reveal">
    <canvas ref={canvasRef} className={styles.smokeCanvas} aria-hidden="true" />
    {heading}
    <div className={styles.introName} ref={introRef} aria-hidden="true">
      <span className={styles.introWord}><span className={styles.typeMeasure}>{firstName}</span><span ref={firstWordRef} className={styles.nameInk}>{firstName}</span></span>
      <span className={styles.introWord}><span className={styles.typeMeasure}>{lastName}</span><span ref={lastWordRef} className={styles.nameInk}>{lastName}</span></span>
    </div>
    <div className={styles.heroBottom}>
      <div className={styles.statementDock} ref={dockRef}>
        <div ref={cardRef} className={styles.statementCard}>
          <div ref={surfaceRef} className={styles.statementSurface} aria-hidden="true" />
          <p ref={cardBodyRef}>
            <span className={styles.srOnly}>{statement}</span>
            <span className={styles.typeLayout} aria-hidden="true">
              <span className={styles.typeMeasure}>{statement}</span>
              <span className={styles.typeInk}><span ref={textRef}>{statement}</span><i className={styles.caret} /></span>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.revealCopy}>{cta}</div>
    </div>
    <div ref={blurRef} className={styles.pointerBlur} style={{
      maskImage: "radial-gradient(circle, black 0%, rgb(0 0 0 / .96) 25%, rgb(0 0 0 / .45) 49%, transparent 72%)",
      WebkitMaskImage: "radial-gradient(circle, black 0%, rgb(0 0 0 / .96) 25%, rgb(0 0 0 / .45) 49%, transparent 72%)",
    }} aria-hidden="true">
      <div className={styles.pointerBlurSurface} style={{ backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)" }} />
    </div>
  </section>;
}
