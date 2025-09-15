# Lighthouse Audit Script cho eTax Mobile PWA (PowerShell)
# Tác giả: Cirphe AI Assistant
# Ngày: 15/09/2025

Write-Host "📊 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Bắt đầu Lighthouse audit - eTax Mobile PWA" -ForegroundColor Blue

# Kiểm tra Lighthouse CLI
if (-not (Get-Command lighthouse -ErrorAction SilentlyContinue)) {
    Write-Host "🔧 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Cài đặt Lighthouse CLI..." -ForegroundColor Yellow
    npm install -g lighthouse
}

# URL để test
$URL = "http://localhost:5173/etax-mobile-react/"
$OUTPUT_DIR = "./lighthouse-reports"

# Tạo thư mục reports
if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR
}

Write-Host "🎯 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Chạy Lighthouse audit cho: $URL" -ForegroundColor Blue

# Chạy Lighthouse audit
$lighthouseArgs = @(
    $URL,
    "--output=html,json",
    "--output-path=$OUTPUT_DIR/etax-mobile-report",
    "--chrome-flags=--headless --no-sandbox --disable-gpu",
    "--form-factor=mobile",
    "--throttling-method=simulate",
    "--throttling.cpuSlowdownMultiplier=4",
    "--throttling.rttMs=150",
    "--throttling.throughputKbps=1638.4",
    "--throttling.requestLatencyMs=150",
    "--throttling.downloadThroughputKbps=1638.4",
    "--throttling.uploadThroughputKbps=750",
    "--only-categories=performance,accessibility,best-practices,seo,pwa"
)

try {
    & lighthouse $lighthouseArgs
    
    Write-Host "✅ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [SUCCESS] Lighthouse audit hoàn tất!" -ForegroundColor Green
    
    # Đọc kết quả từ JSON
    $jsonPath = "$OUTPUT_DIR/etax-mobile-report.report.json"
    if (Test-Path $jsonPath) {
        $report = Get-Content $jsonPath | ConvertFrom-Json
        
        $PERFORMANCE = [math]::Round($report.categories.performance.score * 100, 1)
        $ACCESSIBILITY = [math]::Round($report.categories.accessibility.score * 100, 1)
        $BEST_PRACTICES = [math]::Round($report.categories.'best-practices'.score * 100, 1)
        $SEO = [math]::Round($report.categories.seo.score * 100, 1)
        $PWA = [math]::Round($report.categories.pwa.score * 100, 1)
        
        Write-Host ""
        Write-Host "📊 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Kết quả Lighthouse Audit:" -ForegroundColor Blue
        Write-Host "   🚀 Performance: $PERFORMANCE%" -ForegroundColor White
        Write-Host "   ♿ Accessibility: $ACCESSIBILITY%" -ForegroundColor White
        Write-Host "   ✅ Best Practices: $BEST_PRACTICES%" -ForegroundColor White
        Write-Host "   🔍 SEO: $SEO%" -ForegroundColor White
        Write-Host "   📱 PWA: $PWA%" -ForegroundColor White
        
        # Kiểm tra target scores
        $TARGET_SCORE = 95
        $ALL_PASSED = $true
        
        if ($PERFORMANCE -lt $TARGET_SCORE) {
            Write-Host "❌ Performance dưới target ($TARGET_SCORE%)" -ForegroundColor Red
            $ALL_PASSED = $false
        }
        
        if ($ACCESSIBILITY -lt $TARGET_SCORE) {
            Write-Host "❌ Accessibility dưới target ($TARGET_SCORE%)" -ForegroundColor Red
            $ALL_PASSED = $false
        }
        
        if ($BEST_PRACTICES -lt $TARGET_SCORE) {
            Write-Host "❌ Best Practices dưới target ($TARGET_SCORE%)" -ForegroundColor Red
            $ALL_PASSED = $false
        }
        
        if ($SEO -lt $TARGET_SCORE) {
            Write-Host "❌ SEO dưới target ($TARGET_SCORE%)" -ForegroundColor Red
            $ALL_PASSED = $false
        }
        
        if ($PWA -lt $TARGET_SCORE) {
            Write-Host "❌ PWA dưới target ($TARGET_SCORE%)" -ForegroundColor Red
            $ALL_PASSED = $false
        }
        
        Write-Host ""
        if ($ALL_PASSED) {
            Write-Host "🎉 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [SUCCESS] Tất cả scores đạt target ≥$TARGET_SCORE%!" -ForegroundColor Green
            Write-Host "✨ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [SUCCESS] eTax Mobile PWA sẵn sàng production!" -ForegroundColor Green
        } else {
            Write-Host "⚠️ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [WARNING] Một số scores chưa đạt target" -ForegroundColor Yellow
            Write-Host "🔧 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Cần tối ưu thêm để đạt target" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "📁 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Báo cáo chi tiết:" -ForegroundColor Blue
        Write-Host "   HTML: $OUTPUT_DIR/etax-mobile-report.report.html" -ForegroundColor White
        Write-Host "   JSON: $OUTPUT_DIR/etax-mobile-report.report.json" -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [ERROR] Lighthouse audit thất bại: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Lighthouse audit completed - Cirphe AI Assistant" -ForegroundColor Blue