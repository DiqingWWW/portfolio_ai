import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, relative, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");
const configPath = resolve(repoRoot, "content-sync.local.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const blockPattern =
  /<!-- block:([a-z0-9-]+) channels=([a-z,]+) -->\r?\n([\s\S]*?)<!-- endblock -->/g;

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

function rewritePortfolioAssetLinks(content, assets) {
  return assets.reduce(
    (result, asset) =>
      result.replaceAll(`(../${asset.source})`, `(${asset.output})`),
    content,
  );
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
  const masterPath = resolveInside(
    sourceRoot,
    project.master ?? "master/case-study-master.md",
    `${project.id}: master`,
  );
  const generatedDir = resolveInside(
    sourceRoot,
    project.generatedDir ?? "generated",
    `${project.id}: generatedDir`,
  );
  const master = await readFile(masterPath, "utf8");
  const assets = project.assets ?? [];
  const variants = {
    portfolio: rewritePortfolioAssetLinks(
      build("portfolio", master, project.id),
      assets,
    ),
    pitch: build("pitch", master, project.id),
    appendix: build("appendix", master, project.id),
  };

  await mkdir(projectRoot, { recursive: true });
  await mkdir(generatedDir, { recursive: true });
  await writeFile(resolve(projectRoot, "case-study.md"), variants.portfolio, "utf8");
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
    generatedFiles: ["case-study.md", ...assets.map((asset) => asset.output)],
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

for (const project of projects) {
  await syncProject(project);
}
