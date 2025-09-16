import React, { useState, useEffect } from 'react';
import { useDemo } from '../hooks/useDemo';

const Login: React.FC = () => {
  const {
    isDemoMode,
    error: demoError,
    isTokenValid,
    isTokenExpired,
    expiryDate,
    clientName,
    redirectToDashboard,
    clearError
  } = useDemo();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto redirect nếu đã login trong demo mode
  useEffect(() => {
    if (isDemoMode && isTokenValid && !isTokenExpired) {
      redirectToDashboard();
    }
  }, [isDemoMode, isTokenValid, isTokenExpired, redirectToDashboard]);

  // Show token expired message
  useEffect(() => {
    if (isTokenExpired && expiryDate) {
      setError(`Demo đã hết hạn vào ${expiryDate.toLocaleString('vi-VN')}`);
    }
  }, [isTokenExpired, expiryDate]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    clearError();

    try {
      // Auto-login với demo token (không cần username/password)
      if (isDemoMode && isTokenValid) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('etax_logged_in_user', 'demo_user');
        localStorage.setItem('etax_user', JSON.stringify({
          name: clientName || 'Demo User',
          mst: '0123456789'
        }));
        redirectToDashboard();
      } else {
        setError('Demo token không hợp lệ hoặc đã hết hạn');
      }
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="phone-frame">
      {/* Logo và Title */}
      <div className="logo-wrapper">
        <img src="/etax-mobile-react/assets/logo.png" alt="Logo Thuế" className="logo" />
        <h1 className="title">eTax Mobile</h1>
      </div>

      {/* Circular Login Form */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="error-msg" style={{ display: (error || demoError) ? 'block' : 'none' }}>
            {error || demoError}
          </div>

          <div className="form-group">
            <div className="input-icon-wrap">
              <input
                type="text"
                placeholder="Mã số thuế"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                autoComplete="username"
              />
              <i className="fa-solid fa-user-large"></i>
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrap">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <i className="fa-solid fa-lock"></i>
              <i className="fa-solid fa-eye" id="togglePassword"></i>
            </div>
          </div>

          {/* Forgot Links */}
          <div className="forgot-links">
            <a href="javascript:void(0)">Quên tài khoản (mã số thuế)?</a>
            <a href="javascript:void(0)">Quên mật khẩu?</a>
          </div>

          <div className="btn-login-wrap">
            <button
              type="submit"
              className={`btn-login ${loading ? 'loading' : ''}`}
              disabled={loading || !username || !password}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
            <img className="btn-faceid" src="/etax-mobile-react/assets/faceid.png" alt="FaceID" />
          </div>
        </form>
      </div>

      {/* VNeID Button */}
      <div className="vneid-container">
        <div className="btn-vneid">
          <div className="text-box">
            <div>Đăng nhập bằng tài khoản</div>
            <div className="line2">Định danh điện tử</div>
          </div>
          <img src="/etax-mobile-react/assets/vnid.png" alt="VNeID" />
        </div>
      </div>

      {/* Register Link */}
      <div className="register-link">
        <span>Bạn chưa có tài khoản? </span>
        <a href="/user/dangky.html">Đăng ký ngay</a>
      </div>

      {/* Bottom Functions */}
      <div className="bottom-functions">
        <div className="function-item">
          <img src="/etax-mobile-react/assets/icon-qr.png" alt="QR tém" />
          <span>QR tém</span>
        </div>
        <div className="function-item">
          <img src="/etax-mobile-react/assets/tienich.png" alt="Tiện ích" />
          <span>Tiện ích</span>
        </div>
        <div className="function-item">
          <img src="/etax-mobile-react/assets/hotro.png" alt="Hỗ trợ" />
          <span>Hỗ trợ</span>
        </div>
        <div className="function-item">
          <img src="/etax-mobile-react/assets/chiase.png" alt="Chia sẻ" />
          <span>Chia sẻ</span>
        </div>
      </div>

      {/* Admin Login Button */}
      <div className="admin-login-section mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Quản trị viên</h3>
        <button
          onClick={() => window.location.href = '/admin-login'}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Đăng nhập Admin
        </button>
        <p className="text-sm text-gray-600 text-center mt-2">
          Dành cho quản trị viên hệ thống
        </p>
      </div>
    </div>
  );
};

export default Login;
