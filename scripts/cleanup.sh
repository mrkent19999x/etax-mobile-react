#!/bin/bash
# Auto-cleanup script for eTax Mobile React PWA
# Xóa file rác và di chuyển log hợp lệ vào ./logs/

echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Starting repo cleanup..."

# Tạo thư mục logs nếu chưa có
mkdir -p ./logs

# Đếm file trước khi cleanup
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files before cleanup:"
ls -la | grep -E '\.(bat|ps1|md|log)$' | wc -l

# Xóa file .bat, .ps1 trong root
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Removing .bat, .ps1 files..."
find . -maxdepth 1 -name '*.bat' -o -name '*.ps1' | while read file; do
    if [ -f "$file" ]; then
        echo "  Removing: $file"
        rm -f "$file"
    fi
done

# Xóa file .md rác trong root (trừ README.md, process.md)
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Removing stray .md files..."
find . -maxdepth 1 -name '*.md' | grep -v -E '(README\.md|process\.md)$' | while read file; do
    if [ -f "$file" ]; then
        echo "  Removing: $file"
        rm -f "$file"
    fi
done

# Di chuyển log hợp lệ vào ./logs/
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Moving log files to ./logs/..."
find . -maxdepth 1 -name '*.log' | while read file; do
    if [ -f "$file" ]; then
        echo "  Moving: $file -> ./logs/"
        mv "$file" ./logs/
    fi
done

# Di chuyển file .md rác vào ./temp/ (nếu có)
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Moving stray docs to ./temp/..."
mkdir -p ./temp
find . -maxdepth 1 -name '*.md' | grep -v -E '(README\.md|process\.md)$' | while read file; do
    if [ -f "$file" ]; then
        echo "  Moving: $file -> ./temp/"
        mv "$file" ./temp/
    fi
done

# Chỉ giữ docs chuẩn trong ./docs/generated/
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Ensuring docs structure..."
mkdir -p ./docs/generated

# Đếm file sau khi cleanup
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files after cleanup:"
ls -la | grep -E '\.(bat|ps1|md|log)$' | wc -l

echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Cleanup completed successfully!"
