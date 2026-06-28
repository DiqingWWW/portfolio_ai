#!/bin/bash
# ================================================================
# Portfolio AI — Production Build
# ================================================================
set -e
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install --silent

echo ""
echo "🖼️  Copying project assets to public/..."
node scripts/copy-project-assets.mjs

echo ""
echo "🔨 Building Next.js..."
npm run build

echo ""
echo "✅ Build successful!"
