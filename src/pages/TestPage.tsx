// Test Page - Trang test đơn giản để kiểm tra
import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{
      padding: 'md',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: 'etax-text', marginBottom: 'md' }}>
        🧪 Test Page - Kiểm tra hệ thống
      </h1>

      <div style={{
        backgroundColor: 'white',
        padding: 'md',
        borderRadius: 'sm',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: 'primary', marginBottom: '15px' }}>
          ✅ Hệ thống hoạt động bình thường!
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <strong>Thông tin hệ thống:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: 'md' }}>
            <li>React: ✅ Hoạt động</li>
            <li>TypeScript: ✅ Hoạt động</li>
            <li>Vite: ✅ Hoạt động</li>
            <li>Konsta UI: ✅ Hoạt động</li>
          </ul>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Thông tin đăng nhập:</strong>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            marginTop: '10px'
          }}>
            <p><strong>Tài khoản 1:</strong> MST: 0123456789 | Mật khẩu: 123456</p>
            <p><strong>Tài khoản 2:</strong> MST: 9876543210 | Mật khẩu: 654321</p>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Links quan trọng:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: 'md' }}>
            <li><a href="/etax-mobile-react/" style={{ color: 'primary' }}>Trang chủ</a></li>
            <li><a href="/etax-mobile-react/simple-admin" style={{ color: 'primary' }}>Admin đơn giản</a></li>
            <li><a href="/etax-mobile-react/admin" style={{ color: 'primary' }}>Admin Panel</a></li>
            <li><a href="/etax-mobile-react/pdf-management" style={{ color: 'primary' }}>PDF Management</a></li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #4CAF50'
        }}>
          <p style={{ margin: 0, color: 'etax-secondary' }}>
            <strong>🎉 Kết luận:</strong> Hệ thống đã sẵn sàng! Hãy thử đăng nhập với thông tin trên.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
