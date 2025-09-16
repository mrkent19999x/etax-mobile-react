import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NopThue: React.FC = () => {
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
        <h1 className="text-xl font-semibold text-center flex-1">Nhóm chức năng nộp thuế</h1>
        <button
          onClick={handleBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <i className="fas fa-house text-xl"></i>
        </button>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt1.png" alt="Nộp thuế" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Nộp thuế</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt2.png" alt="Nộp thuế thay" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Nộp thuế thay</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt3.png" alt="Tra cứu chứng từ nộp thuế" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Tra cứu chứng<br />từ nộp thuế</span>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt4.png" alt="Tra cứu hồ sơ nộp thuế" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Tra cứu hồ sơ<br />nộp thuế</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt5.png" alt="Tra cứu hồ sơ nộp Lệ phí trước bạ" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Tra cứu hồ sơ<br />nộp Lệ phí<br />trước bạ</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt6.png" alt="Tra cứu hồ sơ nộp thuế đất đai" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Tra cứu hồ sơ<br />nộp thuế<br />đất đai</span>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/nt7.png" alt="Tra cứu hồ sơ nộp thuế môn bài" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Tra cứu hồ sơ<br />nộp thuế<br />môn bài</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer opacity-50">
            <div className="w-16 h-16 mx-auto mb-3 bg-etax-background rounded-full flex items-center justify-center">
              <i className="fas fa-plus text-etax-text-secondary"></i>
            </div>
            <span className="text-etax-text-secondary font-medium text-sm">Thêm chức năng</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer opacity-50">
            <div className="w-16 h-16 mx-auto mb-3 bg-etax-background rounded-full flex items-center justify-center">
              <i className="fas fa-plus text-etax-text-secondary"></i>
            </div>
            <span className="text-etax-text-secondary font-medium text-sm">Thêm chức năng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NopThue;
