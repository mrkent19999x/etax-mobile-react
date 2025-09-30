# 📚 MCP Server Documentation

## 🎯 Quick Start Guide

### 1. Cài đặt nhanh
```bash
# Cài đặt MCP Server
npm install -g @modelcontextprotocol/server

# Tạo config file
mkdir -p ~/.cursor
cat > ~/.cursor/mcp-config.json << EOF
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
EOF
```

### 2. Test kết nối
```bash
# Kiểm tra MCP server
mcp-server --version

# Test connection
mcp-server test-connection
```

### 3. Sử dụng trong Cursor IDE
1. Restart Cursor IDE
2. Mở Command Palette (`Ctrl+Shift+P`)
3. Gõ `MCP: List Available Tools`
4. Bắt đầu sử dụng!

## 🔧 Configuration Templates

### GitHub MCP Server
```json
{
  "github": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx",
      "GITHUB_API_URL": "https://api.github.com",
      "GITHUB_GRAPHQL_URL": "https://api.github.com/graphql"
    }
  }
}
```

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
      "ALLOWED_QUERIES": "SELECT,INSERT,UPDATE,DELETE"
    }
  }
}
```

## 🛠️ Available Tools

### GitHub Tools
| Tool | Description | Parameters |
|------|-------------|------------|
| `create_repository` | Tạo repository mới | name, description, private, autoInit |
| `get_repository` | Lấy thông tin repository | owner, repo |
| `create_issue` | Tạo issue mới | owner, repo, title, body |
| `list_pull_requests` | Danh sách pull requests | owner, repo, state |
| `create_pull_request` | Tạo pull request | owner, repo, title, head, base |

### Filesystem Tools
| Tool | Description | Parameters |
|------|-------------|------------|
| `read_file` | Đọc nội dung file | path |
| `write_file` | Ghi nội dung file | path, content |
| `list_directory` | Liệt kê thư mục | path |
| `search_files` | Tìm kiếm files | pattern, directory |

### Database Tools
| Tool | Description | Parameters |
|------|-------------|------------|
| `execute_query` | Thực thi SQL query | query |
| `get_schema` | Lấy database schema | database |
| `list_tables` | Danh sách tables | database |

## 🎓 Best Practices

### Security
- ✅ Sử dụng environment variables
- ✅ Giới hạn quyền truy cập
- ✅ Không commit tokens
- ✅ Sử dụng `.env` files

### Performance
- ✅ Cache kết quả
- ✅ Sử dụng pagination
- ✅ Batch operations
- ✅ Monitor rate limits

### Error Handling
- ✅ Try-catch blocks
- ✅ Retry logic
- ✅ Detailed logging
- ✅ Fallback strategies

## 🔍 Troubleshooting

### Common Issues

#### MCP Server không kết nối
```bash
# Kiểm tra config
cat ~/.cursor/mcp-config.json

# Kiểm tra logs
tail -f ~/.cursor/logs/mcp.log

# Restart Cursor IDE
```

#### Permission denied
```bash
# Kiểm tra quyền file
ls -la ~/.cursor/mcp-config.json

# Kiểm tra environment variables
echo $GITHUB_PERSONAL_ACCESS_TOKEN
```

#### Rate limit exceeded
```bash
# Kiểm tra GitHub API limits
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/rate_limit
```

### Debug Commands
```bash
# Test MCP connection
mcp-server test-connection

# List available tools
mcp-server list-tools

# Check server status
mcp-server status
```

## 📖 Advanced Topics

### Custom MCP Server
Tạo MCP server tùy chỉnh:

```typescript
import { Server } from '@modelcontextprotocol/server';

const server = new Server({
  name: 'my-custom-server',
  version: '1.0.0'
});

// Định nghĩa tools
server.addTool({
  name: 'custom_tool',
  description: 'My custom tool',
  inputSchema: {
    type: 'object',
    properties: {
      input: { type: 'string' }
    }
  }
});

// Implement handler
server.setToolHandler('custom_tool', async (params) => {
  return { result: `Processed: ${params.input}` };
});

// Start server
server.start();
```

### Integration với CI/CD
```yaml
# .github/workflows/mcp-test.yml
name: MCP Server Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: mcp-server test-connection
```

---

*Tài liệu này được tạo bởi Cipher AI Assistant*