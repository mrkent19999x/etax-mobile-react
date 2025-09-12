import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KhaiThue: React.FC = () => {
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Khai thuế</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: '20px', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/kt1.png" style={{width: '65px', height: '65px'}} alt="Khai thuế CNKD" />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Khai thuế<br />CNKD</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/kt2.png" style={{width: '65px', height: '65px'}} alt="Tra cứu hồ sơ khai thuế" />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu hồ sơ<br />khai thuế</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/kt3.png" style={{width: '65px', height: '65px'}} alt="Tra cứu hồ sơ khai Lệ phí trước bạ" />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu hồ sơ<br />khai Lệ phí<br />trước bạ</span>
            </div>
          </div>
        </div>   
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center', width: '200px'}}>
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}}>
              <img src="/assets/kt4.png" style={{width: '65px', height: '65px'}} alt="Tra cứu hồ sơ đất đai" />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu hồ sơ<br />đất đai</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            
          </div>
          <div style={{textAlign: 'center', width: '200px'}}>
            
          </div>
        </div>   
      </div>
    </div>
  );
};

export default KhaiThue;