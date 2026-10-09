import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Source registries own visual constants. Approved component CSS is consumed through composes.
const files = [
  "src/app/proto/portfolio-ai-case-study/page.module.css",
  "src/app/proto/design-system-directions/deethin-system-v2/CaseStudyPrimitives.module.css",
  "src/app/proto/design-system-directions/deethin-system-v2/SystemCoverage.module.css",
];
const errors = [];
for (const file of files) {
  const source = readFileSync(resolve(file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const match of source.matchAll(/([\w-]+)\s*:\s*([^;{}]+)/g)) {
    const [, property, value] = match;
    if (/#[\da-f]{3,8}\b|\b(?:rgb|hsl|oklch)\(/i.test(value)) errors.push(`${file}: raw paint in ${property}`);
    for (const number of value.matchAll(/(-?\d*\.?\d+)(px|rem|em|vw|vh|cqi|ms|deg)\b/g)) {
      if (+number[1] === 0) continue;
      // Viewport occupancy is structural; not a type, gap, effect, or authored dimension.
      if (property === "min-height" && number[0] === "100vh") continue;
      errors.push(`${file}: raw ${number[0]} in ${property}`);
    }
  }
}
const candidate = readFileSync("src/app/proto/portfolio-ai-case-study/CandidatePage.tsx", "utf8");
if (!candidate.includes("caseStudyTokens as CSSProperties")) errors.push("Candidate does not consume the shared registry");
if (/\d+ch\b/.test(files.map(file => readFileSync(file,"utf8")).join(""))) errors.push("Character-width cap remains");
if (files.map(file => readFileSync(file,"utf8")).join("").includes("--project-surface-accent-soft")) errors.push("Withdrawn pale-blue surface is still consumed");
if (!readFileSync(files[1],"utf8").includes('composes: button from "./system.module.css"')) errors.push("Button is not composed from the approved class");
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log("PASS: 3 consumer stylesheets, no raw visual-unit or paint literals; shared registry + approved button class consumed. Structural percentages/counts excluded. This is not a live Figma approval audit.");
