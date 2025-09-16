import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HoTroQTT: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="phone-frame">
      <header className="header" style={{
        backgroundColor: 'etax-error', 
        color: 'white', 
        height: '100px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 20px', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
        paddingTop: 'max(12px, env(safe-area-inset-top))'
      }}>
        <i className="fas fa-arrow-left" onClick={handleBack} style={{fontSize: 'md', cursor: 'pointer'}}></i>
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Hỗ trợ QTT</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: 'md', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div className="content-area" style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: 'etax-background',
          padding: 'md',
          display: 'flex',
          flexDirection: 'column',
          gap: 'md'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 'md',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Hỗ trợ Quyết toán thuế</h3>
            
            <div style={{marginBottom: 'md'}}>
              <h4 style={{fontSize: 'md', color: 'etax-text', marginBottom: 'sm'}}>Thông tin liên hệ:</h4>
              <p style={{fontSize: 'body-2', color: 'etax-text-secondary', lineHeight: 1.5}}>
                Hotline: 1900 1234<br />
                Email: hotro@etax.gov.vn<br />
                Thời gian: 8:00 - 17:00 (T2-T6)
              </p>
            </div>

            <div style={{marginBottom: 'md'}}>
              <h4 style={{fontSize: 'md', color: 'etax-text', marginBottom: 'sm'}}>Hướng dẫn:</h4>
              <p style={{fontSize: 'body-2', color: 'etax-text-secondary', lineHeight: 1.5}}>
                • Quy trình quyết toán thuế<br />
                • Cách tính thuế thu nhập cá nhân<br />
                • Thời hạn nộp tờ khai quyết toán<br />
                • Xử lý các lỗi thường gặp
              </p>
            </div>

            <button
              onClick={() => alert('Đang kết nối với tổng đài...')}
              style={{
                width: '100%',
                backgroundColor: 'etax-error',
                color: 'white',
                border: 'none',
                padding: 'sm',
                borderRadius: 'sm',
                fontSize: 'md',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: 'md'
              }}
            >
              Gọi hỗ trợ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoTroQTT;