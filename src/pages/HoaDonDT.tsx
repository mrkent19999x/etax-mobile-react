import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HoaDonDT: React.FC = () => {
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
        backgroundColor: '#b71c1c', 
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
        <i className="fas fa-arrow-left" onClick={handleBack} style={{fontSize: '20px', cursor: 'pointer'}}></i>
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Hoá đơn điện tử</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: '20px', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div className="content-area" style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: '#f3f2f2',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div className="service-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            padding: '15px 5px 20px 5px'
          }}>
            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd1.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Tạo hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Tạo hóa đơn<br />điện tử
              </span>
            </div>

            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd2.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Tra cứu hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Tra cứu hóa đơn<br />điện tử
              </span>
            </div>

            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd3.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Quản lý hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Quản lý hóa đơn<br />điện tử
              </span>
            </div>

            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd4.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Báo cáo hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Báo cáo hóa đơn<br />điện tử
              </span>
            </div>

            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd5.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Cài đặt hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Cài đặt hóa đơn<br />điện tử
              </span>
            </div>

            <div className="service-item" onClick={() => {}} style={{
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '16px 8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/assets/hd6.png" style={{width: '65px', height: '65px', objectFit: 'contain', marginBottom: '8px'}} alt="Hướng dẫn hóa đơn điện tử" />
              <span style={{display: 'block', lineHeight: 1.4, fontSize: '14px', color: '#333', fontWeight: 500, textAlign: 'center'}}>
                Hướng dẫn hóa đơn<br />điện tử
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoaDonDT;