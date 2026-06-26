#!/bin/bash

# Codestarix Local Hosting Script
echo "🚀 Starting Codestarix Local Hosting..."

# Check for pnpm
if ! command -v pnpm &> /dev/null
then
    echo "❌ pnpm could not be found. Please install it with: npm install -g pnpm"
    exit
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🏗️ Building the project..."
pnpm --filter @workspace/codestarix run build

# Serve the project
echo "🌐 Hosting the site at http://localhost:3000"
echo "Press Ctrl+C to stop hosting."
npx serve -s artifacts/codestarix/dist/public
