import fs from 'fs';

// Đọc figma-multi.json để lấy dữ liệu nodes
const figmaData = JSON.parse(fs.readFileSync('./artifacts/figma-multi.json', 'utf8'));

// Typography aliases từ tailwind.config.js
const typographyAliases = {
  'heading-1': '1.875rem', // 30px
  'heading-2': '1.5rem',   // 24px
  'heading-3': '1.25rem',  // 20px
  'body-1': '1rem',        // 16px
  'body-2': '0.875rem',    // 14px
  'caption': '0.75rem'     // 12px
};

// Spacing scale từ tailwind.config.js
const spacingScale = ['4px', '8px', '16px', '24px', '32px', '48px', '1131px', '1184px', '2448px', '2560px'];

// Color palette từ tailwind.config.js
const colorPalette = [
  '#F2F2F7', '#FFFFFF', '#000000', '#8E8E93', '#C6C6C8',
  '#007AFF', '#34C759', '#FF9500', '#FF3B30', '#ffffff'
];

// Shadow levels từ tailwind.config.js
const shadowLevels = ['0 1px 2px rgba(0, 0, 0, 0.05)', '0 1px 3px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.1)', '0 10px 15px rgba(0, 0, 0, 0.1)'];

// Border radius levels từ tailwind.config.js
const radiusLevels = ['2px', '4px', '8px', '12px', '16px'];

// Kết quả audit
const auditResult = {
  fonts: [],
  spacing: [],
  colors: [],
  shadowRadius: [],
  sizes: []
};

// Hàm kiểm tra font size
function checkFontSize(node) {
  if (node.data.type === 'TEXT' && node.data.style && node.data.style.fontSize) {
    const fontSize = Math.round(node.data.style.fontSize);
    const fontSizeRem = `${fontSize / 16}rem`;
    
    // Kiểm tra xem có thuộc alias typography không
    const isInAliases = Object.values(typographyAliases).includes(fontSizeRem);
    
    if (!isInAliases) {
      auditResult.fonts.push({
        nodeName: node.data.name || 'Unnamed',
        fontSize: fontSize,
        fontSizeRem: fontSizeRem,
        issue: `fontSize = ${fontSize}px (${fontSizeRem}) – không thuộc alias typography`
      });
    }
  }
}

// Hàm kiểm tra spacing
function checkSpacing(node) {
  if (node.data.absoluteBoundingBox) {
    const { width, height } = node.data.absoluteBoundingBox;
    
    // Kiểm tra width/height có phải spacing chuẩn không
    if (width && width < 512) {
      const widthPx = `${width}px`;
      if (!spacingScale.includes(widthPx)) {
        auditResult.spacing.push({
          nodeName: node.data.name || 'Unnamed',
          value: widthPx,
          issue: `width = ${widthPx} – không phải bậc spacing chuẩn`
        });
      }
    }
    
    if (height && height < 512) {
      const heightPx = `${height}px`;
      if (!spacingScale.includes(heightPx)) {
        auditResult.spacing.push({
          nodeName: node.data.name || 'Unnamed',
          value: heightPx,
          issue: `height = ${heightPx} – không phải bậc spacing chuẩn`
        });
      }
    }
  }
}

// Hàm kiểm tra màu sắc
function checkColors(node) {
  // Kiểm tra backgroundColor
  if (node.data.backgroundColor) {
    const { r, g, b, a } = node.data.backgroundColor;
    const hexColor = `#${Math.round(r*255).toString(16).padStart(2, '0')}${Math.round(g*255).toString(16).padStart(2, '0')}${Math.round(b*255).toString(16).padStart(2, '0')}`;
    
    if (!colorPalette.includes(hexColor)) {
      auditResult.colors.push({
        nodeName: node.data.name || 'Unnamed',
        color: hexColor,
        issue: `backgroundColor = ${hexColor} – không trong token màu`
      });
    }
  }
  
  // Kiểm tra fill color
  if (node.data.fills && node.data.fills.length > 0) {
    node.data.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const hexColor = `#${Math.round(r*255).toString(16).padStart(2, '0')}${Math.round(g*255).toString(16).padStart(2, '0')}${Math.round(b*255).toString(16).padStart(2, '0')}`;
        
        if (!colorPalette.includes(hexColor)) {
          auditResult.colors.push({
            nodeName: node.data.name || 'Unnamed',
            color: hexColor,
            issue: `fill color = ${hexColor} – không trong token màu`
          });
        }
      }
    });
  }
}

// Hàm kiểm tra shadow và border radius
function checkShadowRadius(node) {
  // Kiểm tra border radius
  if (node.data.cornerRadius) {
    const radius = `${node.data.cornerRadius}px`;
    if (!radiusLevels.includes(radius)) {
      auditResult.shadowRadius.push({
        nodeName: node.data.name || 'Unnamed',
        value: radius,
        issue: `border-radius = ${radius} – không thuộc cấp chuẩn`
      });
    }
  }
  
  // Kiểm tra shadow
  if (node.data.effects) {
    node.data.effects.forEach(effect => {
      if (effect.type === 'DROP_SHADOW') {
        const shadowValue = `${effect.offset?.x || 0}px ${effect.offset?.y || 0}px ${effect.radius || 0}px rgba(0, 0, 0, ${effect.color?.a || 0.1})`;
        if (!shadowLevels.includes(shadowValue)) {
          auditResult.shadowRadius.push({
            nodeName: node.data.name || 'Unnamed',
            value: shadowValue,
            issue: `shadow = ${shadowValue} – không thuộc cấp chuẩn`
          });
        }
      }
    });
  }
}

// Hàm kiểm tra kích thước
function checkSizes(node) {
  if (node.data.absoluteBoundingBox) {
    const { width, height } = node.data.absoluteBoundingBox;
    
    // Kiểm tra width/height lẻ (không phải layout container)
    if (width && width > 100 && width < 1000) {
      if (width % 1 !== 0 || width % 2 !== 0) {
        auditResult.sizes.push({
          nodeName: node.data.name || 'Unnamed',
          dimension: 'width',
          value: `${width}px`,
          issue: `width = ${width}px – rất lẻ`
        });
      }
    }
    
    if (height && height > 100 && height < 1000) {
      if (height % 1 !== 0 || height % 2 !== 0) {
        auditResult.sizes.push({
          nodeName: node.data.name || 'Unnamed',
          dimension: 'height',
          value: `${height}px`,
          issue: `height = ${height}px – rất lẻ`
        });
      }
    }
  }
}

// Thực hiện audit cho tất cả nodes
console.log('🔍 [AUDIT] Bắt đầu audit UI cho tất cả nodes...');

figmaData.nodes.forEach(node => {
  checkFontSize(node);
  checkSpacing(node);
  checkColors(node);
  checkShadowRadius(node);
  checkSizes(node);
});

// Tạo báo cáo
const timestamp = new Date().toISOString();
const reportContent = `# UI Audit Report
**Timestamp**: ${timestamp}

## Font Size Inconsistencies
${auditResult.fonts.length > 0 ? auditResult.fonts.map(f => `- Node "${f.nodeName}": ${f.issue}`).join('\n') : '✅ Không có inconsistency về font size'}

## Spacing Issues
${auditResult.spacing.length > 0 ? auditResult.spacing.map(s => `- Node "${s.nodeName}": ${s.issue}`).join('\n') : '✅ Không có inconsistency về spacing'}

## Colors outside palette
${auditResult.colors.length > 0 ? auditResult.colors.map(c => `- Node "${c.nodeName}": ${c.issue}`).join('\n') : '✅ Không có inconsistency về màu sắc'}

## Shadow / Radius outliers
${auditResult.shadowRadius.length > 0 ? auditResult.shadowRadius.map(sr => `- Node "${sr.nodeName}": ${sr.issue}`).join('\n') : '✅ Không có inconsistency về shadow/radius'}

## Size irregularities
${auditResult.sizes.length > 0 ? auditResult.sizes.map(s => `- Node "${s.nodeName}": ${s.issue}`).join('\n') : '✅ Không có inconsistency về kích thước'}

## Tổng kết
- **Font inconsistencies**: ${auditResult.fonts.length}
- **Spacing issues**: ${auditResult.spacing.length}
- **Color issues**: ${auditResult.colors.length}
- **Shadow/Radius issues**: ${auditResult.shadowRadius.length}
- **Size issues**: ${auditResult.sizes.length}
- **Total issues**: ${auditResult.fonts.length + auditResult.spacing.length + auditResult.colors.length + auditResult.shadowRadius.length + auditResult.sizes.length}
`;

// Tạo thư mục docs nếu chưa có
if (!fs.existsSync('./docs')) {
  fs.mkdirSync('./docs', { recursive: true });
}

// Ghi file báo cáo
fs.writeFileSync('./docs/ui-report.md', reportContent);

// Lưu kết quả JSON
const jsonResult = {
  success: true,
  inconsistencies: auditResult,
  timestamp: timestamp,
  reportFile: 'docs/ui-report.md'
};

fs.writeFileSync('./artifacts/ui-audit-result.json', JSON.stringify(jsonResult, null, 2));

console.log('✅ [SUCCESS] Đã tạo UI audit report');
console.log('📊 [INFO] Font inconsistencies:', auditResult.fonts.length);
console.log('📊 [INFO] Spacing issues:', auditResult.spacing.length);
console.log('📊 [INFO] Color issues:', auditResult.colors.length);
console.log('📊 [INFO] Shadow/Radius issues:', auditResult.shadowRadius.length);
console.log('📊 [INFO] Size issues:', auditResult.sizes.length);
console.log('📄 [INFO] Report saved to: docs/ui-report.md');
