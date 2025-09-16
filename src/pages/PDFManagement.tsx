// PDF Management - Admin panel quản lý PDF và realtime updates
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Navbar, Block, BlockTitle, Button, Card, Badge, Preloader } from 'konsta/react';
import { pdfService, type TaxDocumentData } from '../services/PDFService';
import { realtimeService, type RealtimeUpdate } from '../services/RealtimeService';

const PDFManagement: React.FC = () => {
  const [documents, setDocuments] = useState<TaxDocumentData[]>([]);
  const [realtimeUpdates, setRealtimeUpdates] = useState<RealtimeUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const loadDocuments = useCallback(() => {
    try {
      const allDocuments: TaxDocumentData[] = [];
      const mstList = ['0123456789', '9876543210'];

      mstList.forEach(mst => {
        const docs = pdfService.getDocumentsByMST(mst);
        allDocuments.push(...docs);
      });

      setDocuments(allDocuments);
    } catch (err) {
      console.error('Error loading documents:', err);
      showToast('Lỗi tải danh sách chứng từ');
    }
  }, []);

  const loadRealtimeUpdates = () => {
    const updates = realtimeService.getUpdateHistory();
    setRealtimeUpdates(updates);
  };

  const startRealtimeService = useCallback(() => {
    realtimeService.addListener((update) => {
      // Lưu update vào history
      realtimeService.saveUpdateToHistory(update);

      // Cập nhật UI
      loadRealtimeUpdates();
      loadDocuments();

      // Hiển thị thông báo
      showToast(`Cập nhật: ${update.data.message}`);
    });

    realtimeService.start();
  }, [loadDocuments]);

  useEffect(() => {
    loadDocuments();
    loadRealtimeUpdates();
    startRealtimeService();

    return () => {
      realtimeService.stop();
    };
  }, [loadDocuments, startRealtimeService]);

  const showToast = (text: string) => {
    setToastText(text);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 3000);
  };

  const handleCreateTestPDF = async (mst: string) => {
    setIsLoading(true);
    try {
      await pdfService.createTestPDF(mst);
      showToast('Đã tạo PDF test thành công');

      // Gửi realtime update
      realtimeService.sendUpdate({
        type: 'document_created',
        mst: mst,
        documentNumber: 'TEST-' + Date.now(),
        data: {
          message: 'PDF test đã được tạo',
          action: 'refresh_documents'
        }
      });
    } catch (err) {
      console.error('Error creating test PDF:', err);
      showToast('Lỗi tạo PDF test');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanupPDFs = () => {
    try {
      pdfService.cleanupOldPDFs();
      showToast('Đã dọn dẹp PDF cũ');
    } catch (err) {
      console.error('Error cleaning up PDFs:', err);
      showToast('Lỗi dọn dẹp PDF');
    }
  };

  const handleClearHistory = () => {
    realtimeService.clearUpdateHistory();
    setRealtimeUpdates([]);
    showToast('Đã xóa lịch sử cập nhật');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending': return 'yellow';
      case 'overdue': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Đã nộp';
      case 'pending': return 'Chờ xử lý';
      case 'overdue': return 'Quá hạn';
      default: return 'Không xác định';
    }
  };

  const getUpdateTypeText = (type: string) => {
    switch (type) {
      case 'document_created': return 'Tạo mới';
      case 'document_updated': return 'Cập nhật';
      case 'document_deleted': return 'Xóa';
      case 'status_changed': return 'Thay đổi trạng thái';
      default: return 'Khác';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <Page>
      <Navbar
        title="Quản lý PDF"
        left={<i className="fas fa-arrow-left text-xl"></i>}
        right={<i className="fas fa-cog text-xl"></i>}
      />

      {/* System Status */}
      <Block>
        <BlockTitle>Trạng thái hệ thống</BlockTitle>
        <Card>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {documents.length}
                </div>
                <div className="text-sm text-gray-600">Tổng chứng từ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {realtimeUpdates.length}
                </div>
                <div className="text-sm text-gray-600">Cập nhật realtime</div>
              </div>
            </div>
          </div>
        </Card>
      </Block>

      {/* Actions */}
      <Block>
        <BlockTitle>Thao tác</BlockTitle>
        <div className="space-y-3">
          <Button
            onClick={() => handleCreateTestPDF('0123456789')}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Preloader className="w-4 h-4 mr-2" />
            ) : (
              <i className="fas fa-plus mr-2"></i>
            )}
            Tạo PDF test cho ABC
          </Button>

          <Button
            onClick={() => handleCreateTestPDF('9876543210')}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Preloader className="w-4 h-4 mr-2" />
            ) : (
              <i className="fas fa-plus mr-2"></i>
            )}
            Tạo PDF test cho XYZ
          </Button>

          <Button
            onClick={handleCleanupPDFs}
            className="w-full"
            color="orange"
          >
            <i className="fas fa-trash mr-2"></i>
            Dọn dẹp PDF cũ
          </Button>

          <Button
            onClick={handleClearHistory}
            className="w-full"
            color="red"
          >
            <i className="fas fa-history mr-2"></i>
            Xóa lịch sử cập nhật
          </Button>
        </div>
      </Block>

      {/* Documents List */}
      <Block>
        <BlockTitle>Danh sách chứng từ</BlockTitle>
        {documents.map((doc, index) => (
          <Card key={index} className="mb-4">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {doc.content.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {doc.documentNumber}
                  </p>
                </div>
                <Badge color={getStatusColor(doc.status)}>
                  {getStatusText(doc.status)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">MST:</span>
                  <span className="font-medium">{doc.mst}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Công ty:</span>
                  <span className="font-medium">{doc.companyName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày phát hành:</span>
                  <span className="font-medium">{doc.issueDate}</span>
                </div>

                {doc.amount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-medium text-green-600">
                      {doc.amount.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </Block>

      {/* Realtime Updates */}
      <Block>
        <BlockTitle>Lịch sử cập nhật realtime</BlockTitle>
        {realtimeUpdates.length === 0 ? (
          <Card>
            <div className="p-4">
              <div className="text-center text-gray-500">
                <i className="fas fa-clock text-3xl mb-2"></i>
                <p>Chưa có cập nhật nào</p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {realtimeUpdates.slice(0, 10).map((update, index) => (
              <Card key={index}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge color="blue">
                      {getUpdateTypeText(update.type)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(update.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">
                    {String(update.data.message)}
                  </p>

                  <div className="text-xs text-gray-500">
                    <p>MST: {update.mst}</p>
                    <p>Chứng từ: {update.documentNumber}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Block>

      {/* Toast */}
      {toastOpen && (
        <div className="fixed bottom-4 left-4 right-4 bg-gray-800 text-white p-4 rounded-lg z-50">
          {toastText}
          <button
            onClick={() => setToastOpen(false)}
            className="ml-2 text-blue-400"
          >
            ✕
          </button>
        </div>
      )}
    </Page>
  );
};

export default PDFManagement;
