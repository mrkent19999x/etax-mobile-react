# 🎨 Figma to React Components Mapping

## 📋 Bảng mapping chi tiết giữa Figma và các file .tsx

### 🏠 **Dashboard (Trang chủ)**
**Figma Page**: `Dashboard - Main Screen`
**React File**: `src/pages/Dashboard.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Header/Logo` | `<header className="topbar">` | Logo eTax + menu hamburger | ✅ Done |
| `User Info Card` | `<section className="user-info">` | Avatar + MST + Tên + Nút thông tin | ✅ Done |
| `Quick Actions` | `<section className="quick-actions">` | Scrollable icons (Tra cứu, Hồ sơ...) | ✅ Done |
| `Services Grid` | `<section className="group-services">` | 3x4 grid services | ✅ Done |
| `Side Menu` | `<div className="slide-menu">` | Slide-out navigation menu | ✅ Done |

**🎯 Cần tối ưu:**
- Thay thế hardcoded data bằng `mockData.user`
- Thêm loading states
- Tối ưu responsive cho iPhone 14/15

---

### 🔐 **Login (Đăng nhập)**
**Figma Page**: `Login - Authentication`
**React File**: `src/pages/Login.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Login Form` | `<form className="login-form">` | Username/Password inputs | ✅ Done |
| `Login Button` | `<button className="login-btn">` | Primary CTA button | ✅ Done |
| `Register Link` | `<a href="/dangky">` | Link to registration | ✅ Done |
| `Forgot Password` | `<a href="/doimatkhau">` | Password recovery | ✅ Done |

**🎯 Cần tối ưu:**
- Thêm validation với error states
- Loading spinner khi đăng nhập
- Remember me checkbox

---

### 📊 **Tax Management (Khai thuế)**
**Figma Page**: `Tax - Management Screen`
**React File**: `src/pages/KhaiThue.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Tax List` | `<div className="tax-list">` | Danh sách tờ khai thuế | ✅ Done |
| `Tax Card` | `<div className="tax-card">` | Card hiển thị thông tin thuế | ✅ Done |
| `Status Badge` | `<span className="status-badge">` | Badge trạng thái (pending/paid) | ✅ Done |
| `Amount Display` | `<span className="amount">` | Hiển thị số tiền thuế | ✅ Done |
| `Action Buttons` | `<div className="actions">` | Nút Khai thuế, Nộp thuế | ✅ Done |

**🎯 Cần tối ưu:**
- Sử dụng `mockData.taxInfo` thay hardcoded
- Thêm filter theo status
- Pagination cho danh sách dài

---

### 📱 **Notifications (Thông báo)**
**Figma Page**: `Notifications - List Screen`
**React File**: `src/pages/ThongBao.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Notification List` | `<div className="notification-list">` | Danh sách thông báo | ✅ Done |
| `Notification Item` | `<div className="notification-item">` | Item thông báo | ✅ Done |
| `Priority Indicator` | `<div className="priority-dot">` | Chấm màu theo độ ưu tiên | ✅ Done |
| `Read Status` | `<div className="read-status">` | Trạng thái đã đọc/chưa đọc | ✅ Done |
| `Date Badge` | `<span className="date-badge">` | Ngày thông báo | ✅ Done |

**🎯 Cần tối ưu:**
- Sử dụng `mockData.notifications`
- Thêm pull-to-refresh
- Mark as read functionality

---

### 👤 **Profile (Thông tin cá nhân)**
**Figma Page**: `Profile - User Info`
**React File**: `src/pages/ThongTin.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Profile Header` | `<div className="profile-header">` | Avatar + tên + MST | ✅ Done |
| `Info Sections` | `<div className="info-sections">` | Các section thông tin | ✅ Done |
| `Edit Button` | `<button className="edit-btn">` | Nút chỉnh sửa | ✅ Done |
| `Save Button` | `<button className="save-btn">` | Nút lưu thay đổi | ✅ Done |

**🎯 Cần tối ưu:**
- Sử dụng `mockData.user`
- Form validation
- Auto-save functionality

---

### 🛠️ **Admin Panel**
**Figma Page**: `Admin - Management Dashboard`
**React File**: `src/pages/AdminPanel.tsx`

| Figma Component | React Element | Description | Status |
|----------------|---------------|-------------|---------|
| `Stats Cards` | `<div className="stats-grid">` | Cards thống kê | ✅ Done |
| `User Management` | `<div className="user-management">` | Quản lý người dùng | ✅ Done |
| `Demo Links` | `<div className="demo-links">` | Quản lý demo links | ✅ Done |
| `Placeholders` | `<div className="placeholders">` | Quản lý placeholders | ✅ Done |
| `Visual Editor` | `<VisualEditor />` | Drag & drop editor | ✅ Done |

**🎯 Cần tối ưu:**
- Sử dụng `mockData.adminStats`
- Real-time updates
- Export/Import functionality

---

## 🎨 **Design System Mapping**

### **Colors (Màu sắc)**
```typescript
// tailwind.config.js
colors: {
  'etax-red': '#b71c1c',      // Primary red
  'etax-blue': '#0a84ff',      // iOS blue
  'etax-gray': '#f5f5f5',      // Background gray
  'etax-success': '#34c759',   // Success green
  'etax-warning': '#ff9500',   // Warning orange
  'etax-error': '#ff3b30',     // Error red
}
```

### **Typography (Font chữ)**
```typescript
fontFamily: {
  'ios': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
  'sans': ['Inter', 'system-ui', 'sans-serif'],
}
```

### **Spacing (Khoảng cách)**
```typescript
spacing: {
  'xs': '4px',    // 0.25rem
  'sm': '8px',    // 0.5rem
  'md': '16px',   // 1rem
  'lg': '24px',   // 1.5rem
  'xl': '32px',   // 2rem
}
```

---

## 📱 **Mobile-First Responsive Mapping**

### **Breakpoints**
```typescript
screens: {
  'xs': '360px',   // iPhone SE
  'sm': '375px',   // iPhone 12/13/14
  'md': '414px',   // iPhone Plus
  'lg': '430px',   // iPhone 15 Pro Max
}
```

### **Component Sizes**
| Component | Mobile (360px) | Tablet (768px) | Desktop (1024px) |
|-----------|----------------|----------------|------------------|
| Header Height | 60px | 70px | 80px |
| Card Padding | 16px | 20px | 24px |
| Button Height | 44px | 48px | 52px |
| Font Size | 14px | 16px | 18px |

---

## 🚀 **Implementation Priority**

### **Phase 1: Core Data Integration** (Tuần 1)
1. ✅ Tạo `mockData.ts` - **DONE**
2. 🔄 Thay thế hardcoded data trong Dashboard
3. 🔄 Thay thế hardcoded data trong Tax pages
4. 🔄 Thay thế hardcoded data trong Notifications

### **Phase 2: UI/UX Optimization** (Tuần 2)
1. 🔄 Tối ưu responsive cho iPhone 14/15
2. 🔄 Thêm loading states và animations
3. 🔄 Cải thiện form validation
4. 🔄 Thêm pull-to-refresh

### **Phase 3: PWA Enhancement** (Tuần 3)
1. 🔄 Tối ưu Service Worker
2. 🔄 Cải thiện offline functionality
3. 🔄 Thêm app shortcuts
4. 🔄 Tối ưu splash screen

### **Phase 4: Performance** (Tuần 4)
1. 🔄 Tối ưu ảnh (93 ảnh → WebP/AVIF)
2. 🔄 Lazy loading components
3. 🔄 Bundle optimization
4. 🔄 Lighthouse score ≥95

---

## 📋 **Next Steps**

1. **Bắt đầu với Dashboard**: Thay thế hardcoded data bằng `mockData`
2. **Test trên iPhone DevTools**: Đảm bảo responsive hoàn hảo
3. **Tối ưu ảnh**: Nén 93 ảnh theo kế hoạch
4. **PWA testing**: Test "Add to Home Screen" trên mobile

**🎯 Mục tiêu**: Đạt Lighthouse score ≥95 và cảm giác như app native trên iPhone!