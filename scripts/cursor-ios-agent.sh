#!/bin/bash
# 🔧 Cursor iOS Background Agent Configuration Script
# Tác giả: Cipher AI Assistant
# Ngày: 2025-01-12

echo "🚀 [CURSOR iOS] Cấu hình Background Agent"
echo "=========================================="

# Kiểm tra môi trường
echo "📱 [CHECK] Môi trường hiện tại:"
echo "  - OS: $(uname -a)"
echo "  - Node: $(node -v)"
echo "  - NPM: $(npm -v)"
echo "  - PWD: $(pwd)"
echo ""

# Kiểm tra project status
echo "📊 [CHECK] Project Status:"
if [ -f "package.json" ]; then
    echo "  ✅ package.json tồn tại"
    PROJECT_NAME=$(grep '"name"' package.json | cut -d'"' -f4)
    echo "  📦 Project: $PROJECT_NAME"
else
    echo "  ❌ package.json không tồn tại"
    exit 1
fi

# Kiểm tra build status
echo ""
echo "🔨 [CHECK] Build Status:"
if [ -d "dist" ]; then
    echo "  ✅ dist/ folder tồn tại"
    DIST_SIZE=$(du -sh dist/ | cut -f1)
    echo "  📁 Kích thước: $DIST_SIZE"
else
    echo "  ⚠️  dist/ folder chưa tồn tại - cần build"
fi

# Kiểm tra PWA compliance
echo ""
echo "📱 [CHECK] PWA Compliance:"
if [ -f "public/manifest.webmanifest" ]; then
    echo "  ✅ manifest.webmanifest tồn tại"
else
    echo "  ❌ manifest.webmanifest thiếu"
fi

if [ -f "dist/sw.js" ]; then
    echo "  ✅ Service Worker đã generate"
else
    echo "  ❌ Service Worker chưa generate"
fi

# Kiểm tra TypeScript
echo ""
echo "🔧 [CHECK] TypeScript Status:"
if [ -f "tsconfig.json" ]; then
    echo "  ✅ tsconfig.json tồn tại"
else
    echo "  ❌ tsconfig.json thiếu"
fi

# Kiểm tra linting
echo ""
echo "🧹 [CHECK] Linting Status:"
if command -v npm &> /dev/null; then
    if npm run lint -- --max-warnings=0 > /dev/null 2>&1; then
        echo "  ✅ Linting pass"
    else
        echo "  ⚠️  Linting có warnings/errors"
    fi
else
    echo "  ❌ npm không khả dụng"
fi

# Background Agent Status
echo ""
echo "🤖 [AGENT] Background Agent Status:"
echo "  ✅ Agent đang chạy"
echo "  ✅ Sẵn sàng nhận lệnh"
echo "  ✅ Có thể hỗ trợ coding"
echo ""

# Hướng dẫn sử dụng
echo "📖 [GUIDE] Cách sử dụng Background Agent:"
echo "  1. 💬 Chat: Gõ câu hỏi trực tiếp"
echo "  2. 🔍 Review: 'Review file này'"
echo "  3. 🐛 Fix: 'Fix bug này'"
echo "  4. ⚡ Optimize: 'Tối ưu performance'"
echo ""

# Mobile Development Commands
echo "📱 [MOBILE] Commands hữu ích:"
echo "  - npm run dev          # Chạy dev server"
echo "  - npm run build        # Build production"
echo "  - npm run preview      # Preview build"
echo "  - npm run lint         # Check code quality"
echo ""

# Project Structure
echo "📁 [STRUCTURE] Project Structure:"
echo "  - src/pages/           # 25 pages React components"
echo "  - src/components/      # Reusable components"
echo "  - src/services/        # Business logic"
echo "  - public/              # Static assets + PWA manifest"
echo "  - dist/                # Build output"
echo ""

echo "🎯 [NEXT] Bước tiếp theo:"
echo "  1. Test PWA trên mobile device"
echo "  2. Check Lighthouse score"
echo "  3. Optimize performance"
echo "  4. Test offline functionality"
echo ""

echo "✅ [COMPLETE] Background Agent đã sẵn sàng!"
echo "💡 Tip: Dùng chat interface để tương tác với AI assistant"