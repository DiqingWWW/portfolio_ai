import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const configPath = resolve(repoRoot, "content-sync.local.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const blockPattern =
  /<!-- block:([a-z0-9-]+) channels=([a-z,]+) -->\r?\n([\s\S]*?)<!-- endblock -->/g;
const curationTagPattern =
  /<!--\s*(?:source:\s*([^|\r\n]+?)\s*\|\s*)?Website selection vocabulary:\s*([^|\r\n]+?)\s*\|\s*Visual intent:\s*([^|\r\n]+?)\s*\|\s*Visual Format:\s*([^|\r\n]+?)(?:\s*\|\s*Role:\s*([^\r\n]*?))?\s*-->/gi;
const validSelections = new Set(["core", "simplify", "supporting", "optional", "appendix"]);

function build(channel, source, sourceName) {
  const title = source.split(/\r?\n/, 1)[0];
  const blocks = [];

  for (const match of source.matchAll(blockPattern)) {
    if (match[2].split(",").includes(channel)) {
      blocks.push(match[3].trim());
    }
  }

  if (blocks.length === 0) {
    throw new Error(`${sourceName} has no blocks for the "${channel}" channel`);
  }

  const banner =
    "<!-- Generated from the Obsidian case-study master. Do not edit manually. -->";
  return `${banner}\n\n${title}\n\n${blocks.join("\n\n")}\n`;
}

function extractTitle(source) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Case study";
}

function cleanCurationContent(content) {
  return content
    .replace(/<!-- block:[^>]+-->/g, "")
    .replace(/<!-- endblock -->/g, "")
    .trim();
}

function extractCurationUnits(source, sourceName) {
  const matches = [...source.matchAll(curationTagPattern)];
  if (matches.length === 0) {
    throw new Error(`${sourceName} has no Website selection vocabulary tags`);
  }

  return matches.map((match, index) => {
    const sourceId = match[1]?.trim() || `unit-${String(index + 1).padStart(3, "0")}`;
    const selection = match[2].trim().toLowerCase();
    const content = cleanCurationContent(
      source.slice(match.index + match[0].length, matches[index + 1]?.index ?? source.length),
    );

    if (!validSelections.has(selection)) {
      console.warn(`${sourceName}: ignored unknown Website selection vocabulary "${selection}" at unit ${index + 1}`);
    }

    return {
      id: sourceId,
      selection,
      visualIntent: match[3].trim(),
      visualFormat: match[4].trim(),
      role: match[5]?.trim() ?? "",
      content,
    };
  }).filter((unit) => validSelections.has(unit.selection) && unit.content.length > 0);
}

function buildCurationMarkdown(units, selections, sourceName) {
  const selected = units.filter((unit) => selections.includes(unit.selection));
  if (selected.length === 0) {
    throw new Error(`${sourceName} has no units for ${selections.join(", ")}`);
  }

  const banner =
    "<!-- Generated from the Obsidian case-study master. Do not edit manually. -->";
  return `${banner}\n\n${selected.map((unit) => {
    const instruction = unit.selection === "simplify"
      ? " | Website treatment: retain, simplify by approximately 50%"
      : "";
    return `<!-- Source unit: ${unit.id} | Selection: ${unit.selection} | Visual intent: ${unit.visualIntent} | Visual Format: ${unit.visualFormat} | Role: ${unit.role}${instruction} -->\n${unit.content}`;
  }).join("\n\n")}\n`;
}

function parseMindmap(value, unitId) {
  const lines = value.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length === 0) return null;

  const stack = [];
  let root = null;
  for (const line of lines) {
    const spaces = line.match(/^\s*/)?.[0].replace(/\t/g, "  ").length ?? 0;
    const rawLabel = line.trim();
    const label = rawLabel.replace(/^root\(\((.*)\)\)$/, "$1");
    const node = { label, children: [] };

    if (!root) {
      root = node;
      stack.push({ indent: spaces, node });
      continue;
    }

    while (stack.length > 0 && stack.at(-1).indent >= spaces) {
      stack.pop();
    }
    const parent = stack.at(-1)?.node;
    if (!parent) {
      throw new Error(`${unitId}: invalid mindmap indentation near "${label}"`);
    }
    parent.children.push(node);
    stack.push({ indent: spaces, node });
  }

  return root;
}

function extractMindmaps(units) {
  return units.flatMap((unit) => {
    const maps = [...unit.content.matchAll(/```mindmap\s*\r?\n([\s\S]*?)```/gi)];
    return maps.map((match, index) => ({
      id: `${unit.id}-mindmap-${index + 1}`,
      sourceUnit: unit.id,
      selection: unit.selection,
      visualIntent: unit.visualIntent,
      visualFormat: unit.visualFormat,
      role: unit.role,
      tree: parseMindmap(match[1], unit.id),
    })).filter((mindmap) => mindmap.tree);
  });
}

function rewritePortfolioAssetLinks(content, assets) {
  return assets.reduce((result, asset) => {
    const sourceLink = `../${asset.source}`;
    return result
      .replaceAll(`(${sourceLink})`, `(${asset.output})`)
      .replaceAll(`(<${sourceLink}>)`, `(${asset.output})`);
  }, content);
}

function resolveInside(root, path, label) {
  const resolved = resolve(root, path);
  const pathFromRoot = relative(root, resolved);

  if (pathFromRoot.startsWith("..") || isAbsolute(pathFromRoot)) {
    throw new Error(`${label} must stay inside ${root}`);
  }

  return resolved;
}

function normalizeProjects(value) {
  if (Array.isArray(value.projects)) return value.projects;

  if (value.sourceDir && value.projectDir) {
    return [{
      id: basename(value.sourceDir),
      sourceDir: value.sourceDir,
      projectDir: value.projectDir,
      assets: value.assets ?? [],
    }];
  }

  throw new Error("content-sync.local.json must define a non-empty projects array");
}

async function syncProject(project) {
  if (!project.id || !project.sourceDir || !project.projectDir) {
    throw new Error("Each sync project needs id, sourceDir, and projectDir");
  }

  if (!isAbsolute(project.sourceDir)) {
    throw new Error(`${project.id}: sourceDir must be an absolute path`);
  }

  const sourceRoot = project.sourceDir;
  const projectRoot = resolveInside(repoRoot, project.projectDir, `${project.id}: projectDir`);
  const defaultMaster = project.format === "curation-tags"
    ? "01_master/master.md"
    : "master/case-study-master.md";
  const masterPath = resolveInside(
    sourceRoot,
    project.master ?? defaultMaster,
    `${project.id}: master`,
  );
  const generatedDir = resolveInside(
    sourceRoot,
    project.generatedDir ?? "generated",
    `${project.id}: generatedDir`,
  );
  const master = await readFile(masterPath, "utf8");
  const assets = project.assets ?? [];
  const usesCurationTags = project.format === "curation-tags";
  const curationUnits = usesCurationTags
    ? extractCurationUnits(master, project.id)
    : [];
  const variants = usesCurationTags
    ? {
        portfolio: null,
        pitch: buildCurationMarkdown(curationUnits, ["core", "simplify", "supporting", "optional"], project.id),
        appendix: buildCurationMarkdown(curationUnits, ["appendix"], project.id),
      }
    : {
        portfolio: rewritePortfolioAssetLinks(build("portfolio", master, project.id), assets),
        pitch: build("pitch", master, project.id),
        appendix: build("appendix", master, project.id),
      };

  await mkdir(projectRoot, { recursive: true });
  await mkdir(generatedDir, { recursive: true });
  if (variants.portfolio) {
    await writeFile(resolve(projectRoot, "case-study.md"), variants.portfolio, "utf8");
  }
  if (usesCurationTags) {
    await writeFile(
      resolve(projectRoot, "case-study.selection.json"),
      `${JSON.stringify({
        sourceTitle: extractTitle(master),
        sourceMaster: relative(sourceRoot, masterPath),
        units: curationUnits.map((unit) => ({
          id: unit.id,
          selection: unit.selection,
          visualIntent: unit.visualIntent,
          visualFormat: unit.visualFormat,
          role: unit.role,
        })),
        mindmaps: extractMindmaps(curationUnits),
      }, null, 2)}\n`,
      "utf8",
    );
  }
  await writeFile(resolve(generatedDir, "interview-pitch.md"), variants.pitch, "utf8");
  await writeFile(
    resolve(generatedDir, "interview-appendix.md"),
    variants.appendix,
    "utf8",
  );

  for (const asset of assets) {
    const sourcePath = resolveInside(sourceRoot, asset.source, `${project.id}: asset source`);
    const outputPath = resolveInside(projectRoot, asset.output, `${project.id}: asset output`);
    await mkdir(dirname(outputPath), { recursive: true });
    await copyFile(sourcePath, outputPath);
  }

  const manifest = {
    source: basename(sourceRoot),
    sourceMaster: relative(sourceRoot, masterPath),
    sourceHash: createHash("sha256").update(master).digest("hex"),
    generatedFiles: [
      ...(variants.portfolio ? ["case-study.md"] : ["case-study.selection.json"]),
      ...assets.map((asset) => asset.output),
    ],
  };

  await writeFile(
    resolve(projectRoot, "source-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(`synced ${project.id} → ${project.projectDir}`);
  console.log(`updated ${project.id} pitch and appendix in Obsidian generated/`);
}

const projects = normalizeProjects(config);
if (projects.length === 0) {
  throw new Error("content-sync.local.json projects must not be empty");
}

const requestedProjectId = process.argv[2];
const projectsToSync = requestedProjectId
  ? projects.filter((project) => project.id === requestedProjectId)
  : projects;

if (requestedProjectId && projectsToSync.length === 0) {
  throw new Error(`Unknown content-sync project: ${requestedProjectId}`);
}

for (const project of projectsToSync) {
  await syncProject(project);
}
