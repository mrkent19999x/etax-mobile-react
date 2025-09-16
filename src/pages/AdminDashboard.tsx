import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, BlockTitle, Card, Button, List, ListItem, Badge, Icon, Searchbar, Toast } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../hooks/useDemo';

// Import các service
import { PDFService } from '../services/PDFService';
import { RealtimeService } from '../services/RealtimeService';

// Types
interface SystemStats {
  totalUsers: number;
  activeSessions: number;
  totalDocuments: number;
  todayUpdates: number;
}

interface RecentActivity {
  id: string;
  type: 'login' | 'document' | 'update' | 'error';
  message: string;
  timestamp: string;
  user?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { clientName, isDemoMode } = useDemo();

  // State management
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 156,
    activeSessions: 12,
    totalDocuments: 24,
    todayUpdates: 8
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'login',
      message: 'Người dùng đăng nhập thành công',
      timestamp: '2025-01-16 15:30:00',
      user: 'Công ty ABC'
    },
    {
      id: '2',
      type: 'document',
      message: 'Tạo mới chứng từ thuế',
      timestamp: '2025-01-16 15:25:00',
      user: 'Công ty XYZ'
    },
    {
      id: '3',
      type: 'update',
      message: 'Cập nhật thông tin MST',
      timestamp: '2025-01-16 15:20:00',
      user: 'Công ty DEF'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState('');

  // Real-time updates
  useEffect(() => {
    const realtimeService = new RealtimeService();

    const handleUpdate = (update: any) => {
      setRecentActivity(prev => [
        {
          id: Date.now().toString(),
          type: 'update',
          message: String(update.data.message),
          timestamp: new Date().toLocaleString('vi-VN'),
          user: update.data.user || 'System'
        },
        ...prev.slice(0, 9) // Giữ lại 10 hoạt động gần nhất
      ]);

      setStats(prev => ({
        ...prev,
        todayUpdates: prev.todayUpdates + 1
      }));
    };

    realtimeService.onUpdate(handleUpdate);

    return () => {
      realtimeService.offUpdate(handleUpdate);
    };
  }, []);

  // Functions
  const showToast = (message: string) => {
    setToastText(message);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-pdf':
        navigate('/pdf-management');
        break;
      case 'manage-users':
        showToast('Chức năng quản lý người dùng đang phát triển');
        break;
      case 'system-settings':
        showToast('Chức năng cài đặt hệ thống đang phát triển');
        break;
      case 'backup':
        showToast('Đang tạo backup dữ liệu...');
        break;
      default:
        showToast('Chức năng đang phát triển');
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return 'person';
      case 'document': return 'document-text';
      case 'update': return 'refresh';
      case 'error': return 'warning';
      default: return 'information-circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login': return 'green';
      case 'document': return 'blue';
      case 'update': return 'orange';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Page>
      <Navbar
        title="Admin Dashboard"
        subtitle={isDemoMode ? `Demo: ${clientName}` : 'Hệ thống quản trị'}
        right={
          <Button
            iconOnly
            icon={<Icon ios="settings" material="settings" />}
            onClick={() => showToast('Cài đặt hệ thống')}
          />
        }
      />

      {/* Search Bar */}
      <Block>
        <Searchbar
          placeholder="Tìm kiếm hoạt động, người dùng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Block>

      {/* System Stats */}
      <Block>
        <BlockTitle>Thống kê hệ thống</BlockTitle>
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Tổng người dùng</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">{stats.activeSessions}</div>
            <div className="text-sm text-gray-600">Phiên hoạt động</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.totalDocuments}</div>
            <div className="text-sm text-gray-600">Chứng từ PDF</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.todayUpdates}</div>
            <div className="text-sm text-gray-600">Cập nhật hôm nay</div>
          </Card>
        </div>
      </Block>

      {/* Quick Actions */}
      <Block>
        <BlockTitle>Thao tác nhanh</BlockTitle>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleQuickAction('create-pdf')}
            className="h-16 flex flex-col items-center justify-center"
          >
            <Icon ios="document-text" material="description" className="mb-2" />
            <span className="text-sm">Tạo PDF</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('manage-users')}
            className="h-16 flex flex-col items-center justify-center"
          >
            <Icon ios="people" material="people" className="mb-2" />
            <span className="text-sm">Quản lý người dùng</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('system-settings')}
            className="h-16 flex flex-col items-center justify-center"
          >
            <Icon ios="settings" material="settings" className="mb-2" />
            <span className="text-sm">Cài đặt hệ thống</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('backup')}
            className="h-16 flex flex-col items-center justify-center"
          >
            <Icon ios="cloud-upload" material="cloud_upload" className="mb-2" />
            <span className="text-sm">Backup dữ liệu</span>
          </Button>
        </div>
      </Block>

      {/* Navigation Links */}
      <Block>
        <BlockTitle>Quản lý chuyên sâu</BlockTitle>
        <List>
          <ListItem
            title="Quản lý PDF"
            subtitle="Tạo, sửa, xóa chứng từ PDF"
            link
            onClick={() => navigate('/pdf-management')}
            after={<Icon ios="chevron-right" material="chevron_right" />}
          />
          <ListItem
            title="Quản lý Demo"
            subtitle="Cấu hình tài khoản demo"
            link
            onClick={() => navigate('/demo-management')}
            after={<Icon ios="chevron-right" material="chevron_right" />}
          />
          <ListItem
            title="Tra cứu chứng từ"
            subtitle="Tìm kiếm và xem chứng từ"
            link
            onClick={() => navigate('/tra-cuu-chung-tu')}
            after={<Icon ios="chevron-right" material="chevron_right" />}
          />
          <ListItem
            title="Test Page"
            subtitle="Kiểm tra hệ thống"
            link
            onClick={() => navigate('/test')}
            after={<Icon ios="chevron-right" material="chevron_right" />}
          />
          <ListItem
            title="PWA Test"
            subtitle="Kiểm tra PWA Compliance"
            link
            onClick={() => navigate('/pwa-test')}
            after={<Icon ios="chevron-right" material="chevron_right" />}
          />
        </List>
      </Block>

      {/* Recent Activity */}
      <Block>
        <BlockTitle>Hoạt động gần đây</BlockTitle>
        <List>
          {recentActivity
            .filter(activity =>
              searchQuery === '' ||
              activity.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
              activity.user?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((activity) => (
            <ListItem
              key={activity.id}
              title={activity.message}
              subtitle={`${activity.user} • ${activity.timestamp}`}
              media={
                <Icon
                  ios={getActivityIcon(activity.type)}
                  material={getActivityIcon(activity.type)}
                  className={`text-${getActivityColor(activity.type)}-500`}
                />
              }
              after={
                <Badge color={getActivityColor(activity.type)}>
                  {activity.type}
                </Badge>
              }
            />
          ))}
        </List>
      </Block>

      {/* System Status */}
      <Block>
        <BlockTitle>Trạng thái hệ thống</BlockTitle>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Trạng thái:</span>
            <Badge color="green">Hoạt động bình thường</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Phiên bản:</span>
            <span className="text-sm text-gray-600">v1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Cập nhật cuối:</span>
            <span className="text-sm text-gray-600">{new Date().toLocaleString('vi-VN')}</span>
          </div>
        </Card>
      </Block>

      {/* Toast */}
      {toastOpen && (
        <Toast
          position="bottom"
          opened={toastOpen}
          onClick={() => setToastOpen(false)}
        >
          {toastText}
        </Toast>
      )}
    </Page>
  );
};

export default AdminDashboard;
