#!/bin/bash

# 🚀 eTax Mobile PWA - Deploy Script
echo "🚀 Starting eTax Mobile PWA deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not initialized!"
    print_status "Run: git init"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No remote origin found!"
    print_status "Please add remote origin first:"
    print_status "git remote add origin https://github.com/YOUR_USERNAME/etax-mobile-react.git"
    exit 1
fi

# Build the project
print_status "Building project..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Add all changes
print_status "Adding changes to git..."
git add .

# Commit changes
print_status "Committing changes..."
git commit -m "🚀 Deploy: $(date '+%Y-%m-%d %H:%M:%S')

✨ Features:
- PWA with Add to Home Screen
- iOS native UI
- PDF Manager
- Admin Panel
- 25 pages complete
- Dynamic content system

📱 Ready for GitHub Pages!"

# Push to main branch
print_status "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    print_success "Deployment completed successfully!"
    print_status "Your PWA will be available at:"
    print_status "https://YOUR_USERNAME.github.io/etax-mobile-react/"
    print_status ""
    print_status "Admin Panel:"
    print_status "https://YOUR_USERNAME.github.io/etax-mobile-react/admin"
    print_status "Password: etax_admin_2025"
    print_status ""
    print_status "Next steps:"
    print_status "1. Wait 2-3 minutes for GitHub Pages to update"
    print_status "2. Test PWA on mobile device"
    print_status "3. Test Add to Home Screen functionality"
    print_status "4. Test PDF upload/download in admin panel"
else
    print_error "Push failed!"
    exit 1
fi