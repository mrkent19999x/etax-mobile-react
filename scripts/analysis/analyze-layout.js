/**
 * Script phân tích layout hiện tại và so sánh với design gốc
 * Sử dụng: node scripts/analysis/analyze-layout.js
 */

const fs = require('fs');
const path = require('path');

// Load configs
const designSystemPath = path.join(__dirname, '../../config/design-system.json');
const projectPath = path.join(__dirname, '../../config/project.json');
const rulesPath = path.join(__dirname, '../../config/rules.json');

const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf8'));
const project = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

function analyzeProject() {
  console.log('🔍 [INFO] Đang phân tích dự án eTax Mobile...');
  console.log(`📱 [INFO] Target: ${project.target.platform}`);
  console.log(`📏 [INFO] Devices: ${project.target.devices}`);
  console.log(`🎨 [INFO] Design System: ${designSystem.name} v${designSystem.version}`);

  // Analyze pages
  const pagesDir = path.join(__dirname, '../../src/pages');
  const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));

  console.log('\n📄 [PAGES] Danh sách pages:');
  pages.forEach((page, index) => {
    const pageName = page.replace('.tsx', '');
    console.log(`  ${index + 1}. ${pageName}`);
  });

  // Analyze components
  const componentsDir = path.join(__dirname, '../../src/components');
  let components = [];
  if (fs.existsSync(componentsDir)) {
    components = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));
  }

  console.log('\n🧩 [COMPONENTS] Danh sách components:');
  if (components.length > 0) {
    components.forEach((component, index) => {
      const componentName = component.replace('.tsx', '');
      console.log(`  ${index + 1}. ${componentName}`);
    });
  } else {
    console.log('  Chưa có components nào');
  }

  // Analyze design system usage
  console.log('\n🎨 [DESIGN SYSTEM] Phân tích:');
  console.log(`  Colors: ${Object.keys(designSystem.colors).length} categories`);
  console.log(`  Typography: ${Object.keys(designSystem.typography.fontSize).length} sizes`);
  console.log(`  Spacing: ${Object.keys(designSystem.spacing).length} values`);
  console.log(`  Border Radius: ${Object.keys(designSystem.borderRadius).length} values`);

  // Check Tailwind config
  const tailwindPath = path.join(__dirname, '../../tailwind.config.js');
  if (fs.existsSync(tailwindPath)) {
    console.log('\n⚙️ [TAILWIND] Config found');
  } else {
    console.log('\n❌ [TAILWIND] Config not found');
  }

  // Check build status
  const distPath = path.join(__dirname, '../../dist');
  if (fs.existsSync(distPath)) {
    console.log('\n✅ [BUILD] Dist folder exists');
  } else {
    console.log('\n⚠️ [BUILD] Dist folder not found - run npm run build');
  }

  console.log('\n📊 [SUMMARY] Tổng kết:');
  console.log(`  Pages: ${pages.length}`);
  console.log(`  Components: ${components.length}`);
  console.log(`  Design System: Ready`);
  console.log(`  Build Status: ${fs.existsSync(distPath) ? 'Ready' : 'Pending'}`);
}

// Run analysis
analyzeProject();


