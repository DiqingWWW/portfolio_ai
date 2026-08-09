import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, Check, CircleAlert } from "lucide-react";
import {
  portfolioCaseStudy,
  portfolioContentBalance,
  portfolioSourceCoverage,
  type PortfolioMedia,
} from "@content/projects/portfolio-operating-system/case-study.en";

const project = portfolioCaseStudy;
const assetRoot = `/assets/images/${project.projectId}`;

function SourceSection({
  id,
  sourceIds,
  className = "",
  children,
}: {
  id: string;
  sourceIds: readonly string[];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-source-ids={sourceIds.join(" ")} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ title, summary }: { title: string; summary: string }) {
  return (
    <div className="max-w-[1100px] space-y-4">
      <h2 className="case-study-section-title text-balance">{title}</h2>
      <p className="max-w-[92ch] text-base leading-8 text-neutral-600 sm:text-lg">{summary}</p>
    </div>
  );
}

function Figure({ media, priority = false }: { media: PortfolioMedia; priority?: boolean }) {
  return (
    <figure data-source-ids={media.sourceIds.join(" ")} className="min-w-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_26px_70px_-42px_rgba(24,45,61,0.58)]">
        <Image
          src={`${assetRoot}/${media.src}`}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1280px"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 w-full text-xs leading-5 text-workspace-muted">
        <strong className="font-semibold text-neutral-700">{media.truthStatus}.</strong> {media.caption}
      </figcaption>
    </figure>
  );
}

function OutcomePreview() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0e1820] text-white">
      {project.hero.outputs.map((output, index) => (
        <div key={output.label} className="grid gap-2 border-b border-white/10 px-5 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:px-7">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#78c8ff]">{output.label}</span>
          <p className="text-sm leading-6 text-slate-100 sm:text-base">{output.value}</p>
          {index === project.hero.outputs.length - 1 ? null : <span className="sr-only">Next outcome</span>}
        </div>
      ))}
    </div>
  );
}

function DiffComparison() {
  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-label="Comparison of full-package handoff and bounded synchronization">
      {project.diffSync.methods.map((method, methodIndex) => (
        <article key={method.name} className={methodIndex === 0 ? "rounded-2xl bg-[#e7e3dc] p-6 sm:p-8" : "rounded-2xl bg-[#2e94e3] p-6 text-white sm:p-8"}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className={methodIndex === 0 ? "case-study-subsection-title text-neutral-800" : "case-study-subsection-title !text-white"}>{method.name}</h3>
            <span className={methodIndex === 0 ? "rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-600" : "rounded-full bg-white/14 px-3 py-1 text-xs font-semibold text-white"}>{method.status}</span>
          </div>
          <ol className="mt-8 grid gap-3">
            {method.flow.map((step, stepIndex) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] items-center gap-3">
                <span className={methodIndex === 0 ? "flex h-8 w-8 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-neutral-700" : "flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#12689f]"}>
                  {methodIndex === 1 && stepIndex === method.flow.length - 1 ? <Check className="h-4 w-4" aria-hidden="true" /> : stepIndex + 1}
                </span>
                <span className={methodIndex === 0 ? "text-sm font-medium text-neutral-700" : "text-sm font-medium text-white"}>{step}</span>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

function TagNetwork() {
  return (
    <div className="rounded-2xl bg-[#0e1820] p-5 text-white sm:p-8" aria-label="Several tags connect to one independent project while the project folder opens all projects">
      <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_3rem_minmax(15rem,0.9fr)]">
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
          {project.contentModel.tags.map((tag) => (
            <div key={tag} className="rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold text-slate-100">{tag}</div>
          ))}
        </div>
        <div className="flex justify-center text-[#78c8ff] md:rotate-0" aria-hidden="true">
          <ArrowRight className="hidden h-7 w-7 md:block" />
          <ArrowDown className="h-7 w-7 md:hidden" />
        </div>
        <div className="rounded-2xl bg-[#2e94e3] px-6 py-8 text-center shadow-[0_20px_44px_-28px_rgba(46,148,227,0.72)]">
          <p className="text-xl font-semibold text-white">{project.contentModel.project}</p>
          <p className="mt-3 text-sm leading-6 text-blue-50">Stable identity · content · assets · case study</p>
        </div>
      </div>
      <div className="mt-5 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-[#0e1820]">{project.contentModel.allProjects}</div>
    </div>
  );
}

function ProductPipeline() {
  return (
    <ol className="grid gap-0 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-42px_rgba(24,45,61,0.42)] lg:grid-cols-5" aria-label="Responsibilities that turn a prototype into a maintained product">
      {project.product.responsibilities.map((item, index) => (
        <li key={item.label} className="relative border-b border-neutral-100 p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
          <span className="font-mono text-[11px] font-bold text-[#2e94e3]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-base font-bold text-neutral-800">{item.label}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function OperatingSystemMap() {
  return (
    <div className="space-y-3" aria-label="Portfolio Operating System with experience, content, and governance layers">
      {project.operatingSystem.layers.map((layer, index) => (
        <article key={layer.name} className={index === 0 ? "rounded-2xl bg-[#2e94e3] p-6 text-white sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-8" : index === 1 ? "rounded-2xl bg-[#dcefff] p-6 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-8" : "rounded-2xl bg-[#0e1820] p-6 text-white sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-8"}>
          <div>
            <h3 className={index === 1 ? "case-study-subsection-title text-[#0e1820]" : "case-study-subsection-title !text-white"}>{layer.name}</h3>
            <p className={index === 1 ? "mt-3 text-sm leading-6 text-[#345269]" : "mt-3 text-sm leading-6 text-blue-50"}>{layer.purpose}</p>
          </div>
          <ul className="mt-5 flex flex-wrap content-start gap-2 sm:mt-0">
            {layer.items.map((item) => (
              <li key={item} className={index === 1 ? "rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#27465d]" : "rounded-full bg-white/12 px-3 py-2 text-xs font-semibold text-white"}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ResultDashboard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-42px_rgba(24,45,61,0.42)]">
      {project.results.rows.map((row) => (
        <div key={row.area} className="grid gap-3 border-b border-neutral-100 p-5 last:border-b-0 sm:grid-cols-[8rem_1fr_11rem] sm:items-center sm:gap-6 sm:p-6">
          <strong className="text-sm text-neutral-800">{row.area}</strong>
          <p className="text-sm leading-6 text-neutral-600">{row.outcome}</p>
          <span className={row.status.includes("unresolved") || row.status.includes("Qualified") ? "inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800" : "inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"}>
            {row.status.includes("unresolved") || row.status.includes("Qualified") ? <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" /> : <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            {row.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PortfolioOperatingSystemCaseStudyPage() {
  void portfolioContentBalance;
  void portfolioSourceCoverage;

  return (
    <main className="case-study-page min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-30 border-b border-workspace-border bg-workspace-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3 sm:px-8 xl:px-10">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Workspace
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Case study sections">
            <Link href="#bounded-sync" className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-workspace-accent">Workflow</Link>
            <Link href="#content-model" className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-workspace-accent">Content model</Link>
            <Link href="#operating-system" className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-workspace-accent">Operating system</Link>
            <Link href="#results" className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-workspace-accent">Results</Link>
          </nav>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-workspace-muted">Ongoing · English</span>
        </div>
      </header>

      <article>
        <SourceSection id="outcome" sourceIds={project.hero.sourceIds} className="mx-auto max-w-[1600px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16 xl:px-10">
          <div className="overflow-hidden rounded-[1.25rem] bg-[#0e1820] text-white shadow-[0_34px_90px_-58px_rgba(14,24,32,0.82)]">
            <div className="space-y-10 px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:space-y-12 xl:px-16">
              <h1 className="case-study-title w-full !max-w-none !text-white">{project.title}</h1>
              <dl className="grid gap-5 text-sm text-slate-200 sm:grid-cols-3 sm:gap-8">
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#78c8ff]">Role</dt><dd className="mt-1 leading-6">{project.meta.role}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#78c8ff]">Timeline</dt><dd className="mt-1 leading-6">{project.meta.duration}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#78c8ff]">Status</dt><dd className="mt-1 leading-6">{project.status}</dd></div>
              </dl>
            </div>
            <div className="bg-[#dcefff] p-3 sm:p-5">
              <Figure media={project.hero.media} priority />
            </div>
          </div>

          <div className="mt-10 grid gap-8 2xl:grid-cols-[minmax(0,1.15fr)_minmax(34rem,0.85fr)] 2xl:items-start 2xl:gap-14">
            <div className="space-y-5">
              <p className="max-w-[92ch] text-base leading-8 text-neutral-600 sm:text-lg 2xl:max-w-none">{project.hero.summary}</p>
              <p className="max-w-[92ch] text-sm leading-7 text-neutral-500 2xl:max-w-none">{project.hero.tools}</p>
              <p className="rounded-xl bg-[#eeeae3] p-4 text-sm leading-6 text-neutral-600">{project.hero.boundary}</p>
            </div>
            <OutcomePreview />
          </div>
        </SourceSection>

        <SourceSection id="bounded-sync" sourceIds={project.diffSync.sourceIds} className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] space-y-10 px-5 sm:px-8 sm:space-y-14 xl:px-10">
            <SectionHeading title={project.diffSync.title} summary={project.diffSync.summary} />
            <div className="max-w-[92ch] space-y-5 text-base leading-8 text-neutral-600 sm:text-lg">
              <p>{project.diffSync.tension}</p>
              <p>{project.diffSync.decision}</p>
            </div>
            <DiffComparison />
            <p className="max-w-[92ch] text-sm leading-6 text-neutral-500">{project.diffSync.boundary}</p>
          </div>
        </SourceSection>

        <SourceSection id="content-model" sourceIds={project.contentModel.sourceIds} className="mx-auto max-w-[1600px] space-y-10 px-5 py-20 sm:space-y-14 sm:px-8 sm:py-32 xl:px-10">
          <SectionHeading title={project.contentModel.title} summary={project.contentModel.summary} />
          <Figure media={project.contentModel.media} />
          <div className="grid gap-8 2xl:grid-cols-[minmax(0,0.9fr)_minmax(36rem,1.1fr)] 2xl:items-start 2xl:gap-14">
            <div className="space-y-5">
              <p className="max-w-[92ch] text-base leading-8 text-neutral-600 sm:text-lg 2xl:max-w-none">{project.contentModel.decision}</p>
              <p className="max-w-[92ch] text-sm leading-7 text-neutral-500 2xl:max-w-none">{project.contentModel.consequence}</p>
            </div>
            <TagNetwork />
          </div>
        </SourceSection>

        <SourceSection id="product" sourceIds={project.product.sourceIds} className="bg-[#e9f4fb] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] space-y-10 px-5 sm:space-y-14 sm:px-8 xl:px-10">
            <SectionHeading title={project.product.title} summary={project.product.summary} />
            <ProductPipeline />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 sm:p-8">
              <h3 className="case-study-subsection-title">Deployment stayed honest</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">{project.product.deployment}</p>
              </div>
              <div className="rounded-2xl bg-[#0e1820] p-6 text-white sm:p-8">
              <h3 className="case-study-subsection-title !text-white">One product, many future states</h3>
                <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{project.product.versioning}</p>
              </div>
            </div>
          </div>
        </SourceSection>

        <SourceSection id="operating-system" sourceIds={project.operatingSystem.sourceIds} className="mx-auto max-w-[1600px] space-y-10 px-5 py-20 sm:space-y-14 sm:px-8 sm:py-32 xl:px-10">
          <SectionHeading title={project.operatingSystem.title} summary={project.operatingSystem.summary} />
          <p className="max-w-[92ch] text-base leading-8 text-neutral-600 sm:text-lg">{project.operatingSystem.toolShift}</p>
          <OperatingSystemMap />
          <p className="max-w-[92ch] text-sm leading-6 text-neutral-500">{project.operatingSystem.boundary}</p>
        </SourceSection>

        <SourceSection id="results" sourceIds={project.results.sourceIds} className="bg-[#0e1820] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-[1600px] space-y-10 px-5 sm:space-y-14 sm:px-8 xl:px-10">
            <div className="max-w-[1100px] space-y-4">
              <h2 className="case-study-section-title !text-white text-balance">{project.results.title}</h2>
              <p className="max-w-[92ch] text-base leading-8 text-slate-200 sm:text-lg">{project.results.summary}</p>
            </div>
            <ResultDashboard />
            <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
              <h3 className="case-study-subsection-title !text-white">Still open</h3>
              <ul className="space-y-3">
                {project.results.openQuestions.map((question) => (
                  <li key={question} className="flex gap-3 text-sm leading-6 text-slate-200 sm:text-base">
                    <CircleAlert className="mt-1 h-4 w-4 shrink-0 text-[#78c8ff]" aria-hidden="true" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SourceSection>
      </article>
    </main>
  );
}
