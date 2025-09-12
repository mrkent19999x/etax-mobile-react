# eTax Mobile PWA - API Documentation

## 📱 **Admin Panel API**

### **Dashboard**
- **URL**: `/admin`
- **Method**: GET
- **Description**: Trang quản trị chính với 6 tabs

### **Tabs Available**
1. **Dashboard** - Thống kê tổng quan
2. **Thông tin cá nhân** - Quản lý user info
3. **Thông tin thuế** - Quản lý tax data
4. **Placeholders** - Quản lý nội dung động
5. **Quản lý link** - Tạo và quản lý demo links
6. **Visual Editor** - Drag & drop editor

## 🔧 **AdminServices API**

### **Placeholder Management**
```typescript
// Thêm placeholder mới
adminServices.addPlaceholder({
  key: 'user_name',
  value: 'Nguyễn Trung Nghĩa',
  type: 'text',
  page: 'dashboard'
});

// Cập nhật placeholder
adminServices.updatePlaceholder(id, {
  value: 'Giá trị mới'
});

// Xóa placeholder
adminServices.deletePlaceholder(id);

// Lấy tất cả placeholders
const placeholders = adminServices.getPlaceholders();
```

### **Stats Management**
```typescript
// Cập nhật thống kê
adminServices.updateStats({
  totalUsers: 200,
  activeLinks: 15,
  totalViews: 3500
});

// Lấy thống kê hiện tại
const stats = adminServices.getStats();
```

### **Export/Import**
```typescript
// Xuất dữ liệu
const jsonData = adminServices.exportData();

// Nhập dữ liệu
const success = adminServices.importData(jsonString);
```

## 🎨 **Visual Editor API**

### **Component Library**
```typescript
// eTax Header Component
{
  id: 'etax-header',
  name: 'eTax Header',
  category: 'eTax Components',
  html: `<div style="background:linear-gradient(135deg,#d62828 0%,#b71c1c 100%);...">`
}

// User Info Card
{
  id: 'etax-card',
  name: 'User Info Card',
  category: 'eTax Components',
  html: `<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);...">`
}
```

### **Editor Functions**
```typescript
// Thêm component
addComponent(component: Component)

// Lưu HTML/CSS
onSave(html: string, css: string)

// Toggle preview
togglePreview()
```

## 🔗 **Demo Links API**

### **Token Management**
```typescript
// Tạo token mới
const token = tokenManager.generateToken(clientName, mst);

// Validate token
const tokenData = tokenManager.validateToken(token);

// Lấy tất cả active tokens
const activeTokens = tokenManager.getAllActiveTokens();

// Redirect to dashboard
tokenManager.redirectToDashboard(token);
```

### **Link Generation**
```typescript
// Tạo demo link
const demoLink = `${window.location.origin}/?token=${token}`;

// Link format
// http://localhost:5173/?token=demo_1234567890
```

## 📊 **Placeholder System**

### **Placeholder Format**
```html
<!-- Trong HTML -->
<div>{{user_name}}</div>
<div>{{user_mst}}</div>
<div>{{tax_amount}}</div>
<div>{{deadline}}</div>
```

### **Placeholder Types**
- **text**: Văn bản thường
- **currency**: Tiền tệ (VNĐ)
- **date**: Ngày tháng
- **number**: Số liệu

### **Page Mapping**
- **dashboard**: Trang chính
- **khaithue**: Khai thuế
- **nopthue**: Nộp thuế
- **tracuttnpt**: Tra cứu TNPT

## 🎯 **Demo Context API**

### **State Management**
```typescript
const {
  isDemoMode,        // Chế độ demo
  isLoading,         // Loading state
  error,             // Error message
  clientData,        // Dữ liệu client
  isTokenValid,      // Token hợp lệ
  isTokenExpired,    // Token hết hạn
  expiryDate,        // Ngày hết hạn
  clientName,        // Tên client
  validateLogin,     // Validate login
  redirectToDashboard, // Redirect
  clearError         // Clear error
} = useDemo();
```

## 🚀 **Deployment API**

### **GitHub Pages**
- **Base URL**: `/etax-mobile-react/`
- **Redirects**: `public/_redirects`
- **Build**: `npm run build`

### **Environment Variables**
```bash
# Development
VITE_APP_TITLE=eTax Mobile PWA
VITE_APP_VERSION=1.0.0

# Production
VITE_APP_BASE_URL=https://username.github.io/etax-mobile-react/
```

## 📱 **PWA API**

### **Manifest**
```json
{
  "name": "eTax Mobile PWA",
  "short_name": "eTax",
  "description": "Ứng dụng thuế điện tử di động",
  "theme_color": "#0a84ff",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/"
}
```

### **Service Worker**
- **Auto-update**: Enabled
- **Offline fallback**: `/index.html`
- **Cache strategy**: Workbox

## 🔒 **Security API**

### **Token Security**
- **Expiry**: 3 days
- **Storage**: localStorage
- **Format**: UUID v4
- **Validation**: Server-side check

### **Data Protection**
- **localStorage**: Client-side only
- **No server**: Static PWA
- **HTTPS**: Required for PWA

---

**📱 eTax Mobile PWA - API Documentation**  
**Cập nhật lần cuối**: 2025-01-12  
**Version**: 1.0.0
