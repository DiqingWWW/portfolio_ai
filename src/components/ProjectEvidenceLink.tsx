import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/types/content";

export default function ProjectEvidenceLink({ project, label }: { project: ProjectData; label: string }) {
  if (!project.detailHref) return null;
  return (
    <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
      <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-sky-600">{label}</p>
      <div className="mt-1 flex items-start justify-between gap-4">
        <div><h3 className="text-sm font-bold text-neutral-800">{project.title}</h3>{project.descriptions.short && <p className="mt-1 text-xs leading-5 text-neutral-600">{project.descriptions.short}</p>}</div>
        <Link href={project.detailHref} aria-label={`View ${project.title} project`} className="mt-1 shrink-0 rounded-full border border-sky-200 bg-white p-2 text-sky-600 hover:bg-sky-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
