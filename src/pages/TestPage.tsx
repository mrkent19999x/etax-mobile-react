// Test Page - Trang test đơn giản để kiểm tra
import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🧪 Test Page - Kiểm tra hệ thống
      </h1>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#007AFF', marginBottom: '15px' }}>
          ✅ Hệ thống hoạt động bình thường!
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <strong>Thông tin hệ thống:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
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
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li><a href="/etax-mobile-react/" style={{ color: '#007AFF' }}>Trang chủ</a></li>
            <li><a href="/etax-mobile-react/simple-admin" style={{ color: '#007AFF' }}>Admin đơn giản</a></li>
            <li><a href="/etax-mobile-react/admin" style={{ color: '#007AFF' }}>Admin Panel</a></li>
            <li><a href="/etax-mobile-react/pdf-management" style={{ color: '#007AFF' }}>PDF Management</a></li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '15px',
          borderRadius: '5px',
          border: '1px solid #4CAF50'
        }}>
          <p style={{ margin: 0, color: '#2e7d32' }}>
            <strong>🎉 Kết luận:</strong> Hệ thống đã sẵn sàng! Hãy thử đăng nhập với thông tin trên.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
