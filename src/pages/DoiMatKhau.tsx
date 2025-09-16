import React, { useEffect, useState } from 'react';
// PHASE-REUSE-BURST-40M: Remap for 80% reuse
import { useNavigate } from 'react-router-dom';

const DoiMatKhau: React.FC = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password change
    setTimeout(() => {
      alert('Đổi mật khẩu thành công!');
      setIsLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Đổi mật khẩu</div>
        <i className="fas fa-house" onClick={handleBack} style={{fontSize: 'md', cursor: 'pointer'}}></i>
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
          gap: 'md'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 'md',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Thay đổi mật khẩu</h3>

            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Mật khẩu hiện tại:
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md'
                  }}
                />
              </div>

              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Mật khẩu mới:
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md'
                  }}
                />
              </div>

              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Xác nhận mật khẩu mới:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: 'sm',
                    border: '1px solid #ddd',
                    borderRadius: 'sm',
                    fontSize: 'md'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: 'etax-error',
                  color: 'white',
                  border: 'none',
                  padding: 'sm',
                  borderRadius: 'sm',
                  fontSize: 'md',
                  fontWeight: 500,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoiMatKhau;
