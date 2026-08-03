import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { resolveAsset } from "@/lib/content";
import type { ProjectData } from "@/types/content";

export default function WorkSection({ projects }: { projects: ProjectData[] }) {
  const projectCount = String(projects.length).padStart(2, "0");
  return (
    <section id="work" className="relative z-10 min-h-screen border-t border-workspace-border bg-workspace-bg px-5 py-20 text-workspace-text sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-workspace-border pb-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-workspace-accent">Selected work · {projectCount} projects</p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.04em] sm:text-7xl">Real work,<br />clearly presented.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral-600 lg:justify-self-end">Professional and independent projects are separated from experiments. Each case study focuses on context, decisions, contribution, evidence, and honest limitations.</p>
        </div>
        <div className="grid gap-6 py-10 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <article key={project.id} className="group overflow-hidden rounded-3xl border border-workspace-border bg-white">
              <Link href={project.detailHref ?? "#"} className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-accent">
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={resolveAsset(project.id, project.assets.cover)}
                    alt={`${project.title} project cover`}
                    fill
                    sizes="(max-width:767px) 100vw, (max-width:1279px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${project.assets.coverPosition === "top" ? "object-top" : "object-center"}`}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-bold">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  {project.metadata.type && <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-workspace-accent">{project.metadata.type}</p>}
                  <div className={project.metadata.type ? "mt-2 flex items-start justify-between gap-4" : "flex items-start justify-between gap-4"}>
                    <h3 className="text-xl font-black leading-tight tracking-[-0.03em]">{project.title}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-hover:text-workspace-accent" aria-hidden="true" />
                  </div>
                  {project.descriptions.short && <p className="mt-4 text-sm leading-6 text-neutral-600">{project.descriptions.short}</p>}
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="flex justify-end"><Link href="/experiments" className="font-mono text-xs font-bold text-amber-700 underline decoration-amber-300 underline-offset-4">View Experiments / Concept Work →</Link></div>
      </div>
    </section>
  );
}
