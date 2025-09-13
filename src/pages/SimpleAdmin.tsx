import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, Button, Card, List, ListItem, Dialog } from 'konsta/react';
import { SimpleDemoManager, type SimpleDemo } from '../services/SimpleDemoManager';

const SimpleAdmin: React.FC = () => {
  const [demos, setDemos] = useState<SimpleDemo[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<SimpleDemo | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form data
  const [newDemo, setNewDemo] = useState({
    name: '',
    mst: '',
    company: '',
    days: 3
  });

  const [editContent, setEditContent] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if already authenticated
    const saved = localStorage.getItem('admin_auth');
    if (saved === 'etax_admin_2025') {
      setIsAuthenticated(true);
      loadDemos();
    }
  }, []);

  const loadDemos = () => {
    setDemos(SimpleDemoManager.getAllDemos());
  };

  const handleLogin = () => {
    if (password === 'etax_admin_2025') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', password);
      loadDemos();
    } else {
      alert('Sai mật khẩu!');
    }
  };

  const handleCreate = () => {
    if (!newDemo.name || !newDemo.mst || !newDemo.company) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const demo = SimpleDemoManager.createDemo(
      newDemo.name,
      newDemo.mst,
      newDemo.company,
      newDemo.days
    );

    setDemos([...demos, demo]);
    setShowCreate(false);
    setNewDemo({ name: '', mst: '', company: '', days: 3 });

    // Show demo URL
    const url = SimpleDemoManager.createURL(demo.token);
    alert(`Demo link:\n${url}`);
  };

  const handleEdit = (demo: SimpleDemo) => {
    setSelectedDemo(demo);
    setEditContent({ ...demo.content });
    setShowEdit(true);
  };

  const handleSaveEdit = () => {
    if (selectedDemo) {
      SimpleDemoManager.updateContent(selectedDemo.token, editContent);
      loadDemos();
      setShowEdit(false);
      alert('Đã cập nhật!');
    }
  };

  const handleDelete = (token: string) => {
    if (confirm('Xóa demo này?')) {
      SimpleDemoManager.deleteDemo(token);
      loadDemos();
    }
  };

  const handleCleanup = () => {
    const removed = SimpleDemoManager.cleanupExpired();
    loadDemos();
    alert(`Đã xóa ${removed} demo hết hạn!`);
  };

  const copyURL = (token: string) => {
    const url = SimpleDemoManager.createURL(token);
    navigator.clipboard.writeText(url);
    alert('Đã copy URL!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const isExpired = (expires: string) => {
    return new Date(expires) <= new Date();
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <Page>
        <Navbar title="Admin Login" />
        <Block>
          <Card>
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">🔒 Admin Access</h3>
              <input
                type="password"
                placeholder="Mật khẩu admin"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <Button onClick={handleLogin} className="w-full bg-red-500">
                Đăng nhập
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Mật khẩu: etax_admin_2025
              </p>
            </div>
          </Card>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar title="Simple Admin" />
      
      {/* Stats */}
      <Block>
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <div className="p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{demos.length}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </Card>
          <Card>
            <div className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">
                {demos.filter(d => !isExpired(d.expires)).length}
              </div>
              <div className="text-xs text-gray-600">Active</div>
            </div>
          </Card>
          <Card>
            <div className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">
                {demos.filter(d => isExpired(d.expires)).length}
              </div>
              <div className="text-xs text-gray-600">Expired</div>
            </div>
          </Card>
        </div>
      </Block>

      {/* Actions */}
      <Block>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreate(true)}
            className="flex-1 bg-blue-500"
          >
            ➕ Tạo Demo
          </Button>
          <Button 
            onClick={handleCleanup}
            className="bg-orange-500"
          >
            🗑️ Dọn dẹp
          </Button>
        </div>
      </Block>

      {/* Demo List */}
      <Block>
        <h3 className="text-lg font-semibold mb-4">Demo Links</h3>
        {demos.length === 0 ? (
          <Card>
            <div className="p-4 text-center text-gray-500">
              Chưa có demo nào
            </div>
          </Card>
        ) : (
          <List>
            {demos.map((demo) => (
              <ListItem
                key={demo.id}
                title={demo.name}
                subtitle={`${demo.company} - MST: ${demo.mst}`}
                after={
                  <div className="flex flex-col items-end gap-1">
                    <div className={`text-xs px-2 py-1 rounded ${
                      isExpired(demo.expires) ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {isExpired(demo.expires) ? 'Hết hạn' : 'Active'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(demo.expires)}
                    </div>
                  </div>
                }
                onClick={() => handleEdit(demo)}
              >
                <div className="flex gap-2 mt-2">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      copyURL(demo.token);
                    }}
                    className="text-xs px-2 py-1"
                  >
                    📋 Copy
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(demo.token);
                    }}
                    className="text-xs px-2 py-1 bg-red-500"
                  >
                    🗑️ Xóa
                  </Button>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Block>

      {/* Create Dialog */}
      <Dialog opened={showCreate} onBackdropClick={() => setShowCreate(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tạo Demo Mới</h3>
          
          <div className="space-y-4">
            <input
              placeholder="Tên khách hàng"
              value={newDemo.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemo({...newDemo, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              placeholder="Mã số thuế"
              value={newDemo.mst}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemo({...newDemo, mst: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              placeholder="Tên công ty"
              value={newDemo.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemo({...newDemo, company: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Số ngày hết hạn"
              value={newDemo.days}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDemo({...newDemo, days: parseInt(e.target.value) || 3})}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleCreate} className="flex-1 bg-blue-500">
              Tạo
            </Button>
            <Button onClick={() => setShowCreate(false)} className="bg-gray-500">
              Hủy
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog opened={showEdit} onBackdropClick={() => setShowEdit(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Chỉnh sửa: {selectedDemo?.name}
          </h3>
          
          <div className="space-y-4">
            {Object.entries(editContent).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace('_', ' ').toUpperCase()}
                </label>
                <input
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditContent({
                    ...editContent,
                    [key]: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleSaveEdit} className="flex-1 bg-green-500">
              Lưu
            </Button>
            <Button onClick={() => setShowEdit(false)} className="bg-gray-500">
              Hủy
            </Button>
          </div>
        </div>
      </Dialog>
    </Page>
  );
};

export default SimpleAdmin;