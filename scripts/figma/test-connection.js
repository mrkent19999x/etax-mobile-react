/**
 * Script test kết nối Figma API
 * Sử dụng: node scripts/figma/test-connection.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, '../../config/mcp-figma.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const FIGMA_TOKEN = config.figma.token;
const USER_API_URL = 'https://api.figma.com/v1/me';

async function testFigmaAPI() {
  console.log('🔍 [INFO] Đang test kết nối Figma API...');
  console.log(`👤 [INFO] User: ${config.figma.user.handle}`);
  console.log(`📧 [INFO] Email: ${config.figma.user.email}`);

  try {
    const userData = await makeFigmaRequest(USER_API_URL);
    console.log('✅ [SUCCESS] Kết nối Figma API thành công!');
    console.log(`🆔 [INFO] User ID: ${userData.id}`);
    console.log(`🎨 [INFO] Profile URL: ${userData.img_url}`);

    // Update config with fresh data
    config.figma.user.id = userData.id;
    config.figma.user.handle = userData.handle;
    config.figma.user.email = userData.email;
    config.figma.user.profileUrl = userData.img_url;

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('💾 [INFO] Đã cập nhật config với thông tin mới');

  } catch (error) {
    console.error('❌ [ERROR] Lỗi kết nối Figma API:', error.message);
    process.exit(1);
  }
}

function makeFigmaRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Figma API error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run test
testFigmaAPI();


