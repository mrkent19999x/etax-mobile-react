#!/bin/bash

# Lighthouse Audit Script cho eTax Mobile PWA
# Tác giả: Cirphe AI Assistant
# Ngày: 15/09/2025

echo "📊 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Bắt đầu Lighthouse audit - eTax Mobile PWA"

# Kiểm tra Lighthouse CLI
if ! command -v lighthouse &> /dev/null; then
    echo "🔧 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Cài đặt Lighthouse CLI..."
    npm install -g lighthouse
fi

# URL để test
URL="http://localhost:5173/etax-mobile-react/"
OUTPUT_DIR="./lighthouse-reports"

# Tạo thư mục reports
mkdir -p $OUTPUT_DIR

echo "🎯 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Chạy Lighthouse audit cho: $URL"

# Chạy Lighthouse audit
lighthouse $URL \
  --output=html,json \
  --output-path=$OUTPUT_DIR/etax-mobile-report \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --form-factor=mobile \
  --throttling-method=simulate \
  --throttling.cpuSlowdownMultiplier=4 \
  --throttling.rttMs=150 \
  --throttling.throughputKbps=1638.4 \
  --throttling.requestLatencyMs=150 \
  --throttling.downloadThroughputKbps=1638.4 \
  --throttling.uploadThroughputKbps=750 \
  --only-categories=performance,accessibility,best-practices,seo,pwa

# Kiểm tra kết quả
if [ $? -eq 0 ]; then
    echo "✅ [$(date '+%d/%m/%Y %H:%M:%S')] [SUCCESS] Lighthouse audit hoàn tất!"
    
    # Đọc kết quả từ JSON
    PERFORMANCE=$(cat $OUTPUT_DIR/etax-mobile-report.report.json | jq '.categories.performance.score * 100')
    ACCESSIBILITY=$(cat $OUTPUT_DIR/etax-mobile-report.report.json | jq '.categories.accessibility.score * 100')
    BEST_PRACTICES=$(cat $OUTPUT_DIR/etax-mobile-report.report.json | jq '.categories."best-practices".score * 100')
    SEO=$(cat $OUTPUT_DIR/etax-mobile-report.report.json | jq '.categories.seo.score * 100')
    PWA=$(cat $OUTPUT_DIR/etax-mobile-report.report.json | jq '.categories.pwa.score * 100')
    
    echo ""
    echo "📊 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Kết quả Lighthouse Audit:"
    echo "   🚀 Performance: ${PERFORMANCE}%"
    echo "   ♿ Accessibility: ${ACCESSIBILITY}%"
    echo "   ✅ Best Practices: ${BEST_PRACTICES}%"
    echo "   🔍 SEO: ${SEO}%"
    echo "   📱 PWA: ${PWA}%"
    
    # Kiểm tra target scores
    TARGET_SCORE=95
    ALL_PASSED=true
    
    if (( $(echo "$PERFORMANCE < $TARGET_SCORE" | bc -l) )); then
        echo "❌ Performance dưới target ($TARGET_SCORE%)"
        ALL_PASSED=false
    fi
    
    if (( $(echo "$ACCESSIBILITY < $TARGET_SCORE" | bc -l) )); then
        echo "❌ Accessibility dưới target ($TARGET_SCORE%)"
        ALL_PASSED=false
    fi
    
    if (( $(echo "$BEST_PRACTICES < $TARGET_SCORE" | bc -l) )); then
        echo "❌ Best Practices dưới target ($TARGET_SCORE%)"
        ALL_PASSED=false
    fi
    
    if (( $(echo "$SEO < $TARGET_SCORE" | bc -l) )); then
        echo "❌ SEO dưới target ($TARGET_SCORE%)"
        ALL_PASSED=false
    fi
    
    if (( $(echo "$PWA < $TARGET_SCORE" | bc -l) )); then
        echo "❌ PWA dưới target ($TARGET_SCORE%)"
        ALL_PASSED=false
    fi
    
    echo ""
    if [ "$ALL_PASSED" = true ]; then
        echo "🎉 [$(date '+%d/%m/%Y %H:%M:%S')] [SUCCESS] Tất cả scores đạt target ≥$TARGET_SCORE%!"
        echo "✨ [$(date '+%d/%m/%Y %H:%M:%S')] [SUCCESS] eTax Mobile PWA sẵn sàng production!"
    else
        echo "⚠️ [$(date '+%d/%m/%Y %H:%M:%S')] [WARNING] Một số scores chưa đạt target"
        echo "🔧 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Cần tối ưu thêm để đạt target"
    fi
    
    echo ""
    echo "📁 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Báo cáo chi tiết:"
    echo "   HTML: $OUTPUT_DIR/etax-mobile-report.report.html"
    echo "   JSON: $OUTPUT_DIR/etax-mobile-report.report.json"
    
else
    echo "❌ [$(date '+%d/%m/%Y %H:%M:%S')] [ERROR] Lighthouse audit thất bại"
    exit 1
fi

echo ""
echo "🚀 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Lighthouse audit completed - Cirphe AI Assistant"