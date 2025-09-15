import React from 'react';
import { getUnreadNotifications, getHighPriorityNotifications } from '../data/mockData';

interface NotificationBadgeProps {
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ className = '' }) => {
  const unreadCount = getUnreadNotifications().length;
  const highPriorityCount = getHighPriorityNotifications().length;

  return (
    <div className={`notification-badge ${className}`}>
      <div className="bell-icon">
        <img src="/assets/icon-bell.png" alt="Thông báo" className="icon-32" />
        {unreadCount > 0 && (
          <span className="badge-count">{unreadCount}</span>
        )}
        {highPriorityCount > 0 && (
          <span className="priority-dot"></span>
        )}
      </div>
      
      <style>{`
        .notification-badge {
          position: relative;
          display: inline-block;
        }
        
        .bell-icon {
          position: relative;
          display: inline-block;
        }
        
        .badge-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff3b30;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          border: 2px solid white;
        }
        
        .priority-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          background: #ff9500;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationBadge;