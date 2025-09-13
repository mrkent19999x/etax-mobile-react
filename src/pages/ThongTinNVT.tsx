import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../contexts/DemoContext';
import { ContentReplacer } from '../utils/ContentReplacer';

const ThongTinNVT: React.FC = () => {
  const navigate = useNavigate();
  const { clientData } = useDemo();
  const [nvtInfo, setNvtInfo] = useState<any>(null);
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
    
    // Load placeholders từ demo data
    if (clientData) {
      ContentReplacer.loadPlaceholders(clientData);
    }
    
    // Simulate loading NVT info với nội dung động
    setTimeout(() => {
      const dynamicInfo = {
        name: ContentReplacer.getPlaceholder('user_name') || 'Nguyễn Văn A',
        mst: ContentReplacer.getPlaceholder('user_mst') || '0123456789',
        address: ContentReplacer.getPlaceholder('address') || '123 Đường ABC, Quận 1, TP.HCM',
        phone: ContentReplacer.getPlaceholder('phone') || '0901234567',
        email: ContentReplacer.getPlaceholder('email') || 'nguyenvana@email.com',
        taxOffice: ContentReplacer.getPlaceholder('tax_office') || 'Cục Thuế TP.HCM',
        status: ContentReplacer.getPlaceholder('status') || 'Hoạt động',
        registrationDate: ContentReplacer.getPlaceholder('registration_date') || '01/01/2020',
        lastUpdate: ContentReplacer.getPlaceholder('last_update') || '15/01/2024'
      };
      
      setNvtInfo(dynamicInfo);
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông tin NVT</div>
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
              <div style={{fontSize: '16px', color: '#666'}}>Đang tải thông tin...</div>
            </div>
          ) : nvtInfo ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{marginBottom: '20px', fontSize: '18px', color: 'black'}}>Thông tin người nộp thuế</h3>
              
              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Tên người nộp thuế</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.name}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Mã số thuế</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.mst}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Địa chỉ</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500, lineHeight: 1.4}}>{nvtInfo.address}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Số điện thoại</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.phone}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Email</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.email}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Cơ quan thuế quản lý</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.taxOffice}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Trạng thái</div>
                <div style={{
                  fontSize: '16px', 
                  color: nvtInfo.status === 'Hoạt động' ? '#2e7d32' : '#d32f2f', 
                  fontWeight: 500
                }}>
                  {nvtInfo.status}
                </div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Ngày đăng ký</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.registrationDate}</div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Cập nhật lần cuối</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{nvtInfo.lastUpdate}</div>
              </div>

              <button
                onClick={handleEdit}
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
                Chỉnh sửa thông tin
              </button>
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <div style={{fontSize: '16px', color: '#666'}}>Không tìm thấy thông tin NVT.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinNVT;