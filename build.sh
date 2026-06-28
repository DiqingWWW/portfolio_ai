#!/bin/bash
# ================================================================
# Portfolio AI — Production Build & Deploy Script
# ================================================================
set -e

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building for production..."
npm run build

echo ""
echo "✅ Build successful!"
echo ""
echo "📁 Project is ready for Vercel deployment."
echo "   Deploy directory: $(pwd)"
echo ""
echo "   Vercel settings:"
echo "     Framework:     Next.js"
echo "     Root Directory: portfolio_ai"
echo "     Build Command: next build"
echo "     Output Dir:    .next"
echo "     Node Version:  22.x"
