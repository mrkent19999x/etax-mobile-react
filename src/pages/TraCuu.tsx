import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TraCuu: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    id: string;
    taxCode: string;
    amount: number;
    status: string;
    dueDate: string;
    title: string;
    type: string;
    date: string;
  }[]>([]);

  useEffect(() => {
    // Auth guard - kiểm tra đăng nhập
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Mock search results
      setSearchResults([
        {
          id: '1',
          taxCode: '0123456789',
          type: 'Tờ khai thuế',
          title: '01/TNDN - Q4/2024',
          status: 'Đã nộp',
          date: '15/01/2025',
          dueDate: '31/01/2025',
          amount: 15000000
        },
        {
          id: '2',
          taxCode: '0123456789',
          type: 'Biên lai nộp thuế',
          title: 'BL-2025-001234',
          status: 'Hoàn thành',
          date: '10/01/2025',
          dueDate: '31/01/2025',
          amount: 8500000
        }
      ]);
    }
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
        <div className="text-center">
          <h1 className="text-xl font-semibold">Tra cứu</h1>
          <p className="text-sm text-blue-100">Tìm kiếm thông tin</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <i className="fas fa-bell text-xl"></i>
        </button>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="bg-etax-surface rounded-2xl shadow-lg p-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khóa tìm kiếm..."
              className="flex-1 px-4 py-3 bg-etax-background border border-etax-border rounded-xl text-etax-text placeholder-etax-text-secondary focus:outline-none focus:ring-2 focus:ring-etax-primary focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-etax-primary text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Search Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Danh mục tra cứu</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleNavigation('/tra-cuu-chung-tu')}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="fas fa-file-alt text-blue-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Chứng từ</span>
            </button>
            <button
              onClick={() => handleNavigation('/hoadondt')}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <i className="fas fa-receipt text-green-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Hóa đơn</span>
            </button>
            <button
              onClick={() => handleNavigation('/thongtin')}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <i className="fas fa-info-circle text-purple-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Thông tin</span>
            </button>
            <button
              onClick={() => handleNavigation('/thongbao')}
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <i className="fas fa-bell text-orange-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Thông báo</span>
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Kết quả tìm kiếm</h2>
            <div className="space-y-3">
              {searchResults.map((result) => (
                <div key={result.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.type}</p>
                      <p className="text-sm text-gray-500">Ngày: {result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{result.amount}</p>
                      <span className={`text-sm ${
                        result.status === 'Đã nộp' || result.status === 'Hoàn thành'
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Tìm kiếm gần đây</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-history text-gray-400 mr-3"></i>
              <span className="text-gray-700">01/TNDN Q4/2024</span>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-history text-gray-400 mr-3"></i>
              <span className="text-gray-700">Biên lai nộp thuế</span>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-history text-gray-400 mr-3"></i>
              <span className="text-gray-700">Hóa đơn điện tử</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <i className="fas fa-filter text-blue-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Bộ lọc</span>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <i className="fas fa-download text-green-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Xuất file</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <i className="fas fa-bookmark text-purple-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Lưu tìm kiếm</span>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <i className="fas fa-question-circle text-orange-600 text-xl mb-2 block"></i>
              <span className="text-sm font-medium text-gray-800">Hỗ trợ</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <i className="fas fa-info-circle text-blue-600 text-lg mt-1"></i>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Hướng dẫn tra cứu</h3>
              <p className="text-sm text-blue-700 mb-3">
                Sử dụng từ khóa để tìm kiếm thông tin thuế. Bạn có thể tra cứu theo
                mã số thuế, số tờ khai, hoặc thời gian.
              </p>
              <button
                onClick={() => handleNavigation('/hotro')}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Xem hướng dẫn chi tiết →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600"
          >
            <i className="fas fa-home text-lg"></i>
            <span className="text-xs">Trang chủ</span>
          </button>
          <button
            onClick={() => handleNavigation('/khaithue')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600"
          >
            <i className="fas fa-file-alt text-lg"></i>
            <span className="text-xs">Khai thuế</span>
          </button>
          <button
            onClick={() => handleNavigation('/nopthue')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600"
          >
            <i className="fas fa-credit-card text-lg"></i>
            <span className="text-xs">Nộp thuế</span>
          </button>
          <button
            onClick={() => handleNavigation('/tracuttnpt')}
            className="flex flex-col items-center space-y-1 text-blue-600"
          >
            <i className="fas fa-search text-lg"></i>
            <span className="text-xs">Tra cứu</span>
          </button>
          <button
            onClick={() => handleNavigation('/thongbao')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600"
          >
            <i className="fas fa-bell text-lg"></i>
            <span className="text-xs">Thông báo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraCuu;
