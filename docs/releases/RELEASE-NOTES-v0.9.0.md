# Release Notes v0.9.0 - Platform Stabilization & Visual Parity

**Ngày phát hành**: 16/09/2025  
**Loại**: Bản phát hành nội bộ - Ổn định nền tảng

## 🎯 Tổng quan
Bản phát hành v0.9.0 đánh dấu sự hoàn thiện của giai đoạn "ổn định nền tảng" với visual parity cao và kỷ luật kỹ thuật nghiêm ngặt.

## 📊 Số liệu then chốt

• **Visual parity**: ~99% trên 5 màn hình × 3 viewport (360/390/414)  
• **Figma reuse**: 82.8% (≥80% gate) - code bám chặt hệ thiết kế  
• **Lint**: 0/0, Build: PASS, CI main: PASS (3 job)  
• **Hooks**: pre-commit STRICT, pre-push dry-run, không treo  
• **Fix "diff-timeout"**: `.cursorignore` loại trừ `artifacts/**`, `dist/**`, `node_modules/**`, `logs/**`  
• **Mapping contract & parser**: đã đồng bộ, top offenders được remap  
• **Artefacts**: 
  - `artifacts/visual-diff/…` (15 ảnh before/after, report.csv)  
  - `artifacts/reuse_breakdown_after.csv` & `reuse-report.json (82.8%)`  
• **Ảnh hưởng người dùng**: giao diện nhất quán, không tràn ngang, chuẩn bị sẵn cho dark mode/brand  
• **Công việc tiếp theo**: theo dõi CI, tối ưu hiệu năng  

## 🔗 Liên kết artifacts
- [Visual Diff Report](./artifacts/visual-diff/reports/visual-report.csv)
- [Reuse Breakdown](./artifacts/reuse_breakdown_after.csv)
- [Reuse Report](./artifacts/reuse-report.json)
- [Process Log](./process.md)

## 🚀 Công việc tiếp theo
- Theo dõi CI stability trên main branch
- Tối ưu hiệu năng và bundle size
- Chuẩn bị cho giai đoạn tối ưu hiệu năng & theo dõi
