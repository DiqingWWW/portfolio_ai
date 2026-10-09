import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";
import sharp from "sharp";

// Deterministic, local reconstruction. Coordinates are diagram geometry, not UI tokens.
const root = resolve(import.meta.dirname, "..");
const source = await readFile(resolve(root, "content/projects/portfolio-operating-system/case-study.workflow.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { workflowDiagramCopy } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const xml = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);
const boxes = {
  goals: [56,150,340,80], context: [496,150,540,80], plan: [496,265,540,80], scope: [56,265,340,80],
  route: [496,380,540,80], content: [496,510,164,90], design: [684,510,164,90], code: [872,510,164,90],
  facts: [56,655,340,80], check: [496,805,540,80], review: [56,805,340,80],
  record: [496,1000,540,80], feedback: [56,1000,340,80], deliver: [496,1140,540,80],
  release: [56,1290,340,80], publish: [496,1290,540,80],
};
const paths = [
  ["M396 190 H496"], ["M766 230 V265"], ["M496 305 H396"], ["M226 345 V420 H496"],
  ["M766 460 V485 H578 V510"], ["M766 485 V510"], ["M766 485 H954 V510"],
  ["M496 555 H446 V695 H396"], ["M226 735 V775 H578 V805"], ["M766 600 V805"], ["M954 600 V805"],
  ["M496 845 H396"], ["M320 885 V945 H466 V1040 H496"], ["M226 885 V1000"],
  ["M56 305 H24 V1040 H56"], ["M56 695 H24"],
  // Bridge at the delivery path: a crossing is not a shared execution junction.
  ["M226 1080 V1110 H748 Q766 1090 784 1110 H1070 V305 H1036"],
  ["M766 1080 V1140"], ["M1036 1040 H1090 V190 H1036", "conditional"],
  ["M496 1180 H226 V1290", "conditional"], ["M396 1330 H496", "conditional"],
];
for (const locale of ["zh", "en"]) {
  const copy = workflowDiagramCopy[locale];
  const text = (x,y,value,size=22,fill="#101010",anchor="middle",weight=400) => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}" font-weight="${weight}">${xml(value)}</text>`;
  const node = (id, [x,y,w,h]) => {
    const human = x === 56;
    const [label, detail] = copy.nodes[id];
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${human ? "#101010" : "#ffffff"}" stroke="${human ? "#101010" : "#858581"}" stroke-width="1.5"/>${text(x+w/2,y+32,label,w===164?21:human&&label.length>28?18:22,human?"#ffffff":"#101010","middle",600)}${text(x+w/2,y+59,detail,w===164?16:human&&detail.length>36?13:17,human?"#f4f4f2":"#686866")}`;
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1490" viewBox="0 0 1100 1490" role="img" aria-label="${xml(copy.title)}">
  <title>${xml(copy.title)}</title><desc>Source: ${workflowDiagramCopy.sourceIds.join(" ")}. Deterministic bilingual workflow reconstruction, not an execution log.</desc>
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#0087fb"/></marker></defs>
  <rect width="1100" height="1490" fill="#f4f4f2"/>
  <g font-family="Arial, PingFang SC, Noto Sans CJK SC, sans-serif">
  ${text(56,49,copy.title,30,"#101010","start",600)}
  ${text(226,96,copy.human,25,"#101010","middle",600)}${text(766,96,copy.ai,25,"#101010","middle",600)}
  ${text(226,123,copy.humanRole,15,"#686866")}${text(766,123,copy.aiRole,17,"#686866")}
  <path d="M420 140 V1395" stroke="#858581" stroke-width="1" stroke-dasharray="4 8"/>
  ${paths.map(([d,kind]) => `<path d="${d}" fill="none" stroke="#0087fb" stroke-width="2" ${kind === "conditional" ? 'stroke-dasharray="6 6"' : ""} ${d==="M56 695 H24"?"":'marker-end="url(#arrow)"'}/>`).join("\n")}
  ${Object.entries(boxes).map(([id, geometry]) => node(id,geometry)).join("\n")}
  ${text(225,957,copy.edges.return,18,"#0087fb")}${text(392,932,copy.edges.accept,18,"#0087fb")}${text(500,1132,copy.edges.replan,16,"#0087fb")}
  ${text(365,1205,copy.edges.release,16,"#0087fb")}
  <text transform="translate(1084 655) rotate(-90)" fill="#0087fb" text-anchor="middle" font-size="16">${xml(copy.edges.next)}</text>
  ${text(56,1440,copy.legend,19,"#686866","start")}
  </g></svg>`;
  const suffix = locale === "zh" ? "CN" : "EN";
  const path = resolve(root, `content/projects/portfolio-operating-system/ai-workflow-blueprint_${suffix}`);
  await writeFile(`${path}.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`${path}.png`);
  console.log(`rendered ${suffix}: 1100 × 1490, SVG + PNG`);
}
