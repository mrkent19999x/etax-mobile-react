import fs from 'fs';

// Đọc reuse-report.json và figma-multi.json
const reuseReport = JSON.parse(fs.readFileSync('./artifacts/reuse-report.json', 'utf8'));
const figmaData = JSON.parse(fs.readFileSync('./artifacts/figma-multi.json', 'utf8'));

console.log('📊 [INFO] Current overall reuse:', reuseReport.overall_reuse + '%');
console.log('📊 [INFO] High reuse nodes (≥80%):', reuseReport.high_reuse_nodes);

// Phân tích chi tiết unmapped properties
const unmappedAnalysis = {
  colors: {},
  fontSize: {},
  lineHeight: {},
  spacing: {},
  width: {},
  height: {},
  radius: {},
  shadow: {}
};

// Quét từng node để thu thập unmapped properties
figmaData.nodes.forEach(node => {
  const nodeData = node.data;

  // Colors analysis
  if (nodeData.backgroundColor) {
    const { r, g, b, a } = nodeData.backgroundColor;
    const colorKey = `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
    unmappedAnalysis.colors[colorKey] = (unmappedAnalysis.colors[colorKey] || 0) + 1;
  }

  // Typography analysis
  if (nodeData.type === 'TEXT' && nodeData.style) {
    if (nodeData.style.fontSize) {
      const fontSize = Math.round(nodeData.style.fontSize);
      unmappedAnalysis.fontSize[fontSize] = (unmappedAnalysis.fontSize[fontSize] || 0) + 1;
    }
    if (nodeData.style.lineHeightPx) {
      const lineHeight = Math.round(nodeData.style.lineHeightPx * 100) / 100;
      unmappedAnalysis.lineHeight[lineHeight] = (unmappedAnalysis.lineHeight[lineHeight] || 0) + 1;
    }
  }

  // Dimensions analysis
  if (nodeData.absoluteBoundingBox) {
    const { width, height } = nodeData.absoluteBoundingBox;

    // Width analysis
    if (width && ![390, 844, 1242, 1131, 1184, 2448, 2560].includes(width)) {
      unmappedAnalysis.width[width] = (unmappedAnalysis.width[width] || 0) + 1;
    }

    // Height analysis
    if (height && ![390, 844, 2688, 1131, 1184, 2448, 2560].includes(height)) {
      unmappedAnalysis.height[height] = (unmappedAnalysis.height[height] || 0) + 1;
    }

    // Spacing analysis (smaller values)
    if (width && width < 512 && width > 0) {
      unmappedAnalysis.spacing[width] = (unmappedAnalysis.spacing[width] || 0) + 1;
    }
    if (height && height < 512 && height > 0) {
      unmappedAnalysis.spacing[height] = (unmappedAnalysis.spacing[height] || 0) + 1;
    }
  }

  // Radius analysis
  if (nodeData.cornerRadius && ![12, 16, 2, 4, 8].includes(nodeData.cornerRadius)) {
    unmappedAnalysis.radius[nodeData.cornerRadius] = (unmappedAnalysis.radius[nodeData.cornerRadius] || 0) + 1;
  }

  // Shadow analysis
  if (nodeData.effects) {
    nodeData.effects.forEach(effect => {
      if (effect.type === 'DROP_SHADOW') {
        const shadowKey = `${effect.offset?.x || 0}${effect.offset?.y || 0}${effect.radius || 0}`;
        unmappedAnalysis.shadow[shadowKey] = (unmappedAnalysis.shadow[shadowKey] || 0) + 1;
      }
    });
  }
});

// Lọc theo frequency rule (≥3 lần)
const frequentUnmapped = {};
Object.entries(unmappedAnalysis).forEach(([category, values]) => {
  frequentUnmapped[category] = {};
  Object.entries(values).forEach(([value, count]) => {
    if (count >= 3) {
      frequentUnmapped[category][value] = count;
    }
  });
});

// Lưu analysis
fs.writeFileSync('./artifacts/patch-v3-analysis.json', JSON.stringify({
  unmappedAnalysis,
  frequentUnmapped,
  summary: {
    totalUnmapped: Object.values(unmappedAnalysis).reduce((sum, group) => sum + Object.keys(group).length, 0),
    frequentUnmapped: Object.values(frequentUnmapped).reduce((sum, group) => sum + Object.keys(group).length, 0)
  }
}, null, 2));

console.log('✅ [SUCCESS] Đã tạo patch-v3-analysis.json');
console.log('📊 [INFO] Total unmapped properties:', Object.values(unmappedAnalysis).reduce((sum, group) => sum + Object.keys(group).length, 0));
console.log('📊 [INFO] Frequent unmapped (≥3):', Object.values(frequentUnmapped).reduce((sum, group) => sum + Object.keys(group).length, 0));

// In chi tiết từng category
Object.entries(frequentUnmapped).forEach(([category, values]) => {
  if (Object.keys(values).length > 0) {
    console.log(`📋 [INFO] ${category} (≥3):`, Object.keys(values).length, 'values');
  }
});
