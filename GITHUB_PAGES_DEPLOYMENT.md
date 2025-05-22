# Deploying Your Portfolio to GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages, making it accessible online for free.

## Prerequisites

- A GitHub account
- Git installed on your computer or GitHub Desktop app

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the upper right corner and select "New repository"
3. Name your repository (for example: "portfolio" or "my-portfolio")
4. Make the repository public
5. Click "Create repository"

## Step 2: Prepare Your Portfolio for GitHub Pages

Your portfolio site has been configured to work with GitHub Pages using static data when deployed. The site detects when it's running on GitHub Pages and automatically uses the mock data instead of trying to make API calls.

## Step 3: Push Your Code to GitHub

### Using Git command line:

```bash
# Clone your repository (replace with your actual repository URL)
git clone https://github.com/yourusername/your-repo-name.git

# Copy all your project files to the cloned repository folder

# Navigate to your repository folder
cd your-repo-name

# Add all files to git
git add .

# Commit your changes
git commit -m "Initial commit of portfolio website"

# Push to GitHub
git push origin main
```

### Using GitHub Desktop:
1. Open GitHub Desktop
2. Add your local repository
3. Commit your changes with a message
4. Push to GitHub

## Step 4: Build Your Portfolio for GitHub Pages

1. In your local repository, run:
```bash
# Make the deploy script executable
chmod +x github-pages-deploy.sh

# Run the deploy script
./github-pages-deploy.sh
```

2. This creates a `gh-pages-build` directory with your built portfolio ready for GitHub Pages

## Step 5: Deploy to the gh-pages Branch

### Using Git command line:
```bash
# Create and switch to a new orphan branch (no history)
git checkout --orphan gh-pages

# Remove all files from staging
git rm -rf .

# Copy the contents of gh-pages-build to your repository
cp -r gh-pages-build/* .

# Add all files to git
git add .

# Commit your changes
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
git push origin gh-pages
```

### Using GitHub Desktop:
1. Create a new branch called "gh-pages"
2. Delete all files in this branch
3. Copy all files from the `gh-pages-build` directory to your repository
4. Commit and push these changes

## Step 6: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub.com
2. Click "Settings" → "Pages"
3. Under "Source", select the "gh-pages" branch
4. Click "Save"

## Step 7: Access Your Portfolio

Your portfolio will be available at: 
```
https://yourusername.github.io/your-repo-name/
```

For example, if your GitHub username is "johndoe" and your repository is named "portfolio", your site will be at:
```
https://johndoe.github.io/portfolio/
```

It may take a few minutes for your site to be published after setting up GitHub Pages.