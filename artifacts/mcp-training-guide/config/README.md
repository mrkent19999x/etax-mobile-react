# 🔧 MCP Server Configuration

## 📁 Cấu trúc config files
```
config/
├── mcp-config.json          # Config chính
├── github-config.json       # GitHub MCP config
├── filesystem-config.json   # Filesystem MCP config
├── database-config.json     # Database MCP config
└── custom-config.json       # Custom MCP config
```

## ⚙️ Main Configuration

### mcp-config.json
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_API_URL": "https://api.github.com",
        "GITHUB_GRAPHQL_URL": "https://api.github.com/graphql"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "/workspace,/home/user/projects,/tmp"
      }
    },
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "ALLOWED_QUERIES": "SELECT,INSERT,UPDATE,DELETE"
      }
    },
    "web-search": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-web-search"],
      "env": {
        "SEARCH_API_KEY": "${SEARCH_API_KEY}",
        "SEARCH_ENGINE": "google"
      }
    }
  },
  "settings": {
    "timeout": 30000,
    "retryAttempts": 3,
    "logLevel": "info",
    "enableCaching": true,
    "cacheTTL": 300000
  }
}
```

## 🔑 GitHub Configuration

### github-config.json
```json
{
  "github": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx",
      "GITHUB_API_URL": "https://api.github.com",
      "GITHUB_GRAPHQL_URL": "https://api.github.com/graphql",
      "GITHUB_ENTERPRISE_URL": "",
      "GITHUB_ENTERPRISE_GRAPHQL_URL": ""
    },
    "options": {
      "rateLimit": {
        "requestsPerHour": 5000,
        "burstLimit": 100
      },
      "timeout": 30000,
      "retryAttempts": 3
    }
  }
}
```

### GitHub Token Permissions
```json
{
  "scopes": [
    "repo",
    "read:org",
    "read:user",
    "read:project",
    "read:discussion",
    "workflow"
  ],
  "note": "MCP Server Token",
  "expiration": "never"
}
```

## 📁 Filesystem Configuration

### filesystem-config.json
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-filesystem"],
    "env": {
      "ALLOWED_DIRECTORIES": "/workspace,/home/user/projects,/tmp,/var/log",
      "BLOCKED_DIRECTORIES": "/etc,/sys,/proc,/dev",
      "MAX_FILE_SIZE": "10485760",
      "ALLOWED_EXTENSIONS": ".txt,.md,.json,.js,.ts,.tsx,.jsx,.css,.scss,.html,.xml,.yaml,.yml"
    },
    "options": {
      "readOnly": false,
      "enableSymlinks": false,
      "followSymlinks": false,
      "maxDepth": 10
    }
  }
}
```

## 🗄️ Database Configuration

### database-config.json
```json
{
  "database": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-database"],
    "env": {
      "DATABASE_URL": "postgresql://user:password@localhost:5432/database",
      "ALLOWED_QUERIES": "SELECT,INSERT,UPDATE,DELETE",
      "BLOCKED_QUERIES": "DROP,TRUNCATE,ALTER,CREATE",
      "MAX_QUERY_TIME": "30000",
      "MAX_ROWS": "1000"
    },
    "options": {
      "connectionPool": {
        "min": 2,
        "max": 10,
        "idleTimeoutMillis": 30000
      },
      "queryTimeout": 30000,
      "enableLogging": true,
      "logLevel": "info"
    }
  }
}
```

### Database Connection Examples

#### PostgreSQL
```json
{
  "DATABASE_URL": "postgresql://username:password@localhost:5432/database_name"
}
```

#### MySQL
```json
{
  "DATABASE_URL": "mysql://username:password@localhost:3306/database_name"
}
```

#### SQLite
```json
{
  "DATABASE_URL": "sqlite:///path/to/database.db"
}
```

#### MongoDB
```json
{
  "DATABASE_URL": "mongodb://username:password@localhost:27017/database_name"
}
```

## 🌐 Web Search Configuration

### web-search-config.json
```json
{
  "web-search": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-web-search"],
    "env": {
      "SEARCH_API_KEY": "your_search_api_key",
      "SEARCH_ENGINE": "google",
      "SEARCH_API_URL": "https://www.googleapis.com/customsearch/v1",
      "CUSTOM_SEARCH_ENGINE_ID": "your_custom_search_engine_id"
    },
    "options": {
      "maxResults": 10,
      "safeSearch": "moderate",
      "language": "vi",
      "country": "VN",
      "timeout": 30000
    }
  }
}
```

## 🔧 Custom MCP Server Configuration

### custom-config.json
```json
{
  "custom-server": {
    "command": "node",
    "args": ["./custom-mcp-server.js"],
    "env": {
      "CUSTOM_API_KEY": "your_custom_api_key",
      "CUSTOM_API_URL": "https://api.custom-service.com",
      "LOG_LEVEL": "info"
    },
    "options": {
      "timeout": 30000,
      "retryAttempts": 3,
      "enableCaching": true,
      "cacheTTL": 300000
    }
  }
}
```

## 🔒 Security Configuration

### security-config.json
```json
{
  "security": {
    "authentication": {
      "enabled": true,
      "method": "token",
      "tokenHeader": "Authorization",
      "tokenPrefix": "Bearer"
    },
    "authorization": {
      "enabled": true,
      "roles": ["admin", "user", "readonly"],
      "permissions": {
        "admin": ["*"],
        "user": ["read", "write"],
        "readonly": ["read"]
      }
    },
    "rateLimiting": {
      "enabled": true,
      "requestsPerMinute": 60,
      "burstLimit": 10
    },
    "cors": {
      "enabled": true,
      "allowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
      "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
      "allowedHeaders": ["Content-Type", "Authorization"]
    }
  }
}
```

## 📊 Monitoring Configuration

### monitoring-config.json
```json
{
  "monitoring": {
    "logging": {
      "enabled": true,
      "level": "info",
      "format": "json",
      "output": "file",
      "filePath": "./logs/mcp-server.log",
      "maxSize": "10MB",
      "maxFiles": 5
    },
    "metrics": {
      "enabled": true,
      "port": 9090,
      "path": "/metrics",
      "collectors": ["requests", "errors", "latency", "memory"]
    },
    "healthCheck": {
      "enabled": true,
      "port": 8080,
      "path": "/health",
      "interval": 30000
    },
    "alerting": {
      "enabled": true,
      "webhook": "https://hooks.slack.com/services/your/webhook/url",
      "thresholds": {
        "errorRate": 0.05,
        "latency": 5000,
        "memoryUsage": 0.8
      }
    }
  }
}
```

## 🚀 Environment Variables

### .env.example
```bash
# GitHub Configuration
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_API_URL=https://api.github.com
GITHUB_GRAPHQL_URL=https://api.github.com/graphql

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/database
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Web Search Configuration
SEARCH_API_KEY=your_search_api_key
CUSTOM_SEARCH_ENGINE_ID=your_custom_search_engine_id

# Custom MCP Server
CUSTOM_API_KEY=your_custom_api_key
CUSTOM_API_URL=https://api.custom-service.com

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# Monitoring
LOG_LEVEL=info
METRICS_PORT=9090
HEALTH_CHECK_PORT=8080

# Performance
CACHE_TTL=300000
REQUEST_TIMEOUT=30000
MAX_RETRY_ATTEMPTS=3
```

## 🔧 Setup Scripts

### setup-mcp.sh
```bash
#!/bin/bash

# MCP Server Setup Script
echo "🚀 Setting up MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install MCP Server globally
echo "📦 Installing MCP Server..."
npm install -g @modelcontextprotocol/server

# Install additional MCP servers
echo "📦 Installing additional MCP servers..."
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-database
npm install -g @modelcontextprotocol/server-web-search

# Create config directory
echo "📁 Creating config directory..."
mkdir -p ~/.cursor

# Copy config files
echo "📋 Copying config files..."
cp config/mcp-config.json ~/.cursor/
cp config/github-config.json ~/.cursor/
cp config/filesystem-config.json ~/.cursor/
cp config/database-config.json ~/.cursor/

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p ~/.cursor/logs

# Set permissions
echo "🔒 Setting permissions..."
chmod 600 ~/.cursor/mcp-config.json
chmod 600 ~/.cursor/github-config.json
chmod 600 ~/.cursor/filesystem-config.json
chmod 600 ~/.cursor/database-config.json

echo "✅ MCP Server setup completed!"
echo "📝 Please update your environment variables in ~/.cursor/mcp-config.json"
echo "🔄 Restart Cursor IDE to load the new configuration"
```

### test-mcp.sh
```bash
#!/bin/bash

# MCP Server Test Script
echo "🧪 Testing MCP Server configuration..."

# Test MCP Server installation
echo "1. Testing MCP Server installation..."
if mcp-server --version &> /dev/null; then
    echo "✅ MCP Server is installed"
else
    echo "❌ MCP Server is not installed"
    exit 1
fi

# Test configuration file
echo "2. Testing configuration file..."
if [ -f ~/.cursor/mcp-config.json ]; then
    echo "✅ Configuration file exists"
    if jq empty ~/.cursor/mcp-config.json &> /dev/null; then
        echo "✅ Configuration file is valid JSON"
    else
        echo "❌ Configuration file is not valid JSON"
        exit 1
    fi
else
    echo "❌ Configuration file does not exist"
    exit 1
fi

# Test GitHub MCP Server
echo "3. Testing GitHub MCP Server..."
if [ -n "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
    echo "✅ GitHub token is set"
else
    echo "⚠️  GitHub token is not set"
fi

# Test database connection
echo "4. Testing database connection..."
if [ -n "$DATABASE_URL" ]; then
    echo "✅ Database URL is set"
else
    echo "⚠️  Database URL is not set"
fi

# Test MCP Server connection
echo "5. Testing MCP Server connection..."
if mcp-server test-connection &> /dev/null; then
    echo "✅ MCP Server connection successful"
else
    echo "❌ MCP Server connection failed"
    exit 1
fi

echo "🎉 All tests passed! MCP Server is ready to use."
```

## 📋 Configuration Checklist

### Pre-installation
- [ ] Node.js 18+ installed
- [ ] npm/yarn installed
- [ ] Git installed
- [ ] Cursor IDE installed

### Installation
- [ ] MCP Server installed globally
- [ ] Additional MCP servers installed
- [ ] Configuration files created
- [ ] Environment variables set
- [ ] Permissions configured

### Testing
- [ ] MCP Server version check
- [ ] Configuration file validation
- [ ] GitHub token test
- [ ] Database connection test
- [ ] MCP Server connection test

### Post-installation
- [ ] Cursor IDE restarted
- [ ] MCP tools available in Command Palette
- [ ] First MCP command executed successfully
- [ ] Logs directory created
- [ ] Monitoring configured

---

*Configuration files được tạo bởi Cipher AI Assistant - Cập nhật lần cuối: 2025-01-12*