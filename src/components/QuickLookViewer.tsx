// iOS Quick Look Viewer - Mô phỏng SFSafariViewController
import React, { useState, useEffect } from 'react';
import { pdfService, type TaxDocumentData } from '../services/PDFService';

interface QuickLookViewerProps {
  document: TaxDocumentData;
  isOpen: boolean;
  onClose: () => void;
}

const QuickLookViewer: React.FC<QuickLookViewerProps> = ({
  document,
  isOpen,
  onClose
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPDF = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Kiểm tra PDF đã có trong storage chưa
      let url = pdfService.getPDFFromStorage(document.mst, document.documentNumber);

      if (!url) {
        // Tạo PDF mới nếu chưa có
        url = await pdfService.savePDFToStorage(document);
      }

      setPdfUrl(url);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Không thể tải PDF. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && document) {
      loadPDF();
    }
  }, [isOpen, document, loadPDF]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = window.document.createElement('a');
      link.href = pdfUrl;
      link.download = `${document.documentNumber}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      {/* iOS Quick Look Container */}
      <div className="bg-white rounded-t-3xl w-full h-full max-w-md mx-auto flex flex-col">
        {/* Header - iOS Style */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-blue-500 font-medium text-base"
          >
            Done
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {document.content.title}
          </h3>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={loadPDF}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <div className="flex-1 flex flex-col">
              {/* PDF Preview */}
              <div className="flex-1 bg-gray-100">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title={document.content.title}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Tải xuống
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                  >
                    <i className="fas fa-print mr-2"></i>
                    In
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Document Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p><strong>Số chứng từ:</strong> {document.documentNumber}</p>
            <p><strong>Ngày phát hành:</strong> {document.issueDate}</p>
            <p><strong>Trạng thái:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                document.status === 'paid' ? 'bg-green-100 text-green-800' :
                document.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {document.status === 'paid' ? 'Đã nộp' :
                 document.status === 'pending' ? 'Chờ xử lý' : 'Quá hạn'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLookViewer;
