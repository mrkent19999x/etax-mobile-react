# 🔧 Troubleshooting Guide cho Cursor iOS

## 🚨 **Common Issues & Solutions**

### **1. Background Agent không phản hồi**

#### **Triệu chứng:**
- Agent hiển thị "đang chạy" nhưng không trả lời
- Chat interface không hoạt động
- Commands không được xử lý

#### **Giải pháp:**
```bash
# 1. Restart Cursor app
# 2. Check internet connection
# 3. Verify project structure
ls -la
cat package.json

# 4. Clear cache nếu cần
rm -rf node_modules/.cache
npm install
```

#### **Prevention:**
- Giữ Cursor app updated
- Stable internet connection
- Regular project cleanup

### **2. Build Errors**

#### **Triệu chứng:**
- `npm run build` fails
- TypeScript errors
- Missing dependencies

#### **Giải pháp:**
```bash
# 1. Check Node.js version
node -v  # Should be v22.16.0+

# 2. Clear và reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Check TypeScript config
cat tsconfig.json

# 4. Build với verbose output
npm run build -- --verbose
```

#### **Common Build Issues:**
- **TypeScript errors**: Check `tsconfig.json`
- **Missing deps**: Run `npm install`
- **Memory issues**: Increase Node memory limit
- **Path issues**: Check file paths và imports

### **3. PWA Issues**

#### **Triệu chứng:**
- App không install được
- Service worker không hoạt động
- Offline functionality broken

#### **Giải pháp:**
```bash
# 1. Check manifest
cat public/manifest.webmanifest

# 2. Verify service worker
ls -la dist/sw.js

# 3. Test PWA compliance
npm run build
npm run preview
# Open browser DevTools > Application > Manifest
```

#### **PWA Checklist:**
- [ ] Manifest file exists và valid
- [ ] Service worker registered
- [ ] Icons present (192x192, 512x512)
- [ ] HTTPS enabled
- [ ] Offline fallback configured

### **4. Performance Issues**

#### **Triệu chứng:**
- App chậm trên mobile
- Bundle size quá lớn
- Slow loading times

#### **Giải pháp:**
```bash
# 1. Analyze bundle
npm run build
ls -lh dist/assets/

# 2. Check bundle size
npx vite-bundle-analyzer dist/

# 3. Optimize images
# Use WebP format, proper sizing

# 4. Code splitting
# Implement dynamic imports
```

#### **Performance Optimization:**
- **Code splitting**: Dynamic imports
- **Image optimization**: WebP, proper sizing
- **Lazy loading**: Components và routes
- **Caching**: Service worker strategies
- **Compression**: Gzip/Brotli

### **5. Mobile-Specific Issues**

#### **Triệu chứng:**
- Touch không responsive
- Viewport issues
- Keyboard problems
- Orientation bugs

#### **Giải pháp:**
```bash
# 1. Check viewport meta tag
grep -r "viewport" src/

# 2. Test touch interactions
# Use Chrome DevTools Device Toolbar

# 3. Check CSS media queries
grep -r "@media" src/styles/

# 4. Verify touch targets
# Minimum 44px for touch targets
```

#### **Mobile UX Checklist:**
- [ ] Viewport meta tag present
- [ ] Touch targets ≥ 44px
- [ ] Swipe gestures working
- [ ] Keyboard handling proper
- [ ] Orientation changes handled

## 🔍 **Debugging Commands**

### **Project Health Check:**
```bash
# Full project status
bash scripts/cursor-ios-agent.sh

# Check specific components
npm run lint
npm run type-check
npm run build
```

### **AI Debugging:**
```
"Help debug this error: [paste error]"
"Analyze performance issues"
"Check mobile compatibility"
"Fix PWA problems"
"Optimize for mobile"
```

### **Log Analysis:**
```bash
# Check build logs
cat logs/build.log

# Check error logs
cat logs/error.log

# Check process history
cat process.md
```

## 🚨 **Emergency Procedures**

### **Nếu project không build:**
1. **Backup**: `git stash` current changes
2. **Reset**: `git reset --hard HEAD`
3. **Clean**: `rm -rf node_modules dist`
4. **Reinstall**: `npm install`
5. **Build**: `npm run build`

### **Nếu Agent hoàn toàn không hoạt động:**
1. **Restart**: Close và reopen Cursor
2. **Check**: Internet connection
3. **Verify**: Project structure
4. **Reconnect**: Agent connection
5. **Fallback**: Use desktop development

### **Nếu mobile testing fails:**
1. **Check**: Device compatibility
2. **Verify**: Browser support
3. **Test**: Different devices
4. **Debug**: Use remote debugging
5. **Optimize**: Based on findings

## 📊 **Monitoring & Prevention**

### **Regular Checks:**
- **Daily**: Project status với AI
- **Weekly**: Performance metrics
- **Monthly**: Dependency updates
- **Quarterly**: Architecture review

### **Health Metrics:**
- **Build time**: < 30 seconds
- **Bundle size**: < 500KB
- **Lighthouse score**: > 90
- **Mobile performance**: > 80

### **Warning Signs:**
- Build time > 1 minute
- Bundle size > 1MB
- Lighthouse score < 80
- Mobile performance < 70

## 🆘 **Getting Help**

### **AI Assistance:**
- **Chat**: Direct questions to AI
- **Code Review**: "Review this code"
- **Debugging**: "Help fix this issue"
- **Optimization**: "Improve performance"

### **Community Resources:**
- **GitHub Issues**: Project repository
- **Stack Overflow**: Technical questions
- **Discord**: Real-time help
- **Documentation**: Project docs

### **Escalation Path:**
1. **Self-service**: Use AI chat
2. **Community**: GitHub/Discord
3. **Professional**: Paid support
4. **Emergency**: Direct contact

---
**Cập nhật**: 2025-01-12  
**Status**: Production Ready  
**Next**: Test troubleshooting procedures