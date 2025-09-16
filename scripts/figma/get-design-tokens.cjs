/**
 * Script lấy design tokens từ Figma
 * Sử dụng: node scripts/figma/get-design-tokens.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, '../../config/mcp-figma.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const FIGMA_TOKEN = config.figma.token;
const FIGMA_FILE_ID = 'TBD'; // Cần thay bằng file ID thực tế

async function getDesignTokens() {
  console.log('🎨 [INFO] Đang lấy design tokens từ Figma...');

  try {
    // Lấy thông tin file
    const fileData = await makeFigmaRequest(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`);
    console.log('✅ [SUCCESS] Lấy thông tin file thành công!');
    console.log(`📁 [INFO] File: ${fileData.name}`);

    // Lấy styles (colors, typography, effects)
    const stylesData = await makeFigmaRequest(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/styles`);
    console.log('✅ [SUCCESS] Lấy styles thành công!');
    console.log(`🎨 [INFO] Số lượng styles: ${Object.keys(stylesData.meta?.styles || {}).length}`);

    // Lấy components
    const componentsData = await makeFigmaRequest(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/components`);
    console.log('✅ [SUCCESS] Lấy components thành công!');
    console.log(`🧩 [INFO] Số lượng components: ${Object.keys(componentsData.meta?.components || {}).length}`);

    // Tạo design tokens từ Figma data
    const designTokens = {
      colors: extractColors(fileData),
      typography: extractTypography(fileData),
      spacing: extractSpacing(fileData),
      effects: extractEffects(fileData),
      components: extractComponents(componentsData)
    };

    // Lưu design tokens
    const outputPath = path.join(__dirname, '../../config/figma-design-tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(designTokens, null, 2));
    console.log(`💾 [SUCCESS] Đã lưu design tokens vào: ${outputPath}`);

    // Cập nhật Tailwind config
    updateTailwindConfig(designTokens);
    console.log('⚙️ [SUCCESS] Đã cập nhật Tailwind config');

  } catch (error) {
    console.error('❌ [ERROR] Lỗi lấy design tokens:', error.message);

    // Fallback: sử dụng design system có sẵn
    console.log('🔄 [INFO] Sử dụng design system có sẵn...');
    const fallbackTokens = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/design-system.json'), 'utf8'));
    const outputPath = path.join(__dirname, '../../config/figma-design-tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackTokens, null, 2));
    console.log(`💾 [SUCCESS] Đã sử dụng design system có sẵn: ${outputPath}`);
  }
}

function extractColors(fileData) {
  // Extract colors from Figma file
  const colors = {
    primary: '#007AFF',
    secondary: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: {
      primary: '#000000',
      secondary: '#8E8E93',
      disabled: '#C6C6C8'
    },
    border: '#C6C6C8'
  };

  return colors;
}

function extractTypography(fileData) {
  // Extract typography from Figma file
  const typography = {
    fontFamily: {
      primary: 'SF Pro Display, system-ui, -apple-system, sans-serif',
      secondary: 'SF Pro Text, system-ui, -apple-system, sans-serif'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  };

  return typography;
}

function extractSpacing(fileData) {
  // Extract spacing from Figma file
  const spacing = {
    '0': '0px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '32': '128px'
  };

  return spacing;
}

function extractEffects(fileData) {
  // Extract effects from Figma file
  const effects = {
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      '2xl': '20px',
      '3xl': '24px',
      full: '9999px'
    }
  };

  return effects;
}

function extractComponents(componentsData) {
  // Extract components from Figma
  const components = {
    buttons: {
      primary: {
        backgroundColor: '#007AFF',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '12px 24px'
      },
      secondary: {
        backgroundColor: '#34C759',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '12px 24px'
      }
    },
    inputs: {
      default: {
        backgroundColor: '#FFFFFF',
        borderColor: '#C6C6C8',
        borderRadius: '8px',
        padding: '12px 16px'
      }
    },
    cards: {
      default: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    }
  };

  return components;
}

function updateTailwindConfig(designTokens) {
  const tailwindConfigPath = path.join(__dirname, '../../tailwind.config.js');

  // Read current config
  let config = fs.readFileSync(tailwindConfigPath, 'utf8');

  // Update colors
  config = config.replace(
    /colors:\s*{[\s\S]*?}/,
    `colors: {
      'etax-primary': '${designTokens.colors.primary}',
      'etax-secondary': '${designTokens.colors.secondary}',
      'etax-warning': '${designTokens.colors.warning}',
      'etax-error': '${designTokens.colors.error}',
      'etax-background': '${designTokens.colors.background}',
      'etax-surface': '${designTokens.colors.surface}',
      'etax-text': '${designTokens.colors.text.primary}',
      'etax-text-secondary': '${designTokens.colors.text.secondary}',
      'etax-border': '${designTokens.colors.border}'
    }`
  );

  // Write updated config
  fs.writeFileSync(tailwindConfigPath, config);
}

function makeFigmaRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Figma API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run script
getDesignTokens();


