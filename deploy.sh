#!/bin/bash

# 🚀 Quick Deploy Script
# This script helps you deploy both frontend and backend

set -e  # Exit on error

echo "🚀 ExpoGraph Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is available
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed or not in PATH${NC}"
    echo "Please install Git or use Git Bash"
    exit 1
fi

# Check if we're in the right directory
if [ ! -d "apps/web" ] || [ ! -d "apps/api" ]; then
    echo -e "${RED}❌ Please run this script from the project root${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment checks...${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    read -p "Do you want to commit them? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="deploy: Updates"
        fi
        git add .
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping commit. Make sure to commit before deploying!${NC}"
    fi
fi

# Test frontend build
echo ""
echo -e "${YELLOW}🔨 Testing frontend build...${NC}"
cd apps/web
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed!${NC}"
    echo "Please fix build errors before deploying"
    exit 1
fi
cd ../..

# Check current branch
current_branch=$(git branch --show-current)
echo ""
echo -e "${YELLOW}📍 Current branch: ${current_branch}${NC}"

# Ask for confirmation
echo ""
read -p "Ready to push to ${current_branch}? This will trigger auto-deploy (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled${NC}"
    exit 0
fi

# Push to remote
echo ""
echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
if git push origin "$current_branch"; then
    echo -e "${GREEN}✅ Pushed successfully!${NC}"
    echo ""
    echo -e "${GREEN}🎉 Deployment triggered!${NC}"
    echo ""
    echo "📊 Monitor deployments:"
    echo "   Frontend: https://vercel.com/dashboard"
    echo "   Backend:  https://dashboard.render.com"
    echo ""
    echo "⏱️  Expected deployment time: 2-5 minutes"
    echo ""
    echo "✅ Verify after deployment:"
    echo "   Frontend: https://expograph.in"
    echo "   Backend:  https://api.expograph.in/health"
else
    echo -e "${RED}❌ Push failed!${NC}"
    exit 1
fi

