// Secure Demo Manager - Quản lý demo bảo mật
export interface SecureDemoLink {
  id: string;
  token: string;
  clientName: string;
  companyName: string;
  mst: string;
  created: string;
  expires: string;
  status: 'active' | 'expired' | 'revoked';
  accessCount: number;
  lastAccess: string;
  customContent: Record<string, string>;
  password?: string; // Password riêng cho từng demo
}

export class SecureDemoManager {
  private static STORAGE_KEY = 'secure_demo_links';
  private static ADMIN_PASSWORD = 'etax_admin_2025';

  // Tạo demo link mới với bảo mật
  static createSecureDemo(clientName: string, companyName: string, mst: string, days: number = 3): SecureDemoLink {
    const token = this.generateSecureToken();
    const now = new Date();
    const expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    const demoLink: SecureDemoLink = {
      id: `demo_${Date.now()}`,
      token,
      clientName,
      companyName,
      mst,
      created: now.toISOString(),
      expires: expires.toISOString(),
      status: 'active',
      accessCount: 0,
      lastAccess: '',
      customContent: {
        user_name: clientName,
        user_mst: mst,
        company_name: companyName,
        tax_amount: '2,500,000 VNĐ',
        deadline: expires.toLocaleDateString('vi-VN')
      }
    };

    this.saveDemoLink(demoLink);
    return demoLink;
  }

  // Tạo token bảo mật
  private static generateSecureToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `secure_${result}`;
  }

  // Lưu demo link
  private static saveDemoLink(demoLink: SecureDemoLink): void {
    const links = this.getAllDemoLinks();
    links.push(demoLink);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(links));
  }

  // Lấy tất cả demo links
  static getAllDemoLinks(): SecureDemoLink[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Xác thực demo token
  static validateDemoToken(token: string): SecureDemoLink | null {
    const links = this.getAllDemoLinks();
    const link = links.find(l => l.token === token);
    
    if (!link) return null;
    
    // Kiểm tra hết hạn
    const now = new Date();
    const expires = new Date(link.expires);
    
    if (now > expires || link.status === 'expired' || link.status === 'revoked') {
      return null;
    }

    // Cập nhật access count
    link.accessCount++;
    link.lastAccess = now.toISOString();
    this.updateDemoLink(link);
    
    return link;
  }

  // Cập nhật demo link
  static updateDemoLink(updatedLink: SecureDemoLink): void {
    const links = this.getAllDemoLinks();
    const index = links.findIndex(l => l.id === updatedLink.id);
    if (index !== -1) {
      links[index] = updatedLink;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(links));
    }
  }

  // Thu hồi demo link
  static revokeDemoLink(token: string): boolean {
    const links = this.getAllDemoLinks();
    const link = links.find(l => l.token === token);
    if (link) {
      link.status = 'revoked';
      this.updateDemoLink(link);
      return true;
    }
    return false;
  }

  // Xóa demo link hết hạn
  static cleanupExpiredLinks(): number {
    const links = this.getAllDemoLinks();
    const now = new Date();
    const activeLinks = links.filter(link => {
      const expires = new Date(link.expires);
      return now <= expires && link.status === 'active';
    });
    
    const removedCount = links.length - activeLinks.length;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activeLinks));
    return removedCount;
  }

  // Tạo URL demo
  static createDemoURL(token: string, baseURL: string = window.location.origin): string {
    return `${baseURL}/etax-mobile-react/?token=${token}`;
  }

  // Cập nhật nội dung tùy chỉnh
  static updateCustomContent(token: string, content: Record<string, string>): boolean {
    const links = this.getAllDemoLinks();
    const link = links.find(l => l.token === token);
    if (link) {
      link.customContent = { ...link.customContent, ...content };
      this.updateDemoLink(link);
      return true;
    }
    return false;
  }

  // Lấy thống kê
  static getStats() {
    const links = this.getAllDemoLinks();
    const now = new Date();
    
    return {
      total: links.length,
      active: links.filter(l => l.status === 'active' && new Date(l.expires) > now).length,
      expired: links.filter(l => l.status === 'expired' || new Date(l.expires) <= now).length,
      revoked: links.filter(l => l.status === 'revoked').length,
      totalAccess: links.reduce((sum, l) => sum + l.accessCount, 0)
    };
  }

  // Export dữ liệu
  static exportData(): string {
    const links = this.getAllDemoLinks();
    return JSON.stringify(links, null, 2);
  }

  // Import dữ liệu
  static importData(data: string): boolean {
    try {
      const links = JSON.parse(data);
      if (Array.isArray(links)) {
        localStorage.setItem(this.STORAGE_KEY, data);
        return true;
      }
    } catch (e) {
      console.error('Invalid data format');
    }
    return false;
  }
}