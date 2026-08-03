"use client";

import DesignSystemContent from "@/components/DesignSystemContent";
import HMIContent from "@/components/HMIContent";
import AIContent from "@/components/AIContent";
import { designTokens, hmiDemo, aiDemo } from "@/lib/content";

const demos = [
  { id: "design-system-demo", label: "Interactive Design-System Capability Demo", note: "Token, state, and micro-interaction study.", content: <DesignSystemContent tokens={designTokens} /> },
  { id: "hmi-demo", label: "Interactive HMI Prototype Demo", note: "Vehicle telemetry and feedback-state prototype.", content: <HMIContent demo={hmiDemo} /> },
  { id: "prompt-ui-demo", label: "Interactive Prompt-to-UI Demo", note: "Simulated prompt selection and widget-compilation experiment.", content: <AIContent demo={aiDemo} /> },
];

export default function ExperimentDemos() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="border-t border-workspace-border pt-16">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Interactive prototypes · 03</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Capability demos</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600">These runnable prototypes demonstrate interaction and implementation exploration. They are not professional project evidence or representations of shipped client interfaces.</p>
      </div>
      <div className="mt-10 grid gap-8">
        {demos.map((demo) => (
          <article key={demo.id} id={demo.id} className="rounded-3xl border border-amber-200 bg-white p-5 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.45)] sm:p-8">
            <header className="mb-7 border-b border-amber-100 pb-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-700">Interactive experiment · Not client work</p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">{demo.label}</h3>
              <p className="mt-2 text-sm text-neutral-500">{demo.note}</p>
            </header>
            <div className="mx-auto max-w-3xl">{demo.content}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
