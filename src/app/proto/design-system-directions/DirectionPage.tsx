"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Play, RotateCcw, Sparkles } from "lucide-react";
import { directionCopy, directions, project, systemSpecs, type DirectionSlug } from "./data";
import styles from "./directions.module.css";

export function DirectionPage({ direction }: { direction: DirectionSlug }) {
  const router = useRouter();
  const copy = directionCopy[direction];
  const spec = systemSpecs[direction];
  const activeIndex = directions.findIndex((item) => item.slug === direction);
  const pickerRef = useRef<HTMLElement>(null);
  const [replayKey, setReplayKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const moveHighlight = useCallback(() => {
    const picker = pickerRef.current;
    if (!picker) return;
    const items = picker.querySelectorAll<HTMLButtonElement>("[data-variant]");
    const highlight = picker.querySelector<HTMLSpanElement>("[data-highlight]");
    const active = items[activeIndex];
    if (!active || !highlight) return;
    highlight.style.width = `${active.offsetWidth}px`;
    highlight.style.transform = `translateX(${active.offsetLeft}px)`;
  }, [activeIndex]);

  useLayoutEffect(moveHighlight, [moveHighlight]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", ""));
    });
    const onResize = () => moveHighlight();
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const number = Number.parseInt(event.key, 10);
      if (number >= 1 && number <= directions.length) {
        router.push(`/proto/design-system-directions/${directions[number - 1].slug}`);
      } else if (event.key === "ArrowRight") {
        router.push(`/proto/design-system-directions/${directions[(activeIndex + 1) % directions.length].slug}`);
      } else if (event.key === "ArrowLeft") {
        router.push(`/proto/design-system-directions/${directions[(activeIndex - 1 + directions.length) % directions.length].slug}`);
      } else if (event.key.toLowerCase() === "r") {
        setReplayKey((key) => key + 1);
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, moveHighlight, router]);

  return (
    <main className={`${styles.page} ${styles[direction]}`} data-direction={direction}>
      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={styles.shell} key={replayKey}>
        <header className={styles.header}>
          <a className={styles.brand} href="#top" aria-label="Diqing design system exploration home">
            DQ<span>®</span>
          </a>
          <p className={styles.headerNote}>Portfolio system / Proposed direction</p>
          <a className={styles.headerAction} href="#components">Review components</a>
        </header>

        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
          </div>
          <div className={styles.heroAside}>
            <p>{copy.description}</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#components">
                Explore system <ArrowRight aria-hidden="true" size={17} />
              </a>
              <button className={styles.secondaryButton} type="button" onClick={() => setReplayKey((key) => key + 1)}>
                Replay motion
              </button>
            </div>
          </div>
          <div className={styles.principles} aria-label="Direction principles">
            {copy.principles.map((principle, index) => (
              <div key={principle}>
                <span>0{index + 1}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.foundationSection} id="foundations">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Foundational elements / Proposed tokens</p>
            <h2>The decisions behind the surface.</h2>
            <p>{spec.sourceNote}</p>
          </div>

          <div className={styles.foundationGrid}>
            <article className={`${styles.specPanel} ${styles.colorSpec}`}>
              <div className={styles.specHeading}><span>01</span><div><h3>Color palette</h3><p>Semantic roles, usage and minimum contrast.</p></div></div>
              <div className={styles.colorRows}>
                {spec.colors.map((color) => (
                  <div className={styles.colorRow} key={color.token}>
                    <i style={{ background: color.value }} aria-hidden="true" />
                    <div><b>{color.name}</b><code>{color.token}</code></div>
                    <div><span>{color.value}</span><small>{color.use}</small></div>
                    <em>{color.contrast}</em>
                  </div>
                ))}
              </div>
              <p className={styles.a11yRule}>Rule: body text targets WCAG AA 4.5:1; large text 3:1; focus and component boundaries 3:1. Status never relies on color alone.</p>
            </article>

            <article className={styles.specPanel}>
              <div className={styles.specHeading}><span>02</span><div><h3>Typography scale</h3><p>Family, weight, size, leading and tracking.</p></div></div>
              <div className={styles.typeTable} role="table" aria-label="Typography scale">
                <div className={styles.tableHead} role="row"><span>Role</span><span>Family / weight</span><span>Size / line</span><span>Tracking</span></div>
                {spec.type.map((type) => <div role="row" key={type.role}><b>{type.role}</b><span>{type.family}<small>{type.weight}</small></span><span>{type.size}px<small>{type.line}</small></span><code>{type.tracking}</code></div>)}
              </div>
            </article>

            <article className={styles.specPanel}>
              <div className={styles.specHeading}><span>03</span><div><h3>Spacing & layout</h3><p>4px base scale with bounded responsive decisions.</p></div></div>
              <div className={styles.spaceScale} aria-label="Spacing scale">
                {spec.spacing.map((space) => <span key={space}><i style={{ inlineSize: `${Math.max(Number(space), 2)}px` }} /> <code>{space}px</code></span>)}
              </div>
              <dl className={styles.metricList}>{spec.layout.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
            </article>

            <article className={styles.specPanel}>
              <div className={styles.specHeading}><span>04</span><div><h3>Assets & motion</h3><p>One visual vocabulary and one response grammar.</p></div></div>
              <div className={styles.ruleColumns}>
                <dl>{spec.assets.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.rule}</dd></div>)}</dl>
                <dl>{spec.motion.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.componentSection} id="components">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Component stress test</p>
            <h2>One system, every state.</h2>
            <p>Visible state inventory, exact geometry and equivalent content across all five directions.</p>
          </div>

          <div className={styles.metricsBar}>
            {spec.componentMetrics.map((item) => <div key={item.label}><span>{item.label}</span><b>{item.value}</b></div>)}
          </div>

          <div className={styles.componentGrid}>
            <article className={`${styles.panel} ${styles.buttonPanel}`}>
              <p className={styles.panelLabel}>01 / Button</p>
              <h3>Action hierarchy</h3>
              <div className={styles.stateGrid}>
                <span>Primary</span><button className={styles.primaryButton} type="button">Save direction</button>
                <span>Secondary</span><button className={styles.secondaryButton} type="button">Compare tokens</button>
                <span>Quiet</span><button className={styles.quietButton} type="button">View mapping</button>
                <span>Hover</span><button className={styles.primaryButton} data-demo-state="hover" type="button">Save direction</button>
                <span>Focus</span><button className={styles.primaryButton} data-demo-state="focus" type="button">Save direction</button>
                <span>Pressed</span><button className={styles.primaryButton} data-demo-state="pressed" type="button">Save direction</button>
                <span>Disabled</span><button className={styles.primaryButton} type="button" disabled>Unavailable</button>
                <span>Loading</span><button className={styles.primaryButton} aria-busy="true" type="button"><i className={styles.spinner} aria-hidden="true" /> Saving…</button>
              </div>
            </article>

            <article className={`${styles.panel} ${styles.formPanel}`}>
              <p className={styles.panelLabel}>02 / Text field</p>
              <h3>Every validation state</h3>
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <label htmlFor={`${direction}-component`}>Default</label><input id={`${direction}-component`} name="component" placeholder="Enter a stable system name" autoComplete="off" spellCheck="false" />
                <label htmlFor={`${direction}-hover`}>Hover</label><input id={`${direction}-hover`} data-demo-state="hover" defaultValue="Project card" readOnly />
                <label htmlFor={`${direction}-focus`}>Focus</label><input id={`${direction}-focus`} data-demo-state="focus" defaultValue="project.card" readOnly />
                <label htmlFor={`${direction}-filled`}>Filled</label><input id={`${direction}-filled`} defaultValue="project.card" readOnly />
                <label htmlFor={`${direction}-error`}>Error</label><div><input id={`${direction}-error`} data-demo-state="error" defaultValue="card 01" aria-invalid="true" aria-describedby={`${direction}-error-message`} readOnly /><p className={styles.errorText} id={`${direction}-error-message`}>Use dots instead of spaces.</p></div>
                <label htmlFor={`${direction}-disabled`}>Disabled</label><input id={`${direction}-disabled`} defaultValue="system.locked" disabled />
                <button className={styles.primaryButton} type="submit">
                  {submitted ? <><Check aria-hidden="true" size={16} /> Saved</> : "Save component"}
                </button>
              </form>
            </article>

            <article className={`${styles.panel} ${styles.disclosurePanel}`}>
              <p className={styles.panelLabel}>03 / Disclosure</p>
              <h3>Rules stay close</h3>
              <details open>
                <summary>Why is this component shared?</summary>
                <p>It expresses the same intent in repeated, accepted use and preserves keyboard behavior without custom state.</p>
              </details>
              <details>
                <summary>What stays local?</summary>
                <p>Project evidence, brand treatments, and one-off narrative compositions remain locally scoped.</p>
              </details>
            </article>

            <article className={`${styles.panel} ${styles.tokenPanel}`}>
              <p className={styles.panelLabel}>04 / Card resilience</p>
              <h3>Content cannot break it</h3>
              <div className={styles.miniCards}>
                <article tabIndex={0}><div className={styles.miniMedia} /><span>With image</span><b>Interface ecology</b></article>
                <article tabIndex={0}><span>No image</span><b>Strategy and governance</b><p>Supports a text-only evidence path.</p></article>
                <article tabIndex={0}><span>Long title</span><b>Cross-platform interaction architecture for adaptive mobility environments</b></article>
                <article tabIndex={0}><span>中文适配</span><b>本田跨平台智能座舱设计系统</b></article>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.patternSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Patterns & implementation</p>
            <h2>Components only matter in relationships.</h2>
            <p>Navigation, modal behavior and code mapping remain shared while visual tokens change by direction.</p>
          </div>
          <div className={styles.patternGrid}>
            <article className={styles.specPanel}><p className={styles.panelLabel}>Navigation pattern</p><h3>Persistent orientation</h3><p>Brand left, current section centered, one next action right. At mobile widths the context label collapses before the action.</p><code>header → nav landmark → current page → primary destination</code></article>
            <article className={styles.specPanel}><p className={styles.panelLabel}>Modal pattern</p><h3>Focus stays contained</h3><p>Open from an explicit trigger, focus the title or first field, close on Escape, restore focus to the trigger, and block background scroll.</p><code>Dialog.Root + Overlay + Content + Close</code></article>
            <article className={styles.specPanel}><p className={styles.panelLabel}>Code mapping</p><h3>Semantic tokens in code</h3><pre><code>{`.projectCard {\n  padding: var(--space-6);\n  color: var(--text-primary);\n  background: var(--surface-raised);\n  border-radius: var(--radius-panel);\n}`}</code></pre></article>
          </div>
          <div className={styles.qaBar} aria-label="Responsive and accessibility test matrix">
            <div><span>320px viewport</span><b>Single column · no horizontal page overflow</b></div>
            <div><span>200% text</span><b>Content reflows · controls keep visible labels</b></div>
            <div><span>Reduced motion</span><b>Static final frame · no transform or fade</b></div>
            <div><span>Keyboard</span><b>Visible focus · native disclosure behavior</b></div>
          </div>
        </section>

        <section className={styles.projectSection}>
          <div className={styles.projectIntro}>
            <p className={styles.eyebrow}>Real content test</p>
            <h2>A project card has to carry evidence—not just look composed.</h2>
          </div>
          <article className={styles.projectCard}>
            <div className={styles.projectMedia}>
              {/* This prototype intentionally uses the generated public asset directly. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt="Honda HMI Design System interface overview" width="1536" height="1024" />
              <div className={styles.mediaBadge}><Sparkles aria-hidden="true" size={15} /> Published work</div>
              {direction === "gsap" && <div className={styles.playBadge}><Play aria-hidden="true" fill="currentColor" size={18} /></div>}
            </div>
            <div className={styles.projectBody}>
              <div className={styles.projectTitle}>
                <p>Professional project · 2024</p>
                <h3>{project.title}</h3>
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <dl>
                {project.stats.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <a className={styles.projectLink} href="/work/honda-hmi-design-system">
                Read case study <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </article>
        </section>

        <footer className={styles.footer}>
          <p>Proposed direction · isolated from production</p>
          <p>Use 1–5 or ← → to compare · R to replay</p>
        </footer>
      </div>

      <nav className={styles.protoPicker} aria-label="Prototype variants" ref={pickerRef}>
        <span className={styles.protoPickerHighlight} data-highlight aria-hidden="true" />
        {directions.map((item, index) => (
          <button
            className={styles.protoPickerItem}
            data-active={index === activeIndex ? "" : undefined}
            data-variant
            aria-current={index === activeIndex ? "page" : undefined}
            key={item.slug}
            onClick={() => router.push(`/proto/design-system-directions/${item.slug}`)}
            type="button"
          >
            {item.label}
          </button>
        ))}
        <span className={styles.protoPickerDivider} aria-hidden="true" />
        <button
          className={`${styles.protoPickerItem} ${styles.protoPickerReplay}`}
          aria-label="Replay animation (R)"
          onClick={() => setReplayKey((key) => key + 1)}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={14} />
        </button>
      </nav>
    </main>
  );
}
