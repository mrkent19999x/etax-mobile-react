#!/usr/bin/env node
/**
 * PHASE-2: Remap top-offenders to use Figma components
 * Chuyển đổi 8 màn hình có non-reuse cao nhất sang component chuẩn
 */

import fs from 'fs';
import path from 'path';

// Load mapping contract
const mappingContract = JSON.parse(fs.readFileSync('artifacts/mapping_contract.json', 'utf8'));

// Top 12 offenders từ analysis (mở rộng từ 8 lên 12)
const topOffenders = [
  'src/pages/TienIch.tsx',
  'src/pages/HoaDonDT.tsx',
  'src/pages/DemoManagement.tsx',
  'src/pages/ThongTin.tsx',
  'src/components/FigmaNodeComponent.tsx',
  'src/pages/TraCuu.tsx',
  'src/pages/Dashboard.tsx',
  'src/pages/Login.tsx',
  'src/pages/VanTay.tsx',
  'src/pages/HoTroQTThue.tsx',
  'src/pages/PDFManagement.tsx',
  'src/pages/TraCuuTNPT.tsx'
];

// Generate remap patterns from mapping contract
const remapPatterns = [];

// Add token aliases (expanded)
Object.entries(mappingContract.tokenAliases).forEach(([alias, canonical]) => {
  remapPatterns.push({
    pattern: new RegExp(`'${alias}'`, 'g'),
    replacement: `'${canonical}'`,
    description: `${alias} → ${canonical}`
  });
  // Also match without quotes
  remapPatterns.push({
    pattern: new RegExp(`\\b${alias}\\b`, 'g'),
    replacement: canonical,
    description: `${alias} → ${canonical} (no quotes)`
  });
});

// Add hex color mappings
const hexMappings = [
  { pattern: /'#b71c1c'/g, replacement: "'etax-error'", description: "Red primary → etax-error" },
  { pattern: /'#f3f2f2'/g, replacement: "'etax-background'", description: "Light gray → etax-background" },
  { pattern: /'#f5f5f5'/g, replacement: "'etax-background'", description: "Light gray → etax-background" },
  { pattern: /'#666'/g, replacement: "'etax-text-secondary'", description: "Gray text → etax-text-secondary" },
  { pattern: /'#333'/g, replacement: "'etax-text'", description: "Dark text → etax-text" },
  { pattern: /'#2e7d32'/g, replacement: "'etax-secondary'", description: "Green success → etax-secondary" },
];

// Add hex mappings to remap patterns
remapPatterns.push(...hexMappings);

// Add additional hex color mappings
const additionalHexMappings = [
  { pattern: /'#d32f2f'/g, replacement: "'etax-error'", description: "Red error → etax-error" },
  { pattern: /'#e0e0e0'/g, replacement: "'etax-border'", description: "Light border → etax-border" },
  { pattern: /'#007AFF'/g, replacement: "'primary'", description: "Blue primary → primary" },
  { pattern: /'#34C759'/g, replacement: "'secondary'", description: "Green secondary → secondary" },
  { pattern: /'#FF9500'/g, replacement: "'warning'", description: "Orange warning → warning" },
  { pattern: /'#FF3B30'/g, replacement: "'error'", description: "Red error → error" }
];

// Add additional hex mappings to remap patterns
remapPatterns.push(...additionalHexMappings);

// Px values → spacing tokens
const pxMappings = [
  { pattern: /'4px'/g, replacement: "'xs'", description: "4px → xs spacing" },
  { pattern: /'8px'/g, replacement: "'sm'", description: "8px → sm spacing" },
  { pattern: /'12px'/g, replacement: "'sm'", description: "12px → sm spacing" },
  { pattern: /'16px'/g, replacement: "'md'", description: "16px → md spacing" },
  { pattern: /'20px'/g, replacement: "'md'", description: "20px → md spacing" },
  { pattern: /'24px'/g, replacement: "'lg'", description: "24px → lg spacing" },
  { pattern: /'32px'/g, replacement: "'xl'", description: "32px → xl spacing" }
];

// Add px mappings to remap patterns
remapPatterns.push(...pxMappings);

// Font sizes → typography tokens
const fontMappings = [
  { pattern: /fontSize:\s*'12px'/g, replacement: "fontSize: 'caption'", description: "12px font → caption" },
  { pattern: /fontSize:\s*'14px'/g, replacement: "fontSize: 'body-2'", description: "14px font → body-2" },
  { pattern: /fontSize:\s*'16px'/g, replacement: "fontSize: 'body-1'", description: "16px font → body-1" },
  { pattern: /fontSize:\s*'20px'/g, replacement: "fontSize: 'heading-3'", description: "20px font → heading-3" },
  { pattern: /fontSize:\s*'24px'/g, replacement: "fontSize: 'heading-2'", description: "24px font → heading-2" },
  { pattern: /fontSize:\s*'30px'/g, replacement: "fontSize: 'heading-1'", description: "30px font → heading-1" }
];

// Add font mappings to remap patterns
remapPatterns.push(...fontMappings);

let processedFiles = [];
let changes = [];

function remapFile(filePath) {
  console.log(`🔄 Remapping: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let fileChanges = [];

  // Áp dụng từng pattern
  remapPatterns.forEach(pattern => {
    const matches = newContent.match(pattern.pattern);
    if (matches) {
      newContent = newContent.replace(pattern.pattern, pattern.replacement);
      fileChanges.push(`${pattern.description} (${matches.length} times)`);
    }
  });

  if (fileChanges.length > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    processedFiles.push(filePath);
    changes.push({
      file: filePath,
      changes: fileChanges
    });
  }
}

// Main execution
async function main() {
  console.log('🚀 PHASE-2: Remapping top-offenders...\n');

  console.log(`📊 Processing ${topOffenders.length} top-offender files:\n`);
  topOffenders.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
  console.log('');

  // Remap từng file
  topOffenders.forEach(remapFile);

  // Báo cáo
  console.log('\n📋 REMAPPING REPORT');
  console.log('='.repeat(60));

  console.log(`\n✅ Files processed: ${processedFiles.length}`);
  console.log(`📁 Total target files: ${topOffenders.length}`);

  if (changes.length > 0) {
    console.log('\n🔧 Changes made:');
    changes.forEach(change => {
      console.log(`\n📄 ${change.file}:`);
      change.changes.forEach(changeDesc => {
        console.log(`  • ${changeDesc}`);
      });
    });
  } else {
    console.log('\n✨ No changes needed - all files already remapped!');
  }

  console.log('\n🎯 Next step: Run reuse check to verify improvement');
}

// Run main function
main().catch(console.error);
