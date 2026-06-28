// Auto-indexer — scans all projects and maps them to tags at runtime.
// Adding a project requires: new folder + project.json + one line in _index.ts.
// No tag configuration needs updating.

import allProjects from '@content/projects/_index';
import tags from '@content/tags.json';
import profile from '@content/profile.json';
import navigation from '@content/navigation.json';
import designTokens from '@content/design-tokens.json';
import aiDemo from '@content/ai-demo.json';
import hmiDemo from '@content/hmi-demo.json';
import type {
  TagDefinition,
  ProjectData,
  TagIndex,
  ProfileContent,
  NavigationContent,
  DesignTokensContent,
  AIDemoContent,
  HMIDemoContent,
} from '@/types/content';

// ---- Re-export all content ----
export { profile, navigation, designTokens, aiDemo, hmiDemo };
export type {
  TagDefinition,
  ProjectData,
  TagIndex,
  ProfileContent,
  NavigationContent,
  DesignTokensContent,
  AIDemoContent,
  HMIDemoContent,
};

// ---- All projects ----
export const projects: ProjectData[] = allProjects;

// ---- All tags ----
export const tagDefinitions: TagDefinition[] = tags as TagDefinition[];

// ---- Auto-index: tag → projects ----
export function buildTagIndex(): TagIndex[] {
  const projectMap = new Map<string, ProjectData[]>();

  for (const p of projects) {
    for (const tagId of p.tags) {
      if (!projectMap.has(tagId)) projectMap.set(tagId, []);
      projectMap.get(tagId)!.push(p);
    }
  }

  return tagDefinitions
    .map((tag) => ({
      tag,
      projects: projectMap.get(tag.id) ?? [],
    }))
    .sort((a, b) => a.tag.sortOrder - b.tag.sortOrder);
}

// Convenience: lookup a tag's projects directly
export function getProjectsForTag(tagId: string): ProjectData[] {
  return projects.filter((p) => p.tags.includes(tagId));
}

// Convenience: load all projects for folder content display
export function getAllProjects(): ProjectData[] {
  return projects;
}

// Resolve relative asset path (./cover.jpg) to public URL
// Images are copied to public/assets/images/<projectId>/ at build time
export function resolveAsset(projectId: string, relativePath: string): string {
  // Strip leading ./ if present
  const filename = relativePath.replace(/^\.\//, "");
  return `/assets/images/${projectId}/${filename}`;
}

// Return all resolved asset paths for a project
export function getProjectAssets(project: ProjectData): {
  cover: string;
  hover: string;
  gallery: string[];
} {
  return {
    cover: resolveAsset(project.id, project.assets.cover),
    hover: resolveAsset(project.id, project.assets.hover),
    gallery: project.assets.gallery.map((p) => resolveAsset(project.id, p)),
  };
}
