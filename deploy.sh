#!/bin/bash
# ================================================================
# Portfolio AI — Full Build, Commit & Deploy
# ================================================================
set -e
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install --silent

echo ""
echo "🖼️  Copying project assets..."
node scripts/copy-project-assets.mjs

echo ""
echo "🔨 Building for production..."
npm run build

echo ""
echo "📝 Committing to git..."
git add -A .
git commit -m "Production-ready: content-driven CMS, self-contained projects, Vercel deploy

Architecture:
- tags.json = tag UI metadata only (no project lists)
- Each project folder is self-contained: project.json + images
- project.json uses relative asset paths (./cover.jpg)
- buildTagIndex() auto-maps projects to tags at runtime
- Adding a project = one new folder + one import line

Prebuild:
- scripts/copy-project-assets.mjs copies images to public/

Deploy:
- vercel.json, robots.txt, manifest.json, sitemap.ts
- Full SEO metadata in layout.tsx

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>" || echo "Nothing to commit"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done. Push to https://github.com/DiqingWWW/portfolio_ai"
echo "   Vercel will auto-deploy from main branch."
