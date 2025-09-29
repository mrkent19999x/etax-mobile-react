# 📱 Hướng dẫn sử dụng Cursor trên iOS

## 🎯 **Tổng quan**
- **Project**: eTax Mobile React PWA (đã build thành công)
- **Environment**: Linux WSL + Node.js v22.16.0 + npm v10.9.2
- **Status**: Background agent đang chạy, sẵn sàng hỗ trợ

## 🔧 **Cấu hình Background Agent**

### **Agent đang chạy có nghĩa là:**
✅ Cursor đã kết nối với AI assistant  
✅ Sẵn sàng nhận lệnh và hỗ trợ coding  
✅ Có thể review code, fix bug, optimize performance  

### **Cách tương tác với Agent:**
1. **Chat Interface**: Gõ câu hỏi trực tiếp
2. **Code Review**: "Review file này có vấn đề gì không?"
3. **Bug Fix**: "Fix lỗi này giúp em"
4. **Optimization**: "Tối ưu performance cho mobile"

## 📱 **iOS Cursor Interface**

### **Các tab chính:**
- **💬 Chat**: Giao tiếp với AI assistant
- **📁 Files**: Browse project structure
- **⚙️ Settings**: Cấu hình preferences
- **🔍 Search**: Tìm kiếm trong code

### **Mobile Workflow tối ưu:**
1. **Development**: Code chính trên desktop/laptop
2. **Quick Review**: Dùng iOS để review nhanh
3. **AI Assistance**: Hỏi AI về code quality
4. **Testing**: Test trên device thật

## 🚀 **Commands hữu ích trên iOS**

### **Kiểm tra project:**
```bash
# Xem cấu trúc project
ls -la

# Kiểm tra build status
npm run build

# Chạy dev server
npm run dev
```

### **AI Commands:**
- `"Review src/pages/HomePage.tsx"`
- `"Fix TypeScript errors"`
- `"Optimize mobile performance"`
- `"Check PWA compliance"`

## 🛠️ **Troubleshooting**

### **Nếu Agent không phản hồi:**
1. Restart Cursor app
2. Check internet connection
3. Verify project structure
4. Clear cache nếu cần

### **Nếu build lỗi:**
1. Check Node.js version
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript config
4. Verify dependencies

## 📊 **Project Status**

### **Đã hoàn thành:**
✅ React + TypeScript setup  
✅ Tailwind CSS + Konsta UI  
✅ PWA configuration  
✅ 25 pages cloned  
✅ Admin system  
✅ Visual editor  

### **Có thể cải thiện:**
🔄 Mobile performance optimization  
🔄 Offline functionality  
🔄 Push notifications  
🔄 Advanced PWA features  

## 🎯 **Bước tiếp theo**

### **Immediate Actions:**
1. **Test PWA**: Install trên mobile device
2. **Performance**: Check Lighthouse score
3. **Offline**: Test offline functionality
4. **UX**: Review mobile user experience

### **AI Assistance:**
- Hỏi về specific features
- Request code review
- Optimize performance
- Fix bugs

## 📞 **Support**

Nếu gặp vấn đề:
1. Check logs trong `./logs/`
2. Review `process.md` cho history
3. Use AI chat để troubleshoot
4. Check project documentation

---
**Cập nhật**: 2025-01-12  
**Status**: Production Ready  
**Next**: Mobile testing & optimization