#!/bin/bash

# Script chụp ảnh visual baseline cho 5 màn hình chính
# Sử dụng Chrome headless thay vì Puppeteer

echo "🎯 Bắt đầu chụp ảnh baseline..."

# Tạo thư mục output
mkdir -p artifacts/visual-diff/baseline

# 5 màn hình chính
screens=("Dashboard:/dashboard" "ThongBao:/thongbao" "Login:/" "TraCuu:/tracuu" "HoaDonDT:/hoadondt")

# 3 viewport
viewports=("360:640" "390:844" "414:896")

# Kiểm tra Chrome có sẵn không
if ! command -v google-chrome &> /dev/null; then
    echo "❌ Chrome không tìm thấy. Cài đặt Chrome..."
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
    sudo apt-get update
    sudo apt-get install -y google-chrome-stable
fi

# Chụp ảnh cho từng màn hình và viewport
for screen_info in "${screens[@]}"; do
    IFS=':' read -r screen_name screen_route <<< "$screen_info"
    
    for viewport_info in "${viewports[@]}"; do
        IFS=':' read -r width height <<< "$viewport_info"
        
        echo "📸 Chụp ${screen_name} - ${width}px..."
        
        # Chụp ảnh với Chrome headless
        google-chrome \
            --headless \
            --disable-gpu \
            --no-sandbox \
            --disable-dev-shm-usage \
            --window-size=${width},${height} \
            --screenshot=artifacts/visual-diff/baseline/${screen_name}_${width}.png \
            "http://localhost:5173${screen_route}" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Đã lưu: ${screen_name}_${width}.png"
        else
            echo "❌ Lỗi chụp ${screen_name}_${width}"
        fi
        
        sleep 1
    done
done

echo "🎉 Hoàn thành chụp ảnh baseline!"
