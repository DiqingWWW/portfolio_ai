"use client";

import { Maximize2, X } from "lucide-react";
import { useRef } from "react";

interface OverviewTableProps {
  label: string;
  columns: readonly string[];
  rows: ReadonlyArray<readonly string[]>;
  enlargeLabel?: string;
  closeLabel?: string;
}

export default function OverviewTable({ label, columns, rows, enlargeLabel = "Enlarge", closeLabel = "Close expanded" }: OverviewTableProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-42px_rgba(0,0,0,0.45)]">
        <TableGraphic columns={columns} rows={rows} />
      </div>
      <button
        type="button"
        aria-label={`${enlargeLabel}: ${label}`}
        onClick={() => dialogRef.current?.showModal()}
        className="absolute right-2 top-2 inline-flex min-h-11 items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_26px_-16px_rgba(0,0,0,0.65)] hover:bg-workspace-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent sm:right-3 sm:top-3"
      >
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">{enlargeLabel}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${enlargeLabel}: ${label}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[72rem] overflow-auto rounded-2xl bg-white p-3 shadow-[0_32px_100px_-30px_rgba(0,0,0,0.65)] backdrop:bg-neutral-950/65 sm:p-5"
      >
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            aria-label={`${closeLabel}: ${label}`}
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white hover:bg-workspace-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-workspace-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-w-[44rem]">
          <TableGraphic columns={columns} rows={rows} expanded />
        </div>
      </dialog>
    </figure>
  );
}

function TableGraphic({ columns, rows, expanded = false }: Pick<OverviewTableProps, "columns" | "rows"> & { expanded?: boolean }) {
  const columnClass = columns.length === 2
    ? "first:w-[38%] last:w-[62%]"
    : "first:w-[24%] last:w-[32%]";
  const cellClass = expanded
    ? "px-5 py-5 text-sm leading-6"
    : "break-words px-2 py-3 text-[10px] leading-4 sm:px-4 sm:py-4 sm:text-sm sm:leading-6";

  return (
    <table className="w-full table-fixed border-collapse text-left">
      <thead className="bg-neutral-800 text-white">
        <tr>
          {columns.map((column) => (
            <th key={column} className={`${columnClass} ${cellClass} font-semibold last:pr-14 sm:last:pr-16`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${row[0]}-${rowIndex}`} className="border-b border-workspace-border last:border-0">
            {row.map((cell, cellIndex) => cellIndex === 0 ? (
              <th key={cellIndex} className={`${cellClass} align-top font-semibold text-neutral-800`}>{cell}</th>
            ) : (
              <td key={cellIndex} className={`${cellClass} align-top text-neutral-600`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
