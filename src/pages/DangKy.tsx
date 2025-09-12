import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DangKy: React.FC = () => {
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

  const handleThayDoiTTDKThue = () => {
    navigate('/thaydoittdkthue');
  };

  const handleTraCuuTNPT = () => {
    navigate('/tracuttnpt');
  };

  const handleHSDKyThue = () => {
    navigate('/hsdkythue');
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Đăng ký thuế</div>
        <i className="fas fa-house" onClick={handleBack} style={{fontSize: '20px', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={handleThayDoiTTDKThue} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/dk1.png" style={{width: '65px', height: '65px'}} alt="Thay đổi thông tin đăng ký thuế" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Thay đổi<br />thông tin đăng<br />ký thuế</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={handleTraCuuTNPT} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/dk2.png" style={{width: '65px', height: '65px'}} alt="Tra cứu thông tin người phụ thuộc" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu thông<br />tin người phụ<br />thuộc</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={handleHSDKyThue} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/dk3.png" style={{width: '65px', height: '65px'}} alt="Hồ sơ đăng ký thuế" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Hồ sơ đăng ký<br />thuế</span>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default DangKy;