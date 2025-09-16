import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThongTinChiTiet: React.FC = () => {
  const navigate = useNavigate();
  const [taxDetail, setTaxDetail] = useState<{ id: string; name: string; amount: number | string; status: string; date: string; dueDate: string; paid: string; reference: string; decision?: string; office?: string; chapter?: string; period?: string; type?: string; region?: string } | null>(null);

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
        name: 'Thuế GTGT tháng 1/2025',
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
        <div className="header-title" style={{fontSize: 'md', fontWeight: 500, textAlign: 'center', flex: 1}}>Thông tin chi tiết</div>
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
          {taxDetail && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: 'md',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{marginBottom: 'md', fontSize: '18px', color: 'black'}}>Chi tiết thông tin thuế</h3>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Mã số thuế</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.id}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Quyết định</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.decision}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Ngày</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.date}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Cơ quan thuế</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.office}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Chương</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.chapter}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Kỳ</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.period}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Loại thuế</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500, lineHeight: 1.4}}>{taxDetail.type}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Vùng</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.region}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Hạn nộp</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.dueDate}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Số tiền</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.amount}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Đã nộp</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.paid}</div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Trạng thái</div>
                <div style={{
                  fontSize: 'md',
                  color: taxDetail.status === 'Còn phải nộp' ? 'etax-error' : 'etax-secondary',
                  fontWeight: 500
                }}>
                  {taxDetail.status}
                </div>
              </div>

              <div style={{marginBottom: 'md'}}>
                <div style={{fontSize: 'body-2', color: 'etax-text-secondary', marginBottom: 'xs'}}>Mã tham chiếu</div>
                <div style={{fontSize: 'md', color: 'etax-text', fontWeight: 500}}>{taxDetail.reference}</div>
              </div>

              <button
                onClick={() => alert('Chức năng thanh toán sẽ được mở...')}
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
