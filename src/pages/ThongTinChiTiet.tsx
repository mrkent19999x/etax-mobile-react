import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongTinChiTiet: React.FC = () => {
  const navigate = useNavigate();
  const [taxDetail, setTaxDetail] = useState<{ id: string; name: string; amount: number; status: string; date: string; dueDate: string; paid: string; reference: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load tax detail data
    const taxDetailData = localStorage.getItem('selectedTaxDetail');
    if (taxDetailData) {
      setTaxDetail(JSON.parse(taxDetailData));
    } else {
      // Default data if no selection
      setTaxDetail({
        id: '04057866369400001',
        decision: '1866/TB-CCT',
        date: '07/01/2025',
        office: 'Đội Thuế thành phố Hạ Long',
        chapter: '757',
        period: '00/06/2025',
        type: 'Thuế giá trị gia tăng hàng sản xuất, kinh doanh trong nước (gồm cả dịch vụ trong lĩnh vực dầu khí) (1701)',
        region: 'Thành phố Hạ Long (193HH)',
        dueDate: '30/06/2025',
        amount: '1,250,000 VND',
        paid: '0 VND',
        status: 'Còn phải nộp',
        reference: '11020250031907891'
      });
    }
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
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
        <div className="header-title" style={{fontSize: '20px', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông tin chi tiết</div>
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
          {taxDetail && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{marginBottom: '20px', fontSize: '18px', color: 'black'}}>Chi tiết thông tin thuế</h3>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Mã số thuế</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.id}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Quyết định</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.decision}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Ngày</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.date}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Cơ quan thuế</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.office}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Chương</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.chapter}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Kỳ</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.period}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Loại thuế</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500, lineHeight: 1.4}}>{taxDetail.type}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Vùng</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.region}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Hạn nộp</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.dueDate}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Số tiền</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.amount}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Đã nộp</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.paid}</div>
              </div>

              <div style={{marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Trạng thái</div>
                <div style={{
                  fontSize: '16px',
                  color: taxDetail.status === 'Còn phải nộp' ? '#d32f2f' : '#2e7d32',
                  fontWeight: 500
                }}>
                  {taxDetail.status}
                </div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Mã tham chiếu</div>
                <div style={{fontSize: '16px', color: '#333', fontWeight: 500}}>{taxDetail.reference}</div>
              </div>

              <button
                onClick={() => alert('Chức năng thanh toán sẽ được mở...')}
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
                Thanh toán ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThongTinChiTiet;
