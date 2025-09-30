#!/bin/bash

# Deploy eTax Mobile PWA locally for testing
echo "🚀 Starting eTax Mobile PWA Local Deploy..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Building first..."
    npm run build
fi

# Start local server
echo "🌐 Starting local server on port 8080..."
echo "📱 PWA URL: http://localhost:8080"
echo "📋 Manifest: http://localhost:8080/manifest.webmanifest"
echo "🔧 Service Worker: http://localhost:8080/sw.js"
echo ""
echo "📱 iOS Testing Instructions:"
echo "1. Open Safari on iOS device"
echo "2. Navigate to: http://$(hostname -I | awk '{print $1}'):8080"
echo "3. Tap Share button → Add to Home Screen"
echo "4. Test PWA functionality"
echo ""
echo "Press Ctrl+C to stop server"

# Start Python HTTP server
cd dist && python3 -m http.server 8080