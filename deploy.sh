#!/bin/bash
set -e
cd /Users/wudiqing/Documents/cc_test/portfolio_ai

echo "📦 Staging all files..."
git add -A .

echo "📝 Committing..."
git commit -m "Production-ready: content-driven architecture, Vercel deployment audit, cleanup

Content-driven refactor:
- tags.json defines tag UI metadata, projects self-declare their tags
- buildTagIndex() auto-maps projects → tags at runtime
- All text content extracted from components into JSON files
- content/projects/_index.ts barrel file for project manifest

Deployment audit & fixes:
- Added @content/* path alias in tsconfig.json
- Added vercel.json with locked framework settings
- Added robots.txt, manifest.json, sitemap.ts
- Full SEO metadata in layout.tsx (OG, Twitter, meta tags)

Production cleanup:
- Removed 7 dead components (Canvas, Node, HoverWrapper, etc.)
- Removed stale config files (design_spec.json, nodes.json)
- Removed duplicate images from public/images/
- Removed boilerplate SVGs and temp files

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"

echo ""
echo "🚀 Pushing to origin/main..."
git push origin main

echo ""
echo "✅ Done. https://github.com/DiqingWWW/portfolio_ai"
