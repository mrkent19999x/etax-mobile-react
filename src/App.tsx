import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './contexts/DemoContext';
import { App as KonstaApp } from 'konsta/react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KhaiThue from './pages/KhaiThue';
import NopThue from './pages/NopThue';
import ThongBao from './pages/ThongBao';
import HoSo from './pages/HoSo';
import HoTro from './pages/HoTro';
import DangKy from './pages/DangKy';
import DoiMatKhau from './pages/DoiMatKhau';
import ThietLap from './pages/ThietLap';
import TienIch from './pages/TienIch';
import VanTay from './pages/VanTay';
import HoaDonDT from './pages/HoaDonDT';
import ThongTin from './pages/ThongTin';
import ThongTinChiTiet from './pages/ThongTinChiTiet';
import ThongTinNVT from './pages/ThongTinNVT';
import NghiaVu from './pages/NghiaVu';
import HSDKyThue from './pages/HSDKyThue';
import ThayDoiTTDKThue from './pages/ThayDoiTTDKThue';
import ChiTietThongBao from './pages/ChiTietThongBao';
import PageThongBao from './pages/PageThongBao';
import TraCuuChungTu from './pages/TraCuuChungTu';
import HoTroQTT from './pages/HoTroQTT';
import HoTroQTThue from './pages/HoTroQTThue';
import TraCuuTNPT from './pages/TraCuuTNPT';
import DemoManagement from './pages/DemoManagement';
import AdminPanel from './pages/AdminPanel';
import SecureDemoManagement from './pages/SecureDemoManagement';

const App: React.FC = () => {
  return (
    <KonstaApp theme="ios" safeAreas>
      <DemoProvider>
        <Router basename="/etax-mobile-react">
          <div className="min-h-screen bg-gray-50">
          <Routes>
          {/* Entry point */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Main pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/khaithue" element={<KhaiThue />} />
          <Route path="/nopthue" element={<NopThue />} />
          <Route path="/thongbao" element={<ThongBao />} />
          <Route path="/hoso" element={<HoSo />} />
          <Route path="/hotro" element={<HoTro />} />
          
          {/* User management */}
          <Route path="/dangky" element={<DangKy />} />
          <Route path="/doimatkhau" element={<DoiMatKhau />} />
          <Route path="/thietlap" element={<ThietLap />} />
          
          {/* Utilities */}
          <Route path="/tienich" element={<TienIch />} />
          <Route path="/vantay" element={<VanTay />} />
          <Route path="/hoadondt" element={<HoaDonDT />} />
          
          {/* Information */}
          <Route path="/thongtin" element={<ThongTin />} />
          <Route path="/thongtin-chitiet" element={<ThongTinChiTiet />} />
          <Route path="/thongtinnvt" element={<ThongTinNVT />} />
          <Route path="/nghiavu" element={<NghiaVu />} />
          
          {/* Tax management */}
          <Route path="/hsdkythue" element={<HSDKyThue />} />
          <Route path="/thaydoittdkthue" element={<ThayDoiTTDKThue />} />
          
          {/* Notifications */}
          <Route path="/chi-tiet-thong-bao" element={<ChiTietThongBao />} />
          <Route path="/page-thongbao" element={<PageThongBao />} />
          
          {/* Search */}
          <Route path="/tra-cuu-chung-tu" element={<TraCuuChungTu />} />
          
          {/* Support */}
          <Route path="/ho-tro-qtt" element={<HoTroQTT />} />
          <Route path="/ho-tro-qtthue" element={<HoTroQTThue />} />
          
          {/* Search */}
          <Route path="/tracuttnpt" element={<TraCuuTNPT />} />
          
                  {/* Admin */}
                  <Route path="/demo-management" element={<DemoManagement />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/secure-demo" element={<SecureDemoManagement />} />
          </Routes>
        </div>
        </Router>
      </DemoProvider>
    </KonstaApp>
  );
};

export default App;