#!/usr/bin/env bash

# This script prepares your portfolio for GitHub Pages deployment

# Create a build directory for GitHub Pages
echo "Creating build directory for GitHub Pages..."
mkdir -p gh-pages-build

# Build the client-side application
echo "Building the portfolio site..."
cd client
npm run build
cd ..

# Copy the built files to the gh-pages-build directory
echo "Preparing files for GitHub Pages..."
cp -r client/dist/* gh-pages-build/

# Create necessary GitHub Pages files
touch gh-pages-build/.nojekyll
echo "# Portfolio Website" > gh-pages-build/README.md

# Create a note with instructions
cat > GITHUB_PAGES_DEPLOYMENT.md << 'EOL'
# GitHub Pages Deployment Instructions

To deploy your portfolio to GitHub Pages:

1. Create a GitHub repository for your portfolio project
2. Push your code to the repository
3. Upload the contents of the 'gh-pages-build' directory to the 'gh-pages' branch

## Using GitHub Desktop:
1. Open GitHub Desktop and add your repository
2. Commit and push your changes to the main branch
3. Create a new branch called 'gh-pages'
4. Delete all files in the 'gh-pages' branch
5. Copy all files from the 'gh-pages-build' directory to your repository
6. Commit and push these changes to the 'gh-pages' branch

## Enable GitHub Pages in your repository settings:
1. Go to your repository on GitHub.com
2. Click 'Settings' → 'Pages'
3. Select the 'gh-pages' branch as the source
4. Click 'Save'

Your portfolio will be available at: https://yourusername.github.io/repository-name/
EOL

echo "Done! Your site is ready for GitHub Pages deployment."
echo "See GITHUB_PAGES_DEPLOYMENT.md for instructions on how to deploy to GitHub Pages."