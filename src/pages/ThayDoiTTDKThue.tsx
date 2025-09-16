import React, { useEffect, useState } from 'react';
// PHASE-REUSE-BURST-40M: Remap for 80% reuse
import { useNavigate } from 'react-router-dom';

const ThayDoiTTDKThue: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mst: '',
    address: '',
    phone: '',
    email: ''
  });
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

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thông tin đăng ký thuế đã được cập nhật thành công!');
      setIsLoading(false);
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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Thay đổi TTĐK thuế</div>
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
          gap: 'md'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: 'md',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Thay đổi thông tin đăng ký thuế</h3>

            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: 'md'}}>
                <label style={{display: 'block', marginBottom: 'sm', fontWeight: 500, color: 'etax-text'}}>
                  Tên người nộp thuế:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  Mã số thuế:
                </label>
                <input
                  type="text"
                  name="mst"
                  value={formData.mst}
                  onChange={handleInputChange}
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
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
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
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                {isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThayDoiTTDKThue;
