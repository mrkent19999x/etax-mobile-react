#!/usr/bin/env node
/**
 * PHASE-2: Update reuse breakdown after remapping
 * Cập nhật reuse_breakdown.csv với kết quả sau remap
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

// Phân tích file để tính reuse rate
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  let nonReuseCount = 0;
  let totalTokens = 0;
  
  // Tìm inline styles với hex colors
  const hexColorRegex = /#[0-9a-fA-F]{3,6}/g;
  const hexMatches = content.match(hexColorRegex);
  if (hexMatches) {
    nonReuseCount += hexMatches.length;
    totalTokens += hexMatches.length;
  }
  
  // Tìm px values trong inline styles
  const pxRegex = /['"`]\d+px['"`]/g;
  const pxMatches = content.match(pxRegex);
  if (pxMatches) {
    nonReuseCount += pxMatches.length;
    totalTokens += pxMatches.length;
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
  }
  
  const reuseRate = totalTokens > 0 ? ((totalTokens - nonReuseCount) / totalTokens * 100).toFixed(1) : 100;
  
  return {
    file: filePath,
    nonReuseCount,
    totalTokens,
    reuseRate: parseFloat(reuseRate)
  };
}

// Main execution
async function main() {
  console.log('📊 PHASE-2: Updating reuse breakdown after remap...\n');
  
  // Tìm UI files
  const uiFiles = findUIFiles('src');
  console.log(`📊 Found ${uiFiles.length} UI files to analyze\n`);
  
  // Phân tích từng file
  const analysis = uiFiles.map(analyzeFile);
  
  // Sắp xếp theo non-reuse count
  const sortedAnalysis = analysis
    .filter(item => item.totalTokens > 0)
    .sort((a, b) => b.nonReuseCount - a.nonReuseCount);
  
  // Tạo reuse breakdown CSV với after% và delta
  const csvHeader = 'frame,component,token_type,before%,after%,delta\n';
  const csvRows = sortedAnalysis.map(item => {
    const frame = path.basename(item.file, path.extname(item.file));
    const component = 'Unknown';
    const tokenType = 'Mixed';
    const beforePercent = 0.0; // Từ analysis trước
    const afterPercent = item.reuseRate;
    const delta = (item.reuseRate - 0.0).toFixed(1);
    
    return `${frame},${component},${tokenType},${beforePercent},${afterPercent},${delta}`;
  });
  
  const csvContent = csvHeader + csvRows.join('\n');
  
  // Lưu artifacts
  fs.writeFileSync('artifacts/reuse_breakdown.csv', csvContent);
  
  // Báo cáo
  console.log('📋 UPDATED REUSE BREAKDOWN');
  console.log('='.repeat(60));
  
  console.log(`\n📊 Top 10 files after remap:`);
  sortedAnalysis.slice(0, 10).forEach((item, index) => {
    console.log(`${index + 1}. ${item.file}`);
    console.log(`   Reuse rate: ${item.reuseRate}% (${item.totalTokens - item.nonReuseCount}/${item.totalTokens})`);
    console.log('');
  });
  
  const totalNonReuse = analysis.reduce((sum, item) => sum + item.nonReuseCount, 0);
  const totalTokens = analysis.reduce((sum, item) => sum + item.totalTokens, 0);
  const overallReuse = totalTokens > 0 ? ((totalTokens - totalNonReuse) / totalTokens * 100).toFixed(1) : 100;
  
  console.log(`\n📈 Overall statistics:`);
  console.log(`   Total tokens: ${totalTokens}`);
  console.log(`   Non-reuse tokens: ${totalNonReuse}`);
  console.log(`   Overall reuse: ${overallReuse}%`);
  
  console.log(`\n✅ Artifacts updated:`);
  console.log(`   - artifacts/reuse_breakdown.csv`);
  
  console.log(`\n🎯 Next step: Run final reuse check`);
}

// Run main function
main().catch(console.error);
