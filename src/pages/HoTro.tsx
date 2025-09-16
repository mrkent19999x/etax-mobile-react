import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HoTro: React.FC = () => {
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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Hỗ trợ</div>
        <i className="fas fa-house" onClick={handleBack} style={{fontSize: 'md', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 'md', marginBottom: 'md'}}>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht1.png" style={{width: '65px', height: '65px'}} alt="Hướng dẫn sử dụng" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Hướng dẫn sử<br />dụng</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht2.png" style={{width: '65px', height: '65px'}} alt="Liên hệ hỗ trợ" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Liên hệ hỗ trợ</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht3.png" style={{width: '65px', height: '65px'}} alt="Phiên bản ứng dụng" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Phiên bản ứng<br />dụng</span>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default HoTro;