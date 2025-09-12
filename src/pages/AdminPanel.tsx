import React, { useState } from 'react';
import { Page, Navbar, Block, Button, Card, List, ListItem, Badge } from 'konsta/react';
import VisualEditor from '../components/VisualEditor';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Nguyễn Trung Nghĩa',
    mst: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    phone: '0901234567',
    email: 'nghia@example.com'
  });
  
  const [taxInfo, setTaxInfo] = useState({
    amount: '2,500,000',
    period: 'Quý 1/2025',
    deadline: '31/03/2025',
    status: 'Chưa nộp'
  });
  
  const [demoLinks, setDemoLinks] = useState([
    { id: 1, token: 'demo_001', user: 'Nguyễn Văn A', created: '2025-01-10', expires: '2025-01-13', status: 'active' },
    { id: 2, token: 'demo_002', user: 'Trần Thị B', created: '2025-01-11', expires: '2025-01-14', status: 'active' }
  ]);

  const [placeholderData, setPlaceholderData] = useState([
    { id: 1, key: 'user_name', value: 'Nguyễn Trung Nghĩa', type: 'text', page: 'dashboard' },
    { id: 2, key: 'user_mst', value: '0123456789', type: 'text', page: 'dashboard' },
    { id: 3, key: 'tax_amount', value: '2,500,000 VNĐ', type: 'currency', page: 'khaithue' },
    { id: 4, key: 'deadline', value: '31/03/2025', type: 'date', page: 'nopthue' }
  ]);

  const [stats] = useState({
    totalUsers: 156,
    activeLinks: 12,
    totalViews: 2847,
    lastUpdate: '2025-01-12 20:30'
  });

  const handleSavePersonal = () => {
    localStorage.setItem('admin_personal_info', JSON.stringify(personalInfo));
    alert('Đã lưu thông tin cá nhân!');
  };

  const handleSaveTax = () => {
    localStorage.setItem('admin_tax_info', JSON.stringify(taxInfo));
    alert('Đã lưu thông tin thuế!');
  };

  const generateDemoLink = () => {
    const newToken = `demo_${Date.now()}`;
    const newLink = {
      id: demoLinks.length + 1,
      token: newToken,
      user: 'Người dùng mới',
      created: new Date().toISOString().split('T')[0],
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active'
    };
    setDemoLinks([...demoLinks, newLink]);
    alert(`Link demo mới: ${window.location.origin}/?token=${newToken}`);
  };

  const handleSavePlaceholder = (id: number, newValue: string) => {
    setPlaceholderData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, value: newValue } : item
      )
    );
    localStorage.setItem('admin_placeholder_data', JSON.stringify(placeholderData));
  };

  const addPlaceholder = () => {
    const newPlaceholder = {
      id: placeholderData.length + 1,
      key: `new_placeholder_${Date.now()}`,
      value: 'Giá trị mới',
      type: 'text',
      page: 'dashboard'
    };
    setPlaceholderData([...placeholderData, newPlaceholder]);
  };

  const exportData = () => {
    const data = {
      personalInfo,
      taxInfo,
      placeholderData,
      demoLinks,
      stats,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etax-admin-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Page>
      <Navbar title="Admin Panel" />
      
      <div className="flex flex-wrap gap-2 p-4 bg-gray-100">
        <Button 
          className={activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </Button>
        <Button 
          className={activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('personal')}
        >
          Thông tin cá nhân
        </Button>
        <Button 
          className={activeTab === 'tax' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('tax')}
        >
          Thông tin thuế
        </Button>
        <Button 
          className={activeTab === 'placeholders' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('placeholders')}
        >
          Placeholders
        </Button>
        <Button 
          className={activeTab === 'links' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('links')}
        >
          Quản lý link
        </Button>
        <Button 
          className={activeTab === 'editor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}
          onClick={() => setActiveTab('editor')}
        >
          Visual Editor
        </Button>
      </div>

      <Block>
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
                <div className="text-sm text-gray-600">Tổng người dùng</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{stats.activeLinks}</div>
                <div className="text-sm text-gray-600">Link đang hoạt động</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Lượt xem</div>
              </div>
            </Card>
            <Card>
              <div className="p-4 text-center">
                <div className="text-sm font-bold text-gray-600">Cập nhật cuối</div>
                <div className="text-xs text-gray-500">{stats.lastUpdate}</div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'personal' && (
          <Card>
            <List>
              <ListItem
                title="Họ tên"
                after={
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalInfo({...personalInfo, name: e.target.value})}
                      placeholder="Nhập họ tên"
                      className="w-full p-2 border rounded"
                    />
                }
              />
              <ListItem
                title="MST"
                after={
                    <input
                      type="text"
                      value={personalInfo.mst}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalInfo({...personalInfo, mst: e.target.value})}
                      placeholder="Nhập MST"
                      className="w-full p-2 border rounded"
                    />
                }
              />
              <ListItem
                title="Địa chỉ"
                after={
                  <textarea
                    value={personalInfo.address}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    placeholder="Nhập địa chỉ"
                    className="w-full p-2 border rounded"
                  />
                }
              />
              <ListItem
                title="Số điện thoại"
                after={
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    placeholder="Nhập số điện thoại"
                    className="w-full p-2 border rounded"
                  />
                }
              />
              <ListItem
                title="Email"
                after={
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    placeholder="Nhập email"
                    className="w-full p-2 border rounded"
                  />
                }
              />
            </List>
            <Block>
              <Button onClick={handleSavePersonal} className="w-full">
                Lưu thông tin cá nhân
              </Button>
            </Block>
          </Card>
        )}

        {activeTab === 'tax' && (
          <Card>
            <List>
              <ListItem
                title="Số tiền thuế"
                after={
                  <input
                    type="text"
                    value={taxInfo.amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxInfo({...taxInfo, amount: e.target.value})}
                    placeholder="Nhập số tiền"
                    className="w-full p-2 border rounded"
                  />
                }
              />
              <ListItem
                title="Kỳ thuế"
                after={
                  <input
                    type="text"
                    value={taxInfo.period}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxInfo({...taxInfo, period: e.target.value})}
                    placeholder="Nhập kỳ thuế"
                    className="w-full p-2 border rounded"
                  />
                }
              />
              <ListItem
                title="Hạn nộp"
                after={
                  <input
                    type="text"
                    value={taxInfo.deadline}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxInfo({...taxInfo, deadline: e.target.value})}
                    placeholder="Nhập hạn nộp"
                    className="w-full p-2 border rounded"
                  />
                }
              />
              <ListItem
                title="Trạng thái"
                after={
                  <input
                    type="text"
                    value={taxInfo.status}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxInfo({...taxInfo, status: e.target.value})}
                    placeholder="Nhập trạng thái"
                    className="w-full p-2 border rounded"
                  />
                }
              />
            </List>
            <Block>
              <Button onClick={handleSaveTax} className="w-full">
                Lưu thông tin thuế
              </Button>
            </Block>
          </Card>
        )}

        {activeTab === 'placeholders' && (
          <Card>
            <Block>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Quản lý Placeholders</h3>
                <Button onClick={addPlaceholder} className="bg-blue-500">
                  Thêm Placeholder
                </Button>
              </div>
            </Block>
            
            <List>
              {placeholderData.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.key}
                  subtitle={`Trang: ${item.page} | Loại: ${item.type}`}
                  after={
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSavePlaceholder(item.id, e.target.value)}
                      placeholder="Nhập giá trị"
                      className="w-32 p-1 border rounded"
                    />
                  }
                />
              ))}
            </List>
          </Card>
        )}

        {activeTab === 'links' && (
          <Card>
            <Block>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Quản lý Link Demo</h3>
                <div className="flex gap-2">
                  <Button onClick={generateDemoLink} className="bg-green-500">
                    Tạo link mới
                  </Button>
                  <Button onClick={exportData} className="bg-purple-500">
                    Xuất dữ liệu
                  </Button>
                </div>
              </div>
            </Block>
            
            <List>
              {demoLinks.map((link) => (
                <ListItem
                  key={link.id}
                  title={link.user}
                  subtitle={`Token: ${link.token}`}
                  after={
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        Hết hạn: {link.expires}
                      </div>
                      <Badge color={link.status === 'active' ? 'green' : 'red'}>
                        {link.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                      </Badge>
                    </div>
                  }
                />
              ))}
            </List>
          </Card>
        )}

        {activeTab === 'editor' && (
          <VisualEditor
            onSave={(html, css) => {
              console.log('Saved HTML:', html);
              console.log('Saved CSS:', css);
              alert('Đã lưu thành công!');
            }}
            initialHtml="<div>Chào mừng đến với eTax Mobile!</div>"
            initialCss="body { font-family: Arial, sans-serif; }"
          />
        )}
      </Block>
    </Page>
  );
};

export default AdminPanel;
