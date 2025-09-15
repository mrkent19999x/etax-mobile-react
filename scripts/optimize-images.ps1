# Image Optimization Script cho eTax Mobile PWA (PowerShell)
# Tác giả: Cirphe AI Assistant
# Ngày: 15/09/2025

Write-Host "🖼️ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Bắt đầu tối ưu ảnh - eTax Mobile PWA" -ForegroundColor Blue

# Tạo thư mục backup và optimized
if (-not (Test-Path "public/assets/backup")) {
    New-Item -ItemType Directory -Path "public/assets/backup" -Force
}
if (-not (Test-Path "public/assets/optimized")) {
    New-Item -ItemType Directory -Path "public/assets/optimized" -Force
}

# Backup ảnh gốc
Write-Host "📦 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Backup ảnh gốc..." -ForegroundColor Blue
$imageExtensions = @("*.png", "*.jpg", "*.jpeg")
foreach ($ext in $imageExtensions) {
    $images = Get-ChildItem -Path "public/assets" -Filter $ext
    foreach ($img in $images) {
        Copy-Item $img.FullName -Destination "public/assets/backup/" -Force
    }
}

# Đếm số ảnh
$totalImages = 0
foreach ($ext in $imageExtensions) {
    $count = (Get-ChildItem -Path "public/assets" -Filter $ext).Count
    $totalImages += $count
}
Write-Host "📊 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Tổng số ảnh: $totalImages" -ForegroundColor Blue

# Kiểm tra ImageMagick
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "🔧 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Cài đặt ImageMagick..." -ForegroundColor Yellow
    Write-Host "   Vui lòng cài đặt ImageMagick từ: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "   Hoặc sử dụng Chocolatey: choco install imagemagick" -ForegroundColor Yellow
}

# Kiểm tra WebP tools
if (-not (Get-Command cwebp -ErrorAction SilentlyContinue)) {
    Write-Host "🔧 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Cài đặt WebP tools..." -ForegroundColor Yellow
    Write-Host "   Vui lòng cài đặt WebP tools từ: https://developers.google.com/speed/webp/download" -ForegroundColor Yellow
    Write-Host "   Hoặc sử dụng Chocolatey: choco install webp" -ForegroundColor Yellow
}

# Tối ưu PNG
Write-Host "🎯 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Tối ưu PNG icons..." -ForegroundColor Blue
$pngImages = Get-ChildItem -Path "public/assets" -Filter "*.png"
foreach ($img in $pngImages) {
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)
    $dir = $img.DirectoryName
    
    Write-Host "  🖼️ Image: $filename - Tối ưu cho mobile" -ForegroundColor White
    
    # Nén PNG
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        try {
            magick $img.FullName -strip -quality 85 -define png:compression-level=6 "$dir/optimized/$filename.png"
        } catch {
            Write-Host "    ⚠️ Magick failed for $filename" -ForegroundColor Yellow
        }
    }
    
    # Tạo WebP version
    if (Get-Command cwebp -ErrorAction SilentlyContinue) {
        try {
            cwebp -q 85 -m 6 $img.FullName -o "$dir/optimized/$filename.webp"
        } catch {
            Write-Host "    ⚠️ WebP conversion failed for $filename" -ForegroundColor Yellow
        }
    }
}

# Tối ưu JPG
Write-Host "🎯 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Tối ưu JPG images..." -ForegroundColor Blue
$jpgImages = Get-ChildItem -Path "public/assets" -Filter "*.jpg"
$jpegImages = Get-ChildItem -Path "public/assets" -Filter "*.jpeg"
$allJpgImages = $jpgImages + $jpegImages

foreach ($img in $allJpgImages) {
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)
    $dir = $img.DirectoryName
    
    Write-Host "  🖼️ Image: $filename - Tối ưu JPG" -ForegroundColor White
    
    # Nén JPG
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        try {
            magick $img.FullName -strip -quality 85 -interlace JPEG "$dir/optimized/$filename.jpg"
        } catch {
            Write-Host "    ⚠️ Magick failed for $filename" -ForegroundColor Yellow
        }
    }
    
    # Tạo WebP version
    if (Get-Command cwebp -ErrorAction SilentlyContinue) {
        try {
            cwebp -q 85 -m 6 $img.FullName -o "$dir/optimized/$filename.webp"
        } catch {
            Write-Host "    ⚠️ WebP conversion failed for $filename" -ForegroundColor Yellow
        }
    }
}

# Tạo responsive images
Write-Host "📱 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Tạo responsive images..." -ForegroundColor Blue
$optimizedImages = Get-ChildItem -Path "public/assets/optimized" -Filter "*.png"
$optimizedImages += Get-ChildItem -Path "public/assets/optimized" -Filter "*.jpg"

foreach ($img in $optimizedImages) {
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)
    $ext = $img.Extension
    $dir = $img.DirectoryName
    
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        try {
            # Tạo các kích thước khác nhau
            magick $img.FullName -resize 50% "$dir/${filename}_sm$ext"
            magick $img.FullName -resize 75% "$dir/${filename}_md$ext"
            magick $img.FullName -resize 125% "$dir/${filename}_lg$ext"
        } catch {
            Write-Host "    ⚠️ Responsive images failed for $filename" -ForegroundColor Yellow
        }
    }
}

# Tính toán kích thước file
Write-Host "📊 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Tính toán kích thước file..." -ForegroundColor Blue

$originalSize = 0
$optimizedSize = 0

if (Test-Path "public/assets/backup") {
    $originalFiles = Get-ChildItem -Path "public/assets/backup" -Recurse -File
    foreach ($file in $originalFiles) {
        $originalSize += $file.Length
    }
}

if (Test-Path "public/assets/optimized") {
    $optimizedFiles = Get-ChildItem -Path "public/assets/optimized" -Recurse -File
    foreach ($file in $optimizedFiles) {
        $optimizedSize += $file.Length
    }
}

$originalSizeMB = [math]::Round($originalSize / 1MB, 1)
$optimizedSizeMB = [math]::Round($optimizedSize / 1MB, 1)

Write-Host ""
Write-Host "🎉 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [SUCCESS] Tối ưu ảnh hoàn tất!" -ForegroundColor Green
Write-Host "📊 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Kết quả:" -ForegroundColor Blue
Write-Host "   - Kích thước gốc: $originalSizeMB MB" -ForegroundColor White
Write-Host "   - Kích thước tối ưu: $optimizedSizeMB MB" -ForegroundColor White
Write-Host "   - Tổng số ảnh: $totalImages" -ForegroundColor White
Write-Host "   - Định dạng: PNG, JPG, WebP" -ForegroundColor White
Write-Host "   - Responsive: sm, md, lg sizes" -ForegroundColor White

Write-Host ""
Write-Host "🚀 [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [INFO] Cách sử dụng:" -ForegroundColor Blue
Write-Host "   1. Thay thế đường dẫn ảnh trong components" -ForegroundColor White
Write-Host "   2. Sử dụng WebP với fallback PNG/JPG" -ForegroundColor White
Write-Host "   3. Lazy loading cho ảnh ngoài viewport" -ForegroundColor White
Write-Host "   4. Preload ảnh quan trọng trong index.html" -ForegroundColor White

Write-Host ""
Write-Host "✨ [$(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')] [SUCCESS] Image optimization completed - Cirphe AI Assistant" -ForegroundColor Green