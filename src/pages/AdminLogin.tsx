import React, { useState } from 'react';
import { Page, Navbar, Block, BlockTitle, Card, Button, List, ListItem, Input, Icon, Toast } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../hooks/useDemo';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { validateLogin, clientName, setClientData } = useDemo();

  const [mst, setMst] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate admin credentials
      if (validateLogin(mst, password)) {
        // Set admin mode
        localStorage.setItem('isAdminMode', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          mst: mst,
          name: clientName || 'Admin User'
        }));

        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      } else {
        setError('MST hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      setError('Lỗi đăng nhập admin!');
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = () => {
    // Redirect to normal user login
    navigate('/login');
  };

  return (
    <Page>
      <Navbar title="Admin Login" subtitle="Đăng nhập quản trị viên" />

      <Block>
        <BlockTitle>Chọn loại đăng nhập</BlockTitle>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleUserLogin}
            className="h-16 flex flex-col items-center justify-center bg-blue-500"
          >
            <Icon ios="person" material="person" className="mb-2" />
            <span className="text-sm">Người dùng</span>
          </Button>
          <Button
            onClick={() => {}}
            className="h-16 flex flex-col items-center justify-center bg-green-500"
          >
            <Icon ios="settings" material="settings" className="mb-2" />
            <span className="text-sm">Quản trị viên</span>
          </Button>
        </div>
      </Block>

      <Block>
        <BlockTitle>Đăng nhập Admin</BlockTitle>
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">MST (Mã số thuế)</label>
              <Input
                type="text"
                placeholder="Nhập MST"
                value={mst}
                onChange={(e) => setMst(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              onClick={handleAdminLogin}
              disabled={loading || !mst || !password}
              className="w-full"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập Admin'}
            </Button>
          </div>
        </Card>
      </Block>

      <Block>
        <BlockTitle>Tài khoản Demo Admin</BlockTitle>
        <List>
          <ListItem
            title="Công ty ABC"
            subtitle="MST: 0123456789 | Mật khẩu: 123456"
            onClick={() => {
              setMst('0123456789');
              setPassword('123456');
            }}
          />
          <ListItem
            title="Công ty XYZ"
            subtitle="MST: 9876543210 | Mật khẩu: 654321"
            onClick={() => {
              setMst('9876543210');
              setPassword('654321');
            }}
          />
        </List>
      </Block>

      <Block>
        <BlockTitle>Hướng dẫn</BlockTitle>
        <Card className="p-4">
          <div className="space-y-2 text-sm">
            <p><strong>Người dùng:</strong> Đăng nhập bình thường để sử dụng app</p>
            <p><strong>Admin:</strong> Đăng nhập với MST + mật khẩu để quản trị hệ thống</p>
            <p><strong>Demo:</strong> Click vào tài khoản demo để tự động điền thông tin</p>
          </div>
        </Card>
      </Block>
    </Page>
  );
};

export default AdminLogin;
