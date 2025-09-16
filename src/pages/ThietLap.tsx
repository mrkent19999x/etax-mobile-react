import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThietLap: React.FC = () => {
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
    <div className="min-h-screen bg-etax-background">
      {/* Header */}
      <header className="bg-etax-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-semibold">Thiết lập</h1>
        <button
          onClick={handleHome}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <i className="fas fa-house text-xl"></i>
        </button>
      </header>

      {/* Content */}
      <div className="p-6">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => navigate('/doimatkhau')}
            className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <img src="/etax-mobile-react/assets/tl1.png" alt="Đổi mật khẩu" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Đổi mật khẩu</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/tl2.png" alt="Cài đặt thông báo" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Cài đặt thông báo</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/tl3.png" alt="Cài đặt bảo mật" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Cài đặt bảo mật</span>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/tl4.png" alt="Cài đặt ngôn ngữ" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Cài đặt ngôn ngữ</span>
          </div>
          <div className="bg-etax-surface rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <img src="/etax-mobile-react/assets/tl5.png" alt="Chức năng hay dùng" className="w-16 h-16 mx-auto mb-3" />
            <span className="text-etax-text font-medium text-sm leading-relaxed">Chức năng<br />hay dùng</span>
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

export default ThietLap;
