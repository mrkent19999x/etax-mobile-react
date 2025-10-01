#!/bin/bash

# Cursor Agent Learning Hub - Vietnamese Language Configuration Script
# Email: begau1302@gmail.com
# Ultimate Assistant Configuration

echo "🇻🇳 Cursor Agent Learning Hub - Vietnamese Language Configuration"
echo "📧 Email: begau1302@gmail.com"
echo ""

# Check if running in correct directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the repository root directory"
    exit 1
fi

echo "✅ Repository structure verified"
echo ""

# Create Vietnamese language configuration
echo "🇻🇳 Creating Vietnamese language configuration..."

# Create Vietnamese language config file
cat > configs/vietnamese-language-config.json << 'EOF'
{
  "language": {
    "default": "vi",
    "supported": ["vi", "en", "zh", "ja", "ko"],
    "culturalContext": {
      "vietnam": {
        "enabled": true,
        "dateFormat": "dd/MM/yyyy",
        "currency": "VND",
        "timezone": "Asia/Ho_Chi_Minh",
        "businessFormality": "Kính chào anh/chị",
        "technicalTerms": {
          "algorithm": "Thuật toán",
          "database": "Cơ sở dữ liệu",
          "framework": "Framework",
          "deployment": "Triển khai",
          "architecture": "Kiến trúc",
          "monitoring": "Giám sát",
          "automation": "Tự động hóa",
          "integration": "Tích hợp",
          "optimization": "Tối ưu hóa",
          "management": "Quản lý",
          "strategy": "Chiến lược",
          "compliance": "Tuân thủ",
          "governance": "Quản trị",
          "performance": "Hiệu suất",
          "revenue": "Doanh thu",
          "profit": "Lợi nhuận",
          "customer": "Khách hàng",
          "market": "Thị trường",
          "competition": "Cạnh tranh",
          "product": "Sản phẩm",
          "service": "Dịch vụ",
          "cost": "Chi phí"
        }
      }
    }
  },
  "vietnameseAccuracy": {
    "target": "98%+",
    "warning": "<95%",
    "critical": "<90%"
  },
  "businessTerminology": {
    "enabled": true,
    "accuracy": "95%+",
    "formality": "Professional"
  },
  "culturalContext": {
    "enabled": true,
    "accuracy": "90%+",
    "awareness": "High"
  }
}
EOF

echo "✅ Vietnamese language configuration created"
echo ""

# Create Vietnamese prompts directory
echo "📝 Creating Vietnamese prompts directory..."
mkdir -p examples/vietnamese-prompts

# Create Vietnamese business prompts
cat > examples/vietnamese-prompts/business-prompts.md << 'EOF'
# Vietnamese Business Prompts

## Quản lý dự án
- "Phân tích tình hình dự án và đưa ra recommendations"
- "Tạo báo cáo quản lý với executive summary"
- "Đánh giá rủi ro và đề xuất mitigation strategies"

## Phân tích kinh doanh
- "Phân tích performance metrics và KPIs"
- "Đưa ra insights về market trends"
- "Tạo business intelligence report"

## Tuân thủ và quản trị
- "Kiểm tra compliance với các tiêu chuẩn"
- "Đánh giá governance framework"
- "Tạo audit report"

## Tối ưu hóa quy trình
- "Phân tích workflow và đề xuất improvements"
- "Tự động hóa các quy trình lặp lại"
- "Tối ưu hóa resource allocation"
EOF

echo "✅ Vietnamese business prompts created"
echo ""

# Create Vietnamese management templates
cat > examples/vietnamese-prompts/management-templates.md << 'EOF'
# Vietnamese Management Templates

## Báo cáo quản lý
```
## Báo cáo Quản lý - [Tên dự án]

### Tóm tắt điều hành
- **Tình hình hiện tại**: [Mô tả ngắn gọn]
- **Kết quả chính**: [Các metrics quan trọng]
- **Rủi ro**: [Các rủi ro cần chú ý]

### Phân tích chi tiết
- **Performance**: [Phân tích hiệu suất]
- **Cost**: [Phân tích chi phí]
- **Timeline**: [Tiến độ dự án]

### Recommendations
- **Action Items**: [Các hành động cần thực hiện]
- **Next Steps**: [Bước tiếp theo]
- **Resource Requirements**: [Yêu cầu tài nguyên]
```

## Phân tích kiến trúc
```
## Phân tích Kiến trúc - [Tên hệ thống]

### Tổng quan
- **Architecture Pattern**: [Mô hình kiến trúc]
- **Technology Stack**: [Công nghệ sử dụng]
- **Scalability**: [Khả năng mở rộng]

### Đánh giá
- **Strengths**: [Điểm mạnh]
- **Weaknesses**: [Điểm yếu]
- **Opportunities**: [Cơ hội]
- **Threats**: [Thách thức]

### Recommendations
- **Improvements**: [Cải tiến đề xuất]
- **Best Practices**: [Thực hành tốt nhất]
- **Migration Strategy**: [Chiến lược di chuyển]
```
EOF

echo "✅ Vietnamese management templates created"
echo ""

# Create Vietnamese compliance rules
cat > examples/vietnamese-prompts/compliance-rules.md << 'EOF'
# Vietnamese Compliance Rules

## Quy tắc ngôn ngữ
- Luôn sử dụng tiếng Việt trừ khi được yêu cầu khác
- Sử dụng thuật ngữ kinh doanh chuyên nghiệp
- Tránh các từ ngữ tiếp thị cường điệu
- Tập trung vào kết quả quản lý

## Quy tắc nội dung
- Cung cấp executive summary cho báo cáo dài
- Sử dụng metrics và KPIs khi có thể
- Đề xuất action items và next steps
- Tuân thủ cấu trúc tài liệu chuẩn

## Quy tắc tuân thủ
- Không chia sẻ thông tin nhạy cảm
- Sử dụng environment variables cho API keys
- Kiểm tra permissions trước khi thực thi
- Log tất cả các hoạt động quan trọng

## Quy tắc hiệu suất
- Response time target: <2s
- Accuracy target: 95%+
- Vietnamese accuracy target: 98%+
- User satisfaction target: 4.5/5
EOF

echo "✅ Vietnamese compliance rules created"
echo ""

# Update environment variables for Vietnamese
echo "🌍 Updating environment variables for Vietnamese..."
if [ -f ".env" ]; then
    # Add Vietnamese configuration to .env
    cat >> .env << 'EOF'

# Vietnamese Language Configuration
CURSOR_DEFAULT_LANGUAGE=vi
CURSOR_CULTURAL_CONTEXT=vietnam
CURSOR_DATE_FORMAT=dd/MM/yyyy
CURSOR_CURRENCY=VND
CURSOR_TIMEZONE=Asia/Ho_Chi_Minh

# Vietnamese Accuracy Targets
VIETNAMESE_ACCURACY_TARGET=98
VIETNAMESE_ACCURACY_WARNING=95
VIETNAMESE_ACCURACY_CRITICAL=90

# Business Terminology
BUSINESS_TERMINOLOGY_ENABLED=true
BUSINESS_TERMINOLOGY_ACCURACY=95
BUSINESS_FORMALITY=Professional

# Cultural Context
CULTURAL_CONTEXT_ENABLED=true
CULTURAL_CONTEXT_ACCURACY=90
CULTURAL_AWARENESS=High
EOF
    echo "✅ Environment variables updated for Vietnamese"
else
    echo "❌ Error: .env file not found"
    exit 1
fi

echo ""

# Create Vietnamese test prompts
echo "🧪 Creating Vietnamese test prompts..."
cat > examples/vietnamese-prompts/test-prompts.md << 'EOF'
# Vietnamese Test Prompts

## Test 1: Quản lý dự án
"Phân tích tình hình dự án React hiện tại và đưa ra recommendations để cải thiện performance và maintainability."

## Test 2: Phân tích kinh doanh
"Tạo báo cáo quản lý về hiệu suất của team development trong tháng qua, bao gồm metrics về productivity, quality, và cost."

## Test 3: Tuân thủ và quản trị
"Kiểm tra compliance của codebase với các coding standards và đề xuất improvements để đảm bảo quality."

## Test 4: Tối ưu hóa quy trình
"Phân tích workflow hiện tại của development process và đề xuất automation opportunities để tăng efficiency."

## Test 5: Phân tích kiến trúc
"Đánh giá kiến trúc của hệ thống microservices và đưa ra recommendations để cải thiện scalability và reliability."
EOF

echo "✅ Vietnamese test prompts created"
echo ""

# Verify Vietnamese configuration
echo "🔍 Verifying Vietnamese configuration..."
echo ""

# Check if Vietnamese config file exists
if [ -f "configs/vietnamese-language-config.json" ]; then
    echo "✅ Vietnamese language config: configs/vietnamese-language-config.json"
else
    echo "❌ Vietnamese language config: Missing"
fi

# Check if Vietnamese prompts directory exists
if [ -d "examples/vietnamese-prompts" ]; then
    echo "✅ Vietnamese prompts directory: examples/vietnamese-prompts"
else
    echo "❌ Vietnamese prompts directory: Missing"
fi

# Check if Vietnamese prompts files exist
if [ -f "examples/vietnamese-prompts/business-prompts.md" ]; then
    echo "✅ Business prompts: examples/vietnamese-prompts/business-prompts.md"
else
    echo "❌ Business prompts: Missing"
fi

if [ -f "examples/vietnamese-prompts/management-templates.md" ]; then
    echo "✅ Management templates: examples/vietnamese-prompts/management-templates.md"
else
    echo "❌ Management templates: Missing"
fi

if [ -f "examples/vietnamese-prompts/compliance-rules.md" ]; then
    echo "✅ Compliance rules: examples/vietnamese-prompts/compliance-rules.md"
else
    echo "❌ Compliance rules: Missing"
fi

if [ -f "examples/vietnamese-prompts/test-prompts.md" ]; then
    echo "✅ Test prompts: examples/vietnamese-prompts/test-prompts.md"
else
    echo "❌ Test prompts: Missing"
fi

echo ""

# Check environment variables
echo "🌍 Checking environment variables..."
if grep -q "CURSOR_DEFAULT_LANGUAGE=vi" .env; then
    echo "✅ Default language: Vietnamese"
else
    echo "❌ Default language: Not set"
fi

if grep -q "CURSOR_CULTURAL_CONTEXT=vietnam" .env; then
    echo "✅ Cultural context: Vietnam"
else
    echo "❌ Cultural context: Not set"
fi

if grep -q "VIETNAMESE_ACCURACY_TARGET=98" .env; then
    echo "✅ Vietnamese accuracy target: 98%"
else
    echo "❌ Vietnamese accuracy target: Not set"
fi

echo ""

# Success message
echo "🎉 Vietnamese language configuration completed!"
echo ""
echo "📧 Email Configuration: begau1302@gmail.com"
echo "🇻🇳 Language: Vietnamese (98%+ accuracy target)"
echo "🌍 Cultural Context: Vietnam"
echo "💼 Business Terminology: Professional"
echo "📊 Management Focus: Enabled"
echo ""
echo "📚 Vietnamese resources created:"
echo "- Business prompts and templates"
echo "- Management templates"
echo "- Compliance rules"
echo "- Test prompts"
echo ""
echo "🚀 Vietnamese language support is ready!"
echo ""
echo "📚 Next steps:"
echo "1. Test Vietnamese prompts in examples/vietnamese-prompts/"
echo "2. Run ./scripts/configure-ultimate-assistant.sh"
echo "3. Start using Cursor Agent with Vietnamese support"
echo "4. Monitor Vietnamese accuracy metrics"
echo ""
echo "✨ Vietnamese language support configured successfully!"