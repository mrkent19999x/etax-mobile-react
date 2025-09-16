import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PageThongBao: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [notification, setNotification] = useState<{ code: string; transactionCode: string; created: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load notification details
    const ts = searchParams.get('ts');
    if (ts) {
      loadNotificationDetails();
    } else {
      setIsLoading(false);
    }
  }, [navigate, searchParams]);

  const loadNotificationDetails = async () => {
    setIsLoading(true);
    // Simulate loading notification details
    setTimeout(() => {
      setNotification({
        code: 'TB001',
        transactionCode: 'TXN123456',
        created: '2024-01-15 10:30:00',
        content: 'Nội dung thông báo chi tiết...',
        mst: '0123456789'
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate('/thongbao');
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Chi tiết thông báo</div>
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
          {isLoading ? (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <div style={{fontSize: '16px', color: '#666'}}>Đang tải thông báo...</div>
            </div>
          ) : !notification ? (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <div style={{fontSize: '16px', color: '#666'}}>Không tìm thấy thông báo.</div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{marginBottom: '20px'}}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div style={{fontSize: '14px', color: '#666'}}>Mã thông báo</div>
                  <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{notification.code}</div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div style={{fontSize: '14px', color: '#666'}}>Mã giao dịch</div>
                  <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{notification.transactionCode}</div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div style={{fontSize: '14px', color: '#666'}}>Mã số thuế</div>
                  <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{notification.mst}</div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div style={{fontSize: '14px', color: '#666'}}>Thời gian tạo</div>
                  <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{new Date(notification.created).toLocaleString('vi-VN')}</div>
                </div>

                <div style={{marginTop: '20px'}}>
                  <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Nội dung</div>
                  <div style={{fontSize: '16px', color: '#333', lineHeight: 1.5}}>{notification.content}</div>
                </div>
              </div>

              <button
                onClick={handleBack}
                style={{
                  width: '100%',
                  backgroundColor: '#b71c1c',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                ← Quay lại danh sách
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageThongBao;
