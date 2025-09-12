import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongBao: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load notifications
    loadNotifications();
  }, [navigate]);

  const loadNotifications = async () => {
    setIsLoading(true);
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          title: 'Thông báo về việc nộp thuế tháng 1/2024',
          date: '2024-01-15 10:30:00',
          isRead: false
        },
        {
          id: 2,
          title: 'Hướng dẫn sử dụng ứng dụng eTax Mobile',
          date: '2024-01-14 14:20:00',
          isRead: true
        },
        {
          id: 3,
          title: 'Cập nhật phiên bản mới của ứng dụng',
          date: '2024-01-13 09:15:00',
          isRead: false
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleNotificationClick = (id: number) => {
    navigate(`/chi-tiet-thong-bao?id=${id}`);
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông báo</div>
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
          ) : notifications.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <div style={{fontSize: '16px', color: '#666'}}>Không có thông báo nào.</div>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                borderLeft: notification.isRead ? 'none' : '4px solid #b71c1c'
              }} onClick={() => handleNotificationClick(notification.id)}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: 500
                  }}>
                    {new Date(notification.date).toLocaleString('vi-VN')}
                  </div>
                  {!notification.isRead && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#b71c1c',
                      borderRadius: '50%'
                    }}></div>
                  )}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#333',
                  fontWeight: notification.isRead ? 400 : 500,
                  lineHeight: 1.4
                }}>
                  {notification.title}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongBao;