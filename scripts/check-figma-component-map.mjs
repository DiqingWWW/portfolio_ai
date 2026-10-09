import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const snapshot = JSON.parse(readFileSync(resolve(root, "audits/figma-component-reconciliation-2026-10-07.json"), "utf8"));
const table = readFileSync(resolve(root, "docs/figma-component-map.md"), "utf8");
const args = process.argv.slice(2);
const selectors = args.filter(arg => /^(--figma|--code)=.+/.test(arg));
if (args.length > 1 || selectors.length !== args.length) {
  console.error("Usage: node scripts/check-figma-component-map.mjs [--figma=nodeId | --code=repo-relative-path]");
  process.exit(2);
}

function exportedNames(path) {
  const source = ts.createSourceFile(path, readFileSync(resolve(root, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const names = new Set();
  for (const node of source.statements) {
    const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) ?? [] : [];
    if (modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) names.add("default");
    if (!modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (ts.isFunctionDeclaration(node) && node.name) names.add(node.name.text);
    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text);
      }
    }
  }
  return names;
}

const issues = [];
const identities = snapshot.components.filter(record => record.code);
const rows = [...table.matchAll(/^\| ([^|]+?) \| (src\/[^|]+?) \|$/gm)]
  .map(([, name, path]) => ({ name: name.trim(), path: path.trim() }));
if (rows.length !== identities.length) issues.push("Identity table and snapshot have different row counts.");
const nodeIds = new Set();
for (const record of snapshot.components) {
  if (nodeIds.has(record.design.nodeId)) issues.push(`Duplicate node ID: ${record.design.nodeId}`);
  nodeIds.add(record.design.nodeId);
  for (const path of record.recipeOwner?.paths ?? []) {
    if (!existsSync(resolve(root, path))) issues.push(`Missing recipe owner: ${path}`);
  }
}
for (const record of identities) {
  const { path, exportName, exportKind } = record.code;
  if (!existsSync(resolve(root, path))) {
    issues.push(`Missing component: ${path}`);
    continue;
  }
  const expectedExport = exportKind === "default" ? "default" : exportName;
  if (!exportedNames(path).has(expectedExport)) issues.push(`Missing ${expectedExport} export in ${path}`);
  if (!rows.some(row => row.name === record.design.name && row.path === path)) issues.push(`Missing table identity: ${record.design.name}`);
}
for (const row of rows) {
  if (!identities.some(record => record.design.name === row.name && record.code.path === row.path)) issues.push(`Unrecorded table identity: ${row.name}`);
}
for (const [path, baseline] of Object.entries(snapshot.codeBaselines)) {
  if (!existsSync(resolve(root, path))) {
    issues.push(`Missing baseline source: ${path}`);
    continue;
  }
  const current = createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");
  if (current !== baseline) issues.push(`Code drift since ${snapshot.recordedAt}: ${path}`);
}

if (selectors.length) {
  const split = selectors[0].indexOf("=");
  const key = selectors[0].slice(0, split);
  const value = selectors[0].slice(split + 1);
  const found = snapshot.components.filter(record => key === "--figma"
    ? record.design.nodeId === value
    : record.code?.path === value || record.recipeOwner?.paths.includes(value));
  if (!found.length) {
    console.error(`No recorded relationship for ${value}.`);
    process.exit(2);
  }
  console.log(JSON.stringify(found, null, 2));
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${identities.length} local identity rows, ${new Set(identities.map(record => record.code.path)).size} code targets, ${snapshot.components.length} Figma families; direct code baselines unchanged.`);
}
console.log("Not published Code Connect. Live Figma drift and visual/behavioral parity are not checked. No files or designs modified.");
