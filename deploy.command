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
  echo "🆕 First-time setup — creating & deploying to production..."
  echo "   (You're already logged in)"
  echo ""
  vercel --prod --yes
fi

echo ""
echo "🎉 Deployment complete! Check above for your production URL."
echo "   Press Enter to close..."
read
