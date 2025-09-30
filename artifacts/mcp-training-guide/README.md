# 🚀 MCP Server Training Guide cho Cursor IDE

> **Tài liệu học tập toàn diện về Model Context Protocol (MCP) - Cách setup, config và sử dụng MCP Server trong Cursor IDE**

## 📋 Mục lục

- [🎯 Giới thiệu MCP](#-giới-thiệu-mcp)
- [⚙️ Cài đặt & Setup](#️-cài-đặt--setup)
- [🔧 Configuration](#-configuration)
- [🛠️ Các MCP Tools phổ biến](#️-các-mcp-tools-phổ-biến)
- [📚 Ví dụ thực tế](#-ví-dụ-thực-tế)
- [🎓 Best Practices](#-best-practices)
- [🔍 Troubleshooting](#-troubleshooting)
- [📖 Tài liệu tham khảo](#-tài-liệu-tham-khảo)

## 🎯 Giới thiệu MCP

**Model Context Protocol (MCP)** là một giao thức mở cho phép AI models tương tác với các tools và services bên ngoài một cách an toàn và có cấu trúc.

### ✨ Ưu điểm chính:
- 🔒 **Bảo mật cao**: Kiểm soát quyền truy cập chi tiết
- 🔌 **Tích hợp dễ dàng**: Kết nối với GitHub, databases, APIs
- 📈 **Mở rộng linh hoạt**: Có thể thêm tools mới
- 🎯 **Chuẩn hóa**: Giao thức thống nhất cho tất cả tools

### 🏗️ Kiến trúc MCP:
```
┌─────────────────┐    MCP Protocol    ┌─────────────────┐
│   AI Model      │ ◄─────────────────► │   MCP Server    │
│  (Cursor IDE)   │                     │                 │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │   External      │
                                        │   Services      │
                                        │ (GitHub, DB...) │
                                        └─────────────────┘
```

## ⚙️ Cài đặt & Setup

### 1. Cài đặt MCP Server

```bash
# Cài đặt qua npm
npm install -g @modelcontextprotocol/server

# Hoặc cài đặt qua yarn
yarn global add @modelcontextprotocol/server

# Kiểm tra cài đặt
mcp-server --version
```

### 2. Setup trong Cursor IDE

#### Bước 1: Tạo file config
Tạo file `~/.cursor/mcp-config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "/workspace,/home/user/projects"
      }
    }
  }
}
```

#### Bước 2: Restart Cursor IDE
Sau khi config xong, restart Cursor để load MCP servers.

### 3. Kiểm tra kết nối

Trong Cursor IDE, mở Command Palette (`Ctrl+Shift+P`) và gõ:
```
MCP: List Available Tools
```

## 🔧 Configuration

### GitHub MCP Server

```json
{
  "github": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx",
      "GITHUB_API_URL": "https://api.github.com"
    }
  }
}
```

**Quyền cần thiết cho GitHub token:**
- `repo` - Truy cập repositories
- `read:org` - Đọc organization info
- `read:user` - Đọc user info

### Filesystem MCP Server

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-filesystem"],
    "env": {
      "ALLOWED_DIRECTORIES": "/workspace,/home/user/projects,/tmp"
    }
  }
}
```

### Database MCP Server

```json
{
  "database": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-database"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@localhost:5432/dbname",
      "ALLOWED_QUERIES": "SELECT,INSERT,UPDATE"
    }
  }
}
```

## 🛠️ Các MCP Tools phổ biến

### 1. GitHub Tools
- `create_repository` - Tạo repo mới
- `get_repository` - Lấy thông tin repo
- `create_issue` - Tạo issue
- `list_pull_requests` - Danh sách PRs
- `create_pull_request` - Tạo PR

### 2. Filesystem Tools
- `read_file` - Đọc file
- `write_file` - Ghi file
- `list_directory` - Liệt kê thư mục
- `search_files` - Tìm kiếm files

### 3. Database Tools
- `execute_query` - Thực thi SQL query
- `get_schema` - Lấy schema database
- `list_tables` - Danh sách tables

### 4. Web Search Tools
- `search_web` - Tìm kiếm web
- `get_page_content` - Lấy nội dung trang

## 📚 Ví dụ thực tế

### Ví dụ 1: Tạo GitHub Repository

```typescript
// Trong Cursor IDE, sử dụng MCP GitHub
const repo = await mcp.github.create_repository({
  name: "my-new-project",
  description: "A new project created via MCP",
  private: false,
  autoInit: true
});

console.log(`Repository created: ${repo.html_url}`);
```

### Ví dụ 2: Đọc và phân tích code

```typescript
// Đọc file package.json
const packageJson = await mcp.filesystem.read_file({
  path: "/workspace/package.json"
});

// Phân tích dependencies
const dependencies = JSON.parse(packageJson).dependencies;
console.log("Dependencies:", Object.keys(dependencies));
```

### Ví dụ 3: Tìm kiếm thông tin

```typescript
// Tìm kiếm về React best practices
const searchResults = await mcp.web.search_web({
  query: "React best practices 2024",
  maxResults: 5
});

searchResults.forEach(result => {
  console.log(`Title: ${result.title}`);
  console.log(`URL: ${result.url}`);
});
```

## 🎓 Best Practices

### 1. Bảo mật
- ✅ Luôn sử dụng environment variables cho tokens
- ✅ Giới hạn quyền truy cập tối thiểu cần thiết
- ✅ Không commit tokens vào git
- ✅ Sử dụng `.env` files cho local development

### 2. Performance
- ✅ Cache kết quả khi có thể
- ✅ Sử dụng pagination cho large datasets
- ✅ Batch operations khi có thể
- ✅ Monitor API rate limits

### 3. Error Handling
- ✅ Luôn wrap MCP calls trong try-catch
- ✅ Implement retry logic cho network calls
- ✅ Log errors chi tiết để debug
- ✅ Fallback strategies khi MCP unavailable

### 4. Code Organization
- ✅ Tách MCP logic thành separate modules
- ✅ Sử dụng TypeScript cho type safety
- ✅ Implement proper interfaces
- ✅ Unit test MCP integrations

## 🔍 Troubleshooting

### Lỗi thường gặp:

#### 1. MCP Server không kết nối
```bash
# Kiểm tra config
cat ~/.cursor/mcp-config.json

# Kiểm tra logs
tail -f ~/.cursor/logs/mcp.log

# Restart Cursor IDE
```

#### 2. Permission denied
```bash
# Kiểm tra quyền file
ls -la ~/.cursor/mcp-config.json

# Kiểm tra environment variables
echo $GITHUB_PERSONAL_ACCESS_TOKEN
```

#### 3. Rate limit exceeded
```bash
# Kiểm tra GitHub API limits
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/rate_limit
```

### Debug Commands:

```bash
# Test MCP connection
mcp-server test-connection

# List available tools
mcp-server list-tools

# Check server status
mcp-server status
```

## 📖 Tài liệu tham khảo

### Official Documentation:
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP Server GitHub](https://github.com/modelcontextprotocol/servers)
- [Cursor IDE MCP Guide](https://docs.cursor.com/mcp)

### Community Resources:
- [MCP Discord](https://discord.gg/modelcontextprotocol)
- [MCP Examples](https://github.com/modelcontextprotocol/examples)
- [MCP Blog](https://blog.modelcontextprotocol.io/)

### Video Tutorials:
- [MCP Setup Guide](https://youtube.com/watch?v=mcp-setup)
- [Advanced MCP Usage](https://youtube.com/watch?v=mcp-advanced)
- [MCP Best Practices](https://youtube.com/watch?v=mcp-best-practices)

---

## 🎯 Kết luận

MCP Server là một công cụ mạnh mẽ để mở rộng khả năng của Cursor IDE. Với giao thức chuẩn hóa và ecosystem phong phú, bạn có thể tích hợp với hầu hết các services và tools hiện có.

**Bước tiếp theo:**
1. Setup MCP Server theo hướng dẫn
2. Thử nghiệm với các tools cơ bản
3. Tích hợp vào workflow hàng ngày
4. Khám phá các MCP servers khác

**Happy coding với MCP! 🚀**

---

*Tài liệu này được tạo bởi Cipher AI Assistant - Cập nhật lần cuối: 2025-01-12*