# 🚀 Hướng dẫn phát triển eTax Mobile React PWA

## 📋 Mục lục
- [Tổng quan](#tổng-quan)
- [Cài đặt](#cài-đặt)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Quy tắc phát triển](#quy-tắc-phát-triển)
- [Design System](#design-system)
- [PWA Features](#pwa-features)
- [Testing](#testing)
- [Deployment](#deployment)

## 🎯 Tổng quan

**eTax Mobile React PWA** là ứng dụng di động clone 100% UX/UI của eTax chính thức, được xây dựng với:

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Konsta UI
- **PWA**: Service Worker + Manifest + Offline Support
- **Target**: Mobile-first (360px-430px)

## ⚙️ Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/mrkent19999x/etax-mobile-react.git
cd etax-mobile-react
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình MCP Figma
```bash
# Test kết nối Figma
node scripts/figma/test-connection.js
```

### 4. Chạy development server
```bash
npm run dev
```

## 📁 Cấu trúc dự án

```
etax-mobile-react/
├── config/                 # Cấu hình dự án
│   ├── design-system.json  # Design system
│   ├── mcp-figma.json     # Figma config
│   ├── project.json       # Project info
│   └── rules.json         # Development rules
├── docs/                  # Tài liệu
│   ├── DEVELOPMENT.md     # Hướng dẫn phát triển
│   └── design/           # Design assets
├── scripts/              # Scripts tiện ích
│   ├── figma/           # Figma scripts
│   └── analysis/        # Analysis scripts
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   ├── services/       # API services
│   └── utils/          # Utilities
└── public/             # Static assets
```

## 🔧 Quy tắc phát triển

### Code Style
- **Ngôn ngữ**: 100% tiếng Việt
- **Naming**: camelCase cho variables, PascalCase cho components
- **Formatting**: Prettier + ESLint strict
- **Comments**: Tiếng Việt rõ ràng, dễ hiểu

### Architecture
- **Pattern**: Component-based
- **State**: React Context + Hooks
- **Styling**: Tailwind CSS classes only
- **Types**: TypeScript strict mode

### Quality
- **ESLint**: Zero errors policy
- **TypeScript**: Strict mode enabled
- **Build**: Must pass before commit
- **Testing**: Test before deploy

## 🎨 Design System

### Colors
- **Primary**: #007AFF (iOS Blue)
- **Secondary**: #34C759 (iOS Green)
- **Warning**: #FF9500 (iOS Orange)
- **Error**: #FF3B30 (iOS Red)
- **Background**: #F2F2F7 (iOS Background)
- **Surface**: #FFFFFF (iOS Surface)

### Typography
- **Font Family**: SF Pro Display/Text
- **Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 32px
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing
- **Scale**: 4px, 8px, 16px, 20px, 24px, 32px
- **Approach**: Mobile-first responsive

## 📱 PWA Features

### Manifest
- **Name**: eTax Mobile
- **Short Name**: eTax
- **Theme**: #007AFF
- **Background**: #F2F2F7

### Service Worker
- **Caching**: Cache-first strategy
- **Offline**: Offline fallback pages
- **Updates**: Auto-update on reload

### Performance
- **Lighthouse**: ≥95 points
- **Bundle Size**: <500KB gzipped
- **FCP**: <1.5s
- **LCP**: <2.5s

## 🧪 Testing

### Development
```bash
npm run dev          # Development server
npm run build        # Build production
npm run preview      # Preview build
npm run lint         # Lint code
```

### Quality Checks
```bash
# Check TypeScript
npx tsc --noEmit

# Check ESLint
npm run lint

# Build test
npm run build
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Static Hosting
- **Vercel**: Ready
- **Netlify**: Ready
- **GitHub Pages**: Ready

## 📞 Hỗ trợ

- **Author**: Nghia Nguyen
- **Email**: begau1302@gmail.com
- **Repository**: https://github.com/mrkent19999x/etax-mobile-react

---

**🎯 Mục tiêu**: Tạo ra một PWA React hiện đại, performant, và user-friendly với quy tắc phát triển nghiêm ngặt và chất lượng cao nhất.


