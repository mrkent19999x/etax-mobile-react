import React, { useState, useEffect } from 'react';

interface TokenData {
  mst: string;
  password: string;
  company: string;
  content: {
    welcome: string;
    features: string[];
    customMessage: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
    };
  };
}

interface Token {
  id: string;
  client: string;
  expires: string;
  status: string;
  data?: TokenData;
}

const DemoManagement: React.FC = () => {
  const [tokens, setTokens] = useState<Record<string, Token>>({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newToken, setNewToken] = useState({
    id: '',
    client: '',
    expires: '',
    mst: '',
    password: '',
    company: '',
    welcome: '',
    features: [] as string[],
    customMessage: ''
  });

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const response = await fetch('/demo-tokens.json');
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateToken = () => {
    if (!newToken.id || !newToken.client || !newToken.expires) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const tokenData = {
      id: newToken.id,
      client: newToken.client,
      expires: newToken.expires,
      status: 'active',
      data: {
        mst: newToken.mst,
        password: newToken.password,
        company: newToken.company,
        content: {
          welcome: newToken.welcome,
          features: newToken.features,
          customMessage: newToken.customMessage,
          theme: {
            primaryColor: '#0a84ff',
            secondaryColor: '#667eea'
          }
        }
      }
    };

    // Tạo token mới (trong thực tế sẽ gọi API)
    setTokens(prev => ({
      ...prev,
      [newToken.id]: tokenData
    }));

    // Reset form
    setNewToken({
      id: '',
      client: '',
      expires: '',
      mst: '',
      password: '',
      company: '',
      welcome: '',
      features: [],
      customMessage: ''
    });
    setShowCreateForm(false);
  };

  const handleDeleteToken = (tokenId: string) => {
    if (confirm(`Bạn có chắc muốn xóa token ${tokenId}?`)) {
      setTokens(prev => {
        const newTokens = { ...prev };
        delete newTokens[tokenId];
        return newTokens;
      });
    }
  };

  const generateTokenId = () => {
    const timestamp = Date.now();
    return `demo_${timestamp}`;
  };

  const generatePassword = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4" data-cmp="Page" data-variant="default" data-size="lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6" data-cmp="Card" data-variant="default" data-size="lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Demo Management</h1>
              <p className="text-gray-600">Quản lý demo tokens cho khách hàng</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              data-cmp="Button" data-variant="primary" data-size="md"
            >
              <i className="fas fa-plus"></i>
              <span>Tạo Demo Mới</span>
            </button>
          </div>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tạo Demo Token Mới</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Token ID *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newToken.id}
                      onChange={(e) => setNewToken(prev => ({ ...prev, id: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="demo_001"
                    />
                    <button
                      onClick={() => setNewToken(prev => ({ ...prev, id: generateTokenId() }))}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                    >
                      Auto
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hết hạn *
                  </label>
                  <input
                    type="datetime-local"
                    value={newToken.expires}
                    onChange={(e) => setNewToken(prev => ({ ...prev, expires: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên khách hàng *
                  </label>
                  <input
                    type="text"
                    value={newToken.client}
                    onChange={(e) => setNewToken(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Công ty ABC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên hiển thị
                  </label>
                  <input
                    type="text"
                    value={newToken.company}
                    onChange={(e) => setNewToken(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Công ty ABC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MST
                  </label>
                  <input
                    type="text"
                    value={newToken.mst}
                    onChange={(e) => setNewToken(prev => ({ ...prev, mst: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="0123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newToken.password}
                      onChange={(e) => setNewToken(prev => ({ ...prev, password: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="demo123"
                    />
                    <button
                      onClick={() => setNewToken(prev => ({ ...prev, password: generatePassword() }))}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                    >
                      Auto
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lời chào
                </label>
                <input
                  type="text"
                  value={newToken.welcome}
                  onChange={(e) => setNewToken(prev => ({ ...prev, welcome: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Chào mừng đến với eTax Mobile"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tính năng (mỗi dòng một tính năng)
                </label>
                <textarea
                  value={newToken.features.join('\n')}
                  onChange={(e) => setNewToken(prev => ({
                    ...prev,
                    features: e.target.value.split('\n').filter(f => f.trim())
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                  placeholder="Khai thuế&#10;Nộp thuế&#10;Tra cứu&#10;Thông báo"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateToken}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Tạo Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tokens List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Danh sách Demo Tokens ({Object.keys(tokens).length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MST
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hết hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(tokens).map(([tokenId, tokenData]) => {
                  const isExpired = new Date(tokenData.expires) < new Date();
                  return (
                    <tr key={tokenId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {tokenId}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {tokenData.client}
                        </div>
                        <div className="text-sm text-gray-500">
                          {tokenData.data?.company || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tokenData.data?.mst || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(tokenData.expires).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isExpired
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {isExpired ? 'Hết hạn' : 'Hoạt động'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              const url = `${window.location.origin}?token=${tokenId}`;
                              navigator.clipboard.writeText(url);
                              alert('Đã copy link demo!');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Copy link"
                          >
                            <i className="fas fa-copy"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteToken(tokenId)}
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoManagement;
