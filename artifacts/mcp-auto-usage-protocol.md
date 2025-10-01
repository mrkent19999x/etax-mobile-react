# Cursor MCP Auto-Usage Protocol

## 🎯 **Mục tiêu:**
Em sẽ tự động ưu tiên dùng MCP tools thay vì built-in tools để có thông tin realtime và chính xác nhất.

## 🔧 **MCP Tools Priority:**

### 1. **Web Search & Information**
- ❌ **Built-in web search** (có thể outdated)
- ✅ **Firecrawl MCP** (realtime, accurate, structured)

**Khi nào dùng:**
- Tìm kiếm thông tin mới nhất
- Scrape websites
- Lấy nội dung từ web pages
- Search với filters và options

### 2. **GitHub Operations**
- ❌ **Manual GitHub operations**
- ✅ **GitHub MCP** (automated, realtime)

**Khi nào dùng:**
- Repository management
- Issues và Pull Requests
- Code search
- File operations
- Commit history

### 3. **Browser Tasks**
- ❌ **Manual browser tasks**
- ✅ **Browser MCP** (automated, interactive)

**Khi nào dùng:**
- Mở websites
- Screenshots
- Form filling
- JavaScript execution
- Page interaction

### 4. **Design Data**
- ❌ **Manual design access**
- ✅ **Figma MCP** (structured, realtime)

**Khi nào dùng:**
- Design data access
- Component information
- Design tokens
- Asset management

## 🚀 **Auto-Usage Rules:**

### **Rule 1: Web Information Priority**
```
IF (cần thông tin từ web) THEN
  USE Firecrawl MCP
ELSE IF (Firecrawl MCP fail) THEN
  USE built-in web search
END IF
```

### **Rule 2: GitHub Operations Priority**
```
IF (cần GitHub operations) THEN
  USE GitHub MCP
ELSE IF (GitHub MCP fail) THEN
  USE manual GitHub operations
END IF
```

### **Rule 3: Browser Tasks Priority**
```
IF (cần browser interaction) THEN
  USE Browser MCP
ELSE IF (Browser MCP fail) THEN
  USE manual browser tasks
END IF
```

### **Rule 4: Design Data Priority**
```
IF (cần design data) THEN
  USE Figma MCP
ELSE IF (Figma MCP fail) THEN
  USE manual design access
END IF
```

## 📋 **Implementation Checklist:**

### ✅ **Đã setup:**
- ✅ Firecrawl MCP v3.3.6 - API key configured
- ✅ GitHub MCP v1.5.0 - Token configured
- ✅ Browser MCP v1.6.0 - Playwright installed
- ✅ Figma MCP - Data available

### 🔧 **Cần enable:**
- ✅ Auto-run trong Agent settings
- ✅ Tool approval disabled
- ✅ MCP servers enabled globally
- ✅ Error handling configured

## 🎯 **Usage Examples:**

### **Web Search:**
```
❌ Built-in: "Search for latest React features"
✅ MCP: firecrawl_search("latest React features 2025")
```

### **GitHub Operations:**
```
❌ Manual: "Check repository status"
✅ MCP: github_get_repository("repo-name")
```

### **Browser Tasks:**
```
❌ Manual: "Open cursor.com"
✅ MCP: browser_navigate("https://cursor.com")
```

### **Design Data:**
```
❌ Manual: "Get design tokens"
✅ MCP: figma_get_tokens("design-file")
```

## 📊 **Benefits:**

### **Realtime Information:**
- ✅ Current data từ web
- ✅ Live repository status
- ✅ Real-time browser interaction
- ✅ Up-to-date design data

### **Automation:**
- ✅ Không cần manual steps
- ✅ Faster execution
- ✅ More accurate results
- ✅ Better user experience

### **Accuracy:**
- ✅ Structured data từ MCP
- ✅ Real-time updates
- ✅ Better error handling
- ✅ Consistent results

## 🔄 **Fallback Strategy:**

### **Level 1: MCP Tools**
- Firecrawl MCP
- GitHub MCP
- Browser MCP
- Figma MCP

### **Level 2: Built-in Tools**
- Web search
- Manual operations
- Basic tools

### **Level 3: Error Handling**
- Retry với different parameters
- Alternative approaches
- User notification

## 🎉 **Kết luận:**

**Em sẽ tự động ưu tiên MCP tools để:**
1. **Có thông tin realtime** thay vì outdated
2. **Tự động hóa** các tác vụ thay vì manual
3. **Tăng độ chính xác** với structured data
4. **Cải thiện trải nghiệm** người dùng

**MCP tools sẽ là first choice, built-in tools là fallback!** 🚀