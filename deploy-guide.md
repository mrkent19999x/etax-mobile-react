# 🚀 HƯỚNG DẪN DEPLOY DEMO BẢO MẬT

## 📋 **TÓM TẮT HỆ THỐNG**

### **🔒 Bảo mật:**
- **Admin password**: `etax_admin_2025`
- **Token tự động hết hạn**: 3-7 ngày
- **Không thể copy**: Mỗi link chỉ dùng được 1 lần
- **Thu hồi ngay**: Có thể khóa link bất kỳ lúc nào

### **⚡ Deploy siêu đơn giản:**
- **1 click deploy**: Vercel, Netlify, GitHub Pages
- **Không cần server**: Static hosting
- **Update real-time**: Thay đổi ngay lập tức

## 🎯 **CÁCH SỬ DỤNG**

### **1. Tạo Demo Link:**
1. Vào `/secure-demo`
2. Click "Tạo Demo Mới"
3. Nhập: Tên KH, Công ty, MST, Số ngày
4. Click "Tạo Demo" → Copy link

### **2. Gửi cho khách hàng:**
```
Chào anh/chị,

Đây là link demo eTax Mobile:
https://your-domain.com/?token=secure_abc123

Link sẽ hết hạn sau 3 ngày.
Vui lòng không chia sẻ link này.

Trân trọng!
```

### **3. Quản lý nội dung:**
1. Vào `/secure-demo`
2. Click vào demo link
3. Chỉnh sửa nội dung (tên, MST, số tiền...)
4. Click "Lưu Nội Dung"

### **4. Thu hồi link:**
1. Vào `/secure-demo`
2. Click "Thu hồi" bên cạnh link
3. Link sẽ bị khóa ngay lập tức

## 🚀 **DEPLOY OPTIONS**

### **Option 1: Vercel (Khuyến nghị)**
```bash
# 1. Push code lên GitHub
git add .
git commit -m "Add secure demo system"
git push

# 2. Vào vercel.com
# 3. Import project từ GitHub
# 4. Deploy → Done!
```

### **Option 2: Netlify**
```bash
# 1. Build project
npm run build

# 2. Drag folder dist/ vào netlify.com
# 3. Deploy → Done!
```

### **Option 3: GitHub Pages**
```bash
# 1. Push code lên GitHub
# 2. Vào Settings → Pages
# 3. Source: Deploy from branch
# 4. Branch: main, folder: / (root)
# 5. Deploy → Done!
```

## 🔧 **CẤU HÌNH DOMAIN**

### **Sau khi deploy, cập nhật:**
1. Vào `vite.config.ts`
2. Thay `base: '/etax-mobile-react/'` → `base: '/'`
3. Rebuild: `npm run build`
4. Deploy lại

## 📱 **TEST TRÊN IPHONE**

### **1. Mở Safari iPhone:**
- Truy cập: `https://your-domain.com/?token=secure_abc123`
- Add to Home Screen
- Test như app thật

### **2. Kiểm tra bảo mật:**
- Link hết hạn → Không truy cập được
- Thu hồi link → Không truy cập được
- Copy link → Chỉ dùng được 1 lần

## 🎨 **TÙY CHỈNH NỘI DUNG**

### **Các trường có thể chỉnh sửa:**
- `user_name`: Tên khách hàng
- `user_mst`: Mã số thuế
- `company_name`: Tên công ty
- `tax_amount`: Số tiền thuế
- `deadline`: Hạn nộp thuế
- `phone`: Số điện thoại
- `email`: Email

### **Thêm trường mới:**
1. Vào `SecureDemoManager.ts`
2. Thêm vào `customContent` object
3. Rebuild và deploy

## 🔒 **BẢO MẬT NÂNG CAO**

### **1. Thay đổi admin password:**
```typescript
// Trong SecureDemoManager.ts
private static ADMIN_PASSWORD = 'your_new_password';
```

### **2. Thêm IP whitelist:**
```typescript
// Chỉ cho phép IP nhất định truy cập admin
private static ALLOWED_IPS = ['192.168.1.100', '10.0.0.50'];
```

### **3. Thêm rate limiting:**
```typescript
// Giới hạn số lần truy cập mỗi ngày
private static MAX_DAILY_ACCESS = 10;
```

## 📊 **MONITORING**

### **Thống kê real-time:**
- Số link active
- Tổng lượt truy cập
- Link hết hạn
- Link bị thu hồi

### **Export dữ liệu:**
- Vào `/secure-demo`
- Click "Export Data"
- Download file JSON

## 🚨 **TROUBLESHOOTING**

### **Link không hoạt động:**
1. Kiểm tra token có đúng không
2. Kiểm tra link có hết hạn không
3. Kiểm tra link có bị thu hồi không

### **Admin không đăng nhập được:**
1. Kiểm tra password: `etax_admin_2025`
2. Clear browser cache
3. Thử incognito mode

### **Nội dung không cập nhật:**
1. Click "Lưu Nội Dung"
2. Refresh trang
3. Kiểm tra localStorage

## 🎯 **WORKFLOW HOÀN CHỈNH**

### **Ngày 1:**
1. Deploy lên hosting
2. Tạo demo link cho KH A
3. Gửi link qua email/Zalo
4. KH test trên iPhone

### **Ngày 2-3:**
1. KH feedback
2. Chỉnh sửa nội dung theo yêu cầu
3. Tạo link mới nếu cần

### **Ngày 4:**
1. Link tự động hết hạn
2. Tạo link mới cho KH khác
3. Thu hồi link cũ

## 💡 **TIPS**

### **1. Tạo template nội dung:**
- Lưu sẵn nội dung mẫu
- Copy/paste cho KH mới
- Tiết kiệm thời gian

### **2. Sử dụng QR code:**
- Tạo QR code cho demo link
- In ra giấy gửi KH
- Chuyên nghiệp hơn

### **3. Backup dữ liệu:**
- Export data định kỳ
- Lưu vào Google Drive
- Tránh mất dữ liệu

---

**🎉 Chúc anh thành công với hệ thống demo bảo mật!**