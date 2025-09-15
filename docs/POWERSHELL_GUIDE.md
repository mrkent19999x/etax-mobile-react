# 💻 PowerShell Scripts Guide - eTax Mobile PWA

## 🚀 **Sử dụng PowerShell Scripts trên Windows**

### **📋 Danh sách Scripts:**

1. **`scripts/optimize-images.ps1`** - Tối ưu ảnh
2. **`scripts/lighthouse-audit.ps1`** - Lighthouse audit
3. **`scripts/deploy-production.ps1`** - Deploy GitHub Pages
4. **`scripts/run-all-tasks.ps1`** - Chạy tất cả tasks

---

## 🔧 **Cài đặt Prerequisites**

### **1. Node.js & npm**
```powershell
# Kiểm tra đã cài đặt chưa
node --version
npm --version

# Nếu chưa có, tải từ: https://nodejs.org/
```

### **2. Git**
```powershell
# Kiểm tra đã cài đặt chưa
git --version

# Nếu chưa có, tải từ: https://git-scm.com/
```

### **3. Lighthouse CLI**
```powershell
# Cài đặt Lighthouse
npm install -g lighthouse
```

### **4. ImageMagick (Optional)**
```powershell
# Sử dụng Chocolatey
choco install imagemagick

# Hoặc tải từ: https://imagemagick.org/script/download.php#windows
```

### **5. WebP Tools (Optional)**
```powershell
# Sử dụng Chocolatey
choco install webp

# Hoặc tải từ: https://developers.google.com/speed/webp/download
```

---

## 🎯 **Cách sử dụng Scripts**

### **1. Tối ưu ảnh**
```powershell
# Chạy script tối ưu ảnh
.\scripts\optimize-images.ps1

# Kết quả:
# - Backup ảnh gốc vào public/assets/backup/
# - Tối ưu ảnh vào public/assets/optimized/
# - Tạo WebP versions
# - Tạo responsive sizes (sm, md, lg)
```

### **2. Lighthouse Audit**
```powershell
# Chạy Lighthouse audit
.\scripts\lighthouse-audit.ps1

# Kết quả:
# - HTML report: lighthouse-reports/etax-mobile-report.report.html
# - JSON report: lighthouse-reports/etax-mobile-report.report.json
# - Scores: Performance, Accessibility, Best Practices, SEO, PWA
# - Target: ≥95 điểm cho tất cả categories
```

### **3. Production Deploy**
```powershell
# Deploy lên GitHub Pages
.\scripts\deploy-production.ps1

# Kết quả:
# - Build production
# - Tạo gh-pages branch
# - Deploy lên GitHub Pages
# - URL: https://mrkent19999x.github.io/etax-mobile-react/
```

### **4. Chạy tất cả tasks**
```powershell
# Chạy tất cả scripts
.\scripts\run-all-tasks.ps1

# Kết quả:
# - Hiển thị status tất cả tasks
# - Kiểm tra prerequisites
# - Hướng dẫn next steps
```

---

## 🛠️ **Troubleshooting**

### **Lỗi Execution Policy**
```powershell
# Kiểm tra execution policy
Get-ExecutionPolicy

# Nếu bị chặn, chạy lệnh sau:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Hoặc chạy script với bypass:
PowerShell -ExecutionPolicy Bypass -File .\scripts\lighthouse-audit.ps1
```

### **Lỗi Module không tìm thấy**
```powershell
# Cài đặt module cần thiết
Install-Module -Name PowerShellGet -Force -AllowClobber
```

### **Lỗi Git Authentication**
```powershell
# Cấu hình Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Hoặc sử dụng GitHub CLI
gh auth login
```

### **Lỗi Node.js/npm**
```powershell
# Cập nhật npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force
```

---

## 📱 **Testing trên Mobile**

### **1. Development Server**
```powershell
# Khởi động development server
npm run dev

# Truy cập từ iPhone:
# http://[YOUR_IP]:5173/etax-mobile-react/
```

### **2. Production Testing**
```powershell
# Sau khi deploy, test production:
# https://mrkent19999x.github.io/etax-mobile-react/
```

### **3. PWA Testing**
- Mở Safari trên iPhone
- Truy cập URL
- Nhấn Share → "Add to Home Screen"
- Test app shortcuts và offline functionality

---

## 📊 **Performance Monitoring**

### **1. Lighthouse Scores**
- **Performance**: ≥95
- **Accessibility**: ≥95
- **Best Practices**: ≥95
- **SEO**: ≥95
- **PWA**: ≥95

### **2. Key Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **3. Mobile Performance**
- **Touch Response**: < 100ms
- **Scroll Performance**: 60fps
- **Memory Usage**: < 50MB
- **Battery Impact**: Minimal

---

## 🚀 **Deployment Checklist**

### **Pre-Deploy**
- [ ] All scripts executable
- [ ] Dependencies installed
- [ ] Git configured
- [ ] Development server tested
- [ ] Images optimized
- [ ] Lighthouse scores ≥95

### **Deploy**
- [ ] Run production build
- [ ] Test production build
- [ ] Deploy to GitHub Pages
- [ ] Verify deployment
- [ ] Test PWA installation

### **Post-Deploy**
- [ ] Test on real devices
- [ ] Monitor performance
- [ ] Collect user feedback
- [ ] Fix any issues
- [ ] Update documentation

---

## 📚 **Additional Resources**

### **Documentation**
- **Figma Mapping**: `docs/FIGMA_MAPPING.md`
- **Mobile Testing**: `docs/MOBILE_TESTING_GUIDE.md`
- **Real Device Testing**: `docs/REAL_DEVICE_TESTING.md`

### **Scripts Location**
```
scripts/
├── optimize-images.ps1      # Image optimization
├── lighthouse-audit.ps1     # Performance audit
├── deploy-production.ps1    # Production deploy
└── run-all-tasks.ps1       # Run all tasks
```

### **Output Locations**
```
lighthouse-reports/          # Lighthouse audit results
public/assets/backup/        # Original images backup
public/assets/optimized/     # Optimized images
dist/                       # Production build
```

---

**💻 PowerShell Scripts hoàn tất - eTax Mobile PWA sẵn sàng cho Windows development!**