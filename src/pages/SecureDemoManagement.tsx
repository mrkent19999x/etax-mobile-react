import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, Button, Card, List, ListItem, Badge, Input, Dialog } from 'konsta/react';
import { SecureDemoManager, SecureDemoLink } from '../services/SecureDemoManager';

const SecureDemoManagement: React.FC = () => {
  const [demoLinks, setDemoLinks] = useState<SecureDemoLink[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedLink, setSelectedLink] = useState<SecureDemoLink | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    revoked: 0,
    totalAccess: 0
  });

  // Form data for creating new demo
  const [newDemo, setNewDemo] = useState({
    clientName: '',
    companyName: '',
    mst: '',
    days: 3
  });

  // Form data for editing content
  const [editContent, setEditContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadDemoLinks();
    loadStats();
  }, []);

  const loadDemoLinks = () => {
    const links = SecureDemoManager.getAllDemoLinks();
    setDemoLinks(links);
  };

  const loadStats = () => {
    const stats = SecureDemoManager.getStats();
    setStats(stats);
  };

  const handleCreateDemo = () => {
    if (!newDemo.clientName || !newDemo.companyName || !newDemo.mst) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const demoLink = SecureDemoManager.createSecureDemo(
      newDemo.clientName,
      newDemo.companyName,
      newDemo.mst,
      newDemo.days
    );

    setDemoLinks([...demoLinks, demoLink]);
    loadStats();
    setShowCreateDialog(false);
    setNewDemo({ clientName: '', companyName: '', mst: '', days: 3 });
    
    // Show demo URL
    const demoURL = SecureDemoManager.createDemoURL(demoLink.token);
    alert(`Demo link đã tạo:\n${demoURL}`);
  };

  const handleRevokeLink = (token: string) => {
    if (confirm('Bạn có chắc muốn thu hồi link này?')) {
      SecureDemoManager.revokeDemoLink(token);
      loadDemoLinks();
      loadStats();
    }
  };

  const handleEditContent = (link: SecureDemoLink) => {
    setSelectedLink(link);
    setEditContent({ ...link.customContent });
    setShowEditDialog(true);
  };

  const handleSaveContent = () => {
    if (selectedLink) {
      SecureDemoManager.updateCustomContent(selectedLink.token, editContent);
      loadDemoLinks();
      setShowEditDialog(false);
      alert('Đã cập nhật nội dung!');
    }
  };

  const handleCleanup = () => {
    const removedCount = SecureDemoManager.cleanupExpiredLinks();
    loadDemoLinks();
    loadStats();
    alert(`Đã xóa ${removedCount} link hết hạn!`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã copy vào clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'expired': return 'red';
      case 'revoked': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Page>
      <Navbar title="🔒 Secure Demo Management" />
      
      {/* Stats Cards */}
      <Block>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active Links</div>
            </div>
          </Card>
          <Card>
            <div className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalAccess}</div>
              <div className="text-sm text-gray-600">Total Access</div>
            </div>
          </Card>
        </div>
      </Block>

      {/* Action Buttons */}
      <Block>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="flex-1 bg-blue-500"
          >
            ➕ Tạo Demo Mới
          </Button>
          <Button 
            onClick={handleCleanup}
            className="bg-orange-500"
          >
            🗑️ Dọn Dẹp
          </Button>
        </div>
      </Block>

      {/* Demo Links List */}
      <Block>
        <h3 className="text-lg font-semibold mb-4">Demo Links ({demoLinks.length})</h3>
        {demoLinks.length === 0 ? (
          <Card>
            <div className="p-4 text-center text-gray-500">
              Chưa có demo link nào
            </div>
          </Card>
        ) : (
          <List>
            {demoLinks.map((link) => {
              const demoURL = SecureDemoManager.createDemoURL(link.token);
              return (
                <ListItem
                  key={link.id}
                  title={link.clientName}
                  subtitle={`${link.companyName} - MST: ${link.mst}`}
                  after={
                    <div className="flex flex-col items-end gap-1">
                      <Badge color={getStatusColor(link.status)}>
                        {link.status}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        {link.accessCount} lần truy cập
                      </div>
                    </div>
                  }
                  onClick={() => handleEditContent(link)}
                >
                  <div className="text-sm text-gray-600 mt-1">
                    <div>Hết hạn: {formatDate(link.expires)}</div>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(demoURL);
                        }}
                      >
                        📋 Copy Link
                      </Button>
                      <Button 
                        size="small" 
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRevokeLink(link.token);
                        }}
                      >
                        🚫 Thu hồi
                      </Button>
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
      </Block>

      {/* Create Demo Dialog */}
      <Dialog opened={showCreateDialog} onBackdropClick={() => setShowCreateDialog(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tạo Demo Link Mới</h3>
          
          <div className="space-y-4">
            <Input
              placeholder="Tên khách hàng"
              value={newDemo.clientName}
              onChange={(e) => setNewDemo({...newDemo, clientName: e.target.value})}
            />
            <Input
              placeholder="Tên công ty"
              value={newDemo.companyName}
              onChange={(e) => setNewDemo({...newDemo, companyName: e.target.value})}
            />
            <Input
              placeholder="Mã số thuế"
              value={newDemo.mst}
              onChange={(e) => setNewDemo({...newDemo, mst: e.target.value})}
            />
            <Input
              type="number"
              placeholder="Số ngày hết hạn"
              value={newDemo.days}
              onChange={(e) => setNewDemo({...newDemo, days: parseInt(e.target.value) || 3})}
            />
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              onClick={handleCreateDemo}
              className="flex-1 bg-blue-500"
            >
              Tạo Demo
            </Button>
            <Button 
              onClick={() => setShowCreateDialog(false)}
              className="bg-gray-500"
            >
              Hủy
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Edit Content Dialog */}
      <Dialog opened={showEditDialog} onBackdropClick={() => setShowEditDialog(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Chỉnh sửa nội dung: {selectedLink?.clientName}
          </h3>
          
          <div className="space-y-4">
            {Object.entries(editContent).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace('_', ' ').toUpperCase()}
                </label>
                <Input
                  value={value}
                  onChange={(e) => setEditContent({
                    ...editContent,
                    [key]: e.target.value
                  })}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              onClick={handleSaveContent}
              className="flex-1 bg-green-500"
            >
              Lưu Nội Dung
            </Button>
            <Button 
              onClick={() => setShowEditDialog(false)}
              className="bg-gray-500"
            >
              Hủy
            </Button>
          </div>
        </div>
      </Dialog>
    </Page>
  );
};

export default SecureDemoManagement;