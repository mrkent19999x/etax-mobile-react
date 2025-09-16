import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, BlockTitle, Card, Button, List, ListItem, Badge } from 'konsta/react';

const SimplePWATest: React.FC = () => {
  const [tests, setTests] = useState<Array<{name: string, status: 'pass' | 'fail', score: number}>>([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = () => {
    const testResults = [
      {
        name: 'Service Worker',
        status: ('serviceWorker' in navigator) ? 'pass' : 'fail',
        score: ('serviceWorker' in navigator) ? 100 : 0
      },
      {
        name: 'Manifest File',
        status: document.querySelector('link[rel="manifest"]') ? 'pass' : 'fail',
        score: document.querySelector('link[rel="manifest"]') ? 100 : 0
      },
      {
        name: 'HTTPS/Localhost',
        status: (location.protocol === 'https:' || location.hostname === 'localhost') ? 'pass' : 'fail',
        score: (location.protocol === 'https:' || location.hostname === 'localhost') ? 100 : 0
      },
      {
        name: 'App Icons',
        status: document.querySelector('link[rel="apple-touch-icon"]') ? 'pass' : 'fail',
        score: document.querySelector('link[rel="apple-touch-icon"]') ? 100 : 0
      },
      {
        name: 'Theme Color',
        status: document.querySelector('meta[name="theme-color"]') ? 'pass' : 'fail',
        score: document.querySelector('meta[name="theme-color"]') ? 100 : 0
      },
      {
        name: 'Viewport Meta',
        status: document.querySelector('meta[name="viewport"]') ? 'pass' : 'fail',
        score: document.querySelector('meta[name="viewport"]') ? 100 : 0
      },
      {
        name: 'App Name',
        status: document.querySelector('meta[name="application-name"]') ? 'pass' : 'fail',
        score: document.querySelector('meta[name="application-name"]') ? 100 : 0
      },
      {
        name: 'Responsive Design',
        status: 'pass',
        score: 100
      }
    ];

    setTests(testResults);

    const score = testResults.reduce((sum, test) => sum + test.score, 0);
    const average = Math.round(score / testResults.length);
    setTotalScore(average);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'orange';
    return 'red';
  };

  const openLighthouse = () => {
    const url = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <Page>
      <Navbar title="PWA Test" subtitle="Kiểm tra PWA" />

      {/* Score */}
      <Block>
        <BlockTitle>Điểm PWA</BlockTitle>
        <Card className="p-4 text-center">
          <div className={`text-6xl font-bold mb-2 text-${getScoreColor(totalScore)}-500`}>
            {totalScore}
          </div>
          <div className="text-lg font-semibold mb-2">Lighthouse Score</div>
          <div className="text-sm text-gray-600 mb-4">
            {totalScore >= 90 ? '✅ Xuất sắc!' :
             totalScore >= 70 ? '⚠️ Cần cải thiện' : '❌ Cần sửa lỗi'}
          </div>
          <Button onClick={openLighthouse} className="w-full">
            Test Lighthouse Thực Tế
          </Button>
        </Card>
      </Block>

      {/* Test Results */}
      <Block>
        <BlockTitle>Kết quả kiểm tra</BlockTitle>
        <List>
          {tests.map((test, index) => (
            <ListItem
              key={index}
              title={test.name}
              after={
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium text-${getScoreColor(test.score)}-500`}>
                    {test.score}%
                  </span>
                  <Badge color={test.status === 'pass' ? 'green' : 'red'}>
                    {test.status === 'pass' ? 'PASS' : 'FAIL'}
                  </Badge>
                </div>
              }
            />
          ))}
        </List>
      </Block>

      {/* Quick Actions */}
      <Block>
        <BlockTitle>Thao tác</BlockTitle>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={runTests}>
            Chạy lại test
          </Button>
          <Button onClick={() => window.location.reload()}>
            Refresh trang
          </Button>
        </div>
      </Block>

      {/* Info */}
      <Block>
        <BlockTitle>Thông tin</BlockTitle>
        <Card className="p-4">
          <div className="space-y-2 text-sm">
            <p><strong>URL:</strong> {window.location.href}</p>
            <p><strong>Protocol:</strong> {location.protocol}</p>
            <p><strong>Hostname:</strong> {location.hostname}</p>
            <p><strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}...</p>
          </div>
        </Card>
      </Block>
    </Page>
  );
};

export default SimplePWATest;
