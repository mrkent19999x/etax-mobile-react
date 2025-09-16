import React, { useState } from 'react';
import { Page, Navbar, Block, BlockTitle, Card, Button, Input, Toast } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../hooks/useDemo';

const LoginTest: React.FC = () => {
  const navigate = useNavigate();
  const { validateLogin, clientName } = useDemo();

  const [mst, setMst] = useState('0123456789');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTestLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Testing login with:', { mst, password });

      const isValid = validateLogin(mst, password);
      console.log('Login result:', isValid);

      if (isValid) {
        setSuccess(`✅ Đăng nhập thành công! Chào mừng ${clientName || 'Admin'}`);
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      } else {
        setError('❌ MST hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Lỗi đăng nhập: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestUserLogin = () => {
    navigate('/login');
  };

  return (
    <Page>
      <Navbar title="Login Test" subtitle="Kiểm tra đăng nhập" />

      <Block>
        <BlockTitle>Test Admin Login</BlockTitle>
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
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>
            )}

            {success && (
              <div className="text-green-500 text-sm p-2 bg-green-50 rounded">{success}</div>
            )}

            <div className="space-y-2">
              <Button
                onClick={handleTestLogin}
                disabled={loading || !mst || !password}
                className="w-full"
              >
                {loading ? 'Đang test...' : 'Test Admin Login'}
              </Button>

              <Button
                onClick={handleTestUserLogin}
                className="w-full bg-blue-500"
              >
                Test User Login
              </Button>
            </div>
          </div>
        </Card>
      </Block>

      <Block>
        <BlockTitle>Tài khoản Test</BlockTitle>
        <Card className="p-4">
          <div className="space-y-2 text-sm">
            <p><strong>Admin 1:</strong> MST: 0123456789 | Mật khẩu: 123456</p>
            <p><strong>Admin 2:</strong> MST: 9876543210 | Mật khẩu: 654321</p>
            <p><strong>User:</strong> Click "Test User Login" để test đăng nhập user</p>
          </div>
        </Card>
      </Block>

      <Block>
        <BlockTitle>Debug Info</BlockTitle>
        <Card className="p-4">
          <div className="space-y-1 text-xs">
            <p><strong>Current MST:</strong> {mst}</p>
            <p><strong>Current Password:</strong> {password}</p>
            <p><strong>Client Name:</strong> {clientName || 'N/A'}</p>
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          </div>
        </Card>
      </Block>
    </Page>
  );
};

export default LoginTest;
