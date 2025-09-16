import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 5 màn hình chính cần chụp
const screens = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'ThongBao', route: '/thongbao' },
  { name: 'Login', route: '/' },
  { name: 'TraCuu', route: '/tracuu' },
  { name: 'HoaDonDT', route: '/hoadondt' }
];

// 3 viewport cần test
const viewports = [
  { width: 360, height: 640, name: '360' },
  { width: 390, height: 844, name: '390' },
  { width: 414, height: 896, name: '414' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Tạo thư mục output
  const outputDir = path.join(__dirname, '../artifacts/visual-diff/baseline');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🎯 Bắt đầu chụp ảnh baseline...');
  
  for (const screen of screens) {
    for (const viewport of viewports) {
      try {
        console.log(`📸 Chụp ${screen.name} - ${viewport.name}px...`);
        
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
          deviceScaleFactor: 2 // Retina quality
        });
        
        // Navigate to screen
        await page.goto(`http://localhost:5173${screen.route}`, {
          waitUntil: 'networkidle0',
          timeout: 10000
        });
        
        // Wait for content to load
        await page.waitForTimeout(2000);
        
        // Take screenshot
        const filename = `${screen.name}_${viewport.name}.png`;
        const filepath = path.join(outputDir, filename);
        
        await page.screenshot({
          path: filepath,
          fullPage: true,
          type: 'png'
        });
        
        console.log(`✅ Đã lưu: ${filename}`);
        
      } catch (error) {
        console.error(`❌ Lỗi chụp ${screen.name} - ${viewport.name}:`, error.message);
      }
    }
  }
  
  await browser.close();
  console.log('🎉 Hoàn thành chụp ảnh baseline!');
}

// Chạy script
captureScreenshots().catch(console.error);
