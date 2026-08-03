"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { resolveAsset } from "@/lib/content";
import type { ProjectData } from "@/types/content";

export default function RealProjectsContent({ heading, intro, projects }: { heading: string; intro: string; projects: ProjectData[] }) {
  return (
    <div className="space-y-5 select-text" data-component="RealProjectsContent">
      <header className="border-b border-neutral-100 pb-4">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-sky-600">Selected real work</p>
        <h2 className="mt-1 text-lg font-black tracking-tight text-neutral-800">{heading}</h2>
        <p className="mt-2 text-xs leading-5 text-neutral-500">{intro}</p>
      </header>
      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="relative aspect-[16/7] overflow-hidden bg-neutral-100">
              <Image src={resolveAsset(project.id, project.assets.cover)} alt={`${project.title} project cover`} fill sizes="560px" className={`object-cover ${project.assets.coverPosition === "top" ? "object-top" : "object-center"}`} />
            </div>
            <div className="p-4">
              {project.metadata.type && <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-sky-600">{project.metadata.type}</p>}
              <h3 className={project.metadata.type ? "mt-1 text-base font-black text-neutral-800" : "text-base font-black text-neutral-800"}>{project.title}</h3>
              {project.descriptions.short && <p className="mt-2 text-xs leading-5 text-neutral-600">{project.descriptions.short}</p>}
              {project.detailHref && <Link href={project.detailHref} className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3.5 py-2 text-[11px] font-bold text-white hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
