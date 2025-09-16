#!/usr/bin/env node
/**
 * PHASE-1: Chuẩn hóa spacing & màu (Simple version)
 * Tăng Figma token reuse từ 72% → ≥78%
 */

import fs from 'fs';
import path from 'path';

// Mapping hex colors to semantic tokens
const colorMappings = {
  '#b71c1c': 'etax-error',      // Red primary
  '#f3f2f2': 'etax-background', // Light gray background
  '#f5f5f5': 'etax-background', // Light gray background
  '#666': 'etax-text-secondary', // Gray text
  '#333': 'etax-text',          // Dark text
  '#2e7d32': 'etax-secondary',  // Green success
  '#d32f2f': 'etax-error',      // Red error
  '#e0e0e0': 'etax-border',     // Light border
  '#e60000': 'etax-error',      // Red primary
  '#cc0000': 'etax-error',      // Red primary dark
  '#ffffff': 'white',           // White
  '#000000': 'etax-text',       // Black text
  '#8E8E93': 'etax-text-secondary', // Gray secondary
  '#C6C6C8': 'etax-border',     // Border color
  '#F2F2F7': 'etax-background', // Background
  '#FFFFFF': 'etax-surface',    // Surface white
  '#007AFF': 'primary',         // Blue primary
  '#34C759': 'secondary',       // Green secondary
  '#FF9500': 'warning',         // Orange warning
  '#FF3B30': 'error'            // Red error
};

// Mapping px values to spacing tokens
const spacingMappings = {
  '4px': 'xs',
  '8px': 'sm', 
  '12px': 'sm',
  '16px': 'md',
  '20px': 'md',
  '24px': 'lg',
  '32px': 'xl',
  '40px': 'xl',
  '48px': '2xl'
};

// Mapping font sizes to typography tokens
const fontSizeMappings = {
  '12px': 'caption',
  '14px': 'body-2',
  '16px': 'body-1',
  '20px': 'heading-3',
  '24px': 'heading-2',
  '30px': 'heading-1'
};

let processedFiles = [];
let changes = [];

function processFile(filePath) {
  console.log(`📁 Processing: ${filePath}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let fileChanges = [];

  // Replace hex colors in style objects
  Object.entries(colorMappings).forEach(([hex, token]) => {
    const regex = new RegExp(`'${hex}'`, 'g');
    const matches = newContent.match(regex);
    if (matches) {
      newContent = newContent.replace(regex, `'${token}'`);
      fileChanges.push(`Replaced ${hex} → ${token} (${matches.length} times)`);
    }
  });

  // Replace px values in style objects
  Object.entries(spacingMappings).forEach(([px, token]) => {
    const regex = new RegExp(`'${px}'`, 'g');
    const matches = newContent.match(regex);
    if (matches) {
      newContent = newContent.replace(regex, `'${token}'`);
      fileChanges.push(`Replaced ${px} → ${token} (${matches.length} times)`);
    }
  });

  // Replace font sizes
  Object.entries(fontSizeMappings).forEach(([px, token]) => {
    const regex = new RegExp(`fontSize: '${px}'`, 'g');
    const matches = newContent.match(regex);
    if (matches) {
      newContent = newContent.replace(regex, `fontSize: '${token}'`);
      fileChanges.push(`Replaced fontSize ${px} → ${token} (${matches.length} times)`);
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

// Find UI files manually
function findUIFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findUIFiles(fullPath));
    } else if (item.match(/\.(tsx|jsx|css)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
async function main() {
  console.log('🚀 PHASE-1: Normalizing spacing & colors...\n');

  // Find all UI files
  const uiFiles = findUIFiles('src');

  console.log(`📊 Found ${uiFiles.length} UI files to process\n`);

  // Process each file
  uiFiles.forEach(processFile);

  // Generate report
  console.log('\n📋 PROCESSING REPORT');
  console.log('='.repeat(50));

  console.log(`\n✅ Files processed: ${processedFiles.length}`);
  console.log(`📁 Total UI files: ${uiFiles.length}`);

  if (changes.length > 0) {
    console.log('\n🔧 Changes made:');
    changes.forEach(change => {
      console.log(`\n📄 ${change.file}:`);
      change.changes.forEach(changeDesc => {
        console.log(`  • ${changeDesc}`);
      });
    });
  } else {
    console.log('\n✨ No changes needed - all files already normalized!');
  }

  console.log('\n🎯 Next step: Run reuse check to verify improvement');
}

// Run main function
main().catch(console.error);
