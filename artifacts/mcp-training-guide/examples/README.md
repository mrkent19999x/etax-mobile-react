# 🚀 MCP Server Examples

## 📁 Cấu trúc thư mục
```
examples/
├── basic/           # Ví dụ cơ bản
├── advanced/        # Ví dụ nâng cao
├── integrations/    # Tích hợp với services
└── custom/          # Custom MCP servers
```

## 🎯 Basic Examples

### 1. GitHub Repository Management

#### Tạo repository mới
```typescript
// examples/basic/github-create-repo.ts
import { GitHubMCP } from '@modelcontextprotocol/server-github';

const github = new GitHubMCP({
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

async function createRepository() {
  try {
    const repo = await github.createRepository({
      name: 'my-new-project',
      description: 'A new project created via MCP',
      private: false,
      autoInit: true
    });
    
    console.log(`✅ Repository created: ${repo.html_url}`);
    return repo;
  } catch (error) {
    console.error('❌ Error creating repository:', error);
    throw error;
  }
}

// Sử dụng
createRepository();
```

#### Tạo issue
```typescript
// examples/basic/github-create-issue.ts
async function createIssue() {
  const issue = await github.createIssue({
    owner: 'username',
    repo: 'my-repo',
    title: 'Bug: Login không hoạt động',
    body: `
## Mô tả
Login form không hoạt động trên mobile

## Steps to reproduce
1. Mở app trên mobile
2. Nhập email/password
3. Click Login
4. Không có response

## Expected behavior
User được redirect về dashboard

## Environment
- OS: iOS/Android
- Browser: Chrome/Safari
- Version: 1.0.0
    `,
    labels: ['bug', 'mobile']
  });
  
  console.log(`✅ Issue created: ${issue.html_url}`);
}
```

### 2. Filesystem Operations

#### Đọc và phân tích code
```typescript
// examples/basic/filesystem-analysis.ts
import { FilesystemMCP } from '@modelcontextprotocol/server-filesystem';

const fs = new FilesystemMCP({
  allowedDirectories: ['/workspace', '/home/user/projects']
});

async function analyzeProject() {
  // Đọc package.json
  const packageJson = await fs.readFile('/workspace/package.json');
  const pkg = JSON.parse(packageJson);
  
  console.log('📦 Dependencies:', Object.keys(pkg.dependencies || {}));
  console.log('🔧 Dev Dependencies:', Object.keys(pkg.devDependencies || {}));
  
  // Tìm tất cả TypeScript files
  const tsFiles = await fs.searchFiles('**/*.ts', '/workspace/src');
  console.log(`📄 Found ${tsFiles.length} TypeScript files`);
  
  // Phân tích từng file
  for (const file of tsFiles.slice(0, 5)) { // Chỉ phân tích 5 file đầu
    const content = await fs.readFile(file);
    const lines = content.split('\n').length;
    console.log(`  ${file}: ${lines} lines`);
  }
}
```

#### Tạo file tự động
```typescript
// examples/basic/filesystem-generate.ts
async function generateComponent() {
  const componentName = 'UserProfile';
  const componentPath = `/workspace/src/components/${componentName}.tsx`;
  
  const componentCode = `
import React from 'react';

interface ${componentName}Props {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const ${componentName}: React.FC<${componentName}Props> = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <div className="avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ${componentName};
  `;
  
  await fs.writeFile(componentPath, componentCode);
  console.log(`✅ Component created: ${componentPath}`);
}
```

## 🔥 Advanced Examples

### 1. Database Integration

#### PostgreSQL MCP Server
```typescript
// examples/advanced/database-postgres.ts
import { DatabaseMCP } from '@modelcontextprotocol/server-database';

const db = new DatabaseMCP({
  connectionString: process.env.DATABASE_URL
});

async function analyzeDatabase() {
  // Lấy schema
  const schema = await db.getSchema();
  console.log('📊 Database Schema:', schema);
  
  // Liệt kê tables
  const tables = await db.listTables();
  console.log('📋 Tables:', tables);
  
  // Phân tích từng table
  for (const table of tables) {
    const tableInfo = await db.executeQuery(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_name = '${table}'
      ORDER BY ordinal_position
    `);
    
    console.log(`\n📄 Table: ${table}`);
    console.table(tableInfo);
  }
}

async function generateTypeScriptTypes() {
  const tables = await db.listTables();
  let typesCode = '// Auto-generated TypeScript types\n\n';
  
  for (const table of tables) {
    const columns = await db.executeQuery(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = '${table}'
      ORDER BY ordinal_position
    `);
    
    typesCode += `export interface ${table.charAt(0).toUpperCase() + table.slice(1)} {\n`;
    
    for (const col of columns) {
      const tsType = mapPostgresToTypeScript(col.data_type);
      const nullable = col.is_nullable === 'YES' ? '?' : '';
      typesCode += `  ${col.column_name}${nullable}: ${tsType};\n`;
    }
    
    typesCode += '}\n\n';
  }
  
  await fs.writeFile('/workspace/src/types/database.ts', typesCode);
  console.log('✅ TypeScript types generated');
}

function mapPostgresToTypeScript(pgType: string): string {
  const typeMap: Record<string, string> = {
    'varchar': 'string',
    'text': 'string',
    'integer': 'number',
    'bigint': 'number',
    'boolean': 'boolean',
    'timestamp': 'Date',
    'date': 'Date',
    'json': 'any',
    'jsonb': 'any'
  };
  
  return typeMap[pgType] || 'any';
}
```

### 2. Web Scraping & Analysis

#### Web Search MCP
```typescript
// examples/advanced/web-search.ts
import { WebSearchMCP } from '@modelcontextprotocol/server-web-search';

const webSearch = new WebSearchMCP({
  apiKey: process.env.SEARCH_API_KEY
});

async function researchTopic(topic: string) {
  console.log(`🔍 Researching: ${topic}`);
  
  // Tìm kiếm thông tin
  const results = await webSearch.search({
    query: `${topic} best practices 2024`,
    maxResults: 10
  });
  
  console.log(`📊 Found ${results.length} results`);
  
  // Phân tích từng kết quả
  const analysis = [];
  for (const result of results.slice(0, 5)) {
    console.log(`\n📄 Analyzing: ${result.title}`);
    
    // Lấy nội dung trang
    const content = await webSearch.getPageContent(result.url);
    
    // Phân tích nội dung (simplified)
    const wordCount = content.split(' ').length;
    const hasCode = content.includes('```') || content.includes('<code>');
    const hasExamples = content.includes('example') || content.includes('ví dụ');
    
    analysis.push({
      title: result.title,
      url: result.url,
      wordCount,
      hasCode,
      hasExamples,
      relevance: calculateRelevance(content, topic)
    });
  }
  
  // Sắp xếp theo relevance
  analysis.sort((a, b) => b.relevance - a.relevance);
  
  console.log('\n🏆 Top results:');
  analysis.slice(0, 3).forEach((item, index) => {
    console.log(`${index + 1}. ${item.title}`);
    console.log(`   Relevance: ${item.relevance}%`);
    console.log(`   Has code: ${item.hasCode ? '✅' : '❌'}`);
    console.log(`   Has examples: ${item.hasExamples ? '✅' : '❌'}`);
  });
  
  return analysis;
}

function calculateRelevance(content: string, topic: string): number {
  const topicWords = topic.toLowerCase().split(' ');
  const contentWords = content.toLowerCase().split(' ');
  
  let matches = 0;
  for (const word of topicWords) {
    if (contentWords.includes(word)) {
      matches++;
    }
  }
  
  return Math.round((matches / topicWords.length) * 100);
}
```

## 🔌 Integration Examples

### 1. Cursor IDE Integration

#### Custom MCP Server cho Cursor
```typescript
// examples/integrations/cursor-custom-server.ts
import { Server } from '@modelcontextprotocol/server';

class CursorCustomServer extends Server {
  constructor() {
    super({
      name: 'cursor-custom-server',
      version: '1.0.0'
    });
    
    this.setupTools();
  }
  
  private setupTools() {
    // Tool để tạo component React
    this.addTool({
      name: 'create_react_component',
      description: 'Tạo React component với TypeScript',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string', enum: ['functional', 'class'] },
          props: { type: 'array', items: { type: 'string' } },
          path: { type: 'string' }
        },
        required: ['name', 'type', 'path']
      }
    });
    
    // Tool để refactor code
    this.addTool({
      name: 'refactor_code',
      description: 'Refactor code theo best practices',
      inputSchema: {
        type: 'object',
        properties: {
          filePath: { type: 'string' },
          refactorType: { type: 'string', enum: ['extract', 'inline', 'rename'] },
          options: { type: 'object' }
        },
        required: ['filePath', 'refactorType']
      }
    });
  }
  
  async handleToolCall(toolName: string, params: any) {
    switch (toolName) {
      case 'create_react_component':
        return await this.createReactComponent(params);
      case 'refactor_code':
        return await this.refactorCode(params);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
  
  private async createReactComponent(params: any) {
    const { name, type, props, path } = params;
    
    let componentCode = '';
    
    if (type === 'functional') {
      componentCode = `
import React from 'react';

interface ${name}Props {
${props.map((prop: string) => `  ${prop}: any;`).join('\n')}
}

export const ${name}: React.FC<${name}Props> = ({ ${props.join(', ')} }) => {
  return (
    <div className="${name.toLowerCase()}">
      {/* Component content */}
    </div>
  );
};

export default ${name};
      `;
    } else {
      componentCode = `
import React, { Component } from 'react';

interface ${name}Props {
${props.map((prop: string) => `  ${prop}: any;`).join('\n')}
}

interface ${name}State {
  // State properties
}

export class ${name} extends Component<${name}Props, ${name}State> {
  constructor(props: ${name}Props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className="${name.toLowerCase()}">
        {/* Component content */}
      </div>
    );
  }
}

export default ${name};
      `;
    }
    
    // Ghi file
    await fs.writeFile(path, componentCode);
    
    return {
      success: true,
      message: `Component ${name} created at ${path}`,
      code: componentCode
    };
  }
  
  private async refactorCode(params: any) {
    const { filePath, refactorType, options } = params;
    
    // Đọc file hiện tại
    const currentCode = await fs.readFile(filePath);
    
    let refactoredCode = currentCode;
    
    switch (refactorType) {
      case 'extract':
        refactoredCode = this.extractMethod(currentCode, options);
        break;
      case 'inline':
        refactoredCode = this.inlineMethod(currentCode, options);
        break;
      case 'rename':
        refactoredCode = this.renameVariable(currentCode, options);
        break;
    }
    
    // Backup file gốc
    await fs.writeFile(`${filePath}.backup`, currentCode);
    
    // Ghi file mới
    await fs.writeFile(filePath, refactoredCode);
    
    return {
      success: true,
      message: `Code refactored using ${refactorType}`,
      changes: this.calculateChanges(currentCode, refactoredCode)
    };
  }
  
  private extractMethod(code: string, options: any): string {
    // Implementation for method extraction
    return code;
  }
  
  private inlineMethod(code: string, options: any): string {
    // Implementation for method inlining
    return code;
  }
  
  private renameVariable(code: string, options: any): string {
    // Implementation for variable renaming
    return code;
  }
  
  private calculateChanges(oldCode: string, newCode: string) {
    const oldLines = oldCode.split('\n');
    const newLines = newCode.split('\n');
    
    return {
      linesAdded: newLines.length - oldLines.length,
      linesModified: oldLines.filter((line, index) => line !== newLines[index]).length
    };
  }
}

// Start server
const server = new CursorCustomServer();
server.start();
```

### 2. CI/CD Integration

#### GitHub Actions với MCP
```yaml
# examples/integrations/github-actions.yml
name: MCP Server CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Test MCP Server
        run: |
          npm install -g @modelcontextprotocol/server
          mcp-server test-connection
        env:
          GITHUB_PERSONAL_ACCESS_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Generate documentation
        run: |
          mcp-server generate-docs --output docs/
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          echo "Deploying MCP Server to production..."
          # Add deployment commands here
```

## 🎨 Custom MCP Servers

### 1. Weather MCP Server
```typescript
// examples/custom/weather-server.ts
import { Server } from '@modelcontextprotocol/server';
import axios from 'axios';

class WeatherMCP extends Server {
  private apiKey: string;
  
  constructor(apiKey: string) {
    super({
      name: 'weather-mcp-server',
      version: '1.0.0'
    });
    
    this.apiKey = apiKey;
    this.setupTools();
  }
  
  private setupTools() {
    this.addTool({
      name: 'get_current_weather',
      description: 'Lấy thông tin thời tiết hiện tại',
      inputSchema: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          country: { type: 'string' }
        },
        required: ['city']
      }
    });
    
    this.addTool({
      name: 'get_weather_forecast',
      description: 'Lấy dự báo thời tiết 5 ngày',
      inputSchema: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          country: { type: 'string' }
        },
        required: ['city']
      }
    });
  }
  
  async handleToolCall(toolName: string, params: any) {
    switch (toolName) {
      case 'get_current_weather':
        return await this.getCurrentWeather(params);
      case 'get_weather_forecast':
        return await this.getWeatherForecast(params);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
  
  private async getCurrentWeather(params: any) {
    const { city, country } = params;
    const location = country ? `${city},${country}` : city;
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}&units=metric&lang=vi`
      );
      
      const data = response.data;
      
      return {
        success: true,
        data: {
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          description: data.weather[0].description,
          windSpeed: data.wind.speed,
          visibility: data.visibility
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Không thể lấy thông tin thời tiết'
      };
    }
  }
  
  private async getWeatherForecast(params: any) {
    const { city, country } = params;
    const location = country ? `${city},${country}` : city;
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${this.apiKey}&units=metric&lang=vi`
      );
      
      const data = response.data;
      
      // Nhóm theo ngày
      const forecastByDay = data.list.reduce((acc: any, item: any) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});
      
      const forecast = Object.keys(forecastByDay).map(date => {
        const dayData = forecastByDay[date];
        const avgTemp = dayData.reduce((sum: number, item: any) => sum + item.main.temp, 0) / dayData.length;
        const avgHumidity = dayData.reduce((sum: number, item: any) => sum + item.main.humidity, 0) / dayData.length;
        
        return {
          date,
          avgTemperature: Math.round(avgTemp),
          avgHumidity: Math.round(avgHumidity),
          conditions: dayData.map((item: any) => ({
            time: item.dt_txt.split(' ')[1],
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          }))
        };
      });
      
      return {
        success: true,
        data: {
          city: data.city.name,
          country: data.city.country,
          forecast
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Không thể lấy dự báo thời tiết'
      };
    }
  }
}

// Usage
const weatherServer = new WeatherMCP(process.env.OPENWEATHER_API_KEY);
weatherServer.start();
```

---

*Tất cả examples này được tạo bởi Cipher AI Assistant - Cập nhật lần cuối: 2025-01-12*