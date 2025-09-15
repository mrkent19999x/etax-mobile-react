#!/bin/bash

# Script tối ưu ảnh cho eTax Mobile PWA
# Tác giả: Cirphe AI Assistant
# Ngày: 15/09/2025

echo "🖼️ [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Bắt đầu tối ưu ảnh - eTax Mobile PWA"

# Tạo thư mục backup và optimized
mkdir -p public/assets/backup
mkdir -p public/assets/optimized

# Backup ảnh gốc
echo "📦 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Backup ảnh gốc..."
cp -r public/assets/*.png public/assets/backup/ 2>/dev/null || true
cp -r public/assets/*.jpg public/assets/backup/ 2>/dev/null || true
cp -r public/assets/*.jpeg public/assets/backup/ 2>/dev/null || true

# Đếm số ảnh
TOTAL_IMAGES=$(find public/assets -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l)
echo "📊 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Tổng số ảnh: $TOTAL_IMAGES"

# Cài đặt imagemagick nếu chưa có
if ! command -v convert &> /dev/null; then
    echo "🔧 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Cài đặt ImageMagick..."
    sudo apt update && sudo apt install -y imagemagick
fi

# Cài đặt webp tools nếu chưa có
if ! command -v cwebp &> /dev/null; then
    echo "🔧 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Cài đặt WebP tools..."
    sudo apt install -y webp
fi

# Tối ưu PNG (icons nhỏ)
echo "🎯 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Tối ưu PNG icons..."
find public/assets -name "*.png" -exec sh -c '
    file="$1"
    filename=$(basename "$file" .png)
    dir=$(dirname "$file")
    
    # Kiểm tra kích thước
    size=$(identify -format "%wx%h" "$file")
    width=$(echo $size | cut -dx -f1)
    height=$(echo $size | cut -dx -f2)
    
    if [ $width -le 64 ] && [ $height -le 64 ]; then
        echo "  📱 Icon: $filename ($size) - Tối ưu cho mobile"
        # Nén PNG cho icons
        convert "$file" -strip -quality 90 -define png:compression-level=9 "$dir/optimized/${filename}.png"
        # Tạo WebP version
        cwebp -q 90 -m 6 "$file" -o "$dir/optimized/${filename}.webp"
    else
        echo "  🖼️ Image: $filename ($size) - Tối ưu cho minh họa"
        # Nén PNG cho ảnh lớn
        convert "$file" -strip -quality 85 -define png:compression-level=6 "$dir/optimized/${filename}.png"
        # Tạo WebP version
        cwebp -q 85 -m 6 "$file" -o "$dir/optimized/${filename}.webp"
    fi
' _ {} \;

# Tối ưu JPG
echo "🎯 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Tối ưu JPG images..."
find public/assets -name "*.jpg" -o -name "*.jpeg" | while read file; do
    filename=$(basename "$file" .jpg)
    filename=$(basename "$filename" .jpeg)
    dir=$(dirname "$file")
    
    echo "  🖼️ Image: $filename - Tối ưu JPG"
    # Nén JPG
    convert "$file" -strip -quality 85 -interlace JPEG "$dir/optimized/${filename}.jpg"
    # Tạo WebP version
    cwebp -q 85 -m 6 "$file" -o "$dir/optimized/${filename}.webp"
done

# Tạo responsive images (multiple sizes)
echo "📱 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Tạo responsive images..."
find public/assets/optimized -name "*.png" -o -name "*.jpg" | while read file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    ext="${filename##*.}"
    dir=$(dirname "$file")
    
    # Tạo các kích thước khác nhau
    convert "$file" -resize 50% "$dir/${name}_sm.$ext"
    convert "$file" -resize 75% "$dir/${name}_md.$ext"
    convert "$file" -resize 125% "$dir/${name}_lg.$ext"
done

# Tính toán kích thước file
echo "📊 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Tính toán kích thước file..."
ORIGINAL_SIZE=$(du -sh public/assets/backup | cut -f1)
OPTIMIZED_SIZE=$(du -sh public/assets/optimized | cut -f1)

echo ""
echo "🎉 [$(date '+%d/%m/%Y %H:%M:%S')] [SUCCESS] Tối ưu ảnh hoàn tất!"
echo "📊 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Kết quả:"
echo "   - Kích thước gốc: $ORIGINAL_SIZE"
echo "   - Kích thước tối ưu: $OPTIMIZED_SIZE"
echo "   - Tổng số ảnh: $TOTAL_IMAGES"
echo "   - Định dạng: PNG, JPG, WebP"
echo "   - Responsive: sm, md, lg sizes"

echo ""
echo "🚀 [$(date '+%d/%m/%Y %H:%M:%S')] [INFO] Cách sử dụng:"
echo "   1. Thay thế đường dẫn ảnh trong components"
echo "   2. Sử dụng WebP với fallback PNG/JPG"
echo "   3. Lazy loading cho ảnh ngoài viewport"
echo "   4. Preload ảnh quan trọng trong index.html"

echo ""
echo "✨ [$(date '+%d/%m/%Y %H:%M:%S')] [SUCCESS] Image optimization completed - Cirphe AI Assistant"