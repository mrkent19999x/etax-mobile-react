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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Vân tay / FaceID</div>
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
          gap: 'md',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 'md',
            padding: 'xl',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '300px',
            width: '100%'
          }}>
            <div style={{
              fontSize: '80px',
              color: 'etax-error',
              marginBottom: 'md'
            }}>
              <i className="fas fa-fingerprint"></i>
            </div>
            
            <h3 style={{
              fontSize: 'md',
              color: 'etax-text',
              marginBottom: 'md',
              fontWeight: 500
            }}>
              Xác thực sinh trắc học
            </h3>
            
            <p style={{
              fontSize: 'body-2',
              color: 'etax-text-secondary',
              marginBottom: '30px',
              lineHeight: 1.5
            }}>
              Đặt ngón tay lên cảm biến vân tay hoặc sử dụng FaceID để xác thực
            </p>

            {isScanning ? (
              <div style={{
                padding: 'md',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                marginBottom: 'md'
              }}>
                <div style={{
                  fontSize: 'md',
                  color: 'etax-error',
                  fontWeight: 500
                }}>
                  Đang quét vân tay...
                </div>
                <div style={{
                  marginTop: '10px',
                  fontSize: 'body-2',
                  color: 'etax-text-secondary'
                }}>
                  Vui lòng đặt ngón tay lên cảm biến
                </div>
              </div>
            ) : scanResult ? (
              <div style={{
                padding: 'md',
                backgroundColor: '#d4edda',
                borderRadius: '10px',
                marginBottom: 'md',
                border: '1px solid #c3e6cb'
              }}>
                <div style={{
                  fontSize: 'md',
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
                  backgroundColor: 'etax-error',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: 'md',
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Bắt đầu quét vân tay
              </button>
            )}

            <div style={{
              marginTop: 'md',
              fontSize: 'sm',
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