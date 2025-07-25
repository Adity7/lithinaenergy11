#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Fix permissions
echo "Fixing permissions..."
chmod +x node_modules/.bin/tsc
chmod +x node_modules/.bin/vite

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"
