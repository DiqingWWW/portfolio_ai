"use client";

import { useRef } from "react";
import { Maximize2, X } from "lucide-react";

interface StrategyMapProps {
  impacts: ReadonlyArray<{ stakeholder: string; points: readonly string[] }>;
  rootCauses: readonly string[];
  metrics: readonly string[];
  phases: ReadonlyArray<{ name: string; focus: readonly string[] }>;
  labels: {
    open: string; caption: string; dialog: string; close: string; title: string; description: string;
    columns: readonly (readonly [string, string])[];
  };
}

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 720;

export default function InteractiveStrategyMap(props: StrategyMapProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { labels } = props;

  return (
    <figure>
      <button
        type="button"
        aria-label={labels.open}
        onClick={() => dialogRef.current?.showModal()}
        className="group relative block w-full overflow-hidden rounded-2xl bg-[#e9e6e1] p-2 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-workspace-accent sm:p-4"
      >
        <StrategyMapGraphic {...props} />
        <span className="absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_26px_-16px_rgba(0,0,0,0.65)] transition-colors group-hover:bg-workspace-accent">
          <Maximize2 className="h-4 w-4" aria-hidden="true" /> {labels.open}
        </span>
      </button>
      <figcaption className="mt-3 text-xs leading-5 text-workspace-muted">
        {labels.caption}
      </figcaption>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[78rem] overflow-auto rounded-2xl bg-[#e9e6e1] p-3 shadow-[0_32px_100px_-30px_rgba(0,0,0,0.65)] backdrop:bg-neutral-950/65 sm:p-5"
      >
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            aria-label={labels.close}
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-workspace-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-w-[62rem]">
          <StrategyMapGraphic {...props} />
        </div>
      </dialog>
    </figure>
  );
}

function StrategyMapGraphic({ impacts, rootCauses, metrics, phases, labels }: StrategyMapProps) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      role="img"
      aria-labelledby="strategy-map-title strategy-map-description"
      className="h-auto w-full"
    >
      <title id="strategy-map-title">{labels.title}</title>
      <desc id="strategy-map-description">{labels.description}</desc>
      <rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} rx="28" fill="#e9e6e1" />

      <ColumnSurface x={24} width={242} title={labels.columns[0][0]} note={labels.columns[0][1]} />
      <ColumnSurface x={286} width={278} title={labels.columns[1][0]} note={labels.columns[1][1]} />
      <ColumnSurface x={584} width={278} title={labels.columns[2][0]} note={labels.columns[2][1]} />
      <ColumnSurface x={882} width={294} title={labels.columns[3][0]} note={labels.columns[3][1]} />

      {impacts.map((impact, index) => (
        <Card key={impact.stakeholder} x={42} y={126 + index * 176} width={206} height={150}>
          <SvgLines text={impact.stakeholder} x={58} y={154 + index * 176} maxChars={19} fontSize={20} fontWeight={700} fill="#303030" />
          {impact.points.slice(0, 3).map((point, pointIndex) => (
            <SvgLines key={point} text={point} x={58} y={190 + index * 176 + pointIndex * 30} maxChars={34} fontSize={12} fill="#5f5f5f" />
          ))}
        </Card>
      ))}

      {rootCauses.map((cause, index) => (
        <Card key={cause} x={304} y={136 + index * 132} width={242} height={104}>
          <SvgLines text={cause} x={324} y={169 + index * 132} maxChars={28} fontSize={16} fontWeight={600} fill="#303030" />
        </Card>
      ))}

      {metrics.map((metric, index) => (
        <Card key={metric} x={602} y={136 + index * 132} width={242} height={104} emphasis>
          <SvgLines text={metric} x={622} y={169 + index * 132} maxChars={25} fontSize={16} fontWeight={700} fill="#ffffff" />
        </Card>
      ))}

      {phases.map((phase, index) => (
        <Card key={phase.name} x={900} y={160 + index * 248} width={258} height={202} tone={index === 0 ? "purple" : "default"}>
          <SvgLines text={phase.name} x={920} y={196 + index * 248} maxChars={24} fontSize={18} fontWeight={700} fill={index === 0 ? "#ffffff" : "#303030"} />
          {phase.focus.slice(0, 3).map((focus, focusIndex) => (
            <SvgLines key={focus} text={focus} x={920} y={242 + index * 248 + focusIndex * 32} maxChars={26} fontSize={15} fill={index === 0 ? "#ffffff" : "#5f5f5f"} />
          ))}
        </Card>
      ))}

      {rootCauses.map((_, index) => (
        <path key={`cause-metric-${index}`} d={`M546 ${188 + index * 132} H602`} stroke="#8d8d8d" strokeWidth="2" markerEnd="url(#arrow)" />
      ))}
      <path d="M266 352 H286" stroke="#8d8d8d" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M862 352 H882" stroke="#8d8d8d" strokeWidth="2" markerEnd="url(#arrow)" />

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#8d8d8d" />
        </marker>
      </defs>
    </svg>
  );
}

function ColumnSurface({ x, width, title, note }: { x: number; width: number; title: string; note: string }) {
  return (
    <g>
      <rect x={x} y={24} width={width} height={672} rx="22" fill="#ffffff" fillOpacity="0.48" />
      <text x={x + 18} y={62} fontSize="22" fontWeight="700" fill="#303030">{title}</text>
      <text x={x + 18} y={88} fontSize="13" fill="#737373">{note}</text>
    </g>
  );
}

function Card({ x, y, width, height, emphasis = false, tone = "default", children }: { x: number; y: number; width: number; height: number; emphasis?: boolean; tone?: "default" | "purple"; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="16" fill={tone === "purple" ? "#6750A4" : emphasis ? "#303030" : "#ffffff"} />
      {children}
    </g>
  );
}

function SvgLines({ text, x, y, maxChars, fontSize, fontWeight = 400, fill }: { text: string; x: number; y: number; maxChars: number; fontSize: number; fontWeight?: number; fill: string }) {
  const lines = wrapText(text, maxChars);
  return (
    <text x={x} y={y} fontSize={fontSize} fontWeight={fontWeight} fill={fill}>
      {lines.map((line, index) => <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : fontSize * 1.3}>{line}</tspan>)}
    </text>
  );
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}
