# 🌐 Hướng dẫn sử dụng Cursor Agent Web - Cipher

## 🎯 **CÁCH DÙNG CURSOR AGENT WEB**

### **Bước 1: Truy cập**
1. Mở browser trên iOS/Android
2. Vào `cursor.com/agent`
3. Đăng nhập với GitHub account

### **Bước 2: Chọn Repository**
1. Click **"Select Repository"**
2. Tìm `mrkent19999x/etax-mobile-react`
3. Click **"Connect"**

### **Bước 3: Bắt đầu làm việc**
1. **Chat với Agent**: Gõ câu hỏi/yêu cầu
2. **Xem code**: Agent sẽ đọc và phân tích
3. **Review changes**: Xem và approve changes
4. **Create PR**: Agent tạo Pull Request

## 🎨 **VỀ THEME SÁNG/TỐI**

### **❌ Vấn đề anh gặp:**
- **Theme tối** quá khó nhìn
- **Không thấy** tùy chỉnh gì
- **Interface** không rõ ràng

### **🔍 Nguyên nhân:**
1. **Web Agent** có **limited customization**
2. **Theme settings** có thể **không có** trên web
3. **Interface** được **hardcode** cho mobile

### **💡 Giải pháp:**

#### **1. Browser Settings:**
```css
/* Thử force light mode trong browser */
- Chrome: Settings → Appearance → Light
- Safari: Settings → Appearance → Light
- Firefox: Settings → Theme → Light
```

#### **2. CSS Override (nếu có thể):**
```css
/* Inject CSS để force light theme */
body {
    background-color: #ffffff !important;
    color: #000000 !important;
}

.dark-theme {
    background-color: #ffffff !important;
    color: #000000 !important;
}
```

#### **3. Browser Extensions:**
- **Dark Reader** - Toggle light/dark
- **Stylus** - Custom CSS
- **Tampermonkey** - Script injection

## 🔧 **CUSTOMIZATION OPTIONS**

### **✅ Có thể tùy chỉnh:**
1. **Repository selection**
2. **Agent behavior**
3. **Chat interface**
4. **Notification settings**

### **❌ Không thể tùy chỉnh:**
1. **Theme colors** (có thể)
2. **Font size** (có thể)
3. **Layout** (có thể)
4. **Advanced settings**

## 📱 **INTERFACE WEB**

### **Các tab chính:**
- **💬 Chat** - Giao tiếp với Agent
- **📁 Repository** - Browse code
- **⚙️ Settings** - Basic settings
- **📊 Activity** - Agent history

### **Chat Commands:**
```
"Phân tích project này"
"Tạo component mới"
"Fix bug này"
"Optimize performance"
"Review code quality"
```

## 🚨 **LIMITATIONS WEB**

### **Không có:**
- ❌ **Code editor** trực tiếp
- ❌ **Terminal** access
- ❌ **Debugger**
- ❌ **Extensions**
- ❌ **Advanced customization**

### **Chỉ có:**
- ✅ **Agent management**
- ✅ **Code review**
- ✅ **PR creation**
- ✅ **Basic chat**

## 💡 **KHUYẾN NGHỊ**

### **1. Theme Issue:**
- **Thử browser settings** trước
- **Dùng browser extensions** nếu cần
- **Contact Cursor support** nếu không có option

### **2. Usage Workflow:**
- **Web**: Agent management, reviews
- **Desktop**: Code editing, debugging
- **Mobile**: Quick checks, approvals

### **3. Alternative:**
- **Desktop IDE** có full customization
- **Web** chỉ cho management
- **Mobile** cho quick access

## 📋 **TÓM TẮT**

### **Về Theme:**
- **Web Agent** có **limited customization**
- **Theme settings** có thể **không có**
- **Thử browser settings** hoặc **extensions**

### **Về Usage:**
- **Web** chỉ cho **Agent management**
- **Không thể edit code** trực tiếp
- **Chỉ có thể review** và **approve**

### **Về Customization:**
- **Basic settings** only
- **No advanced theming**
- **Browser-dependent**

---
**Cập nhật**: 2025-01-12  
**Status**: Web limitations identified  
**Next**: Try browser settings hoặc desktop IDE