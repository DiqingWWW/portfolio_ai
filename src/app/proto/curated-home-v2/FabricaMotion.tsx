"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import styles from "./fabrica.module.css";

export interface ServiceItem {
  title: string;
  body: string;
  tags: string[];
  images: string[];
}

/**
 * The reference uses a mixture of viewport entrances and scroll-linked media movement.
 * This controller keeps those effects outside React render loops and progressively enhances
 * fully visible server-rendered content.
 */
export function FabricaMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-fabrica-study]");
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = Array.from(root.querySelectorAll<HTMLElement>("[data-fabrica-reveal]"));
    const parallax = Array.from(root.querySelectorAll<HTMLElement>("[data-fabrica-parallax]"));
    const show = (element: HTMLElement) => { element.dataset.revealState = "visible"; };

    if (reduced.matches || !("IntersectionObserver" in window)) {
      reveal.forEach(show);
      return;
    }

    root.dataset.motionReady = "true";
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveal.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < innerHeight * .92) show(element);
      else observer.observe(element);
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      for (const element of parallax) {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (innerHeight * .5 - (rect.top + rect.height * .5)) / innerHeight));
        element.style.setProperty("--parallax", progress.toFixed(3));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);

    const preference = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      reveal.forEach(show);
      delete root.dataset.motionReady;
    };
    reduced.addEventListener("change", preference);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  return null;
}

export function ServiceAccordion({
  items,
  categories,
}: {
  items: ServiceItem[];
  categories: string;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return <div className={styles.serviceList}>
    {items.map((item, index) => {
      const open = index === active;
      return <article
        className={styles.serviceItem}
        data-open={open}
        key={item.title}
        onPointerEnter={event => {
          if (event.pointerType !== "touch") setActive(index);
        }}
      >
        <button
          type="button"
          className={styles.serviceTrigger}
          aria-expanded={open}
          aria-controls={`service-panel-${index}`}
          onClick={() => setActive(index)}
        >
          <span className={styles.serviceIndex}>({String(index + 1).padStart(3, "0")})</span>
          <span>{item.title}</span>
          <span className={styles.serviceToggle} aria-hidden="true">{open ? <Minus /> : <Plus />}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && <motion.div
            id={`service-panel-${index}`}
            className={styles.servicePanel}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { display: "none" } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : .48, ease: [.22, 1, .36, 1] }}
          >
            <div className={styles.serviceFan} aria-hidden="true">
              {item.images.slice(0, 3).map((src, imageIndex) =>
                <Image key={`${src}-${imageIndex}`} src={src} alt="" width={220} height={160} style={{ "--fan-index": imageIndex } as CSSProperties} />
              )}
            </div>
            <div className={styles.serviceCopy}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <div className={styles.serviceTags}>
              <span>{categories}</span>
              <div>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </motion.div>}
        </AnimatePresence>
      </article>;
    })}
  </div>;
}

export function ContactComposer({
  recipient,
  labels,
}: {
  recipient: string;
  labels: { name: string; email: string; message: string; send: string; note: string };
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [message, "", name && `From: ${name}`, email && `Reply to: ${email}`].filter(Boolean).join("\n");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent("Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
  };
  return <form ref={formRef} className={styles.contactForm} onSubmit={submit}>
    <label><span>{labels.name}*</span><input name="name" autoComplete="name" required /></label>
    <label><span>{labels.email}*</span><input name="email" type="email" autoComplete="email" required /></label>
    <label><span>{labels.message}</span><textarea name="message" rows={4} /></label>
    <button type="submit"><span>{labels.send}</span><ArrowUpRight aria-hidden="true" /></button>
    <p>{labels.note}</p>
  </form>;
}
