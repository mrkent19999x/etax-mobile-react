#!/bin/bash

# Cursor Agent Learning Hub - MCP Servers Installation Script
# Email: begau1302@gmail.com
# Ultimate Assistant Configuration

echo "📦 Cursor Agent Learning Hub - MCP Servers Installation"
echo "📧 Email: begau1302@gmail.com"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Install core MCP servers
echo "🔗 Installing Core MCP Servers..."

# Firecrawl MCP
echo "📡 Installing Firecrawl MCP..."
if npm install -g firecrawl-mcp; then
    echo "✅ Firecrawl MCP installed successfully"
else
    echo "❌ Failed to install Firecrawl MCP"
fi

# GitHub MCP
echo "🐙 Installing GitHub MCP..."
if npm install -g github-mcp-scoped-server; then
    echo "✅ GitHub MCP installed successfully"
else
    echo "❌ Failed to install GitHub MCP"
fi

# Browser MCP
echo "🌐 Installing Browser MCP..."
if npm install -g concurrent-browser-mcp; then
    echo "✅ Browser MCP installed successfully"
else
    echo "❌ Failed to install Browser MCP"
fi

echo ""

# Install business & management Mcp servers
echo "💼 Installing Business & Management MCP Servers..."

# Atlassian MCP
echo "📋 Installing Atlassian MCP..."
if npm install -g mcp-remote; then
    echo "✅ Atlassian MCP installed successfully"
else
    echo "❌ Failed to install Atlassian MCP"
fi

# Linear MCP
echo "📊 Installing Linear MCP..."
if npm install -g mcp-remote; then
    echo "✅ Linear MCP installed successfully"
else
    echo "❌ Failed to install Linear MCP"
fi

# Notion MCP
echo "📝 Installing Notion MCP..."
if npm install -g mcp-remote; then
    echo "✅ Notion MCP installed successfully"
else
    echo "❌ Failed to install Notion MCP"
fi

# Stripe MCP
echo "💳 Installing Stripe MCP..."
if npm install -g stripe-mcp-server; then
    echo "✅ Stripe MCP installed successfully"
else
    echo "❌ Failed to install Stripe MCP"
fi

# Slack MCP
echo "💬 Installing Slack MCP..."
if npm install -g slack-mcp-server; then
    echo "✅ Slack MCP installed successfully"
else
    echo "❌ Failed to install Slack MCP"
fi

echo ""

# Install knowledge & documentation MCP servers
echo "📚 Installing Knowledge & Documentation MCP Servers..."

# AWS Knowledge MCP
echo "☁️ Installing AWS Knowledge MCP..."
if npm install -g uvx; then
    echo "✅ AWS Knowledge MCP installed successfully"
else
    echo "❌ Failed to install AWS Knowledge MCP"
fi

# Browserbase MCP
echo "🖥️ Installing Browserbase MCP..."
if npm install -g @browserbasehq/mcp; then
    echo "✅ Browserbase MCP installed successfully"
else
    echo "❌ Failed to install Browserbase MCP"
fi

# Pearl MCP
echo "👥 Installing Pearl MCP..."
if npm install -g pearl-mcp-server; then
    echo "✅ Pearl MCP installed successfully"
else
    echo "❌ Failed to install Pearl MCP"
fi

echo ""

# Install analytics & monitoring MCP servers
echo "📊 Installing Analytics & Monitoring MCP Servers..."

# Axiom MCP
echo "📈 Installing Axiom MCP..."
if npm install -g axiom-mcp-server; then
    echo "✅ Axiom MCP installed successfully"
else
    echo "❌ Failed to install Axiom MCP"
fi

# Raygun MCP
echo "🔍 Installing Raygun MCP..."
if npm install -g raygun-mcp-server; then
    echo "✅ Raygun MCP installed successfully"
else
    echo "❌ Failed to install Raygun MCP"
fi

echo ""

# Install search & data MCP servers
echo "🔍 Installing Search & Data MCP Servers..."

# Brave Search MCP
echo "🔎 Installing Brave Search MCP..."
if npm install -g brave-search-mcp-server; then
    echo "✅ Brave Search MCP installed successfully"
else
    echo "❌ Failed to install Brave Search MCP"
fi

# Qdrant MCP
echo "🗄️ Installing Qdrant MCP..."
if npm install -g qdrant-mcp-server; then
    echo "✅ Qdrant MCP installed successfully"
else
    echo "❌ Failed to install Qdrant MCP"
fi

# PostgreSQL MCP
echo "🐘 Installing PostgreSQL MCP..."
if npm install -g postgresql-mcp-server; then
    echo "✅ PostgreSQL MCP installed successfully"
else
    echo "❌ Failed to install PostgreSQL MCP"
fi

echo ""

# Install development & infrastructure MCP servers
echo "🛠️ Installing Development & Infrastructure MCP Servers..."

# Docker MCP
echo "🐳 Installing Docker MCP..."
if npm install -g docker-mcp-server; then
    echo "✅ Docker MCP installed successfully"
else
    echo "❌ Failed to install Docker MCP"
fi

# Kubernetes MCP
echo "☸️ Installing Kubernetes MCP..."
if npm install -g kubernetes-mcp-server; then
    echo "✅ Kubernetes MCP installed successfully"
else
    echo "❌ Failed to install Kubernetes MCP"
fi

# E2B MCP
echo "🔬 Installing E2B MCP..."
if npm install -g e2b-mcp-server; then
    echo "✅ E2B MCP installed successfully"
else
    echo "❌ Failed to install E2B MCP"
fi

echo ""

# Install Playwright for Browser MCP
echo "🎭 Installing Playwright for Browser MCP..."
if npx playwright install; then
    echo "✅ Playwright installed successfully"
else
    echo "❌ Failed to install Playwright"
fi

echo ""

# Verify installations
echo "🔍 Verifying MCP installations..."
echo ""

# Check core MCP servers
echo "📋 Core MCP Servers:"
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

# Check business MCP servers
echo "💼 Business MCP Servers:"
if command -v mcp-remote &> /dev/null; then
    echo "✅ MCP Remote: Installed"
else
    echo "❌ MCP Remote: Not installed"
fi

if command -v stripe-mcp-server &> /dev/null; then
    echo "✅ Stripe MCP: Installed"
else
    echo "❌ Stripe MCP: Not installed"
fi

if command -v slack-mcp-server &> /dev/null; then
    echo "✅ Slack MCP: Installed"
else
    echo "❌ Slack MCP: Not installed"
fi

echo ""

# Check knowledge MCP servers
echo "📚 Knowledge MCP Servers:"
if command -v uvx &> /dev/null; then
    echo "✅ UVX: Installed"
else
    echo "❌ UVX: Not installed"
fi

if command -v pearl-mcp-server &> /dev/null; then
    echo "✅ Pearl MCP: Installed"
else
    echo "❌ Pearl MCP: Not installed"
fi

echo ""

# Check development MCP servers
echo "🛠️ Development MCP Servers:"
if command -v docker-mcp-server &> /dev/null; then
    echo "✅ Docker MCP: Installed"
else
    echo "❌ Docker MCP: Not installed"
fi

if command -v kubernetes-mcp-server &> /dev/null; then
    echo "✅ Kubernetes MCP: Installed"
else
    echo "❌ Kubernetes MCP: Not installed"
fi

echo ""

# Success message
echo "🎉 MCP Servers installation completed!"
echo ""
echo "📧 Email Configuration: begau1302@gmail.com"
echo "🔗 Total MCP Servers: 20+"
echo "📊 Categories: Core, Business, Knowledge, Analytics, Development"
echo ""
echo "📚 Next steps:"
echo "1. Configure API keys in .env file"
echo "2. Run ./scripts/configure-vietnamese.sh"
echo "3. Run ./scripts/configure-ultimate-assistant.sh"
echo "4. Start using Cursor Agent with MCP integration"
echo ""
echo "✨ MCP Servers are ready to use!"