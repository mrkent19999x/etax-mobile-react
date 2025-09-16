import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDemo } from '../hooks/useDemo'; // Unused for now
import { mockData } from '../data/mockData';
import TaxSummaryCard from '../components/TaxSummaryCard';
import NotificationBadge from '../components/NotificationBadge';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // const { } = useDemo(); // Unused for now
  const [user, setUser] = useState<{ name: string; mst: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in (support both keys)
    const loggedInUser = localStorage.getItem('etax_logged_in_user') || localStorage.getItem('isLoggedIn');
    if (!loggedInUser) {
      navigate('/');
      return;
    }

    // Load user data (support both keys) or use mock data
    const userData = localStorage.getItem('etax_user') || localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Fallback to mock data for demo
      setUser(mockData.user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('etax_logged_in_user');
    localStorage.removeItem('etax_user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const scrollLeft = () => {
    const scrollable = document.getElementById('scrollable');
    if (scrollable) {
      scrollable.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const scrollable = document.getElementById('scrollable');
    if (scrollable) {
      scrollable.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Side Menu */}
      <div className={`slide-menu ${menuOpen ? 'show' : ''}`}>
        <div className="slide-links">
          <a href="/dashboard">
            <img src="/etax-mobile-react/assets/trangchu.png" width="32" height="32" alt="Trang chủ" />
            Trang chủ
          </a>
          <a href="/hoadondt">
            <img src="/etax-mobile-react/assets/index1.png" width="32" height="32" alt="Hóa đơn điện tử" />
            Hóa đơn điện tử
          </a>
          <a href="/khaithue">
            <img src="/etax-mobile-react/assets/icon5.png" width="32" height="32" alt="Khai thuế" />
            Khai thuế
          </a>
          <a href="/dangky">
            <img src="/etax-mobile-react/assets/icon5.png" width="32" height="32" alt="Đăng ký thuế" />
            Đăng ký thuế
          </a>
          <a href="/ho-tro-qtt">
            <img src="/etax-mobile-react/assets/icon6.png" width="32" height="32" alt="Hỗ trợ quyết toán thuế TNCN" />
            Hỗ trợ quyết toán thuế TNCN
          </a>
          <a href="/hoso">
            <img src="/etax-mobile-react/assets/icon7.png" width="32" height="32" alt="Tra cứu hồ sơ khai thuế" />
            Tra cứu hồ sơ khai thuế
          </a>
          <a href="/nopthue">
            <img src="/etax-mobile-react/assets/icon8.png" width="32" height="32" alt="Nhóm chức năng nộp thuế" />
            Nhóm chức năng nộp thuế
          </a>
          <a href="/nghiavu">
            <img src="/etax-mobile-react/assets/icon9.png" width="32" height="32" alt="Tra cứu nghĩa vụ thuế" />
            Tra cứu nghĩa vụ thuế
          </a>
          <a href="/thongbao">
            <img src="/etax-mobile-react/assets/icon10.png" width="32" height="32" alt="Tra cứu thông báo" />
            Tra cứu thông báo
          </a>
          <a href="/tienich">
            <img src="/etax-mobile-react/assets/icon11.png" width="32" height="32" alt="Tiện ích" />
            Tiện ích
          </a>
          <a href="/hotro">
            <img src="/etax-mobile-react/assets/icon12.png" width="32" height="32" alt="Hỗ trợ" />
            Hỗ trợ
          </a>
          <a href="/thietlap">
            <img src="/etax-mobile-react/assets/icon13.png" width="32" height="32" alt="Thiết lập cá nhân" />
            Thiết lập cá nhân
          </a>
          <a href="#">
            <img src="/etax-mobile-react/assets/icon-doimk.png" width="32" height="32" alt="Đổi mật khẩu đăng nhập" />
            Đổi mật khẩu đăng nhập
          </a>
          <a href="#">
            <img src="/etax-mobile-react/assets/faceid.png" width="32" height="32" alt="Đăng nhập bằng vân tay / FaceID" />
            Đăng nhập bằng vân tay / FaceID
          </a>
          <div className="p-5 border-t border-gray-200 mt-2">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white border-none rounded-full py-4 px-5 text-base font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className={`menu-overlay ${menuOpen ? 'show' : ''}`} onClick={closeMenu}></div>

      {/* Header */}
      <header className="topbar">
        <div className="left-menu" onClick={openMenu}>☰</div>
        <div className="center-logo">
          <img src="/etax-mobile-react/assets/logo.png" alt="Logo" />
          <span>eTax Mobile</span>
        </div>
        <div className="right-icon">
          <img src="/etax-mobile-react/assets/icon-qr.png" alt="QR" className="icon-32" />
          <a href="/thongbao">
            <NotificationBadge />
          </a>
        </div>
      </header>

      <div className="content-scrollable">
        <div className="unified-viewport">
          <div className="scrollable-content">
            {/* User Info Section */}
            <section className="user-info">
              <img className="avatar" src="/etax-mobile-react/assets/avatar.png" alt="Avatar" />
              <div className="userinfo-text">
                <div className="mst" id="user-mst">
                  MST: {user?.mst || '...'}
                </div>
                <div className="username">
                  <span id="user-name">
                    {user?.fullName || user?.name || '(Chưa đăng nhập)'}
                  </span>
                  <a href="/thongtin">
                    <img src="/etax-mobile-react/assets/nutha.png" alt="Thông tin" />
                  </a>
                </div>
              </div>
            </section>

            {/* Tax Summary Card */}
            <TaxSummaryCard />

            {/* Quick Actions Section */}
            <section className="quick-actions">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>&nbsp;&nbsp;Chức năng hay dùng</h3>
                <img src="/etax-mobile-react/assets/2gach.png" alt="cài đặt" />
              </div>

              <button onClick={scrollLeft} className="scroll-btn left">
                <img src="/etax-mobile-react/assets/arrow-left.png" alt="Scroll Left" />
              </button>

              <button onClick={scrollRight} className="scroll-btn right">
                <img src="/etax-mobile-react/assets/arrow-right.png" alt="Scroll Right" />
              </button>

              <div id="scrollable" className="scrollable-row">
                <div className="scroll-item" onClick={() => navigate('/tracuttnpt')}>
                  <img src="/etax-mobile-react/assets/icon1.png" alt="Tra cứu thông tin người phụ thuộc" />
                  <span>Tra cứu<br />thông tin<br />người phụ<br />thuộc</span>
                </div>
                <div className="scroll-item" onClick={() => navigate('/hsdkythue')}>
                  <img src="/etax-mobile-react/assets/icon2.png" alt="Hồ sơ đăng ký thuế" />
                  <span>Hồ sơ<br />đăng ký<br />thuế</span>
                </div>
                <div className="scroll-item">
                  <img src="/etax-mobile-react/assets/icon3.png" alt="Hồ sơ quyết toán thuế" />
                  <span>Hồ sơ<br />quyết<br />toán thuế</span>
                </div>
                <div className="scroll-item">
                  <img src="/etax-mobile-react/assets/icon4.png" alt="Tra cứu thông tin quyết toán" />
                  <span>Tra cứu<br />thông tin<br />quyết<br />toán</span>
                </div>
                <div className="scroll-item" onClick={() => navigate('/tra-cuu-chung-tu')}>
                  <img src="/etax-mobile-react/assets/icon4.png" alt="Tra cứu chứng từ thuế" />
                  <span>Tra cứu<br />chứng từ<br />thuế</span>
                </div>
              </div>
            </section>

            {/* Services Grid Section - 3x4 Grid */}
            <section className="group-services">
              <h3>Danh sách nhóm dịch vụ</h3>
              <div className="services-grid-3x4">
                <div className="grid-item" onClick={() => navigate('/hoadondt')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index1.png" alt="Hoá đơn điện tử" />
                  </div>
                  <span>Hoá đơn<br />điện<br />tử</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/khaithue')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index2.png" alt="Khai thuế" />
                  </div>
                  <span>Khai thuế</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/dangky')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index3.png" alt="Đăng ký thuế" />
                  </div>
                  <span>Đăng ký thuế</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/ho-tro-qtt')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index4.png" alt="Hỗ trợ quyết toán thuế TNCN" />
                  </div>
                  <span>Hỗ trợ quyết toán<br />thuế<br />TNCN</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/nopthue')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index5.png" alt="Nhóm chức năng nộp thuế" />
                  </div>
                  <span>Nhóm chức<br />năng nộp<br />thuế</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/nghiavu')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index6.png" alt="Tra cứu nghĩa vụ thuế" />
                  </div>
                  <span>Tra cứu<br />nghĩa vụ<br />thuế</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/thongbao')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index7.png" alt="Tra cứu thông báo" />
                  </div>
                  <span>Tra cứu<br />thông báo</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/tienich')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index8.png" alt="Tiện ích" />
                  </div>
                  <span>Tiện ích</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/hotro')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index9.png" alt="Hỗ trợ" />
                  </div>
                  <span>Hỗ trợ</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/hoso')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index10.png" alt="Hồ sơ" />
                  </div>
                  <span>Hồ sơ</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/thongtin')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index11.png" alt="Thông tin" />
                  </div>
                  <span>Thông tin</span>
                </div>
                <div className="grid-item" onClick={() => navigate('/thietlap')}>
                  <div className="grid-icon">
                    <img src="/etax-mobile-react/assets/index12.png" alt="Thiết lập" />
                  </div>
                  <span>Thiết lập</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
