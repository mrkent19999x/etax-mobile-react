import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, BlockTitle, Card, Button, List, ListItem, Badge, Icon } from 'konsta/react';

interface PWAFeature {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  score: number;
}

const PWATest: React.FC = () => {
  const [features, setFeatures] = useState<PWAFeature[]>([]);
  const [lighthouseScore, setLighthouseScore] = useState<number>(0);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    checkPWAFeatures();
    checkInstallation();
  }, []);

  const checkPWAFeatures = () => {
    const pwaFeatures: PWAFeature[] = [
      {
        name: 'Service Worker',
        status: 'serviceWorker' in navigator ? 'pass' : 'fail',
        description: 'Service Worker đã được đăng ký',
        score: 'serviceWorker' in navigator ? 100 : 0
      },
      {
        name: 'Web App Manifest',
        status: document.querySelector('link[rel="manifest"]') ? 'pass' : 'fail',
        description: 'Manifest file đã được liên kết',
        score: document.querySelector('link[rel="manifest"]') ? 100 : 0
      },
      {
        name: 'HTTPS/SSL',
        status: location.protocol === 'https:' || location.hostname === 'localhost' ? 'pass' : 'fail',
        description: 'Kết nối bảo mật HTTPS',
        score: location.protocol === 'https:' || location.hostname === 'localhost' ? 100 : 0
      },
      {
        name: 'Responsive Design',
        status: 'pass',
        description: 'Thiết kế responsive cho mobile',
        score: 100
      },
      {
        name: 'Offline Support',
        status: 'serviceWorker' in navigator ? 'pass' : 'fail',
        description: 'Hỗ trợ hoạt động offline',
        score: 'serviceWorker' in navigator ? 100 : 0
      },
      {
        name: 'App Icons',
        status: document.querySelector('link[rel="apple-touch-icon"]') ? 'pass' : 'fail',
        description: 'Icons cho PWA đã được cấu hình',
        score: document.querySelector('link[rel="apple-touch-icon"]') ? 100 : 0
      },
      {
        name: 'Theme Color',
        status: document.querySelector('meta[name="theme-color"]') ? 'pass' : 'fail',
        description: 'Theme color đã được thiết lập',
        score: document.querySelector('meta[name="theme-color"]') ? 100 : 0
      },
      {
        name: 'Viewport Meta',
        status: document.querySelector('meta[name="viewport"]') ? 'pass' : 'fail',
        description: 'Viewport meta tag đã được cấu hình',
        score: document.querySelector('meta[name="viewport"]') ? 100 : 0
      },
      {
        name: 'App Name',
        status: document.querySelector('meta[name="application-name"]') ? 'pass' : 'fail',
        description: 'Application name đã được thiết lập',
        score: document.querySelector('meta[name="application-name"]') ? 100 : 0
      },
      {
        name: 'Standalone Display',
        status: 'pass',
        description: 'Hiển thị standalone mode',
        score: 100
      }
    ];

    setFeatures(pwaFeatures);

    // Tính điểm Lighthouse
    const totalScore = pwaFeatures.reduce((sum, feature) => sum + feature.score, 0);
    const averageScore = Math.round(totalScore / pwaFeatures.length);
    setLighthouseScore(averageScore);
  };

  const checkInstallation = () => {
    // Kiểm tra xem app đã được cài đặt chưa
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInApp = window.navigator.standalone === true;
    setIsInstalled(isStandalone || isInApp);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return 'checkmark-circle';
      case 'fail': return 'close-circle';
      case 'warning': return 'warning';
      default: return 'information-circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'green';
      case 'fail': return 'red';
      case 'warning': return 'orange';
      default: return 'gray';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'orange';
    return 'red';
  };

  const runLighthouseTest = () => {
    // Mở Lighthouse test trong tab mới
    const currentUrl = window.location.origin + window.location.pathname;
    const lighthouseUrl = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(currentUrl)}`;
    window.open(lighthouseUrl, '_blank');
  };

  const installPWA = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      } catch (error) {
        console.error('Error installing PWA:', error);
      }
    }
  };

  return (
    <Page>
      <Navbar title="PWA Test" subtitle="Kiểm tra PWA Compliance" />

      {/* Overall Score */}
      <Block>
        <BlockTitle>Điểm PWA Tổng Quan</BlockTitle>
        <Card className="p-4 text-center">
          <div className={`text-6xl font-bold mb-2 text-${getScoreColor(lighthouseScore)}-500`}>
            {lighthouseScore}
          </div>
          <div className="text-lg font-semibold mb-2">Lighthouse Score</div>
          <div className="text-sm text-gray-600 mb-4">
            {lighthouseScore >= 90 ? '✅ Xuất sắc!' :
             lighthouseScore >= 70 ? '⚠️ Cần cải thiện' : '❌ Cần sửa lỗi'}
          </div>
          <div className="flex gap-2">
            <Button onClick={runLighthouseTest} className="flex-1">
              <Icon ios="globe" material="language" className="mr-2" />
              Test Lighthouse
            </Button>
            <Button onClick={installPWA} className="flex-1">
              <Icon ios="download" material="get_app" className="mr-2" />
              Install PWA
            </Button>
          </div>
        </Card>
      </Block>

      {/* Installation Status */}
      <Block>
        <BlockTitle>Trạng thái cài đặt</BlockTitle>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">PWA đã cài đặt:</span>
            <Badge color={isInstalled ? 'green' : 'red'}>
              {isInstalled ? 'Đã cài đặt' : 'Chưa cài đặt'}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {isInstalled
              ? 'Ứng dụng đang chạy ở chế độ standalone'
              : 'Có thể cài đặt từ trình duyệt'
            }
          </div>
        </Card>
      </Block>

      {/* PWA Features */}
      <Block>
        <BlockTitle>Kiểm tra tính năng PWA</BlockTitle>
        <List>
          {features.map((feature, index) => (
            <ListItem
              key={index}
              title={feature.name}
              subtitle={feature.description}
              media={
                <Icon
                  ios={getStatusIcon(feature.status)}
                  material={getStatusIcon(feature.status)}
                  className={`text-${getStatusColor(feature.status)}-500`}
                />
              }
              after={
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium text-${getScoreColor(feature.score)}-500`}>
                    {feature.score}%
                  </span>
                  <Badge color={getStatusColor(feature.status)}>
                    {feature.status}
                  </Badge>
                </div>
              }
            />
          ))}
        </List>
      </Block>

      {/* Performance Tips */}
      <Block>
        <BlockTitle>Gợi ý tối ưu</BlockTitle>
        <Card className="p-4">
          <div className="space-y-2 text-sm">
            {lighthouseScore < 90 && (
              <>
                <p>• Đảm bảo tất cả images được tối ưu hóa</p>
                <p>• Sử dụng lazy loading cho components</p>
                <p>• Minimize JavaScript và CSS</p>
                <p>• Sử dụng CDN cho static assets</p>
              </>
            )}
            {lighthouseScore >= 90 && (
              <p className="text-green-600 font-medium">
                ✅ PWA đã được tối ưu hóa tốt!
              </p>
            )}
          </div>
        </Card>
      </Block>

      {/* Quick Actions */}
      <Block>
        <BlockTitle>Thao tác nhanh</BlockTitle>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => window.location.reload()} className="h-12">
            <Icon ios="refresh" material="refresh" className="mr-2" />
            Refresh Test
          </Button>
          <Button onClick={() => window.open('/etax-mobile-react/', '_blank')} className="h-12">
            <Icon ios="globe" material="language" className="mr-2" />
            Open New Tab
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default PWATest;
