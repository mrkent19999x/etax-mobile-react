#!/bin/bash

# Script kiểm tra Figma reuse percentage
# Usage: bash scripts/check-figma-multi.sh <repo_path> <min_percentage>

set -e

REPO_PATH=${1:-.}
MIN_PERCENTAGE=${2:-80}

echo "🔍 [CI] Checking Figma reuse percentage..."
echo "📁 Repo path: $REPO_PATH"
echo "📊 Min percentage: $MIN_PERCENTAGE%"

# Kiểm tra file figma-multi.json có tồn tại không
if [ ! -f "$REPO_PATH/artifacts/figma-multi.json" ]; then
    echo "❌ [ERROR] File artifacts/figma-multi.json not found!"
    echo "💡 [HINT] Run 'node scripts/patch-v3-analysis.js' first to generate analysis"
    exit 1
fi

# Kiểm tra file reuse-report.json có tồn tại không
if [ ! -f "$REPO_PATH/artifacts/reuse-report.json" ]; then
    echo "❌ [ERROR] File artifacts/reuse-report.json not found!"
    echo "💡 [HINT] Run 'node scripts/patch-v3-analysis.js' first to generate analysis"
    exit 1
fi

# Đọc overall reuse percentage từ reuse-report.json
OVERALL_REUSE=$(node -e "
const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('$REPO_PATH/artifacts/reuse-report.json', 'utf8'));
  console.log(data.overall_reuse || 0);
} catch (error) {
  console.log(0);
}
")

echo "📊 [INFO] Current overall reuse: ${OVERALL_REUSE}%"

# Kiểm tra nếu reuse percentage đạt yêu cầu (sử dụng Node.js thay vì bc)
if node -e "console.log(process.argv[1] >= process.argv[2] ? 'PASS' : 'FAIL')" "$OVERALL_REUSE" "$MIN_PERCENTAGE" | grep -q "PASS"; then
    echo "✅ [SUCCESS] Figma reuse ${OVERALL_REUSE}% >= ${MIN_PERCENTAGE}% (PASS)"
    exit 0
else
    echo "❌ [FAIL] Figma reuse ${OVERALL_REUSE}% < ${MIN_PERCENTAGE}% (FAIL)"
    echo "💡 [HINT] Improve token reuse by adding more design tokens to tailwind.config.js"
    exit 1
fi
