#!/usr/bin/env node
/**
 * PHASE-2: Analyze reuse breakdown to find top-offenders
 * Tạo reuse_breakdown.csv và mapping_contract.json
 */

import fs from 'fs';
import path from 'path';

// Tìm UI files
function findUIFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findUIFiles(fullPath));
    } else if (item.match(/\.(tsx|jsx)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Phân tích file để tìm non-reuse patterns
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let nonReuseCount = 0;
  let totalTokens = 0;
  const patterns = [];
  
  // Tìm inline styles với hex colors
  const hexColorRegex = /#[0-9a-fA-F]{3,6}/g;
  const hexMatches = content.match(hexColorRegex);
  if (hexMatches) {
    nonReuseCount += hexMatches.length;
    totalTokens += hexMatches.length;
    patterns.push(`Hex colors: ${hexMatches.length}`);
  }
  
  // Tìm px values trong inline styles
  const pxRegex = /['"`]\d+px['"`]/g;
  const pxMatches = content.match(pxRegex);
  if (pxMatches) {
    nonReuseCount += pxMatches.length;
    totalTokens += pxMatches.length;
    patterns.push(`Px values: ${pxMatches.length}`);
  }
  
  // Tìm className không chuẩn
  const classNameRegex = /className\s*=\s*["'`]([^"'`]+)["'`]/g;
  let classNameMatch;
  const classNames = [];
  while ((classNameMatch = classNameRegex.exec(content)) !== null) {
    classNames.push(classNameMatch[1]);
  }
  
  // Đếm class không phải Tailwind chuẩn
  const nonTailwindClasses = classNames.filter(cls => 
    !cls.match(/^(bg-|text-|p-|m-|w-|h-|flex|grid|rounded|shadow|border)/) &&
    !cls.match(/^(etax-|primary|secondary|warning|error|background|surface|text|border)/)
  );
  
  if (nonTailwindClasses.length > 0) {
    nonReuseCount += nonTailwindClasses.length;
    totalTokens += nonTailwindClasses.length;
    patterns.push(`Non-standard classes: ${nonTailwindClasses.length}`);
  }
  
  const reuseRate = totalTokens > 0 ? ((totalTokens - nonReuseCount) / totalTokens * 100).toFixed(1) : 100;
  
  return {
    file: filePath,
    nonReuseCount,
    totalTokens,
    reuseRate: parseFloat(reuseRate),
    patterns
  };
}

// Tạo mapping contract
function createMappingContract() {
  const mappingContract = {
    tokenAliases: {
      // eTax colors → Figma tokens
      'etax-primary': 'primary',
      'etax-secondary': 'secondary', 
      'etax-warning': 'warning',
      'etax-error': 'error',
      'etax-background': 'background',
      'etax-surface': 'surface',
      'etax-text': 'text',
      'etax-text-secondary': 'text-secondary',
      'etax-border': 'border',
      'white': 'white',
      'black': 'black'
    },
    componentAliases: {
      // Component name mappings
      'Button': 'Button',
      'Card': 'Card',
      'Input': 'Input',
      'Header': 'Header',
      'Footer': 'Footer',
      'Navigation': 'Navigation',
      'Modal': 'Modal',
      'Toast': 'Toast',
      'Badge': 'Badge',
      'Icon': 'Icon'
    },
    variantMappings: {
      // Variant mappings
      'primary': 'primary',
      'secondary': 'secondary',
      'success': 'success',
      'error': 'error',
      'warning': 'warning',
      'info': 'info',
      'small': 'sm',
      'medium': 'md',
      'large': 'lg'
    },
    sizeMappings: {
      // Size mappings
      'xs': 'xs',
      'sm': 'sm', 
      'md': 'md',
      'lg': 'lg',
      'xl': 'xl',
      '2xl': '2xl'
    }
  };
  
  return mappingContract;
}

// Main execution
async function main() {
  console.log('🔍 PHASE-2: Analyzing reuse breakdown...\n');
  
  // Tìm UI files
  const uiFiles = findUIFiles('src');
  console.log(`📊 Found ${uiFiles.length} UI files to analyze\n`);
  
  // Phân tích từng file
  const analysis = uiFiles.map(analyzeFile);
  
  // Sắp xếp theo non-reuse count (top-offenders)
  const sortedAnalysis = analysis
    .filter(item => item.totalTokens > 0)
    .sort((a, b) => b.nonReuseCount - a.nonReuseCount);
  
  // Tạo reuse breakdown CSV
  const csvHeader = 'frame,component,token_type,before%,after%,delta\n';
  const csvRows = sortedAnalysis.map(item => {
    const frame = path.basename(item.file, path.extname(item.file));
    const component = 'Unknown';
    const tokenType = 'Mixed';
    const beforePercent = item.reuseRate;
    const afterPercent = 'TBD';
    const delta = 'TBD';
    
    return `${frame},${component},${tokenType},${beforePercent},${afterPercent},${delta}`;
  });
  
  const csvContent = csvHeader + csvRows.join('\n');
  
  // Tạo mapping contract
  const mappingContract = createMappingContract();
  
  // Lưu artifacts
  fs.writeFileSync('artifacts/reuse_breakdown.csv', csvContent);
  fs.writeFileSync('artifacts/mapping_contract.json', JSON.stringify(mappingContract, null, 2));
  
  // Báo cáo
  console.log('📋 REUSE BREAKDOWN ANALYSIS');
  console.log('='.repeat(60));
  
  console.log(`\n📊 Top 10 offenders (by non-reuse count):`);
  sortedAnalysis.slice(0, 10).forEach((item, index) => {
    console.log(`${index + 1}. ${item.file}`);
    console.log(`   Non-reuse: ${item.nonReuseCount}/${item.totalTokens} (${item.reuseRate}%)`);
    console.log(`   Patterns: ${item.patterns.join(', ')}`);
    console.log('');
  });
  
  const totalNonReuse = analysis.reduce((sum, item) => sum + item.nonReuseCount, 0);
  const totalTokens = analysis.reduce((sum, item) => sum + item.totalTokens, 0);
  const overallReuse = totalTokens > 0 ? ((totalTokens - totalNonReuse) / totalTokens * 100).toFixed(1) : 100;
  
  console.log(`\n📈 Overall statistics:`);
  console.log(`   Total tokens: ${totalTokens}`);
  console.log(`   Non-reuse tokens: ${totalNonReuse}`);
  console.log(`   Overall reuse: ${overallReuse}%`);
  
  console.log(`\n✅ Artifacts created:`);
  console.log(`   - artifacts/reuse_breakdown.csv`);
  console.log(`   - artifacts/mapping_contract.json`);
  
  console.log(`\n🎯 Next step: Remap top 8 offenders using mapping contract`);
}

// Run main function
main().catch(console.error);
