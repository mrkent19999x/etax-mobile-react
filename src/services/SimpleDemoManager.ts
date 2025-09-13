// Simple Demo Manager - Chỉ dùng localStorage, không database
export interface SimpleDemo {
  id: string;
  name: string;
  mst: string;
  company: string;
  token: string;
  created: string;
  expires: string;
  content: Record<string, string>;
}

export class SimpleDemoManager {
  private static STORAGE_KEY = 'simple_demos';

  // Tạo demo mới
  static createDemo(name: string, mst: string, company: string, days: number = 3): SimpleDemo {
    const token = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    const demo: SimpleDemo = {
      id: `demo_${Date.now()}`,
      name,
      mst,
      company,
      token,
      created: now.toISOString(),
      expires: expires.toISOString(),
      content: {
        user_name: name,
        user_mst: mst,
        company_name: company,
        tax_amount: '2,500,000 VNĐ',
        deadline: expires.toLocaleDateString('vi-VN'),
        phone: '0901234567',
        email: 'demo@example.com'
      }
    };

    this.saveDemo(demo);
    return demo;
  }

  // Lưu demo vào localStorage
  private static saveDemo(demo: SimpleDemo): void {
    const demos = this.getAllDemos();
    demos.push(demo);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(demos));
  }

  // Lấy tất cả demos
  static getAllDemos(): SimpleDemo[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Xác thực token
  static validateToken(token: string): SimpleDemo | null {
    const demos = this.getAllDemos();
    const demo = demos.find(d => d.token === token);
    
    if (!demo) return null;
    
    // Kiểm tra hết hạn
    const now = new Date();
    const expires = new Date(demo.expires);
    
    if (now > expires) {
      return null; // Hết hạn
    }
    
    return demo;
  }

  // Cập nhật nội dung
  static updateContent(token: string, content: Record<string, string>): boolean {
    const demos = this.getAllDemos();
    const demo = demos.find(d => d.token === token);
    
    if (demo) {
      demo.content = { ...demo.content, ...content };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(demos));
      return true;
    }
    
    return false;
  }

  // Xóa demo
  static deleteDemo(token: string): boolean {
    const demos = this.getAllDemos();
    const filtered = demos.filter(d => d.token !== token);
    
    if (filtered.length < demos.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    }
    
    return false;
  }

  // Dọn dẹp demos hết hạn
  static cleanupExpired(): number {
    const demos = this.getAllDemos();
    const now = new Date();
    const active = demos.filter(d => new Date(d.expires) > now);
    
    const removed = demos.length - active.length;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(active));
    return removed;
  }

  // Tạo URL demo
  static createURL(token: string): string {
    return `${window.location.origin}${window.location.pathname}?token=${token}`;
  }

  // Lấy thống kê
  static getStats() {
    const demos = this.getAllDemos();
    const now = new Date();
    
    return {
      total: demos.length,
      active: demos.filter(d => new Date(d.expires) > now).length,
      expired: demos.filter(d => new Date(d.expires) <= now).length
    };
  }
}