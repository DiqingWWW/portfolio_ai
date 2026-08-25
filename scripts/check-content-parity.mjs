import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const projects = process.argv.slice(2);
const targets = projects.length > 0 ? projects : ["honda-hmi-design-system"];

let failed = false;

function fail(projectId, message) {
  failed = true;
  console.error(`✗ ${projectId}: ${message}`);
}

function collectSourceIds(source) {
  return [...source.matchAll(/sourceIds:\s*\[([^\]]*)\]/g)]
    .flatMap((match) => [...match[1].matchAll(/["']([^"']+)["']/g)].map((id) => id[1]));
}

function collectMindmapSources(source) {
  return [...source.matchAll(/mindmap\.sourceUnit\s*===\s*["']([^"']+)["']/g)]
    .map((match) => match[1]);
}

function findLocaleAssetLeaks(source, locale) {
  const forbiddenSuffix = locale === "zh" ? "_EN" : "_CN";
  return [...new Set([...source.matchAll(/["']([^"']*_(?:EN|CN)[^"']*)["']/g)]
    .map((match) => match[1])
    .filter((asset) => asset.includes(forbiddenSuffix)))];
}

for (const projectId of targets) {
  const projectRoot = resolve(repoRoot, "content/projects", projectId);
  let lock;
  let manifest;
  let selection;

  try {
    lock = JSON.parse(await readFile(resolve(projectRoot, "content-parity.lock.json"), "utf8"));
    manifest = JSON.parse(await readFile(resolve(projectRoot, "source-manifest.json"), "utf8"));
    selection = JSON.parse(await readFile(resolve(projectRoot, lock.selectionFile), "utf8"));
  } catch (error) {
    fail(projectId, `cannot read parity inputs: ${error.message}`);
    continue;
  }

  if (lock.sourceHash !== manifest.sourceHash) {
    fail(projectId, "the factual master changed after the last localized-content reconciliation; review before updating the parity lock");
  }

  const validSourceIds = new Set(selection.units.map((unit) => unit.id));
  const localized = [];

  for (const filename of lock.localizedModules) {
    const locale = filename.includes(".zh.") ? "zh" : "en";
    let source;
    try {
      source = await readFile(resolve(projectRoot, filename), "utf8");
    } catch (error) {
      fail(projectId, `cannot read ${filename}: ${error.message}`);
      continue;
    }

    const sourceIds = collectSourceIds(source);
    const missing = [...new Set(sourceIds.filter((id) => !validSourceIds.has(id)))];
    if (missing.length > 0) fail(projectId, `${filename} references unknown source IDs: ${missing.join(", ")}`);

    const mindmapSources = collectMindmapSources(source);
    for (const sourceId of mindmapSources) {
      if (!selection.mindmaps.some((mindmap) => mindmap.sourceUnit === sourceId)) {
        fail(projectId, `${filename} expects a missing mindmap for ${sourceId}`);
      }
    }
    if (lock.reviewedMindmapSource && !mindmapSources.includes(lock.reviewedMindmapSource)) {
      fail(projectId, `${filename} no longer uses the reviewed mindmap source ${lock.reviewedMindmapSource}`);
    }

    const assetLeaks = findLocaleAssetLeaks(source, locale);
    if (assetLeaks.length > 0) fail(projectId, `${filename} references wrong-locale assets: ${assetLeaks.join(", ")}`);
    if (/\bTODO\b/.test(source)) fail(projectId, `${filename} contains a public TODO marker`);

    localized.push({ filename, sourceIds, mindmapSources });
  }

  if (localized.length === 2) {
    const [first, second] = localized;
    if (JSON.stringify(first.sourceIds) !== JSON.stringify(second.sourceIds)) {
      fail(projectId, `${first.filename} and ${second.filename} do not have identical source-ID order`);
    }
    if (JSON.stringify(first.mindmapSources) !== JSON.stringify(second.mindmapSources)) {
      fail(projectId, `${first.filename} and ${second.filename} do not have identical mindmap sources`);
    }
  }

  if (!failed) console.log(`✓ ${projectId}: content parity checks passed`);
}

if (failed) process.exitCode = 1;
