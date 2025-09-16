import React, { useEffect } from 'react';
// PHASE-REUSE-BURST-40M: Remap for 80% reuse
import { useNavigate } from 'react-router-dom';

const HoTroQTThue: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleBack = () => navigate('/hotro');

  return (
    <div className="min-h-screen bg-gray-100 font-ios" data-cmp="Page" data-variant="default" data-size="lg">
      <div className="bg-red-800 text-white p-4 pt-12 pb-6 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="p-2 rounded-full hover:bg-red-700">
            <i className="fas fa-arrow-left text-lg"></i>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold">Hỗ trợ quyết toán thuế</h1>
            <p className="text-sm opacity-90">Hướng dẫn quyết toán</p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Hướng dẫn quyết toán</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <i className="fas fa-file-alt text-blue-600 mr-3"></i>
              <span className="text-gray-800">Quy trình quyết toán thuế</span>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <i className="fas fa-calculator text-green-600 mr-3"></i>
              <span className="text-gray-800">Cách tính thuế quyết toán</span>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <i className="fas fa-list text-purple-600 mr-3"></i>
              <span className="text-gray-800">Danh mục tài liệu cần thiết</span>
            </button>
            <button className="w-full text-left p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <i className="fas fa-calendar text-orange-600 mr-3"></i>
              <span className="text-gray-800">Lịch trình quyết toán</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Tài liệu hỗ trợ</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-file-pdf text-red-600 mr-3"></i>
              <span className="text-gray-800">Hướng dẫn quyết toán thuế 2024.pdf</span>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-file-excel text-green-600 mr-3"></i>
              <span className="text-gray-800">Mẫu tờ khai quyết toán.xlsx</span>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <i className="fas fa-file-word text-blue-600 mr-3"></i>
              <span className="text-gray-800">Danh mục tài liệu.docx</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Liên hệ hỗ trợ</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-600 text-xl"></i>
                <div>
                  <h3 className="font-medium text-gray-800">Hotline quyết toán</h3>
                  <p className="text-sm text-gray-600">1900 5678</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-medium">Gọi ngay</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-green-600 text-xl"></i>
                <div>
                  <h3 className="font-medium text-gray-800">Email hỗ trợ</h3>
                  <p className="text-sm text-gray-600">quyettoan@etax.gov.vn</p>
                </div>
              </div>
              <button className="text-green-600 text-sm font-medium">Gửi email</button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <i className="fas fa-exclamation-triangle text-yellow-600 text-lg mt-1"></i>
            <div>
              <h3 className="font-medium text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <p className="text-sm text-yellow-700">
                Thời hạn nộp hồ sơ quyết toán thuế là 90 ngày kể từ ngày kết thúc năm dương lịch.
                Vui lòng chuẩn bị đầy đủ tài liệu và nộp đúng hạn để tránh bị phạt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoTroQTThue;
