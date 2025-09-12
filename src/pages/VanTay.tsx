import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VanTay: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');

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

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult('');
    
    // Simulate fingerprint scan
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('Vân tay đã được xác thực thành công!');
    }, 2000);
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Vân tay / FaceID</div>
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
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '300px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '80px',
              color: '#b71c1c',
              marginBottom: '20px'
            }}>
              <i className="fas fa-fingerprint"></i>
            </div>
            
            <h3 style={{
              fontSize: '20px',
              color: '#333',
              marginBottom: '16px',
              fontWeight: 500
            }}>
              Xác thực sinh trắc học
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '30px',
              lineHeight: 1.5
            }}>
              Đặt ngón tay lên cảm biến vân tay hoặc sử dụng FaceID để xác thực
            </p>

            {isScanning ? (
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <div style={{
                  fontSize: '16px',
                  color: '#b71c1c',
                  fontWeight: 500
                }}>
                  Đang quét vân tay...
                </div>
                <div style={{
                  marginTop: '10px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Vui lòng đặt ngón tay lên cảm biến
                </div>
              </div>
            ) : scanResult ? (
              <div style={{
                padding: '20px',
                backgroundColor: '#d4edda',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #c3e6cb'
              }}>
                <div style={{
                  fontSize: '16px',
                  color: '#155724',
                  fontWeight: 500
                }}>
                  {scanResult}
                </div>
              </div>
            ) : (
              <button
                onClick={handleStartScan}
                style={{
                  backgroundColor: '#b71c1c',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Bắt đầu quét vân tay
              </button>
            )}

            <div style={{
              marginTop: '20px',
              fontSize: '12px',
              color: '#999'
            }}>
              Hỗ trợ: Touch ID, Face ID, Android Fingerprint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanTay;