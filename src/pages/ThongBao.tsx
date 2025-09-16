import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

const ThongBao: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<{
    id: string;
    title: string;
    content: string;
    date: string;
    isRead: boolean;
  }[]>([]);
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
    // Load notifications from mock data
    setTimeout(() => {
      setNotifications(mockData.notifications.map(notif => ({
        id: notif.id,
        title: notif.title,
        content: notif.content,
        date: notif.date,
        isRead: notif.isRead
      })));
      setIsLoading(false);
    }, 500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleNotificationClick = (id: string) => {
    navigate(`/chi-tiet-thong-bao?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-etax-background">
      {/* Header */}
      <header className="bg-etax-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-semibold">Thông báo</h1>
        <button
          onClick={handleHome}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <i className="fas fa-house text-xl"></i>
        </button>
      </header>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-etax-text-secondary text-lg">Đang tải thông báo...</div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-etax-text-secondary text-lg">Không có thông báo nào.</div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-etax-surface rounded-2xl p-4 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                  !notification.isRead ? 'border-l-4 border-etax-primary' : ''
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-etax-text-secondary text-sm font-medium">
                    {new Date(notification.date).toLocaleString('vi-VN')}
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-etax-primary rounded-full"></div>
                  )}
                </div>
                <div className={`text-etax-text ${
                  notification.isRead ? 'font-normal' : 'font-semibold'
                } leading-relaxed`}>
                  {notification.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThongBao;
