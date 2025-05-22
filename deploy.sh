#!/usr/bin/env bash

# Build the project
npm run build

# Create a directory for GitHub Pages
mkdir -p dist

# Copy the build output to the dist directory
cp -r client/dist/* dist/

# Create a .nojekyll file to prevent GitHub from ignoring files that begin with an underscore
touch dist/.nojekyll

# If you're using a custom domain
# echo "yourdomain.com" > dist/CNAME

echo "Ready for GitHub Pages deployment!"
echo "Now commit and push the dist folder to the gh-pages branch"