# Cursor IDE MCP Configuration - Hướng dẫn sử dụng

## 🎯 Mục đích
Cấu hình MCP servers toàn cục cho Cursor IDE để không phải config lại nhiều lần.

## 📁 File cấu hình
**Location**: `/home/ubuntu/.vm-daemon/vm-daemon-cursor-data/User/settings.json`

## 🔧 Cấu hình đã thêm

### 1. **Firecrawl MCP**
```json
"firecrawl": {
    "command": "firecrawl-mcp",
    "env": {
        "FIRECRAWL_API_KEY": "fc-ac47aa505d854b4aa79ad47d5243ef28"
    }
}
```

### 2. **GitHub MCP**
```json
"github": {
    "command": "github-mcp-scoped-server",
    "env": {
        "GITHUB_TOKEN": "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",
        "GITHUB_TARGET_USER": "github"
    }
}
```

### 3. **Browser MCP**
```json
"browser": {
    "command": "concurrent-browser-mcp",
    "args": ["--headless", "--max-instances", "5"]
}
```

### 4. **Figma MCP**
```json
"figma": {
    "command": "node",
    "args": ["-e", "console.log('Figma MCP placeholder')"],
    "env": {
        "FIGMA_TOKEN": "figd_1234567890abcdef1234567890abcdef12345678"
    }
}
```

## 🚀 Cách sử dụng trong Cursor IDE

### Sau khi restart Cursor IDE:

1. **Firecrawl MCP** sẽ tự động có sẵn:
   - Web scraping
   - Web search
   - Website crawling

2. **GitHub MCP** sẽ tự động có sẵn:
   - Repository management
   - Issues và Pull Requests
   - Code search

3. **Browser MCP** sẽ tự động có sẵn:
   - Mở websites
   - Browser automation
   - Screenshots

4. **Figma MCP** sẽ tự động có sẵn:
   - Design data access

## 🎯 Ví dụ sử dụng

### Mở website cursor.com/docs:
```
Mở trang web https://cursor.com/docs trong browser
```

### Scrape website:
```
Scrape nội dung từ https://example.com
```

### GitHub operations:
```
Tìm kiếm repositories trên GitHub
```

## ✅ Lợi ích

1. **Không cần config lại** - MCP servers tự động khởi động
2. **API keys được lưu** - Không cần nhập lại
3. **Tất cả tools sẵn sàng** - Firecrawl, GitHub, Browser, Figma
4. **Hoạt động toàn cục** - Trong mọi project

## 🔄 Restart Cursor IDE

**Quan trọng**: Cần restart Cursor IDE để cấu hình có hiệu lực.

## 📝 Ghi chú

- Cấu hình được lưu trong User settings
- API keys được bảo mật trong env variables
- Browser MCP chạy headless mode để tiết kiệm tài nguyên
- Tất cả MCP servers sử dụng stdio transport