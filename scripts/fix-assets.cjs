/**
 * Script sửa tất cả đường dẫn assets
 * Sử dụng: node scripts/fix-assets.cjs
 */

const fs = require('fs');
const path = require('path');

function fixAssets() {
  console.log('🔧 [INFO] Đang sửa đường dẫn assets...');

  // List of files to fix
  const filesToFix = [
    'src/pages/Login.tsx',
    'src/pages/Dashboard.tsx',
    'src/pages/ThongTin.tsx',
    'src/pages/ThongBao.tsx',
    'src/pages/TraCuu.tsx',
    'src/pages/NopThue.tsx',
    'src/pages/ThietLap.tsx'
  ];

  let fixedCount = 0;

  filesToFix.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        console.log(`📝 [INFO] Sửa ${filePath}...`);

        let content = fs.readFileSync(filePath, 'utf8');

        // Fix asset paths
        content = content.replace(/src="\/assets\//g, 'src="/etax-mobile-react/assets/');
        content = content.replace(/src="\/icons\//g, 'src="/etax-mobile-react/icons/');
        content = content.replace(/src="\/images\//g, 'src="/etax-mobile-react/images/');

        // Write updated content
        fs.writeFileSync(filePath, content);

        console.log(`✅ [SUCCESS] Đã sửa ${filePath}`);
        fixedCount++;
      } else {
        console.log(`⚠️ [WARNING] File không tồn tại: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ [ERROR] Lỗi sửa ${filePath}:`, error.message);
    }
  });

  console.log(`\n📊 [SUMMARY] Đã sửa ${fixedCount}/${filesToFix.length} files`);
  console.log('🔄 [INFO] Server sẽ tự động reload...');
}

// Run script
fixAssets();
