# 🚀 HƯỚNG DẪN TẠO GITHUB PAGES

## Bước 1: Tạo GitHub Repository

### Cách 1: Qua GitHub Website
1. Truy cập [github.com](https://github.com)
2. Click **"New repository"** (nút xanh)
3. Điền thông tin:
   - **Repository name**: `etax-mobile-react`
   - **Description**: `eTax Mobile PWA - Progressive Web App với React + TypeScript`
   - **Visibility**: ✅ Public
   - **Initialize**: ❌ Bỏ tick tất cả
4. Click **"Create repository"**

### Cách 2: Qua GitHub CLI (nếu có)
```bash
gh repo create etax-mobile-react --public --description "eTax Mobile PWA"
```

## Bước 2: Push Code lên GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/etax-mobile-react.git

# Push code
git branch -M main
git push -u origin main
```

## Bước 3: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Click tab **"Settings"**
3. Scroll xuống **"Pages"** (sidebar trái)
4. **Source**: Deploy from a branch
5. **Branch**: main
6. **Folder**: / (root)
7. Click **"Save"**

## Bước 4: Kích hoạt GitHub Actions

1. Vào tab **"Actions"**
2. Click **"I understand my workflows, go ahead and enable them"**
3. Workflow sẽ tự động chạy khi push code

## Bước 5: Test PWA

### URL Demo
```
https://YOUR_USERNAME.github.io/etax-mobile-react/
```

### Test PWA Features
1. **Add to Home Screen**:
   - iOS Safari: Share → Add to Home Screen
   - Android Chrome: Menu → Add to Home Screen

2. **Admin Panel**:
   - URL: `/admin`
   - Password: `etax_admin_2025`

3. **PDF Manager**:
   - Upload PDF files
   - Test iOS viewer
   - Download functionality

## Bước 6: Custom Domain (Optional)

### Nếu muốn domain riêng:
1. Tạo file `public/CNAME`:
```
yourdomain.com
```

2. Cấu hình DNS:
```
CNAME yourdomain.com → YOUR_USERNAME.github.io
```

3. Update `vite.config.ts`:
```typescript
base: '/', // Thay vì '/etax-mobile-react/'
```

## 🎯 Kết quả

Sau khi hoàn thành, anh sẽ có:

✅ **Live PWA**: `https://username.github.io/etax-mobile-react/`
✅ **Admin Panel**: Quản lý demo và PDF
✅ **iOS Native UI**: Giao diện như app thật
✅ **PDF Manager**: Upload/download PDF
✅ **Add to Home Screen**: Cài đặt như app native
✅ **Offline Support**: Hoạt động offline

## 🔧 Troubleshooting

### Lỗi 404
- Kiểm tra `base` trong `vite.config.ts`
- Đảm bảo repository name đúng

### PWA không cài được
- Kiểm tra HTTPS (GitHub Pages tự động có)
- Kiểm tra manifest.webmanifest
- Test trên device thật

### PDF không hiển thị
- Kiểm tra file PDF đã upload chưa
- Test trên browser khác
- Kiểm tra console errors

## 📱 Test trên Mobile

### iPhone Safari
1. Mở Safari
2. Vào demo URL
3. Tap Share → Add to Home Screen
4. App xuất hiện trên home screen

### Android Chrome
1. Mở Chrome
2. Vào demo URL
3. Tap menu → Add to Home Screen
4. App cài đặt như native

---

**Chúc anh thành công! 🚀**