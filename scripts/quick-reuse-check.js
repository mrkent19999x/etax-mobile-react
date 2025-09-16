#!/usr/bin/env node
/**
 * Quick reuse check - lightweight version
 */

import fs from 'fs';

// Quick check reuse
function quickReuseCheck() {
  console.log('🔍 Quick reuse check...');

  // Sample a few files instead of all 59
  const sampleFiles = [
    'src/pages/ThongTin.tsx',
    'src/pages/TienIch.tsx',
    'src/pages/HoaDonDT.tsx',
    'src/pages/Dashboard.tsx',
    'src/pages/Login.tsx'
  ];

  let totalTokens = 0;
  let reuseTokens = 0;

  for (const file of sampleFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');

      // Count total tokens (simple)
      const totalMatches = content.match(/['"`][^'"`]+['"`]/g) || [];
      totalTokens += totalMatches.length;

      // Count reuse tokens (simple)
      const reuseMatches = content.match(/['"`](primary|secondary|warning|error|background|surface|text|text-secondary|border)['"`]/g) || [];
      reuseTokens += reuseMatches.length;
    }
  }

  const reuseRate = totalTokens > 0 ? (reuseTokens / totalTokens * 100).toFixed(1) : 0;

  console.log(`📊 Sample files: ${sampleFiles.length}`);
  console.log(`📊 Total tokens: ${totalTokens}`);
  console.log(`📊 Reuse tokens: ${reuseTokens}`);
  console.log(`📊 Reuse rate: ${reuseRate}%`);

  return parseFloat(reuseRate);
}

// Run
const reuseRate = quickReuseCheck();
console.log(`\n✅ Quick check complete: ${reuseRate}%`);
