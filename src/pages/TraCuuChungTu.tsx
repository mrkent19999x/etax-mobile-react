// Tra cứu chứng từ thuế - Tích hợp iOS Quick Look
import React, { useState, useEffect } from 'react';
import { Page, Navbar, Block, BlockTitle, Searchbar, Button, Card, Badge, Preloader } from 'konsta/react';
import { pdfService, type TaxDocumentData } from '../services/PDFService';
import QuickLookViewer from '../components/QuickLookViewer';

const TraCuuChungTu: React.FC = () => {
  const [searchMST, setSearchMST] = useState('');
  const [documents, setDocuments] = useState<TaxDocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<TaxDocumentData | null>(null);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load documents khi component mount
  useEffect(() => {
    loadAllDocuments();
  }, []);

  const loadAllDocuments = () => {
    try {
      const allDocuments: TaxDocumentData[] = [];

      // Load từ tất cả MST có trong hệ thống
      const mstList = ['0123456789', '9876543210'];

      mstList.forEach(mst => {
        const docs = pdfService.getDocumentsByMST(mst);
        allDocuments.push(...docs);
      });

      setDocuments(allDocuments);
    } catch (err) {
      console.error('Error loading documents:', err);
      setError('Không thể tải danh sách chứng từ');
    }
  };

  const handleSearch = async () => {
    if (!searchMST.trim()) {
      loadAllDocuments();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const docs = pdfService.getDocumentsByMST(searchMST.trim());
      setDocuments(docs);

      if (docs.length === 0) {
        setError('Không tìm thấy chứng từ cho MST này');
      }
    } catch (err) {
      console.error('Error searching documents:', err);
      setError('Lỗi tìm kiếm chứng từ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDocument = (document: TaxDocumentData) => {
    setSelectedDocument(document);
    setShowQuickLook(true);
  };

  const handleCloseQuickLook = () => {
    setShowQuickLook(false);
    setSelectedDocument(null);
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

  const getDocumentTypeText = (type: string) => {
    switch (type) {
      case 'receipt': return 'Biên lai';
      case 'invoice': return 'Hóa đơn';
      case 'certificate': return 'Chứng chỉ';
      default: return 'Chứng từ';
    }
  };

  return (
    <Page>
      <Navbar
        title="Tra cứu chứng từ"
        left={<i className="fas fa-arrow-left text-xl"></i>}
        right={<i className="fas fa-search text-xl"></i>}
      />

      <Block>
        <BlockTitle>Tra cứu chứng từ thuế</BlockTitle>

        {/* Search Form */}
        <div className="space-y-4">
          <Searchbar
            placeholder="Nhập MST để tra cứu..."
            value={searchMST}
            onInput={(e) => setSearchMST(e.target.value)}
            clearButton
          />

          <Button
            onClick={handleSearch}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Preloader className="w-4 h-4 mr-2" />
            ) : (
              <i className="fas fa-search mr-2"></i>
            )}
            Tra cứu
          </Button>
        </div>
      </Block>

      {/* Results */}
      <Block>
        <BlockTitle>
          Kết quả tìm kiếm
          {documents.length > 0 && ` (${documents.length} chứng từ)`}
        </BlockTitle>

        {error && (
          <Card>
            <div className="p-4">
              <div className="text-center text-red-500">
                <i className="fas fa-exclamation-triangle text-3xl mb-2"></i>
                <p>{error}</p>
              </div>
            </div>
          </Card>
        )}

        {documents.length === 0 && !error && !isLoading && (
          <Card>
            <div className="p-4">
              <div className="text-center text-gray-500">
                <i className="fas fa-file-alt text-3xl mb-2"></i>
                <p>Không có chứng từ nào</p>
              </div>
            </div>
          </Card>
        )}

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

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loại:</span>
                  <span className="font-medium">
                    {getDocumentTypeText(doc.documentType)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Công ty:</span>
                  <span className="font-medium">{doc.companyName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">MST:</span>
                  <span className="font-medium">{doc.mst}</span>
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

              <Button
                onClick={() => handleViewDocument(doc)}
                className="w-full"
                color="blue"
              >
                <i className="fas fa-eye mr-2"></i>
                Xem chứng từ (Quick Look)
              </Button>
            </div>
          </Card>
        ))}
      </Block>

      {/* Quick Look Viewer */}
      {selectedDocument && (
        <QuickLookViewer
          document={selectedDocument}
          isOpen={showQuickLook}
          onClose={handleCloseQuickLook}
        />
      )}
    </Page>
  );
};

export default TraCuuChungTu;
