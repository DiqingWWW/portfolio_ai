import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

// Read-only TS loader for the plain-data registry. No browser, server or asset regeneration.
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  if (name.startsWith("@/")) name = path.join(root, "src", name.slice(2));
  if (name.startsWith("@content/")) name = path.join(root, "content", name.slice(9));
  return originalResolve.call(this, name, ...args);
};
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, filename);
const { portfolioTokens, homepageBreakpoints } = require("../src/design-system/portfolio/tokens.ts");
const known = new Set(Object.keys(portfolioTokens));
const local = new Set(["--font-inter", "--font-jetbrains-mono", "--paper", "--ink", "--muted", "--line", "--radius", "--fan-index", "--reveal-delay", "--parallax", "--media-scale"]);
const files = ["src/app/proto/curated-home-v2/homepage.module.css", "src/app/proto/curated-home-v2/ai-tools.module.css", "src/design-system/portfolio/project-card.module.css"];
for (const file of files) {
  const css = fs.readFileSync(path.join(root, file), "utf8");
  for (const [, width] of css.matchAll(/@media\s*\(max-width:\s*(\d+px)\)/g)) assert(Object.values(homepageBreakpoints).includes(width), `${file}: unregistered breakpoint ${width}`);
  for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) assert(known.has(name) || local.has(name), `${file}: unresolved ${name}`);
  for (const line of css.split("\n")) {
    if (line.trim().startsWith("@media")) continue; // CSS media queries cannot reference custom properties.
    assert(!/\d+(?:px|ms)\b|#[\da-f]{3,8}\b/i.test(line), `${file}: literal recipe outside registry: ${line}`);
  }
}
for (const [name, value] of Object.entries(portfolioTokens)) {
  for (const [, reference] of String(value).matchAll(/var\((--[\w-]+)/g)) assert(known.has(reference) || local.has(reference), `${name}: unresolved ${reference}`);
}
for (const file of ["src/app/proto/curated-home-v2/HomepageSections.tsx", "src/app/proto/portfolio-ai-case-study/CandidatePage.tsx", "src/app/proto/design-system-directions/deethin-system-v2/SystemPage.tsx"]) assert(fs.readFileSync(path.join(root, file), "utf8").includes("portfolioTokens"), `${file}: missing shared provider`);
const { autonomousAgentCaseStudy: en } = require("../content/projects/autonomous-driving-to-agent/case-study.en.ts");
const { autonomousAgentCaseStudy: zh } = require("../content/projects/autonomous-driving-to-agent/case-study.zh.ts");
for (const key of ["thesis", "agentLoop", "riskReference", "control", "dimensionsIntro", "principles", "conclusion"]) assert.deepEqual(en[key].sourceIds, zh[key].sourceIds, `Translation changed source IDs: ${key}`);
assert.equal(en.dimensions.length, zh.dimensions.length);
assert.equal(en.control.levels.length, zh.control.levels.length);
assert.equal(en.riskReference.rows.length, zh.riskReference.rows.length);
// Loading the current case-study modules also runs their approved-source-ID guards.
const { portfolioCaseStudyCandidateEn } = require("../content/projects/portfolio-operating-system/case-study.candidate.en.ts");
const { portfolioCaseStudyCandidateZh } = require("../content/projects/portfolio-operating-system/case-study.candidate.zh.ts");
assert.equal(portfolioCaseStudyCandidateEn.locale, "en");
assert.equal(portfolioCaseStudyCandidateZh.locale, "zh");
for (const prefix of ["", "zh/"]) {
  const route = fs.readFileSync(path.join(root, `src/app/${prefix}work/portfolio-operating-system/page.tsx`), "utf8");
  assert(route.includes("case-study.candidate.") && route.includes("projectRoute"), "Formal route must use the current guarded composition and retain project navigation");
}
const screenRoute = fs.readFileSync(path.join(root, "src/app/proto/portfolio-home-screen/page.tsx"), "utf8");
assert(screenRoute.includes("screenOnly"), "Embedded homepage must not recursively render project previews");
console.log(`PASS: ${known.size} shared tokens; three CSS consumers resolved; current Portfolio source guards, route composition, non-recursive screen and research structure preserved.`);
