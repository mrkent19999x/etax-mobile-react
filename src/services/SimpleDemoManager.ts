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
        // Thông tin cá nhân
        user_name: name,
        user_mst: mst,
        company_name: company,
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0901234567',
        email: 'demo@example.com',
        
        // Thông tin thuế
        tax_amount: '2,500,000 VNĐ',
        deadline: expires.toLocaleDateString('vi-VN'),
        tax_office: 'Cục Thuế TP.HCM',
        status: 'Hoạt động',
        registration_date: '01/01/2020',
        last_update: new Date().toLocaleDateString('vi-VN'),
        
        // Thông tin hồ sơ
        document_type: 'Khai thuế TNCN',
        document_number: 'KT-2025-001',
        document_status: 'Đã nộp',
        document_date: new Date().toLocaleDateString('vi-VN'),
        
        // Thông tin gia đình
        spouse_name: 'Nguyễn Thị B',
        spouse_relationship: 'Vợ/Chồng',
        child1_name: 'Nguyễn Văn C',
        child1_relationship: 'Con',
        child1_birth_year: '2010',
        
        // Thông tin tài chính
        monthly_income: '15,000,000 VNĐ',
        annual_income: '180,000,000 VNĐ',
        tax_deduction: '11,000,000 VNĐ',
        taxable_income: '169,000,000 VNĐ',
        
        // Thông tin liên hệ
        contact_person: 'Nguyễn Văn D',
        contact_phone: '0909876543',
        contact_email: 'contact@example.com',
        
        // Thông tin địa chỉ
        business_address: '456 Đường XYZ, Quận 2, TP.HCM',
        mailing_address: '789 Đường DEF, Quận 3, TP.HCM',
        
        // Thông tin pháp lý
        business_license: 'BL-2025-001',
        tax_code: 'TC-2025-001',
        registration_authority: 'Sở Kế hoạch và Đầu tư TP.HCM'
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