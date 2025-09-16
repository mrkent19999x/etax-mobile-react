const https = require('https');

const FIGMA_TOKEN = 'figd_SoL7TpDlnWOzey6a-OEFredFoBrKczd6_dnfITyd';
const USER_API_URL = 'https://api.figma.com/v1/me';

async function testFigmaAPI() {
  console.log('🔍 [INFO] Đang test kết nối Figma API...');

  try {
    const userData = await makeFigmaRequest(USER_API_URL);
    console.log('✅ [SUCCESS] Kết nối Figma API thành công!');
    console.log(`👤 [INFO] User: ${userData.handle}`);
    console.log(`🆔 [INFO] User ID: ${userData.id}`);
    console.log(`📧 [INFO] Email: ${userData.email}`);
    console.log(`🎨 [INFO] Profile URL: ${userData.img_url}`);
  } catch (error) {
    console.error('❌ [ERROR] Lỗi kết nối Figma API:', error.message);
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

testFigmaAPI();


