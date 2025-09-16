import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongTinNVT: React.FC = () => {
  const navigate = useNavigate();
  const [nvtInfo, setNvtInfo] = useState<{ name: string; mst: string; position?: string; department?: string; address: string; phone: string; email: string; taxOffice: string; status: string; registrationDate: string; lastUpdate: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load NVT info
    loadNVTInfo();
  }, [navigate]);

  const loadNVTInfo = async () => {
    setIsLoading(true);
    // Simulate loading NVT info
    setTimeout(() => {
      setNvtInfo({
        name: 'Nguyễn Văn A',
        mst: '0123456789',
        position: 'Nhân viên',
        department: 'Phòng Kế toán',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0901234567',
        email: 'nguyenvana@email.com',
        taxOffice: 'Cục Thuế TP.HCM',
        status: 'Hoạt động',
        registrationDate: '01/01/2020',
        lastUpdate: '15/01/2024'
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

  const handleEdit = () => {
    alert('Chức năng chỉnh sửa sẽ được mở...');
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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông tin NVT</div>
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
          {isLoading ? (
            <div style={{textAlign: 'center', padding: 'xl'}}>
              <div style={{fontSize: 'md', color: 'etax-text-secondary'}}>Đang tải thông tin...</div>
            </div>
          ) : nvtInfo ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: 'md',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Thông tin người nộp thuế</h3>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Tên người nộp thuế</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.name}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Mã số thuế</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.mst}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Địa chỉ</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500, lineHeight: 1.4}}>{nvtInfo.address}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Số điện thoại</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.phone}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Email</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.email}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Cơ quan thuế quản lý</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.taxOffice}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Trạng thái</div>
                <div style={{
                  fontSize: 'md',
                  color: nvtInfo.status === 'Hoạt động' ? 'etax-secondary' : 'etax-error',
                  fontWeight: 500
                }}>
                  {nvtInfo.status}
                </div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Ngày đăng ký</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.registrationDate}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Cập nhật lần cuối</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{nvtInfo.lastUpdate}</div>
              </div>

              <button
                onClick={handleEdit}
                style={{
                  width: '100%',
                  backgroundColor: 'etax-error',
                  color: 'white',
                  border: 'none',
                  padding: 'sm',
                  borderRadius: 'sm',
                  fontSize: 'md',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: 'xl'}}>
              <div style={{fontSize: 'md', color: 'etax-text-secondary'}}>Không tìm thấy thông tin NVT.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinNVT;
