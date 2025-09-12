import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HoSo: React.FC = () => {
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Hồ sơ</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: '20px', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => navigate('/tracuttnpt')} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht1.png" style={{width: '65px', height: '65px'}} alt="Hồ sơ khai thuế TNCN" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>
                Hồ sơ khai thuế<br />TNCN
              </span>
            </div>
          </div>
          
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => navigate('/tracuttnpt')} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht2.png" style={{width: '65px', height: '65px'}} alt="Hồ sơ khai Lệ phí trước bạ phương tiện" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>
                Hồ sơ khai Lệ<br />phí trước bạ<br />phương tiện
              </span>
            </div>
          </div>
          
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => navigate('/hsdkythue')} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/ht3.png" style={{width: '65px', height: '65px'}} alt="Hồ sơ đất đai" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>
                Hồ sơ đất đai
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoSo;