#!/bin/bash

# Premium Setup Installation Script
# Installs TypeScript, Three.js, and Next.js dependencies

echo "🚀 Installing Premium Setup..."
echo ""

# Frontend dependencies
echo "📦 Installing frontend dependencies (TypeScript + Three.js)..."
cd apps/web
npm install
cd ../..

# Backend dependencies
echo "📦 Installing backend dependencies (TypeScript)..."
cd apps/api
npm install
cd ../..

# Next.js dependencies (optional)
read -p "Do you want to install Next.js dependencies? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 Installing Next.js dependencies..."
    cd apps/nextjs
    npm install
    cd ../..
fi

echo ""
echo "✅ Premium Setup Installation Complete!"
echo ""
echo "📚 Next Steps:"
echo "  1. Read QUICK_START.md for usage examples"
echo "  2. Read SETUP_GUIDE.md for comprehensive documentation"
echo "  3. Start using TypeScript, Three.js, and Next.js!"
echo ""
echo "🎉 Happy coding!"
