#!/bin/bash
# Wedding Website — Vercel Deploy
# Double-click this file to deploy to Vercel

set -e

# Change to the project directory (handles being launched from Finder)
cd "$(dirname "$0")"

echo "🚀 Wedding Website Vercel Deployer"
echo "===================================="
echo ""

# 1. Check / install Vercel CLI
if ! command -v vercel &>/dev/null; then
  echo "📦 Vercel CLI not found — installing..."
  npm i -g vercel
  echo ""
fi

echo "✅ Vercel CLI: $(vercel --version)"
echo ""

# 2. Check if project is already linked
if [ -d ".vercel" ]; then
  echo "🔗 Project already linked to Vercel."
  echo "   Deploying to PRODUCTION..."
  echo ""
  vercel --prod
else
  echo "🆕 No existing Vercel project link found."
  echo "   Starting new project setup..."
  echo ""
  echo "   When prompted:"
  echo "   • Scope:         your personal account or team"
  echo "   • Project name:  wedding-website (or press Enter)"
  echo "   • Directory:     ./ (press Enter)"
  echo "   • Build command: npm run build  ← use this"
  echo "   • Output dir:    dist            ← use this"
  echo ""
  vercel
fi

echo ""
echo "🎉 Deployment complete! Check above for your production URL."
echo "   Press Enter to close..."
read
