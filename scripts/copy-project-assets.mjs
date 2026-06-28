// Prebuild script — copies project images from content/projects/<id>/
// to public/assets/images/<id>/ so Next.js can serve them as static assets.
//
// Runs automatically before `next build` via the "prebuild" npm hook.

import { readdir, mkdir, copyFile, rm } from "fs/promises";
import { existsSync } from "fs";
import { join, basename } from "path";

const CONTENT_DIR = "content/projects";
const PUBLIC_DIR = "public/assets/images";

// File extensions to copy
const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg", ".webm", ".mp4",
]);

async function main() {
  // 1. Clear public/assets/images
  if (existsSync(PUBLIC_DIR)) {
    await rm(PUBLIC_DIR, { recursive: true, force: true });
  }
  await mkdir(PUBLIC_DIR, { recursive: true });

  // 2. Scan each project folder for image files
  const projectDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  let copiedCount = 0;

  for (const entry of projectDirs) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue; // skip _index.ts etc

    const projectPath = join(CONTENT_DIR, entry.name);
    const files = await readdir(projectPath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile()) continue;
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) continue;

      const targetDir = join(PUBLIC_DIR, entry.name);
      await mkdir(targetDir, { recursive: true });

      const src = join(projectPath, file.name);
      const dest = join(targetDir, file.name);
      await copyFile(src, dest);
      copiedCount++;
    }
  }

  console.log(`  Prebuild: copied ${copiedCount} project assets → ${PUBLIC_DIR}`);
}

main().catch((err) => {
  console.error("Prebuild asset copy failed:", err.message);
  process.exit(1);
});
