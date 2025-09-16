import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TienIch: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <div className="phone-frame">
      <header className="header bg-error text-white h-25 flex items-center justify-between px-5 fixed top-0 left-0 right-0 z-50 shadow-lg pt-safe">
        <i className="fas fa-arrow-left text-md cursor-pointer" onClick={handleBack}></i>
        <div className="header-title text-md font-medium text-center flex-1">Tiện ích</div>
        <i className="fas fa-house text-md cursor-pointer" onClick={handleHome}></i>
      </header>

      <div style={{paddingTop: '100px'}} data-cmp="Page" data-variant="default" data-size="lg">
        <div>&nbsp;</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 'md', marginBottom: 'md'}} data-cmp="Card" data-variant="default" data-size="md">
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti1.png" style={{width: '65px', height: '65px'}} alt="Tra cứu bảng giá tính thuế phương tiện" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu bảng<br />giá tính thuế<br />phương tiện</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti2.png" style={{width: '65px', height: '65px'}} alt="Tra cứu thông tin NNT" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu<br />thông tin NNT</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti3.png" style={{width: '65px', height: '65px'}} alt="Tra cứu hộ kinh doanh" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu hộ kinh<br />doanh</span>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 'md', marginBottom: 'md'}} data-cmp="Card" data-variant="default" data-size="md">
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti4.png" style={{width: '65px', height: '65px'}} alt="Công cụ tính thuế TNCN" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Công cụ tính<br />thuế TNCN</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/nt8.png" style={{width: '65px', height: '65px'}} alt="Quét QR-Code cho Tem rượu, thuốc lá điện tử" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Quét QR-<br />Code cho Tem<br />rượu, thuốc lá<br />điện tử</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti5.png" style={{width: '65px', height: '65px'}} alt="Phản hồi về hộ kinh doanh" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Phản hồi về hộ<br />kinh doanh</span>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 'md', marginBottom: 'md'}} data-cmp="Card" data-variant="default" data-size="md">
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/nt8.png" style={{width: '65px', height: '65px'}} alt="Công cụ tính thuế môn bài" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Công cụ tính<br />thuế môn bài</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti6.png" style={{width: '65px', height: '65px'}} alt="Tra cứu mã số thuế" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu mã số<br />thuế</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti7.png" style={{width: '65px', height: '65px'}} alt="Tra cứu thông tin doanh nghiệp" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu thông tin<br />doanh nghiệp</span>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 'md', marginBottom: 'md'}} data-cmp="Card" data-variant="default" data-size="md">
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti8.png" style={{width: '65px', height: '65px'}} alt="Tra cứu thông tin cơ sở kinh doanh" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu thông tin<br />cơ sở kinh doanh</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">
            <div onClick={() => {}} style={{textAlign: 'center', cursor: 'pointer'}} data-cmp="Button" data-variant="ghost" data-size="md">
              <img src="/assets/ti9.png" style={{width: '65px', height: '65px'}} alt="Tra cứu thông tin cơ sở kinh doanh" />
              <br />
              <span style={{display: 'inline-block', lineHeight: 1.4}}>Tra cứu thông tin<br />cơ sở kinh doanh</span>
            </div>
          </div>
          <div style={{textAlign: 'center', width: '200px'}} data-cmp="Card" data-variant="default" data-size="sm">

          </div>
        </div>
      </div>
    </div>
  );
};

export default TienIch;
