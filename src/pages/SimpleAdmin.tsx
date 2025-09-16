// Simple Admin - Trang admin đơn giản, dễ hiểu
import React, { useState } from 'react';
import { Page, Navbar, Block, BlockTitle, Button, Card, List, ListItem, Badge } from 'konsta/react';

const SimpleAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Page>
      <Navbar title="Admin Đơn Giản" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-100">
        <Button
          className={activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </Button>
        <Button
          className={activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('users')}
        >
          Người dùng
        </Button>
        <Button
          className={activeTab === 'pdf' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('pdf')}
        >
          PDF
        </Button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <Block>
          <BlockTitle>Thống kê hệ thống</BlockTitle>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-500">156</div>
                <div className="text-sm text-gray-600">Tổng người dùng</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-green-500">12</div>
                <div className="text-sm text-gray-600">Link hoạt động</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-500">3</div>
                <div className="text-sm text-gray-600">Chứng từ PDF</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-500">24</div>
                <div className="text-sm text-gray-600">Cập nhật hôm nay</div>
              </div>
            </Card>
          </div>
        </Block>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Block>
          <BlockTitle>Danh sách người dùng</BlockTitle>
          <List>
            <ListItem
              title="Công ty TNHH ABC"
              subtitle="MST: 0123456789"
              after={<Badge color="green">Hoạt động</Badge>}
            />
            <ListItem
              title="Công ty Cổ phần XYZ"
              subtitle="MST: 9876543210"
              after={<Badge color="green">Hoạt động</Badge>}
            />
            <ListItem
              title="Công ty TNHH DEF"
              subtitle="MST: 1111111111"
              after={<Badge color="yellow">Chờ duyệt</Badge>}
            />
          </List>
        </Block>
      )}

      {/* PDF Tab */}
      {activeTab === 'pdf' && (
        <Block>
          <BlockTitle>Quản lý PDF</BlockTitle>
          <div className="space-y-4">
            <Button className="w-full" color="blue">
              <i className="fas fa-plus mr-2"></i>
              Tạo PDF mới
            </Button>
            <Button className="w-full" color="green">
              <i className="fas fa-download mr-2"></i>
              Tải xuống tất cả
            </Button>
            <Button className="w-full" color="orange">
              <i className="fas fa-trash mr-2"></i>
              Dọn dẹp PDF cũ
            </Button>
          </div>

          <BlockTitle className="mt-6">Danh sách PDF</BlockTitle>
          <List>
            <ListItem
              title="Biên lai thuế BL-2025-001"
              subtitle="Công ty ABC - 5,000,000 VNĐ"
              after={<Badge color="green">Đã nộp</Badge>}
            />
            <ListItem
              title="Hóa đơn thuế HD-2025-002"
              subtitle="Công ty ABC - 2,500,000 VNĐ"
              after={<Badge color="yellow">Chờ xử lý</Badge>}
            />
            <ListItem
              title="Chứng chỉ thuế CC-2025-003"
              subtitle="Công ty XYZ - Đã cấp"
              after={<Badge color="green">Hoàn thành</Badge>}
            />
          </List>
        </Block>
      )}
    </Page>
  );
};

export default SimpleAdmin;
