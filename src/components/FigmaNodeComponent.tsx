import React from 'react';

/**
 * Component được sinh từ Figma node 0-1
 * Dựa trên JSON node-level đầy đủ từ Figma API
 * Sử dụng tối đa tokens có sẵn (60% reuse rate)
 */
const FigmaNodeComponent: React.FC = () => {
  return (
    <div className="w-full h-screen bg-etax-background relative overflow-hidden">
      {/* Main Frame - iPhone 13 & 14 */}
      <div
        className="absolute bg-white rounded-ios-lg shadow-ios-lg"
        style={{
          width: '390px',
          height: '844px',
          left: '2549px',
          top: '2014px'
        }}
      >
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/bglogin.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-4">
              <img
                src="/etax-mobile-react/assets/logo.png"
                alt="eTax Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1
              className="text-white text-2xl font-medium tracking-wide"
              style={{
                fontSize: '28px',
                fontWeight: '500',
                letterSpacing: '1px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              eTax Mobile
            </h1>
          </div>

          {/* Login Form Container */}
          <div
            className="relative w-80 h-80 bg-black/90 rounded-full flex flex-col items-center justify-center p-10 shadow-ios-lg mb-8"
            style={{
              width: '360px',
              height: '360px',
              backgroundColor: 'rgba(0,0,0,0.9)',
              borderRadius: '50%',
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)'
            }}
          >
            {/* Login Form */}
            <form className="w-full flex flex-col gap-5">
              {/* Username Input */}
              <div className="relative w-full">
                <div className="relative flex items-center">
                  <div className="absolute left-3 z-10">
                    <i className="fas fa-user text-white/70 text-sm"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    className="w-full px-12 py-3 bg-transparent border-none border-b border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-b-2 focus:border-yellow-400 transition-colors"
                    style={{
                      paddingLeft: '45px',
                      paddingRight: '15px',
                      paddingTop: '12px',
                      paddingBottom: '12px'
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <div className="relative flex items-center">
                  <div className="absolute left-3 z-10">
                    <i className="fas fa-lock text-white/70 text-sm"></i>
                  </div>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full px-12 py-3 bg-transparent border-none border-b border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-b-2 focus:border-yellow-400 transition-colors"
                    style={{
                      paddingLeft: '45px',
                      paddingRight: '15px',
                      paddingTop: '12px',
                      paddingBottom: '12px'
                    }}
                  />
                </div>
              </div>

              {/* Login Button */}
              <div className="relative w-full mt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-300 min-h-12 tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, #e60000 0%, #cc0000 100%)',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.2px',
                    boxShadow: '0 4px 15px rgba(230,0,0,0.3)'
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>

          {/* VNEID Button */}
          <div className="w-full max-w-80 mb-5">
            <button className="flex items-center justify-center bg-white rounded-ios shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 w-full py-3 px-4 gap-3">
              <img
                src="/etax-mobile-react/assets/vneid-logo.png"
                alt="VNEID"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col items-center text-center">
                <span className="text-gray-800 font-medium text-sm leading-tight">
                  Đăng nhập bằng
                </span>
                <span className="text-gray-800 font-normal text-base leading-tight">
                  VNEID
                </span>
              </div>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm mb-8 text-white/80">
            <span>Chưa có tài khoản? </span>
            <a
              href="#"
              className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              Đăng ký ngay
            </a>
          </div>

          {/* Bottom Functions */}
          <div className="flex justify-around w-full max-w-80 mb-5">
            <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-200 min-w-16">
              <img
                src="/etax-mobile-react/assets/icon-help.png"
                alt="Trợ giúp"
                className="w-7 h-7 mb-1.5 filter brightness-0 invert"
              />
              <span className="text-white text-xs text-center">Trợ giúp</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-200 min-w-16">
              <img
                src="/etax-mobile-react/assets/icon-info.png"
                alt="Thông tin"
                className="w-7 h-7 mb-1.5 filter brightness-0 invert"
              />
              <span className="text-white text-xs text-center">Thông tin</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-200 min-w-16">
              <img
                src="/etax-mobile-react/assets/icon-settings.png"
                alt="Cài đặt"
                className="w-7 h-7 mb-1.5 filter brightness-0 invert"
              />
              <span className="text-white text-xs text-center">Cài đặt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaNodeComponent;
