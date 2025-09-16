import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ChiTietThongBao: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [notification, setNotification] = useState<{ id: string; title: string; content: string; date: string; isRead: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load notification details
    const notificationId = searchParams.get('id');
    if (notificationId) {
      loadNotificationDetails(notificationId);
    } else {
      setIsLoading(false);
    }
  }, [navigate, searchParams]);

  const loadNotificationDetails = async (id: string) => {
    setIsLoading(true);
    // Simulate loading notification details
    setTimeout(() => {
      setNotification({
        id: id,
        title: 'Thông báo về việc nộp thuế tháng 1/2024',
        publishDate: '2024-01-15 10:30:00',
        content: 'Nội dung chi tiết của thông báo về việc nộp thuế tháng 1/2024...'
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleAttachment = () => {
    alert('Tệp đính kèm sẽ được mở...');
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
              <div style={{fontSize: '16px', color: '#666'}}>Đang tải chi tiết...</div>
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
              <div style={{
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid #eee'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#333',
                  marginBottom: '12px',
                  fontWeight: 500
                }}>
                  {notification.title}
                </h2>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px'
                }}>
                  Số thông báo: {notification.id}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Ngày thông báo: {new Date(notification.publishDate).toLocaleString('vi-VN')}
                </div>
              </div>

              <div style={{
                marginBottom: '20px',
                lineHeight: 1.6,
                color: '#333'
              }}>
                <p>{notification.content}</p>
              </div>

              <button
                onClick={handleAttachment}
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
                Xem tệp đính kèm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChiTietThongBao;
