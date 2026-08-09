import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import experimentsData from "@content/experiments.json";
import type { ExperimentContent } from "@/types/content";
import ExperimentDemos from "@/components/ExperimentDemos";

const experiments = experimentsData as ExperimentContent[];

export const metadata: Metadata = {
  title: "Experiments & Concept Work",
  description: "Generated concepts and interaction studies by Diqing Wu, clearly separated from professional project evidence.",
  alternates: { canonical: "/experiments" },
};

export default function ExperimentsPage() {
  return (
    <main className="min-h-screen bg-workspace-bg text-workspace-text">
      <header className="sticky top-0 z-20 border-b border-workspace-border bg-workspace-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs font-bold hover:bg-white focus-visible:outline-2 focus-visible:outline-workspace-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Workspace
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-700">Exploratory work</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-700"><FlaskConical className="h-4 w-4" aria-hidden="true" /> Separate collection</div>
          <h1 className="page-heading-1">Experiments / Concept Work</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">These pieces are generated concepts, visual studies, or interaction prototypes. They demonstrate exploratory thinking and craft, but they are not presented as shipped client work, validated product outcomes, or production systems.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 sm:px-8 md:grid-cols-2">
        {experiments.map((experiment, index) => (
          <article key={experiment.id} className="overflow-hidden rounded-3xl border border-workspace-border bg-white shadow-[0_20px_60px_-45px_rgba(0,0,0,0.4)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
              <Image src={experiment.assets.cover} alt={`${experiment.title} concept cover`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full border border-amber-200 bg-amber-50/95 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-800">Concept {String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-workspace-muted">{experiment.category}</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{experiment.title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{experiment.description}</p>
              <p className="mt-5 border-t border-workspace-border pt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700">{experiment.status}</p>
            </div>
          </article>
        ))}
      </section>
      <ExperimentDemos />
    </main>
  );
}
