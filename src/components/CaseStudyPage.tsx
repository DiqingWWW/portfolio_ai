import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface CaseStudySection {
  number: string;
  label: string;
  title: string;
  paragraphs: string[];
}

export interface CaseStudyContent {
  eyebrow: string;
  title: string;
  summary: string;
  role: string;
  status: string;
  disciplines: string[];
  heroAlt: string;
  heroCaption: string;
  sections: CaseStudySection[];
  gallery: { src: StaticImageData; alt: string; caption: string }[];
}

export default function CaseStudyPage({ content, hero }: { content: CaseStudyContent; hero: StaticImageData }) {
  return (
    <main className="case-study-page min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-20 border-b border-workspace-border bg-workspace-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Workspace
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-workspace-muted">Case study · {content.status}</span>
        </div>
      </header>
      <article>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-[1fr_18rem] lg:pt-24">
          <div>
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-workspace-accent">{content.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{content.title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl">{content.summary}</p>
          </div>
          <dl className="grid content-start gap-5 border-t border-workspace-border pt-6 text-sm lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div><dt className="font-mono text-[10px] uppercase tracking-widest text-workspace-muted">Role</dt><dd className="mt-1 font-semibold">{content.role}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-widest text-workspace-muted">Status</dt><dd className="mt-1 font-semibold">{content.status}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-widest text-workspace-muted">Focus</dt><dd className="mt-2 flex flex-wrap gap-2">{content.disciplines.map((item) => <span key={item} className="rounded-full border border-workspace-border bg-white px-2.5 py-1 text-xs">{item}</span>)}</dd></div>
          </dl>
        </section>
        <figure className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-workspace-border bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)]"><Image src={hero} alt={content.heroAlt} priority sizes="(max-width:1280px) 100vw, 1280px" className="h-auto w-full" /></div>
          <figcaption className="mx-auto max-w-5xl px-2 py-4 font-mono text-[11px] leading-5 text-workspace-muted">{content.heroCaption}</figcaption>
        </figure>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          {content.sections.map((section) => <section key={section.number} className="grid gap-6 border-t border-workspace-border py-12 sm:grid-cols-[9rem_1fr] sm:gap-10 sm:py-16">
            <div><span className="font-mono text-xs font-bold text-workspace-accent">{section.number}</span><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-workspace-muted">{section.label}</p></div>
            <div><h2 className="max-w-3xl text-2xl font-black tracking-[-0.03em] sm:text-4xl">{section.title}</h2><div className="mt-6 max-w-3xl space-y-5 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">{section.paragraphs.map((p) => <p key={p}>{p}</p>)}</div></div>
          </section>)}
          <section className="grid gap-8 border-t border-workspace-border py-12 sm:grid-cols-2">
            {content.gallery.map((image) => <figure key={image.caption}><div className="overflow-hidden rounded-2xl border border-workspace-border bg-white"><Image src={image.src} alt={image.alt} className="h-auto w-full" sizes="(max-width:640px) 100vw, 50vw" /></div><figcaption className="mt-3 text-xs leading-5 text-workspace-muted">{image.caption}</figcaption></figure>)}
          </section>
        </div>
      </article>
    </main>
  );
}
