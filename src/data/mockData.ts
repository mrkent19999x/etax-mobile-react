// Mock Data cho eTax Mobile PWA
// Tập trung tất cả dữ liệu giả lập tại đây để dễ chỉnh sửa

export interface User {
  id: string;
  mst: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  loginTime: string;
}

export interface TaxInfo {
  id: string;
  type: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'processing';
  dueDate: string;
  description: string;
  history: TaxHistory[];
}

export interface TaxHistory {
  id: string;
  date: string;
  action: string;
  amount?: number;
  status: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface AdminStats {
  totalUsers: number;
  totalDemoLinks: number;
  totalViews: number;
  activeUsers: number;
}

export interface DemoLink {
  id: string;
  token: string;
  url: string;
  expiresAt: string;
  createdAt: string;
  views: number;
  isActive: boolean;
}

export interface Placeholder {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'user' | 'tax' | 'system' | 'ui';
}

// ===== MOCK DATA =====

export const mockUser: User = {
  id: 'user_001',
  mst: '0123456789',
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan@email.com',
  phone: '0901234567',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  avatar: '/assets/avatar.png',
  loginTime: '2025-09-15T21:30:00Z'
};

export const mockTaxInfo: TaxInfo[] = [
  {
    id: 'tax_001',
    type: 'Thuế thu nhập cá nhân',
    amount: 2500000,
    status: 'pending',
    dueDate: '2025-09-30',
    description: 'Thuế TNCN tháng 8/2025',
    history: [
      {
        id: 'hist_001',
        date: '2025-09-01',
        action: 'Tạo tờ khai',
        status: 'completed'
      },
      {
        id: 'hist_002',
        date: '2025-09-15',
        action: 'Nộp tờ khai',
        status: 'completed'
      }
    ]
  },
  {
    id: 'tax_002',
    type: 'Thuế giá trị gia tăng',
    amount: 1500000,
    status: 'paid',
    dueDate: '2025-08-31',
    description: 'Thuế GTGT tháng 7/2025',
    history: [
      {
        id: 'hist_003',
        date: '2025-08-25',
        action: 'Nộp thuế',
        amount: 1500000,
        status: 'completed'
      }
    ]
  },
  {
    id: 'tax_003',
    type: 'Thuế thu nhập doanh nghiệp',
    amount: 5000000,
    status: 'overdue',
    dueDate: '2025-08-15',
    description: 'Thuế TNDN quý 2/2025',
    history: [
      {
        id: 'hist_004',
        date: '2025-08-10',
        action: 'Nhắc nhở nộp thuế',
        status: 'pending'
      }
    ]
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    title: 'Thông báo nộp thuế',
    content: 'Bạn có tờ khai thuế TNCN tháng 8/2025 cần nộp trước ngày 30/09/2025',
    type: 'warning',
    date: '2025-09-15T10:00:00Z',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif_002',
    title: 'Xác nhận nộp thuế thành công',
    content: 'Thuế GTGT tháng 7/2025 đã được nộp thành công. Số tiền: 1,500,000 VNĐ',
    type: 'success',
    date: '2025-08-25T14:30:00Z',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'notif_003',
    title: 'Cập nhật hệ thống',
    content: 'Hệ thống eTax sẽ được bảo trì từ 02:00-04:00 ngày 20/09/2025',
    type: 'info',
    date: '2025-09-14T16:00:00Z',
    isRead: false,
    priority: 'low'
  }
];

export const mockAdminStats: AdminStats = {
  totalUsers: 1250,
  totalDemoLinks: 45,
  totalViews: 15680,
  activeUsers: 89
};

export const mockDemoLinks: DemoLink[] = [
  {
    id: 'demo_001',
    token: 'demo_abc123',
    url: 'https://etax-demo.com/demo/abc123',
    expiresAt: '2025-09-18T00:00:00Z',
    createdAt: '2025-09-15T10:00:00Z',
    views: 25,
    isActive: true
  },
  {
    id: 'demo_002',
    token: 'demo_xyz789',
    url: 'https://etax-demo.com/demo/xyz789',
    expiresAt: '2025-09-17T00:00:00Z',
    createdAt: '2025-09-14T15:30:00Z',
    views: 12,
    isActive: true
  }
];

export const mockPlaceholders: Placeholder[] = [
  {
    id: 'ph_001',
    key: '{{user_name}}',
    value: 'Nguyễn Văn An',
    description: 'Tên người dùng',
    category: 'user'
  },
  {
    id: 'ph_002',
    key: '{{user_mst}}',
    value: '0123456789',
    description: 'Mã số thuế',
    category: 'user'
  },
  {
    id: 'ph_003',
    key: '{{tax_amount}}',
    value: '2,500,000',
    description: 'Số tiền thuế',
    category: 'tax'
  },
  {
    id: 'ph_004',
    key: '{{due_date}}',
    value: '30/09/2025',
    description: 'Ngày hết hạn',
    category: 'tax'
  },
  {
    id: 'ph_005',
    key: '{{app_name}}',
    value: 'eTax Mobile',
    description: 'Tên ứng dụng',
    category: 'system'
  }
];

// ===== UTILITY FUNCTIONS =====

export const getTaxByStatus = (status: TaxInfo['status']) => {
  return mockTaxInfo.filter(tax => tax.status === status);
};

export const getUnreadNotifications = () => {
  return mockNotifications.filter(notif => !notif.isRead);
};

export const getHighPriorityNotifications = () => {
  return mockNotifications.filter(notif => notif.priority === 'high');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN');
};

// ===== EXPORT ALL DATA =====
export const mockData = {
  user: mockUser,
  taxInfo: mockTaxInfo,
  notifications: mockNotifications,
  adminStats: mockAdminStats,
  demoLinks: mockDemoLinks,
  placeholders: mockPlaceholders
};