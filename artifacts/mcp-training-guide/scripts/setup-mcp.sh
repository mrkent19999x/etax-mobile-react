#!/bin/bash

# MCP Server Training Guide - Setup Script
# Tạo bởi Cipher AI Assistant

set -e  # Exit on any error

echo "🚀 MCP Server Training Guide - Setup Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
    esac
}

# Check prerequisites
check_prerequisites() {
    print_status "info" "Checking prerequisites..."
    
    # Check Node.js
    if command -v node &> /dev/null; then
        local node_version=$(node -v)
        print_status "success" "Node.js is installed: $node_version"
    else
        print_status "error" "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        local npm_version=$(npm -v)
        print_status "success" "npm is installed: $npm_version"
    else
        print_status "error" "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Git
    if command -v git &> /dev/null; then
        local git_version=$(git --version)
        print_status "success" "Git is installed: $git_version"
    else
        print_status "error" "Git is not installed. Please install Git first."
        exit 1
    fi
}

# Install MCP Server
install_mcp_server() {
    print_status "info" "Installing MCP Server..."
    
    # Install main MCP Server
    if npm install -g @modelcontextprotocol/server; then
        print_status "success" "MCP Server installed successfully"
    else
        print_status "error" "Failed to install MCP Server"
        exit 1
    fi
    
    # Install additional MCP servers
    print_status "info" "Installing additional MCP servers..."
    
    local servers=(
        "@modelcontextprotocol/server-github"
        "@modelcontextprotocol/server-filesystem"
        "@modelcontextprotocol/server-database"
        "@modelcontextprotocol/server-web-search"
    )
    
    for server in "${servers[@]}"; do
        print_status "info" "Installing $server..."
        if npm install -g "$server"; then
            print_status "success" "$server installed successfully"
        else
            print_status "warning" "Failed to install $server (continuing...)"
        fi
    done
}

# Create configuration files
create_config_files() {
    print_status "info" "Creating configuration files..."
    
    # Create Cursor config directory
    mkdir -p ~/.cursor
    
    # Create main MCP config
    cat > ~/.cursor/mcp-config.json << 'EOF'
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "/workspace,/home/user/projects,/tmp"
      }
    }
  },
  "settings": {
    "timeout": 30000,
    "retryAttempts": 3,
    "logLevel": "info",
    "enableCaching": true
  }
}
EOF
    
    print_status "success" "Main MCP config created"
    
    # Create environment file template
    cat > .env.example << 'EOF'
# GitHub Configuration
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxx

# Database Configuration (optional)
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Web Search Configuration (optional)
SEARCH_API_KEY=your_search_api_key
CUSTOM_SEARCH_ENGINE_ID=your_custom_search_engine_id

# Custom MCP Server (optional)
CUSTOM_API_KEY=your_custom_api_key
CUSTOM_API_URL=https://api.custom-service.com
EOF
    
    print_status "success" "Environment template created"
    
    # Create logs directory
    mkdir -p ~/.cursor/logs
    print_status "success" "Logs directory created"
}

# Set permissions
set_permissions() {
    print_status "info" "Setting permissions..."
    
    # Set secure permissions for config files
    chmod 600 ~/.cursor/mcp-config.json
    chmod 600 .env.example
    
    print_status "success" "Permissions set successfully"
}

# Test installation
test_installation() {
    print_status "info" "Testing installation..."
    
    # Test MCP Server version
    if mcp-server --version &> /dev/null; then
        local version=$(mcp-server --version)
        print_status "success" "MCP Server is working: $version"
    else
        print_status "error" "MCP Server is not working properly"
        exit 1
    fi
    
    # Test configuration file
    if [ -f ~/.cursor/mcp-config.json ]; then
        if command -v jq &> /dev/null; then
            if jq empty ~/.cursor/mcp-config.json &> /dev/null; then
                print_status "success" "Configuration file is valid JSON"
            else
                print_status "error" "Configuration file is not valid JSON"
                exit 1
            fi
        else
            print_status "warning" "jq not installed, skipping JSON validation"
        fi
    else
        print_status "error" "Configuration file not found"
        exit 1
    fi
}

# Create test script
create_test_script() {
    print_status "info" "Creating test script..."
    
    cat > test-mcp.sh << 'EOF'
#!/bin/bash

echo "🧪 MCP Server Test Script"
echo "========================="

# Test MCP Server
echo "1. Testing MCP Server..."
if mcp-server --version &> /dev/null; then
    echo "✅ MCP Server is working"
else
    echo "❌ MCP Server is not working"
    exit 1
fi

# Test configuration
echo "2. Testing configuration..."
if [ -f ~/.cursor/mcp-config.json ]; then
    echo "✅ Configuration file exists"
else
    echo "❌ Configuration file missing"
    exit 1
fi

# Test GitHub token (if set)
echo "3. Testing GitHub token..."
if [ -n "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
    echo "✅ GitHub token is set"
else
    echo "⚠️  GitHub token is not set (set GITHUB_PERSONAL_ACCESS_TOKEN)"
fi

echo "🎉 MCP Server test completed!"
EOF
    
    chmod +x test-mcp.sh
    print_status "success" "Test script created"
}

# Main execution
main() {
    echo "Starting MCP Server setup..."
    echo ""
    
    check_prerequisites
    echo ""
    
    install_mcp_server
    echo ""
    
    create_config_files
    echo ""
    
    set_permissions
    echo ""
    
    test_installation
    echo ""
    
    create_test_script
    echo ""
    
    print_status "success" "MCP Server setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Copy .env.example to .env and update with your tokens"
    echo "2. Restart Cursor IDE"
    echo "3. Open Command Palette (Ctrl+Shift+P) and type 'MCP: List Available Tools'"
    echo "4. Run ./test-mcp.sh to verify everything is working"
    echo ""
    echo "📚 Documentation: ./README.md"
    echo "🔧 Configuration: ~/.cursor/mcp-config.json"
    echo "🧪 Test script: ./test-mcp.sh"
    echo ""
    echo "Happy coding with MCP! 🚀"
}

# Run main function
main "$@"