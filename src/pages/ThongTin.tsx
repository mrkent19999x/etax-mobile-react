import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongTin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; mst: string; address: string; phone: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load user data (support both keys)
    const userData = localStorage.getItem('etax_user') || localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    navigate('/thongtin-chitiet');
  };

  return (
    <div className="min-h-screen bg-etax-background">
      <header className="bg-etax-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <i className="fas fa-arrow-left" onClick={handleBack} style={{fontSize: '20px', cursor: 'pointer'}}></i>
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông tin</div>
        <i className="fas fa-house" onClick={handleHome} style={{fontSize: '20px', cursor: 'pointer'}}></i>
      </header>

      <div style={{paddingTop: '100px'}}>
        <div className="info-section" style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          flex: 1,
          fontFamily: "'Roboto', Arial, sans-serif"
        }}>
          <div style={{
            fontWeight: 600,
            marginBottom: '16px',
            fontSize: '17px',
            color: '#333'
          }}>
            Thông tin cá nhân
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          }}>
            <div className="info-label" style={{
              color: '#666',
              width: '40%',
              fontWeight: 500
            }}>
              Họ và tên:
            </div>
            <div className="info-value" style={{
              width: '55%',
              fontWeight: 400,
              color: '#333',
              textAlign: 'right'
            }}>
              {user?.name || 'Nguyễn Văn A'}
            </div>
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          }}>
            <div className="info-label" style={{
              color: '#666',
              width: '40%',
              fontWeight: 500
            }}>
              Mã số thuế:
            </div>
            <div className="info-value" style={{
              width: '55%',
              fontWeight: 400,
              color: '#333',
              textAlign: 'right'
            }}>
              {user?.mst || '0123456789'}
            </div>
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          }}>
            <div className="info-label" style={{
              color: '#666',
              width: '40%',
              fontWeight: 500
            }}>
              Số điện thoại:
            </div>
            <div className="info-value" style={{
              width: '55%',
              fontWeight: 400,
              color: '#333',
              textAlign: 'right'
            }}>
              0123456789
            </div>
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: '15px'
          }}>
            <div className="info-label" style={{
              color: '#666',
              width: '40%',
              fontWeight: 500
            }}>
              Email:
            </div>
            <div className="info-value" style={{
              width: '55%',
              fontWeight: 400,
              color: '#333',
              textAlign: 'right'
            }}>
              user@example.com
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            <button
              onClick={handleEdit}
              style={{
                backgroundColor: '#b71c1c',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThongTin;
