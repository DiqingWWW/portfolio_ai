"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import content from "@content/prototypes/curated-home.json";
import type { Locale } from "@/i18n/dictionary";
import styles from "./page.module.css";

export default function BookmarkNavigation({ locale = "en", referenceStudy = false, production = false }: { locale?: Locale; referenceStudy?: boolean; production?: boolean }) {
  const headerRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionTriggerRef = useRef<HTMLButtonElement>(null);
  const sectionMenuRef = useRef<HTMLDivElement>(null);
  const sectionMenuId = useId();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionMenuOpen, setSectionMenuOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [locationSuffix, setLocationSuffix] = useState("");
  const copy = content.locales[locale];
  const navigationItems = referenceStudy
    ? [
        content.navigation[0],
        content.navigation[1],
        { id: "studies", label: "Studies", labelZh: "研究", href: "#studies" },
        content.navigation[2],
      ]
    : content.navigation;

  // Both menus need the same preserved query/hash when switching language.
  const currentLocationSuffix = () => {
    const fallbackHash = active === "work" ? "#work"
      : active === "studies" ? "#studies"
      : active === "about" ? "#about-me"
      : "#top";
    return `${window.location.search}${window.location.hash || fallbackHash}`;
  };

  const openMenu = (keyboard: boolean) => {
    setInstant(keyboard);
    setLocationSuffix(currentLocationSuffix());
    setMenuOpen(true);
  };

  const openSectionMenu = (keyboard: boolean) => {
    setInstant(keyboard);
    setLocationSuffix(currentLocationSuffix());
    setSectionMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    // Focus after the formerly inert/hidden menu has become renderable.
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !languageRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!sectionMenuOpen) return;
    // Focus after the formerly inert/hidden menu has become renderable.
    const frame = requestAnimationFrame(() => sectionMenuRef.current?.querySelector<HTMLElement>('[aria-current="location"]')?.focus());
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !sectionRef.current?.contains(event.target)) setSectionMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [sectionMenuOpen]);

  const moveWithin = (container: HTMLElement | null, selector: string, event: KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(container?.querySelectorAll<HTMLElement>(selector) ?? []);
    const index = options.indexOf(document.activeElement as HTMLElement);
    const next = event.key === "ArrowDown" ? (index + 1) % options.length
      : event.key === "ArrowUp" ? (index + options.length - 1) % options.length
      : event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : -1;
    if (next >= 0) { event.preventDefault(); options[next]?.focus(); }
  };

  const navigateMenu = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      triggerRef.current?.focus();
      return;
    }
    moveWithin(menuRef.current, '[role="menuitemradio"]', event);
  };

  const navigateSectionMenu = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSectionMenuOpen(false);
      sectionTriggerRef.current?.focus();
      return;
    }
    // The menu holds both section links and language options; both must be arrow-reachable,
    // since every option is tabIndex={-1} by design.
    moveWithin(sectionMenuRef.current, '[role="menuitem"], [role="menuitemradio"]', event);
  };

  useEffect(() => {
    const header = headerRef.current;
    const work = header?.closest(`.${styles.page}`)?.querySelector("#work");
    if (!header || !work) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const activationLine = header.getBoundingClientRect().bottom + 8;
      const reachedWork = work.getBoundingClientRect().top <= activationLine;
      const about = referenceStudy ? document.getElementById("about-me") : null;
      const studies = referenceStudy ? document.getElementById("studies") : null;
      const reachedAbout = about && about.getBoundingClientRect().top <= activationLine;
      const reachedStudies = studies && studies.getBoundingClientRect().top <= activationLine;
      setActive(reachedAbout ? "about" : reachedStudies ? "studies" : reachedWork ? "work" : "home");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [referenceStudy]);

  useEffect(() => {
    if (!referenceStudy) return;
    headerRef.current?.querySelector<HTMLElement>('[aria-current="location"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active, referenceStudy]);

  const languageOptions = content.languages.options.map(option => {
    const current = option.locale === locale;
    const path = production
      ? option.locale === "zh" ? "/zh" : "/"
      : `${option.locale === "zh" ? "/zh" : ""}/proto/${referenceStudy ? "fabrica-study" : "curated-home-v2"}`;
    return <a key={option.locale} href={`${path}${locationSuffix}`} lang={option.locale === "zh" ? "zh-CN" : "en"}
      hrefLang={option.locale === "zh" ? "zh-CN" : "en"} role="menuitemradio" aria-checked={current}
      aria-disabled={current || undefined} tabIndex={-1} className={styles.languageOption}
      onClick={event => { if (current) event.preventDefault(); }}>
      <span>{option.label}</span>
      <span className={styles.languageStatus}>{current ? copy.currentLanguage : copy.availableLanguage}</span>
      {current && <Check size={16} aria-hidden="true" />}
    </a>;
  });

  return <header ref={headerRef} className={`${styles.header} ${styles.bookmarkHeader}`} data-active-section={active}
    data-reference-study={referenceStudy || undefined}
    style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
    <nav className={styles.bookmarkNavigation} aria-label={production ? locale === "zh" ? "主页导航" : "Homepage navigation" : copy.navigationLabel}>
      <div className={styles.bookmarkLinks}>
        {navigationItems.map(item => <Link key={item.id} href={referenceStudy && item.id === "about" ? "#about-me" : item.href}
          className={`${styles.bookmarkTab} ${item.id === "home" ? styles.homeTab : ""}`}
          aria-current={active === item.id ? "location" : undefined}>
          {item.id === "home" && <canvas className={styles.homeField} aria-hidden="true" />}
          <span className={styles.bookmarkLabel}>
            <span>{locale === "zh" ? item.labelZh : item.label}</span>
            <span className={styles.bookmarkSizer} aria-hidden="true">{locale === "zh" ? item.labelZh : item.label}</span>
          </span>
        </Link>)}
      </div>

      {/* Compact viewports show only the active section plus this menu; everything else lives inside. */}
      <div ref={sectionRef} className={styles.sectionControl} onKeyDown={navigateSectionMenu} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setSectionMenuOpen(false);
      }}>
        <button ref={sectionTriggerRef} type="button" className={`${styles.bookmarkTab} ${styles.sectionTrigger}`}
          aria-haspopup="menu" aria-expanded={sectionMenuOpen} aria-controls={sectionMenuId}
          aria-label={copy.menuAriaLabel}
          onClick={event => sectionMenuOpen ? setSectionMenuOpen(false) : openSectionMenu(event.detail === 0)}
          onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              event.stopPropagation();
              if (sectionMenuOpen) sectionMenuRef.current?.querySelector<HTMLElement>('[aria-current="location"]')?.focus();
              else openSectionMenu(true);
            }
          }}>
          <span className={styles.bookmarkLabel}>
            <span>{copy.menuLabel}</span>
            <span className={styles.bookmarkSizer} aria-hidden="true">{copy.menuLabel}</span>
          </span>
        </button>
        <div ref={sectionMenuRef} id={sectionMenuId} className={styles.sectionMenu} role="menu"
          aria-label={copy.menuAriaLabel} aria-hidden={!sectionMenuOpen} inert={!sectionMenuOpen}
          data-open={sectionMenuOpen} data-instant={instant}>
          <span className={styles.sectionGroupLabel} aria-hidden="true">{copy.sectionsLabel}</span>
          {navigationItems.map(item => <Link key={item.id} href={referenceStudy && item.id === "about" ? "#about-me" : item.href}
            role="menuitem" tabIndex={-1} className={styles.sectionOption}
            aria-current={active === item.id ? "location" : undefined}
            onClick={() => setSectionMenuOpen(false)}>
            <span>{locale === "zh" ? item.labelZh : item.label}</span>
            {active === item.id && <Check size={16} aria-hidden="true" />}
          </Link>)}
          <span className={styles.sectionDivider} aria-hidden="true" />
          <span className={styles.sectionGroupLabel} aria-hidden="true">{content.languages.label}</span>
          {languageOptions}
        </div>
      </div>

      <div ref={languageRef} className={styles.languageControl} onKeyDown={navigateMenu} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}>
        <button ref={triggerRef} type="button" className={`${styles.bookmarkTab} ${styles.languageTrigger}`}
          aria-haspopup="menu" aria-expanded={menuOpen} aria-controls={menuId}
          onClick={event => menuOpen ? setMenuOpen(false) : openMenu(event.detail === 0)}
          onKeyDown={event => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              event.stopPropagation();
              if (menuOpen) menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
              else openMenu(true);
            }
          }}>
          <span className={styles.bookmarkLabel}>
            <span>{content.languages.label}</span>
            <span className={styles.bookmarkSizer} aria-hidden="true">{content.languages.label}</span>
          </span>
        </button>
        <div ref={menuRef} id={menuId} className={styles.languageMenu} role="menu"
          aria-label={content.languages.label} aria-hidden={!menuOpen} inert={!menuOpen}
          data-open={menuOpen} data-instant={instant}>
          {languageOptions}
        </div>
      </div>
    </nav>
  </header>;
}
