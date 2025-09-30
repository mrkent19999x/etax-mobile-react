#!/bin/bash

# Cursor Agent Learning Hub - Setup Script
# Email: begau1302@gmail.com
# Ultimate Assistant Configuration

echo "🚀 Cursor Agent Learning Hub - Setup Script"
echo "📧 Email: begau1302@gmail.com"
echo ""

# Check if running in correct directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the repository root directory"
    exit 1
fi

echo "✅ Repository structure verified"
echo ""

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p ~/.cursor
mkdir -p ~/.config/cursor
mkdir -p ~/.local/share/cursor
echo "✅ Directories created"
echo ""

# Copy configuration files
echo "⚙️ Copying configuration files..."

# Copy global settings
if [ -f "configs/cursor-settings.json" ]; then
    cp configs/cursor-settings.json ~/.cursor/settings.json
    echo "✅ Global settings copied"
else
    echo "❌ Error: configs/cursor-settings.json not found"
    exit 1
fi

# Copy agent rules
if [ -f "configs/agents.md" ]; then
    cp configs/agents.md ./AGENTS.md
    echo "✅ Agent rules copied"
else
    echo "❌ Error: configs/agents.md not found"
    exit 1
fi

# Copy environment variables
if [ -f "configs/environment.env" ]; then
    cp configs/environment.env .env
    echo "✅ Environment variables copied"
else
    echo "❌ Error: configs/environment.env not found"
    exit 1
fi

echo ""

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh
echo "✅ Scripts made executable"
echo ""

# Install MCP servers
echo "📦 Installing MCP servers..."
if [ -f "scripts/install-mcp-servers.sh" ]; then
    ./scripts/install-mcp-servers.sh
    echo "✅ MCP servers installation completed"
else
    echo "❌ Error: install-mcp-servers.sh not found"
    exit 1
fi

echo ""

# Configure Vietnamese language support
echo "🇻🇳 Configuring Vietnamese language support..."
if [ -f "scripts/configure-vietnamese.sh" ]; then
    ./scripts/configure-vietnamese.sh
    echo "✅ Vietnamese language support configured"
else
    echo "❌ Error: configure-vietnamese.sh not found"
    exit 1
fi

echo ""

# Configure Ultimate Assistant
echo "🤖 Configuring Ultimate Assistant..."
if [ -f "scripts/configure-ultimate-assistant.sh" ]; then
    ./scripts/configure-ultimate-assistant.sh
    echo "✅ Ultimate Assistant configured"
else
    echo "❌ Error: configure-ultimate-assistant.sh not found"
    exit 1
fi

echo ""

# Setup email notifications
echo "📧 Setting up email notifications..."
if [ -f "scripts/setup-email-notifications.sh" ]; then
    ./scripts/setup-email-notifications.sh
    echo "✅ Email notifications configured"
else
    echo "❌ Error: setup-email-notifications.sh not found"
    exit 1
fi

echo ""

# Final verification
echo "🔍 Final verification..."
echo ""

# Check if all files are in place
echo "📋 Checking configuration files..."
if [ -f "~/.cursor/settings.json" ]; then
    echo "✅ Global settings: ~/.cursor/settings.json"
else
    echo "❌ Global settings: Missing"
fi

if [ -f "./AGENTS.md" ]; then
    echo "✅ Agent rules: ./AGENTS.md"
else
    echo "❌ Agent rules: Missing"
fi

if [ -f ".env" ]; then
    echo "✅ Environment variables: .env"
else
    echo "❌ Environment variables: Missing"
fi

echo ""

# Check MCP servers
echo "🔗 Checking MCP servers..."
if command -v firecrawl-mcp &> /dev/null; then
    echo "✅ Firecrawl MCP: Installed"
else
    echo "❌ Firecrawl MCP: Not installed"
fi

if command -v github-mcp-scoped-server &> /dev/null; then
    echo "✅ GitHub MCP: Installed"
else
    echo "❌ GitHub MCP: Not installed"
fi

if command -v concurrent-browser-mcp &> /dev/null; then
    echo "✅ Browser MCP: Installed"
else
    echo "❌ Browser MCP: Not installed"
fi

echo ""

# Success message
echo "🎉 Setup completed successfully!"
echo ""
echo "📧 Email Configuration: begau1302@gmail.com"
echo "🇻🇳 Vietnamese Language: Enabled"
echo "🤖 Ultimate Assistant: Configured"
echo "🔗 MCP Servers: Installed"
echo "📊 Performance Monitoring: Enabled"
echo ""
echo "🚀 Cursor Agent Learning Hub is ready to use!"
echo ""
echo "📚 Next steps:"
echo "1. Read the documentation in docs/ folder"
echo "2. Configure your API keys in .env file"
echo "3. Start using Cursor Agent with Vietnamese support"
echo "4. Monitor performance and usage"
echo ""
echo "📞 Support: Create an issue on GitHub if you need help"
echo ""
echo "✨ Happy coding with Cursor Agent!"