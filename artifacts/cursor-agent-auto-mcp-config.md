# Cursor Agent Tools - Auto-run Configuration

## 📚 Nguồn: cursor.com/docs/agent/tools#auto-run (Realtime - 2025-09-30)

### 🎯 **Tools Available:**

#### **Search Tools:**
- **Read File** - Đọc files
- **List Directory** - Liệt kê thư mục  
- **Codebase** - Search trong codebase
- **Grep** - Tìm kiếm text patterns
- **Search Files** - Tìm files
- **Web** - Web search
- **Fetch Rules** - Lấy rules

#### **Edit Tools:**
- **Edit & Reapply** - Chỉnh sửa và apply lại
- **Delete File** - Xóa files

#### **Run Tools:**
- **Terminal** - Chạy terminal commands

#### **MCP Tools:**
- **Toggle MCP Servers** - Bật/tắt MCP servers
- **External Services** - Databases, 3rd party APIs

### ⚙️ **Advanced Options:**

#### **Auto-apply Edits**
- Tự động apply edits
- Không cần confirm

#### **Auto-run**
- Tự động chạy tools
- Không cần approval
- Giống terminal commands

#### **Guardrails**
- Security controls
- Permission management

#### **Auto-fix Errors**
- Tự động fix lỗi
- Error handling

---

## 🚀 **Cấu hình để em tự động dùng MCP:**

### ✅ **Auto-run Settings:**
```json
{
  "agent": {
    "autoRun": true,
    "autoApplyEdits": true,
    "autoFixErrors": true,
    "guardrails": {
      "enabled": true,
      "permissions": ["read", "write", "execute"]
    }
  }
}
```

### 🔧 **MCP Auto-usage Rules:**

#### **Khi nào em sẽ tự động dùng MCP:**
1. **Web Search** → Dùng Firecrawl MCP thay vì built-in search
2. **Repository Operations** → Dùng GitHub MCP
3. **Browser Tasks** → Dùng Browser MCP
4. **Design Data** → Dùng Figma MCP

#### **Priority Order:**
1. **MCP Tools** (realtime, accurate)
2. **Built-in Tools** (fallback)

### 📋 **Auto-MCP Checklist:**

#### **✅ Đã setup:**
- ✅ Firecrawl MCP - Web scraping realtime
- ✅ GitHub MCP - Repository management
- ✅ Browser MCP - Web interaction
- ✅ Figma MCP - Design data

#### **🔧 Cần enable:**
- ✅ Auto-run trong Agent settings
- ✅ Tool approval disabled
- ✅ MCP servers enabled
- ✅ API keys configured

### 🎯 **Em sẽ tự động dùng MCP khi:**

#### **Web Information:**
- ❌ Built-in web search (có thể outdated)
- ✅ Firecrawl MCP (realtime, accurate)

#### **GitHub Operations:**
- ❌ Manual GitHub operations
- ✅ GitHub MCP (automated, realtime)

#### **Browser Tasks:**
- ❌ Manual browser tasks
- ✅ Browser MCP (automated, interactive)

#### **Design Data:**
- ❌ Manual design access
- ✅ Figma MCP (structured, realtime)

### 🚀 **Implementation:**

#### **1. Enable Auto-run:**
- Agent settings → Auto-run: ON
- Tool approval: OFF
- MCP servers: ENABLED

#### **2. Priority MCP Usage:**
- Web search → Firecrawl MCP
- GitHub → GitHub MCP  
- Browser → Browser MCP
- Design → Figma MCP

#### **3. Fallback:**
- Nếu MCP fail → Built-in tools
- Error handling → Auto-fix

### 📊 **Benefits:**

#### **Realtime Information:**
- ✅ Current data từ web
- ✅ Live repository status
- ✅ Real-time browser interaction
- ✅ Up-to-date design data

#### **Automation:**
- ✅ Không cần manual steps
- ✅ Faster execution
- ✅ More accurate results
- ✅ Better user experience

**Em sẽ tự động ưu tiên MCP tools để có thông tin realtime và chính xác nhất!** 🚀