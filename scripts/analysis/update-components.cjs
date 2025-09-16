/**
 * Script cập nhật tất cả components với design system mới
 * Sử dụng: node scripts/analysis/update-components.cjs
 */

const fs = require('fs');
const path = require('path');

// Load design tokens
const designTokensPath = path.join(__dirname, '../../config/figma-design-tokens.json');
const designTokens = JSON.parse(fs.readFileSync(designTokensPath, 'utf8'));

function updateComponents() {
  console.log('🎨 [INFO] Đang cập nhật components với design system mới...');

  // List of components to update
  const componentsToUpdate = [
    'src/pages/Login.tsx',
    'src/pages/Dashboard.tsx',
    'src/pages/ThongTin.tsx',
    'src/pages/ThongBao.tsx',
    'src/pages/TraCuu.tsx',
    'src/pages/NopThue.tsx',
    'src/pages/ThietLap.tsx'
  ];

  let updatedCount = 0;

  componentsToUpdate.forEach(componentPath => {
    try {
      if (fs.existsSync(componentPath)) {
        console.log(`📝 [INFO] Cập nhật ${componentPath}...`);

        let content = fs.readFileSync(componentPath, 'utf8');

        // Apply design system updates
        content = applyDesignSystem(content, designTokens);

        // Write updated content
        fs.writeFileSync(componentPath, content);

        console.log(`✅ [SUCCESS] Đã cập nhật ${componentPath}`);
        updatedCount++;
      } else {
        console.log(`⚠️ [WARNING] File không tồn tại: ${componentPath}`);
      }
    } catch (error) {
      console.error(`❌ [ERROR] Lỗi cập nhật ${componentPath}:`, error.message);
    }
  });

  console.log(`\n📊 [SUMMARY] Đã cập nhật ${updatedCount}/${componentsToUpdate.length} components`);

  // Update Tailwind config
  updateTailwindConfig(designTokens);
  console.log('⚙️ [SUCCESS] Đã cập nhật Tailwind config');
}

function applyDesignSystem(content, tokens) {
  // Replace old styles with new design system classes
  let updatedContent = content;

  // Replace inline styles with Tailwind classes
  updatedContent = updatedContent.replace(
    /style=\{[^}]*backgroundColor:\s*['"]#b71c1c['"][^}]*\}/g,
    'className="bg-etax-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*backgroundColor:\s*['"]#f5f5f5['"][^}]*\}/g,
    'className="bg-etax-background"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*backgroundColor:\s*['"]#ffffff['"][^}]*\}/g,
    'className="bg-etax-surface"'
  );

  // Replace phone-frame class
  updatedContent = updatedContent.replace(
    /className="phone-frame"/g,
    'className="min-h-screen bg-etax-background"'
  );

  // Replace header styles
  updatedContent = updatedContent.replace(
    /className="header"[^>]*>/g,
    'className="bg-etax-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">'
  );

  // Replace button styles
  updatedContent = updatedContent.replace(
    /style=\{[^}]*cursor:\s*['"]pointer['"][^}]*\}/g,
    'className="cursor-pointer hover:opacity-80 transition-opacity"'
  );

  // Replace card styles
  updatedContent = updatedContent.replace(
    /style=\{[^}]*backgroundColor:\s*['"]#ffffff['"][^}]*borderRadius:\s*['"]8px['"][^}]*\}/g,
    'className="bg-etax-surface rounded-lg p-4 shadow-md"'
  );

  // Replace text colors
  updatedContent = updatedContent.replace(
    /style=\{[^}]*color:\s*['"]#333333['"][^}]*\}/g,
    'className="text-etax-text"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*color:\s*['"]#666666['"][^}]*\}/g,
    'className="text-etax-text-secondary"'
  );

  // Replace padding and margin
  updatedContent = updatedContent.replace(
    /style=\{[^}]*padding:\s*['"]20px['"][^}]*\}/g,
    'className="p-5"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*padding:\s*['"]16px['"][^}]*\}/g,
    'className="p-4"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*padding:\s*['"]12px['"][^}]*\}/g,
    'className="p-3"'
  );

  // Replace font sizes
  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontSize:\s*['"]20px['"][^}]*\}/g,
    'className="text-xl"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontSize:\s*['"]18px['"][^}]*\}/g,
    'className="text-lg"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontSize:\s*['"]16px['"][^}]*\}/g,
    'className="text-base"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontSize:\s*['"]14px['"][^}]*\}/g,
    'className="text-sm"'
  );

  // Replace font weights
  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontWeight:\s*['"]500['"][^}]*\}/g,
    'className="font-medium"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontWeight:\s*['"]600['"][^}]*\}/g,
    'className="font-semibold"'
  );

  updatedContent = updatedContent.replace(
    /style=\{[^}]*fontWeight:\s*['"]700['"][^}]*\}/g,
    'className="font-bold"'
  );

  return updatedContent;
}

function updateTailwindConfig(tokens) {
  const tailwindConfigPath = path.join(__dirname, '../../tailwind.config.js');

  // Read current config
  let config = fs.readFileSync(tailwindConfigPath, 'utf8');

  // Update colors section
  const colorsSection = `colors: {
      'etax-primary': '${tokens.colors.primary}',
      'etax-secondary': '${tokens.colors.secondary}',
      'etax-warning': '${tokens.colors.warning}',
      'etax-error': '${tokens.colors.error}',
      'etax-background': '${tokens.colors.background}',
      'etax-surface': '${tokens.colors.surface}',
      'etax-text': '${tokens.colors.text.primary}',
      'etax-text-secondary': '${tokens.colors.text.secondary}',
      'etax-border': '${tokens.colors.border}',
      // Legacy colors for backward compatibility
      'primary': '#007AFF',
      'secondary': '#34C759',
      'warning': '#FF9500',
      'error': '#FF3B30',
      'background': '#F2F2F7',
      'surface': '#FFFFFF',
      'text': '#000000',
      'text-secondary': '#8E8E93',
      'border': '#C6C6C8'
    }`;

  config = config.replace(
    /colors:\s*{[\s\S]*?}/,
    colorsSection
  );

  // Update fontFamily section
  const fontFamilySection = `fontFamily: {
      'sf-pro': ['SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      'sans': ['SF Pro Text', 'system-ui', 'sans-serif'],
      'display': ['SF Pro Display', 'system-ui', 'sans-serif']
    }`;

  config = config.replace(
    /fontFamily:\s*{[\s\S]*?}/,
    fontFamilySection
  );

  // Write updated config
  fs.writeFileSync(tailwindConfigPath, config);
}

// Run script
updateComponents();


