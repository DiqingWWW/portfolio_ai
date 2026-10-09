import { ArrowRight, ArrowUpRight } from "lucide-react";
import { reviewExtensions, caseStudyTokens, caseStudyBreakpoints } from "./case-study.registry";
import { systemCoverage as baseCopy } from "./system-coverage";
import { useCatalogue } from "./CatalogueLocale";
import primitives from "./CaseStudyPrimitives.module.css";
import s from "./SystemCoverage.module.css";
import type { CSSProperties } from "react";
import { homeSourceTokens } from "./home-source.registry";
import { portfolioCaseStudyCandidateZh } from "@content/projects/portfolio-operating-system/case-study.candidate.zh";
import { portfolioCaseStudyCandidateEn } from "@content/projects/portfolio-operating-system/case-study.candidate.en";
import homeCopy from "@content/prototypes/fabrica-study.json";

export default function SystemCoverage() {
  const { locale, localize } = useCatalogue();
  const copy = localize(baseCopy);
  const extensions = localize(reviewExtensions);
  const project = locale === "en" ? portfolioCaseStudyCandidateEn : portfolioCaseStudyCandidateZh;
  return <div className={s.root} style={{...caseStudyTokens, ...homeSourceTokens} as CSSProperties}>
    <style>{`@media(max-width:${caseStudyBreakpoints.compact}){.${s.patterns},.${s.evidenceSample}>div{grid-template-columns:var(--grid-single)}}`}</style>
    <p>{copy.intro}</p>
    <h3>{copy.homeTitle}</h3><p>{copy.homeIntro}</p>
    <div className={s.patterns}>{copy.homePatterns.map(pattern => <article key={pattern.name}><h4>{pattern.name}</h4><code>{pattern.source}</code><p>{pattern.values}</p><p>{pattern.role}</p><a className={primitives.button} href={locale === "zh" ? `/zh${pattern.href}` : pattern.href}>{copy.viewHome}<ArrowUpRight aria-hidden="true" /></a></article>)}</div>
    <div className={s.evidenceSample}><h4>{copy.homePatterns[0].name}</h4><div>{project.hero.outcomes.map(outcome => <article key={outcome.label}><span>{outcome.label}</span><p>{outcome.value}</p></article>)}</div></div>
    <div className={s.contactSample}><h4>{homeCopy[locale].contactTitle}</h4><p>{homeCopy[locale].contactIntro}</p></div>
    <details><summary>{copy.viewSourceTokens}</summary><dl className={s.extensions}>{Object.entries(homeSourceTokens).map(([role,value]) => <div key={role}><dt><code>{role}</code></dt><dd><code>{value}</code></dd></div>)}</dl></details>
    <h3>{copy.bindingTitle}</h3><ol className={s.chain}>{copy.binding.map((step,i) => <li key={step}><span>{step}</span>{i < copy.binding.length-1 && <ArrowRight aria-hidden="true" />}</li>)}</ol><p>{copy.bindingNote}</p>
    <h3>{copy.decisionTitle}</h3><div className={primitives.decision}><p>{copy.decision}</p></div><div className={s.controls}><a className={primitives.button} href="#components">{copy.button}<ArrowUpRight aria-hidden="true" /></a><button className={primitives.button} data-variant="quiet" type="button" aria-label={copy.quiet}><ArrowRight aria-hidden="true" /></button></div>
    <h3>{copy.pendingTitle}</h3><p>{copy.pendingNote}</p>
    <dl className={s.extensions}>{extensions.map(row => <div key={row.role}><dt><code>{row.role}</code></dt><dd><code>{row.value}</code><strong>{row.status}</strong><small>{row.source}</small><p>{row.use}</p></dd></div>)}</dl>
  </div>;
}
