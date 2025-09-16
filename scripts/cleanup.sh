#!/bin/bash
# Auto-cleanup script for eTax Mobile React PWA (DRY-RUN MODE)
# Chỉ in danh sách file dự định xóa, không xóa thật

echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Starting repo cleanup (DRY-RUN)..."

# Tạo thư mục logs nếu chưa có
mkdir -p ./logs

# Đếm file trước khi cleanup
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files before cleanup:"
ls -la | grep -E '\.(bat|ps1|md|log)$' | wc -l

# DRY-RUN: Chỉ in danh sách file .bat, .ps1 sẽ xóa
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files to remove (.bat, .ps1):"
find . -maxdepth 1 -name '*.bat' -o -name '*.ps1' | while read file; do
    if [ -f "$file" ]; then
        echo "  [DRY-RUN] Would remove: $file"
    fi
done

# DRY-RUN: Chỉ in danh sách file .md rác sẽ xóa
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files to remove (stray .md):"
find . -maxdepth 1 -name '*.md' | grep -v -E '(README\.md|process\.md)$' | while read file; do
    if [ -f "$file" ]; then
        echo "  [DRY-RUN] Would remove: $file"
    fi
done

# DRY-RUN: Chỉ in danh sách log sẽ di chuyển
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files to move to ./logs/:"
find . -maxdepth 1 -name '*.log' | while read file; do
    if [ -f "$file" ]; then
        echo "  [DRY-RUN] Would move: $file -> ./logs/"
    fi
done

# DRY-RUN: Chỉ in danh sách docs sẽ di chuyển
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files to move to ./temp/:"
find . -maxdepth 1 -name '*.md' | grep -v -E '(README\.md|process\.md)$' | while read file; do
    if [ -f "$file" ]; then
        echo "  [DRY-RUN] Would move: $file -> ./temp/"
    fi
done

# Chỉ giữ docs chuẩn trong ./docs/generated/
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Ensuring docs structure..."
mkdir -p ./docs/generated

# Đếm file sau khi cleanup (không thay đổi vì chỉ dry-run)
echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Files after cleanup (unchanged - dry-run):"
ls -la | grep -E '\.(bat|ps1|md|log)$' | wc -l

echo "[$(date '+%d/%m/%Y %H:%M:%S')] [CLEANUP] Dry-run completed! No files were actually modified."
